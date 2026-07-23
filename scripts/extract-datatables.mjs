import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "public", "embeds");
fs.mkdirSync(outDir, { recursive: true });

function extractWidgetJson(md, label) {
  const re =
    /<script type="application\/json" data-for="htmlwidget-[^"]+">(\{[\s\S]*?\})<\/script>/g;
  const matches = [...md.matchAll(re)];
  if (!matches.length) {
    console.log("no widget for", label);
    return null;
  }
  // Prefer the largest JSON blob (full table)
  const best = matches
    .map((m) => m[1])
    .sort((a, b) => b.length - a.length)[0];
  return best;
}

function writeDataTableHtml(filename, title, jsonStr) {
  const parsed = JSON.parse(jsonStr);
  const data = parsed.x?.data;
  if (!data) {
    console.log("no x.data in", filename);
    return;
  }
  // DT htmlwidgets store columns as arrays of column values
  const cols = data.length;
  const rows = data[0]?.length ?? 0;
  const headers =
    parsed.x?.container?.match(/<th[^>]*>([\s\S]*?)<\/th>/g)?.map((th) =>
      th.replace(/<[^>]+>/g, "").trim(),
    ) ?? Array.from({ length: cols }, (_, i) => `Col ${i + 1}`);

  // Transpose column-major → row-major for DataTables
  const aoData = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) row.push(data[c][r] ?? "");
    aoData.push(row);
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${title}</title>
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css"/>
<style>
  body { margin: 12px; font-family: system-ui, sans-serif; background: #fff; color: #111; }
  table.dataTable { width: 100% !important; }
  .dataTables_wrapper { font-size: 13px; }
</style>
</head>
<body>
<table id="tbl" class="display compact" style="width:100%"></table>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
<script>
const headers = ${JSON.stringify(headers)};
const rows = ${JSON.stringify(aoData)};
$('#tbl').DataTable({
  data: rows,
  columns: headers.map((h) => ({ title: h })),
  pageLength: 25,
  scrollX: true,
  scrollY: '360px',
  scrollCollapse: true,
  order: []
});
</script>
</body>
</html>`;
  fs.writeFileSync(path.join(outDir, filename), html);
  console.log("wrote", filename, "rows", rows, "cols", cols);
}

const baseball = fs.readFileSync(
  "C:/Users/twnba/Desktop/kobakhit.github.io/_posts/2016-2-18-linear-opt-baseball.md",
  "utf8",
);
const weather = fs.readFileSync(
  "C:/Users/twnba/Desktop/kobakhit.github.io/_posts/2016-2-10-impact-of-weather-events.md",
  "utf8",
);

const bJson = extractWidgetJson(baseball, "baseball");
if (bJson) writeDataTableHtml("baseball-roster.html", "Best 25-man team", bJson);

const wJson = extractWidgetJson(weather, "weather");
if (wJson) writeDataTableHtml("weather-datatable.html", "Weather annual averages", wJson);
