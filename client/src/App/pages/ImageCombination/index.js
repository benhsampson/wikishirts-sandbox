import React from 'react';
import html2canvas from 'html2canvas';

class ImageCombination extends React.Component {
  componentDidMount() {
    this.convertDOMToImage();
  }

  convertDOMToImage = () => {
    const node = document.getElementById('converted-dom');

    html2canvas(node).then((canvas) => {
      this.mergeImages(['/images/test.png', canvas.toDataURL()])
        .then((b64) => {
          const image = new Image();
          image.src = b64;
          image.alt = 'Image after conversion';

          document.body.appendChild(image);
        });
    });
  };

  mergeImages = (sources = []) => new Promise(resolve => {
    console.log('SOURCES', sources);

    const canvas = document.createElement('canvas');
    const image = new Image();

    const images = sources.map(source => new Promise((resolve, reject) => {
      console.log(source.constructor.name);

      if (source.constructor.name !== 'Object') {
        source = { src: source };
      }

      const img = new Image();
      img.onerror = () => resolve(new Error('Could not load image'));
      img.onload = () => resolve(Object.assign({}, source, { img }));
      img.src = source.src;

      console.log(img, source);
    }));

    const ctx = canvas.getContext('2d');

    resolve(Promise.all(images)
      .then(images => {
        console.log('IMAGES', images);
        canvas.width = 300;
        canvas.height = 300;

        images.forEach(image => {
          // ctx.globalAlpha = 0.5;
          return ctx.drawImage(image.img, 0, 0);
        });

        return canvas.toDataURL();
      }));
  });

  render() {
    return (
      <div id="converted-dom" style={{ background: 'green' }}>
        <p>Image combination testing in sandbox</p>
      </div>
    );
  }
}

export default ImageCombination;
