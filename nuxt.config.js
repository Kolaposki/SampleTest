const webpack = require("webpack");

module.exports = {
    mode: 'spa',
    head: {
        title: 'Ntisa Admin Application',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'msapplication-TileColor', content: '#da532c' },
            { name: 'theme-color', content: '#ffffff' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Rubik:wght@700&family=Source+Sans+Pro:wght@400;600;700&display=swap' },
            { rel: 'stylesheet', href: '/css/uikit.min.css' },
            { rel: 'stylesheet', href: '/css/croppie.css' },
            {
                rel: 'stylesheet',
                href: 'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css'
            },
            // { rel: 'stylesheet', href: '/css/style.css' },
            { rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/intro.js@2.9.3/introjs.min.css' }
        ],
        script: [
            { type: 'text/javascript', src: '/js/uikit.min.js' },
            { type: 'text/javascript', src: '/js/croppie.min.js' },
            { type: 'text/javascript', src: '/js/uikit-icons.min.js' },
            { type: 'text/javascript', src: '/js/main.js' },
            // { type: 'text/javascript', src: 'https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js' },
            { type: 'text/javascript', src: '/js/intro.js' },
            { type: 'text/javascript', src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDLRcwcS-hVc4H8Yejx15PMWWZ934CXgLs&libraries=places' },
            { type: 'text/javascript', src: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-inline.js' },
            // { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD9R7EeLdPZusJV_bBsm3EiPj-gwCri8u0&libraries=places'}
            // { type: 'text/javascript', src: 'https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js'}
        ]
    }, // Headers of the page
    loading: false, // Disable default loading bar
    dev: process.env.NODE_ENV === 'DEV',
    css: [
        '@/static/css/style.css',
        '~/assets/css/variables.scss'
    ],
    build: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                introJs: ['intro.js'],
                // jsPDF: 'jspdf'
                // Croppie: 'croppie'
                // vuetify: '@nuxtjs/vuetify',
            })
        ],
        transpile: ['jsPDF'],
        // extend (config, { isDev, isClient }) {
        // 	if (isDev && isClient) {
        // 		// Run ESLint on save
        // 		config.module.rules.push({
        // 			enforce: 'pre',
        // 			test: /\.(js|vue)$/,
        // 			loader: 'eslint-loader',
        // 			exclude: /(node_modules)/,
        // 			options: {
        // 				fix: true
        // 			}
        // 		})
        // 	}
        // 	config.resolve.alias['vue'] = 'vue/dist/vue.common'
        // 	// Extend only webpack config for client-bundle
        // 	if (isClient) { config.target = 'electron-renderer' }
        // }
    },
    //Toastr configuration
    toast: {
        position: 'top-right',
        duration: 5000,
        fullWidth: false,
        fitToScreen: false,
        iconPack: 'fontawesome'
    },
    buildModules: [
        '@nuxtjs/vuetify'
    ],

    vuetify: {
        customVariables: ["~/assets/css/variables.scss"],
        optionsPath: "./vuetify.options.js",
        treeShake: true
    },
    //modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/toast',
        '@nuxtjs/moment',
        // '@nuxtjs/vuetify',
    ],
    //moment module configuration
    moment: {
        defaultTimezone: 'Africa/Lagos'
    },
    router: {
        linkExactActiveClass: 'is-active',
        middleware: ['auth'],
    },
    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '~/plugins/global.js',
        { src: '~/plugins/library.js', mode: 'client' }
    ],
    /**
     * Axios module
     */
    // || 'https://ntisa.website/', //
    // http://162.0.233.96/API dev server
    //
    axios: {
        baseURL: process.env.BASE_URL ||
            'https://wajeloyalty.website/',
        //'https://wajeloyalty.website/', // 'http://127.0.0.1:8000/', //'http://162.0.233.96/', // ||
        proxy: false
    },
    proxy: {
        '/api/': 'https://wajeloyalty.website//'
            //'https://wajeloyalty.website/' //http://162.0.233.96/' 
    },
    //environment variables
    env: {
        BASE_URL: 'https://wajeloyalty.website//',
        //'https://wajeloyalty.website/', // 'http://127.0.0.1:8000/',//'http://162.0.233.96/' //
    },

    // srcDir: '../'

    // rootDir: '../../NTISA-Merhcant-Frontend'
}