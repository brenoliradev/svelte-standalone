import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Svelte Standalone',
	description: 'Transform Svelte components in standalone scripts!',

	head: [
		// Open Graph Meta Tags
		['meta', { property: 'og:title', content: 'Svelte Standalone' }],
		[
			'meta',
			{ property: 'og:description', content: 'Transform Svelte components in standalone scripts!' }
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

		// Twitter Card Meta Tags
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
					{ text: 'Cli Commands', link: '/cli' },
					{ text: 'Embed Types', link: '/embed' }
				]
			},
			{
				text: 'Advanced',
				items: [
					{ text: 'Shared Components', link: '/shared' },
					{ text: 'Svelte 4 vs Svelte 5', link: '/svelte-versions' },
					{ text: 'Svelte Component API', link: '/component-api' }
				]
			},
			{
				text: 'Examples',
				items: [{ text: 'Bundling svelte-notifications', link: '/svelte-notifications' }]
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
