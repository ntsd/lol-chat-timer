# LOL Chat Timer

Overwolf plugin to track summoner spell and ability by in game chat.

Note: only supports english version for now.

## Features

- Tracking opponent summoner spells and Ultimate spell (R) cooldown time by in game chat
- Customize chat pattern for own personal timer (Todo)

## How to use

1. Click on opponent summoner spell or ultimate spell (R).

![guide1](/static/screenshots/guide1.png)

![guide4](/static/screenshots/guide4.png)

2. You will see the chat have message like this.

![guide5](/static/screenshots/guide5.png)

3. The timer will show on the in-game overlay.

![guide6](/static/screenshots/guide6.png)

4. You can also click on the spell icon to remove/reset the timer, right click to reduce 5 seconds, or middle click to increase 5 seconds of cooldown.

## Requirements

- Node version >=18

## Getting started

```sh
# install dependencies
npm i

# build overwolf plugin, you can now use `Load unpacked extension` to test the local plugin at `build`.
npm run build

# create opk file
npm run create-opk
```

## Data

LOL Chat Timer is using [Community Dragon](https://www.communitydragon.org/) data.

### Champion Icons

https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json

### Champion Skills

https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/

### Summoner Spells

https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells.json

