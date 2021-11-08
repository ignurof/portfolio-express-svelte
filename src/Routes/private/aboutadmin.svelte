<script>
    import Navbaradmin from "../../components/private/navbaradmin.svelte"

    export let aboutContent;
</script>

<style>
    .about-card{
        background: #EDF7F7;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        border-radius: .3em;
        margin: 0 auto; 
        width: 66%;
        padding: 1em;
    }

    fieldset{
        border: 0;
        background: #1D2E35;
        height: 10em;
        padding: 1em;
    }
</style>

<main>
    <Navbaradmin currentPage="about" />

    <div class="about-card">
        <fieldset contenteditable type="text" bind:textContent={aboutContent} />
    </div>
</main>