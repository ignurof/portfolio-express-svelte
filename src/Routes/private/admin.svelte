<script>
    import Navbar from "../../components/navbar.svelte";

    let userName, passWord;

    const attemptLogin = () => {
        console.log("Logged in");
    }

    // Reactivity
    $: userName, passWord;
</script>

<style>

</style>

<main>
    <Navbar />

    <legend>Username</legend>
    <input type="text" bind:value={userName} />
    
    <legend>Password</legend>
    <input type="password" bind:value={passWord} />
    
    <button on:click={attemptLogin}>Login</button>
</main>
