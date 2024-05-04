<script>
    import QrModal from "../QrModal.svelte";

    export let peerId = '';

    let peerIdToConnect = '';
    let showQRCode = false;
  
    function connectToPeer() {
      // Add your logic here to establish a connection with the provided Peer ID
      console.log('Connecting to Peer ID:', peerIdToConnect);
      // You might want to show a success or error message based on the connection result
    }
  
    function toggleQRCode() {
      showQRCode = !showQRCode;
    }
  </script>
  
  <section class="bg-gray-800 py-16" id="connect">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2
          class="text-base font-semibold text-indigo-600 uppercase tracking-wide"
          in:fade={{ delay: 100, duration: 500 }}
        >
          Connect with Others
        </h2>
        <p
          class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-100 sm:text-4xl"
          in:fade={{ delay: 200, duration: 500 }}
        >
          Share Your Peer ID
        </p>
        <p
          class="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto"
          in:fade={{ delay: 300, duration: 500 }}
        >
          Your Peer ID is a unique identifier that allows you to connect with others in the network. Share this ID with your friends to establish connections.
        </p>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:max-w-lg sm:flex">
        <div class="min-w-0 flex-1">
          <label for="peerIdInput" class="sr-only">
            Enter Peer ID to Connect
          </label>
          <input
            id="peerIdInput"
            type="text"
            placeholder="Enter Peer ID to Connect"
            class="block w-full px-5 py-3 text-base text-gray-300 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-md bg-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2"
            bind:value={peerIdToConnect}
          />
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-3">
          <button
            type="button"
            class="block w-full px-5 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:px-10 rounded-md"
            on:click={connectToPeer}
          >
            Connect
          </button>
        </div>
      </div>
  
      <div class="mt-8 text-center">
        <p class="text-gray-400">
          With your Peer ID, you can securely communicate and share files with friends and contacts. Keep your Peer ID private and only share it with trusted individuals to maintain security.
        </p>
        <div class="mt-4 flex justify-center items-center">
          <p class="text-gray-100 font-bold mr-4">
            Your Peer ID: {peerId}
          </p>
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-xs"
            on:click={toggleQRCode}
          >
            QR Code
          </button>
        </div>
        <QrModal open={showQRCode} qrData={peerId} />
      </div>
    </div>
  </section>