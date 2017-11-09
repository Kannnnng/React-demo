import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'

const parseDocument = () => {
  /** Rendering data on preview using JsPluginViewer. **/
  // more info referrer to (http://www.wiris.com/plugins/demo/froala/php/)
  if (
    'com' in window
    && 'wiris' in window.com
    && 'js' in window.com.wiris
    && 'JsPluginViewer' in window.com.wiris.js
  ) {
    // With this method all non-editable objects are parsed.
    // com.wiris.js.JsPluginViewer.parseElement(element) can be used in order
    // to parse a custom DOM element.
    // com.wiris.JsPluginViewer are called on page load so is not necessary to
    // call it explicitly (I'ts called to simulate a custom render).
    window.com.wiris.js.JsPluginViewer.parseDocument()
  }
  /** end **/
}

class HTMLPreview extends FroalaEditorView {
  componentDidMount() {
    parseDocument()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.model !== this.props.model) {
      parseDocument()
    }
  }
}

export default HTMLPreview
