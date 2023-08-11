/**
 * blog 하위 디렉터리에 있는 파일을 모두 검색해서 메뉴를 생성해서 index.html에 저장한다. 
 */

var fs = require('fs');
var path = require('path');

var bookPath = './blog/Book';

let categoryMenu = "";

function createFile(fileName, htmlContent) {
    fs.writeFile(fileName, htmlContent, (error) => {
        if (error) {
            console.error("파일 저장 중 오류 발생:", error);
        } else {
            console.log("파일이 저장되었습니다.");
        }
    });
}

function findSubDirectories(startPath) {
    const foundDirectories = [];
    const files = fs.readdirSync(startPath);

    files.forEach(file => {
        const filePath = path.join(startPath, file);
        const fileInfo = fs.statSync(filePath);

        if (fileInfo.isDirectory() && !path.basename(filePath).startsWith(".")) {
        foundDirectories.push(path.basename(filePath));
        findSubDirectories(filePath, foundDirectories);
        }
    });

    return foundDirectories;
}

function findAllFiles(currentPath, foundFiles = []) {
    const filesAndDirectories = fs.readdirSync(currentPath);
  
    filesAndDirectories.forEach(item => {
      const itemPath = path.join(currentPath, item);
      const itemInfo = fs.statSync(itemPath);
  
      if (itemInfo.isDirectory()) {
        findAllFiles(itemPath, foundFiles);
      } else {
        foundFiles.push(itemPath);
      }
    });
  
    return foundFiles;
}

function generateCategory(filePath) {
    fs.readdirSync(filePath).forEach(file => {
    let fileName = path.parse(file).name;
    console.log('<li><a onclick="javascript:goPage(\'/' +  path.basename(filePath) + '/' + fileName + '\')">' + fileName + '</a></li>');
    });
}


function createIndexFile() {
    const FirstDepthDirectories = findSubDirectories(process.cwd() + "/blog");
    for(let i = 0; i < FirstDepthDirectories.length; i++) {
        const files = findAllFiles(process.cwd() + "/blog/" + FirstDepthDirectories[i]);

        if (files.length > 0) {
            categoryMenu += '<li><div class="main">' + FirstDepthDirectories[i] + '</div><ul>\n';
        }

        for(let j = 0; j < files.length; j++) { 
            let filePath = files[j].substr(files[j].indexOf("blog\\")).replaceAll("\\", "/");
            let noteName = filePath.substring(filePath.lastIndexOf("/")+1, filePath.indexOf(".md"));
            if ((noteName.indexOf("_") !== 0) && (filePath.indexOf(".md") > 0)) {
                categoryMenu += '<li><a onclick="javascript:goPage(\'' +  filePath.substring(0, filePath.indexOf(".md")) + '\')">' + noteName + '</a></li>\n';
            }
        }

        if (files.length > 0) {
            categoryMenu += '</ul></li>\n';
        }
    }

    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>ucanon.com</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="Description" content="This site was created for the purpose of sharing personal study content." />
        <link rel="stylesheet" href="index.css" />
        <script src="openSource/toastUI/editor/node_modules/@toast-ui/editor/dist/toastui-editor-viewer.js"></script>
        <script src="openSource/toastUI/editor/node_modules/@toast-ui/editor/dist/toastui-editor-plugin-code-syntax-highlight-all.min.js"></script>
        <script src="openSource/jquery/jquery-1.12.4.min.js"></script>
        <link rel="stylesheet" href="openSource/toastUI/editor/node_modules/@toast-ui/editor/dist/toastui-editor-viewer.css" />
        <link rel="stylesheet" href="openSource/toastUI/editor/node_modules/@toast-ui/editor/dist/github.min.css" />
        <script defer src="index.js"></script>
    </head>
    <body>
        <h2 class="main_title">UCANON.COM</h2>
        <header></header>
        <section>
            <nav class="left_menu">
                <ul>
                    ${categoryMenu}
                </ul>
            </nav>
            <article>
                <div id="viewer"></div>
            </article>
        </section>
        <footer>
            <p></p>
        </footer>
    </body>
    </html>
    `;
    
    createFile("index.html", htmlContent);
}

createIndexFile();