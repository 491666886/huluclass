module.exports = {
      //webpack配置
	configureWebpack: {
	    //关闭 webpack 的性能提示
	    performance: {
		    hints:false
	    },
 
	    //或者
 
	    // //警告 webpack 的性能提示
	    // performance: {
	    // 	hints:'warning',
	    // 	//入口起点的最大体积
	    // 	maxEntrypointSize: 50000000,
	    // 	//生成文件的最大体积
	    // 	maxAssetSize: 30000000,
	    // 	//只给出 js 文件的性能提示
	    // 	assetFilter: function(assetFilename) {
	    // 		return assetFilename.endsWith('.js');
	    // 	}
	    // }
	},
	lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    assetsDir: 'static',
    runtimeCompiler: true,
    publicPath: './',
    outputDir: 'dist',
    runtimeCompiler: true,
    devServer: require('./vue.dev').devServer,
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
    },
}
