import ejs from 'ejs';
import bodyParser from 'body-parser';
import express from 'express';
import qr from 'qr-image';
import fs from 'fs';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",(req,res) => {
  res.render("index.ejs");
})

app.post("/check",(req,res) => {
  const localUrl = req.body.url;
  generateCode(localUrl);
  res.render("index.ejs",{
    qrcode : localUrl
  });
})


app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})

app.get('/download/image', (req, res) => {

  const imagePath = '/public/qr_img.png';


  res.setHeader('Content-Disposition', 'attachment; filename=qr_img.png');
  res.setHeader('Content-Type', 'image/png');


  res.sendFile(__dirname + imagePath);
});



function generateCode(url){
 
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('public/qr_img.png'));

    fs.writeFile('URL.txt', url, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
}

