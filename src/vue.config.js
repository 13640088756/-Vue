module.exports = {
    devServer: {
        host: 'localhost',
        prot: 8080,
        proxy: {
            '/api': {
                target: 'https://mall-pre.springboot.cn',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
}