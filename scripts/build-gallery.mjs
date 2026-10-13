import {readdir,rm,mkdir,copyFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=process.cwd();
const source=path.join(root,'albums');
const target=path.join(root,'dist','client-work');
const imagePattern=/\.(avif|gif|jpe?g|png|webp)$/i;
const featured=['Fashion','People','Products','Food','Interior'];
const rank=name=>{const index=featured.indexOf(name);return index<0?featured.length:index};
const slugify=value=>value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

export async function buildGallery(){
  await rm(target,{recursive:true,force:true});
  await mkdir(target,{recursive:true});

  const folders=(await readdir(source,{withFileTypes:true}))
    .filter(entry=>entry.isDirectory())
    .sort((a,b)=>rank(a.name)-rank(b.name)||a.name.localeCompare(b.name));

  const albums=[];
  for(const folder of folders){
    const slug=slugify(folder.name);
    const from=path.join(source,folder.name);
    const to=path.join(target,slug);
    await mkdir(to,{recursive:true});
    const files=(await readdir(from,{withFileTypes:true}))
      .filter(entry=>entry.isFile()&&imagePattern.test(entry.name))
      .map(entry=>entry.name)
      .sort();
    if(!files.length)continue;
    const images=[];
    for(const file of files){
      await copyFile(path.join(from,file),path.join(to,file));
      images.push(`client-work/${slug}/${encodeURIComponent(file)}`);
    }
    albums.push({title:folder.name,slug,cover:images[0],images});
  }
  await writeFile(path.join(root,'dist','gallery-data.json'),JSON.stringify({generatedAt:new Date().toISOString(),albums},null,2));
  console.log(`Generated ${albums.length} albums with ${albums.reduce((total,album)=>total+album.images.length,0)} images.`);
  return albums;
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  await buildGallery();
}
