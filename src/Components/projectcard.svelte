<script>
    let imgSrc = "../../assets/testimg.jpg";

    export let title = "default title";
</script>

<style>
    .card{
        display:flex;
        flex-direction: column;
        border: 2px solid #d4851d;
        box-shadow: 0px 4px 2px #d4851d;
        width: 33%;
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
    </button>
</div>