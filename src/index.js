/**
 * This file is an example of an external hook into the component ReactDropNCrop.
 *
 * There is a root class here that has various wrappers and hooks to get at the data.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDropNCrop from './ReactDropNCrop';

const mountTarget = document.getElementById('root');

const STYLES_PREVIEW = {
  display: 'block',
  backgroundColor: 'rgba(0,0,0,.4)',
};

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMsg: null,
      previewSrc: null,
    };
  }

  pngIt() {
    this._updatePreview(this.refs.react.getBase64());
  }

  jpgIt() {
    this._updatePreview(this.refs.react.getBase64('image/jpeg'));
  }

  openExplorer() {
    this.refs.react.openFileExplorer();
  }

  render() {
    const { errorMsg, previewSrc } = this.state;

    return (
      <div>
        <h2>External Hooks</h2>
        <button onClick={this.pngIt.bind(this)}>Get Cropped PNG Image</button>
        {' '}
        <button onClick={this.jpgIt.bind(this)}>Get Cropped JPG Image</button>
        {' '}
        <button
          onClick={this.openExplorer.bind(this)}
          title="This is external to the component; this just shows external access to change photo"
        >
          Change Image
        </button>
        {previewSrc && <img src={previewSrc} style={STYLES_PREVIEW} />}
        {errorMsg && <span style={{ color: 'red', padding: 10 }}>No preview available</span>}
        <hr />
        <h2>Everything Below Is The Component</h2>
        <ReactDropNCrop ref="react" />
      </div>
    );
  }

  _updatePreview(src) {
    if (src === null) {
      this.setState({
        errorMsg: true,
      });
      setTimeout(() => {
        this.setState({
          errorMsg: false,
        });
      }, 3000);
      return;
    }
    this.setState({
      errorMsg: false,
      previewSrc: src,
    });
  }
}

ReactDOM.render(<Root />, mountTarget);
