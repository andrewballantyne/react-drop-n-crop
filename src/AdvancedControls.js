import React, { Component, PropTypes } from 'react';

const ZOOM_MIN = 10;
const ZOOM_INCREMENT = 2;
const ZOOM_MAX = 30;

class AdvancedControls extends Component {
  static propTypes = {
    onFileOpen: PropTypes.func.isRequired,
    onZoom: PropTypes.func.isRequired,
    spacing: PropTypes.number,
    width: PropTypes.number,
    zoomValue: PropTypes.number,
  };

  render() {
    const { onFileOpen, spacing, width, zoomValue } = this.props;

    return (
      <div style={{ width }}>
        <button onClick={onFileOpen} style={{ padding: 10, margin: spacing, width }}>
          Change File
        </button>
        <input
          type="range"
          min={ZOOM_MIN}
          value={zoomValue || ZOOM_MIN}
          step={ZOOM_INCREMENT}
          max={ZOOM_MAX}
          onChange={this._onZoom.bind(this)}
          style={{ margin: spacing, width: '100%' }}
          title="Adjust Zoom"
        />
      </div>
    );
  }

  _onZoom({ currentTarget: { value } }) {
    const { onZoom } = this.props;
    onZoom(parseInt(value) || ZOOM_MIN);
  }
}

export default AdvancedControls;
