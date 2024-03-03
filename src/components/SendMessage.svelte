<script>
	import { createEventDispatcher } from "svelte";

	export let otherPartyId = ""
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
</script>

<div class="max-w-lg mx-auto p-4">
	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Send message to <span class="text-sm">{otherPartyId}</span></h2>
	<form
		on:submit|preventDefault={sendMessage}
		class="flex items-center border border-gray-300 rounded-md"
	>
		<label
			for="fileInput"
			class="bg-gray-300 text-gray-600 font-semibold py-3 px-4 rounded-l-md hover:bg-gray-400 focus:outline-none cursor-pointer !h-full"
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
		<input
			type="text"
			id="message"
			name="message"
			class="flex-grow p-2 border-l border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
			placeholder="Type your message here..."
			bind:value={message}
		/>
		<button
			type="submit"
			class="bg-indigo-600 text-white font-semibold py-3 px-4 rounded-r-md hover:bg-indigo-700 focus:outline-none"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				class="h-4 w-4 transform rotate-45"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
				></path>
			</svg>
		</button>
	</form>
</div>
