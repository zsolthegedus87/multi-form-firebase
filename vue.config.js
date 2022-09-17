module.exports = {
	chainWebpack: (config) => {
		config.plugin("html").tap((args) => {
			args[0].title = "Mutli Form Hzs";
			return args;
		});
	},
	publicPath: "./",
	devServer: {
		proxy: 'https://console.firebase.google.com/u/0/project/multi-page-form-hzs/',
	}
};
