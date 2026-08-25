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
