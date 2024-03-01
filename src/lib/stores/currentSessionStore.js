import { writable } from "svelte/store";

export const currentSessionStore = writable(null)

export const setCurrentSessionStore = (value) => {
    currentSessionStore.set(value)
}