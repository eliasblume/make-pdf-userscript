import { build } from 'esbuild'
import * as pkg from './package.json'

const userscriptBanner = `// ==UserScript==
// @id          ${pkg.name}
// @name        ${pkg.name}
// @namespace   Violentmonkey Scripts
// @match       https://edocbox.nepatec.de/edocbox/editor/ui/*
// @grant       none
// @version     ${pkg.version}
// @author      ${pkg.author}
// @description ${pkg.description}
// ==/UserScript==
`

const buildEnv = (process.env.BUILD_ENV || 'dev') as 'dev' | 'prod'
const isProd = buildEnv === 'prod'
const watch = !!process.env.WATCH_FILES
console.log('Build environment:', isProd)
;(async () => {
    await build({
        entryPoints: ['./src/main.ts'],
        banner: {
            js: userscriptBanner,
        },
        bundle: true,
        color: true,
        outfile: './dist/pdfmake.user.js',
        format: 'iife',
        platform: 'browser',
        treeShaking: isProd,
        watch: watch,
        minify: isProd,
        minifyWhitespace: isProd,
        minifyIdentifiers: isProd,
        minifySyntax: isProd,
        logLevel: isProd ? 'error' : 'debug',
        define: {
            'process.env.USERSCRIPT_VERSION': `"${pkg.version}"`,
        },
    })
})()
