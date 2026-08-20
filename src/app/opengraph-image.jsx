import { ImageResponse } from 'next/og';

export const alt = 'SM FERDOUS AHMMED | Full Stack Developer & IoT Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #07090e 0%, #0d1117 50%, #050811 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Glow accent in background */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.25) 0%, transparent 70%)',
          }}
        />

        {/* Status pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 18px',
            borderRadius: '999px',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            color: '#22c55e',
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#22c55e',
            }}
          />
          Available for new projects
        </div>

        {/* Main Name */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            marginBottom: 16,
            color: '#ffffff',
            display: 'flex',
          }}
        >
          SM FERDOUS AHMMED
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: '#00e5ff',
            marginBottom: 24,
          }}
        >
          Full Stack Developer & IoT Engineer
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            color: '#94a3b8',
            maxWidth: '900px',
            lineHeight: 1.5,
          }}
        >
          Building high-performance web applications, scalable cloud backends, and modern embedded IoT systems.
        </div>

        {/* Bottom Tagline */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '80px',
            display: 'flex',
            gap: '20px',
            fontSize: 18,
            color: '#64748b',
          }}
        >
          <span>React • Next.js • Node.js • PostgreSQL • Embedded C • IoT</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
