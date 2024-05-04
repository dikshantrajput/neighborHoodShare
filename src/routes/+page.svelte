<script>
    import { onMount } from "svelte";
    import P2P from "$lib/utils/peer";
    import Room from "$lib/utils/room";
    import {prepareMessages} from "$lib/utils/helpers";
    import Connect from "../components/Connect.svelte";
    import SendMessage from "../components/SendMessage.svelte";
    import MessageList from "../components/MessageList.svelte";
    import Hero from "../components/v2/Hero.svelte";
    import Features from "../components/v2/Features.svelte";
    import ScrollDownArrow from "../components/v2/ScrollDownArrow.svelte";
    import { toast } from "svelte-sonner";

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
        toast.loading("Setting up neighborhood for you...")
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
                toast.success("Your neighborhood is ready...")
            }
            if(event?.type === "connectionEstablished"){
                friendPeerId = peer.otherPartyId
                isConnected = true;
                room = new Room(event?.channel, peerId, friendPeerId)
                toast.success("Connected!!!")
            }
            if(event?.type === "connectionDropped"){
                friendPeerId = ""
                isConnected = false;
                toast.success("Disconnected!!!")
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
    <Hero />
    <Features />
    <Connect
        bind:friendPeerId
        isLoading={isPeerJsLoading}
        currentUserPeerId={peerId}
        on:connect={connectToAFriend}
    />
    <ScrollDownArrow />
{:else}
    <div class="bg-gray-800 max-w-[800px] rounded-sm shadow-md mx-auto overflow-scroll max-h-[calc(100vh-200px)] mt-5">
        <SendMessage otherPartyId={friendPeerId} on:sendMessage={sendMessage} on:sendFile={sendFile} on:disconnect={handleDisconnect} />
        {#if $msgs}
            <MessageList messages={preparedMessages} />
        {/if}
    </div>
{/if}
