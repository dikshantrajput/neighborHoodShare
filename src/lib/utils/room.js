import { writable } from "svelte/store";
import { dataTypes, fileSignals } from "./constants";
import { chunkGenerator, combineUint8Arrays } from "./helpers";

class Room{
    you;
    their;
    messages;
    files;
    channel;
    chunkSize = 10 * 1024;
    fileChunks = [];
    totalChunks = 0;
    startReceivingFileChunk = false;
    fileName = "";

    constructor(channel, hostId, guestId){
        this.channel = channel
        this.you = hostId;
        this.their = guestId;
        this.messages = writable([])
        this.files = []

        this.channel.on("data", this.listenDataFromThem.bind(this))
        this.channel.on("close", this.destroy.bind(this))
    }   

    destroy(){
        this.channel = undefined
        this.you = undefined;
        this.their = undefined;
        this.messages.set([])
        this.files = []
    }

    listenDataFromThem(data){
        const type = data.type
        if (type === dataTypes.file) {
            // handle cases where we get start signal but no end signal
            if (
                this.startReceivingFileChunk &&
                data &&
                data.binary.signal === fileSignals.progress
            ) {
                this.fileChunks.push(data.binary.buffer);
                // currentChunkCount = data.binary.currentChunkCount;
                // const currentTs = Math.floor(Date.now() / 1000);
                // speed =
                //     ((currentChunkCount /
                //         (currentTs - fileChunkStartTimestampInMs)) *
                //         chunkSize) /
                //     1024;
            }

            if (data.binary.signal === fileSignals.start) {
                this.startReceivingFileChunk = true;
                // fileChunkStartTimestampInMs = Math.floor(Date.now() / 1000);
                this.fileName = data.binary.fileName;
                this.totalChunks = data.binary.totalChunksCount;
            }

            if (data.binary.signal === fileSignals.end) {
                // download file
                this.appendMessagesList({peerId: this.their, type: dataTypes.file, fileName: this.fileName, file: combineUint8Arrays(this.fileChunks)})
                this.startReceivingFileChunk = false;
                this.fileChunks = [];
                this.fileName = "";
            }
        } else if(type === dataTypes.message){
            this.appendMessagesList({peerId: this.their, message: data?.binary, type: dataTypes.message})
        }
    }

    generateSendDataPayload(type, binary){
        // do other modifications for data here 
        return { type, binary, createdAt: Date.now() }
    }

    // For sending all kinds of data
    sendData(data){
        this.channel.send(data);
    }

    // For sending just text messages
    sendMessage(msg){
        const data = this.generateSendDataPayload(dataTypes.message, msg)
        this.sendData(data)
        this.appendMessagesList({peerId: this.you, message: msg, type: dataTypes.message})
    }
    
    appendMessagesList(data){
        this.messages.update((prev) => [data , ...prev ])
    }

    sendFileChunks(fileBuffer){
        let chunkCount = 1;
        const generator = chunkGenerator(fileBuffer, this.chunkSize);
        for (const chunk of generator) {
            const data = this.generateSendDataPayload(dataTypes.file, { buffer: chunk, currentChunkCount: chunkCount++, signal: fileSignals.progress });
            this.sendData(data);
        }
    }

    // For sending binary file
    async sendFile(file){
        try{
            const buff = await file.arrayBuffer()
            // send signal of file sharing
            this.sendData(this.generateSendDataPayload(dataTypes.file, { fileName: file.name, totalChunks: Math.floor(buff.byteLength / this.chunkSize), signal: fileSignals.start }))
    
            // send signal of file sharing in progress
            this.sendFileChunks(buff)
    
            // send signal of file sharing completed
            this.sendData(this.generateSendDataPayload(dataTypes.file, { fileName: file.name, signal: fileSignals.end }))

            this.appendMessagesList({peerId: this.you, type: dataTypes.file, fileName: file.name, file: undefined})
        }catch(error){
            console.log("Error splitting file", error);
        }
    }
}

export default Room