<script>
    export let title = "default title";
    export let index = 99;
    export let images = [];
    export let content;

    let imgSrc = "/assets/img/" + images[0];

    // Split content up into array based on whitespace, splice out the rest of array after third word, join array items together with whitespace and add ... to end string
    let summary = content.split(" ").splice(0, 3).join(" ") + "...";

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
        min-width: 100%; /* ONE card = 33% area of parent container aka projects */
        min-height: 18em;
        display: flex;
        flex-direction: column;
    }

    .card-image{
        border-top-right-radius: .3em;
        border-top-left-radius: .3em;
        min-height: 60%;
        min-width: 100%;
        background-position:bottom;
        background-size: cover;
        background-repeat: no-repeat;
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
        margin-top: 2em;
    }
</style>

<div class="card">
    <div class="card-image" style="background-image: url({imgSrc});"></div>
    <div class="card-content">
        <h4>{title}</h4>
        <p>{summary}</p>
    </div>
    <button on:click={GotoProject}>Read more</button>
</div>