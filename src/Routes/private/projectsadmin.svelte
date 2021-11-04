<script>
    import Navbaradmin from "../../components/private/navbaradmin.svelte"

    export let projectList;

    let confirmWindow = false;

    let projectIndex;

    const SetIndex = (index) => {
        // Show confirm window
        ToggleConfirmWindow();

        projectIndex = index;
    }

    const DeleteProject = async(index) => {
        if(index == 1337){
            index = projectIndex;
        }

        let apiUrl = `/admin/projects/delete/${index}`;
        let response = await fetch(apiUrl, {
            method: "POST"
        });
        // Error check
        if(!response.ok){
            // Early return out this bish
            return console.error("ERROR!!!!");
        }

        // Parse the object sent by server
        let result = await response.json();
        if(result.status === "OK"){
            // Update projectList
            projectList = result.projectList;
            //console.log(projectList);
            // Remove confirm window
            ToggleConfirmWindow();
        }
    }

    // Should run at the end of a confirm action
    const ToggleConfirmWindow = () => {
        // If is true, set to false, else set to true
        confirmWindow = !confirmWindow;
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

    {#if confirmWindow}
        <div class="confirm-modal">
            <p>Confirm delete?</p>
            <button on:click={() => DeleteProject(1337)}>Yes</button>
            <button on:click={() => ToggleConfirmWindow()}>No</button>
        </div>
    {/if}

    <div class="project-admin">
        <div class="project-list">
            {#each projectList as {title}, i}
                <div class="project-item">
                    <h4>{title}</h4>
                    <button on:click={() => SetIndex(i)}>X</button>
                </div>
            {/each}
        </div>
        <div class="project-details-card">
    
        </div>
    </div>
</main>