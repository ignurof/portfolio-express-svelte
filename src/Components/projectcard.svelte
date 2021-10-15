<script>
    /* Assets dir, aka build/routes/ - Note: I have to prefix it with /assets/ */
    let imgSrc = "/assets/img/testimg.jpg";

    export let title = "default title";

    let tags = ["C#", "Unity"];
</script>

<style>
    .card{
        display:flex;
        flex-direction: column;
        border: 2px solid #d4851d;
        box-shadow: 0px 4px 2px #d4851d;
        width: 33%;
        margin: .2em;
    }

    button{
        color: inherit; /* inherits body text color */
        border: 0;
        background: none;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }
</style>

<div class="card">
    <button>
        <img src={imgSrc} alt="This is a test">
        <h4>{title}</h4>
        <p>{tags}</p>
    </button>
</div>