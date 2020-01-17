
const URL_BACKEND_SERVICE = 'http://10.150.27.126:8080'

// const URL_BACKEND_SERVICE = 'http://192.168.2.228:8080'
//const URL_BACKEND_SERVICE = 'http://39.100.237.151:8100/uc';

// const URL_BACKEND_SERVICE = 'https://hulu.ehualu.com:28080'

module.exports = {
    devServer: {
        // 设置主机地址
        host: '0.0.0.0',
        // 设置默认端口
        port: 8100,
        // 设置代理
        proxy: URL_BACKEND_SERVICE,
    },
}
