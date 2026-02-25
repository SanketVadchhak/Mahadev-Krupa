'use client';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

// 3D tilt removed on all devices — rotateY() escapes overflow:clip containment on iOS Safari
export default function TiltCard({ children, className = '' }: TiltCardProps) {
    return (
        <div className={`${className} transition-shadow duration-300`}>
            {children}
        </div>
    );
}
