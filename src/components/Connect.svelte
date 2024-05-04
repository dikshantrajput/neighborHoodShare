<script>
    import QrModal from "./QrModal.svelte";
    import { page } from "$app/stores";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import Icon from "@iconify/svelte";

    export let isLoading = true;
    export let friendPeerId = "";
    export let currentUserPeerId = undefined; 

    let copied = false,
        isQrModalOpen = false;
    const eventDispatchers = createEventDispatcher();

    function connectWithFriend() {
        if (friendPeerId.trim() !== "") {
            eventDispatchers("connect", friendPeerId);
            friendPeerId = "";
        } else {
            alert("Please enter your neighbor's Peer ID");
        }
    }

    const updateCopyButtonSvg = () => {
        copied = true;
        setTimeout(() => {
            copied = false;
        }, 1000);
    };

    const copyPeerIdToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentUserPeerId);
            updateCopyButtonSvg();
        } catch (error) {
            console.error("Error copying Peer ID to clipboard:", error);
        }
    };

    const showQrModal = () => {
        isQrModalOpen = true;
    };

    $: qrData = `${$page.url.origin}?peerId=${currentUserPeerId}`;
</script>

{#if isLoading || !currentUserPeerId}
    <div class="bg-gray-800 py-16 animate-pulse">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-gray-700 p-6 rounded-lg mb-8">
                <div class="flex items-center justify-between mb-4">
                    <div class="h-5 bg-gray-600 rounded w-24"></div>
                    <div class="h-5 bg-gray-600 rounded w-16"></div>
                </div>
                <div class="h-10 bg-gray-600 rounded mb-4"></div>
                <div class="h-5 bg-gray-600 rounded mb-4"></div>
                <div class="h-6 bg-gray-600 rounded w-48 mb-4"></div>
                <div class="h-10 bg-gray-600 rounded w-24 mb-4"></div>
            </div>
        </div>
    </div>
{:else}
<section class="bg-gray-800 py-8 sm:py-16" id="connect">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2
          class="text-base font-semibold text-indigo-600 uppercase tracking-wide"
          in:fade={{ delay: 100, duration: 500 }}
        >
          Connect with neighbors
        </h2>
        <p
          class="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-100 sm:text-4xl"
          in:fade={{ delay: 200, duration: 500 }}
        >
          Share Your Peer ID
        </p>
        <p
          class="mt-4 max-w-2xl text-base text-gray-400 lg:mx-auto"
          in:fade={{ delay: 300, duration: 500 }}
        >
          Your Peer ID is a unique identifier that allows you to connect with others in the network.
          Share this ID with your friends to establish connections.
        </p>
      </div>
  
      <div class="mt-8 sm:mt-10">
        <div class="sm:mx-auto sm:max-w-lg sm:flex">
          <div class="min-w-0 flex-1">
            <label for="peerIdInput" class="sr-only">
              Enter Peer ID to Connect
            </label>
            <input
              id="peerIdInput"
              type="text"
              placeholder="Enter Peer ID to Connect"
              class="block w-full px-4 py-3 text-base text-gray-300 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-md bg-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2"
              bind:value={friendPeerId}
            />
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-3">
            <button
              type="button"
              class="block w-full px-5 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:px-10 rounded-md"
              on:click={connectWithFriend}
            >
              Connect
            </button>
          </div>
        </div>
      </div>
  
      <div class="mt-8 text-center">
        <p class="text-gray-400">
          With your Peer ID, you can securely communicate and share files with friends and contacts.
          Keep your Peer ID private and only share it with trusted individuals to maintain security.
        </p>
        <div class="mt-4 flex flex-col justify-center items-center gap-4 sm:flex-row">
          <div class="flex items-center">
            <p class="text-gray-100 font-bold mr-1">
              Your Peer ID: {currentUserPeerId}
            </p>
            {#if currentUserPeerId}
              <button
                on:click={copyPeerIdToClipboard}
                class="!text-white focus:outline-none"
              >
                {#if !copied}
                  <Icon icon="solar:copy-line-duotone" width="20" />
                {:else}
                  <Icon icon="solar:copy-line-duotone" width="20" color="lightgreen" />
                {/if}
              </button>
            {/if}
          </div>
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-xs"
            on:click={showQrModal}
          >
            QR Code
          </button>
        </div>
        <div class="m-4">
            <QrModal bind:open={isQrModalOpen} {qrData} />
        </div>
      </div>
    </div>
  </section>
{/if}