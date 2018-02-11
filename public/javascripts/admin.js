import buildTinyMce from './modules/tinymce';
import Foundation from './modules/foundation';

const tinyDiv = document.querySelector('#tinymce');
buildTinyMce(tinyDiv);

$(document).foundation();

console.log('admin.js');
