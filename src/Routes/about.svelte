<script>
    import Navbar from "../components/navbar.svelte";

    export let about;

    export let coolQuote;
</script>

<style>
    p{
        margin: 0; /* reset p factory defaults */
        padding-left: .2em;
        padding-right: .2em;
    }
</style>

<!-- I need to pass the vars into Navbar so they can be used by it, but I also need to put them here when im exporting from Navbar into this file -->
<Navbar {coolQuote} activePage="about"/>

<main>
    <p>{about}</p>
</main>
