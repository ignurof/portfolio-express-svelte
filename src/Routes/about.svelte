<script>
    import Navbar from "../components/navbar.svelte";

    export let about;

    export let coolQuote;
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

    p{
        margin: 0; /* reset p factory defaults */
        padding-left: .2em;
        padding-right: .2em;
    }
</style>

<!-- I need to pass the vars into Navbar so they can be used by it, but I also need to put them here when im exporting from Navbar into this file -->
<Navbar {coolQuote} activePage="about"/>

<main>
    <p>{about}</p>
</main>
