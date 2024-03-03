import { writable } from "svelte/store";
import { dataTypes, fileSignals } from "./constants";

class RoomV2{
    host;
    participants;
    connectionChannels;
    // files;
    // channel;
    // chunkSize = 10 * 1024;
    // fileChunks = [];
    // totalChunks = 0;
    // startReceivingFileChunk = false;
    // fileName = "";

    constructor(hostId){
        this.host = hostId
        this.participants = writable([]);
        this.connectionChannels = {};
        this.messages = writable([])
        // this.files = []

        // this.channel.on("close", this.destroy.bind(this))
    }   
    
    join(pId, channel){
        // this.participants.update((prev) => [pId , ...prev ])
        this.connectionChannels[pId] = channel
        channel.on("data", this.listenDataFromHost.bind(this))
    }

    addParticipants(pId, channel){
        this.participants.update((prev) => [pId , ...prev ])
        this.connectionChannels[pId] = channel
        channel.on("data", this.listenDataFromHost.bind(this))
    }

    listenDataFromHost(data){
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

    destroy(){
        this.channel = undefined
        this.you = undefined;
        this.their = undefined;
        this.messages.set([])
        this.files = []
    }

    // For sending all kinds of data
    sendData(data){
        this.channel.send(data);
    }

    broadcastData(data){
        Object.keys(this.connectionChannels).forEach(channelId => {
            this.connectionChannels[channelId].send(data);
        })
    }

    generateSendDataPayload(type, binary){
        // do other modifications for data here 
        return { type, binary }
    }

    // For sending just text messages
    sendMessage(msg){
        const data = this.generateSendDataPayload(dataTypes.message, msg)
        // this.sendData(data)
        this.broadcastData(data)
        // this.appendMessagesList({peerId: this.you, message: msg, type: dataTypes.message})
    }
    
    appendMessagesList(data){
        this.messages.update((prev) => [data , ...prev ])
    }
}

export default RoomV2