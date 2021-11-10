<script>
    import { onMount } from 'svelte';
    import Navbaradmin from "../../components/private/navbaradmin.svelte"

    export let projectList;

    let reversedList = [];

    // Reverses the list before everything else
    onMount(async () => {
		reversedList = projectList.reverse();
	});

    const RefreshList = () => {
        reversedList = [];
        reversedList = projectList.reverse();
    }

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
        RefreshList();
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
        RefreshList();
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
        RefreshList();
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

    const RemoveFields = (choice) => {
        if(choice === "tag"){
            if(pTags.length <= 0) return;
            pTags.splice(pTags.length - 1, 1);
        }else if(choice === "images"){
            if(pImages.length <= 0) return;
            pImages.splice(pImages.length - 1, 1);
        }else if(choice === "links"){
            if(pLinks.length <= 0) return;
            pLinks.splice(pLinks.length - 1, 1);
        }

        UpdateProjectData();
    }

    // Reactively run UpdateCurrentProject() whenever pIndex gets changed
    $: pIndex, UpdateProjectData();

    //TODO: Styla project-details-card och se till så den ser snygg och enhetlig ut också 
</script>

<style>
    .project-admin{
        display:flex;
        flex-direction: row;
        justify-content: center;
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

    .project-item button{
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

    .project-item button:hover{
        color: red;
    }

    .project-item h4:hover{
        color: #038A7A;
    }

    .project-item-newproject{
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .project-item-newproject button{
        border: 0;
        background: #038A7A;
        color: #EDF7F7;
        font-weight: bold;
        font-size: 1em;
        border-radius: .4em;
        cursor: pointer;
        height: 3em;
    }

    .project-details-card{
        display:flex;
        flex-direction: column;
        background: #EDF7F7;
        color: black;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        border-radius: .3em;
        margin-left: 1em;
        width: 66%;
        padding: 1em;
    }

    .project-details-card button{
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

    legend{
        font-size: 1em;
        font-weight: 600;
        margin-bottom: .2em;
    }

    svg {
        color: #038A7A;
        cursor: pointer;
        width: 1em;
    }

    .icons{
        display:flex;
        flex-direction: row;
    }

    input{
        border: 1px solid #a2a8a8;
        background: #c0c7c7;
        color: rgb(33, 33, 33);
        border-radius: .3em;
        font-size: .8em;
        height: 2em;
        margin-bottom: .2em;
        padding-left: .4em;
        padding-right: .4em;
    }

    .divider{
        margin-top: .6em;
        margin-bottom: .6em;
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
            {#each reversedList as {title}, i}
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
            <div class="divider"></div>
            <legend>CONTENT</legend>
            {#if pContent != null}
                <input type="text" bind:value={pContent} />
            {/if}
            <div class="divider"></div>
            <legend>
                TAGS
            </legend>
            {#if pTags != null}
                {#each pTags as tag}
                    <input type="text" bind:value={tag} />
                {/each}
                <div class="icons">
                    {#if pTags.length <= 4}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" on:click={() => AddFields("tag")}>
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                        </svg>
                    {/if}
                    {#if pTags.length >= 1}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" on:click={() => RemoveFields("tag")}>
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                        </svg>
                    {/if}
                </div>
            {/if}
            <div class="divider"></div>
            <legend>IMAGES</legend>
            {#if pImages != null}
                {#each pImages as image}
                    <input type="text" bind:value={image} />
                {/each}
                <div class="icons">
                    {#if pImages.length <= 4}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" on:click={() => AddFields("images")}>
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                        </svg>
                    {/if}
                    {#if pImages.length >= 1}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" on:click={() => RemoveFields("images")}>
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                        </svg>
                    {/if}
                </div>
            {/if}
            <div class="divider"></div>
            <legend>LINKS</legend>
            {#if pLinks != null}
                {#each pLinks as link}
                    <input type="text" bind:value={link} />
                {/each}
                <div class="icons">
                    {#if pLinks.length <= 4}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" on:click={() => AddFields("links")}>
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                        </svg>
                    {/if}
                    {#if pLinks.length >= 1}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" on:click={() => RemoveFields("links")}>
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                        </svg>
                    {/if}
                </div>
            {/if}
            <button on:click={() => EditProject()}>UPDATE</button>
        </div>
    </div>
</main>