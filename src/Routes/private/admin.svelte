<script>
    import Navbar from "../../components/navbar.svelte";

    let userName, passWord;

    // TODO: Gör så att den skickar värdena till server som då kollar om dom stämmer och isåfall skickar användaren rätt
    const attemptLogin = () => {
        console.log("Logged in");
    }

    // Reactivity
    $: userName, passWord;
</script>

<style>
    .login{
        display: flex;
        flex-direction: column;
        width: 50%;
        margin: 1em auto;
    }

    legend{
        font-size: 1.2em;
        margin: 1em 0; /* topbtm, leftright */
    }

    input{
        height: 3em;
        font-size: 1em;
        border: 0; /* remove standard input border */
        outline: 2px solid #336460;
    }

    /* This button hella insane tho, what is this mess? I absolutely hate CSS even though ive made it my bitch */
    button{
        width: 50%;
        background: #336460; /* blueish green */
        color: #d4851d; /* goldenish */
        font-weight: bold;
        font-size: 1.4em;
        font-family: monospace;
        padding: .4em;
        border: 0; /* remove standard button border */
        margin: 1em auto;
        text-shadow: /* Outline for text */
            2px 2px 0px #000,
            -1px -1px 0px #000,  
            1px -1px 0px #000,
            -1px 1px 0px #000,
            1px 1px 0px #000;

        box-shadow: -2px 4px 8px #8c6f51;
    }
</style>

<main>
    <Navbar />

    <div class="login">
        <legend>Username</legend>
        <input type="text" bind:value={userName} />
        <legend>Password</legend>
        <input type="password" bind:value={passWord} />
        <button on:click={attemptLogin}>Login</button>
    </div>
</main>
