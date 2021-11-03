<script>
    import validator from "validator/validator.js";
    import md5 from "blueimp-md5/js/md5.js"; // This is giving a weird warning in VSCode but its working? FIXME: What is this declaration issue

    let name = "administration";

    let userName = "";
    let passWord = "";

    // TODO: Gör så att den skickar värdena till server som då kollar om dom stämmer och isåfall skickar användaren rätt
    const AttemptLogin = async() => {
        // Verify integrity of input first before sending data
        let canSendData = true;

        if(validator.isEmpty(userName)) {
            console.error("Username is empty!");
            canSendData = false;
        }

        if(validator.isEmpty(passWord)) {
            console.error("Password is empty!");
            canSendData = false;
        }

        // validator.escape() will convert HTML tags into HTML entities. https://linguinecode.com/post/validate-sanitize-user-input-javascript
        // Sanitize the input by escaping the string, thus protecting against XSS
        userName = validator.escape(userName);
        passWord = validator.escape(passWord);

        // Encrypt password
        let ePassWord = md5(passWord);

        // Store user details inside JSON Object
        let userDetails = {
            userName,
            ePassWord
        };

        // Only send data if input integrity has been verified
        if(canSendData){
            let apiUrl = "/admin/login/";
            let response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }, // Object needs to be converted to string to be sent over network
                body: JSON.stringify(userDetails)
            });

            let result = await response.json();
            console.log(result);

            if(result.status === "invalidpw"){
                return alert("Incorrect password!");
            }
            if(result.status === "invaliduser"){
                return alert("User does not exist!");
            }
            if(result.status === "OK"){
                return location.href = "/admin/about/";
            }

            // Early returns should make it so we dont end up here unless 100% success
            console.log(document.cookie);
        } else{
            console.error("Could not send data!");
        }
    }

    const GetCookie = () => {
        let cookies = document.cookie;
        let cookieObj = cookies.split('=');
        // auth=stringhere; cookie2=string;
        console.log(cookieObj[1]);
        return cookieObj[1];
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
        font-weight:600;
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
        <input type="text" bind:value={userName} />
        <div class="divider"></div>
        <legend>PASSWORD</legend>
        <input type="password" bind:value={passWord} />
        <button on:click={AttemptLogin}>
            LOGIN
        </button>
    </div>
</main>
