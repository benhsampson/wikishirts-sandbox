import React from 'react';
import html2canvas from 'html2canvas';
import mergeImages from 'merge-images';

import shirtUnderlayBackground from '../../../assets/shirt-underlay-background.png';
import sample from '../../../assets/sample.jpg';

class Home extends React.Component {
  state = {
    response: '',
    image: '',
  };

  componentDidMount() {
    this.convertDOMToImage();
  }

  convertDOMToImage = () => {
    const node = document.getElementById('converted-dom');

    html2canvas(node).then((canvas) => {
      const img = new Image();
      img.src = canvas.toDataURL();
      img.alt = 'Unedited image';

      document.body.appendChild(img);

      const newCanvas = document.createElement('canvas');
      newCanvas.width = 300;
      newCanvas.height = 300;
      const context = newCanvas.getContext('2d');

      const image = context.getImageData(0, 0, 300, 300);
      const imageData = image.data;
      const length = imageData.length;

      for (let i = 3; i < length; i += 4) {
        imageData[i] = 40;
      }

      // image.data = imageData;
      context.putImageData(image, 0, 0);

      console.log('MANIPULTED IMAGE', img);

      context.drawImage(img, 0, 0);

      const newImg = document.createElement('img');
      newImg.src = newCanvas.toDataURL();
      newImg.alt = 'Edited image';

      newImg.globalAlpha = 0.5;

      document.body.appendChild(newCanvas);
      document.body.appendChild(newImg);

      this.setState({ image: newImg.src }, () => this.combineImages());
    });
  };

  combineImages = () => {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = 300;
    newCanvas.height = 300;
    const context = newCanvas.getContext('2d');

    const bgImage = new Image();
    bgImage.crossorigin = 'anonymous';
    bgImage.src = '/images/test.png';
    bgImage.alt = 'Shirt underlay background';
    bgImage.width = 300;
    bgImage.height = 300;

    console.log('BACKGROUND IMAGE', bgImage);

    const fgImage = new Image();
    fgImage.src = this.state.image;

    console.log('FOREGROUND IMAGE', fgImage);

    context.drawImage(bgImage, 0, 0, 300, 300);
    // context.drawImage(fgImage, 0, 0, 300, 300);

    document.body.appendChild(bgImage);
    document.body.appendChild(fgImage);
    document.body.appendChild(newCanvas);

    this.convertToFinalImage(newCanvas);
  }

  convertToFinalImage = (canvas) => {
    const image = new Image();
    image.setAttribute('crossorigin', 'anonymous');
    image.src = canvas.toDataURL('image/png', { progressive: false });
    image.alt = 'Final image after conversion of DOM to canvas, canvas to image, image combination';

    console.log('FINAL IMAGE', image);

    document.body.appendChild(image);
  };

  render() {
    return (
      <div id="converted-dom" style={{ background: 'red' }}>
        <p>This is a little test in sandbox project.</p>
      </div>
    );
  }
}

export default Home;
