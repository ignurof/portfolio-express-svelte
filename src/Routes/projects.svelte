<script>
    import Projectcard from "../components/projectcard.svelte";

    import Navbar from "../components/navbar.svelte";

    // Found in projectlist.js
    export let projectList;
</script>

<style>
    .project-cards{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1em;
    }
</style>

<!-- I need to pass the vars into Navbar so they can be used by it, but I also need to put them here when im exporting from Navbar into this file -->
<Navbar activePage="projects"/>

<main>
    <div class="project-cards">
        {#each projectList as { title, content, tags, images }, index}
            <!--{i} Prints out the current index -->
            <Projectcard {index} {title} {images} {content} />
        {/each}
    </div>
</main>
