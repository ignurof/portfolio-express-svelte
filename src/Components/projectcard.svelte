<script>
    let imgSrc = "../../assets/testimg.jpg";

    export let title = "default title";
</script>

<style>
    .card{
        border: 4px solid #336460;
        border-radius: 8px;
    }
</style>

<div class="card">
    <a href="/">
        <img src={imgSrc} alt="This is a test">
        <h4>{title}</h4>
    </a>
</div>