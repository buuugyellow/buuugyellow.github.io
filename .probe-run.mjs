const url = process.argv[2];
const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0", "accept": "text/html" } });
const text = await res.text();
const flat = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const i = flat.indexOf("Triggered via");
console.log("SUMMARY:", flat.slice(Math.max(0, i - 120), i + 500));
const errs = [...flat.matchAll(/Error:|error:|failed|Failed/g)].slice(0, 5).map(m => flat.slice(Math.max(0, m.index - 150), m.index + 300));
console.log("ERROR CTX:", errs.join("\n---\n"));
