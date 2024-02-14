import { defineConfig } from "vuepress/config";

export default defineConfig({
    title: "SDCRAFT Docs",
    description: "SDCRAFT Official Docs",
    head: [['link', { rel: 'icon', href: '/assets/logo.png' }]],
    themeConfig: {
        logo: "/assets/logo.png",
        repo: "SDCRAFT/docs",
        editLinks: false,
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Introduction', link: '/intro' },
            { text: 'Guide', link: '/guide/' },
        ],
        sidebar: [
            '/',
            ['/intro', 'Introduction'],
            {
                title: "Guide",
                path: '/guide',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    '/guide/joinus',
                    '/guide/install',
                    '/guide/yggdrasil',
                    '/guide/recommend'
                ]
            }
        ]
    },
});