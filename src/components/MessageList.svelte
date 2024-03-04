<script>
    import { downloadBlob } from "$lib/utils/helpers";
    // Sample messages data
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
        // Add more messages as needed
    ];

    const downloadFile = (fileBufferArray, name) => {
        downloadBlob(fileBufferArray, name, "application/octet-stream");
    };
</script>

{#if messages?.length}
    <div class="max-w-lg mx-auto p-4">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Chat History</h2>
        <ul>
            {#each messages as message}
                <li class="mb-4">
                    {#if message.sender === "friend"}
                        <div class="flex items-start">
                            <div class="bg-gray-200 p-2 rounded-md mr-2">
                                <p class="text-gray-800">Friend: {#if message.file}
                                    <div class="inline">
                                        <button
                                            class="text-indigo-600 hover:underline trunacte"
                                            on:click={() =>
                                                downloadFile(
                                                    message?.file?.url,
                                                    message?.file?.name,
                                                )}
                                        >
                                            <u>{message.file.name}</u>
                                        </button>
                                    </div>
                                {:else}
                                    {message.content}
                                {/if}</p>
                                <p class="text-[10px] text-gray-500">{message.createdAt}</p>
                            </div>
                        </div>
                    {:else if message.sender === "me"}
                        <div class="flex items-start justify-end">
                            <div
                                class="bg-indigo-600 text-white p-2 rounded-md ml-2"
                            >
                                <p class="text-white">You: {#if message.file}
                                    <div class="inline">
                                        <button
                                            class="text-white hover:underline trunacte"
                                            on:click={() =>
                                                downloadFile(
                                                    message?.file?.url,
                                                    message?.file?.name,
                                                )}
                                        >
                                            <u>{message.file.name}</u>
                                        </button>
                                    </div>
                                {:else}
                                    {message.content}
                                {/if}</p>
                                <p class="text-[10px] text-gray-200">{message.createdAt}</p>
                            </div>
                        </div>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
{/if}
