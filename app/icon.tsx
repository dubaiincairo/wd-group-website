import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #141722 0%, #08090C 100%)',
          borderRadius: 8,
          border: '1.5px solid #C9A86A',
          boxShadow: '0 0 10px rgba(201, 168, 106, 0.3)',
          color: '#C9A86A',
          fontSize: 15,
          fontWeight: 900,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '-0.5px',
        }}
      >
        WD
      </div>
    ),
    {
      ...size,
    }
  );
}
