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

    // Found in About.svelte
    export let about;

    // Projects.svelte
    export let projectList; // This is a nested exported var, found in Projects.svelte

    // CSS NOTES
    /*
        margin: 0 auto = margin: 0 auto auto 0. bottom, left, right, top
    */
</script>

<style>
    
</style>

<main>
    <Navbar {coolQuote}/>

    <About {about}/>

    <Projects {projectList}>
        <!-- Can also do like this -->
        
    </Projects>
</main>