import { writable } from "svelte/store";
import { dataTypes } from "./constants";

class Room{
    you;
    their;
    messages;
    files;
    channel;

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
        this.appendMessagesList({peerId: this.their, message: data?.binary})
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

    // For sending binary file
    sendFile(){}
}

export default Room