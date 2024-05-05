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
        <div class="flex justify-center mt-5  ">
          <a href="https://www.producthunt.com/posts/neighborhoodshare?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-neighborhoodshare" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=455465&theme=light" alt="NeighborHoodShare - Ditch&#0032;the&#0032;Cloud&#0044;&#0032;Share&#0032;Nearby&#0046; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
        </div>
      </div>
    </div>
  </section>