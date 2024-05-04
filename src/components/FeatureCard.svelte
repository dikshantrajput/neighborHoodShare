<script>
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";

  export let title, content;
</script>

  	
<Card.Root class="w-[350px]">
  <Card.Header>
    <Card.Title>{title}</Card.Title>
    <Card.Description>{content}</Card.Description>
  </Card.Header>
  <Card.Content>
  </Card.Content>
</Card.Root>
