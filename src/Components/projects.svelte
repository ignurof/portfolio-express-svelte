<script>
    import Projectcard from "../components/projectcard.svelte";

    // Found in projectlist.js
    export let projectList;
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
    {projectList}
    <Projectcard />
</div>