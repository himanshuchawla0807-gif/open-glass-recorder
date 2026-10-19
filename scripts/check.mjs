import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const files=['server.mjs'];
function collect(folder){for(const item of readdirSync(folder,{withFileTypes:true})){const path=`${folder}/${item.name}`;if(item.isDirectory())collect(path);else if(/\.(js|mjs)$/.test(item.name))files.push(path)}}
for(const folder of ['src','examples','test','scripts','vendor'])collect(folder);
for(const file of files)execFileSync(process.execPath,['--check',file],{stdio:'inherit'});
console.log(`Syntax checks passed for ${files.length} JavaScript files.`);
