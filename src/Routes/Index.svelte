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

    let pageSelector = "projects";
</script>

<style>
    .menu{
        display: flex;
        flex-direction: row;
        border: 4px solid #2b2a28;
        box-shadow: -2px 6px 4px #2b2a28;
        width: 60%;
        margin: 1em auto;
    }

    h2{
        font-family: monospace;
        font-size: 1.4em;
        color: #d4851d;
        text-shadow: 1px 1px 0px #de5733;
        cursor: pointer;
        margin: 0 auto;
    }
</style>

<main>
    <Navbar {coolQuote}/>

    <div class="menu">
        <h2 on:click={pageSelector = "about"}>About</h2>
        <h2 on:click={pageSelector = "projects"}>Projects</h2>
    </div>

    <About {about}/>

    <Projects {projectList}>
        <!-- Can also do like this -->
        
    </Projects>
</main>