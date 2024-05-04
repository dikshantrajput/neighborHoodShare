<script>
    import { fade } from "svelte/transition";
  </script>
  
  <section
    class="relative overflow-hidden bg-cover bg-center h-[40vh]"
  >
    <div
      class="absolute inset-0 bg-gradient-to-r from-gray-800 to-indigo-800 opacity-75"
    />
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-10">
      <div class="lg:text-center">
        <p
          class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-5xl"
          in:fade={{ delay: 200, duration: 500 }}
        >
                Ditch the Cloud, Share Nearby.
        </p>
        <p
          class="mt-4 max-w-2xl text-xl text-indigo-200 lg:mx-auto"
          in:fade={{ delay: 300, duration: 500 }}
        >
              Cut the wait, share large files instantly with your neighbors.
        </p>
      </div>
    </div>
  </section>