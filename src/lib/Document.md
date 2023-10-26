# Overwolf Svelte Boilerplate

A minimial Svelte boilerplate for Overwolf, inspired by [Overwolf Modern React Boilerplate](https://github.com/AlbericoD/overwolf-modern-react-boilerplate)

## Features

- Overwolf Plugin
- In game overlay and Desktop window
- Svelte and ES Modules support
- Nano Stores by [Overwolf Nano Stores](https://github.com/ntsd/overwolf-nanostores)
- TailwindCSS and [DaisyUI](https://daisyui.com/)
- Markdown render by [MDsveX](https://github.com/pngwn/MDsveX)
- Drag to move windows

## Requirements

- Node version >=18

## Getting started

Clone with Github's "Use this template":

[![use this template](/useThisTemplate.svg)](https://github.com/new?template_name=overwolf-svelte-boilerplate&template_owner=ntsd)

Clone with [degit](https://github.com/Rich-Harris/degit):

```sh
# make copy of this repository
npx degit ntsd/overwolf-svelte-boilerplate `my-new-repo`

# change to project directory
cd overwolf-svelte-boilerplate

# install dependencies
npm i

# build overwolf plugin, you can now use `Load unpacked extension` to test the local plugin at `build`.
npm run build

# create opk file
npm run create-opk
```

## Project Structure

```tree
├── src
│   ├── lib
│   │   ├── BackgroundWindow.svelte         - The background will always running to control which page to restore
│   │   ├── CurrentPage.svelte              - A component to check which page to render
│   │   ├── DesktopWindow.svelte            - Desktop window
│   │   └── InGameWindow.svelte             - In Game Window
│   ├── routes                              - Routes for svelte
│   ├── utils                               - Utilities script for overwolf API
|   ├── overwolf.dev.mock.ts                - Overwolf Mock to make it works for `npm run dev`
|   ├── consts.ts                           - Constants variables
|   └── app.postcss                         - Global CSS
├── static                                  - static data includes manifest.json and icons
├── svelte.config.js                        - Sveltekit configuration
└── tailwind.config.ts                      - Tailwind configuration
```

## Roadmap

We are using [Github Project](https://github.com/ntsd/overwolf-svelte-boilerplate/projects) for the roadmap and task-board.
