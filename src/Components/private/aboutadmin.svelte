<script>
    const aboutcontent = require(__dirname + "src/aboutcontent.js");
    
    let contentString = "aboutadmin default value";

    const UpdateContent = () => {
        aboutcontent.EditAboutContent(contentString);
    }
</script>

<style>

</style>

<h2>About</h2>
<legend>Update the content text here:</legend>
<input type="text" value={contentString} />
<button on:click={UpdateContent}>Update</button>