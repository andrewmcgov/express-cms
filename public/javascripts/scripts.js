import buildTinyMce from "./modules/tinymce";
require("../stylesheets/style.scss");

const tinyDiv = document.querySelector("#tinymce");
console.log(tinyDiv);
buildTinyMce(tinyDiv);
