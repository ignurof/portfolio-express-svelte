<script>
    import Navbar from "../components/navbar.svelte";

    // Projects
    export let projectList;

    export let index;
    export let title;
    export let content;
    export let tags;
    export let images;
    export let links;

    let linkList = [];

    const ParseLinks = () => {
        // For every item in links
        for(let x = 0; x < links.length; x++){
            // Parse the contents by splitting up the string into an array, separated by the hashtag
            let newArray = links[x].split("#");
            let newObject = {
                "href": newArray[0],
                "text": newArray[1]
            }
            linkList.push(newObject);
        }
    }

    let newHref;

    // The projectCards are displayed in reverse order so going back would be going up
    const ChangeProject = (previous) => {
        // Simple If-Else statement is better made with this ternary operator
        let maxIndex = projectList.length - 1;
        // This is a ternary operator that replace if-else statement which looks like this:
        /* If(previous){
            if(index < maxIndex){
                ++index;
            } else {
                0;
            }
        } else {
            --index;
        }
        */
        // Loops around if index goes out of bounds ( go back if current index is less than maxIndex (raise number), go forward if currentIndex is greater than max index AKA larger number (lower number))
        let newIndex = (previous) ? (index > 0 ? --index : maxIndex) : (index < maxIndex ? ++index : 0);
        let apiUrl = `/project/${newIndex}`;
        newHref = apiUrl;
    }


    $: links, ParseLinks();
</script>

<style>
    .project-header{
        display:flex;
        flex-direction: row;
        justify-content: center; /* Centrerar en flex */
        
    }

    /* Positions the directional arrows more vertically aligned with title */
    .project-header a{
        position: relative;
        bottom: 1em;
    }

    .project-header-title{
        display:flex;
        flex-direction: column;
    }

    .links{
        display:flex;
        flex-direction: row;
        margin: 0 auto;
        margin-bottom: 2em;
    }

    a{
        text-decoration: underline;
        font-size: 1em;
        font-weight: 400;
        cursor: pointer;
        color: inherit;
        margin: 1em;
    }

    a:hover{
        color: #038A7A;
    }

    h2 {
        margin: 0;
        padding-left: 1em;
        padding-right: 1em;
    }

    .tiny{
        margin-bottom: 2em;
        font-size: .6em;
        text-align: center;
        color: #99A0A4;
    }

    .img-card{
        min-width: 100%;
        min-height: 100px;
        /* box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25); */
        border-radius: .3em;
        margin-top: .4em; /* grid gap */
        margin-bottom: .4em;
        background: rgba(0, 0, 0, 0.25); /* min-height adds some weird empty spacy, so im doingm my box shadow here kind of */
        text-align: center;
        color: #de5733;
    }

    img{
        width: 100%;
        height: auto;
        border-radius: .3em;
    }

    p{
        /* top left bottom right I THINK */
        margin: 1em 0 2em 0;
    }

    svg{
        width: 3em;
        fill: #038A7A;
    }

    svg:hover{
        stroke: #EDF7F7;
    }
</style>
<!-- Im passing it here because I want the page to act like its still the projects page -->
<Navbar activePage="projects"/>

<main>
    <div class="project-header">
        <a href={newHref} on:click={() => ChangeProject(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
            </svg>
        </a>
        <div class="project-header-title">
            <h2>{title}</h2>
            <div class="tiny">{tags}</div>
        </div>
        <a href={newHref} on:click={() => ChangeProject(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
            </svg>
        </a>
    </div>
    <div class="links">
        {#each linkList as { href, text }}
            <a {href} target="_blank">{text}</a>
        {/each}
    </div>
    <p>{content}</p>
    <div class="gallery">
        {#each images as image}
        <div class="img-card">
            <img src={"/assets/img/" + image} alt={"Could not find image: " + image} />
        </div>
        {/each}
    </div>
</main>