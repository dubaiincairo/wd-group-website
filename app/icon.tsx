import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: '#08090C',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#C9A86A',
          fontWeight: 800,
          borderRadius: 6,
          border: '1.5px solid #C9A86A',
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
