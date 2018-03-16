const MAX_WIDTH = 600;
const MAX_HEIGHT = 800;

const getDataUrl = file => {
  const fileType = file.type.split('/').pop()
  return fileType === 'pdf' ? getPDFDateURL(file) : getImgDataURL(file)
}

const getPDFDateURL = file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = e => {
      let dataUrl = e.target.result
      resolve(dataUrl)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const getImgDataURL = file => {
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
