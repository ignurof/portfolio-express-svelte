<script>
    import Navbaradmin from "../../components/private/navbaradmin.svelte"

    export let aboutContent;

    const UpdateAbout = async() => {
        let apiUrl = "/admin/about/edit";
        let response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify([{"aboutText": aboutContent}])
        });

        if(!response.ok){
            return console.error("about admin fetch error");
        }
    }
</script>

<style>
    .about-card{
        display:flex;
        flex-direction: column;
        background: #EDF7F7;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        border-radius: .3em;
        margin: 0 auto; 
        width: 66%;
        padding: 1em;
    }

    fieldset{
        border: 0;
        border-radius: .3em;
        background: #1D2E35;
        height: 10em;
        padding: 1em;
    }

    button{
        border: 0;
        background: #038A7A;
        color: #EDF7F7;
        font-weight: bold;
        font-size: 1em;
        border-radius: .4em;
        cursor: pointer;
        margin-top: 1em;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: .2em;
        padding: 1em;
    }
</style>

<main>
    <Navbaradmin currentPage="about" />

    <div class="about-card">
        <fieldset contenteditable type="text" bind:textContent={aboutContent} />
        <button on:click={() => UpdateAbout()}>UPDATE</button>
    </div>
</main>