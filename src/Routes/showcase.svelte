<script>
    import Navbar from "../components/navbar.svelte";

    import Projects from "../components/projects.svelte";

    // This is also found in Navbar.svelte, 
    // so when I pass this exported var like this: <Navbar {coolQuote} /> it means I can use component nested exported var on the router in server.js
    export let coolQuote;

    // Projects.svelte
    export let projectList; // This is a nested exported var, found in Projects.svelte
</script>

<style>
    /* Trying to experiment with perfect breakpoint styling. 3 breakpoints seems to be the best */
    /* TODO: Fixa mer ordentligt responsivitet så det ser exakt likadant ut på alla storlekar men med bra scaling */
    /* FIXME: About paragraf behöver ha lika mycket margin/padding som projects div */
    @media screen and (min-width: 993px) {
        main{
            width: 86%;
        }
    }

    @media screen and (min-width: 1100px){
        main{
            width: 76%;
        }
    }

    @media screen and (min-width: 1400px){
        main{
            width: 60%;
        }
    }
</style>
<!-- I need to pass the vars into Navbar so they can be used by it, but I also need to put them here when im exporting from Navbar into this file -->
<Navbar {coolQuote} activePage="projects"/>

<main>
    <Projects {projectList}>
        <!-- Can also do like this -->
            
    </Projects>
</main>