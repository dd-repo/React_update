import PDFJS from 'pdfjs-dist'

const MAX_WIDTH = 600;
const MAX_HEIGHT = 800;

const getDataUrl = file => {
  const fileType = file.type.split('/').pop()
  if(fileType === 'pdf') {
    // getPDFDataUrl(file)
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = e => {
        let dataUrl = e.target.result
        resolve(dataUrl)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }else{
    return new Promise((resolve, reject) => {
      let img = document.createElement('img')
      let reader = new FileReader();

      reader.onload = e => {
        img.src = e.target.result
        img.onload = () => {
          const resizedImg = resizeImage(img)
          const dataUrl = resizedImg.toDataURL('image/png')
          resolve(dataUrl)
        }
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
}

const getPDFDataUrl = file => {
  const fileTypes = ['pdf']
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    const extension = file.name.split('.').pop().toLowerCase();
    fr.onload = function(e) {
      const success = fileTypes.indexOf(extension) > -1;
      if (success) {
        console.debug("Parsing PDF document...");
        //PDFJS.workerSrc = '<path_to_pdf.worker.js>';
        PDFJS.getDocument(e.target.result).then(function getPdf(pdf) {
          //
          // Fetch the first page
          //
          pdf.getPage(1).then(function getPage(page) {
            const scale = 1.5;
            const viewport = page.getViewport(scale);

            //
            // Prepare canvas using PDF page dimensions
            //
            // $(parentEl).append('<canvas id="pdf-image" class="preview"/>');
            let canvas = document.createElement('canvas')
            // const canvas = $(parentEl).find("canvas.preview").get(0);
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            //
            // Render PDF page into canvas context
            //
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext);
          });
        });
      }

    }
    fr.onloadend = function(e) {
      console.debug("Load End");
    }
    fr.readAsArrayBuffer(file);
  })
}

const resizeImage = img => {
  let w = img.width;
  let h = img.height;

    if(w > h) {
      if(w > MAX_WIDTH) {
        h *= MAX_WIDTH / w
        w = MAX_WIDTH
      }
    } else {
      if(h > MAX_HEIGHT) {
        w *= MAX_HEIGHT / h
        h = MAX_HEIGHT
      }
    }

    let canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h

    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, w, h)

    return canvas
}

export default getDataUrl;
