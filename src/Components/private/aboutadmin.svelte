<script>
    const aboutcontent = require("../../aboutcontent.js");
    
    let contentString = "aboutadmin default value";

    const UpdateContent = () => {
        aboutcontent.EditAboutContent(contentString);
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