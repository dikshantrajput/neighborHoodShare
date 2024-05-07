<script>
    import { goto } from '$app/navigation';;
    import { onMount } from "svelte";
    // import QR from "@svelte-put/qr/svg/QR.svelte";
    import { page } from "$app/stores";
    import P2P from "$lib/utils/peer";
    import RoomV2 from "$lib/utils/roomv2";
    import {dataTypes} from "$lib/utils/constants";
    import {downloadBlob} from "$lib/utils/helpers";
    import {currentSessionStore} from '$lib/stores/currentSessionStore'

    let peerId = "";
    let friendPeerId = "";
    let peer = undefined;
    let room = undefined;
    let message = "";
    let isConnected = false;
    let fileName = "";
    let startReceivingFileChunk = false;
    let files, input;
    let speed = 0;

    const outgoingConnection = () => {
        peer.newConnection(friendPeerId)
    };

    const sendMessage = () => {
        room?.sendMessage(message)
        message = "";
    };
    
    const handleDisconnect = () => {
        peer.disconnectPeer()
    };

    onMount(() => {
        peer = new P2P();
        peer.events.subscribe((event)=>{
            if(event?.type === "sessionStarted"){
                peerId = peer.nodeId;
                room = new RoomV2(peerId)
                const param = new URLSearchParams(window.location.search).get("peerId");
                if (param) {
                    peer.newConnection(param)
                }
            }
            if(event?.type === "connectionEstablished"){
                friendPeerId = peer.otherPartyId
                isConnected = true;
                // add participant in room
                room.addParticipants(friendPeerId, event.channel)
            }
            if(event?.type === "connectionDropped"){
                friendPeerId = ""
                isConnected = false;
            }
        })
    });

    // let url = "";
    $: msgs = room?.messages
    $: participants = room?.participants
    $: console.log($participants);
    // $: url = `${$page.url.origin}?peerId=${peerId}`;
    // $: if (files) {
    //     let file = files[0];
    //     room?.sendFile(file)
    // }

    // const downloadFile = (fileBufferArray, name) => {
    //     downloadBlob(
    //         fileBufferArray,
    //         name,
    //         "application/octet-stream",
    //     );
    // }

    // let actingAs = $currentSessionStore
    // if(! actingAs) goto("/choose")
</script>

<!-- You are {actingAs} -->

<!-- {#if actingAs === currentSessionTypes.h}
    <Host />
{:else if actingAs === currentSessionTypes.p}
    <Participant />
{/if} -->
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

<!-- {#if !isConnected}
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
{/if} -->

<ul>
    {#if $msgs}
        {#each $msgs as message, index (index)}
            <li>
                {#if message?.type === dataTypes.file}
                    {message?.fileName}
                    {#if message?.file}
                        <!-- <button on:click={() => downloadFile(message?.file, message?.fileName)}>Download</button> -->
                    {/if}
                {:else if message?.type === dataTypes.message}
                    {message.peerId === peerId ? "You: " : "Other: "}
                    {message.message}
                {/if}
            </li>
        {/each}
    {/if}
</ul>
