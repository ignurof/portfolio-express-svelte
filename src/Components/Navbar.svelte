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
        font-size: 8em;
        margin-bottom: .25em;
    }

    p{
        margin: 1em auto;
        width: 50%;
        font-size: 2em;
    }
</style>

<nav>
    <h1>{name.toUpperCase()}</h1>
    <p>{coolQuote}</p>
</nav>