import axios from "axios";
import fs from 'fs';
import * as cheerio from 'cheerio';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
for(let i=405; i>402;i--){
    try {
    let data;
    if(!fs.existsSync('./cache')){
        fs.mkdirSync('./cache');
    }
    if (!fs.existsSync(`./cache/${i}.html`)) {
        console.log('LIVE REQUEST!!!!');
        await delay(5000);
        

      
            let res = await axios.get(`https://xkcd.com/${i}/`);
            data = res.data;
            //console.log(res.data);
            fs.writeFileSync(`./cache/${i}.html`, data);
   
    } else {
        console.log('CACHED REQUEST!!!!');
        data = fs.readFileSync(`./cache/${i}.html`);
    }
    let $ = cheerio.load(data);
    let imgTag = $('#comic>img');
    console.log(imgTag.attr('src'));
    console.log(imgTag.attr('title'));
    console.log(imgTag.attr('alt'));
    } catch(e){
        console.log(e);
    }
    
}
// let data = await axios.post("https://9gag.com/v1/feed-posts/type/home?after=eyJmZWVkSWQiOiJmNDcyM2Q1MTQwMTNiZjc2YWYxMzI4M2E2Y2Y4ZmFiZSIsIm9yZGVySWQiOjE5OTk5OTYwLCJvZmZzZXQiOjQwfQ%3D%3D");
// let body = await data.json();
// console.log(body);