<script>
    let name = "ignurof.xyz";

    export let coolQuote;
    let pageSelection;

    // Svelte Stores (Global Frontend Vars)
    import { navigation } from "../stores.js";

    let currentValue;
    // Subscribes to the store event
    navigation.subscribe(value => {
        currentValue = value;
    });

    let socImages = [
        "/assets/img/github.svg",
        "/assets/img/twitter.svg",
        "/assets/img/youtube.svg",
        "/assets/img/discord.svg"
    ];

    const SetPage = () => {
        if(currentValue == 1){
            navigation.update(n => n = 0);
        } else if(currentValue == 0){
            navigation.update(n => n = 1);
        } else {
            console.error("Page not available!");
        }
        console.log(pageSelection);
    }
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
    }

    .activeSelection{
        text-decoration: underline;
    }

    h4{
        margin: 0;
        color: #EDF7F7;
        text-decoration: none;
        margin-left: .6em;
        margin-right: .6em;
        font-size: 1em;
        font-weight: 400;
        cursor: pointer;
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
        {#if currentValue == 0}
            <h4 on:click={SetPage} class="activeSelection">About</h4>
            <h4 on:click={SetPage}>Projects</h4>
        {:else if currentValue == 1}
            <h4 on:click={SetPage}>About</h4>
            <h4 on:click={SetPage} class="activeSelection">Projects</h4>
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
