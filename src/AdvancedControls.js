import React, { Component, PropTypes } from 'react';

const FACTOR = 10;
const ZOOM_MIN = 1 * FACTOR;
const ZOOM_INCREMENT = 2;
const ZOOM_MAX = 3 * FACTOR;

class AdvancedControls extends Component {
  static propTypes = {
    onFileOpen: PropTypes.func.isRequired,
    onZoom: PropTypes.func.isRequired,
    spacing: PropTypes.number,
    width: PropTypes.number,
    zoomValue: PropTypes.number,
    hideZoom: PropTypes.bool,
  };

  render() {
    const { hideZoom, onFileOpen, spacing, width, zoomValue } = this.props;

    return (
      <div className="rdc-controls" style={{ width }}>
        <button
          className="rdc-control-file-pick-btn"
          onClick={onFileOpen} style={{ padding: 10, margin: spacing, width }}
        >
          Change File
        </button>
        {!hideZoom && (<input
          type="range"
          className="rdc-control-zoom-range"
          min={ZOOM_MIN}
          value={typeof zoomValue === 'number' ? zoomValue * FACTOR : ZOOM_MIN}
          step={ZOOM_INCREMENT}
          max={ZOOM_MAX}
          onChange={this._onZoom.bind(this)}
          style={{ margin: spacing, width: '100%' }}
          title="Adjust Zoom"
        />)}
      </div>
    );
  }

  _onZoom({ currentTarget: { value } }) {
    const { onZoom } = this.props;
    onZoom(parseInt(value) / FACTOR || ZOOM_MIN / FACTOR);
  }
}

export default AdvancedControls;
