<script>
    import Projectcard from "../components/projectcard.svelte";

    export let testVar;
</script>

<style>
    .project-cards{
        display: flex;
        flex-direction: row;
        width: 60%;
        margin: 1em auto;
        padding: 1em;
    }
</style>

<h2>Projects</h2>

<div class="project-cards">
    {testVar}
    <Projectcard />
</div>