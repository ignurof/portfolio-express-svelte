<script>
    // Import payload handler (optional if using export)
    //import payload from "svelte-view-engine/payload";
    // Example component (doesn't get rendered by the view engine outside of this file)
    //import Example from "../Components/Example.svelte"; call this by putting <Example/> in the html section
    // This is the same
    export let a;
    // As this
    //let { b } = payload.get();

    import Navbar from "../Components/Navbar.svelte";

    // This is also found in Navbar.svelte, 
    // so when I pass this exported var like this: <Navbar {coolQuote} /> it means I can use component nested exported var on the router in server.js
    export let coolQuote;
</script>

<style>
    main{
        display: grid;
        grid-template-columns: 1fr;
    }
</style>

<main>
    <Navbar {coolQuote}/>

    <p>Prop A is: {a}</p>
    <p>Hejsan</p>
</main>