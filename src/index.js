export default {
  async fetch(request) {
    const url = new URL(request.url);
    const hostname = url.hostname.replace(/^www\./, '');

    // 1. kibris.im — ShortURL & QR Ağ Geçidi (301 Kalıcı Yönlendirme)
    if (hostname === 'kibris.im') {
      return Response.redirect('https://kibrisim.com.tr' + url.pathname, 301);
    }

    // 2. robots.txt (Googlebot / Bingbot İndeksleme İzni)
    if (url.pathname === '/robots.txt') {
      return new Response("User-agent: *\nAllow: /\nSitemap: https://kibrisim.com.tr/sitemap.xml", {
        headers: { 'Content-Type': 'text/plain; charset=UTF-8' },
      });
    }

    // 3. kibrisim.com.tr — Light/Dark Destekli, en-GB Şemalı No-Branding Sayfa
    const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kıbrısım — Kuzey Kıbrıs Dijital Altyapı ve Veri Ağı</title>
  <meta name="description" content="Kuzey Kıbrıs Türk Cumhuriyeti genelinde yerel işletme, mekan ve hizmet ağı veri altyapısı.">
  <link rel="canonical" href="https://kibrisim.com.tr/">
  <meta name="robots" content="index, follow">

  <!-- SEOPress & en-GB Uyumlu Google Deep Tree Şeması -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://kibrisim.com.tr/#website",
        "url": "https://kibrisim.com.tr/",
        "name": "Kıbrısım",
        "inLanguage": ["tr-TR", "en-GB", "ru-RU"],
        "description": "Kuzey Kıbrıs Yerel Güven ve Keşif Ekosistemi",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://kibrisim.com.tr/kesfet/?keyword={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ItemList",
        "@id": "https://kibrisim.com.tr/#districts",
        "name": "Kuzey Kıbrıs İlçeleri",
        "itemListElement": [
          { "@type": "SiteNavigationElement", "position": 1, "name": "Lefkoşa", "url": "https://kibrisim.com.tr/bolge/lefkosa/" },
          { "@type": "SiteNavigationElement", "position": 2, "name": "Girne", "url": "https://kibrisim.com.tr/bolge/girne/" },
          { "@type": "SiteNavigationElement", "position": 3, "name": "Gazimağusa", "url": "https://kibrisim.com.tr/bolge/gazimagusa/" },
          { "@type": "SiteNavigationElement", "position": 4, "name": "İskele", "url": "https://kibrisim.com.tr/bolge/iskele/" },
          { "@type": "SiteNavigationElement", "position": 5, "name": "Güzelyurt", "url": "https://kibrisim.com.tr/bolge/guzelyurt/" },
          { "@type": "SiteNavigationElement", "position": 6, "name": "Lefke", "url": "https://kibrisim.com.tr/bolge/lefke/" }
        ]
      }
    ]
  }
  </script>

  <style>
    :root {
      --bg: #f8fafc;
      --border: #cbd5e1;
      --title: #0f172a;
      --text: #475569;
      --meta: #64748b;
      --dot: #059669;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #090d16;
        --border: #1e293b;
        --title: #f8fafc;
        --text: #94a3b8;
        --meta: #64748b;
        --dot: #10b981;
      }
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    .container {
      max-width: 480px;
      width: 100%;
      border-left: 2px solid var(--border);
      padding: 1rem 0 1rem 2rem;
    }
    h1 {
      font-size: 1.35rem;
      color: var(--title);
      font-weight: 600;
      letter-spacing: -0.015em;
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .status {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: var(--meta);
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .pulse {
      width: 6px;
      height: 6px;
      background: var(--dot);
      border-radius: 50%;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>kibrisim.com.tr</h1>
    <p>
      Kuzey Kıbrıs yerel işletme, mekan ve hizmet ekosistemi veri altyapısı hazırlık aşamasındadır.<br>
      <span style="font-size: 0.88rem; opacity: 0.75; display: block; margin-top: 0.4rem;">
        Northern Cyprus local business, venue, and service directory infrastructure in progress.
      </span>
    </p>
    <div class="status">
      <span class="pulse"></span> System initialization &bull; 2026
    </div>
  </div>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  },
};
