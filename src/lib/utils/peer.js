import Peer from "peerjs";
import { writable } from "svelte/store";

class P2P{
    nodeId;
    peer;
    channel;
    events;
    otherPartyId;

    constructor(){
        this.events = writable(null)
        this.createPeerSession()
        this.registerEventListeners()
    }

    createPeerSession(){
        if(!this.peer){
            this.peer = new Peer(undefined, {
                debug: 0    
            })
        }
    }

    destroyPeerSession(){
        this.checkPeerExistenceOrThrow()
        this.peer.destroy()
    }

    reconnectPeerSession(){
        this.checkPeerExistenceOrThrow()
        this.peer.reconnect()
    }

    registerEventListeners(){
        this.peer.on("open", this.peerSessionOpened.bind(this))
        this.peer.on("connection", this.newConnectionEstablished.bind(this))
        this.peer.on("close", this.cleanupPeerSession.bind(this))
        this.peer.on("disconnected", this.peerConnectionDisconnected.bind(this))
        this.peer.on("error", this.peerSessionError.bind(this))
    }

    cleanupPeerSession(){
        console.log("Cleanup peer session ", this.channel.peer);
        this.nodeId = undefined
        this.channel = undefined
        this.peer = undefined
        this.otherPartyId = undefined
    }

    peerSessionOpened(nodeId){
        this.nodeId = nodeId
        this.events.set({type:"sessionStarted"})
    }

    newConnectionEstablished(channel){
        this.channel = channel
        if(this.channel?.peer){
            this.otherPartyId = this.channel.peer
            this.events.set({type:"connectionEstablished", channel: this.channel})
        }
    }

    peerConnectionDisconnected(){
        console.log(this.channel);
        console.log("Peer is disconnected ", );
        this.events.set({type:"connectionDropped"})
        this.reconnectPeerSession()
    }

    peerSessionError(error){
        switch(error.type){
            case 'network':
                console.log("network connection issue");
                break;
            case 'disconnected':
                this.events.set({type:"connectionDropped"})
                console.log("You've already disconnected this peer from the server and can no longer make any new connections on it. ");
                break;
            case 'peer-unavailable':
                console.log("The peer you're trying to connect to does not exist");
                break;
            case 'server-error':
                console.log("Unable to reach the server.");
                break;
            case 'socket-error':
                console.log("An error from the underlying socket.");
                break;
            case 'socket-closed':
                console.log("The underlying socket closed unexpectedly.");
                break;
            case 'webrtc':
                console.log("Native WebRTC errors.");
                break;
            default:
                console.log("Unexpected error", error.type);
    
        }
    }

    newConnection(nodeIdToConnectTo){
        this.checkPeerExistenceOrThrow()
        this.channel = this.peer.connect(nodeIdToConnectTo)
        if(this.channel?.peer){
            this.otherPartyId = this.channel.peer
            this.channel.on("open", ()=>{
                this.events.set({type:"connectionEstablished", channel: this.channel})
            })
        }
    }
    
    checkPeerExistenceOrThrow(){
        if(!this.peer)
        throw new Error("Peer does not exists")
    }
    
}

export default P2P;