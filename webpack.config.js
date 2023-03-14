const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        mode: argv.mode,
        entry: {
            index: "./src/index.jsx",
        },
        output: {
            path: path.join(__dirname, "dist"),
            publicPath: "/",
            filename: isProduction ? "[name].[contenthash].js" : "[name].js",
            chunkFilename: isProduction
                ? "static/[name].[contenthash:8].chunk.js"
                : "static/[name].chunk.js",
        },
        target: "web",
        devtool: isProduction ? false : "inline-source-map",
        devServer: {
            contentBase: "./dist",
            port: 7000,
            historyApiFallback: true,
            open: true,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            presets: ["@babel/react", "@babel/env"],
                        },
                    },
                },
                {
                    test: /\.(png|svg|jpg)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8192,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "src/index.html",
            }),
        ],
        resolve: {
            extensions: [".js", ".jsx"],
            modules: [
                path.resolve("src"),
                "node_modules",
            ],
            preferRelative: true,
        },
    };
};
