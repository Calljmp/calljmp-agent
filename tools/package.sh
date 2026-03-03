#!/bin/sh

set -e

# Move files from src to root
mv src/* .
rmdir src

# Also remove the nested libs directory if it exists, but preserve README and LICENSE
if [ -d "libs" ]; then
  if [ -f "libs/agent/README.md" ]; then
    cp "libs/agent/README.md" .
  fi
  if [ -f "libs/agent/LICENSE" ]; then
    cp "libs/agent/LICENSE" .
  fi
  rm -rf libs
fi

PACKAGE_JSON="package.json"
OUTPUT_JSON="package.out.json"
TEMP_JSON="package.temp.json"

jq 'del(.nx)' "$PACKAGE_JSON" >"$OUTPUT_JSON"

jq ".main = \"./index.js\"" "$OUTPUT_JSON" >"$TEMP_JSON" && mv "$TEMP_JSON" "$OUTPUT_JSON"
jq ".types = \"./index.d.ts\"" "$OUTPUT_JSON" >"$TEMP_JSON" && mv "$TEMP_JSON" "$OUTPUT_JSON"
jq 'del(.module)' "$OUTPUT_JSON" >"$TEMP_JSON" && mv "$TEMP_JSON" "$OUTPUT_JSON"
jq 'del(.type)' "$OUTPUT_JSON" >"$TEMP_JSON" && mv "$TEMP_JSON" "$OUTPUT_JSON"

jq '.files = ["**/*.js", "**/*.d.ts", "**/*.d.ts.map", "README.md", "LICENSE"]' "$OUTPUT_JSON" >"$TEMP_JSON" && mv "$TEMP_JSON" "$OUTPUT_JSON"

jq '.exports = {
  ".": {
    "types": "./index.d.ts",
    "import": "./index.js",
    "require": "./index.js",
    "default": "./index.js"
  },
  "./package.json": "./package.json"
}' "$OUTPUT_JSON" >"$TEMP_JSON" && mv "$TEMP_JSON" "$OUTPUT_JSON"

mv "$OUTPUT_JSON" "$PACKAGE_JSON"
