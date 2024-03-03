<script>
    import { onMount } from "svelte";
    import P2P from "$lib/utils/peer";
    import Room from "$lib/utils/room";
    import {prepareMessages} from "$lib/utils/helpers";
    import Connect from "../components/Connect.svelte";
    import SendMessage from "../components/SendMessage.svelte";
    import MessageList from "../components/MessageList.svelte";
    
    let peerId = "";
    let friendPeerId = "";
    let peer = undefined;
    let room = undefined;
    let isConnected = false;
    let isPeerJsLoading = false;

    const connectToAFriend = () => {
        peer.newConnection(friendPeerId)
    };

    const sendMessage = (event) => {
        room?.sendMessage(event.detail)
    };
    
    const handleDisconnect = () => {
        peer.disconnectPeer()
    };

    // TODO: ERROR on not connected
    onMount(() => {
        isPeerJsLoading = true;
        peer = new P2P();
        peer.events.subscribe((event)=>{
            if(event?.type === "sessionStarted"){
                isPeerJsLoading = false;
                peerId = peer.nodeId;
                const param = new URLSearchParams(window.location.search).get("peerId");
                if (param) {
                    peer.newConnection(param)
                }
            }
            if(event?.type === "connectionEstablished"){
                friendPeerId = peer.otherPartyId
                isConnected = true;
                // create a room
                room = new Room(event?.channel, peerId, friendPeerId)
            }
            if(event?.type === "connectionDropped"){
                friendPeerId = ""
                isConnected = false;
            }
        })
    });

    $: msgs = room?.messages

    $: preparedMessages = prepareMessages($msgs, peerId)
    
    const sendFile = (event) => {
        room?.sendFile(event.detail)
    }
</script>

<!-- TODO: file download for sender -->
<!-- TODO: should not connect to self -->
<!--  TODO: error handling throughout -->
{#if !isConnected}
    <Connect
        bind:friendPeerId
        isLoading={isPeerJsLoading}
        currentUserPeerId={peerId}
        on:connect={connectToAFriend}
    />
    {:else}
        <div class="bg-gray-50 max-w-[600px] rounded-sm shadow-md mx-auto overflow-scroll max-h-[calc(100vh-200px)] pt-5">
            <SendMessage otherPartyId={friendPeerId} on:sendMessage={sendMessage} on:sendFile={sendFile} />
            {#if $msgs}
                <MessageList messages={preparedMessages} />
            {/if}
        </div>
{/if}

