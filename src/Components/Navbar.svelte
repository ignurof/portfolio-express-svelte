<script>
    let name = "ignurof.xyz";

    export let coolQuote = "some cool quote goes here, maybe pulled from some public api";
</script>

<style>
    nav{
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    h1{
        margin-bottom: .1em;
        font-size: 4em;
        color: #336460;
        /* offset-x | offset-y | blur-radius | color */
        text-shadow: 2px 4px 8px #d4851d;
    }

    p{
        margin: 0 auto 4em;
        width: 50%;
        font-size: .8em;
        color: #8c6f51;
    }
</style>

<nav>
    <h1>{name.toUpperCase()}</h1>
    <p>{coolQuote}</p>
</nav>