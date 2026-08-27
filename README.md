# Mac Noodle Web

The public download website for Mac Noodle. The site is a static Astro application with small Vue islands for the mobile navigation, terminal-command copy action, and FAQ.

The repository intentionally focuses on distributing the current macOS release and linking to its source. It does not currently provide an API-backed release feed or make unapproved product capability claims.

## Public endpoints

<<<<<<< HEAD
- Website: <https://macnoodle.solvepao.com/>
- Latest DMG: <https://github.com/solvePao/Mac-Noodle-Web/releases/latest/download/Mac-Noodle.dmg>
- Release history: <https://github.com/solvePao/Mac-Noodle-Web/releases>
- Source repository: <https://github.com/solvePao/Mac-Noodle-Web>
- Installer script: <https://macnoodle.solvepao.com/install.sh>

## Confirmed project decisions

The following decisions describe the current implementation and should be treated as the baseline for future changes:

1. **Cloudflare Workers Static Assets is the only website deployment target.** Cloudflare Workers Builds watches `main`, builds the Astro project, and deploys it without a repository-owned GitHub Actions workflow. The legacy GitHub Pages workflow has been removed.
2. **The canonical public origin is `https://macnoodle.solvepao.com/`.** Canonical metadata, Open Graph metadata, documentation, and the terminal command use this domain.
3. **There is no releases API integration.** Download and release-history links point directly to GitHub.
4. **On-page release history is deferred.** It can be revisited later when an API or an approved static release manifest exists.
5. **The DMG is the only published package asset.** The curl installer is hosted by the website.
6. **Testimonials are omitted.** Previous testimonials were not approved and have been removed.
7. **Detailed product capability marketing is omitted until approved.** Current copy is limited to verifiable information about downloads, the installer, and repository links.
8. **The site uses Better University's Cappuccino theme.** It supports matching light and dark palettes based on the operating-system preference.

## Technology

- [Astro](https://astro.build/) for static site generation
- [Vue](https://vuejs.org/) for the small interactive islands
- [Vitest](https://vitest.dev/) and Vue Test Utils for automated tests
- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) for hosting
- Cloudflare Workers Builds for automatic deployments from `main`
- Wrangler for deployment configuration and optional manual deployment
- Docker as an optional development environment

The production output is fully static and is written to `dist/`.

## Project structure

```text
.
├── public/
│   ├── favicon.svg       # Cappuccino-themed site icon
│   └── install.sh        # Public DMG installer
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

1. Downloads `Mac-Noodle.dmg` from the latest GitHub release.
2. Installs `Mac Noodle.app` in `~/Applications` (or `MAC_NOODLE_INSTALL_DIR`).

It does not request `sudo` or modify system files.

To install into another directory, pass `MAC_NOODLE_INSTALL_DIR` to the shell that runs the script:

```sh
curl -fsSL https://macnoodle.solvepao.com/install.sh |
  MAC_NOODLE_INSTALL_DIR="$HOME/Applications" sh
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
| `npm run deploy` | Build and deploy `dist/` as Cloudflare Workers Static Assets. |
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
- Cloudflare Workers Static Assets configuration;
- native Workers Builds deployment documentation;
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

## Cloudflare Workers deployment

Cloudflare Workers Static Assets is the sole deployment target for this site. This matches the deployment model used by the personal website: Cloudflare owns the Git connection, and a push to the production branch creates a Workers Build automatically.

The site currently has no Worker entry point and no server-side API. It is an assets-only Worker: Astro generates `dist/`, and Cloudflare uploads and serves those files at the edge. A Worker entry point can be added later if the product needs redirects, request handling, an API, authentication, or proxy behavior.

### Automatic deployment flow

```text
Commit and push to main
  -> Cloudflare Workers Builds clones the repository
  -> npm clean-install installs the locked dependencies
  -> npm run build generates dist/
  -> npx wrangler deploy uploads dist/
  -> macnoodle.solvepao.com receives the new version
```

No GitHub Actions deployment workflow or repository secret is needed. The Cloudflare dashboard owns the repository connection and its build token.

### Workers Builds settings

| Setting | Value |
| --- | --- |
| Git repository | `solvePao/Mac-Noodle-Web` |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Version command | `npx wrangler versions upload` |
| Root directory | `/` |
| Build variables and secrets | None |
| Canonical domain | `macnoodle.solvepao.com` |

`wrangler.jsonc` names the Worker and points its static-assets directory at `./dist`. It deliberately has no `main` field because there is no Worker JavaScript yet, and it deliberately has no `pages_build_output_dir` because this is not a Pages project.

### First-time Cloudflare setup

1. In Cloudflare, open **Workers & Pages** and choose **Create application**.
2. Choose **Import a repository** for Workers, then select `solvePao/Mac-Noodle-Web`.
3. Set the production branch and build settings to the values in the table above.
4. Create the Worker and allow its first build to finish.
5. Open the Worker's **Domains** tab and add `macnoodle.solvepao.com` as a custom domain.
6. Confirm the custom domain shows the production environment and loads the deployed site.

After setup, every push to `main` triggers the same path. Pull requests and non-production branches may also create preview versions if non-production branch builds are enabled in Cloudflare.

### Manual deployment and validation

Run the full local quality gate before deploying:

```sh
npm run validate
```

To deploy manually from an authenticated development machine:

```sh
npm run deploy
```

The command performs a fresh Astro build and then runs `wrangler deploy`. Automatic production deployments should normally come from a push to `main`, keeping Cloudflare's deployment history tied to Git commits.

The repository sets the canonical URL, while the custom-domain attachment and DNS are managed in Cloudflare.

### Adding Worker code later

The current assets-only configuration is intentionally ready to grow. If server-side behavior becomes necessary, add a Worker source file, set `main` in `wrangler.jsonc`, and decide which paths should execute Worker code before or after static-asset matching. That future change is separate from the deferred release-history work and should include its own tests and security review.

### What is intentionally absent

- No GitHub Pages workflow
- No GitHub Actions deployment workflow
- No Cloudflare Pages project or Pages configuration
- No Worker JavaScript entry point
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
- testimonials; and
- unapproved detailed product marketing.

## Local repository memory

`MEMORY.md` records repository-review context for local agent work. It is intentionally ignored by Git through `/MEMORY.md` and excluded from the Docker build context.
