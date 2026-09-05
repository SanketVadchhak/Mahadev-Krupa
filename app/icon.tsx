import { ImageResponse } from 'next/og';

export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 20,
                    background: '#121212',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D4A843',
                    borderRadius: '50%',
                    fontWeight: 800,
                    border: '1px solid #D4A843',
                }}
            >
                MK
            </div>
        ),
        {
            ...size,
        }
    );
}
