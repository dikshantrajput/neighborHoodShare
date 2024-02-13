<script>
    import Peer from "peerjs";
    import {onMount} from "svelte";
    import QR from '@svelte-put/qr/svg/QR.svelte';

    let peerId = "";
    let friendPeerId = "";
    let peer = undefined;
    let message = "";
    let conn = undefined;
    let isConnected = false;
    let messages = [];

    const handleConnect = () => {
        conn = peer.connect(friendPeerId)
        conn.on("open", () => {
            message = "connected to " + friendPeerId
            sendMessage()
            isConnected = true;
        })
        conn.on("data", (data) => {
            messages.push(`Friend: ${data}`)
            messages = messages
        })
        conn.on("error", (error) => {
            console.log(error);
        })
        conn.on('close', function () {
            isConnected = false;
            friendPeerId = ""
        });
    }

    const sendMessage = () => {
        messages.push(`You: ${message}`)
        messages = messages
        conn.send(message)
        message = ""
    }

    const peerOpen = (id) => {
        peerId = id
        const param = new URLSearchParams(window.location.search).get("peerId");
        if(param){
            friendPeerId = param
            handleConnect()
        }
    }

    const peerConnection = (connect) => {
        conn = connect
        connect.on("data", (data) => {
            messages.push(`Friend: ${data}`)
            messages = messages
        })
        connect.on("error", () => {
            // isVisible = true;
        })
        connect.on("open", () => {
            friendPeerId = connect.peer;
            isConnected = true;
            message = "connected to " + friendPeerId
            sendMessage()
        })
        connect.on('close', function () {
            isConnected = false;
            friendPeerId = ""
        });
    }

    const handleDisconnect = () => {
        conn.close()
    }

    const close = () => {
        console.log("abc");
    }

    onMount(()=>{
        peer = new Peer();
        peer.on("open", peerOpen)
        peer.on("connection", peerConnection)
        peer.on("disconnected", close)
    })
</script>
<!--  TODO: error handling throughout -->

<h1>Your peer id: {peerId}</h1>
<h3>
    {#if ! isConnected}
        Connect to a peer 
    {:else}
        Connected to {friendPeerId}
    {/if}
</h3>

<div>
    {#if !isConnected}
        <label for="peerId">
            Peer id
        </label>
        <input type="text" id="peerId" bind:value={friendPeerId}>
        <button on:click={handleConnect}>Connect</button>
        {:else}
        <button on:click={handleDisconnect}>Disconnect</button>
    {/if}
</div>

<div>
    <label for="send">
        Send message
    </label>
    
    <textarea id="send" bind:value={message} />
    <button on:click={sendMessage}>Send</button>
</div>

{#if ! isConnected}
    <div>
        <h3>Scan to connect</h3>
        <QR
        data="http://192.168.29.71:5173?peerId={peerId}"
        moduleFill="violet"
        anchorOuterFill="red"
        anchorInnerFill="violet"
        height=200
        width=200
        />
    </div>
{/if}

<ul>
    {#each messages as message, index (index)}
        <li>
            {message?.replace(peerId, "You")}
        </li>    
    {/each}
</ul>