<script>
    import Header from "../components/Header.svelte";
    import "../app.css";
    import Footer from "../components/Footer.svelte";
</script>

<div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-1">
        <slot />
    </main>

    <Footer />
</div>