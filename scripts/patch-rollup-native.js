import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const target = resolve("node_modules", "rollup", "dist", "native.js");
const fallbackMarker = "return require('./rollup.js'); // rollup-native-fallback";

if (!existsSync(target)) {
  console.warn("rollup native bindings file not found; skipping rollup fallback patch.");
  process.exit(0);
}

const original = readFileSync(target, "utf8");

if (original.includes(fallbackMarker)) {
  console.info("rollup fallback patch already applied.");
  process.exit(0);
}

const throwSnippet = "\t\tthrow new Error(\n\t\t\t`Cannot find module ${id}. ` +\n\t\t\t\t`npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). ` +\n\t\t\t\t'Please try `npm i` again after removing both package-lock.json and node_modules directory.',\n\t\t\t{ cause: error }\n\t\t);\n";

if (!original.includes(throwSnippet)) {
  console.warn("rollup native bindings format unexpected; skipping patch.");
  process.exit(0);
}

const fallback = "\t\tif ((error && (error.code === 'MODULE_NOT_FOUND' || error.code === 'ERR_MODULE_NOT_FOUND')) && id.startsWith('@rollup/rollup-')) {\n" +
  "\t\t\treturn require('./rollup.js'); // rollup-native-fallback\n" +
  "\t\t}\n\n";

const updated = original.replace(throwSnippet, fallback + throwSnippet);

if (updated === original) {
  console.warn("rollup fallback patch had no effect; skipping write.");
  process.exit(0);
}

writeFileSync(target, updated, "utf8");
console.info("rollup fallback patch applied.");
