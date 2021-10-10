<script>
    let inputValue;

    let chatValues;

    const UpdateChat = async() => {
        let apiUrl = "http://localhost:3000/chat/" + inputValue;
        // Send POST
        let request = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        // Status check
        if(request.ok){
            let response = await request.json();
            console.log(response);
        } else {
            console.error("Something went wrong with chat update");
        }
    }

    // Reactivity
    $: inputValue;
</script>

<style>
    textarea{
        width: 50%;
        margin: 0 auto;
    }
</style>

<h2>Chat with Ignurof</h2>

<textarea readonly rows="12" columns="69">{inputValue}</textarea>

<textarea rows="4" columns="42" bind:value={inputValue} />
<button on:click={UpdateChat}>Send</button>