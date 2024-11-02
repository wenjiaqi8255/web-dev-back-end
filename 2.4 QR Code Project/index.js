/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

//得到用户回答
const questions = [{//question是一个object
    type: 'input',//type,name这些是question的value
    name: 'url',//value的value同时会给answer，answer.url
    message: 'write your url and press enter to save it',
  }]

inquirer.prompt(questions).then((answers) => {
console.log('\nrecorded');

const url=answers.url;
//创建txt
fs.writeFile('url.txt', url, (err) => {//file system里有一个方法叫writeFile，可以输出文件
    if (err) throw err;
    console.log('The file has been saved!');
  }); 

//创建二维码

var qr_svg = qr.image(url);
qr_svg.pipe(fs.createWriteStream('url_qr_img.png'));//file system里有一个方法叫createWriteStream


});


