import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const sha =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  process.env.COMMIT_SHA ||
  "local-dev";

const config = {
  headers: [
    {
      source: "/(.*)",
      headers: [{ key: "X-SearchOps-Sha", value: sha }],
    },
  ],
};

const json = JSON.stringify(config, null, 2) + "\n";
writeFileSync("vercel.json", json);
try {
  mkdirSync("dist", { recursive: true });
  writeFileSync("dist/vercel.json", json);
} catch {
  // dist may not exist during pre-build; post-build script copies again
}
console.info("SearchOps revision marker written:", sha.slice(0, 7));
