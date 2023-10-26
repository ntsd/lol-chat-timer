import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';

import { globSync } from 'glob';
import path from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

function overwolfFix(insideAdapter, options) {
	const name = 'overwolf-fix';
	return {
		name: insideAdapter ? `${name}, ${insideAdapter.name}` : name,
		async adapt(builder) {
			if (insideAdapter) {
				await insideAdapter.adapt(builder);
			}

			const mergedOptions = {
				pages: 'build',
				...options
			};

			globSync(`${path.join(mergedOptions.pages, builder.config.kit.appDir)}/**/*.js`, {}).forEach(
				(filePath) => {
					let js = readFileSync(filePath).toString();

					// Replace because params will be undefine and intent is not return
					js = js.replace('if (params) {', 'if (params|true) {');

					writeFileSync(filePath, js);
				}
			);
		}
	};
}

const config = {
	extensions: ['.svelte', '.svx', '.md'],
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx', '.md'] })],
	kit: {
		paths: {
			base: '',
			relative: true
		},
		adapter: overwolfFix(
			adapter({
				pages: 'build',
				assets: 'build',
				fallback: 'index.html',
				precompress: false,
				strict: true
			})
		)
	}
};

export default config;
