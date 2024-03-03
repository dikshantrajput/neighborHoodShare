<!-- not working -->
<script>
    import { createEventDispatcher } from "svelte";

    // Props for the button component
    export let color = 'indigo-600';
    export let textColor = 'white';
    export let hoverColor = 'indigo-dark';
    export let disabled = false;
    export let buttonClass = "";
  
    const events = createEventDispatcher();
    // Function to handle button click
    function handleClick(event) {
      if (disabled) {
        event.preventDefault();
        return;
      }
  
      events('click');
    }
  </script>
  
  <button
    class="py-2 px-4 w-full rounded-md transition duration-300 font-semibold ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-{color} text-{textColor} hover:bg-{hoverColor} {buttonClass}"
    on:click={handleClick}
    {disabled}
>
    <slot></slot>
  </button>
  