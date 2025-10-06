import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const target = resolve("node_modules", "rollup", "dist", "native.js");
const fallbackMarker = "\t\tif ((error && (error.code === 'MODULE_NOT_FOUND' || error.code === 'ERR_MODULE_NOT_FOUND')) && id.startsWith('@rollup/rollup-')) {\n\t\t\treturn require('@rollup/wasm-node/dist/native.js'); // rollup-native-wasm-fallback\n\t\t}\n\n";

if (!existsSync(target)) {
  console.warn("rollup native bindings file not found; skipping rollup fallback patch.");
  process.exit(0);
}

let original = readFileSync(target, "utf8");
let modified = false;

const legacySnippets = [
  "\t\tif ((error && (error.code === 'MODULE_NOT_FOUND' || error.code === 'ERR_MODULE_NOT_FOUND')) && id.startsWith('@rollup/rollup-')) {\n\t\t\treturn require('./rollup.js'); // rollup-native-fallback\n\t\t}\n\n",
  "\t\tif ((error && (error.code === 'MODULE_NOT_FOUND' || error.code === 'ERR_MODULE_NOT_FOUND')) && id.startsWith('@rollup/rollup-')) {\n\t\t\treturn require('@rollup/wasm-node'); // rollup-native-wasm-fallback\n\t\t}\n\n"
];

for (const snippet of legacySnippets) {
  if (original.includes(snippet)) {
    original = original.replace(snippet, "");
    modified = true;
  }
}

if (original.includes(fallbackMarker)) {
  if (modified) {
    writeFileSync(target, original, "utf8");
    console.info("rollup fallback patch normalized existing fallback.");
  } else {
    console.info("rollup fallback patch already applied.");
  }
  process.exit(0);
}

const throwSnippet = "\t\tthrow new Error(\n\t\t\t`Cannot find module ${id}. ` +\n\t\t\t\t`npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). ` +\n\t\t\t\t'Please try `npm i` again after removing both package-lock.json and node_modules directory.',\n\t\t\t{ cause: error }\n\t\t);\n";

if (!original.includes(throwSnippet)) {
  console.warn("rollup native bindings format unexpected; skipping patch.");
  process.exit(0);
}

const updated = original.replace(throwSnippet, fallbackMarker + throwSnippet);

if (updated === original) {
  console.warn("rollup fallback patch had no effect; skipping write.");
  process.exit(0);
}

writeFileSync(target, updated, "utf8");
console.info("rollup fallback patch applied.");
