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
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/lucadebort/synchronicity-ds' },
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
					label: 'Guides',
					items: [
						{ label: 'Usage Patterns', slug: 'guides/usage-patterns' },
						{ label: 'Component Lifecycle', slug: 'guides/component-lifecycle' },
					],
				},
				{
					label: 'Components',
					items: [
						{ label: 'Overview', slug: 'components' },
						{
							label: 'Actions & Buttons',
							collapsed: true,
							items: [
								{ label: 'Button', slug: 'components/button' },
								{ label: 'IconButton', slug: 'components/icon-button' },
								{ label: 'FloatingActionButton', slug: 'components/floating-action-button' },
								{ label: 'Chip', slug: 'components/chip' },
							],
						},
						{
							label: 'Form Inputs',
							collapsed: true,
							items: [
								{ label: 'Input', slug: 'components/input' },
								{ label: 'TextArea', slug: 'components/text-area' },
								{ label: 'SearchInput', slug: 'components/search-input' },
								{ label: 'NumberInput', slug: 'components/number-input' },
								{ label: 'Checkbox', slug: 'components/checkbox' },
								{ label: 'Radio', slug: 'components/radio' },
								{ label: 'Switch', slug: 'components/switch' },
								{ label: 'Slider', slug: 'components/slider' },
								{ label: 'Rating', slug: 'components/rating' },
								{ label: 'DatePicker', slug: 'components/date-picker' },
								{ label: 'TimePicker', slug: 'components/time-picker' },
							],
						},
						{
							label: 'Layout & Structure',
							collapsed: true,
							items: [
								{ label: 'Card', slug: 'components/card' },
								{ label: 'Divider', slug: 'components/divider' },
								{ label: 'List', slug: 'components/list' },
								{ label: 'Accordion', slug: 'components/accordion' },
								{ label: 'Collapsible', slug: 'components/collapsible' },
								{ label: 'ScreenContainer', slug: 'components/screen-container' },
							],
						},
						{
							label: 'Navigation',
							collapsed: true,
							items: [
								{ label: 'TabBar', slug: 'components/tab-bar' },
								{ label: 'Tabs', slug: 'components/tabs' },
								{ label: 'SegmentedControl', slug: 'components/segmented-control' },
								{ label: 'StepIndicator', slug: 'components/step-indicator' },
								{ label: 'Menu', slug: 'components/menu' },
							],
						},
						{
							label: 'Overlays & Modals',
							collapsed: true,
							items: [
								{ label: 'Modal', slug: 'components/modal' },
								{ label: 'BottomSheet', slug: 'components/bottom-sheet' },
								{ label: 'ActionSheet', slug: 'components/action-sheet' },
								{ label: 'Popover', slug: 'components/popover' },
								{ label: 'Tooltip', slug: 'components/tooltip' },
							],
						},
						{
							label: 'Feedback & Status',
							collapsed: true,
							items: [
								{ label: 'Alert', slug: 'components/alert' },
								{ label: 'Banner', slug: 'components/banner' },
								{ label: 'Toast', slug: 'components/toast' },
								{ label: 'Badge', slug: 'components/badge' },
								{ label: 'Tag', slug: 'components/tag' },
								{ label: 'ProgressBar', slug: 'components/progress-bar' },
								{ label: 'Spinner', slug: 'components/spinner' },
								{ label: 'Skeleton', slug: 'components/skeleton' },
								{ label: 'EmptyState', slug: 'components/empty-state' },
							],
						},
						{
							label: 'Data Display',
							collapsed: true,
							items: [
								{ label: 'Avatar', slug: 'components/avatar' },
							],
						},
						{
							label: 'I Ching Specific',
							collapsed: true,
							items: [
								{ label: 'HexagramVisual', slug: 'components/hexagram-visual' },
								{ label: 'HexagramLine', slug: 'components/hexagram-line' },
								{ label: 'TrigramVisual', slug: 'components/trigram-visual' },
								{ label: 'CoinFlip', slug: 'components/coin-flip' },
								{ label: 'ThreeCoins', slug: 'components/three-coins' },
								{ label: 'ReadingCard', slug: 'components/reading-card' },
							],
						},
					],
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
				{
					tag: 'script',
					attrs: {
						src: '/breadcrumb.js',
						defer: true,
					},
				},
			],
		}),
	],
});
