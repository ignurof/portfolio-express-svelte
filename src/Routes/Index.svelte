<script>
    // Import payload handler (optional if using export)
    //import payload from "svelte-view-engine/payload";
    // Example component (doesn't get rendered by the view engine outside of this file)
    //import Example from "../Components/Example.svelte"; call this by putting <Example/> in the html section
    // This is the same
    //export let a;
    // As this
    //let { b } = payload.get();

    import Navbar from "../Components/Navbar.svelte";

    // This is also found in Navbar.svelte, 
    // so when I pass this exported var like this: <Navbar {coolQuote} /> it means I can use component nested exported var on the router in server.js
    export let coolQuote;

    // CSS NOTES
    /*
        margin: 0 auto = margin: 0 auto auto 0. bottom, left, right, top
    */
</script>

<style>
    main{
        display: grid;
        grid-template-columns: 1fr;
    }

    h2{
        font-size: 6em;
        margin: 1em auto;
    }
</style>

<main>
    <Navbar {coolQuote}/>

    <h2>About me</h2>
</main>