<script>
    import Navbaradmin from "../../components/private/navbaradmin.svelte"

    export let projectList;

    let confirmWindow = false;
    let deleteTarget;

    const SetDeleteTarget = (newTarget) => {
        deleteTarget = newTarget;

        ToggleConfirmWindow();
    }

    const ToggleConfirmWindow = () => {
        confirmWindow = !confirmWindow;
    }

    const DeleteProject = async() => {
        let index = deleteTarget;

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
        // Update projectList
        projectList = result.projectList;
        // Remove togglewindow
        ToggleConfirmWindow();
    }

    const EditProject = async() => {
        // Send only if pIndex is available
        if(pIndex === undefined || pIndex === null) return console.error("pIndex is not here");

        // Declare JSON Object that be used in fetch calls
        let projectObj = {
            "title": pTitle,
            "content": pContent,
            "tags": pTags,
            "images": pImages,
            "links": pLinks
        }

        let apiUrl = `/admin/projects/edit/${pIndex}`;
        let response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }, // Object needs to be converted to string to be sent over network
            body: JSON.stringify(projectObj)
        });
        // Error check
        if(!response.ok){
            // Early return out this bish
            return console.error("ERROR!!!!");
        }

        // Parse the object sent by server
        let result = await response.json();
        // Update projectList
        projectList = result.projectList;
    }

    const AddProject = async() => {
        // Declare JSON Object that be used in fetch calls
        // Self-referencing example
        let projectObj = {
            "title": "Project Name",
            "content": "Content field here",
            "tags": ["Techstack"],
            "images": ["folder/filename.filetype"],
            "links": ["https://link.com#Display Text Here after the hashtag"]
        }

        let apiUrl = `/admin/projects/add`;
        let response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }, // Object needs to be converted to string to be sent over network
            body: JSON.stringify(projectObj)
        });
        // Error check
        if(!response.ok){
            // Early return out this bish
            return console.error("ERROR!!!!");
        }

        // Parse the object sent by server
        let result = await response.json();
        // Update projectList
        projectList = result.projectList;
    }

    // Declare them so they are correct at runtime
    let pIndex;
    let pTitle;
    let pContent;
    let pTags;
    let pImages;
    let pLinks;   

    // Set temporary project index
    const SetProjectData = (index) => {        
        pIndex = index;
    }

    // Updates the fields with the data we want to see
    const UpdateProjectData = () => {
        if(pIndex === undefined || pIndex === null) return console.error("pIndex is not here");

        pTitle = projectList[pIndex].title;
        pContent = projectList[pIndex].content;
        pTags = projectList[pIndex].tags;
        pImages = projectList[pIndex].images;
        pLinks = projectList[pIndex].links;
    }

    const AddFields = (choice) => {
        if(choice === "tag"){
            pTags.push("new");
        }else if(choice === "images"){
            pImages.push("new");
        }else if(choice === "links"){
            pLinks.push("new");
        }

        UpdateProjectData();
    }

    // Reactively run UpdateCurrentProject() whenever pIndex gets changed
    $: pIndex, UpdateProjectData();
</script>

<style>
    .project-admin{
        display:flex;
        flex-direction: row;
        justify-content: center;
    }

    .project-item{
        display:flex;
        flex-direction: row;
        background: #EDF7F7;
        color: black;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        border-radius: .3em;
        width: 100%;
        margin-bottom: 1em;
        height: 3em;
    }

    .project-item h4:hover{
        color: #038A7A;
    }

    .project-item-newproject{
        border: 0;
        background: #038A7A;
        color: #EDF7F7;
        font-weight: bold;
        font-size: 1em;
        border-radius: .4em;
        cursor: pointer;
        width: 100%;
        height: 2em;
        text-align: center;
        padding-top: .5em;
        padding-bottom: .5em;
    }

    .project-list{
        display: flex;
        flex-direction: column;
        width: 33%;
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
        margin-left: 1em;
        display: flex;
        flex-direction: column;
        width: 66%;
    }

    legend{
        margin-bottom: .6em;
        margin-top: .6em;
        margin-left: .5em;
        font-weight: 600;
    }

    legend span {
        font-size: 1.2em;
        color: #EDF7F7;
        background: #038A7A;
        padding: .2em;
        border-radius: .6em;
        margin-left: .4em;
        cursor: pointer;
    }

    input{
        margin-left: 1em;
        margin-right: 1em;
        margin-bottom: 1em;
    }

    .confirm-modal{
        position: fixed; /* Stay in place */
        z-index: 2; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgba(0,0,0,0.8); /* Black w/ opacity */
    }

    .confirm-modal div{
        background: #EDF7F7;
        color: black;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        border-radius: .3em;
        width: 10em;
        margin: 12em auto;
        display: flex;
        flex-direction: column;
    }

    .confirm-modal button{
        border: 0;
        background: #038A7A;
        color: #EDF7F7;
        font-weight: bold;
        font-size: 1em;
        border-radius: .4em;
        cursor: pointer;
        width: 50%;
        margin: .6em auto;
        padding: .2em;
    }

    .confirm-modal h4{
        text-align: center;
        margin: .6em;
    }
</style>

<main>
    <Navbaradmin currentPage="projects" />

    {#if confirmWindow}
    <div class="confirm-modal">
        <div>
            <h4>Delete Project?</h4>
            <button on:click={() => DeleteProject()}>YES</button>
            <button on:click={() => ToggleConfirmWindow()}>NO</button>
        </div>
    </div>
    {/if}

    <div class="project-admin">
        <div class="project-list">
            {#each projectList as {title}, i}
                <div class="project-item">
                    <h4 on:click={() => SetProjectData(i)}>{title}</h4>
                    <button on:click={() => SetDeleteTarget(i)}>X</button>
                </div>
            {/each}
            <div class="project-item-newproject">
                <button on:click={() => AddProject()}>CREATE</button>
            </div>
        </div>
        <div class="project-details-card">
            <legend>TITLE</legend>
            {#if pTitle != null}
                <input type="text" bind:value={pTitle} />                
            {/if}
            <legend>CONTENT</legend>
            {#if pContent != null}
                <input type="text" bind:value={pContent} />
            {/if}
            <legend>TAGS<span on:click={() => AddFields("tag")}>+</span></legend>
            {#if pTags != null}
                {#each pTags as tag}
                    <input type="text" bind:value={tag} />
                {/each}
            {/if}
            <legend>IMAGES</legend>
            {#if pImages != null}
                {#each pImages as image}
                    <input type="text" bind:value={image} />
                {/each}
            {/if}
            <legend>LINKS</legend>
            {#if pLinks != null}
                {#each pLinks as link}
                    <input type="text" bind:value={link} />
                {/each}
            {/if}
            <button on:click={() => EditProject()}>Update</button>
        </div>
    </div>
</main>