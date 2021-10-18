<script>
    /* Assets dir, aka build/routes/ - Note: I have to prefix it with /assets/ */
    let imgSrc = "/assets/img/testimg.jpg";

    export let title = "default title";

    let summary = "This small summary should be the first X amount of characters pulled from the start of contentString array.";

    let tags = ["C#", "Unity"];
</script>

<style>
    .card{
        background: #EDF7F7;
        color: black;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        border-radius: .3em;
        margin: .4em; /* grid gap */
        width: 33%; /* ONE card = 33% area of parent container aka projects */
    }

    img{
        width: 100%;
        height: auto;
        border-top-left-radius: .3em;
        border-top-right-radius: .3em;
    }

    h4{
        margin: 0; /* reset default margin */
        font-weight: bold;
        text-align: start; /* Make sure its placed at the start of the element area */
        padding: .2em;
    }

    p{
        margin: 0; /* reset default margin */
        color: rgb(112, 112, 112);
        padding: .2em;
    }

    button{
        border: 0;
        background: #038A7A;
        color: #EDF7F7;
        font-weight: bold;
        border-radius: .4em;
        padding: .6em;
        cursor: pointer;
        margin-left: 60%;
        margin-bottom: 4%;
    }
</style>

<div class="card">
    <img src={imgSrc} alt="This is a test">
    <h4>{title}</h4>
    <p>{summary}</p>
    <button>Read more</button>
</div>