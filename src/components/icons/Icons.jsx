export function CameraIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="7" width="20" height="14" rx="3" fill="currentColor" opacity="0.15" />
      <rect x="2" y="7" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 7L9.5 4.5H14.5L16 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="10.5" r="0.9" fill="currentColor" />
    </svg>
  )
}

export function UploadIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 16V4M12 4L7.5 8.5M12 4l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HeartIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20.5s-7.5-4.6-10-9.4C0.3 7.8 2 4.5 5.3 4c2-.3 3.9.6 5 2.2A5.9 5.9 0 0115.3 4c3.3.5 5 3.8 3.3 7.1-2.5 4.8-10 9.4-10 9.4z" />
    </svg>
  )
}

export function SparkleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2z" />
    </svg>
  )
}
