<script>
    let inputValue;

    // Export this and fill it in server.js
    export let chatLog;
    // Makes sure the chatLog gets output on first page load on client
    let chatLogOutput = chatLog;

    const UpdateChat = async() => {
        let chatMsg = "Timestamp: " + inputValue;
        let apiUrl = "http://localhost:3000/chat/" + chatMsg;
        // Send POST
        let request = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "charset=UTF-8"
            }
        });
        // Status check
        if(request.ok){
            let response = await request.text();
            // Reset values so it looks good on client
            chatLogOutput = "";
            // Update chatlog on client
            chatLog = response;
            // Convert to put into the div
            chatLogOutput = "<p>" + chatLog + "</p>";
        } else {
            console.error("Something went wrong with chat update");
        }
    }

    // Reactivity
    $: inputValue;
    $: chatLogOutput;
</script>

<style>
    textarea{
        width: 50%;
        margin: 1em auto;
    }

    .chatlog{
        width: 20%;
        margin: 1em auto;
        font-size: 0.6em;
        border-radius: 4px;
        border: 1px solid black;
        padding: 1em;
        /* x-offset, y-offset, blur-radius, color */
        box-shadow: 2px 4px 8px gray;
    }
</style>

<h2>Chat with Ignurof</h2>

<div class="chatlog" readonly contenteditable="true" bind:innerHTML={chatLogOutput}/>

<textarea rows="4" columns="42" bind:value={inputValue} />
<button on:click={UpdateChat}>Send</button>