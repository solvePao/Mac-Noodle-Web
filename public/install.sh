#!/bin/sh

set -eu

readonly repository="solvePao/Mac-Noodle-App"
readonly base_url="https://github.com/$repository/releases/latest/download"
readonly archive_name="Mac-Noodle.zip"
download_dir=${MAC_NOODLE_DOWNLOAD_DIR:-"$PWD"}
archive_path="$download_dir/$archive_name"
checksums_path="$download_dir/SHA256SUMS.txt"

mkdir -p "$download_dir"
curl --fail --location --silent --show-error "$base_url/$archive_name" --output "$archive_path"
curl --fail --location --silent --show-error "$base_url/SHA256SUMS.txt" --output "$checksums_path"
expected=$(awk -v name="$archive_name" '$2 == name { print $1; exit }' "$checksums_path")
if [ -z "$expected" ]; then printf '%s\n' "Mac Noodle: checksum entry for $archive_name is missing" >&2; exit 1; fi
actual=$(shasum -a 256 "$archive_path" | awk '{ print $1 }')
if [ "$actual" != "$expected" ]; then printf '%s\n' "Mac Noodle: checksum verification failed" >&2; exit 1; fi
printf '%s\n' "Downloaded and verified: $archive_path"
printf '%s\n' "Unzip the package, then move Mac Noodle.app to Applications."
