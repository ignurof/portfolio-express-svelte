module.exports = {
    port: 3000,

    svelteViewEngine: {
        env: "prod",
        template: `${__dirname}/src/template.svelte`,
        dir: `${__dirname}/src/routes`,
        type: "svelte",
        buildDir: `${__dirname}/build/routes`,
        assetsPrefix:  "/assets/",
        liveReload: false,
    },
};