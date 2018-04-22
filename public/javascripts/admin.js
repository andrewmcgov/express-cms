import buildTinyMce from './modules/tinymce';
import menuForm from './adminModules/menuForm';
import postForm from './adminModules/postForm';
import BlogSettings from './adminModules/blogSettings';

const tinyDiv = document.querySelector('#tinymce');
buildTinyMce(tinyDiv);

Foundation.addToJquery($);
$(document).foundation();

const editingMenu = document.getElementById('menuForm');
const editingPost = document.getElementById('post');
const Image = document.querySelector('.homepage-image');

if (editingMenu) {
  menuForm();
}

if (editingPost) {
  postForm();
}

if (Image) {
  const HomePageFeaturedImage = new BlogSettings(Image);
}
