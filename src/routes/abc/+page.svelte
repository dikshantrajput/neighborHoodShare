<script>
    import { goto } from '$app/navigation';;
    import { createEventDispatcher, onMount } from "svelte";
    // import QR from "@svelte-put/qr/svg/QR.svelte";
    import { page } from "$app/stores";
    import P2P from "$lib/utils/peer";
    import RoomV2 from "$lib/utils/roomv2";
    import {dataTypes} from "$lib/utils/constants";
    import {downloadBlob} from "$lib/utils/helpers";
    import {currentSessionStore} from '$lib/stores/currentSessionStore'
    import Dice from "$lib/components/Dice.svelte";

    let peerId = "";
    let hostPeerId = "";
    let peer = undefined;
    let room = undefined;
    let message = "";
    let isConnected = false;
    let fileName = "";
    let startReceivingFileChunk = false;
    let files, input;
    let speed = 0;

    const outgoingConnection = () => {
        peer.newConnection(hostPeerId)
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
            if(event?.type === "connectionReceived"){
                isConnected = true;
                room.addParticipants(peer.otherPartyId, event.channel)
            }
            if(event?.type === "connectionEstablished"){
                hostPeerId = peer.otherPartyId
                isConnected = true;
                // add participant in room
                room.join(hostPeerId, event.channel)
            }
            if(event?.type === "connectionDropped"){
                hostPeerId = ""
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

    let dice1 = 0, dice2 = 0

    const handleRollDiceByParticipant = () => {
        console.log({dice1, dice2});

        // send to host
        room?.sendMessage(`${dice1}_${dice2}`)
    }
</script>

<!-- You are {actingAs} -->

<!-- {#if actingAs === currentSessionTypes.h}
    <Host />
{:else if actingAs === currentSessionTypes.p}
    <Participant />
{/if} -->
<!--  TODO: error handling throughout -->

{#if !isConnected || !hostPeerId}
    <h1>Room id: {peerId}</h1>
{/if}

{#if !$participants?.length}
    <h3>
        {#if !isConnected}
            Join a room
        {:else}
            Joined room: {hostPeerId}
        {/if}
    </h3>
{/if}

{#if $participants?.length}
<h4>Participants</h4>
<ul>
    {#each $participants as participant}
        <li>{participant}</li>
    {/each}
</ul>
{/if}

<div>
    {#if !$participants?.length && !isConnected}
        <label for="peerId">Room id </label>
        <input type="text" id="peerId" bind:value={hostPeerId} />
        <button on:click={outgoingConnection}>Connect</button>
    {:else}
        {#if $participants.length}
            <button on:click={handleDisconnect}>Close room</button>
            {:else}
            <button on:click={handleDisconnect}>Leave room</button>
        {/if}
    {/if}
</div>

{#if $participants?.length}
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
<!-- Average mbps: {speed} -->

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

{#if hostPeerId && isConnected}
    <Dice bind:dice1 bind:dice2 on:roll={handleRollDiceByParticipant} />
{/if}