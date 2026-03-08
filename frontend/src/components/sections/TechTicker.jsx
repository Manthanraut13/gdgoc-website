import React from 'react';

const techItems = [
    { name: 'Flutter', color: 'var(--g-blue)' },
    { name: 'Android', color: 'var(--g-red)' },
    { name: 'Firebase', color: 'var(--g-green)' },
    { name: 'TensorFlow', color: 'var(--yellow-deep)' },
    { name: 'React', color: 'var(--g-blue)' },
    { name: 'Python', color: 'var(--g-red)' },
    { name: 'GCP', color: 'var(--g-green)' },
    { name: 'Kotlin', color: 'var(--yellow-deep)' },
    { name: 'Node.js', color: 'var(--g-blue)' },
    { name: 'Docker', color: 'var(--g-red)' },
    { name: 'Figma', color: 'var(--g-green)' },
    { name: 'TypeScript', color: 'var(--yellow-deep)' },
];

const TechTicker = () => {
    const items = [...techItems, ...techItems];

    return (
        <div
            style={{
                background: '#f8f9fa',
                overflow: 'hidden',
                padding: '12px 0',
                borderTop: '1px solid #eee',
                borderBottom: '1px solid #eee',
            }}
        >
            <div className="marquee-track" style={{ gap: '32px' }}>
                {items.map((item, i) => (
                    <React.Fragment key={i}>
                        <span
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                fontWeight: 800,
                                color: item.color,
                                whiteSpace: 'nowrap',
                                letterSpacing: '1px',
                                textTransform: 'uppercase'
                            }}
                        >
                            {item.name}
                        </span>
                        <span style={{ color: '#ccc', fontSize: '10px', fontWeight: 800 }}>•</span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default TechTicker;
