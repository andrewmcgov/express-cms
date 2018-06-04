// Core - these two are required :-)
import * as tinymce from 'tinymce/tinymce.min.js';
import 'tinymce/themes/modern/theme.min.js';

// Plugins
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/autoresize/plugin';
// Initialize
export default function buildTinyMce(tinyDiv) {
  tinymce.init({
    selector: '#tinymce',
    skin: false,
    plugins: ['paste', 'link', 'autoresize']
  });
}
