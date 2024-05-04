<script>
  import { slide } from 'svelte/transition';

  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<header class="bg-gray-800">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
    <div class="w-full py-6 flex items-center justify-between">
      <div class="flex items-center">
        <a href="/" class="text-indigo-400 hover:text-indigo-500 font-bold text-2xl">
          NeighborHoodShare
        </a>
      </div>

      <div class="flex items-center">
        <div class="hidden lg:block">
          <div class="ml-10 space-x-8">
            <a href="#features" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Features
            </a>
            <a href="#connect" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Share files
            </a>
            <a href="https://medium.com/@dikshantraj2001/nat-stun-turn-and-ice-466dabbc2fdb" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Learn about P2P networking
            </a>
          </div>
        </div>
        <div class="flex lg:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            on:click={toggleMobileMenu}
          >
            <span class="sr-only">Open main menu</span>
            <svg class={mobileMenuOpen ? 'hidden h-6 w-6' : 'block h-6 w-6'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class={mobileMenuOpen ? 'block h-6 w-6' : 'hidden h-6 w-6'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    {#if mobileMenuOpen}
      <div class="lg:hidden" id="mobile-menu" in:slide out:slide>
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a href="#features" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
          <a href="#connect" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Share files</a>
          <a href="https://medium.com/@dikshantraj2001/nat-stun-turn-and-ice-466dabbc2fdb" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Learn about P2P networking</a>
        </div>
      </div>
    {/if}
  </nav>
</header>