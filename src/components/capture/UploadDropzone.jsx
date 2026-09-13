import { useRef } from 'react'
import styles from './UploadDropzone.module.css'

export default function UploadDropzone({ onUpload }) {
  const inputRef = useRef(null)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const img = new Image()
    img.onload = () => {
      onUpload({
        url: URL.createObjectURL(file),
        width: img.naturalWidth,
        height: img.naturalHeight,
        source: 'upload',
      })
    }
    img.src = URL.createObjectURL(file)
  }

  return (
    <div
      className={styles.dropzone}
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault()
        handleFile(event.dataTransfer.files?.[0])
      }}
    >
      <p>Drag a photo here, or click to browse</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.input}
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
    </div>
  )
}
