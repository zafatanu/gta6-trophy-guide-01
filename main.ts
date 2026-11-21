// LEONIDA // PLATINUM FILES — entrypoint.
// Copies app/ and screenshots/ from beside this file into the output directory
// (/output, or $MAKEFUN_OUTPUT_DIR outside the grader) and writes dossier.json
// with buildDossier from the kit's vendored library. Node 22, standard library
// only. Deterministic: two runs write the same bytes. No network, no reads
// outside this repository.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)));
const OUTPUT_DIR = resolve(process.env.MAKEFUN_OUTPUT_DIR || '/output');

const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
};

function mirrorTree(sourceDir, targetDir) {
  cpSync(sourceDir, targetDir, { recursive: true, dereference: true });
}

function freshOutputDir(dir) {
  // Empty the output dir without ever removing it: in the grader the dir
  // itself is root-owned and the bot runs as uid 65534, so rmdir fails with
  // EACCES. Deleting each entry inside needs write permission on the dir
  // itself, which the bot has.
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function handInEntry() {
  for (const needed of ['app', 'screenshots']) {
    if (!existsSync(join(REPO_ROOT, needed))) {
      throw new Error(`handInEntry: ${needed}/ is missing beside main.ts, refusing to write an empty entry`);
    }
  }
  freshOutputDir(OUTPUT_DIR);
  mirrorTree(join(REPO_ROOT, 'app'), join(OUTPUT_DIR, 'app'));
  mirrorTree(join(REPO_ROOT, 'screenshots'), join(OUTPUT_DIR, 'screenshots'));
  const dossier = buildDossier(OUTPUT_DIR, DOSSIER_CAPS);
  writeFileSync(join(OUTPUT_DIR, 'dossier.json'), dossier);
  return dossier.length;
}

const dossierBytes = handInEntry();
console.log(`wrote ${OUTPUT_DIR} (dossier.json: ${dossierBytes} bytes)`);
