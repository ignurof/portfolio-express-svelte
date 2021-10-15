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
        border: 4px solid #2b2a28; /* OLD: #de5733 */
        box-shadow: -2px 6px 4px #2b2a28;
        width: 33%;
        margin: .2em;
        background: #2b2a28;
        color: #d4851d;
    }

    .card-content{
        display:flex;
        flex-direction: row;
    }

    button{
        color: inherit; /* inherits body text color */
        border: 0;
        background: none;
        cursor: pointer;
        width: 100%;
        height: 100%;
        padding: 0;
    }

    img{
        width: 100%;
        height: auto;
    }

    h4{
        margin: 0; /* reset default margin */
        padding: .4em;
        font-weight: bold;
        flex-grow: 9; /* Take up 9/1 */
        text-align: start; /* Make sure its placed at the start of the element area */
        text-shadow: 1px 1px 0px #de5733;
    }

    p{
        margin: 0; /* reset default margin */
        padding: .4em;
        flex-grow: 1; /* take up 1/9 */
    }
</style>

<div class="card">
    <button>
        <img src={imgSrc} alt="This is a test">
        <div class="card-content">
            <h4>{title}</h4>
            <p>{tags}</p>
        </div>
    </button>
</div>