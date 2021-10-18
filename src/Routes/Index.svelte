<script>
    // Import payload handler (optional if using export)
    //import payload from "svelte-view-engine/payload";
    // Example component (doesn't get rendered by the view engine outside of this file)
    //import Example from "../Components/Example.svelte"; call this by putting <Example/> in the html section
    // This is the same
    //export let a;
    // As this
    //let { b } = payload.get();

    import Navbar from "../components/navbar.svelte";

    import About from "../components/about.svelte";

    import Projects from "../components/projects.svelte";

    // Svelte Stores (Global Frontend Vars)
    import { navigation } from "../stores.js";

    let currentValue;
    // Subscribes to the store event
    navigation.subscribe(value => {
        currentValue = value;
    });


    // This is also found in Navbar.svelte, 
    // so when I pass this exported var like this: <Navbar {coolQuote} /> it means I can use component nested exported var on the router in server.js
    export let coolQuote;

    // Found in About.svelte
    export let about;

    // Projects.svelte
    export let projectList; // This is a nested exported var, found in Projects.svelte
</script>

<style>
    
</style>
<!-- I need to pass the vars into Navbar so they can be used by it, but I also need to put them here when im exporting from Navbar into this file -->
<Navbar {coolQuote} />

<main>
    <section>
        {#if currentValue == 0}
            <About {about}/>
        {:else if currentValue == 1}
            <Projects {projectList}>
                <!-- Can also do like this -->
                
            </Projects>
        {/if}
    </section>
</main>