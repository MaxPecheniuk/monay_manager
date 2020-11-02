const paths = require("./paths");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	entry: {
		vendor: ["react"],
		main: paths.appIndexJs,
	},
	mode: "production",
};