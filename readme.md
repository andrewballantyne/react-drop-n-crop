# React Drop'N'Crop

A react component that allows you to drop an image onto a predefined area, zoom in and out, pan around and finally crop your image out into a base64 string. This component is intended to combine [react-dropzone](https://github.com/okonet/react-dropzone) and [react-avatar-editor](https://github.com/mosch/react-avatar-editor) and produce a unified component for selecting and cropping images.

An ideal intended goal would be to eventually remove the *react-dropzone* and *react-avatar-editor* dependencies.

## Table Of Contents

1. [Installation](#installation)
1. [Usage](#usage)
1. [Props](#props)
1. [Styling](#styling)
1. [Development](#development)
1. [License](#license)

## Installation

> Coming soon as an NPM package.

## Usage

```js
class Example extends React.Component {
  render() {
    return (
      <div>
        <h1>React Drop'N'Crop</h1>
        <ReactDropNCrop ref="react" />
      </div>
    );
  }
  
  getBase64() {
    // This will get you a base64 png image string, do with it as you wish
    const base64Png = this.refs.react.getBase64();
    // Send it to the server, render it elsewhere, put it into an img tag's src property, etc
  }

  manuallyOpenFilePicker() {
    // Opens up the browser's file picker
    this.refs.react.openFileExplorer();
  }
}
```

### Public API

| Method | return | params | Description |
|:------:|:------:|:------:|:------------|
| getBase64 | string | type {string} | *Optional*. Gets the selected image, in a base64 string, at the particular crop settings. If no image is loaded, it will return null. Omitting the type will get you a png image, the image types available is dependent on your browser's canvas->base64 support. Any unsupported type defaults back to a png image. |
| openFileExplorer | void | none | Manually opens the browser's file picker | 

## Props

| Prop | Type | Default | Description |
|:----:|:----:|:-------:|:------------|
| width | number | 400 | The width of the component |
| height | number | 300 | The height of the component |
| imagePadding | number | 10 | The padding that is present around the edge of the crop area, this is mainly to help the user see the content around the image that will be cropped |
| disableBorder | boolean | false | True to disable the dashed outline around the component; such as for stlying if you want to do something alternatively |

## Styling

Styling is a bit of a fickle beast, as React Drop'N'Crop uses external libraries currently. But with that said, here is how you can style everything:

JSX Content:

```html
<div className="wrapper">
  <ReactDropNCrop />
</div>
```

SASS layout:

```css
.wrapper {
  // styles for your component
  
  .rdc {
    // base styles
    .rdc-wrapper {
      // styles for the content wrapper
      .rdc-droparea {
        // styles for the drop area
      }
      .rdc-editor canvas { // IMPORTANT, be sure to include 'canvas' as the react-avatar-editor does not accept classNames
        // styles for the editor
      }
    }
    .rdc-controls {
      // styles for the controls that appear after a file is selected
      .rdc-control-file-pick-btn {
        // styles for the additional file pick button
      }
      .rdc-control-zoom-range {
        // styles for the zoom range field
      }
    }
  }
}
```

## Development

Contributions are open, please open an issue with the desired change before submitting a pull request. Some details on usage:

* `npm install` to get all the dependencies
* `npm run build` will create a bundle.js file in the example folder and this will allow you to test out the component in a test environment

**@see** src/ExampleWrapper.js for the visual representation of the example index.

## License

MIT
