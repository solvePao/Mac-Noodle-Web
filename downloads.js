const repository = "solvePao/Mac-Noodle-App";
const list = document.querySelector("#release-list");
const latestStatus = document.querySelector("#latest-status");
const latestDownload = document.querySelector("#latest-download");
const copyButton = document.querySelector("#copy-command");
const installCommand = document.querySelector("#install-command");
const formatDate = (value) => new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(new Date(value));
const formatSize = (bytes) => new Intl.NumberFormat(undefined, { style: "unit", unit: "megabyte", maximumFractionDigits: 1 }).format(bytes / 1_000_000);
const packageAsset = (release) => release.assets.find((asset) => asset.name === "Mac-Noodle.dmg")
  ?? release.assets.find((asset) => asset.name.endsWith(".dmg"))
  ?? release.assets.find((asset) => asset.name === "Mac-Noodle.zip")
  ?? release.assets.find((asset) => asset.name.endsWith(".zip"));

function renderRelease(release) {
  const asset = packageAsset(release);
  const row = document.createElement("article");
  row.className = "release";
  const heading = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = release.name || release.tag_name;
  const tag = document.createElement("p");
  tag.textContent = release.tag_name;
  heading.append(title, tag);
  const meta = document.createElement("div");
  meta.className = "release-meta";
  const published = document.createElement("p");
  published.textContent = `Published ${formatDate(release.published_at)}`;
  meta.append(published);
  if (asset) {
    const size = document.createElement("p");
    size.textContent = `${formatSize(asset.size)} · ${asset.download_count.toLocaleString()} downloads`;
    meta.append(size);
  }
  const links = document.createElement("div");
  links.className = "release-links";
  if (asset) {
    const download = document.createElement("a");
    download.href = asset.browser_download_url;
    download.textContent = asset.name.endsWith(".dmg") ? "Download DMG" : "Download ZIP";
    links.append(download);
  }
  const notes = document.createElement("a");
  notes.href = release.html_url;
  notes.textContent = "Release notes";
  links.append(notes);
  row.append(heading, meta, links);
  return row;
}

fetch(`https://api.github.com/repos/${repository}/releases?per_page=10`, { headers: { Accept: "application/vnd.github+json" } })
  .then((response) => { if (!response.ok) throw new Error(`GitHub returned ${response.status}`); return response.json(); })
  .then((releases) => {
    const published = releases.filter((release) => !release.draft);
    if (!published.length) {
      latestStatus.textContent = "The first prod build has not been published yet.";
      list.innerHTML = '<p class="empty">No packages have been published yet.</p>';
      return;
    }
    const latest = published[0];
    const asset = packageAsset(latest);
    latestStatus.textContent = `${latest.name || latest.tag_name} · published ${formatDate(latest.published_at)}`;
    if (asset) latestDownload.href = asset.browser_download_url;
    list.replaceChildren(...published.map(renderRelease));
  })
  .catch(() => {
    latestStatus.textContent = "Release details are temporarily unavailable; the latest-download link still works.";
    list.innerHTML = '<p class="empty">Could not load release history. View releases on GitHub instead.</p>';
  });

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(installCommand.textContent).then(() => {
    copyButton.textContent = "Copied";
    window.setTimeout(() => { copyButton.textContent = "Copy"; }, 1800);
  });
});
