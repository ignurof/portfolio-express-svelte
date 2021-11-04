<script>
    import Navbaradmin from "../../components/private/navbaradmin.svelte"

    export let projectList;

    const DeleteProject = () => {

    }
</script>

<style>
    .project-admin{
        display:flex;
        flex-direction: row;
    }

    .project-item{
        display:flex;
        flex-direction: row;
    }

    .project-list{
        background: #EDF7F7;
        color: black;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        border-radius: .3em;
        width: 33%; /* ONE card = 33% area of parent container aka projects */
        height: 100%;
        display: flex;
        flex-direction: column-reverse;
    }

        .project-list h4{
            font-size: 1em;
            margin: 1em;
        }

        .project-list button{
            border: 0;
            background: #038A7A;
            color: #EDF7F7;
            font-weight: bold;
            font-size: 1em;
            border-radius: .4em;
            cursor: pointer;
            margin-top: .4em;
            margin-bottom: .4em;
            margin-left: auto;
            margin-right: .4em;
            width: 24%;
        }

        .project-list button:hover{
            color: red;
        }

    .project-details-card{
        background: #EDF7F7;
        color: black;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        border-radius: .3em;
        width: 66%; /* ONE card = 33% area of parent container aka projects */
        margin-left: 1em;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>

<main>
    <Navbaradmin currentPage="projects" />

    <div class="project-admin">
        <div class="project-list">
            {#each projectList as {title}, i}
                <div class="project-item">
                    <h4>{title}</h4>
                    <button on:click={() => {DeleteProject(i)}}>X</button>
                </div>
            {/each}
        </div>
        <div class="project-details-card">
    
        </div>
    </div>
</main>