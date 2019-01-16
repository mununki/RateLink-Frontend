import React from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

class AwesomeCropper extends React.Component {
  state = {
    src: "/static/profile_images/profile_image_1.jpg"
  };
  componentDidMount() {
    // this._initCropper();
  }
  _initCropper = () => {
    this.cropper = new Cropper(this.img, {
      aspectRatio: this.props.aspectRatio
    });
  };
  _uploadToServer = () => {
    this.cropper
      .getCroppedCanvas({
        width: this.props.width || 500,
        height: this.props.height || 500,
        minWidth: 0,
        minHeight: 0,
        maxWidth: 1024,
        maxHeight: 1024,
        fillColor: "#fff",
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high"
      })
      .toBlob(blob => {
        this.props.upload(blob);
      });
    this.props.closeModal();
  };
  _handleFileChange = e => {
    this._initCropper();
    const {
      target: {
        validity,
        files: [file]
      }
    } = e;
    if (validity.valid) {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({ src: reader.result });
        this.cropper
          .reset()
          .clear()
          .replace(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  render() {
    return (
      <div>
        <div
          style={{
            marginTop: "1rem",
            maxHeight: "50vh",
            minHeight: "50vh",
            padding: "1rem",
            overflow: "hidden"
          }}
        >
          <img
            ref={node => (this.img = node)}
            src={this.state.src}
            style={{ maxWidth: "100%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem"
          }}
        >
          <input
            type="file"
            id="origin-image"
            name="origin-image"
            className="input-file"
            onChange={this._handleFileChange}
          />
          <label htmlFor="origin-image">
            <i className="fas fa-file-image" /> Choose a file
          </label>

          <button className="button-save" onClick={this._uploadToServer}>
            저장
          </button>
        </div>
        <style jsx>
          {`
            .input-file {
              width: 0.1px;
              height: 0.1px;
              opacity: 0;
              overflow: hidden;
              position: absolute;
              z-index: -1;
            }
            .input-file + label {
              margin: 0px;
              padding: 10px 20px 10px 20px;
              color: white;
              background-color: #6dbad8;
              display: inline-block;
              border-radius: 5px;
            }
            .input-file + label:hover {
              background-color: #053f5c;
              cursor: pointer;
            }
            .button-save {
              height: 3em;
              padding: 10px 20px 10px 20px;
              color: white;
              background-color: #6dbad8;
              display: inline-block;
              border-radius: 5px;
              border-bottom: 3px solid #053f5c;
            }
            .button-save:hover {
              background-color: #053f5c;
              cursor: pointer;
            }
          `}
        </style>
      </div>
    );
  }
}

export default AwesomeCropper;
