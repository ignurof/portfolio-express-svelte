<script>
import About from "../about.svelte";

    
    let contentString = "aboutadmin default value";

    export let aboutText;

    const UpdateContent = async() => {
        aboutText = contentString;
        // Here I send the aboutText string as an Express param instead
        // I can do this and then grab it with req.params.paramName
        let apiUrl = "http://localhost:3000/admin/about/" + aboutText;

        // Send the request
        let request = await fetch(apiUrl, {
            // Adding method type
            method: "POST",
            // Adding body or contents to send and turn from JSON object to JSON string
            /* This would be used in other cases
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
</script>

<style>
    legend{
        color: blueviolet;
    }
</style>

<h2>About</h2>
<legend>Update the content text here:</legend>
<input type="text" value={contentString} />
<button on:click={UpdateContent}>Update</button>