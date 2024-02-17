import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
export default defineUserConfig({
    title: "SDCRAFT Docs",
    description: "SDCRAFT Official Docs",
    head: [['link', { rel: 'icon', href: '/assets/img/logo.png' }]],
    theme: hopeTheme(
        {
            logo: "/assets/img/logo.png",
            repo: "SDCRAFT/docs",
            editLink: false,
            locales: {
                '/': {
                    navbar: [
                        { text: 'Home', link: '/' },
                        { text: 'Introduction', link: '/intro' },
                        { text: 'Guide', link: '/guide/' },
                    ],
                    selectLanguageName: '简体中文',
                    sidebar: [
                        {
                            text: "Home",
                            link: '/',
                        },
                        {
                            text: "Introduction",
                            link: '/intro',
                        },
                        {
                            text: "Guide",
                            link: '/guide/',
                            collapsible: false,
                            children: [
                                '/guide/joinus',
                                '/guide/install',
                                '/guide/yggdrasil',
                                '/guide/recommend'
                            ]
                        },
                        {
                            text: "Server",
                            link: '/server/',
                            collapsible: false,
                            children: [
                                '/server/stat',
                                '/server/tps'
                            ]
                        }
                    ],

                },
            },
            plugins: {
                search: true,
                mdEnhance: {
                    tabs: true,
                    figure: true,
                    imgLazyload: true,
                    imgMark: true,
                    imgSize: true,
                    echarts: true,
                },
            },
            displayFooter: true,
            footer: "MIT Licensed | Copyright © 2021-present SDCRAFT"
        }
    ),
    pagePatterns: ["**/*.md", "!**/*README.md", "!.vuepress", "!**/node_modules/**"],
    bundler: viteBundler(),
});