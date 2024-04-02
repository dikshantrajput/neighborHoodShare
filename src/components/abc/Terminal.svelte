<!-- Terminal.svelte -->
<script>
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";

	let terminalOutput = "";
	let commandInput = "";
	let currentDirectory = "~/";
	let commandHistory = [];
	let historyIndex = -1;
	let inputElement;

	const fileSystem = {
		documents: {
			notes: null,
			reports: null,
		},
		downloads: null,
		pictures: {
			vacation: {
				beach: null,
				mountains: null,
			},
			family: null,
		},
		videos: null,
	};

	function getCompletions(partialInput) {
		const commands = ["cd", "ls", "help", "clear"]; // Example list of commands

		// If the input starts with "cd ", handle directory completions
		if (partialInput.startsWith("cd ")) {
			return getDirectoryCompletions(partialInput.substring(3));
		} else {
			// Otherwise, suggest commands and file system items
			const allCompletions = [
				...commands,
				...getCurrentDirectoryContents(),
			];
			return allCompletions.filter((completion) =>
				completion.startsWith(partialInput),
			);
		}
	}

	function getDirectoryCompletions(partialInput) {
		const directories = partialInput.split("/").filter(Boolean); // Split input by "/" and remove empty parts

		// Traverse the file system to find matching directories
		let currentDir = fileSystem;
		for (const directory of directories) {
			if (currentDir[directory]) {
				currentDir = currentDir[directory];
			} else {
				return []; // Return empty array if the directory doesn't exist
			}
		}

		// Return the list of directories in the current directory
		return Object.keys(currentDir);
	}

	function isDirectory(directoryPath) {
  let currentDir = fileSystem;
  const directories = directoryPath.split('/').filter(Boolean);

  for (const directory of directories) {
    if (!currentDir.hasOwnProperty(directory)) {
      return false; // If any directory in the path doesn't exist, return false
    }
    currentDir = currentDir[directory];
  }

  return true; // If all directories in the path exist, return true
}


	let completions = [];
	function handleAutocomplete() {
		const partialInput = commandInput.trim();
		completions = getCompletions(partialInput);

		// If there's only one completion, update the input field with it
		if (completions.length === 1) {
			const completion = completions[0];
			if (partialInput.startsWith("cd ")) {
				// If the input already starts with "cd ", update without adding another "cd"
				commandInput = `cd ${completion}`;
			} else {
				// If the completion is a directory and there's only one option available, prepend with "cd"
				if (completions.every(isDirectory)) {
					commandInput = `cd ${completion}`;
				} else {
					commandInput = completion;
				}
			}
		} else if (completions.length > 1) {
			showCompletions();
		}
	}

	function showCompletions() {
		terminalOutput += completions.join("\t") + "\n";
	}

	function handleCommand(event) {
		if (event.key === "Tab") {
			event.preventDefault(); // Prevent tab from focusing outside the input field
			handleAutocomplete(); // Call handleAutocomplete function
		} else if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault(); // Prevent new line in textarea

			let command = commandInput.trim();
			if (command === "help") {
				terminalOutput += `$ ${command}\n`;
				handleHelpCommand();
			} else if (command === "clear") {
				terminalOutput += `$ ${command}\n`;
				handleClearCommand(); // Call handleClearCommand function
			} else {
				if (command !== "") {
					terminalOutput += `$ ${command}\n`; // Append command to output

					// Add command to history
					addToCommandHistory(command); // Add clear command to history

					// Execute command
					if (command.startsWith("cd ")) {
						handleCdCommand(command.substring(3));
					} else if (command === "ls") {
						handleLsCommand();
					} else {
						// Execute other commands (for demonstration purposes)
						simulateTyping(
							"This is where the output of the command would appear.\n\n",
						);
					}
				}
			}
			commandInput = ""; // Clear command input
		} else if (event.key === "ArrowUp") {
			// Existing logic...
			if (historyIndex < commandHistory.length - 1) {
				historyIndex++;
				commandInput = commandHistory[historyIndex];
				// Focus on input field after setting the command
				requestAnimationFrame(() => {
					inputElement?.focus();
					inputElement?.setSelectionRange(
						inputElement?.value?.length,
						inputElement?.value?.length,
					);
				});
			}
		} else if (event.key === "ArrowDown") {
			// Existing logic...
			if (historyIndex > -1) {
				historyIndex--;
				commandInput =
					historyIndex === -1 ? "" : commandHistory[historyIndex];
				// Focus on input field after setting the command
				requestAnimationFrame(() => {
					inputElement?.focus();
					inputElement?.setSelectionRange(
						inputElement?.value?.length,
						inputElement?.value?.length,
					);
				});
			}
		}
	}

	function handleClearCommand() {
		terminalOutput = ""; // Clear terminal output
		addToCommandHistory("clear"); // Add clear command to history
	}

	function handleHelpCommand() {
		const helpText = `Available commands:
  - cd [directory]: Change current directory
  - ls: List files and directories
  - help: Show available commands
  - [other commands]: Other demo commands
	`;
		terminalOutput += helpText + "\n";
		addToCommandHistory("help");
	}

	function addToCommandHistory(command) {
		commandHistory.unshift(command);
		historyIndex = -1;
	}

	function handleCdCommand(directory) {

  // Extract the directory name
  const targetDirectory = directory.trim();

  // If the target directory is "..", move to the parent directory
  if (targetDirectory === "..") {
    // Extract the parent directory name
    const parentDirectory = currentDirectory.split("/").slice(0, -1).join("/");
    currentDirectory = parentDirectory || "~/"; // Update the current directory
    return;
  }

  // If the target directory is "/", move to the root directory
  if (targetDirectory === "/") {
    currentDirectory = "/"; // Update the current directory
    return;
  }

  // If the target directory starts with "/", set it as an absolute path
  if (targetDirectory.startsWith("/")) {
    currentDirectory = targetDirectory; // Update the current directory
    return;
  }

  // Split the current directory path
  const currentPath = currentDirectory.replace("~/", "").split("/");
  // Remove empty parts and last element
//   const basePath = currentPath.filter(part => part !== "" && part !== currentPath[currentPath.length - 1]);
  // Concatenate the base path with the target directory
  const newPath = `${currentPath.join("/")}/${targetDirectory}`;

  // Check if the target directory exists in the file system
  if (isDirectory(newPath)) {
    currentDirectory = newPath; // Update the current directory
  } else {
    terminalOutput += `${targetDirectory}: No such file or directory\n`; // Display error message
  }
}


	// Function to handle ls command
	function handleLsCommand() {
		const currentDirContents = getCurrentDirectoryContents();
		if (currentDirContents.length === 0) {
			terminalOutput += "Nothing inside\n"; // Display "Nothing inside" if directory is empty
		} else {
			terminalOutput += currentDirContents.join("\t") + "\n"; // List directory contents
		}
	}

	function getCurrentDirectoryContents() {
    let currentDirContents = [];
    const currentDirPath = getCurrentDirectoryPath();
    
    let currentDir = fileSystem;
    for (const dir of currentDirPath) {
        if (currentDir[dir]) {
            currentDir = currentDir[dir];
        } else {
            // Return empty array if the directory doesn't exist
            return [];
        }
    }

    if (currentDir) {
        currentDirContents = Object.keys(currentDir);
    }

    return currentDirContents;
}

function getCurrentDirectoryPath() {
    // Remove "~/", split by "/", and remove empty parts
    return currentDirectory.replace("~/", "").split("/").filter(part => part !== "");
}


	function typeListItem(items, index) {
		if (index < items.length) {
			setTimeout(
				() => {
					terminalOutput += `${items[index]}\t`; // Simulate typing effect for each item
					typeListItem(items, index + 1); // Recursive call for next item
				},
				Math.min(index * 100, 300),
			); // Delay each item by 100 milliseconds
		}
	}

	function simulateTyping(text) {
		let index = 0;
		const intervalId = setInterval(() => {
			if (index < text.length) {
				terminalOutput += text[index];
				index++;
			} else {
				clearInterval(intervalId);
			}
		}, 50); // Adjust typing speed as needed
	}

	onMount(() => {
		inputElement?.focus(); // Focus on input field when component mounts
	});
</script>

<div class="h-screen flex flex-col justify-end bg-black">
    <!-- Terminal header -->
    <div class="flex items-center justify-between mb-4 px-4 py-2 border-b border-gray-700">
        <div class="flex items-center">
            <!-- Terminal status indicators -->
            <div class="bg-red-500 w-3 h-3 rounded-full mr-2"></div>
            <div class="bg-yellow-500 w-3 h-3 rounded-full mr-2"></div>
            <div class="bg-green-500 w-3 h-3 rounded-full"></div>
            <!-- Current directory and user prompt -->
            <div class="text-green-400 font-mono text-lg">
                <span class="opacity-50" transition:fade>{currentDirectory}</span>
                <span class="opacity-100" transition:fade>user@portfolio:$</span>
            </div>
        </div>
    </div>
    
    <!-- Terminal output area -->
    <div class="flex-1 overflow-y-auto px-4 py-2 bg-black">
        <pre class="whitespace-pre-wrap text-green-400" transition:fly>{terminalOutput}</pre>
    </div>
    
    <!-- Command input area -->
    <div class="px-4 py-2 border-t border-gray-700">
        <input
            bind:this={inputElement}
            type="text"
            class="bg-transparent border-none text-green-400 font-mono outline-none w-full"
            placeholder="Type your command here..."
            bind:value={commandInput}
            on:keydown={handleCommand}
        />
    </div>
</div>

