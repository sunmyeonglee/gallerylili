import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Gallery Lili'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 56,
            fontWeight: 500,
            letterSpacing: '0.25em',
            color: '#18181b',
            textTransform: 'uppercase',
          }}
        >
          Gallery Lili
        </span>
        <span
          style={{
            fontSize: 18,
            letterSpacing: '0.15em',
            color: '#a1a1aa',
            textTransform: 'uppercase',
          }}
        >
          Kinetic Art · Automata · Moving Sculpture
        </span>
      </div>
    ),
    { ...size }
  )
}