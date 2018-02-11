import Foundation from './modules/foundation';
import buildTinyMce from './modules/tinymce';

const tinyDiv = document.querySelector('#tinymce');
buildTinyMce(tinyDiv);
