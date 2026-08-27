# Mac Noodle Web

The public download website for Mac Noodle. The site is a static Astro application with small Vue islands for the mobile navigation, terminal-command copy action, and FAQ.

The repository intentionally focuses on distributing the current macOS release and linking to its source. It does not currently provide an API-backed release feed or make unapproved product capability claims.

## Public endpoints

- Website: <https://macnoodle.solvepao.com/>
- Latest ZIP: <https://github.com/solvePao/Mac-Noodle-Web/releases/latest/download/Mac-Noodle.zip>
- Release history: <https://github.com/solvePao/Mac-Noodle-Web/releases>
- Source repository: <https://github.com/solvePao/Mac-Noodle-Web>
- Installer script: <https://macnoodle.solvepao.com/install.sh>

## Confirmed project decisions

The following decisions describe the current implementation and should be treated as the baseline for future changes:

1. **Cloudflare Pages is the only website deployment target.** The legacy GitHub Pages workflow has been removed.
2. **The canonical public origin is `https://macnoodle.solvepao.com/`.** Canonical metadata, Open Graph metadata, documentation, and the terminal command use this domain.
3. **There is no releases API integration.** Download and release-history links point directly to GitHub.
4. **On-page release history is deferred.** It can be revisited later when an API or an approved static release manifest exists.
5. **The ZIP is the current primary package.** DMG publishing and support are outside the current scope.
6. **Testimonials are omitted.** Previous testimonials were not approved and have been removed.
7. **Detailed product capability marketing is omitted until approved.** Current copy is limited to verifiable information about downloads, checksums, the installer, and repository links.
8. **The site uses Better University's Cappuccino theme.** It supports matching light and dark palettes based on the operating-system preference.

## Technology

- [Astro](https://astro.build/) for static site generation
- [Vue](https://vuejs.org/) for the small interactive islands
- [Vitest](https://vitest.dev/) and Vue Test Utils for automated tests
- [Cloudflare Pages](https://pages.cloudflare.com/) for hosting
- Wrangler for Pages configuration and manual deployment
- Docker as an optional development environment

The production output is fully static and is written to `dist/`.

## Project structure

```text
.
├── public/
│   ├── favicon.svg       # Cappuccino-themed site icon
│   └── install.sh        # Public download and checksum helper
├── src/
│   ├── components/       # Vue presentation and interaction components
│   ├── layouts/
│   │   └── Layout.astro  # Metadata, footer, tokens, and global styling
│   └── pages/
│       └── index.astro   # Static home page composition
├── tests/
│   ├── components.test.ts
│   └── configuration.test.ts
├── Dockerfile
├── setup.sh
├── vitest.config.ts
└── wrangler.jsonc
```

## Install Mac Noodle from Terminal

Run:

```sh
curl -fsSL https://macnoodle.solvepao.com/install.sh | sh
```

The public script:

1. Downloads `Mac-Noodle.zip` from the latest GitHub release.
2. Downloads the release's `SHA256SUMS.txt`.
3. Finds the checksum entry for `Mac-Noodle.zip`.
4. Calculates the local archive's SHA-256 checksum with macOS `shasum`.
5. Stops with an error when the entry is missing or the checksums differ.
6. Leaves the verified ZIP and checksum file in the current directory.

It does not request `sudo`, move an application into `/Applications`, or modify system files. After verification, the user unzips the package and moves the app manually.

To download into another directory, pass `MAC_NOODLE_DOWNLOAD_DIR` to the shell that runs the script:

```sh
curl -fsSL https://macnoodle.solvepao.com/install.sh |
  MAC_NOODLE_DOWNLOAD_DIR="$HOME/Downloads" sh
```

## Local development

### Requirements

- Node.js 22.12 or newer
- npm

Install the exact locked dependencies:

```sh
npm ci
```

Start Astro in background mode:

```sh
npm run astro -- dev --background
```

The default local address is <http://localhost:4321/>.

Manage the background process with:

```sh
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

To bind only to the local loopback interface:

```sh
npm run astro -- dev --background --host 127.0.0.1
```

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Astro in the foreground. Prefer the background command above for normal repository work. |
| `npm run build` | Generate the static production site in `dist/`. |
| `npm run preview` | Serve a previously generated production build. |
| `npm run check` | Run Astro and TypeScript diagnostics. |
| `npm run test` | Run the Vitest suite once. |
| `npm run test:watch` | Run Vitest in watch mode. |
| `npm run validate` | Run checks, tests, and the production build in sequence. |
| `npm run deploy` | Build and deploy `dist/` through Cloudflare Pages. |
| `npm run astro -- <command>` | Run another Astro CLI command. |

## Validation and test coverage

Run the complete local quality gate before merging or deploying:

```sh
npm run validate
```

It runs:

1. `astro check`
2. `vitest run`
3. `astro build`

The current tests cover:

- accessible mobile-navigation state and controls;
- direct GitHub release links;
- the canonical terminal command and clipboard behavior;
- FAQ expansion and ARIA relationships;
- Cloudflare Pages configuration;
- absence of the legacy GitHub Pages workflow;
- use of the custom production origin;
- absence of the removed GitHub API client and release feed;
- canonical installer repository paths;
- root-level Docker ignore rules; and
- the Cappuccino light and dark theme tokens.

Additional standalone checks used during repository QA include:

```sh
git diff --check
bash -n setup.sh
sh -n public/install.sh
npm audit
```

## Cappuccino visual theme

The visual system is adapted from the Cappuccino palette in the attached Better University repository. The semantic tokens live in `src/layouts/Layout.astro`; components consume those tokens instead of defining independent palettes.

| Token | Light | Dark |
| --- | --- | --- |
| Accent | `#854442` | `#be9b7b` |
| Accent highlight | `#a9713b` | `#d9a868` |
| Success | `#5f7a54` | `#94b287` |
| Danger | `#8e3b34` | `#c97b70` |
| Text/ink | `#3c2f2f` | `#fff4e6` |
| Muted text | `#7a6257` | `#a68e7e` |
| Page background | `#fff4e6` | `#241b19` |
| Surface | `#fffaf5` | `#3c2f2f` |

Dark mode follows `prefers-color-scheme`. There is no manual theme switcher.

The layout also carries forward Better University's editorial composition, floating glass navigation, rounded cards, restrained gradients, and automatic light/dark presentation. The Mac Noodle favicon uses the same Cappuccino palette.

## Cloudflare Pages deployment

Cloudflare Pages is the sole deployment path for this site.

### Pages build settings

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production branch | `main` |
| Canonical domain | `macnoodle.solvepao.com` |

`wrangler.jsonc` configures the Pages project name, `dist/` output directory, schema, and compatibility date.

For a manual deployment:

```sh
npm run deploy
```

This command runs a fresh production build before invoking `wrangler pages deploy`. It requires Cloudflare authentication and access to the Pages project.

The repository sets the website's canonical URL, but DNS and the custom-domain attachment are managed in Cloudflare and are not provisioned by this codebase.

### What is intentionally absent

- No GitHub Pages workflow
- No Workers assets deployment
- No Pages Functions
- No server-side application API
- No GitHub Releases API request from the browser

## Docker development

Docker is optional. The helper uses:

- image: `mac-noodle-web`
- container: `mac-noodle-dev`
- dependency volume: `mac-noodle-nm`
- host port: `4321`

Build and start from a fresh image:

```sh
./setup.sh restart
```

Other commands:

```sh
./setup.sh build
./setup.sh run
./setup.sh stop
./setup.sh logs
```

The source directory is mounted at `/app`, while `node_modules` uses a named Docker volume so Linux-native packages are not mixed with host macOS packages.

When dependencies change, recreate the dependency volume after stopping the container:

```sh
./setup.sh stop
docker volume rm mac-noodle-nm
./setup.sh restart
```

## Content and release policy

When updating the public page:

- use factual copy supported by the repository or published release assets;
- do not add testimonials until their text and attribution are approved;
- do not add detailed product capabilities, performance numbers, compatibility claims, signing claims, or notarization claims without approval and evidence;
- keep the primary package name aligned with the actual GitHub release asset;
- keep release links static until the deferred release-history work is explicitly resumed; and
- keep the canonical origin and installer host on `macnoodle.solvepao.com`.

## Deferred work

The following items are deliberately not part of the current implementation:

- an on-page release history;
- a GitHub Releases API client or another release API;
- a static release manifest integration;
- DMG publishing or DMG download links;
- testimonials; and
- unapproved detailed product marketing.

## Local repository memory

`MEMORY.md` records repository-review context for local agent work. It is intentionally ignored by Git through `/MEMORY.md` and excluded from the Docker build context.
