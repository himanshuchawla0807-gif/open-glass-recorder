import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const files=['server.mjs'];
for(const folder of ['src','examples','test','scripts'])for(const file of readdirSync(folder))if(/\.(js|mjs)$/.test(file))files.push(`${folder}/${file}`);
for(const file of files)execFileSync(process.execPath,['--check',file],{stdio:'inherit'});
console.log(`Syntax checks passed for ${files.length} JavaScript files.`);
