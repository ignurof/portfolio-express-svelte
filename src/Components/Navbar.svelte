<script>
    let name = "ignurof.xyz";

    export let coolQuote = "some cool quote goes here, maybe pulled from some public api";
</script>

<style>
    nav{
        color: red;
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    h1{
        font-size: 6em;
    }

    p{
        font-size: 3em;
        padding: 0;
        margin: 0;
    }
</style>

<nav>
    <h1>{name.toUpperCase()}</h1>
    <p>{coolQuote}</p>
</nav>