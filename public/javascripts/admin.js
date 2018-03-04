import buildTinyMce from './modules/tinymce';
import menuForm from './adminModules/menuForm';

const tinyDiv = document.querySelector('#tinymce');
buildTinyMce(tinyDiv);

Foundation.addToJquery($);
$(document).foundation();

const editingMenu = document.getElementById('menuForm');

if (editingMenu) {
  menuForm();
}
