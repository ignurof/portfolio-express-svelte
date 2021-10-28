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
    export let links;

    // The projectCards are displayed in reverse order so going back would be going up
    const ChangeProject = (previous) => {
        // IF previous is true, +, else -
        // Simple If-Else statement is better made with this ternary operator
        let newIndex = (previous) ? (index += 1) : (index -= 1);
        let apiUrl = `/project/${newIndex}`;
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
        margin-bottom: 2em;
    }

    .project-header-title{
        display:flex;
        flex-direction: column;
    }

    .links{
        display:flex;
        flex-direction: row;
        margin: 0 auto;
    }

    a{
        text-decoration: underline;
        font-size: 1em;
        font-weight: 400;
        cursor: pointer;
        color: inherit;
        margin: 1em;
    }

    a:hover{
        color: #038A7A;
    }

    h2 {
        margin: 0;
        padding-left: 1em;
        padding-right: 1em;
    }

    .tiny{
        margin-bottom: 2em;
        font-size: .6em;
        text-align: center;
        color: #99A0A4;
    }

    img{
        width: 100%;
        height: auto;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        border-radius: .3em;
        margin-top: .4em; /* grid gap */
        margin-bottom: .4em;
    }

    button{
        border: 0;
        background: #038A7A;
        color: #EDF7F7;
        font-weight: bold;
        font-size: 1.2em;
        border-radius: .2em;
        cursor: pointer;
        padding: 1em;
    }

    p{
        margin: 1em 0;
    }
</style>
<!-- Im passing it here because I want the page to act like its still the projects page -->
<Navbar {coolQuote} activePage="projects"/>

<main>
    <div class="project-header">
        <button on:click={() => ChangeProject(true)}>
            &#60; <!-- HTML Code for < -->
        </button>
        <div class="project-header-title">
            <h2>{title}</h2>
            <div class="tiny">{tags}</div>
        </div>
        <button on:click={() => ChangeProject(false)}>
            &#62; <!-- HTML Code for > -->
        </button>
    </div>
    <div class="links">
        {#each links as { href, text }}
            <a {href} target="_blank">{text}</a>
        {/each}
    </div>
    <p>{content}</p>
    <div class="gallery">
        {#each images as image}
            <img src={"/assets/img/" + image} alt="Alternative Text" />
        {/each}
    </div>
</main>