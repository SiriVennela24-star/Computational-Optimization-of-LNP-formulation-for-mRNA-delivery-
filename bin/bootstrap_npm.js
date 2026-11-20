const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

async function extractTgz(url, targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`Fetching ${url}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  console.log(`Downloaded ${arrayBuffer.byteLength} bytes. Decompressing gzip...`);
  
  const buffer = zlib.gunzipSync(Buffer.from(arrayBuffer));
  console.log(`Decompressed size: ${buffer.length} bytes. Unpacking tar...`);

  let offset = 0;
  let fileCount = 0;

  while (offset < buffer.length - 512) {
    const header = buffer.subarray(offset, offset + 512);
    if (header[0] === 0) break;

    let name = header.subarray(0, 100).toString('utf8').replace(/\0.*$/, '');
    const prefix = header.subarray(345, 500).toString('utf8').replace(/\0.*$/, '');
    if (prefix) {
      name = prefix + '/' + name;
    }

    const sizeStr = header.subarray(124, 136).toString('utf8').trim().replace(/\0.*$/, '');
    const size = parseInt(sizeStr, 8) || 0;
    const typeflag = String.fromCharCode(header[156]);

    offset += 512;
    const content = buffer.subarray(offset, offset + size);
    offset += Math.ceil(size / 512) * 512;

    if (!name) continue;

    let relPath = name.startsWith('package/') ? name.slice('package/'.length) : name;
    if (!relPath) continue;

    const destPath = path.join(targetDir, relPath);

    if (typeflag === '5' || relPath.endsWith('/')) {
      fs.mkdirSync(destPath, { recursive: true });
    } else {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, content);
      fileCount++;
    }
  }

  console.log(`Unpacked ${fileCount} files into ${targetDir}`);
}

async function main() {
  const agyNodePath = 'C:\\Users\\Vaishanavi\\AppData\\Roaming\\Antigravity\\bin\\agy-node.cmd';
  const binDir = __dirname;

  // 1. Download pnpm
  const pnpmDir = path.resolve(binDir, 'pnpm_pkg');
  await extractTgz('https://registry.npmjs.org/pnpm/-/pnpm-9.15.4.tgz', pnpmDir);

  const pnpmCliPath = path.join(pnpmDir, 'bin', 'pnpm.cjs');
  const pnpmCmd = `@echo off\r\ncall "${agyNodePath}" "${pnpmCliPath}" %*\r\n`;
  fs.writeFileSync(path.resolve(binDir, 'pnpm.cmd'), pnpmCmd);

  // 2. Create node.cmd
  const nodeCmd = `@echo off\r\ncall "${agyNodePath}" %*\r\n`;
  fs.writeFileSync(path.resolve(binDir, 'node.cmd'), nodeCmd);

  console.log('Successfully bootstrapped pnpm.cmd and node.cmd!');
}

main().catch(err => {
  console.error('Bootstrap error:', err);
  process.exit(1);
});
