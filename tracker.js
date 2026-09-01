/**
 * FIZA Conversion Tracking & Mobile Deep Link Protocol
 * Robust event delegation + Beacon GA4 delivery
 */
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        // Match any clicked link or child element pointing to discord.gg/fiza
        const link = e.target.closest('a[href*="discord.gg/fiza"]');
        if (!link) return;

        const currentPath = window.location.pathname || '/';

        // 1. Send Custom Conversion Event to GA4 via Beacon (Non-blocking)
        if (typeof gtag === 'function') {
            gtag('event', 'join_discord_click', {
                'event_category': 'Engagement',
                'event_label': currentPath,
                'landing_page': currentPath,
                'transport_type': 'beacon',
                'value': 1
            });
        }

        // 2. Mobile Deep-Linking for Native App Opening
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            e.preventDefault();
            const deepLink = 'discord://discord.com/invite/fiza';
            const webLink = 'https://discord.gg/fiza';
            
            const start = Date.now();
            window.location.href = deepLink;

            // Fallback to standard web link if the native app isn't installed
            setTimeout(() => {
                if (Date.now() - start < 1800) {
                    window.location.href = webLink;
                }
            }, 1500);
        }
    });
});
