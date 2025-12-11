// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Synchronicity',
			description: 'A contemplative design system for mindful applications',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: false,
			},
			customCss: ['./src/styles/custom.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/your-org/synchronicity-design-system' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
					],
				},
				{
					label: 'Foundations',
					items: [
						{ label: 'Overview', slug: 'foundations/overview' },
						{ label: 'Colors', slug: 'foundations/colors' },
						{ label: 'Typography', slug: 'foundations/typography' },
						{ label: 'Spacing', slug: 'foundations/spacing' },
						{ label: 'Motion', slug: 'foundations/motion' },
						{ label: 'Accessibility', slug: 'foundations/accessibility' },
					],
				},
				{
					label: 'Tokens',
					items: [
						{ label: 'Token Architecture', slug: 'tokens/architecture' },
						{ label: 'Primitives', slug: 'tokens/primitives' },
						{ label: 'Semantic', slug: 'tokens/semantic' },
						{ label: 'Component', slug: 'tokens/component' },
					],
				},
				{
					label: 'Components',
					autogenerate: { directory: 'components' },
				},
			],
			head: [
				{
					tag: 'meta',
					attrs: {
						name: 'theme-color',
						content: '#d4af37',
					},
				},
			],
		}),
	],
});
