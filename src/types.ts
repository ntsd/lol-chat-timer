export interface Spell {
	id: number;
	name: string;
	description: string;
	summonerLevel: number;
	cooldown: number;
	gameModes: string[];
	iconPath: string;
}

export interface Champion {
	id: number;
	name: string;
	alias: string;
	squarePortraitPath: string;
	roles: string[];
}

export interface ChampionsTimer {
	[championName: string]: {
		icon: string;
		spells: {
			[spellName: string]: {
				cooldown: number; // milliseconds
				icon: string;
				startAt: number; // unix milliseconds
				endAt: number; // unix milliseconds
				countdown: number; // milliseconds
			};
		};
	};
}
