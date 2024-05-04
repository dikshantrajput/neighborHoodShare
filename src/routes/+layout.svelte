<script>
    import "../app.css";
    import Header2 from "../components/Header2.svelte";
    import Footer2 from "../components/Footer2.svelte";
    import { Toaster } from 'svelte-sonner';
</script>

<div class="flex flex-col min-h-screen dark-bg">
    <Toaster richColors visibleToasts={5}   />
    <Header2 />

    <main class="flex-1">
        <slot />
    </main>

    <Footer2 />
</div>