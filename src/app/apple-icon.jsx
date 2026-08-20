import { ImageResponse } from 'next/og';
import { safeQuery } from '@/lib/db';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default async function AppleIcon() {
  const heroData = await safeQuery(p => p.hero.findFirst(), null);
  const logoImage = heroData?.logoImage;
  const initials = (heroData?.logoName || 'SF').slice(0, 2).toUpperCase();

  if (logoImage && logoImage.startsWith('data:image')) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '36px',
            overflow: 'hidden',
            backgroundColor: '#050811',
          }}
        >
          <img
            src={logoImage}
            alt="Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '36px',
          background: 'linear-gradient(135deg, #00e5ff 0%, #0077b6 100%)',
          color: '#050811',
          fontWeight: 900,
          fontSize: 80,
          letterSpacing: '-0.05em',
        }}
      >
        {initials}
      </div>
    ),
    { ...size }
  );
}
