const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const WebpackBar = require('webpackbar')
const CracoAntDesignPlugin = require('craco-antd')

module.exports = {
    webpack: {
        plugins: [
            new WebpackBar({ profile: true }),
            ...(process.env.NODE_ENV === 'development'
                ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
                : []),
        ],
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                lessLoaderOptions: {
                    modifyVars: { '@primary-color': 'var(--color-twitter)' },
                    strictMath: true,
                    noIeCompat: true,
                },
                cssLoaderOptions: {
                    modules: true,
                    localIdentName: '[local]_[hash:base64:5]',
                },
                babelPluginImportOptions: {
                    libraryDirectory: 'es',
                },
            },
        },
    ],
}
