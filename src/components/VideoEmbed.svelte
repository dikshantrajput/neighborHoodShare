<script>
    import { fade } from "svelte/transition";

    export let videoId; // Declare a prop to pass the YouTube video ID
  </script>
  

  <section class="bg-gray-900 py-20" id="features">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
            <h2
                class="text-base font-semibold text-indigo-600 uppercase tracking-wide"
                in:fade={{ delay: 100, duration: 500 }}
            >
                NeighborHoodShare in action
            </h2>
        </div>
        <div class="mx-auto max-w-[800px] relative aspect-video mt-5">
            <iframe
              title="YouTube Video"
              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/{videoId}"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
    </div>
</section>


  
  
  <style>
    .aspect-video {
      aspect-ratio: 16 / 9;
    }
  </style>