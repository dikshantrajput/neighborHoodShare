<script>
</script>

<section class="bg-gray-800 py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="lg:text-center">
      <h2
        class="text-base font-semibold text-indigo-600 uppercase tracking-wide"
        in:fade={{ delay: 100, duration: 500 }}
      >
        Product Demo
      </h2>
      <p
        class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-100 sm:text-4xl"
        in:fade={{ delay: 200, duration: 500 }}
      >
        NeighborHoodShare in Action
      </p>
      <p
        class="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto"
        in:fade={{ delay: 300, duration: 500 }}
      >
        Experience the power of peer-to-peer file sharing with our user-friendly interface.
      </p>
    </div>

    <div class="mt-10">
      <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        <div class="relative" in:fade={{ delay: 400, duration: 500 }}>
          <dt>
            <div class="text-lg leading-6 font-medium text-gray-100">
              Sender
            </div>
          </dt>
          <dd class="mt-2">
            <img
              src={""}
              alt="Sender GIF"
              class="mx-auto shadow-lg rounded-lg"
            />
          </dd>
          <dd class="mt-4 max-w-prose text-gray-400">
            Select the files you want to share, and our intuitive interface will guide you through the process of connecting with your recipient.
          </dd>
        </div>

        <div class="relative" in:fade={{ delay: 500, duration: 500 }}>
          <dt>
            <div class="text-lg leading-6 font-medium text-gray-100">
              Receiver
            </div>
          </dt>
          <dd class="mt-2">
            <img
              src={""}
              alt="Receiver GIF"
              class="mx-auto shadow-lg rounded-lg"
            />
          </dd>
          <dd class="mt-4 max-w-prose text-gray-400">
            Accept the incoming file transfer request, and your files will be securely delivered right to your device, without any third-party servers or cloud storage.
          </dd>
        </div>
      </dl>
    </div>
  </div>
</section>