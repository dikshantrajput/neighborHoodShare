<script>
    import { downloadURL } from "$lib/utils/helpers";
    export let messages = [
        {
            id: 1,
            sender: "friend",
            content: "Hello, how are you?",
            file: undefined,
        },
        {
            id: 2,
            sender: "me",
            content: "Hi! I'm doing well, thank you.",
            file: undefined,
        },
        {
            id: 3,
            sender: "friend",
            content: "Can you send me the project files?",
            file: {
                name: "project.zip",
                url: "https://example.com/project.zip",
            },
        },
    ];

    const downloadFile = (fileBufferArray, name) => {
        downloadURL(fileBufferArray, name, "application/octet-stream");
    };
</script>
<div class="bg-slate-900 py-10" class:py-10={!!messages?.length}> 
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {#if messages?.length}
        <ul class="space-y-6">
          {#each messages as message (message.id)}
            <li class="animate-slide-up">
              {#if message.sender === "friend"}
                <div class="flex items-start">
                  <div
                    class="bg-slate-800 p-4 rounded-lg mr-4 shadow-md animate-scale-in"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <p class="text-gray-300 text-sm mr-2">Neighbor</p>
                      <p class="text-gray-400 text-xs">{message.createdAt}</p>
                    </div>
                    <div class="text-gray-300">
                      {#if message.file}
                        <button
                          class="text-indigo-400 hover:text-indigo-300 truncate transition duration-300"
                          on:click={() => downloadFile(message?.file?.url, message?.file?.name)}
                        >
                          <u>{message.file.name}</u>
                        </button>
                      {:else}
                        {message.content}
                      {/if}
                    </div>
                  </div>
                </div>
              {:else if message.sender === "me"}
                <div class="flex items-start justify-end">
                  <div
                    class="bg-indigo-800 p-4 rounded-lg ml-4 shadow-md animate-scale-in"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <p class="text-gray-300 text-sm mr-2">You</p>
                      <p class="text-gray-400 text-xs">{message.createdAt}</p>
                    </div>
                    <div class="text-gray-200">
                      {#if message.file}
                        <div
                          class="text-indigo-300 hover:text-indigo-200 truncate transition duration-300"
                        >
                          {message.file.name}
                        </div>
                      {:else}
                        {message.content}
                      {/if}
                    </div>
                  </div>
                </div>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>