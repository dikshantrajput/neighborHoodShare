<script>
    import { fade } from "svelte/transition";
    import AdBlitzIcon from "../assets/adblitz.png";
    import noFapIcon from "../assets/nofap.png";
</script>

<section class="bg-gray-800 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
            <h2
                class="text-base font-semibold text-indigo-600 uppercase tracking-wide"
                in:fade={{ delay: 100, duration: 500 }}
            >
                Explore My Recent Projects
            </h2>
        </div>

        <div
            class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            in:fade={{ delay: 400, duration: 500 }}
        >

            <div class="pt-6">
                <div class="flow-root bg-gray-900 rounded-lg px-6 pb-8">
                    <div class="-mt-6">
                        <div>
                            <span
                                class="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg"
                            >
                                <img
                                    src={AdBlitzIcon}
                                    alt="Project Icon"
                                    class="h-8 w-8"
                                />
                            </span>
                        </div>
                        <h3
                            class="mt-8 text-lg font-medium text-gray-100 tracking-wide"
                        >
                           AdBlitz
                        </h3>
                        <p class="mt-5 text-base text-gray-400 line-clamp-4">
                            AdBlitz automatically skips skippable ads and accelerates non-skippable ones on youtube, ensuring you enjoy uninterrupted content seamlessly. Remember, <i><b>it's not an ad blocker</b></i>
                        </p>
                        <div class="mt-6">
                            <a
                                href="https://github.com/dikshantrajput/adBlitz"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                            >
                                <svg
                                    class="h-5 w-5 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                Explore on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pt-6">
                <div class="flow-root bg-gray-900 rounded-lg px-6 pb-8">
                    <div class="-mt-6">
                        <div>
                            <span
                                class="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg"
                            >
                                <img
                                    src={noFapIcon}
                                    alt="Project Icon"
                                    class="h-8 w-8"
                                />
                            </span>
                        </div>
                        <h3
                            class="mt-8 text-lg font-medium text-gray-100 tracking-wide"
                        >
                            NoFap
                        </h3>
                        <p class="mt-5 text-base text-gray-400 line-clamp-4">
                            The NoFap Extension is a browser tool designed to block access to pornographic websites seamlessly. Unlike other blockers that require users to add URLs manually, this extension automatically bans such websites without the need for user intervention. It provides a simple and effective solution for those seeking to limit their exposure to explicit content online.
                        </p>
                        <div class="mt-6">
                            <a
                                href="https://github.com/dikshantrajput/noFap"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                            >
                                <svg
                                    class="h-5 w-5 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                Explore on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
