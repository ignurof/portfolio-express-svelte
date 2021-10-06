<script>
    // Import payload handler (optional if using export)
    import payload from "svelte-view-engine/payload";
    // Example component (doesn't get rendered by the view engine outside of this file)
    import Example from "../Components/Example.svelte";
    // This is the same
    export let a;
    // As this
    let { b } = payload.get();
</script>

<style>
</style>

<Example/>
<p>Prop A is: {a}</p>
<p>Prop B is: {b}</p>