<script>
    let inputValue;

    // Export this and fill it in server.js
    export let chatLog;

    const UpdateChat = async() => {
        let apiUrl = "http://localhost:3000/chat/" + inputValue;
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
            // Update chatlog on client
            chatLog = "";
            chatLog = response;
        } else {
            console.error("Something went wrong with chat update");
        }
    }

    // Reactivity
    $: inputValue;
    $: chatLog;
</script>

<style>
    textarea{
        width: 50%;
        margin: 0 auto;
    }

    .chatlog{
        width: 60%;
        margin: 1em auto;
    }
</style>

<h2>Chat with Ignurof</h2>

<textarea class="chatlog" readonly bind:value={chatLog} />

<textarea rows="4" columns="42" bind:value={inputValue} />
<button on:click={UpdateChat}>Send</button>