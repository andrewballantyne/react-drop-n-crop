import React, { Component, PropTypes } from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
import DropZone from 'react-dropzone';
import AdvancedControls from './AdvancedControls';

const userSelectNone = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
};

class ReactDropNCrop extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    disableBorder: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    imagePadding: PropTypes.number,
    simpleControls: PropTypes.bool,
    zoomValue: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      previewSrc: null,
      internalZoomValue: 1,
    };
  }

  /**
   * Gets the selected image, in a base64 string, at the particular crop settings.
   *
   * @param {string} type - Optional. The image type (png - default, jpeg, etc) of the base64 image
   * @returns {string|null} - A base64 string if an image is available, or null if one is not
   */
  getBase64(type = 'png') {
    const { previewSrc } = this.state;
    if (previewSrc !== null && this.refs.editor) {
      const canvas = this.refs.editor.getImageScaledToCanvas();
      return canvas.toDataURL(`image/${type}`);
    }
    return null;
  }

  /**
   * Manually opens up the browser file explorer.
   */
  openFileExplorer() {
    this.refs.dropzone.open();
  }

  render() {
    const { previewSrc } = this.state;
    const { children, simpleControls, zoomValue } = this.props;

    return (
      <div className="rdc" style={{ ...userSelectNone }}>
        <div
          className="rdc-wrapper"
          onClick={!previewSrc && this.openFileExplorer.bind(this)}
          style={{ position: 'relative', ...this._getWrapperAdjustedStyles() }}
        >
          <div style={{ position: 'absolute' }}>
            <DropZone
              ref="dropzone"
              disableClick={previewSrc !== null}
              className="rdc-droparea"
              style={this._getDropZoneAdjustedStyles()}
              onDrop={this._fileDrop.bind(this)}
            >
              {!previewSrc && React.cloneElement(children)}
            </DropZone>
          </div>
          <div className="rdc-editor" style={{ position: 'absolute' }}>
            <ReactAvatarEditor
              ref="editor"
              image={previewSrc}
              width={this._adjustForWidthProp()}
              height={this._adjustForHeightProp()}
              border={this._adjustForPaddingProp()}
              color={previewSrc ? [0, 0, 0, 0.2] : [255, 255, 255, 0.6]}
              scale={this._adjustForZoomProp()}
            />
          </div>
        </div>
        {!simpleControls && previewSrc && (
          <AdvancedControls
            onFileOpen={this.openFileExplorer.bind(this)}
            onZoom={this._zoomChanged.bind(this)}
            zoomValue={this._adjustForZoomProp()}
            hideZoom={typeof zoomValue !== 'undefined'}
            spacing={this._adjustForPaddingProp()}
            width={this._adjustForWidthProp()}
          />
        )}
      </div>
    );
  }

  _zoomChanged(newZoom) {
    this.setState({ internalZoomValue: newZoom });
  }

  _fileDrop(files) {
    this._loadFile(files[0]);
  }

  _loadFile(file) {
    const reader = new FileReader();
    reader.onload = ({ currentTarget: { result } }) => {
      this._onNewFile(result);
    };
    reader.readAsDataURL(file);
  }

  _onNewFile(base64File) {
    this.setState({
      previewSrc: base64File
    });
  }

  _adjustForZoomProp() {
    const { zoomValue } = this.props;
    if (typeof zoomValue === 'undefined') {
      return this.state.internalZoomValue;
    }
    return zoomValue;
  }

  _adjustForWidthProp() {
    const { width } = this.props;
    return width || 400;
  }

  _adjustForHeightProp() {
    const { height } = this.props;
    return height || 300;
  }

  _adjustForPaddingProp() {
    const { imagePadding } = this.props;
    return imagePadding || 10;
  }

  _getDropZoneAdjustedStyles() {
    const { disableBorder } = this.props;
    if (disableBorder) {
      return {
        width: this._adjustForWidthProp(),
        height: this._adjustForHeightProp(),
        padding: this._adjustForPaddingProp(),
      };
    } else {
      const border = 1; // border offsets width/height and mis-aligns the drop area and the scale/crop
      return {
        width: this._adjustForWidthProp() - border * 2,
        height: this._adjustForHeightProp() - border * 2,
        padding: this._adjustForPaddingProp(),
        border: `${border}px dashed black`,
      };
    }
  }

  _getWrapperAdjustedStyles() {
    return {
      height: this._adjustForHeightProp() + this._adjustForPaddingProp() * 2,
      width: this._adjustForWidthProp(),
    };
  }
}

export default ReactDropNCrop;
