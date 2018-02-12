import buildTinyMce from './modules/tinymce';

const tinyDiv = document.querySelector('#tinymce');
buildTinyMce(tinyDiv);

Foundation.addToJquery($);
$(document).foundation();
