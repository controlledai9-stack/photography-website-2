import http from 'node:http';
import {readFile,stat,readdir} from 'node:fs/promises';
import {watch} from 'node:fs';
import path from 'node:path';
import {buildGallery} from './build-gallery.mjs';

const root=process.cwd();
const albumsDir=path.join(root,'albums');
const distDir=path.join(root,'dist');
const port=Number(process.env.PORT||4173);
const host=process.env.HOST||'127.0.0.1';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.avif':'image/avif','.gif':'image/gif','.svg':'image/svg+xml'};
let lastSignature='';
let buildPromise=null;
let debounceTimer=null;

async function folderSignature(){
  const rows=[];
  const folders=(await readdir(albumsDir,{withFileTypes:true})).filter(entry=>entry.isDirectory()).sort((a,b)=>a.name.localeCompare(b.name));
  for(const folder of folders){
    const dir=path.join(albumsDir,folder.name);
    const files=(await readdir(dir,{withFileTypes:true})).filter(entry=>entry.isFile()).sort((a,b)=>a.name.localeCompare(b.name));
    for(const file of files){
      const info=await stat(path.join(dir,file.name));
      rows.push(`${folder.name}/${file.name}:${info.size}:${info.mtimeMs}`);
    }
  }
  return rows.join('|');
}

async function rebuildIfNeeded(force=false){
  const signature=await folderSignature();
  if(!force&&signature===lastSignature)return;
  if(!buildPromise){
    buildPromise=buildGallery().then(()=>{lastSignature=signature}).finally(()=>{buildPromise=null});
  }
  await buildPromise;
}

await rebuildIfNeeded(true);
watch(albumsDir,{recursive:true},()=>{
  clearTimeout(debounceTimer);
  debounceTimer=setTimeout(()=>rebuildIfNeeded().catch(error=>console.error('Gallery rebuild failed:',error)),180);
});

const server=http.createServer(async(req,res)=>{
  try{
    await rebuildIfNeeded();
    const requestPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const relative=requestPath==='/'?'index.html':requestPath.replace(/^\/+/, '');
    const filePath=path.resolve(distDir,relative);
    if(!filePath.startsWith(path.resolve(distDir)+path.sep)&&filePath!==path.resolve(distDir,'index.html'))throw new Error('Invalid path');
    const body=await readFile(filePath);
    res.writeHead(200,{'Content-Type':mime[path.extname(filePath).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store, no-cache, must-revalidate'});
    res.end(body);
  }catch(error){
    console.error(`Request failed for ${req.url}:`,error.message);
    res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'});
    res.end('Not found');
  }
});

server.listen(port,host,()=>console.log(`Folder-aware gallery server: http://${host}:${port}`));
