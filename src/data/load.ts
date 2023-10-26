import type { Champion, Spell } from '../types.js';
import rawChampions from './champions.json';
import rawSpells from './spells.json';

const getChampions: () => Champion[] = () => {
	return rawChampions.map((c) => {
		return {
			...c,
			squarePortraitPath: c.squarePortraitPath.toLowerCase()
		};
	});
};

const getSpells: () => Spell[] = () => {
	return rawSpells
		.filter((s) => s.cooldown > 0)
		.map((c) => {
			return {
				...c,
				iconPath: c.iconPath.toLowerCase()
			};
		});
};

export const champions = getChampions();

export const championsMap: { [name: string]: Champion } = {};
champions.forEach((c) => {
	championsMap[c.name] = c;
});

export const spells = getSpells();

export const spellsMap: { [name: string]: Spell } = {};
spells.forEach((s) => {
	spellsMap[s.name] = s;
});
