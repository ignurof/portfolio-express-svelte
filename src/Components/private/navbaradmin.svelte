<script>
    let name = "administration"

    export let currentPage = "about";
</script>

<style>
    /* Copied from Navbar */
    h1{
        margin: 0;
        font-size: 2.4em;
        color: #de5733;  /* #336460 blueishgreen #d4851d goldenish saving these for maybe something else*/
        /* offset-x | offset-y | blur-radius | color */
        text-shadow: 2px 2px 0px rgb(126, 49, 28);
        text-align: center; /* custom for this page */
    }

    nav{
        display:flex;
        flex-direction: row;
        justify-content: center; /* Centrerar innehållet i divven */
        margin: 1em auto;
    }

    a{
        color: #EDF7F7;
        text-decoration: none;
        font-size: 1em;
        font-weight: 400;
        cursor: pointer;
        margin: 1em;
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
</style>

<h1>{name.toUpperCase()}</h1>
    
    <nav>
        {#if currentPage==="about"}
            <a href="/admin/about/" class="activeSelection">About</a>
            <a href="/admin/projects/">Projects</a>
        {:else if currentPage==="projects"}
            <a href="/admin/about/">About</a>
            <a href="/admin/projects/" class="activeSelection">Projects</a>
        {/if}
    </nav>