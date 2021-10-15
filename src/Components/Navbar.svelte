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
        color: #de5733;  /* #336460 blueishgreen #d4851d goldenish saving these for maybe something else*/
        /* offset-x | offset-y | blur-radius | color */
        text-shadow: 2px 2px 0px rgb(126, 49, 28);
    }

    p{
        margin: 0 auto 4em;
        width: 50%;
        font-size: .8em;
        color: #B4A5A5;
    }
</style>

<nav>
    <h1>{name.toUpperCase()}</h1>
    <p>{coolQuote}</p>
</nav>