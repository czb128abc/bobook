var path = require("path"),
  fs = require("fs");

var pathName = null;
if (!pathName) {
  pathName = process.cwd();
}
//是否包含有后缀
function isContainFileSuffix(fileName, suffix) {
  var result = false;
  var set = fileName.split(".");
  if (set.length > 0) {
    if ("." + set[set.length - 1] === suffix) {
      result = true;
    }
  }
  return result;
}

function loadFileByPath(pathName) {
  var fileSet = [];
  loadFile(pathName, fileSet);
  for (var i = 0; i < fileSet.length; i++) {
    var text = readOneFileText(fileSet[i]);
    var title = readFirstTitle(text);
    if (title) {
      fileSet[i].nickName = title;
    }
    var path = fileSet[i].path.replace(pathName + "/", "");
    fileSet[i].path = path;
  }
  return fileSet;
}
//遍历读取文件
function loadFile(path, filesList) {
  files = fs.readdirSync(path); //需要用到同步读取
  files.forEach(walk);

  function walk(file) {
    states = fs.statSync(path + "/" + file);
    if (states.isDirectory()) {
      if (path.indexOf("node_modules") == -1) {
        loadFile(path + "/" + file, filesList);
      }
    } else {
      if (isContainFileSuffix(file, ".md")) {
        //创建一个对象保存信息
        var obj = new Object();
        obj.size = states.size; //文件大小，以字节为单位
        obj.fileName = file; //文件名
        obj.path = path + "/" + file; //文件绝对路径
        obj.nickName = obj.fileName;
        filesList.push(obj);
      }
    }
  }
}

function readOneFileText(fileItem) {
  var path = fileItem.path;
  var text = fs.readFileSync(path, "utf-8");
  return text;
}

function readFirstTitle(text) {
  var title = null;
  var reg = /^$/;
  var set = text.split("\n");
  if (set.length > 0) {
    //去掉 # 和 空格
    title = set[0].replace(/#/g, "");
    title = title.replace(/(^\s*)|(\s*$)/g, "");
  }

  return title;
}

(function makeCatalog() {
  //
  //1. [ECMAScript 6简介](#docs/intro)
  var set = loadFileByPath(pathName),
    nextPathSet = [],
    mkStrSet = [];
  console.dir(set);
  mkStrSet.push("#目录");

  for (var i = 0; i < set.length; i++) {
    var nextPath,
      currentPath,
      currentPathSet = set[i].path.split("/");
    if (set.length > i + 1) {
      nextPathSet = set[i + 1].path.split("/");
    }
    mkStrSet.push(
      "1. [" +
        set[i].fileName +
        " (" +
        set[i].nickName +
        ")](" +
        set[i].path +
        ")"
    );
    if (nextPathSet.length > 0) {
      nextPathSet.pop();
      nextPath = nextPathSet.join("/");

      currentPathSet.pop();
      currentPath = currentPathSet.join("/");
      console.log(currentPath + "     " + nextPath);
      if (currentPath !== nextPath && "" !== nextPath) {
        console.log("-- now add catalog -> " + nextPath);
        mkStrSet.push("");
        mkStrSet.push("## :" + nextPath);
      }
    }
  }
  mkStrSet.forEach(item => console.log(item));
  var text = mkStrSet
    .filter(item => item !== "1. [sidebar.md (目录)](sidebar.md)")
    .join("\n");
  //
  console.log("============= 开始写入sidebar.md =============");
  fs.writeFile("sidebar.md", text, error => {
    if (error) {
      console.log(error);
    } else {
      console.log("done");
    }
  });
})();
