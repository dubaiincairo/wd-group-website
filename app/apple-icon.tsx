import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #161A26 0%, #08090C 100%)',
          borderRadius: 38,
          border: '4px solid #C9A86A',
          boxShadow: '0 0 30px rgba(201, 168, 106, 0.4)',
          position: 'relative',
        }}
      >
        <div
          style={{
            color: '#C9A86A',
            fontSize: 76,
            fontWeight: 900,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-2px',
            lineHeight: 1,
            marginBottom: 6,
          }}
        >
          WD
        </div>
        <div
          style={{
            color: '#E3C58A',
            fontSize: 12,
            fontWeight: 700,
            fontFamily: 'system-ui, -apple-system, monospace',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            opacity: 0.9,
          }}
        >
          HOLDING
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
