#!/bin/sh

set -eu

readonly repository="solvePao/Mac-Noodle-Web"
readonly base_url="https://github.com/$repository/releases/latest/download"
readonly dmg_name="Mac-Noodle.dmg"
readonly checksum_name="Mac-Noodle.dmg.sha256"
download_dir=$(mktemp -d "${TMPDIR:-/tmp}/mac-noodle-install.XXXXXX")
mount_point=""

cleanup() {
  if [ -n "$mount_point" ]; then hdiutil detach "$mount_point" -quiet || true; fi
  rm -rf "$download_dir"
}
trap cleanup EXIT HUP INT TERM

curl --fail --location --silent --show-error "$base_url/$dmg_name" --output "$download_dir/$dmg_name"
curl --fail --location --silent --show-error "$base_url/$checksum_name" --output "$download_dir/$checksum_name"
expected=$(awk '{ print $1; exit }' "$download_dir/$checksum_name")
actual=$(shasum -a 256 "$download_dir/$dmg_name" | awk '{ print $1 }')
if [ -z "$expected" ] || [ "$actual" != "$expected" ]; then
  printf '%s\n' "Mac Noodle: checksum verification failed" >&2
  exit 1
fi

install_dir=${MAC_NOODLE_INSTALL_DIR:-"$HOME/Applications"}
mkdir -p "$install_dir"
mount_point=$(hdiutil attach -nobrowse -readonly "$download_dir/$dmg_name" | awk '/\/Volumes\// { print substr($0, index($0, "/Volumes/")); exit }')
if [ -z "$mount_point" ] || [ ! -d "$mount_point/Mac Noodle.app" ]; then
  printf '%s\n' "Mac Noodle: mounted DMG did not contain the application" >&2
  exit 1
fi
ditto "$mount_point/Mac Noodle.app" "$install_dir/Mac Noodle.app"
printf '%s\n' "Installed Mac Noodle to $install_dir/Mac Noodle.app"
