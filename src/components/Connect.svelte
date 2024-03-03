<script>
    import Button from "./Button.svelte";
    import QrModal from "./QrModal.svelte";
    import { page } from "$app/stores";
    import { createEventDispatcher } from "svelte";

    export let isLoading = true;
    export let friendPeerId = "";
    export let currentUserPeerId = "ABC123"; // Example Peer ID, replace it with the actual value

    let copied = false, isQrModalOpen = false;
    const eventDispatchers = createEventDispatcher()
    
    function connectWithFriend() {
        // Implement connection logic here
        if (friendPeerId.trim() !== "") {
            // You can implement connection logic here, like calling a function to establish the connection
            eventDispatchers("connect", friendPeerId)
            // Reset the input field after connecting
            friendPeerId = "";
        } else {
            console.log("Please enter your friend's Peer ID");
        }
    }

    const updateCopyButtonSvg = () => {
        copied = true;
        setTimeout(()=>{
            copied = false;
        },1000)
    }

    // Function to copy the Peer ID to the clipboard
    const copyPeerIdToClipboard = async () => {
        try{
            await navigator.clipboard.writeText(currentUserPeerId)
            updateCopyButtonSvg()
        }catch(error){
            console.error("Error copying Peer ID to clipboard:", error);
        }
    }

    const showQrModal = () => {
        isQrModalOpen = true
    }

    $: qrData = `${$page.url.origin}?peerId=${currentUserPeerId}`;
</script>

{#if isLoading}
    <!-- Skeleton loading state for buttons without text -->
<div class="max-w-6xl mx-auto mt-8 flex flex-col lg:flex-row lg:space-x-8">
    <!-- Left Section: Display current user's Peer ID -->
    <div class="rounded-lg p-6 flex-1 shadow-md">
        <h2 class="text-xl font-semibold mb-4">Your Peer ID</h2>
        <div class="mb-4">
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
        </div>
        <div class="flex items-center justify-between">
            <div class="h-8 bg-gray-200 rounded w-32 mr-2"></div>
            <div class="h-8 bg-gray-200 rounded w-20"></div>
        </div>
    </div>

    <!-- Vertical Separator -->
    <div class="border-l border-gray-200 hidden lg:block"></div>

    <!-- Right Section: Connect with a Friend -->
    <div class="rounded-lg p-6 flex-1 shadow-md">
        <div class="mb-4">
            <div class="h-4 bg-gray-200 rounded w-64 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-48 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-52 mb-2"></div>
        </div>
        <form>
            <div class="mb-6">
                <div class="h-4 bg-gray-200 rounded mb-2"></div>
            </div>
            <div class="flex justify-between items-center">
                <button class="bg-gray-200 text-gray-600 py-2 px-4 rounded-md shadow-md w-32 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 animate-pulse"></button>
                <div class="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </form>
    </div>
</div>

{:else}
    <QrModal {qrData} bind:open={isQrModalOpen} />
    <div class="max-w-6xl mx-auto mt-8 flex flex-col lg:flex-row lg:space-x-8">
        <!-- Left Section: Display current user's Peer ID -->
        <div class="rounded-lg p-6 flex-1">
            <h2 class="text-xl font-semibold mb-4">Your Peer ID</h2>
            <p class="text-sm text-gray-600 mb-4">
                Your Peer ID is a unique identifier that allows you to connect with others in the network. Share this ID with your friends to establish connections.
                <br><br>
                With your Peer ID, you can securely communicate and share files with friends and contacts.
                <br><br>
                Keep your Peer ID private and only share it with trusted individuals to maintain security.
            </p>
            
            <div class="flex">
                <div class="text-lg font-semibold mr-2">{currentUserPeerId}</div>
                {#if currentUserPeerId}
                    <button on:click={copyPeerIdToClipboard}>
                        {#if !copied}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m6 19v2c0 .621.52 1 1 1h2v-1.5h-1.5v-1.5zm7.5 3h-3.5v-1.5h3.5zm4.5 0h-3.5v-1.5h3.5zm4-3h-1.5v1.5h-1.5v1.5h2c.478 0 1-.379 1-1zm-1.5-1v-3.363h1.5v3.363zm0-4.363v-3.637h1.5v3.637zm-13-3.637v3.637h-1.5v-3.637zm11.5-4v1.5h1.5v1.5h1.5v-2c0-.478-.379-1-1-1zm-10 0h-2c-.62 0-1 .519-1 1v2h1.5v-1.5h1.5zm4.5 1.5h-3.5v-1.5h3.5zm3-1.5v-2.5h-13v13h2.5v-1.863h1.5v3.363h-4.5c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v4.5h-3.5v-1.5z"/></svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24zm-5.541 8.409l-1.422-1.409-7.021 7.183-3.08-2.937-1.395 1.435 4.5 4.319 8.418-8.591z"/></svg>
                        {/if}
                    </button>
                {/if}
            </div>
        </div>
        
        <!-- Vertical Separator -->
        <div class="border-l border-gray-200 hidden lg:block"></div>
        
        <!-- Right Section: Connect with a Friend -->
        <div class="rounded-lg p-6 flex-1">
            <h2 class="text-xl font-semibold mb-4 text-center lg:text-left">
                Connect with a Friend
            </h2>
            <form on:submit|preventDefault={connectWithFriend}>
                <div class="mb-6">
                    <input
                        id="friendPeerId"
                        type="text"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Enter your friend's Peer ID"
                        bind:value={friendPeerId}
                    />
                </div>
                <Button>Connect</Button>
            </form>
            <p class="text-center my-2 w-full">
                OR
            </p>
            <Button on:click={showQrModal}>Scan QR code</Button>
        </div>
        
    </div>
{/if}
