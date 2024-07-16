<script>
  import Icon from '@iconify/svelte';
</script>
<footer class="bg-gray-900">
  <div class="max-w-7xl mx-auto py-5 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between w-full">
      <div class="mt-4 md:mt-0 flex justify-center md:justify-start">
        <p class="text-center text-base text-gray-400">
          &copy; NeighborHoodShare {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
      <div class="flex space-x-4 mt-4 md:mt-0 justify-center md:justify-end">
        <!-- LinkedIn Icon -->
        <a href="https://in.linkedin.com/in/dikshant-rajput-072228193" class="text-gray-400 hover:text-gray-300">
          <Icon icon="mdi:linkedin" height="24" width="24" />
        </a>
        <!-- GitHub Icon -->
        <a href="https://github.com/dikshantrajput" class="text-gray-400 hover:text-gray-300">
          <Icon icon="mdi:github" height="24" width="24" />
        </a>
      </div>
    </div>
  </div>
  <div class="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 text-gray-400">
    <!-- Privacy Policy Link -->
    <a href="/privacy-policy" class="mr-4 hover:text-gray-300">Privacy Policy</a>
    <!-- Terms and Conditions Link -->
    <a href="/tnc" class="mr-4 hover:text-gray-300">Terms and Conditions</a>
    <br />
    <a
      href="mailto:adblitz07@gmail.com">Contact:
      <br />
      email us at adblitz07@gmail.com
      </a
    >
  </div>
</footer>