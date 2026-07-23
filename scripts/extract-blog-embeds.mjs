import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "public", "embeds");
fs.mkdirSync(outDir, { recursive: true });

const indegoPath =
  "C:/Users/twnba/Desktop/kobakhit.github.io/_posts/2016-3-6-visualizing-indego-bike-geoson-data-in-python-using-folium.md";
const weatherPath =
  "C:/Users/twnba/Desktop/kobakhit.github.io/_posts/2016-2-10-impact-of-weather-events.md";
const juliaPath =
  "C:/Users/twnba/Desktop/kobakhit.github.io/_posts/2016-2-2-getting-started-julia/index.md";

const indego = fs.readFileSync(indegoPath, "utf8");
const foliumRe =
  /<iframe src="data:text\/html;base64,([A-Za-z0-9+/=]+)"[^>]*><\/iframe>/g;
const names = ["indego-markers", "indego-clusters", "indego-heatmap"];
let m;
let i = 0;
while ((m = foliumRe.exec(indego)) && i < names.length) {
  const html = Buffer.from(m[1], "base64").toString("utf8");
  fs.writeFileSync(path.join(outDir, `${names[i]}.html`), html);
  console.log("wrote", names[i], html.length);
  i += 1;
}

const weather = fs.readFileSync(weatherPath, "utf8");
const srcdocMatch = weather.match(/<iframe srcdoc="([\s\S]*?)" scrolling=/);
if (srcdocMatch) {
  const decoded = srcdocMatch[1]
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');
  fs.writeFileSync(path.join(outDir, "weather-rickshaw.html"), decoded);
  console.log("wrote weather-rickshaw", decoded.length);
} else {
  console.log("no rickshaw srcdoc");
}

// Extract Gadfly SVG plot roots from Julia post (first 5 standalone svg blocks with plotroot)
const julia = fs.readFileSync(juliaPath, "utf8");
const svgBlocks = [...julia.matchAll(/<svg[\s\S]*?<\/svg>/g)].map((x) => x[0]);
const plotSvgs = svgBlocks.filter((s) => s.includes("plotroot")).slice(0, 5);
plotSvgs.forEach((svg, idx) => {
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;background:#fff}svg{max-width:100%;height:auto;display:block}</style></head><body>${svg}</body></html>`;
  const name = `julia-plot-${idx + 1}.html`;
  fs.writeFileSync(path.join(outDir, name), html);
  console.log("wrote", name, html.length);
});

console.log("embeds:", fs.readdirSync(outDir));
