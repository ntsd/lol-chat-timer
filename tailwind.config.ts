import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import { dark } from 'daisyui-ntsd';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), daisyui],
	daisyui: {
		styled: true,
		base: false, // don't apply base color, eg. default background
		utils: true,
		logs: false,
		rtl: false,
		prefix: '',
		themes: [
			{
				dark: {
					...dark
				}
			}
		]
	}
} satisfies Config;
