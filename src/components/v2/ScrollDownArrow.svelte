<script>
    import Icon from "@iconify/svelte";
    import { onMount, onDestroy } from "svelte";
  
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };
  
    const scrollToShareFiles = () => {
      const shareFilesComponent = document.getElementById("connect");
      if (shareFilesComponent) {
        shareFilesComponent.scrollIntoView({ behavior: "smooth" });
      }
    };
  
    let showArrow = true;
  
    const isElementInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const topInView = rect.top >= 0 && rect.top <= viewportHeight;
      return topInView;
    };
  
    // Debounce the handleScroll function with a delay of 200ms
    const debouncedHandleScroll = debounce(() => {
      const shareFilesComponent = document.getElementById("connect");
      if (shareFilesComponent) {
        showArrow = !isElementInViewport(shareFilesComponent);
      }
    }, 100);
  
    onMount(() => {
      window.addEventListener("scroll", debouncedHandleScroll); // Use debounced handleScroll
      return () => {
        window.removeEventListener("scroll", debouncedHandleScroll);
      };
    });
  
    onDestroy(() => {
      // Ensure to cancel any pending debounced function calls when the component is destroyed
      clearTimeout(debouncedHandleScroll);
    });
  </script>
  
  {#if showArrow}
    <button class="down-arrow-container" on:click={scrollToShareFiles}>
      <div class="down-arrow-animation text-gray-400">
        <Icon icon="solar:arrow-down-linear" height="40" width="40" />
      </div>
    </button>
  {/if}
  
  <style>
    .down-arrow-container {
      position: fixed;
      bottom: 20px;
      right: 2%;
      transform: translateX(-50%);
      cursor: pointer;
      z-index: 9999;
    }
  
    .down-arrow-animation {
      animation: bounce 2s infinite;
    }
  
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(10px);
      }
    }
  </style>
  