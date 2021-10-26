<script>
    let name = "ignurof.xyz";

    export let coolQuote;

    let socImages = [
        "/assets/img/github.svg",
        "/assets/img/twitter.svg",
        "/assets/img/youtube.svg",
        "/assets/img/discord.svg"
    ];

    // Used in Index.svelte and Showcase.svelte
    export let activePage;
</script>

<style>
    nav{
        display: flex;
        flex-direction: row;
        margin: 0 auto;
        padding: .6em;
        align-items: center; /* Vertically places items within the nav container */
    }

    h1{
        margin: 0;
        font-size: 2.4em;
        color: #de5733;  /* #336460 blueishgreen #d4851d goldenish saving these for maybe something else*/
        /* offset-x | offset-y | blur-radius | color */
        text-shadow: 2px 2px 0px rgb(126, 49, 28);
    }

    .menu{
        display: flex;
        flex-direction: row;
        justify-content: center; /* Horizontally */
        margin-left: auto; /* Place to the right side */
    }

    a{
        color: #EDF7F7;
        text-decoration: none;
        margin-left: .6em;
        margin-right: .6em;
        font-size: 1em;
        font-weight: 400;
        cursor: pointer;
    }

    a:hover{
        color: #038A7A;
    }

    .activeSelection{
        border-bottom: 1px solid #EDF7F7;
    }

    .activeSelection:hover{
        border-bottom: 1px solid #038A7A;
    }

    .divider{
        margin-left: 1em;
        margin-right: 1em;
        border: 1px solid #EDF7F7;
        height: 1.2em;
    }

    .socials{
        display: flex;
        flex-direction: row;
        /* Color for SVG https://codepen.io/sosuke/pen/Pjoqqp */ 
        filter: invert(99%) sepia(10%) saturate(391%) hue-rotate(120deg) brightness(99%) contrast(96%);
    }

    img{
        width: 1.2em;
    }

    .quote{
        background: #21343E;
        width: 100vw;
        height: 6em;
        /* For all div children */
        display: flex;
        justify-content: center; /* Horizontally */
        align-items: center; /* Vertically */
    }

    p{
        font-size: .8em;
        color: #99A0A4;
        width: 60%; /* FIXME: Should be put in global media query for large screens */
        margin: 0;
        text-align: center;
    }
</style>

<nav>
    <h1>{name.toUpperCase()}</h1>

    <div class="menu">
        {#if activePage === "about"}
            <a href="/" class="activeSelection">About</a>
            <a href="/showcase">Projects</a>
        {:else if activePage === "projects"}
            <a href="/">About</a>
            <a href="/showcase" class="activeSelection">Projects</a>
        {/if}
        
    </div>
    <div class="divider"></div>
    <div class="socials">
        <a href="https://github.com/ignurof" target="_blank"><img src={socImages[0]} alt="GitHub"/></a>
        <a href="https://twitter.com/ignurof" target="_blank"><img src={socImages[1]} alt="Twitter"/></a>
        <a href="https://www.youtube.com/channel/UCsIEeL9HAQO1SY7Uqqb8Z3g" target="_blank"><img src={socImages[2]} alt="YouTube"/></a>
        <a href="https://discord.gg/jkzp3wZQac" target="_blank"><img src={socImages[3]} alt="Discord"/></a>
    </div>
</nav>
<div class="quote">
    <p>{coolQuote}</p>
</div>
