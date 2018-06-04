import menuForm from './adminModules/menuForm';
import postForm from './adminModules/postForm';
import BlogSettings from './adminModules/blogSettings';
import { Foundation } from '../../node_modules/foundation-sites/js/foundation.core.js';
import { Sticky } from '../../node_modules/foundation-sites/js/foundation.sticky.js';
import { DropdownMenu } from '../../node_modules/foundation-sites/js/foundation.dropdownMenu.js';
import { Accordion } from '../../node_modules/foundation-sites/js/foundation.accordion.js';

Foundation.plugin(Sticky, 'Sticky');
Foundation.plugin(DropdownMenu, 'DropdownMenu');
Foundation.plugin(Accordion, 'Accordion');
Foundation.addToJquery($);
$(document).foundation();

const editingMenu = document.getElementById('menuForm');
const editingPost = document.getElementById('post');
const Image = document.querySelector('.homepage-image');

console.log('admin js');
if (editingMenu) {
  menuForm();
}

if (editingPost) {
  postForm();
}

if (Image) {
  const HomePageFeaturedImage = new BlogSettings(Image);
}
