// components/TikTokEmbed.tsx
import React, { useEffect } from 'react';

interface TikTokEmbedProps {
    videoId: string;
}

const TikTokEmbed: React.FC<TikTokEmbedProps> = ({ videoId }) => {
    useEffect(() => {
        // Load TikTok Embed script
        const script = document.createElement('script');
        script.src = 'https://www.tiktok.com/embed.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Clean up the script when the component is unmounted
            document.body.removeChild(script);
        };
    }, []);

    return (
        <blockquote
            className="tiktok-embed"
            cite={`https://www.tiktok.com/@wethepeople.wear/video/${videoId}`}
            data-video-id={videoId}
            style={{ maxWidth: '600px', minWidth: '400px' }}
        >
            <section>
                <div style={{ overflow: 'auto', position: 'absolute', height: '0pt', width: '0pt' }}>
                    <a href="https://www.embedista.com/tiktok-embed">Tiktok Embed Code Generator</a>
                </div>
                <div style={{ position: 'absolute', width: '91%', bottom: '4px', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto', color: '#000', textAlign: 'center' }}></div>
            </section>
        </blockquote>
    );
};

export default TikTokEmbed;
