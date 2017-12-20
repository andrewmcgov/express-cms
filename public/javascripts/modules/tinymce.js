// Core - these two are required :-)
import tinymce from "tinymce/tinymce";
import "tinymce/themes/modern/theme";

// Plugins
import "tinymce/plugins/paste/plugin";
import "tinymce/plugins/link/plugin";
import "tinymce/plugins/autoresize/plugin";
// import "tinymce/skins/lightgray/skin.min.css";
// Initialize
function buildTinyMce(tinyDiv) {
  tinymce.init({
    selector: "#tinymce",
    skin: false,
    plugins: ["paste", "link", "autoresize"]
  });
}

export default buildTinyMce;
