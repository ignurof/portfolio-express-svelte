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
</script>

<style>
    main{
        display: grid;
        grid-template-columns: 1fr;
    }
</style>

<main>
    <Navbar/>

    <p>Prop A is: {a}</p>
    <p>Hejsan</p>
</main>