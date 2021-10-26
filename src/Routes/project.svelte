<script>
    import Navbar from "../components/navbar.svelte";

    // This is also found in Navbar.svelte, 
    // so when I pass this exported var like this: <Navbar {coolQuote} /> it means I can use component nested exported var on the router in server.js
    export let coolQuote;

    export let title;
    export let content;
    export let tags;
    export let images;
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
<!-- Im passing it here because I want the page to act like its still the projects page -->
<Navbar {coolQuote} activePage="projects"/>

<main>
    <h2>{title}</h2>
    <div class="tiny">{tags}</div>
    <p>{content}</p>
    <div class="gallery">{images}</div>
</main>