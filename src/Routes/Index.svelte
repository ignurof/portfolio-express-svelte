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

    const SetPage = () => {
        if(pageSelector === "about"){
            pageSelector = "projects";
        } else if(pageSelector === "projects"){
            pageSelector = "about";
        } else{
            pageSelector = "projects";
        }
    }

    // Reactivity required for dynamic updates
    //$: pageSelector;
</script>

<style>
    .menu{
        display: flex;
        flex-direction: row;
        border: 4px solid rgba(255, 255, 255, 0.20);
        box-shadow: -2px 6px 4px rgba(255, 255, 255, 0.20);
        width: 60%;
        margin: 1em auto;
        /* top | right | bottom | left */
        padding: .2em 1em .2em 1em;
    }

    h2{
        font-family: monospace;
        font-size: 1.4em;
        color: #B4A5A5;
        cursor: pointer;
        margin: 0 auto;
    }
</style>

<main>
    <Navbar {coolQuote}/>

    <div class="menu">
        <h2 on:click={SetPage}>About</h2>
        <h2 on:click={SetPage}>Projects</h2>
    </div>

    {#if pageSelector == "about"}
        <About {about}/>
    {:else if pageSelector == "projects"}
        <Projects {projectList}>
            <!-- Can also do like this -->
            
        </Projects>
    {:else}
        Hello World Error!
    {/if}
</main>