<script>
    import Peer from "peerjs";
    import { onMount } from "svelte";
    import QR from "@svelte-put/qr/svg/QR.svelte";
    import { page } from "$app/stores";

    let peerId = "";
    let friendPeerId = "";
    let peer = undefined;
    let message = "";
    let conn = undefined;
    let isConnected = false;
    let messages = [];

    const outgoingConnection = () => {
        conn = peer.connect(friendPeerId);
        conn.on("open", () => {
            message = "connected to " + friendPeerId;
            sendMessage();
            isConnected = true;
        });
        conn.on("data", (incomingPayload) => {
            const type = incomingPayload.type
            if(type === types.file){
                // download file
                downloadBlob(incomingPayload.data.file, incomingPayload.data.fileName, 'application/octet-stream')
            }else if(type === types.message){
                messages.push(`Friend: ${incomingPayload.data}`);
                messages = messages;
            }
        });
        conn.on("error", (error) => {
            console.log(error);
        });
        conn.on("close", function () {
            isConnected = false;
            friendPeerId = "";
            messages = [];
        });
    };

    const downloadBlob = (data, fileName, mimeType) => {
        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);
        downloadURL(url, fileName);
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    };

    const downloadURL = (data, fileName) => {
        const a = document.createElement("a");
        a.href = data;
        a.download = fileName;
        document.body.appendChild(a);
        a.style.display = "none";
        a.click();
        a.remove();
    };

    const sendMessage = () => {
        messages.push(`You: ${message}`);
        messages = messages;
        const data = generateOutgoingPayload(types.message, message)
        conn.send(data);
        message = "";
    };

    const peerOpen = (id) => {
        peerId = id;
        const param = new URLSearchParams(window.location.search).get("peerId");
        if (param) {
            friendPeerId = param;
            outgoingConnection();
        }
    };

    const localConnection = (connect) => {
        conn = connect;
        connect.on("data", (data) => {
            const type = incomingPayload.type
            if(type === types.file){
                // download file
                downloadBlob(incomingPayload.data.file, incomingPayload.data.fileName, 'application/octet-stream')
                messages.push(`Friend: ${incomingPayload.data}`);
                messages = messages;
            }else if(type === types.message){
                messages.push(`Friend: ${incomingPayload.data}`);
                messages = messages;
            }
        });
        connect.on("error", () => {
            // isVisible = true;
        });
        connect.on("open", () => {
            friendPeerId = connect.peer;
            isConnected = true;
            message = "connected to " + friendPeerId;
            sendMessage();
        });
        connect.on("close", function () {
            isConnected = false;
            friendPeerId = "";
            messages = [];
        });
    };

    const handleDisconnect = () => {
        conn.close();
    };

    onMount(() => {
        peer = new Peer();
        peer.on("open", peerOpen);
        peer.on("connection", localConnection);
    });

    let url = "";
    $: url = `${$page.url.origin}?peerId=${peerId}`;

    const generateOutgoingPayload = (type, data) => {
        return {
            type,
            data
        }
    }

    const types = {
        file: "file",
        message: "message"
    }

    const onFileSelected = (e) => {
        let file = e.target.files[0];
        const filePayload = {
            file,
            fileName: file.name
        }
        const data = generateOutgoingPayload(types.file, filePayload)
        conn.send(data);
    };
</script>

<!--  TODO: error handling throughout -->

<h1>Your peer id: {peerId}</h1>
<h3>
    {#if !isConnected}
        Connect to a peer
    {:else}
        Connected to {friendPeerId}
    {/if}
</h3>

<div>
    {#if !isConnected}
        <label for="peerId"> Peer id </label>
        <input type="text" id="peerId" bind:value={friendPeerId} />
        <button on:click={outgoingConnection}>Connect</button>
    {:else}
        <button on:click={handleDisconnect}>Disconnect</button>
    {/if}
</div>

<div>
    <label for="send"> Send message </label>

    <textarea id="send" bind:value={message} />
    <button on:click={sendMessage}>Send</button>

    <input type="file" on:change={(e) => onFileSelected(e)} />
</div>

{#if !isConnected}
    <div>
        <h3>Scan to connect</h3>
        <QR
            data={url}
            moduleFill="violet"
            anchorOuterFill="red"
            anchorInnerFill="violet"
            height="200"
            width="200"
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
