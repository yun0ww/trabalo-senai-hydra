/* ============================
   THEME + LANGUAGE + ANIMATIONS
   ============================ */

/* ---------------------------
   Helpers & DOM
   --------------------------- */
   const root = document.documentElement;
   const themeToggle = document.getElementById('theme-toggle');
   const langToggle = document.getElementById('lang-toggle');
   const animatedEls = document.querySelectorAll('.hero-inner, .card, .download-card, .num, .section-title');
   
   /* ---------------------------
      THEME (dark/light) with localStorage
      - we set data-theme attribute on <html>
      --------------------------- */
   const savedTheme = localStorage.getItem('theme'); // 'light' or 'dark'
   function applyTheme(t){
     if(t === 'light'){
       root.setAttribute('data-theme', 'light');
       themeToggle.textContent = '☀️';
     } else {
       root.setAttribute('data-theme', 'dark');
       themeToggle.textContent = '🌙';
     }
     localStorage.setItem('theme', t);
   }
   
   if(savedTheme) applyTheme(savedTheme);
   else {
     // default: prefer dark (to match original site). Could detect system preference here.
     applyTheme('dark');
   }
   
   themeToggle.addEventListener('click', () => {
     const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
     const next = current === 'light' ? 'dark' : 'light';
     applyTheme(next);
   });
   
   /* ---------------------------
      LANGUAGE (PT-BR / EN) with localStorage
      - simple translations keyed by data-translate attributes
      --------------------------- */
   const translations = {
     pt: {
       nav_download: "Download",
       hero_title: "O Launcher definitivo para todas as suas necessidades de jogo",
       hero_sub: "Baixe, jogue, acompanhe suas estatísticas e gerencie seus jogos em um só lugar.",
       cta_primary: "Baixar para Windows",
       features_title: "Temos muitos recursos legais",
       feat_1: "",
       feat_2: "",
       feat_3: "",
       download_title: "Download",
       download_sub: "Quando o download terminar, execute o instalador e siga as instruções na tela.",
       footer_text: "© 2025 Hydra Launcher"
     },
     en: {
       nav_download: "Download",
       hero_title: "The definitive game launcher for all your gaming needs",
       hero_sub: "Download, play, track your stats and manage your games all in one place.",
       cta_primary: "Download for Windows",
       features_title: "We have lots of cool features",
       feat_1: "",
       feat_2: "",
       feat_3: "",
       download_title: "Download",
       download_sub: "Once the download is complete, simply run the installer and follow the on-screen instructions.",
       footer_text: "© 2025 Hydra Launcher"
     }
   };
   
   let lang = localStorage.getItem('lang') || 'en';
   function applyLang(l){
     document.querySelectorAll('[data-translate]').forEach(el => {
       const key = el.getAttribute('data-translate');
       if(!key) return;
       const text = translations[l] && translations[l][key] ? translations[l][key] : el.textContent;
       el.textContent = text;
     });
     langToggle.textContent = (l === 'pt') ? 'PT-BR' : 'EN';
     localStorage.setItem('lang', l);
   }
   applyLang(lang);
   
   langToggle.addEventListener('click', () => {
     lang = (lang === 'pt') ? 'en' : 'pt';
     applyLang(lang);
   });
   
   /* ---------------------------
      Simple fade-up entry animation for multiple elements
      (staggered to mimic Hydra feel)
      --------------------------- */
   function animateIn() {
     const targets = [
       ...document.querySelectorAll('.hero-inner > *'),
       ...document.querySelectorAll('.hero-cta > *'),
       ...document.querySelectorAll('.section-title'),
       ...document.querySelectorAll('.card'),
       ...document.querySelectorAll('.download-card'),
       ...document.querySelectorAll('.num')
     ];
   
     targets.forEach((el, i) => {
       el.style.opacity = 0;
       el.style.transform = 'translateY(36px)';
       el.style.transition = `transform 0.75s cubic-bezier(.2,.9,.3,1) ${0.06 * i}s, opacity 0.65s ease ${0.06 * i}s`;
       requestAnimationFrame(() => {
         el.style.opacity = 1;
         el.style.transform = 'translateY(0)';
       });
     });
   }
   window.addEventListener('load', animateIn);
   
   /* ---------------------------
      Smooth scroll for anchors
      --------------------------- */
   document.querySelectorAll('a[href^="#"]').forEach(a => {
     a.addEventListener('click', e => {
       const href = a.getAttribute('href');
       if(!href || href === '#') return;
       const target = document.querySelector(href);
       if(target){
         e.preventDefault();
         const top = target.getBoundingClientRect().top + window.scrollY - 80; // account for fixed navbar
         window.scrollTo({ top, behavior: 'smooth' });
       }
     });
   });
   