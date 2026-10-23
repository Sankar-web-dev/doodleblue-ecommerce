function Svg({ size = 18, fill = 'none', children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  )
}

export function CartIcon({ size }) {
  return (
    <Svg size={size}>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
      <path d="M3 3h2l2.4 12.3a1 1 0 0 0 1 .7h8.7a1 1 0 0 0 1-.8L20 8H6" />
    </Svg>
  )
}

export function SearchIcon({ size }) {
  return (
    <Svg size={size}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Svg>
  )
}

export function TrashIcon({ size }) {
  return (
    <Svg size={size}>
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M6 7l1 13a1 1 0 0 0 1 .9h8a1 1 0 0 0 1-.9L18 7" />
      <path d="M10 11v6M14 11v6" />
    </Svg>
  )
}

export function TruckIcon({ size }) {
  return (
    <Svg size={size}>
      <path d="M3 6h11v9H3z" />
      <path d="M14 10h4l3 3v2h-7" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </Svg>
  )
}

export function ReturnIcon({ size }) {
  return (
    <Svg size={size}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </Svg>
  )
}

export function CheckIcon({ size }) {
  return (
    <Svg size={size}>
      <path d="M4 12.5l5 5L20 6.5" />
    </Svg>
  )
}

export function MoonIcon({ size }) {
  return (
    <Svg size={size}>
      <path d="M20 13.5A8 8 0 0 1 10.5 4a8 8 0 1 0 9.5 9.5z" />
    </Svg>
  )
}

export function SunIcon({ size }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2.5M12 19.5V22M4.5 12H2M22 12h-2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8" />
    </Svg>
  )
}

export function HeartIcon({ size, filled = false }) {
  return (
    <Svg size={size} fill={filled ? 'currentColor' : 'none'}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </Svg>
  )
}
