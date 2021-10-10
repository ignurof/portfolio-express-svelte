<script>
    let inputValue = "";

    // Export this and fill it in server.js using chathistory.js
    export let chatLog = [];
    // This will take all the indices of chatLog array and generate proper html
    export let outputChatText;

    const SendChatMessage = async() => {
        let currentDate = new Date();
        let date = currentDate.getFullYear() + "-" + currentDate.getDate() + "-" + currentDate.getMonth();
        let currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        let time = date + "|" + currentTime;

        let chatMsg = {
            time,
            inputValue
        };
        
        let apiUrl = "http://localhost:3000/chat/" + JSON.stringify(chatMsg);
        // Send JSON string as params using POST
        let request = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        // Status check
        if(request.ok){
            let response = await request.json();
            // Update chatlog on client
            UpdateChatLog(response.inputValue);
        } else {
            console.error("Something went wrong with chat update");
        }
    }

    // Updates the chatbox with a new message
    const UpdateChatLog = (msg) => {
        // Get new chat
        ReactiveChat();

        // Reset old
        outputChatText = "";

        chatLog.push(msg);

        // Iterate over each item in history and add that to the chatLog string
        chatLog.forEach(element => {
            // Fix for the first empty index that creates a whitespace in the top of chatbox
            // TODO: Gör så att online status kollas ifall jag är aktiv på admin sidan?
            if(element === "") {
                element = "<div style='color: #8c6f51; margin: 0 auto; width: 50%; text-align: center;'>Ignurof is currently <span style='color: red;'>OFFLINE</span></div>"; 
            }

            outputChatText += element + "<br />";
        });
    }

    // Updates chat
    const ReactiveChat = async() => {
        let apiUrl = "http://localhost:3000/chat";
        // Send GET
        let request = await fetch(apiUrl);
        // Status check
        if(request.ok){
            let response = await request.json();
            // Update chatlog on client
            chatLog = response.chatHistory;
        } else {
            console.error("Something went wrong with chat update");
        }
    }

    // Reactivity
    $: inputValue;
    $: outputChatText;
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

<div class="chatlog" readonly contenteditable="true" bind:innerHTML={outputChatText}>
</div>

<textarea rows="4" columns="42" bind:value={inputValue} />
<button on:click={SendChatMessage}>Send</button>