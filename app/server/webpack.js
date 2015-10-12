import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import config from "./config/webpack.config.dev";

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
    // webpack-dev-server options
    publicPath: config.output.publicPath,
    filename: config.output.filename,
    stats: { colors: true }
});

server.listen(8080, "localhost", function() {});