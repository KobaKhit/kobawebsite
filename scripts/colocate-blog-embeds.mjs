/**
 * Move blog embeds from public/embeds into entry folders:
 * content/sources/entries/<slug>/index.md + embeds/*
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const ENTRIES = path.join(ROOT, "content", "sources", "entries");
const PUBLIC_EMBEDS = path.join(ROOT, "public", "embeds");

const MOVES = [
  {
    slug: "2016-02-02-getting-started-julia",
    md: "2016-02-02-getting-started-julia.md",
    embeds: [
      "julia-plot-1.html",
      "julia-plot-2.html",
      "julia-plot-3.html",
      "julia-plot-4.html",
      "julia-plot-5.html",
    ],
    extraPublic: [{ from: "public/info-graphic.jpg", to: "info-graphic.jpg" }],
    rewrites: [
      [/\/embeds\/julia-plot-(\d+)\.html/g, `/entries/2016-02-02-getting-started-julia/embeds/julia-plot-$1.html`],
      [/\/info-graphic\.jpg/g, `/entries/2016-02-02-getting-started-julia/info-graphic.jpg`],
    ],
  },
  {
    slug: "2016-02-10-impact-of-weather-events",
    md: "2016-02-10-impact-of-weather-events.md",
    embeds: ["weather-rickshaw.html", "weather-datatable.html"],
    rewrites: [
      [/\/embeds\/weather-rickshaw\.html/g, `/entries/2016-02-10-impact-of-weather-events/embeds/weather-rickshaw.html`],
      [/\/embeds\/weather-datatable\.html/g, `/entries/2016-02-10-impact-of-weather-events/embeds/weather-datatable.html`],
    ],
  },
  {
    slug: "2016-02-18-linear-opt-baseball",
    md: "2016-02-18-linear-opt-baseball.md",
    embeds: ["baseball-roster.html"],
    rewrites: [
      [/\/embeds\/baseball-roster\.html/g, `/entries/2016-02-18-linear-opt-baseball/embeds/baseball-roster.html`],
    ],
  },
  {
    slug: "2016-03-06-indego-bike-folium",
    md: "2016-03-06-indego-bike-folium.md",
    embeds: ["indego-markers.html", "indego-clusters.html", "indego-heatmap.html"],
    rewrites: [
      [/\/embeds\/indego-markers\.html/g, `/entries/2016-03-06-indego-bike-folium/embeds/indego-markers.html`],
      [/\/embeds\/indego-clusters\.html/g, `/entries/2016-03-06-indego-bike-folium/embeds/indego-clusters.html`],
      [/\/embeds\/indego-heatmap\.html/g, `/entries/2016-03-06-indego-bike-folium/embeds/indego-heatmap.html`],
    ],
  },
];

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

for (const job of MOVES) {
  const flat = path.join(ENTRIES, job.md);
  const dir = path.join(ENTRIES, job.slug);
  const index = path.join(dir, "index.md");
  const embedsDir = path.join(dir, "embeds");

  if (!fs.existsSync(flat) && !fs.existsSync(index)) {
    console.error("missing entry", job.slug);
    continue;
  }

  ensureDir(dir);
  ensureDir(embedsDir);

  let body = fs.existsSync(index)
    ? fs.readFileSync(index, "utf8")
    : fs.readFileSync(flat, "utf8");

  for (const [re, to] of job.rewrites) {
    body = body.replace(re, to);
  }
  fs.writeFileSync(index, body);
  if (fs.existsSync(flat)) fs.unlinkSync(flat);

  for (const name of job.embeds) {
    const from = path.join(PUBLIC_EMBEDS, name);
    const to = path.join(embedsDir, name);
    if (!fs.existsSync(from)) {
      console.warn("missing embed", from);
      continue;
    }
    fs.copyFileSync(from, to);
    fs.unlinkSync(from);
    console.log("moved", name, "→", job.slug);
  }

  for (const extra of job.extraPublic ?? []) {
    const from = path.join(ROOT, extra.from);
    const to = path.join(dir, extra.to);
    if (!fs.existsSync(from)) {
      console.warn("missing extra", from);
      continue;
    }
    fs.copyFileSync(from, to);
    fs.unlinkSync(from);
    console.log("moved", extra.from, "→", job.slug);
  }
}

if (fs.existsSync(PUBLIC_EMBEDS)) {
  const left = fs.readdirSync(PUBLIC_EMBEDS);
  if (left.length === 0) {
    fs.rmdirSync(PUBLIC_EMBEDS);
    console.log("removed empty public/embeds");
  } else {
    console.log("left in public/embeds:", left.join(", "));
  }
}

console.log("done");
