import process from "process";
import path from "path";
import fs from "fs";

const dirPath = path.resolve(process.argv[2]);

if(!fs.statSync(dirPath).isDirectory()) {
    console.log("It`s not a Directory");
    process.exit(0);
}
let fileArr = [];
function filePaths(dirPath) {
    let data = fs.readdirSync(dirPath);
    data.forEach((val, index) => {
        let filePath = path.join(dirPath, val);
        if(fs.statSync(filePath).isDirectory()) {
            filePaths(filePath);
        } else {
            fileArr.push(filePath);
        }
    })
}

filePaths(dirPath);

for(let i = 0; i < fileArr.length; ++i) {
    for(let j = 0; j < fileArr.length - 1; ++j) {
        if(fs.statSync(fileArr[j]).size > fs.statSync(fileArr[j + 1]).size) {
            let temp = fileArr[j];
            fileArr[j] = fileArr[j + 1];
            fileArr[j + 1] = temp;
        }
    }
}

let ws = fs.createWriteStream("sorted_file.txt", {
});

for(let i = 0; i < fileArr.length; ++i) {
    let text = fileArr[i] + " ----- " + fs.statSync(fileArr[i]).size + "b" + "\n";
    ws.write(text);
}