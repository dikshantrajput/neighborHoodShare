<script>
	import Icon from "@iconify/svelte";
	import { createEventDispatcher } from "svelte";

	export let otherPartyId = "";
	let message = ""; // Variable to store the message text

	const eventDispatchers = createEventDispatcher();
	// Function to handle sending the message
	function sendMessage() {
		if (message.trim() !== "") {
			// Implement message sending logic here
			eventDispatchers("sendMessage", message);
			// Clear the input field after sending the message
			message = "";
		}
	}

	// Function to handle file selection
	function handleFileUpload(event) {
		const selectedFile = event.target.files[0];
		eventDispatchers("sendFile", selectedFile);
		// Implement file upload logic here
	}

	function handleDisconnect() {
		eventDispatchers("disconnect");
	}
</script>

<div class="bg-slate-900 py-10">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2
			class="text-xl font-semibold text-gray-200 mb-4 flex items-center gap-3"
		>
			<div>
				Connected with neighbor
				<span class="text-sm text-gray-400">{otherPartyId}</span>
			</div>
			<button
				type="button"
				class="ml-3 inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-400 bg-transparent hover:bg-gray-700 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition duration-300"
				on:click={handleDisconnect}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4 mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
					/>
				</svg>
				Say goodbye
			</button>
		</h2>

		<form on:submit|preventDefault={sendMessage} class="flex items-center">
			<div class="flex-grow">
				<label for="fileInput" class="sr-only">Upload File</label>
				<div class="relative">
					<input
						type="text"
						id="message"
						name="message"
						class="block w-full px-4 py-3 text-gray-300 placeholder-gray-500 transition duration-300 ease-in-out transform border border-transparent rounded-md bg-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-indigo-600 focus:ring-2"
						placeholder="Type your message here..."
						bind:value={message}
					/>
					<div
						class="absolute inset-y-0 right-0 flex items-center pr-3"
					>
						<label
							for="fileInput"
							class="bg-slate-700 text-gray-400 font-semibold py-2 px-3 rounded-md hover:bg-slate-600 focus:outline-none cursor-pointer transition duration-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1792 1792"
								class="h-4 w-4"
							>
								<path
									d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"
								/>
							</svg>
						</label>
						<input
							type="file"
							id="fileInput"
							class="hidden"
							on:change={handleFileUpload}
						/>
					</div>
				</div>
			</div>
			<button
				type="submit"
				class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="h-4 w-4 transform rotate-45 mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
					></path>
				</svg>
				Send
			</button>
		</form>
	</div>
</div>
