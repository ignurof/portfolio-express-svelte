<script>
    import Navbar from "../components/navbar.svelte";

    // This is also found in Navbar.svelte, 
    // so when I pass this exported var like this: <Navbar {coolQuote} /> it means I can use component nested exported var on the router in server.js
    export let coolQuote;

    export let index;
    export let title;
    export let content;
    export let tags;
    export let images;

    // The projectCards are displayed in reverse order so going back would be going up
    const PreviousProject = () => {
        index += 1;
        let apiUrl = `/showcase/project/${index}`;
        location.href = apiUrl;
    }

    const NextProject = () => {
        index -= 1;
        let apiUrl = `/showcase/project/${index}`;
        location.href = apiUrl;
    }
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

    .project-header{
        display:flex;
        flex-direction: row;
        justify-content: center; /* Centrerar en flex */
    }

    h2 {
        margin: 0;
    }

    .tiny{
        font-size: .6em;
        text-align: center;
    }

    img{
        width: 100%;
        height: auto;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        border-radius: .3em;
        margin-top: .4em; /* grid gap */
        margin-bottom: .4em;
    }
</style>
<!-- Im passing it here because I want the page to act like its still the projects page -->
<Navbar {coolQuote} activePage="projects"/>

<main>
    <div class="project-header">
        <button on:click={PreviousProject}>
            .
        </button>
        <h2>{title}</h2>
        <button on:click={NextProject}>
            .
        </button>
    </div>
    <div class="tiny">{tags}</div>
    <p>{content}</p>
    <div class="gallery">
        {#each images as image}
            <img src={"/assets/img/" + image} alt="Alternative Text" />
        {/each}
    </div>
</main>