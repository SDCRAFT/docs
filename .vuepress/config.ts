import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
export default defineUserConfig({
    title: "SDCRAFT Docs",
    description: "SDCRAFT Official Docs",
    head: [['link', { rel: 'icon', href: '/assets/logo.png' }]],
    theme: hopeTheme(
        {
            logo: "/assets/img/logo.png",
            repo: "SDCRAFT/docs",
            editLink: false,
            navbar: [
                { text: 'Home', link: '/' },
                { text: 'Introduction', link: '/intro' },
                { text: 'Guide', link: '/guide/' },
            ],
            locales: {
                '/': {
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
                            link: '/guide',
                            collapsible: false,
                            children: [
                                '/guide/joinus',
                                '/guide/install',
                                '/guide/yggdrasil',
                                '/guide/recommend'
                            ]
                        }
                    ],

                },
            },
            displayFooter: true,
            footer: "MIT Licensed | Copyright © 2021-present SDCRAFT"
        }
    ),
    pagePatterns: ["**/*.md", "!**/*README.md", "!.vuepress", "!**/node_modules/**"],
    bundler: viteBundler({
        vuePluginOptions: {},
    }),
});