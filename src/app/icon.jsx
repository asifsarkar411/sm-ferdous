import { ImageResponse } from 'next/og';
import { safeQuery } from '@/lib/db';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';
export const dynamic = 'force-dynamic';

export default async function Icon() {
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
            borderRadius: '50%',
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
              borderRadius: '50%',
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
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00e5ff 0%, #0077b6 100%)',
          color: '#050811',
          fontWeight: 900,
          fontSize: 16,
          letterSpacing: '-0.05em',
        }}
      >
        {initials}
      </div>
    ),
    { ...size }
  );
}
