<script>
  import Icon from '@iconify/svelte';
</script>

<footer class="bg-gray-900">
  <div class="max-w-7xl mx-auto py-5 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
    <div class="mt-8 md:mt-0  flex justify-center md:justify-end">
      <p class="text-center text-base text-gray-400">
        &copy; NeighborHoodShare {new Date().getFullYear()}. All rights reserved.
      </p>
    </div>
    <div class="flex space-x-4 mt-4 md:mt-0">
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
</footer>
