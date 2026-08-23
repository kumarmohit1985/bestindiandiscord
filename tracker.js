/**
 * TheIndia Conversion Tracking & Mobile Deep Link Protocol
 */
document.addEventListener('DOMContentLoaded', () => {
    // Select all join invite links
    const discordLinks = document.querySelectorAll('a[href*="discord.gg/theindia"]');

    discordLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const currentPath = window.location.pathname || 'homepage';

            // 1. Send Custom Conversion Event to Google Analytics 4
            if (typeof gtag === 'function') {
                gtag('event', 'join_discord_click', {
                    'event_category': 'Engagement',
                    'event_label': currentPath,
                    'landing_page': currentPath,
                    'value': 1
                });
            }

            // 2. Handle Mobile Deep-Linking for Native App Experience
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            if (isMobile) {
                // Prevent default web navigation briefly to attempt app launch
                e.preventDefault();
                const deepLink = 'discord://discord.com/invite/theindia';
                const webLink = 'https://discord.gg/theindia';
                
                const start = Date.now();
                window.location.href = deepLink;

                // Fallback to standard web URL if app fails to open within 1.5 seconds
                setTimeout(() => {
                    if (Date.now() - start < 1800) {
                        window.location.href = webLink;
                    }
                }, 1500);
            }
        });
    });
});
