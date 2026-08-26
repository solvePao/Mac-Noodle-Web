# Mac Noodle downloads

Public packages and the download website for Mac Noodle.

- Download page: <https://solvepao.github.io/Mac-Noodle-App/>
- Latest notarized package: <https://github.com/solvePao/Mac-Noodle-App/releases/latest/download/Mac-Noodle.dmg>
- Release history: <https://github.com/solvePao/Mac-Noodle-App/releases>

## Install with curl

```sh
curl -fsSL https://solvepao.github.io/Mac-Noodle-App/install.sh | sh
```

The script downloads the alternate `Mac-Noodle.zip` archive and verifies it
against the release's `SHA256SUMS.txt`. It does not install privileged software
or ask for `sudo`. The download page prefers the notarized `Mac-Noodle.dmg`.

Every successful Xcode Cloud archive from `prod` creates an immutable release
named `v<version>-xcode-cloud.<cloud-build>` with the package, checksums, and metadata.
The download site reads GitHub's public releases API, so new builds appear
without a website commit.


## Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
