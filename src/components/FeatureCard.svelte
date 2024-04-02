<script>
    export let icon; // Path to the feature icon
    export let title;
    export let content;
    export let color; // Optional prop for background color (default: white)
  </script>
  
  <div class="feature-card rounded shadow-md p-4 flex flex-col items-center">
    <img src={icon} alt="{title}" class="feature-card__icon w-12 h-12 mb-4" />
    <h3 class="feature-card__title text-xl font-medium mb-2 text-white">{title}</h3>
    <p class="feature-card__content text-base leading-loose text-white">{content}</p>
  </div>
  
  <style>
    .feature-card {
      /* Override default background (optional) */
    }
    .feature-card__icon {
      /* Style the feature icon */
    }
    .feature-card__title {
      /* Style the feature title */
    }
    .feature-card__content {
      /* Style the feature content description */
    }
  </style>
  