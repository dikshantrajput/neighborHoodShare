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
    let fileChunks = [];
    let fileName = "";
    let startReceivingFileChunk = false;
    let files, input;
    let speed = 0;
    let totalChunks = 0;
    let currentChunkCount = 0;
    let fileChunkStartTimestampInMs = 0;
    const chunkSize = 10 * 1024;

    function combineUint8Arrays(arrays) {
        // Get the total length of all arrays.
        let length = 0;
        console.log({ arrays });
        const a = arrays.map((item) => {
            if(item instanceof ArrayBuffer){
                item = new Uint8Array(item)
            }
            return item;
        });

        a.forEach((item)=>{
            length += item.length
        })

        // Create a new array with total length and merge all source arrays.
        let mergedArray = new Uint8Array(length);
        let offset = 0;
        a.forEach((item) => {
            mergedArray.set(item, offset);
            offset += item.length;
        });
        return mergedArray;
    }

    const outgoingConnection = () => {
        conn = peer.connect(friendPeerId);
        conn.on("open", () => {
            message = "connected to " + friendPeerId;
            sendMessage();
            isConnected = true;
        });
        conn.on("data", (incomingPayload) => {
            // receiving end
            const type = incomingPayload.type;
            if (type === types.file) {
                // handle cases where we get start signal but no end signal
                if (
                    startReceivingFileChunk &&
                    incomingPayload &&
                    incomingPayload.action !== "end"
                ) {
                    fileChunks.push(incomingPayload.data.buffer);
                    currentChunkCount = incomingPayload.data.currentChunkCount;
                    const currentTs = Math.floor(Date.now() / 1000);
                    speed =
                        (currentTs - fileChunkStartTimestampInMs) * chunkSize;
                }

                if (incomingPayload.action === "start") {
                    startReceivingFileChunk = true;
                    fileChunkStartTimestampInMs = Math.floor(Date.now() / 1000);
                    fileName = incomingPayload.data.fileName;
                    totalChunks = incomingPayload.data.totalChunksCount;
                    fileChunks = [];
                }

                if (incomingPayload.action === "end") {
                    // download file
                    downloadBlob(
                        combineUint8Arrays(fileChunks),
                        fileName,
                        "application/octet-stream",
                    );
                    startReceivingFileChunk = false;
                    fileChunks = [];
                    fileName = "";
                    input.value = "";
                }
            } else if (type === types.message) {
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
        const data = generateOutgoingPayload(types.message, message);
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
        connect.on("data", (incomingPayload) => {
            const type = incomingPayload.type;
            if (type === types.file) {
                // handle cases where we get start signal but no end signal
                if (
                    startReceivingFileChunk &&
                    incomingPayload &&
                    incomingPayload.action !== "end"
                ) {
                    fileChunks.push(incomingPayload.data.buffer);
                    currentChunkCount = incomingPayload.data.currentChunkCount;
                    const currentTs = Math.floor(Date.now() / 1000);
                    speed =
                        ((currentChunkCount /
                            (currentTs - fileChunkStartTimestampInMs)) *
                            chunkSize) /
                        1024;
                }

                if (incomingPayload.action === "start") {
                    startReceivingFileChunk = true;
                    fileChunkStartTimestampInMs = Math.floor(Date.now() / 1000);
                    fileName = incomingPayload.data.fileName;
                    totalChunks = incomingPayload.data.totalChunksCount;
                    fileChunks = [];
                }

                if (incomingPayload.action === "end") {
                    // download file
                    downloadBlob(
                        combineUint8Arrays(fileChunks),
                        fileName,
                        "application/octet-stream",
                    );
                    startReceivingFileChunk = false;
                    fileChunks = [];
                    fileName = "";
                    input.value = "";
                }
            } else if (type === types.message) {
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

    const generateOutgoingPayload = (type, data, action = "") => {
        return {
            action,
            type,
            data,
        };
    };

    const types = {
        file: "file",
        message: "message",
    };

    $: if (files) {
        let file = files[0];
        file.arrayBuffer().then((buff) => {
            // send signal of file sharing
            let totalChunksCount = Math.floor(buff.byteLength / chunkSize);
            conn.send(
                generateOutgoingPayload(
                    types.file,
                    { fileName: file.name, totalChunksCount },
                    "start",
                ),
            );
            let startPointer = 0;
            let end = buff.byteLength;

            let chunkCount = 1;
            let newStartPointer = 0;

            while (startPointer < end) {
                newStartPointer = startPointer + chunkSize;
                const chunk = buff.slice(startPointer, newStartPointer);
                conn.send(
                    generateOutgoingPayload(
                        types.file,
                        { buffer: chunk, currentChunkCount: chunkCount },
                        "progress",
                    ),
                );
                chunkCount++;
                startPointer = newStartPointer;
            }
            conn.send(generateOutgoingPayload(types.file, file.name, "end"));
        });
    }
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

{#if isConnected}
    <div>
        <label for="send"> Send message </label>

        <textarea id="send" bind:value={message} />
        <button on:click={sendMessage}>Send</button>

        <input type="file" bind:files bind:this={input} />
    </div>
{/if}

{#if startReceivingFileChunk}
    <div>
        Getting file in progress: {fileName}
    </div>
{/if}
Average mbps: {speed}

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
