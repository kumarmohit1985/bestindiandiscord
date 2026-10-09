/**
 * FIZA Conversion Tracking & Mobile Deep Link Protocol
 */
document.addEventListener('DOMContentLoaded',()=>{document.body.addEventListener('click',(e)=>{const link=e.target.closest('a[href*="discord.gg/fiza"]');if(!link)return;const currentPath=window.location.pathname||'/';if(typeof gtag==='function'){gtag('event','join_discord_click',{'event_category':'Engagement','event_label':currentPath,'landing_page':currentPath,'transport_type':'beacon','value':1});}if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)){e.preventDefault();const deepLink='discord://discord.com/invite/fiza';const webLink='https://discord.gg/fiza';const start=Date.now();window.location.href=deepLink;setTimeout(()=>{if(Date.now()-start<1800){window.location.href=webLink;}},1500);}},{passive:false});});
