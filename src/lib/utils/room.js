import { writable } from "svelte/store";
import { dataTypes, fileSignals } from "./constants";
import { combineUint8Arrays, downloadBlob } from "./helpers";

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
    }   

    listenDataFromThem(data){
        console.log(data);
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
                console.log(this.fileChunks);
                downloadBlob(
                    combineUint8Arrays(this.fileChunks),
                    this.fileName,
                    "application/octet-stream",
                );
                this.startReceivingFileChunk = false;
                this.fileChunks = [];
                this.fileName = "";
            }
        } else if(type === dataTypes.message){
            this.appendMessagesList({peerId: this.their, message: data?.binary})
        }
    }

    generateSendDataPayload(type, binary){
        // do other modifications for data here 
        return { type, binary }
    }

    // For sending all kinds of data
    sendData(data){
        this.channel.send(data);
    }

    // For sending just text messages
    sendMessage(msg){
        const data = this.generateSendDataPayload(dataTypes.message, msg)
        this.sendData(data)
        this.appendMessagesList({peerId: this.you, message: msg})
    }
    
    appendMessagesList(data){
        this.messages.update((prev) => [data , ...prev ])
    }

    sendFileChunk(file){
        const data = this.generateSendDataPayload(dataTypes.message, msg)
        this.sendData(data)
    }

    // For sending binary file
    sendFile(file){
        file.arrayBuffer().then((buff) => {
            // send signal of file sharing
            let totalChunksCount = Math.floor(buff.byteLength / this.chunkSize);
            this.sendData(this.generateSendDataPayload(dataTypes.file, { fileName: file.name, totalChunksCount, signal: fileSignals.start }))

            let startPointer = 0;
            let end = buff.byteLength;
            let chunkCount = 1;
            let newStartPointer = 0;
            // TODO: use generator function to get the next chunks
            while (startPointer < end) {
                newStartPointer = startPointer + this.chunkSize;
                const chunk = buff.slice(startPointer, newStartPointer);
                const data = this.generateSendDataPayload(dataTypes.file, { buffer: chunk, currentChunkCount: chunkCount, signal: fileSignals.progress })
                this.sendData(data)
                chunkCount++;
                startPointer = newStartPointer;
            }

            this.sendData(this.generateSendDataPayload(dataTypes.file, { fileName: file.name, signal: fileSignals.end }))
        });
    }
}

export default Room