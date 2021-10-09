<script>
    // Turning context to module makes everything inside the aboutadmin.svelte with export tag to also be exported
    export let aboutText = "default text";

    const UpdateContent = async() => {
        // Here I send the aboutText string as an Express param instead
        // I can do this and then grab it with req.params.paramName
        let apiUrl = "http://localhost:3000/admin/about/" + aboutText;

        // Send the request
        let request = await fetch(apiUrl, {
            // Adding method type
            method: "POST",
            // Adding body or contents to send and turn from JSON object to JSON string
            /* This
            body: JSON.stringify({
                content: aboutText,
            }),*/
            // Adding headers to the request
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        if(request.ok) {
            // If the request was returned 200 OK then parse the response as JSON object using .json
            // in this scenario server only responds with a text string so using .text
            let response = await request.text();
            console.log(response);
        } else {
            // Output potential error in console
            console.log("Connection error: " + request.status);
        }
    }

    // Reactivity ( $: aboutText, UpdateContent(); )
    // Doing this instead to only update with the button
    $: aboutText;
</script>

<style>
    legend{
        color: blueviolet;
    }
</style>

<h2>About</h2>
<legend>Update the content text here:</legend>
<!-- bind:value directly instead of a button with on:click={Function}-->
<input type="text" bind:value={aboutText} />
<button on:click={UpdateContent}>Update</button>