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


    // This is also found in Navbar.svelte, 
    // so when I pass this exported var like this: <Navbar {coolQuote} /> it means I can use component nested exported var on the router in server.js
    export let coolQuote;
    let pageSelection = "projects"; // default value for good measure

    // Found in About.svelte
    export let about;

    // Projects.svelte
    export let projectList; // This is a nested exported var, found in Projects.svelte
</script>

<style>
    
</style>

<Navbar {coolQuote}/>

<main>
    <section>
        {#if pageSelection == "about"}
            <About {about}/>
        {:else if pageSelection == "projects"}
            <Projects {projectList}>
                <!-- Can also do like this -->
                
            </Projects>
        {/if}
    </section>
</main>