export const PHONE_NUMBER = '+48734753083'
export const PHONE_DISPLAY = '+48 734 753 083'
export const ADDRESS = 'Lipowa 54, 81-572 Gdynia'
export const MAPS_URL = 'https://maps.google.com/?q=Lipowa+54,+81-572+Gdynia'

const WA_SVG = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z'
const TT_SVG = 'M16.6 5.82s.51.5 1.3.86c.78.35 1.7.52 1.7.52v3.25a4.5 4.5 0 0 1-2.5-.9v5.95a5.6 5.6 0 1 1-5.6-5.6c.12 0 .24.01.36.02v3.35a2.3 2.3 0 0 0-.36-.03 2.35 2.35 0 1 0 2.35 2.35V2h3.15a4.4 4.4 0 0 0 1.6 3.82z'

// EmailJS credentials — replace with values from your EmailJS dashboard before deployment
export const EMAILJS_SERVICE_ID = 'service_xxxxxxx'
export const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'
export const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxx'

export const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/olka_detailing/',
    icon: 'Instagram',
  },
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/share/1EwocP1HZk/',
    icon: 'Facebook',
  },
  {
    label: 'WhatsApp',
    url: `https://wa.me/${PHONE_NUMBER.replace('+', '')}`,
    svgPath: WA_SVG,
  },
  {
    label: 'TikTok',
    url: 'https://www.tiktok.com/@olkadetailing',
    svgPath: TT_SVG,
  },
]
