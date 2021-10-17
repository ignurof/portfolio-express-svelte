<script>
    /* Assets dir, aka build/routes/ - Note: I have to prefix it with /assets/ */
    let imgSrc = "/assets/img/testimg.jpg";

    export let title = "default title";

    let tags = ["C#", "Unity"];
</script>

<style>
    .card{
        background: #EDF7F7;
        color: black;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        width: 100%; /* Make the cards fill up the entire "project-cards" container found in projects.svelte */ 
        border-radius: 1em;
        margin: .2em; /* grid gap */
    }

    img{
        width: 100%;
        height: auto;
    }

    h4{
        margin: 0; /* reset default margin */
        font-weight: bold;
        text-align: start; /* Make sure its placed at the start of the element area */
    }

    p{
        margin: 0; /* reset default margin */
    }
</style>

<div class="card">
    <img src={imgSrc} alt="This is a test">
    <h4>{title}</h4>
    <p>{tags}</p>
</div>