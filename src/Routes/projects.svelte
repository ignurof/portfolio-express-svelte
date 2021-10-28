<script>
    import Projectcard from "../components/projectcard.svelte";

    import Navbar from "../components/navbar.svelte";

    // Found in projectlist.js
    export let projectList;

    export let coolQuote;

    // Found in projectcard.svelte
    // FIXME: NOTE TO ME: Behöver inte ha denna variabel här pga att jag exportar från projectcard och då bara behöver passa in rätt namns variabel i html <Projectcard {title}
    //let title;
    // Exporterat från projectcard men behövs inte här då jag specifier index var namnet i foreach loopen att heta index istället för i
    //let index;
</script>

<style>
    .project-cards{
        display: flex;
        flex-direction: row-reverse; /* Descending Order */
        justify-content: center;
    }
</style>

<!-- I need to pass the vars into Navbar so they can be used by it, but I also need to put them here when im exporting from Navbar into this file -->
<Navbar {coolQuote} activePage="projects"/>

<main>
    <div class="project-cards">
        {#each projectList as { title, content, tags, images }, index}
            <!--{i} Prints out the current index -->
            <Projectcard {index} {title} />
        {/each}
    </div>
</main>
