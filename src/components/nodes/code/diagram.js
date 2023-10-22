import {config} from '@/config.js'
import {exists, generateShortMD5, save_file} from '@/libs/utils'
import {join} from 'path'
import {promises as fs} from 'fs';

async function diagram_cache(code,generator){
    const hash = generateShortMD5(code)
    const file_path = join(config.rootdir, `gen/diagrams/${hash}/diagram.svg`)
    const file_exists = await exists(file_path)
    if(file_exists){
        console.log(`* returning diagram from cache '${file_path}'`)
        return await fs.readFile(file_path,'utf-8')
    }else{
        console.log(`* generating diagram as not in cache`)
        const svg_text = await generator(code)
        await save_file(file_path,svg_text)
        const code_path = join(config.rootdir, `gen/diagrams/${hash}/code.puml`)
        await save_file(code_path,svg_text)
        return svg_text
    }
}

export{
    diagram_cache
}
