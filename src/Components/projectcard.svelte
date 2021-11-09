<script>
    export let title = "default title";
    export let index = 99;
    export let images = [];

    let imgSrc = "/assets/img/" + images[0];

    let summary = "This small summary should be the first X amount of characters pulled from the start of contentString array.";

    //let tags = ["C#", "Unity"];

    const GotoProject = () => {
        let apiUrl = `/project/${index}`;
        location.href = apiUrl;
    }
</script>

<style>
    .card{
        background: #EDF7F7;
        color: black;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        border-radius: .3em;
        margin: .4em; /* grid gap */
        width: 33%; /* ONE card = 33% area of parent container aka projects */
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    img{
        width: 100%;
        height: auto;
        border-top-left-radius: .3em;
        border-top-right-radius: .3em;
    }

    .card-content{
        display: flex;
        flex-direction: column;
        padding: .4em;
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
        font-size: .8em;
    }

    button{
        border: 0;
        background: #038A7A;
        color: #EDF7F7;
        font-weight: bold;
        font-size: .6em;
        border-radius: .4em;
        padding: .8em;
        cursor: pointer;
        width: 40%;
        margin-left: auto;
        margin-right: 1.4em;
        margin-top: 1em;
    }
</style>

<div class="card">
    <img src={imgSrc} alt="This is a test">
    <div class="card-content">
        <h4>{title}</h4>
        <p>{summary}</p>
    </div>
    <button on:click={GotoProject}>Read more</button>
</div>