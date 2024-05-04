<script>
    import { fade } from "svelte/transition";
</script>

<section class="bg-gray-900 py-20" id="features">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
            <h2
                class="text-base font-semibold text-indigo-600 uppercase tracking-wide"
                in:fade={{ delay: 100, duration: 500 }}
            >
                Key Features
            </h2>
            <p
                class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-100 sm:text-4xl"
                in:fade={{ delay: 200, duration: 500 }}
            >
                Secure, Reliable, and Effortless File Sharing
            </p>
        </div>

        <div class="mt-10" in:fade={{ delay: 300, duration: 500 }}>
            <dl
                class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"
            >
                <div class="relative">
                    <dt>
                        <div
                            class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                        >
                            <svg
                                class="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <p
                            class="ml-16 text-lg leading-6 font-medium text-gray-100"
                        >
                            End-to-End Encryption
                        </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-gray-400">
                        Guaranteed privacy. Your messages and files are
                        encrypted from sender to receiver, ensuring only
                        authorized parties can access them.
                    </dd>
                </div>

                <div class="relative">
                    <dt>
                        <div
                            class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                        >
                            <svg
                                class="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                            </svg>
                        </div>
                        <p
                            class="ml-16 text-lg leading-6 font-medium text-gray-100"
                        >
                            Peer-to-Peer Communication
                        </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-gray-400">
                        Direct communication. Connect with friends and
                        colleagues directly, without relying on third-party
                        servers for increased speed and reliability.
                    </dd>
                </div>

                <div class="relative">
                    <dt>
                        <div
                            class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                        >
                            <svg
                                class="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <p
                            class="ml-16 text-lg leading-6 font-medium text-gray-100"
                        >
                            Share Different File Types
                        </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-gray-400">
                        Transfer photos, documents, videos, and more with ease.
                    </dd>
                </div>

                <div class="relative">
                    <dt>
                        <div
                            class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                        >
                            <svg
                                class="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                                />
                            </svg>
                        </div>
                        <p
                            class="ml-16 text-lg leading-6 font-medium text-gray-100"
                        >
                            Large File Support
                        </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-gray-400">
                        Effortless file sharing. Send large files (videos,
                        documents, etc.) quickly and easily without size
                        restrictions.
                    </dd>
                </div>

                <div class="relative">
                    <dt>
                        <div
                            class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                        >
                            <svg
                                class="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                ></path>
                            </svg>
                        </div>
                        <p
                            class="ml-16 text-lg leading-6 font-medium text-gray-100"
                        >
                            User-Friendly Interface
                        </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-gray-400">
                        Intuitive and easy to use. Get started in minutes with
                        our user-friendly interface that simplifies secure
                        communication.
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</section>
