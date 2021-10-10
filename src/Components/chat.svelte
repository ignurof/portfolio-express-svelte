<script>
    let inputValue;

    // Export this and fill it in server.js
    export let chatLog;

    const UpdateChat = async() => {
        let currentDate = new Date();
        let date = currentDate.getFullYear() + "-" + currentDate.getDate() + "-" + currentDate.getMonth();
        let currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        let time = date + "|" + currentTime;

        let chatMsg = time + ": " + inputValue;
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
            // Update chatlog on client
            chatLog = response;
        } else {
            console.error("Something went wrong with chat update");
        }
    }

    // Updates chat
    const ReactiveChat = async() => {
        let apiUrl = "http://localhost:3000/chat";
        // Send GET
        let request = await fetch(apiUrl);
        // Status check
        if(request.ok){
            let response = await request.text();
            // Update chatlog on client
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
        margin: 1em auto;
    }

    .chatlog{
        width: 20%;
        height: 420px;
        margin: 1em auto;
        padding: 1em;
        font-size: 0.6em;
        border-radius: 4px;
        border: 1px solid black;
        /* x-offset, y-offset, blur-radius, color */
        box-shadow: 2px 4px 8px gray;
    }
</style>

<h2>Chat with Ignurof</h2>

<div class="chatlog" readonly contenteditable="true" bind:innerHTML={chatLog}>
</div>

<textarea rows="4" columns="42" bind:value={inputValue} />
<button on:click={UpdateChat}>Send</button>