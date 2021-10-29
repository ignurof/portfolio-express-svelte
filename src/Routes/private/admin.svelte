<script>
    let name = "administration";

    let userName, passWord;

    // TODO: Gör så att den skickar värdena till server som då kollar om dom stämmer och isåfall skickar användaren rätt
    const attemptLogin = () => {
        console.log("Logged in");
    }

    // Reactivity
    // I do bind:value to allow these vars to update Reactively when the values change
    $: userName, passWord;
</script>

<style>
    /* Copied from Navbar */
    h1{
        margin: 0;
        font-size: 2.4em;
        color: #de5733;  /* #336460 blueishgreen #d4851d goldenish saving these for maybe something else*/
        /* offset-x | offset-y | blur-radius | color */
        text-shadow: 2px 2px 0px rgb(126, 49, 28);
        text-align: center; /* custom for this page */
    }

    .login{
        display: flex;
        flex-direction: column;
        width: 44%;
        margin: 3em auto;
    }

    legend{
        margin-top: 1em;
        margin-bottom: .4em;
        font-size: .8em;
    }

    input{
        background: #EDF7F7;
        color: black;
        box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
        border-radius: .3em;
        font-size: .8em;
        height: 2em;
    }

    .divider{
        margin-top: 2em;
    }

    button{
        border: 0;
        background: #038A7A;
        color: #EDF7F7;
        font-weight: bold;
        font-size: .8em;
        border-radius: .4em;
        padding: 1em;
        cursor: pointer;
        width: 40%;
        margin: 4em auto;
    }
</style>

<main>
    <h1>{name.toUpperCase()}</h1>

    <div class="login">
        <legend>USERNAME</legend>
        <input type="text" />
        <div class="divider"></div>
        <legend>PASSWORD</legend>
        <input type="password" />
        <button>
            LOGIN
        </button>
    </div>
</main>
