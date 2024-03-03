<script>
    import { createEventDispatcher } from "svelte";

    export let dice1 = 0,
    dice2 = 0;
    let rolling = false;
    const eventDispatchers = createEventDispatcher()
  
    function rollDice() {
      if (rolling) return;
      rolling = true;
  
      const newValue1 = Math.floor(Math.random() * 6) + 1;
      const newValue2 = Math.floor(Math.random() * 6) + 1;
  
      dice1 = newValue1;
      dice2 = newValue2;
  
      // Rotate the dice for a fixed duration
      setTimeout(() => {
        rolling = false;
        dice1 = 6;
        dice2 = 6;
      }, 1000);
      eventDispatchers("roll")
    }
  </script>
  
  <style>
    .dice {
      position: relative;
      width: 100px;
      height: 100px;
      border: 1px solid black;
      text-align: center;
      line-height: 100px;
      font-size: 2em;
      margin: 10px;
      animation: rotate 1s ease-in-out forwards;
    }
  
    .dice::before {
      content: attr(data-value);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: inherit;
    }
  
    @keyframes rotate {
      0% {
        transform: rotateX(0deg) rotateY(0deg);
      }
      100% {
        transform: rotateX(360deg) rotateY(360deg);
      }
    }
  </style>
  
  <button on:click={rollDice}>Roll Dice</button>
  
  <div class="dice" data-value={dice1 || 6}></div>
  <div class="dice" data-value={dice2 || 6}></div>
  