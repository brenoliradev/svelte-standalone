import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Svelte Standalone',
	description: 'Transform Svelte components in standalone embedabbles!',

	head: [
		['link', { rel: 'icon', href: '/favicon.ico' }],
		['meta', { property: 'og:title', content: 'Svelte Standalone' }],
		[
			'meta',
			{
				property: 'og:description',
				content: 'Transform Svelte components in standalone embedabbles!'
			}
		],
		[
			'meta',
			{
				property: 'og:image',
				content: 'https://svelte-standalone.vercel.app/svelte-standalone.png'
			}
		],
		['meta', { property: 'og:url', content: 'https://svelte-standalone.vercel.app/' }],
		['meta', { property: 'og:type', content: 'website' }],
		['meta', { name: 'twitter:card', content: 'summary_large_image' }],
		['meta', { name: 'twitter:title', content: 'Svelte Standalone' }],
		[
			'meta',
			{ name: 'twitter:description', content: 'Transform Svelte components in standalone scripts!' }
		],
		[
			'meta',
			{
				name: 'twitter:image',
				content: 'https://svelte-standalone.vercel.app/svelte-standalone.png'
			}
		]
	],

	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [{ text: 'Guide', link: '/introduction' }],

		search: {
			provider: 'local'
		},

		sidebar: [
			{
				text: 'Getting Started',
				items: [
					{ text: 'Introduction', link: '/introduction' },
					{ text: 'Installation Guide', link: '/install' },
					{ text: 'Configuration', link: '/configuration' },
					{ text: 'CLI Commands', link: '/cli' },
					{ text: 'Embed Methods', link: '/embed' }
				]
			},
			{
				text: 'Advanced',
				items: [
					{ text: 'Shared Components', link: '/shared' },
					{ text: 'Svelte 4 vs Svelte 5', link: '/svelte-versions' },
					{ text: 'Svelte Component API', link: '/component-api' },
					{ text: 'Web Components', link: '/web-components' }
				]
			},
			{
				text: 'Examples',
				items: [
					{ text: 'Bundling an Mode Package', link: '/svelte-notifications' },
					{ text: 'Supporting Tailwind', link: '/tailwind' },
					{ text: 'Supporting Shadcn', link: '/shadcn' }
				]
			}
		],

		footer: {
			message: 'Released under the <a href="https://opensource.org/license/MIT">MIT License</a>.',
			copyright:
				'Copyright © 2024-present <a href="https://github.com/brenoliradev">Breno Lira</a>'
		},

		socialLinks: [{ icon: 'github', link: 'https://github.com/brenoliradev/svelte-standalone' }]
	}
});
