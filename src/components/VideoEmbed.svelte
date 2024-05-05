<script>
    export let videoId; // Declare a prop to pass the YouTube video ID
  </script>
  
  <div class="mx-auto max-w-[800px] relative aspect-video m-10">
    <iframe
      title="YouTube Video"
      class="absolute top-0 left-0 w-full h-full"
      src="https://www.youtube.com/embed/{videoId}"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
  
  <style>
    .aspect-video {
      aspect-ratio: 16 / 9;
    }
  </style>