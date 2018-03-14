import buildTinyMce from './modules/tinymce';
import menuForm from './adminModules/menuForm';
import postForm from './adminModules/postForm';

const tinyDiv = document.querySelector('#tinymce');
buildTinyMce(tinyDiv);

Foundation.addToJquery($);
$(document).foundation();

const editingMenu = document.getElementById('menuForm');
const editingPost = document.getElementById('post');

if (editingMenu) {
  menuForm();
}

if (editingPost) {
  postForm();
}
