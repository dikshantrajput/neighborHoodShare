<script>
  import QR from "@svelte-put/qr/svg/QR.svelte";
  import { fade, fly } from "svelte/transition";

  export let qrData,
    open = false;

  function closeModal() {
    open = false;
  }
</script>

{#if open}
  <!-- Modal backdrop -->
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    in:fly
    out:fade
  >
    <!-- Modal container -->
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md relative">
      <!-- Close button -->
      <button
        class="absolute top-4 right-3 text-gray-600 hover:text-gray-800 focus:outline-none"
        aria-label="Close"
        on:click={closeModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- QR code -->
      <div class="flex flex-col items-center mb-4 p-5">
        <QR
          data={qrData}
          moduleFill="#7c3aed"
          anchorOuterFill="red"
          anchorInnerFill="#7c3aed"
          height="400"
          width="400"
        />
      </div>
      <p class="text-gray-600 text-lg font-bold">
        Scan this QR code to connect with me.
      </p>
    </div>
  </div>
{/if}
