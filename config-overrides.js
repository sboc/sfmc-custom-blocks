const path = require("path");

module.exports = function override(config, env) {
    config.module.rules = [
        {
            test: /\.jsx?$/,
            include: [
                "node_modules/@salesforce/design-system-react"
            ].map(someDir => path.resolve(process.cwd(), someDir)),
            loader: require.resolve("babel-loader"),
            options: {
                presets: ["react-app"]
            }
        }
    ].concat(config.module.rules);

    return config;
};
