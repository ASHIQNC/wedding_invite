// // //testing 2
// import { useState, useEffect, useRef, useCallback } from 'react';

// /* ═══════════════════════════════════════════════════════════
//    ANIME.JS — loaded from CDN via dynamic script injection
// ═══════════════════════════════════════════════════════════ */
// function useAnime() {
//   const [anime, setAnime] = useState(null);
//   useEffect(() => {
//     if (window.anime) {
//       setAnime(() => window.anime);
//       return;
//     }
//     const s = document.createElement('script');
//     s.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
//     s.onload = () => setAnime(() => window.anime);
//     document.head.appendChild(s);
//   }, []);
//   return anime;
// }

// /* ═══════════════════════════════════════════════════════════
//    SCROLL REVEAL
// ═══════════════════════════════════════════════════════════ */
// function useReveal(threshold = 0.12) {
//   const ref = useRef(null);
//   const [on, setOn] = useState(false);
//   useEffect(() => {
//     const io = new IntersectionObserver(
//       ([e]) => {
//         if (e.isIntersecting) {
//           setOn(true);
//           io.disconnect();
//         }
//       },
//       { threshold },
//     );
//     if (ref.current) io.observe(ref.current);
//     return () => io.disconnect();
//   }, []);
//   return [ref, on];
// }
// function Reveal({ children, delay = 0, dir = 'up', className = '' }) {
//   const [ref, on] = useReveal();
//   const t = {
//     up: on ? 'translateY(0)' : 'translateY(52px)',
//     left: on ? 'translateX(0)' : 'translateX(-60px)',
//     right: on ? 'translateX(0)' : 'translateX(60px)',
//     scale: on ? 'scale(1)' : 'scale(0.82)',
//     fade: 'none',
//   };
//   return (
//     <div
//       ref={ref}
//       className={className}
//       style={{
//         opacity: on ? 1 : 0,
//         transform: t[dir] || t.up,
//         transition: `opacity 1.2s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1.2s cubic-bezier(.16,1,.3,1) ${delay}s`,
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    SMALL DECORATIVES
// ═══════════════════════════════════════════════════════════ */
// const Diamond = ({ size = 8, color = '#d4af70', opacity = 0.5 }) => (
//   <div
//     style={{
//       width: size,
//       height: size,
//       transform: 'rotate(45deg)',
//       border: `1px solid ${color}`,
//       opacity,
//       flexShrink: 0,
//     }}
//   />
// );
// const GoldLine = ({ w = 48 }) => (
//   <div
//     style={{
//       display: 'flex',
//       alignItems: 'center',
//       gap: 8,
//       justifyContent: 'center',
//     }}
//   >
//     <div
//       style={{
//         height: 1,
//         width: w,
//         background: 'linear-gradient(to right,transparent,#d4af70)',
//       }}
//     />
//     <Diamond size={5} opacity={0.6} />
//     <Diamond size={9} opacity={0.9} />
//     <Diamond size={5} opacity={0.6} />
//     <div
//       style={{
//         height: 1,
//         width: w,
//         background: 'linear-gradient(to left,transparent,#d4af70)',
//       }}
//     />
//   </div>
// );
// const RoseIcon = ({ s = 44, op = 0.22 }) => (
//   <svg
//     viewBox='0 0 60 60'
//     width={s}
//     height={s}
//     style={{ opacity: op, flexShrink: 0, display: 'block' }}
//   >
//     <circle
//       cx='30'
//       cy='27'
//       r='7.5'
//       fill='none'
//       stroke='#d4a0a0'
//       strokeWidth='1.2'
//     />
//     {[
//       [-20, 30, 18],
//       [30, 40, 24],
//       [70, 38, 36],
//       [-70, 22, 36],
//       [-130, 20, 24],
//     ].map(([a, cx, cy], i) => (
//       <ellipse
//         key={i}
//         cx={cx}
//         cy={cy}
//         rx='7'
//         ry='10'
//         fill='none'
//         stroke='#d4a0a0'
//         strokeWidth='1'
//         transform={`rotate(${a} ${cx} ${cy})`}
//       />
//     ))}
//     <line x1='30' y1='35' x2='30' y2='58' stroke='#b8c9a8' strokeWidth='1.2' />
//     <ellipse
//       cx='22'
//       cy='50'
//       rx='9'
//       ry='5'
//       fill='none'
//       stroke='#b8c9a8'
//       strokeWidth='1'
//       transform='rotate(-30 22 50)'
//     />
//     <ellipse
//       cx='38'
//       cy='50'
//       rx='9'
//       ry='5'
//       fill='none'
//       stroke='#b8c9a8'
//       strokeWidth='1'
//       transform='rotate(30 38 50)'
//     />
//   </svg>
// );

// /* ═══════════════════════════════════════════════════════════
//    FLOATING PETALS
// ═══════════════════════════════════════════════════════════ */
// function Petals() {
//   const [items] = useState(() =>
//     Array.from({ length: 22 }).map((_, i) => ({
//       id: i,
//       left: Math.random() * 100,
//       dur: 12 + Math.random() * 16,
//       delay: Math.random() * 18,
//       size: 14 + Math.random() * 22,
//       rot: Math.random() * 360,
//       kind: i % 3,
//     })),
//   );
//   return (
//     <div
//       style={{
//         position: 'fixed',
//         inset: 0,
//         pointerEvents: 'none',
//         overflow: 'hidden',
//         zIndex: 0,
//       }}
//     >
//       {items.map((p) => (
//         <div
//           key={p.id}
//           style={{
//             position: 'absolute',
//             left: `${p.left}%`,
//             bottom: -80,
//             width: p.size,
//             height: p.size,
//             animation: `petalRise ${p.dur}s linear ${p.delay}s infinite`,
//           }}
//         >
//           {p.kind === 0 && (
//             <svg
//               viewBox='0 0 30 42'
//               style={{ transform: `rotate(${p.rot}deg)`, opacity: 0.45 }}
//             >
//               <ellipse cx='15' cy='21' rx='11' ry='19' fill='#d4a0b0' />
//               <path
//                 d='M15 4 Q18 21 15 38 Q12 21 15 4'
//                 fill='rgba(212,160,176,.35)'
//               />
//             </svg>
//           )}
//           {p.kind === 1 && (
//             <svg
//               viewBox='0 0 20 20'
//               style={{ transform: `rotate(${p.rot}deg)`, opacity: 0.32 }}
//             >
//               <path
//                 d='M10 1L11.5 8L18 8L12.5 12L14.5 19L10 15L5.5 19L7.5 12L2 8L8.5 8Z'
//                 fill='rgba(212,175,112,.7)'
//               />
//             </svg>
//           )}
//           {p.kind === 2 && (
//             <svg
//               viewBox='0 0 22 28'
//               style={{ transform: `rotate(${p.rot}deg)`, opacity: 0.38 }}
//             >
//               <ellipse cx='11' cy='14' rx='8' ry='13' fill='#c87090' />
//             </svg>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    COUNTDOWN
// ═══════════════════════════════════════════════════════════ */
// function Countdown({ targetDate }) {
//   const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
//   useEffect(() => {
//     const tick = () => {
//       const diff = new Date(targetDate) - new Date();
//       if (diff <= 0) {
//         setTime({ d: 0, h: 0, m: 0, s: 0 });
//         return;
//       }
//       const d = Math.floor(diff / 86400000);
//       const h = Math.floor((diff % 86400000) / 3600000);
//       const m = Math.floor((diff % 3600000) / 60000);
//       const s = Math.floor((diff % 60000) / 1000);
//       setTime({ d, h, m, s });
//     };
//     tick();
//     const id = setInterval(tick, 1000);
//     return () => clearInterval(id);
//   }, [targetDate]);

//   return (
//     <div
//       style={{
//         display: 'flex',
//         gap: 'clamp(10px,3.5vw,24px)',
//         justifyContent: 'center',
//         flexWrap: 'wrap',
//         padding: '0 4px',
//       }}
//     >
//       {[
//         ['Days', time.d],
//         ['Hours', time.h],
//         ['Minutes', time.m],
//         ['Seconds', time.s],
//       ].map(([label, val]) => (
//         <div
//           key={label}
//           style={{ textAlign: 'center', minWidth: 'clamp(72px,20vw,110px)' }}
//         >
//           <div
//             style={{
//               position: 'relative',
//               borderRadius: 'clamp(14px,4vw,20px)',
//               padding: 'clamp(22px,6vw,36px) 8px clamp(16px,4vw,26px)',
//               background:
//                 'linear-gradient(145deg,rgba(100,24,42,.6),rgba(55,12,24,.8))',
//               border: '1px solid rgba(212,175,112,.28)',
//               boxShadow:
//                 '0 20px 50px rgba(0,0,0,.45), 0 0 40px rgba(160,40,80,.1), inset 0 1px 0 rgba(255,255,255,.05)',
//             }}
//           >
//             {/* inner top glow */}
//             <div
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 height: 1,
//                 background:
//                   'linear-gradient(to right,transparent,rgba(212,175,112,.45),transparent)',
//               }}
//             />
//             <div
//               style={{
//                 fontFamily: "'Cormorant Garamond',serif",
//                 fontSize: 'clamp(48px,13vw,76px)',
//                 fontWeight: 300,
//                 lineHeight: 1,
//                 background: 'linear-gradient(135deg,#c8a44a,#f5de8a,#c8a44a)',
//                 backgroundSize: '200%',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//               }}
//             >
//               {String(val).padStart(2, '0')}
//             </div>
//             <div style={{ position: 'absolute', top: 10, right: 10 }}>
//               <Diamond size={5} opacity={0.32} />
//             </div>
//             <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
//               <Diamond size={5} opacity={0.32} />
//             </div>
//           </div>
//           <p
//             style={{
//               fontFamily: "'Jost',sans-serif",
//               fontSize: 'clamp(8px,2.2vw,10px)',
//               letterSpacing: '.42em',
//               textTransform: 'uppercase',
//               color: 'rgba(212,175,112,.48)',
//               marginTop: 12,
//               marginBottom: 0,
//             }}
//           >
//             {label}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    WAX SEAL SVG
// ═══════════════════════════════════════════════════════════ */
// function WaxSeal({ sealRef }) {
//   return (
//     <div
//       ref={sealRef}
//       style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}
//     >
//       <div
//         className='seal-glow'
//         style={{
//           position: 'absolute',
//           inset: -10,
//           borderRadius: '50%',
//           background:
//             'radial-gradient(circle,rgba(212,175,112,.45) 0%,transparent 70%)',
//         }}
//       />
//       <svg
//         viewBox='0 0 120 120'
//         width='120'
//         height='120'
//         style={{ display: 'block', position: 'relative', zIndex: 1 }}
//       >
//         <circle cx='60' cy='60' r='56' fill='#b8906a' />
//         <circle cx='60' cy='60' r='52' fill='#d4a882' />
//         <circle cx='60' cy='60' r='48' fill='#c49a7a' />
//         {Array.from({ length: 32 }).map((_, i) => {
//           const a = (i / 32) * Math.PI * 2;
//           return (
//             <circle
//               key={i}
//               cx={60 + 44 * Math.cos(a)}
//               cy={60 + 44 * Math.sin(a)}
//               r='1.3'
//               fill='#a8804a'
//             />
//           );
//         })}
//         <circle cx='60' cy='60' r='36' fill='#c8a07a' />
//         <circle cx='60' cy='60' r='32' fill='#dbb898' />
//         {Array.from({ length: 12 }).map((_, i) => {
//           const a = (i / 12) * Math.PI * 2;
//           return (
//             <line
//               key={i}
//               x1={60 + 14 * Math.cos(a)}
//               y1={60 + 14 * Math.sin(a)}
//               x2={60 + 29 * Math.cos(a)}
//               y2={60 + 29 * Math.sin(a)}
//               stroke='#a8804a'
//               strokeWidth='0.7'
//             />
//           );
//         })}
//         <circle
//           cx='60'
//           cy='60'
//           r='12'
//           fill='none'
//           stroke='#a8804a'
//           strokeWidth='0.8'
//         />
//       </svg>
//       <div
//         style={{
//           position: 'absolute',
//           inset: 0,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 2,
//         }}
//       >
//         <span
//           style={{
//             fontFamily: "'Great Vibes',cursive",
//             fontSize: 15,
//             color: '#6a4c2a',
//             lineHeight: 1,
//           }}
//         >
//           A
//         </span>
//         <span
//           style={{
//             fontFamily: "'Cormorant Garamond',serif",
//             fontSize: 8,
//             color: '#6a4c2a',
//             letterSpacing: 2,
//           }}
//         >
//           &amp;
//         </span>
//         <span
//           style={{
//             fontFamily: "'Great Vibes',cursive",
//             fontSize: 15,
//             color: '#6a4c2a',
//             lineHeight: 1,
//           }}
//         >
//           S
//         </span>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    MAIN APP
// ═══════════════════════════════════════════════════════════ */
// export default function WeddingInvitation() {
//   const anime = useAnime();
//   const [opened, setOpened] = useState(false);
//   const [cardPhase, setCardPhase] = useState('idle'); // idle | opening | done

//   // refs for anime targets
//   const cardRef = useRef(null);
//   const leftPageRef = useRef(null);
//   const rightPageRef = useRef(null);
//   const sealRef = useRef(null);
//   const heroRef = useRef(null);
//   const namesRef = useRef(null);
//   const particleContainerRef = useRef(null);
//   const groomRef = useRef(null);
//   const brideRef = useRef(null);
//   const ampRef = useRef(null);

//   // ── Hero entrance animation ──────────────────────────────
//   useEffect(() => {
//     if (!anime || !heroRef.current) return;
//     anime({
//       targets: heroRef.current,
//       opacity: [0, 1],
//       translateY: [30, 0],
//       duration: 1200,
//       easing: 'easeOutExpo',
//     });
//   }, [anime]);

//   // ── Seal pulse loop ──────────────────────────────────────
//   useEffect(() => {
//     if (!anime || !sealRef.current) return;
//     anime({
//       targets: sealRef.current.querySelector('.seal-glow'),
//       scale: [1, 1.18, 1],
//       opacity: [0.5, 1, 0.5],
//       duration: 2200,
//       easing: 'easeInOutSine',
//       loop: true,
//     });
//   }, [anime]);

//   // ── Spawn burst particles ────────────────────────────────
//   const spawnParticles = useCallback(() => {
//     if (!anime || !particleContainerRef.current) return;
//     const container = particleContainerRef.current;
//     const colors = [
//       '#d4af70',
//       '#f5de8a',
//       '#e8a0b8',
//       '#d4607a',
//       '#fff4cc',
//       '#c8f0c8',
//     ];
//     Array.from({ length: 36 }).forEach((_, i) => {
//       const el = document.createElement('div');
//       const isCircle = i % 3 === 0;
//       el.style.cssText = `position:absolute;top:50%;left:50%;width:${isCircle ? 10 : 7}px;height:${isCircle ? 10 : 7}px;border-radius:${isCircle ? '50%' : '0'};background:${colors[i % colors.length]};transform:translate(-50%,-50%) rotate(45deg);pointer-events:none;`;
//       container.appendChild(el);
//       const angle = (i / 36) * 360,
//         dist = 80 + Math.random() * 160;
//       const tx = Math.cos((angle * Math.PI) / 180) * dist;
//       const ty = Math.sin((angle * Math.PI) / 180) * dist;
//       anime({
//         targets: el,
//         translateX: [0, tx],
//         translateY: [0, ty],
//         rotate: [0, 360 + Math.random() * 360],
//         scale: [1, 0],
//         opacity: [1, 0],
//         duration: 900 + Math.random() * 400,
//         easing: 'easeOutCubic',
//         delay: i * 18,
//         complete: () => el.remove(),
//       });
//     });
//   }, [anime]);

//   // ── Open card ────────────────────────────────────────────
//   const handleOpenCard = useCallback(() => {
//     if (!anime || cardPhase !== 'idle') return;
//     setCardPhase('opening');

//     // 1. Seal shake + scale out
//     anime({
//       targets: sealRef.current,
//       rotate: [0, -12, 10, -6, 4, 0],
//       duration: 400,
//       easing: 'easeInOutSine',
//     });
//     setTimeout(() => {
//       anime({
//         targets: sealRef.current,
//         scale: [1, 1.3, 0],
//         opacity: [1, 0],
//         duration: 450,
//         easing: 'easeInBack',
//       });
//       spawnParticles();
//     }, 380);

//     // 2. Left page flips open (book-open)
//     setTimeout(() => {
//       anime({
//         targets: leftPageRef.current,
//         rotateY: [0, -185],
//         duration: 1000,
//         easing: 'cubicBezier(0.45, 0, 0.2, 1)',
//       });
//       // right page slight depth
//       anime({
//         targets: rightPageRef.current,
//         rotateY: [0, 8, 0],
//         duration: 1000,
//         easing: 'easeInOutCubic',
//       });
//       // whole card lifts
//       anime({
//         targets: cardRef.current,
//         scale: [1, 1.03, 1],
//         duration: 1100,
//         easing: 'easeInOutQuad',
//       });
//     }, 600);

//     // 3. Fade card away, reveal names
//     setTimeout(() => {
//       anime({
//         targets: cardRef.current,
//         opacity: [1, 0],
//         scale: [1.03, 0.92],
//         translateY: [0, -60],
//         duration: 700,
//         easing: 'easeInCubic',
//         complete: () => {
//           setCardPhase('done');
//           setOpened(true);
//           setTimeout(
//             () =>
//               namesRef.current?.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start',
//               }),
//             100,
//           );
//         },
//       });
//     }, 1500);
//   }, [anime, cardPhase, spawnParticles]);

//   // ── Names reveal with anime ──────────────────────────────
//   useEffect(() => {
//     if (!opened || !anime) return;
//     setTimeout(() => {
//       if (groomRef.current) {
//         anime({
//           targets: groomRef.current,
//           clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
//           opacity: [0, 1],
//           duration: 1400,
//           easing: 'easeOutExpo',
//           delay: 200,
//         });
//       }
//       if (ampRef.current) {
//         anime({
//           targets: ampRef.current,
//           opacity: [0, 1],
//           scale: [0.6, 1],
//           duration: 900,
//           easing: 'easeOutBack',
//           delay: 900,
//         });
//       }
//       if (brideRef.current) {
//         anime({
//           targets: brideRef.current,
//           clipPath: ['inset(0 0% 0 100%)', 'inset(0 0% 0 0%)'],
//           opacity: [0, 1],
//           duration: 1400,
//           easing: 'easeOutExpo',
//           delay: 1200,
//         });
//       }
//     }, 300);
//   }, [opened, anime]);

//   return (
//     <div
//       style={{
//         minHeight: '100dvh',
//         background:
//           'linear-gradient(160deg,#1a0c12 0%,#2c1420 40%,#1e0e18 75%,#100810 100%)',
//         fontFamily: "'Cormorant Garamond',serif",
//         overflowX: 'hidden',
//       }}
//     >
//       {/* ── GLOBAL STYLES ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Great+Vibes&family=Jost:wght@200;300;400;500&display=swap');
//         *,*::before,*::after{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
//         html,body{margin:0;padding:0;-webkit-font-smoothing:antialiased}
//         @keyframes petalRise{0%{transform:translateY(110dvh) rotate(0deg) translateX(0);opacity:0}8%{opacity:.45}50%{transform:translateY(50dvh) rotate(180deg) translateX(28px)}92%{opacity:.3}100%{transform:translateY(-10dvh) rotate(360deg) translateX(-22px);opacity:0}}
//         @keyframes goldShine{0%{background-position:-300% center}100%{background-position:300% center}}
//         @keyframes tapPulse{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.04)}}
//         @keyframes cardFloat{0%,100%{transform:translateY(0) rotate(-.4deg)}50%{transform:translateY(-12px) rotate(.4deg)}}
//         @keyframes countdownFlash{0%{color:#f5de8a;text-shadow:0 0 20px rgba(212,175,112,.8)}100%{color:inherit;text-shadow:none}}
//         @keyframes shimmer{0%,100%{opacity:.5}50%{opacity:1}}
//         @keyframes bgPulse{0%,100%{opacity:.15}50%{opacity:.28}}
//         .gold-text{background:linear-gradient(90deg,#c8a44a 0%,#f5de8a 30%,#e8c060 50%,#f5de8a 70%,#c8a44a 100%);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:goldShine 5s linear infinite}
//         .shimmer{animation:shimmer 3s ease-in-out infinite}
//         .card-float{animation:cardFloat 5s ease-in-out infinite}
//         ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#d4af70;border-radius:2px}
//         @media(max-width:400px){html{font-size:14px}}
//       `}</style>

//       <Petals />

//       {/* Particle burst container */}
//       <div
//         ref={particleContainerRef}
//         style={{
//           position: 'fixed',
//           top: '50%',
//           left: '50%',
//           pointerEvents: 'none',
//           zIndex: 999,
//         }}
//       />

//       {/* ══════════════════════════════════════════════════════
//           HERO — FULL SCREEN
//       ══════════════════════════════════════════════════════ */}
//       {!opened && (
//         <section
//           style={{
//             position: 'relative',
//             zIndex: 10,
//             width: '100vw',
//             height: '100dvh',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: '24px 20px',
//             overflow: 'hidden',
//           }}
//         >
//           {/* ambient radial glow */}
//           <div
//             style={{
//               position: 'absolute',
//               width: 'min(700px,150vw)',
//               height: 'min(700px,150vh)',
//               borderRadius: '50%',
//               background:
//                 'radial-gradient(circle,rgba(150,40,75,.22) 0%,transparent 65%)',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%,-50%)',
//               pointerEvents: 'none',
//               animation: 'bgPulse 4s ease-in-out infinite',
//             }}
//           />

//           <div
//             ref={heroRef}
//             style={{
//               opacity: 0,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               width: '100%',
//               maxWidth: 440,
//             }}
//           >
//             {/* top label */}
//             <p
//               className='shimmer'
//               style={{
//                 fontFamily: "'Jost',sans-serif",
//                 fontSize: 'clamp(9px,2.4vw,11px)',
//                 letterSpacing: '.5em',
//                 textTransform: 'uppercase',
//                 color: '#d4af70',
//                 marginBottom: 28,
//                 textAlign: 'center',
//               }}
//             >
//               A Wedding Invitation
//             </p>

//             {/* ── THE CARD ── */}
//             {cardPhase !== 'done' && (
//               <div
//                 ref={cardRef}
//                 className={cardPhase === 'idle' ? 'card-float' : ''}
//                 onClick={handleOpenCard}
//                 style={{
//                   width: '100%',
//                   cursor: cardPhase === 'idle' ? 'pointer' : 'default',
//                   perspective: 1000,
//                   perspectiveOrigin: '50% 50%',
//                   transformStyle: 'preserve-3d',
//                   userSelect: 'none',
//                   WebkitUserSelect: 'none',
//                 }}
//               >
//                 {/* card aspect ratio box */}
//                 <div
//                   style={{
//                     position: 'relative',
//                     paddingBottom: '128%',
//                     transformStyle: 'preserve-3d',
//                   }}
//                 >
//                   {/* ── BACK / BASE LAYER ── */}
//                   <div
//                     style={{
//                       position: 'absolute',
//                       inset: 0,
//                       borderRadius: 'clamp(14px,4vw,22px)',
//                       background:
//                         'linear-gradient(145deg,#521826 0%,#3e1020 55%,#2e0c18 100%)',
//                       boxShadow:
//                         '0 60px 120px rgba(0,0,0,.75), 0 0 0 1px rgba(212,175,112,.2)',
//                       overflow: 'hidden',
//                     }}
//                   >
//                     <svg
//                       style={{
//                         position: 'absolute',
//                         inset: 0,
//                         width: '100%',
//                         height: '100%',
//                         opacity: 0.1,
//                       }}
//                       viewBox='0 0 400 512'
//                       preserveAspectRatio='none'
//                     >
//                       <line
//                         x1='0'
//                         y1='0'
//                         x2='200'
//                         y2='210'
//                         stroke='#d4af70'
//                         strokeWidth='.8'
//                       />
//                       <line
//                         x1='400'
//                         y1='0'
//                         x2='200'
//                         y2='210'
//                         stroke='#d4af70'
//                         strokeWidth='.8'
//                       />
//                       <line
//                         x1='0'
//                         y1='512'
//                         x2='200'
//                         y2='210'
//                         stroke='#d4af70'
//                         strokeWidth='.8'
//                       />
//                       <line
//                         x1='400'
//                         y1='512'
//                         x2='200'
//                         y2='210'
//                         stroke='#d4af70'
//                         strokeWidth='.8'
//                       />
//                     </svg>
//                     <div
//                       style={{
//                         position: 'absolute',
//                         inset: 10,
//                         borderRadius: 14,
//                         border: '1px solid rgba(212,175,112,.22)',
//                       }}
//                     />
//                     <div
//                       style={{
//                         position: 'absolute',
//                         inset: 18,
//                         borderRadius: 10,
//                         border: '1px solid rgba(212,175,112,.08)',
//                       }}
//                     />
//                     {/* corner roses */}
//                     <div style={{ position: 'absolute', top: 8, left: 8 }}>
//                       <RoseIcon s={42} op={0.28} />
//                     </div>
//                     <div
//                       style={{
//                         position: 'absolute',
//                         top: 8,
//                         right: 8,
//                         transform: 'scaleX(-1)',
//                       }}
//                     >
//                       <RoseIcon s={42} op={0.28} />
//                     </div>
//                     <div
//                       style={{
//                         position: 'absolute',
//                         bottom: 8,
//                         left: 8,
//                         transform: 'scaleY(-1)',
//                       }}
//                     >
//                       <RoseIcon s={42} op={0.28} />
//                     </div>
//                     <div
//                       style={{
//                         position: 'absolute',
//                         bottom: 8,
//                         right: 8,
//                         transform: 'scale(-1)',
//                       }}
//                     >
//                       <RoseIcon s={42} op={0.28} />
//                     </div>
//                     {/* diamond bottom strip */}
//                     <div
//                       style={{
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         height: 44,
//                         borderTop: '1px solid rgba(212,175,112,.12)',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         gap: 10,
//                       }}
//                     >
//                       {Array.from({ length: 7 }).map((_, i) => (
//                         <Diamond key={i} size={6} opacity={0.28} />
//                       ))}
//                     </div>
//                     {/* center label */}
//                     <div
//                       style={{
//                         position: 'absolute',
//                         inset: 0,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         gap: 10,
//                         padding: '0 24px',
//                       }}
//                     >
//                       <p
//                         style={{
//                           fontFamily: "'Cormorant Garamond',serif",
//                           fontSize: 'clamp(12px,3.5vw,14px)',
//                           fontStyle: 'italic',
//                           color: 'rgba(255,210,190,.38)',
//                           letterSpacing: 2,
//                           textAlign: 'center',
//                           margin: 0,
//                         }}
//                       >
//                         Together with their families
//                       </p>
//                       <WaxSeal sealRef={sealRef} />
//                       <p
//                         style={{
//                           fontFamily: "'Cormorant Garamond',serif",
//                           fontSize: 'clamp(12px,3.5vw,14px)',
//                           fontStyle: 'italic',
//                           color: 'rgba(255,200,175,.35)',
//                           textAlign: 'center',
//                           lineHeight: 1.9,
//                           margin: 0,
//                         }}
//                       >
//                         Esta invitación es
//                         <br />
//                         exclusiva para ti
//                       </p>
//                     </div>
//                   </div>

//                   {/* ── LEFT PAGE (flips open) ── */}
//                   <div
//                     ref={leftPageRef}
//                     style={{
//                       position: 'absolute',
//                       inset: 0,
//                       borderRadius: 'clamp(14px,4vw,22px)',
//                       transformOrigin: '100% 50%',
//                       transform: 'rotateY(0deg)',
//                       transformStyle: 'preserve-3d',
//                       backfaceVisibility: 'hidden',
//                       zIndex: 2,
//                       overflow: 'hidden',
//                       background:
//                         'linear-gradient(145deg,#6a2234 0%,#521828 60%,#3e1020 100%)',
//                       boxShadow: '4px 0 30px rgba(0,0,0,.55)',
//                     }}
//                   >
//                     <svg
//                       style={{
//                         position: 'absolute',
//                         inset: 0,
//                         width: '100%',
//                         height: '100%',
//                         opacity: 0.08,
//                       }}
//                       viewBox='0 0 400 512'
//                       preserveAspectRatio='none'
//                     >
//                       <line
//                         x1='0'
//                         y1='0'
//                         x2='200'
//                         y2='210'
//                         stroke='#d4af70'
//                         strokeWidth='.8'
//                       />
//                       <line
//                         x1='400'
//                         y1='0'
//                         x2='200'
//                         y2='210'
//                         stroke='#d4af70'
//                         strokeWidth='.8'
//                       />
//                       <line
//                         x1='0'
//                         y1='512'
//                         x2='200'
//                         y2='210'
//                         stroke='#d4af70'
//                         strokeWidth='.8'
//                       />
//                       <line
//                         x1='400'
//                         y1='512'
//                         x2='200'
//                         y2='210'
//                         stroke='#d4af70'
//                         strokeWidth='.8'
//                       />
//                     </svg>
//                     <div
//                       style={{
//                         position: 'absolute',
//                         inset: 10,
//                         borderRadius: 14,
//                         border: '1px solid rgba(212,175,112,.2)',
//                       }}
//                     />
//                     <div style={{ position: 'absolute', top: 8, left: 8 }}>
//                       <RoseIcon s={42} op={0.26} />
//                     </div>
//                     <div
//                       style={{
//                         position: 'absolute',
//                         top: 8,
//                         right: 8,
//                         transform: 'scaleX(-1)',
//                       }}
//                     >
//                       <RoseIcon s={42} op={0.26} />
//                     </div>
//                     <div
//                       style={{
//                         position: 'absolute',
//                         bottom: 8,
//                         left: 8,
//                         transform: 'scaleY(-1)',
//                       }}
//                     >
//                       <RoseIcon s={42} op={0.26} />
//                     </div>
//                     <div
//                       style={{
//                         position: 'absolute',
//                         bottom: 8,
//                         right: 8,
//                         transform: 'scale(-1)',
//                       }}
//                     >
//                       <RoseIcon s={42} op={0.26} />
//                     </div>
//                     {/* spine edge glow */}
//                     <div
//                       style={{
//                         position: 'absolute',
//                         top: 0,
//                         right: 0,
//                         width: 3,
//                         bottom: 0,
//                         background:
//                           'linear-gradient(to left,rgba(212,175,112,.35),transparent)',
//                       }}
//                     />
//                     <div
//                       style={{
//                         position: 'absolute',
//                         inset: 0,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         gap: 12,
//                         padding: '0 24px',
//                       }}
//                     >
//                       <p
//                         style={{
//                           fontFamily: "'Cormorant Garamond',serif",
//                           fontSize: 'clamp(12px,3.5vw,14px)',
//                           fontStyle: 'italic',
//                           color: 'rgba(255,210,190,.36)',
//                           textAlign: 'center',
//                           margin: 0,
//                           letterSpacing: 2,
//                         }}
//                       >
//                         Together with their families
//                       </p>
//                       <div
//                         style={{
//                           position: 'relative',
//                           width: 100,
//                           height: 100,
//                           flexShrink: 0,
//                         }}
//                       >
//                         <svg viewBox='0 0 120 120' width='100' height='100'>
//                           <circle cx='60' cy='60' r='52' fill='#d4a882' />
//                           <circle cx='60' cy='60' r='44' fill='#c49a7a' />
//                           <circle cx='60' cy='60' r='32' fill='#dbb898' />
//                         </svg>
//                         <div
//                           style={{
//                             position: 'absolute',
//                             inset: 0,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                           }}
//                         >
//                           <span
//                             style={{
//                               fontFamily: "'Great Vibes',cursive",
//                               fontSize: 14,
//                               color: '#6a4c2a',
//                               lineHeight: 1,
//                             }}
//                           >
//                             A
//                           </span>
//                           <span
//                             style={{
//                               fontFamily: "'Cormorant Garamond',serif",
//                               fontSize: 8,
//                               color: '#6a4c2a',
//                               letterSpacing: 2,
//                             }}
//                           >
//                             &amp;
//                           </span>
//                           <span
//                             style={{
//                               fontFamily: "'Great Vibes',cursive",
//                               fontSize: 14,
//                               color: '#6a4c2a',
//                               lineHeight: 1,
//                             }}
//                           >
//                             S
//                           </span>
//                         </div>
//                       </div>
//                       <p
//                         style={{
//                           fontFamily: "'Cormorant Garamond',serif",
//                           fontSize: 'clamp(12px,3.5vw,14px)',
//                           fontStyle: 'italic',
//                           color: 'rgba(255,200,175,.33)',
//                           textAlign: 'center',
//                           lineHeight: 1.9,
//                           margin: 0,
//                         }}
//                       >
//                         Esta invitación es
//                         <br />
//                         exclusiva para ti
//                       </p>
//                     </div>
//                     <div
//                       style={{
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         height: 44,
//                         borderTop: '1px solid rgba(212,175,112,.1)',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         gap: 10,
//                       }}
//                     >
//                       {Array.from({ length: 7 }).map((_, i) => (
//                         <Diamond key={i} size={6} opacity={0.24} />
//                       ))}
//                     </div>
//                   </div>

//                   {/* ── RIGHT HALF (stays, shows inner content peeking) ── */}
//                   <div
//                     ref={rightPageRef}
//                     style={{
//                       position: 'absolute',
//                       inset: 0,
//                       zIndex: 1,
//                       pointerEvents: 'none',
//                     }}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* tap hint */}
//             {cardPhase === 'idle' && (
//               <p
//                 style={{
//                   fontFamily: "'Jost',sans-serif",
//                   fontSize: 'clamp(9px,2.4vw,11px)',
//                   letterSpacing: '.38em',
//                   textTransform: 'uppercase',
//                   color: 'rgba(212,175,112,.38)',
//                   marginTop: 22,
//                   animation: 'tapPulse 2s ease-in-out infinite',
//                   textAlign: 'center',
//                 }}
//               >
//                 ✦ Tap to Open ✦
//               </p>
//             )}
//           </div>
//         </section>
//       )}

//       {/* ══════════════════════════════════════════════════════
//           OPENED — full content
//       ══════════════════════════════════════════════════════ */}
//       {opened && (
//         <>
//           {/* ── NAMES (full-screen panel) ── */}
//           <section
//             ref={namesRef}
//             style={{
//               position: 'relative',
//               zIndex: 10,
//               width: '100vw',
//               minHeight: '140dvh',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               padding: 'clamp(80px,14vw,140px) 24px clamp(80px,14vw,120px)',
//               textAlign: 'center',
//               overflow: 'hidden',
//               background:
//                 'linear-gradient(180deg, rgba(80,10,30,0.18) 0%, transparent 40%, rgba(80,10,30,0.18) 100%)',
//             }}
//           >
//             {/* top border accent line */}
//             <div
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 height: 2,
//                 background:
//                   'linear-gradient(to right,transparent,rgba(212,175,112,.35),rgba(212,175,112,.6),rgba(212,175,112,.35),transparent)',
//               }}
//             />
//             {/* bottom border accent line */}
//             <div
//               style={{
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 height: 2,
//                 background:
//                   'linear-gradient(to right,transparent,rgba(212,175,112,.35),rgba(212,175,112,.6),rgba(212,175,112,.35),transparent)',
//               }}
//             />

//             {/* giant bg rose */}
//             <div
//               style={{
//                 position: 'absolute',
//                 inset: 0,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 opacity: 0.05,
//                 pointerEvents: 'none',
//               }}
//             >
//               <RoseIcon s={Math.min(620, window.innerWidth * 1.3)} op={1} />
//             </div>
//             {/* twin glows */}
//             <div
//               style={{
//                 position: 'absolute',
//                 width: 'min(500px,120vw)',
//                 height: 'min(500px,120vw)',
//                 borderRadius: '50%',
//                 background:
//                   'radial-gradient(circle,rgba(160,40,80,.25) 0%,transparent 70%)',
//                 top: '30%',
//                 left: '50%',
//                 transform: 'translate(-50%,-50%)',
//                 pointerEvents: 'none',
//               }}
//             />
//             <div
//               style={{
//                 position: 'absolute',
//                 width: 'min(400px,100vw)',
//                 height: 'min(400px,100vw)',
//                 borderRadius: '50%',
//                 background:
//                   'radial-gradient(circle,rgba(100,20,60,.2) 0%,transparent 70%)',
//                 bottom: '20%',
//                 left: '50%',
//                 transform: 'translate(-50%,0)',
//                 pointerEvents: 'none',
//               }}
//             />

//             <Reveal dir='scale'>
//               <p
//                 style={{
//                   fontFamily: "'Jost',sans-serif",
//                   fontSize: 'clamp(9px,2.4vw,11px)',
//                   letterSpacing: '.55em',
//                   textTransform: 'uppercase',
//                   color: 'rgba(212,175,112,.65)',
//                   marginBottom: 32,
//                   padding: '8px 20px',
//                   border: '1px solid rgba(212,175,112,.2)',
//                   borderRadius: 50,
//                   background: 'rgba(212,175,112,.05)',
//                 }}
//               >
//                 ✦ &nbsp; You Are Invited &nbsp; ✦
//               </p>
//             </Reveal>

//             {/* GROOM — textTransform uppercase forces capital A */}
//             <div
//               ref={groomRef}
//               style={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
//             >
//               <h1
//                 style={{
//                   fontFamily: "'Great Vibes',cursive",
//                   fontSize: 'clamp(72px,22vw,130px)',
//                   color: '#f8dde8',
//                   textShadow:
//                     '0 0 100px rgba(210,80,120,.65),0 0 40px rgba(210,80,120,.3),0 6px 32px rgba(0,0,0,.65)',
//                   lineHeight: 1.05,
//                   margin: 0,
//                   textTransform: 'capitalize',
//                   letterSpacing: 2,
//                 }}
//               >
//                 Ashiq Rahman
//               </h1>
//               <p
//                 style={{
//                   fontFamily: "'Jost',sans-serif",
//                   fontSize: 'clamp(9px,2.4vw,11px)',
//                   letterSpacing: '.45em',
//                   textTransform: 'uppercase',
//                   color: 'rgba(212,175,112,.5)',
//                   marginTop: 10,
//                   marginBottom: 0,
//                 }}
//               >
//                 Groom
//               </p>
//             </div>

//             {/* ampersand */}
//             <div
//               ref={ampRef}
//               style={{ opacity: 0, margin: 'clamp(20px,5vw,36px) 0' }}
//             >
//               <GoldLine w={Math.min(80, window.innerWidth * 0.14)} />
//               <p
//                 style={{
//                   fontFamily: "'Cormorant Garamond',serif",
//                   fontSize: 'clamp(22px,6vw,36px)',
//                   fontStyle: 'italic',
//                   color: 'rgba(212,175,112,.7)',
//                   margin: '10px 0',
//                   letterSpacing: 6,
//                 }}
//               >
//                 and
//               </p>
//               <GoldLine w={Math.min(80, window.innerWidth * 0.14)} />
//             </div>

//             {/* BRIDE */}
//             <div
//               ref={brideRef}
//               style={{ opacity: 0, clipPath: 'inset(0 0% 0 100%)' }}
//             >
//               <h1
//                 style={{
//                   fontFamily: "'Great Vibes',cursive",
//                   fontSize: 'clamp(72px,22vw,130px)',
//                   color: '#f8dde8',
//                   textShadow:
//                     '0 0 100px rgba(210,80,120,.65),0 0 40px rgba(210,80,120,.3),0 6px 32px rgba(0,0,0,.65)',
//                   lineHeight: 1.05,
//                   margin: 0,
//                   letterSpacing: 2,
//                 }}
//               >
//                 Shamida
//               </h1>
//               <p
//                 style={{
//                   fontFamily: "'Jost',sans-serif",
//                   fontSize: 'clamp(9px,2.4vw,11px)',
//                   letterSpacing: '.45em',
//                   textTransform: 'uppercase',
//                   color: 'rgba(212,175,112,.5)',
//                   marginTop: 10,
//                   marginBottom: 0,
//                 }}
//               >
//                 Bride
//               </p>
//             </div>

//             <Reveal delay={1.6}>
//               <p
//                 style={{
//                   fontFamily: "'Jost',sans-serif",
//                   fontSize: 'clamp(10px,2.8vw,13px)',
//                   letterSpacing: '.38em',
//                   textTransform: 'uppercase',
//                   color: 'rgba(212,175,112,.45)',
//                   marginTop: 36,
//                   padding: '12px 28px',
//                   borderTop: '1px solid rgba(212,175,112,.18)',
//                   borderBottom: '1px solid rgba(212,175,112,.18)',
//                 }}
//               >
//                 Are Getting Married · April 5, 2026
//               </p>
//             </Reveal>

//             {/* Scroll cue */}
//             <Reveal delay={2}>
//               <div
//                 style={{
//                   marginTop: 50,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   gap: 8,
//                   opacity: 0.45,
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 1,
//                     height: 50,
//                     background:
//                       'linear-gradient(to bottom,transparent,#d4af70)',
//                   }}
//                 />
//                 <p
//                   style={{
//                     fontFamily: "'Jost',sans-serif",
//                     fontSize: 9,
//                     letterSpacing: '.42em',
//                     textTransform: 'uppercase',
//                     color: '#d4af70',
//                     margin: 0,
//                   }}
//                 >
//                   scroll
//                 </p>
//               </div>
//             </Reveal>
//           </section>

//           {/* ══ SECTION LABEL HELPER ══ */}
//           {/* ── DATE CARD ── */}
//           <section
//             style={{
//               position: 'relative',
//               zIndex: 10,
//               padding: 'clamp(64px,14vw,100px) 20px',
//               background:
//                 'linear-gradient(180deg,rgba(20,5,14,0.7) 0%,rgba(55,14,30,0.45) 50%,rgba(20,5,14,0.7) 100%)',
//               borderTop: '1px solid rgba(212,175,112,.14)',
//               borderBottom: '1px solid rgba(212,175,112,.14)',
//             }}
//           >
//             <Reveal>
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: 14,
//                   marginBottom: 42,
//                 }}
//               >
//                 <div
//                   style={{
//                     height: 1,
//                     flex: 1,
//                     maxWidth: 70,
//                     background:
//                       'linear-gradient(to right,transparent,rgba(212,175,112,.45))',
//                   }}
//                 />
//                 <span
//                   style={{
//                     fontFamily: "'Jost',sans-serif",
//                     fontSize: 'clamp(9px,2.5vw,11px)',
//                     letterSpacing: '.5em',
//                     textTransform: 'uppercase',
//                     color: 'rgba(212,175,112,.75)',
//                     padding: '7px 18px',
//                     border: '1px solid rgba(212,175,112,.3)',
//                     borderRadius: 50,
//                     background: 'rgba(212,175,112,.06)',
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   📅 &nbsp; Date &amp; Venue
//                 </span>
//                 <div
//                   style={{
//                     height: 1,
//                     flex: 1,
//                     maxWidth: 70,
//                     background:
//                       'linear-gradient(to left,transparent,rgba(212,175,112,.45))',
//                   }}
//                 />
//               </div>
//             </Reveal>
//             <Reveal dir='scale'>
//               <div
//                 style={{
//                   maxWidth: 440,
//                   margin: '0 auto',
//                   borderRadius: 'clamp(18px,5vw,26px)',
//                   padding: 'clamp(32px,9vw,56px) clamp(24px,7vw,48px)',
//                   textAlign: 'center',
//                   background:
//                     'linear-gradient(145deg,rgba(100,24,42,.55),rgba(55,12,24,.75))',
//                   border: '1px solid rgba(212,175,112,.28)',
//                   backdropFilter: 'blur(28px)',
//                   boxShadow:
//                     '0 0 60px rgba(160,40,80,.15),0 60px 120px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.05)',
//                   position: 'relative',
//                   overflow: 'hidden',
//                 }}
//               >
//                 <div
//                   style={{
//                     position: 'absolute',
//                     inset: 0,
//                     background:
//                       'radial-gradient(ellipse at 50% 0%,rgba(200,70,100,.16) 0%,transparent 60%)',
//                     pointerEvents: 'none',
//                   }}
//                 />
//                 {[
//                   ['top', 'left'],
//                   ['top', 'right'],
//                   ['bottom', 'left'],
//                   ['bottom', 'right'],
//                 ].map(([v, h]) => (
//                   <svg
//                     key={`${v}${h}`}
//                     viewBox='0 0 28 28'
//                     width='28'
//                     height='28'
//                     style={{
//                       position: 'absolute',
//                       [v]: 12,
//                       [h]: 12,
//                       opacity: 0.4,
//                     }}
//                   >
//                     <path
//                       d={v === 'top' ? 'M0 20 L0 0 L20 0' : 'M0 8 L0 28 L20 28'}
//                       stroke='#d4af70'
//                       strokeWidth='1.5'
//                       fill='none'
//                       transform={
//                         h === 'right' ? 'scale(-1,1) translate(-28,0)' : ''
//                       }
//                     />
//                     <circle
//                       cx={h === 'left' ? 0 : 20}
//                       cy={v === 'top' ? 0 : 28}
//                       r='2.5'
//                       fill='#d4af70'
//                       transform={
//                         h === 'right' ? 'scale(-1,1) translate(-28,0)' : ''
//                       }
//                     />
//                   </svg>
//                 ))}
//                 <p
//                   style={{
//                     fontFamily: "'Jost',sans-serif",
//                     fontSize: 'clamp(9px,2.4vw,10px)',
//                     letterSpacing: '.45em',
//                     textTransform: 'uppercase',
//                     color: 'rgba(212,175,112,.55)',
//                     marginBottom: 26,
//                     marginTop: 0,
//                   }}
//                 >
//                   Save the Date
//                 </p>
//                 <div
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'flex-end',
//                     gap: 'clamp(16px,5vw,28px)',
//                     marginBottom: 24,
//                   }}
//                 >
//                   <div>
//                     <div
//                       className='gold-text'
//                       style={{
//                         fontFamily: "'Cormorant Garamond',serif",
//                         fontSize: 'clamp(60px,17vw,82px)',
//                         fontWeight: 300,
//                         lineHeight: 1,
//                       }}
//                     >
//                       05
//                     </div>
//                     <div
//                       style={{
//                         fontFamily: "'Jost',sans-serif",
//                         fontSize: 9,
//                         letterSpacing: '.3em',
//                         color: 'rgba(212,175,112,.38)',
//                         textTransform: 'uppercase',
//                       }}
//                     >
//                       Day
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       width: 1,
//                       height: 66,
//                       background: 'rgba(212,175,112,.2)',
//                       marginBottom: 16,
//                     }}
//                   />
//                   <div>
//                     <div
//                       className='gold-text'
//                       style={{
//                         fontFamily: "'Cormorant Garamond',serif",
//                         fontSize: 'clamp(26px,8vw,36px)',
//                         fontWeight: 300,
//                         lineHeight: 1,
//                       }}
//                     >
//                       April
//                     </div>
//                     <div
//                       style={{
//                         fontFamily: "'Cormorant Garamond',serif",
//                         fontSize: 'clamp(38px,12vw,54px)',
//                         fontWeight: 300,
//                         color: '#f0d080',
//                         lineHeight: 1.1,
//                       }}
//                     >
//                       2026
//                     </div>
//                   </div>
//                 </div>
//                 <div style={{ marginBottom: 22 }}>
//                   <GoldLine w={44} />
//                 </div>
//                 <p
//                   style={{
//                     fontFamily: "'Cormorant Garamond',serif",
//                     fontSize: 'clamp(17px,5.5vw,21px)',
//                     color: 'rgba(255,215,205,.75)',
//                     marginBottom: 6,
//                     marginTop: 0,
//                   }}
//                 >
//                   The Grand Ballroom at Villa
//                 </p>
//                 <p
//                   style={{
//                     fontFamily: "'Jost',sans-serif",
//                     fontSize: 'clamp(9px,2.5vw,11px)',
//                     letterSpacing: '.22em',
//                     color: 'rgba(212,175,112,.4)',
//                     textTransform: 'uppercase',
//                     margin: 0,
//                   }}
//                 >
//                   Ceremony · 4:00 PM · Reception to follow
//                 </p>
//                 <div style={{ margin: '22px 0' }}>
//                   <GoldLine w={44} />
//                 </div>
//                 <div
//                   style={{ display: 'flex', justifyContent: 'space-around' }}
//                 >
//                   {[
//                     ['Dress Code', 'Black Tie'],
//                     ['RSVP By', 'Mar 20, 2026'],
//                   ].map(([l, v]) => (
//                     <div key={l}>
//                       <p
//                         style={{
//                           fontFamily: "'Jost',sans-serif",
//                           fontSize: 9,
//                           letterSpacing: '.3em',
//                           color: 'rgba(212,175,112,.4)',
//                           textTransform: 'uppercase',
//                           marginBottom: 6,
//                           marginTop: 0,
//                         }}
//                       >
//                         {l}
//                       </p>
//                       <p
//                         style={{
//                           fontFamily: "'Cormorant Garamond',serif",
//                           fontSize: 'clamp(15px,5vw,18px)',
//                           color: 'rgba(255,215,200,.7)',
//                           margin: 0,
//                         }}
//                       >
//                         {v}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Reveal>
//           </section>

//           {/* ── COUNTDOWN ── */}
//           <section
//             style={{
//               position: 'relative',
//               zIndex: 10,
//               padding: 'clamp(70px,15vw,110px) 20px',
//               background:
//                 'linear-gradient(180deg,rgba(60,10,30,0.5) 0%,rgba(80,18,42,0.35) 50%,rgba(60,10,30,0.5) 100%)',
//               borderBottom: '1px solid rgba(212,175,112,.14)',
//             }}
//           >
//             {/* ambient glow */}
//             <div
//               style={{
//                 position: 'absolute',
//                 inset: 0,
//                 background:
//                   'radial-gradient(ellipse at 50% 50%,rgba(180,50,90,.12) 0%,transparent 65%)',
//                 pointerEvents: 'none',
//               }}
//             />
//             <Reveal>
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: 14,
//                   marginBottom: 36,
//                 }}
//               >
//                 <div
//                   style={{
//                     height: 1,
//                     flex: 1,
//                     maxWidth: 70,
//                     background:
//                       'linear-gradient(to right,transparent,rgba(212,175,112,.45))',
//                   }}
//                 />
//                 <span
//                   style={{
//                     fontFamily: "'Jost',sans-serif",
//                     fontSize: 'clamp(9px,2.5vw,11px)',
//                     letterSpacing: '.5em',
//                     textTransform: 'uppercase',
//                     color: 'rgba(212,175,112,.75)',
//                     padding: '7px 18px',
//                     border: '1px solid rgba(212,175,112,.3)',
//                     borderRadius: 50,
//                     background: 'rgba(212,175,112,.06)',
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   ⏳ &nbsp; Counting Down
//                 </span>
//                 <div
//                   style={{
//                     height: 1,
//                     flex: 1,
//                     maxWidth: 70,
//                     background:
//                       'linear-gradient(to left,transparent,rgba(212,175,112,.45))',
//                   }}
//                 />
//               </div>
//               <p
//                 style={{
//                   textAlign: 'center',
//                   fontFamily: "'Great Vibes',cursive",
//                   fontSize: 'clamp(30px,10vw,48px)',
//                   color: 'rgba(255,215,205,.5)',
//                   marginBottom: 40,
//                   marginTop: 0,
//                 }}
//               >
//                 Until we say "I do"
//               </p>
//             </Reveal>
//             <Reveal delay={0.15}>
//               <Countdown targetDate='2026-04-05T16:00:00' />
//             </Reveal>
//             <Reveal delay={0.4}>
//               <p
//                 style={{
//                   textAlign: 'center',
//                   fontFamily: "'Cormorant Garamond',serif",
//                   fontSize: 'clamp(14px,4vw,17px)',
//                   fontStyle: 'italic',
//                   color: 'rgba(255,200,180,.35)',
//                   marginTop: 36,
//                   marginBottom: 0,
//                 }}
//               >
//                 April 5, 2026 · 4:00 PM
//               </p>
//             </Reveal>
//           </section>

//           {/* ── QUOTE ── */}
//           <section
//             style={{
//               position: 'relative',
//               zIndex: 10,
//               padding: 'clamp(60px,14vw,90px) 28px',
//               textAlign: 'center',
//               background:
//                 'linear-gradient(180deg,rgba(20,5,14,0.6) 0%,rgba(40,10,24,0.4) 50%,rgba(20,5,14,0.6) 100%)',
//               borderBottom: '1px solid rgba(212,175,112,.1)',
//             }}
//           >
//             <Reveal>
//               <div style={{ maxWidth: 380, margin: '0 auto' }}>
//                 <div
//                   style={{
//                     fontFamily: "'Cormorant Garamond',serif",
//                     fontSize: 64,
//                     color: 'rgba(212,175,112,.2)',
//                     lineHeight: 0.5,
//                   }}
//                 >
//                   "
//                 </div>
//                 <p
//                   style={{
//                     fontFamily: "'Cormorant Garamond',serif",
//                     fontSize: 'clamp(18px,6vw,24px)',
//                     fontStyle: 'italic',
//                     color: 'rgba(255,200,190,.52)',
//                     lineHeight: 1.85,
//                     margin: '16px 0',
//                   }}
//                 >
//                   Two souls with but a single thought,
//                   <br />
//                   two hearts that beat as one.
//                 </p>
//                 <div
//                   style={{
//                     fontFamily: "'Cormorant Garamond',serif",
//                     fontSize: 64,
//                     color: 'rgba(212,175,112,.2)',
//                     transform: 'rotate(180deg)',
//                     lineHeight: 0.5,
//                   }}
//                 >
//                   "
//                 </div>
//               </div>
//             </Reveal>
//           </section>

//           {/* ── TIMELINE ── */}
//           <section
//             style={{
//               position: 'relative',
//               zIndex: 10,
//               padding: 'clamp(64px,14vw,100px) 20px',
//               background:
//                 'linear-gradient(180deg,rgba(55,14,30,0.5) 0%,rgba(70,18,36,0.35) 50%,rgba(55,14,30,0.5) 100%)',
//               borderBottom: '1px solid rgba(212,175,112,.14)',
//             }}
//           >
//             <Reveal>
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: 14,
//                   marginBottom: 48,
//                 }}
//               >
//                 <div
//                   style={{
//                     height: 1,
//                     flex: 1,
//                     maxWidth: 70,
//                     background:
//                       'linear-gradient(to right,transparent,rgba(212,175,112,.45))',
//                   }}
//                 />
//                 <span
//                   style={{
//                     fontFamily: "'Jost',sans-serif",
//                     fontSize: 'clamp(9px,2.5vw,11px)',
//                     letterSpacing: '.5em',
//                     textTransform: 'uppercase',
//                     color: 'rgba(212,175,112,.75)',
//                     padding: '7px 18px',
//                     border: '1px solid rgba(212,175,112,.3)',
//                     borderRadius: 50,
//                     background: 'rgba(212,175,112,.06)',
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   🕯️ &nbsp; The Day's Events
//                 </span>
//                 <div
//                   style={{
//                     height: 1,
//                     flex: 1,
//                     maxWidth: 70,
//                     background:
//                       'linear-gradient(to left,transparent,rgba(212,175,112,.45))',
//                   }}
//                 />
//               </div>
//             </Reveal>
//             <div style={{ maxWidth: 440, margin: '0 auto' }}>
//               {[
//                 [
//                   '4:00 PM',
//                   'Wedding Ceremony',
//                   'Exchange of vows in the garden chapel',
//                   '🌸',
//                 ],
//                 [
//                   '5:30 PM',
//                   'Family Gathering ',
//                   'warm greetings & blessings',
//                   '🤲',
//                 ],
//                 [
//                   '7:00 PM',
//                   'Dinner Reception',
//                   'Five-course candlelit dinner',
//                   '🕯️',
//                 ],
//                 [
//                   '9:00 PM',
//                   'Dancing & Celebration',
//                   'Live orchestra until midnight',
//                   '✨',
//                 ],
//               ].map(([time, title, desc, icon], i) => (
//                 <Reveal key={i} delay={i * 0.12}>
//                   <div
//                     style={{
//                       display: 'flex',
//                       gap: 'clamp(14px,4vw,20px)',
//                       marginBottom: 'clamp(24px,6vw,36px)',
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         flexShrink: 0,
//                         paddingTop: 4,
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: 'clamp(44px,12vw,52px)',
//                           height: 'clamp(44px,12vw,52px)',
//                           borderRadius: '50%',
//                           background: 'rgba(212,175,112,.09)',
//                           border: '1px solid rgba(212,175,112,.32)',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           fontSize: 'clamp(18px,5vw,22px)',
//                           boxShadow: '0 0 20px rgba(212,175,112,.12)',
//                         }}
//                       >
//                         {icon}
//                       </div>
//                       {i < 3 && (
//                         <div
//                           style={{
//                             width: 1,
//                             flex: 1,
//                             background: 'rgba(212,175,112,.14)',
//                             marginTop: 8,
//                           }}
//                         />
//                       )}
//                     </div>
//                     <div style={{ paddingBottom: 20 }}>
//                       <p
//                         style={{
//                           fontFamily: "'Jost',sans-serif",
//                           fontSize: 'clamp(8px,2.2vw,10px)',
//                           letterSpacing: '.32em',
//                           color: 'rgba(212,175,112,.5)',
//                           textTransform: 'uppercase',
//                           marginBottom: 5,
//                           marginTop: 0,
//                         }}
//                       >
//                         {time}
//                       </p>
//                       <p
//                         style={{
//                           fontFamily: "'Cormorant Garamond',serif",
//                           fontSize: 'clamp(18px,5.8vw,23px)',
//                           color: 'rgba(255,218,208,.86)',
//                           marginBottom: 5,
//                           marginTop: 0,
//                         }}
//                       >
//                         {title}
//                       </p>
//                       <p
//                         style={{
//                           fontFamily: "'Jost',sans-serif",
//                           fontSize: 'clamp(11px,3.5vw,14px)',
//                           fontWeight: 300,
//                           color: 'rgba(212,175,112,.4)',
//                           margin: 0,
//                           lineHeight: 1.6,
//                         }}
//                       >
//                         {desc}
//                       </p>
//                     </div>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </section>

//           {/* ── OUR STORY ── */}
//           <section
//             style={{
//               position: 'relative',
//               zIndex: 10,
//               padding: 'clamp(64px,14vw,100px) 20px',
//               background:
//                 'linear-gradient(180deg,rgba(20,5,14,0.65) 0%,rgba(45,12,28,0.4) 50%,rgba(20,5,14,0.65) 100%)',
//               borderBottom: '1px solid rgba(212,175,112,.14)',
//             }}
//           >
//             <Reveal>
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: 14,
//                   marginBottom: 40,
//                 }}
//               >
//                 <div
//                   style={{
//                     height: 1,
//                     flex: 1,
//                     maxWidth: 70,
//                     background:
//                       'linear-gradient(to right,transparent,rgba(212,175,112,.45))',
//                   }}
//                 />
//                 <span
//                   style={{
//                     fontFamily: "'Jost',sans-serif",
//                     fontSize: 'clamp(9px,2.5vw,11px)',
//                     letterSpacing: '.5em',
//                     textTransform: 'uppercase',
//                     color: 'rgba(212,175,112,.75)',
//                     padding: '7px 18px',
//                     border: '1px solid rgba(212,175,112,.3)',
//                     borderRadius: 50,
//                     background: 'rgba(212,175,112,.06)',
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   💫 &nbsp; Our Story
//                 </span>
//                 <div
//                   style={{
//                     height: 1,
//                     flex: 1,
//                     maxWidth: 70,
//                     background:
//                       'linear-gradient(to left,transparent,rgba(212,175,112,.45))',
//                   }}
//                 />
//               </div>
//             </Reveal>
//             <div
//               style={{
//                 display: 'flex',
//                 gap: 'clamp(12px,3.5vw,20px)',
//                 maxWidth: 460,
//                 margin: '0 auto',
//               }}
//             >
//               {[
//                 {
//                   label: 'Met',
//                   // year: '2019',
//                   icon: '💫',
//                   desc: 'First glance',
//                 },
//                 {
//                   label: 'Engaged',
//                   // year: '2025',
//                   icon: '💍',
//                   desc: 'We said yes',
//                 },
//                 {
//                   label: 'Forever',
//                   year: '2026',
//                   icon: '🌹',
//                   desc: 'A new chapter',
//                 },
//               ].map(({ label, year, icon, desc }, i) => (
//                 <Reveal key={i} delay={i * 0.14} dir='scale'>
//                   <div
//                     style={{
//                       flex: 1,
//                       borderRadius: 'clamp(16px,5vw,22px)',
//                       padding: 'clamp(20px,6vw,30px) clamp(12px,3.5vw,18px)',
//                       textAlign: 'center',
//                       background:
//                         'linear-gradient(145deg,rgba(100,24,42,.42),rgba(55,12,24,.62))',
//                       border: '1px solid rgba(212,175,112,.2)',
//                       boxShadow:
//                         '0 20px 50px rgba(0,0,0,.35),0 0 0 1px rgba(212,175,112,.05) inset',
//                     }}
//                   >
//                     <div
//                       style={{
//                         fontSize: 'clamp(26px,8vw,34px)',
//                         marginBottom: 10,
//                       }}
//                     >
//                       {icon}
//                     </div>
//                     <div
//                       style={{
//                         fontFamily: "'Great Vibes',cursive",
//                         fontSize: 'clamp(22px,7vw,28px)',
//                         color: '#f5dde8',
//                         lineHeight: 1.1,
//                       }}
//                     >
//                       {label}
//                     </div>
//                     <div
//                       style={{
//                         fontFamily: "'Jost',sans-serif",
//                         fontSize: 'clamp(8px,2.2vw,10px)',
//                         color: 'rgba(212,175,112,.5)',
//                         letterSpacing: '.3em',
//                         marginTop: 6,
//                         marginBottom: 6,
//                         textTransform: 'uppercase',
//                       }}
//                     >
//                       {year}
//                     </div>
//                     <div
//                       style={{
//                         fontFamily: "'Cormorant Garamond',serif",
//                         fontSize: 'clamp(11px,3.5vw,13px)',
//                         fontStyle: 'italic',
//                         color: 'rgba(255,200,185,.38)',
//                       }}
//                     >
//                       {desc}
//                     </div>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </section>

//           {/* ── GOOGLE MAP ── */}
//         <section
//             style={{
//               position: 'relative',
//               zIndex: 10,
//               padding: 'clamp(64px,14vw,100px) 20px',
//               background:
//                 'linear-gradient(180deg,rgba(55,14,30,0.5) 0%,rgba(70,18,36,0.35) 50%,rgba(55,14,30,0.5) 100%)',
//               borderBottom: '1px solid rgba(212,175,112,.14)',
//             }}
//           >
//             <Reveal>
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: 14,
//                   marginBottom: 36,
//                 }}
//               >
//                 <div
//                   style={{
//                     height: 1,
//                     flex: 1,
//                     maxWidth: 70,
//                     background:
//                       'linear-gradient(to right,transparent,rgba(212,175,112,.45))',
//                   }}
//                 />
//                 <span
//                   style={{
//                     fontFamily: "'Jost',sans-serif",
//                     fontSize: 'clamp(9px,2.5vw,11px)',
//                     letterSpacing: '.5em',
//                     textTransform: 'uppercase',
//                     color: 'rgba(212,175,112,.75)',
//                     padding: '7px 18px',
//                     border: '1px solid rgba(212,175,112,.3)',
//                     borderRadius: 50,
//                     background: 'rgba(212,175,112,.06)',
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   📍 &nbsp; Find Us
//                 </span>
//                 <div
//                   style={{
//                     height: 1,
//                     flex: 1,
//                     maxWidth: 70,
//                     background:
//                       'linear-gradient(to left,transparent,rgba(212,175,112,.45))',
//                   }}
//                 />
//               </div>
//               <p
//                 style={{
//                   textAlign: 'center',
//                   fontFamily: "'Cormorant Garamond',serif",
//                   fontSize: 'clamp(18px,6vw,24px)',
//                   color: 'rgba(255,215,200,.55)',
//                   fontStyle: 'italic',
//                   marginBottom: 6,
//                   marginTop: 0,
//                 }}
//               >
//                 Villa Rosa Ballroom
//               </p>
//               <p
//                 style={{
//                   textAlign: 'center',
//                   fontFamily: "'Jost',sans-serif",
//                   fontSize: 'clamp(9px,2.5vw,11px)',
//                   letterSpacing: '.25em',
//                   color: 'rgba(212,175,112,.32)',
//                   textTransform: 'uppercase',
//                   marginBottom: 32,
//                 }}
//               >
//                 Your Venue Address Here
//               </p>
//             </Reveal>
//             <Reveal delay={0.12} dir='scale'>
//               <div style={{ maxWidth: 600, margin: '0 auto' }}>
//                 <div
//                   style={{
//                     borderRadius: 'clamp(18px,5vw,24px)',
//                     overflow: 'hidden',
//                     boxShadow:
//                       '0 0 0 1px rgba(212,175,112,.25),0 60px 120px rgba(0,0,0,.6),0 0 60px rgba(160,40,80,.12)',
//                   }}
//                 >
//                   {/* ↓ Replace with your real Google Maps embed URL ↓ */}
//                   <iframe
//                     title='Venue'
//                     src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.0!2d11.2558136!3d43.7695604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a5403f46f3b63%3A0xd7a3b7a54af41b13!2sFlorence%2C%20Metropolitan%20City%20of%20Florence%2C%20Italy!5e0!3m2!1sen!2sus!4v1700000000000'
//                     width='100%'
//                     height='340'
//                     style={{
//                       border: 0,
//                       display: 'block',
//                       filter:
//                         'hue-rotate(310deg) saturate(.45) brightness(.65)',
//                     }}
//                     allowFullScreen
//                     loading='lazy'
//                     referrerPolicy='no-referrer-when-downgrade'
//                   />
//                 </div>
//                 <div style={{ textAlign: 'center', marginTop: 22 }}>
//                   {/* ↓ Replace href with your real venue link ↓ */}
//                   <a
//                     href='https://maps.google.com/?q=Florence,Italy'
//                     target='_blank'
//                     rel='noopener noreferrer'
//                     style={{
//                       display: 'inline-flex',
//                       alignItems: 'center',
//                       gap: 9,
//                       padding: 'clamp(13px,3.5vw,16px) clamp(26px,7vw,36px)',
//                       borderRadius: 50,
//                       fontFamily: "'Jost',sans-serif",
//                       fontSize: 'clamp(9px,2.5vw,11px)',
//                       letterSpacing: '.3em',
//                       textTransform: 'uppercase',
//                       color: '#d4af70',
//                       border: '1px solid rgba(212,175,112,.32)',
//                       textDecoration: 'none',
//                       transition: 'all .3s ease',
//                       background: 'rgba(212,175,112,.04)',
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.background =
//                         'rgba(212,175,112,.12)';
//                       e.currentTarget.style.boxShadow =
//                         '0 0 30px rgba(212,175,112,.18)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background =
//                         'rgba(212,175,112,.04)';
//                       e.currentTarget.style.boxShadow = 'none';
//                     }}
//                   >
//                     <svg
//                       viewBox='0 0 24 24'
//                       width='13'
//                       height='13'
//                       fill='currentColor'
//                     >
//                       <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
//                     </svg>
//                     Get Directions
//                   </a>
//                 </div>
//               </div>
//             </Reveal>
//           </section>

//           {/* ── RSVP ── */}
//           <section
//             style={{
//               position: 'relative',
//               zIndex: 10,
//               padding: 'clamp(70px,15vw,110px) 20px',
//               textAlign: 'center',
//               background:
//                 'linear-gradient(180deg,rgba(20,5,14,0.65) 0%,rgba(70,16,40,0.4) 50%,rgba(20,5,14,0.65) 100%)',
//             }}
//           >
//             <Reveal>
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: 14,
//                   marginBottom: 44,
//                 }}
//               >
//                 <div
//                   style={{
//                     height: 1,
//                     flex: 1,
//                     maxWidth: 70,
//                     background:
//                       'linear-gradient(to right,transparent,rgba(212,175,112,.45))',
//                   }}
//                 />
//                 <span
//                   style={{
//                     fontFamily: "'Jost',sans-serif",
//                     fontSize: 'clamp(9px,2.5vw,11px)',
//                     letterSpacing: '.5em',
//                     textTransform: 'uppercase',
//                     color: 'rgba(212,175,112,.75)',
//                     padding: '7px 18px',
//                     border: '1px solid rgba(212,175,112,.3)',
//                     borderRadius: 50,
//                     background: 'rgba(212,175,112,.06)',
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   💌 &nbsp; RSVP
//                 </span>
//                 <div
//                   style={{
//                     height: 1,
//                     flex: 1,
//                     maxWidth: 70,
//                     background:
//                       'linear-gradient(to left,transparent,rgba(212,175,112,.45))',
//                   }}
//                 />
//               </div>
//             </Reveal>
//             <Reveal dir='scale'>
//               <div
//                 style={{
//                   maxWidth: 420,
//                   margin: '0 auto',
//                   borderRadius: 'clamp(20px,6vw,30px)',
//                   padding: 'clamp(36px,10vw,60px) clamp(24px,8vw,48px)',
//                   background:
//                     'linear-gradient(145deg,rgba(100,24,42,.65),rgba(55,12,24,.85))',
//                   border: '1px solid rgba(212,175,112,.26)',
//                   boxShadow:
//                     '0 0 120px rgba(140,30,65,.3),0 70px 140px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.04)',
//                   position: 'relative',
//                   overflow: 'hidden',
//                 }}
//               >
//                 <div
//                   style={{
//                     position: 'absolute',
//                     inset: 0,
//                     background:
//                       'radial-gradient(ellipse at 50% 0%,rgba(200,70,100,.2) 0%,transparent 62%)',
//                     pointerEvents: 'none',
//                   }}
//                 />
//                 <p
//                   style={{
//                     fontFamily: "'Jost',sans-serif",
//                     fontSize: 'clamp(9px,2.5vw,10px)',
//                     letterSpacing: '.45em',
//                     textTransform: 'uppercase',
//                     color: 'rgba(212,175,112,.5)',
//                     marginBottom: 14,
//                   }}
//                 >
//                   Kindly Reply
//                 </p>
//                 <h3
//                   style={{
//                     fontFamily: "'Great Vibes',cursive",
//                     fontSize: 'clamp(42px,13vw,60px)',
//                     color: '#f8dde8',
//                     textShadow: '0 0 60px rgba(200,80,120,.5)',
//                     lineHeight: 1.1,
//                     margin: '0 0 20px',
//                   }}
//                 >
//                   Will you
//                   <br />
//                   join us?
//                 </h3>
//                 <div style={{ margin: '18px 0' }}>
//                   <GoldLine w={36} />
//                 </div>
//                 <p
//                   style={{
//                     fontFamily: "'Jost',sans-serif",
//                     fontSize: 'clamp(10px,3vw,13px)',
//                     fontWeight: 300,
//                     color: 'rgba(212,175,112,.4)',
//                     letterSpacing: '.1em',
//                     marginBottom: 32,
//                   }}
//                 >
//                   Please respond by March 20, 2026
//                 </p>
//                 <div
//                   style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
//                 >
//                   <button
//                     style={{
//                       width: '100%',
//                       padding: 'clamp(15px,4.5vw,19px)',
//                       borderRadius: 50,
//                       fontFamily: "'Jost',sans-serif",
//                       fontSize: 'clamp(10px,3vw,12px)',
//                       letterSpacing: '.32em',
//                       textTransform: 'uppercase',
//                       fontWeight: 500,
//                       background:
//                         'linear-gradient(135deg,#c8a44a,#f0d485,#c8a44a)',
//                       backgroundSize: '200% auto',
//                       color: '#3a2010',
//                       border: 'none',
//                       cursor: 'pointer',
//                       boxShadow: '0 14px 40px rgba(212,175,112,.32)',
//                       transition: 'transform .2s,box-shadow .2s',
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform =
//                         'translateY(-3px) scale(1.02)';
//                       e.currentTarget.style.boxShadow =
//                         '0 22px 55px rgba(212,175,112,.45)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = 'none';
//                       e.currentTarget.style.boxShadow =
//                         '0 14px 40px rgba(212,175,112,.32)';
//                     }}
//                     onTouchStart={(e) =>
//                       (e.currentTarget.style.transform = 'scale(.97)')
//                     }
//                     onTouchEnd={(e) =>
//                       (e.currentTarget.style.transform = 'none')
//                     }
//                   >
//                     ✦ Joyfully Accept ✦
//                   </button>
//                   <button
//                     style={{
//                       width: '100%',
//                       padding: 'clamp(15px,4.5vw,19px)',
//                       borderRadius: 50,
//                       fontFamily: "'Jost',sans-serif",
//                       fontSize: 'clamp(10px,3vw,12px)',
//                       letterSpacing: '.32em',
//                       textTransform: 'uppercase',
//                       background: 'transparent',
//                       color: 'rgba(212,175,112,.45)',
//                       border: '1px solid rgba(212,175,112,.2)',
//                       cursor: 'pointer',
//                       transition: 'background .25s',
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.background =
//                         'rgba(212,175,112,.08)')
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.background = 'transparent')
//                     }
//                   >
//                     Regretfully Decline
//                   </button>
//                 </div>
//               </div>
//             </Reveal>
//           </section>

//           {/* ── FOOTER ── */}
//           <footer
//             style={{
//               position: 'relative',
//               zIndex: 10,
//               padding: 'clamp(50px,12vw,80px) 20px',
//               textAlign: 'center',
//               borderTop: '1px solid rgba(212,175,112,.1)',
//             }}
//           >
//             <Reveal>
//               <div
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   gap: 14,
//                   marginBottom: 20,
//                   opacity: 0.15,
//                 }}
//               >
//                 <RoseIcon s={26} op={1} />
//                 <RoseIcon s={19} op={1} />
//                 <RoseIcon s={26} op={1} />
//               </div>
//               <p
//                 style={{
//                   fontFamily: "'Great Vibes',cursive",
//                   fontSize: 'clamp(30px,10vw,42px)',
//                   color: 'rgba(212,175,112,.28)',
//                   margin: '0 0 10px',
//                 }}
//               >
//                 Ashiq &amp; Shamida
//               </p>
//               <div
//                 style={{
//                   margin: '12px auto 12px',
//                   width: 'min(120px,30vw)',
//                   height: 1,
//                   background:
//                     'linear-gradient(to right,transparent,rgba(212,175,112,.3),transparent)',
//                 }}
//               />
//               <p
//                 style={{
//                   fontFamily: "'Jost',sans-serif",
//                   fontSize: 'clamp(9px,2.5vw,11px)',
//                   letterSpacing: '.5em',
//                   textTransform: 'uppercase',
//                   color: 'rgba(212,175,112,.18)',
//                   margin: 0,
//                 }}
//               >
//                 April 5, 2026 · With Love
//               </p>
//             </Reveal>
//           </footer>
//         </>
//       )}
//     </div>
//   );
// }

//testing 3
import { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════
   ANIME.JS — loaded from CDN via dynamic script injection
═══════════════════════════════════════════════════════════ */
function useAnime() {
  const [anime, setAnime] = useState(null);
  useEffect(() => {
    if (window.anime) {
      setAnime(() => window.anime);
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    s.onload = () => setAnime(() => window.anime);
    document.head.appendChild(s);
  }, []);
  return anime;
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, on];
}
function Reveal({ children, delay = 0, dir = 'up', className = '' }: any) {
  const [ref, on] = useReveal();
  const t = {
    up: on ? 'translateY(0)' : 'translateY(52px)',
    left: on ? 'translateX(0)' : 'translateX(-60px)',
    right: on ? 'translateX(0)' : 'translateX(60px)',
    scale: on ? 'scale(1)' : 'scale(0.82)',
    fade: 'none',
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: t[dir] || t.up,
        transition: `opacity 1.2s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1.2s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SMALL DECORATIVES
═══════════════════════════════════════════════════════════ */
const Diamond = ({ size = 8, color = '#d4af70', opacity = 0.5 }) => (
  <div
    style={{
      width: size,
      height: size,
      transform: 'rotate(45deg)',
      border: `1px solid ${color}`,
      opacity,
      flexShrink: 0,
    }}
  />
);
const GoldLine = ({ w = 48 }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        height: 1,
        width: w,
        background: 'linear-gradient(to right,transparent,#d4af70)',
      }}
    />
    <Diamond size={5} opacity={0.6} />
    <Diamond size={9} opacity={0.9} />
    <Diamond size={5} opacity={0.6} />
    <div
      style={{
        height: 1,
        width: w,
        background: 'linear-gradient(to left,transparent,#d4af70)',
      }}
    />
  </div>
);
const RoseIcon = ({ s = 44, op = 0.22 }) => (
  <svg
    viewBox='0 0 60 60'
    width={s}
    height={s}
    style={{ opacity: op, flexShrink: 0, display: 'block' }}
  >
    <circle
      cx='30'
      cy='27'
      r='7.5'
      fill='none'
      stroke='#d4a0a0'
      strokeWidth='1.2'
    />
    {[
      [-20, 30, 18],
      [30, 40, 24],
      [70, 38, 36],
      [-70, 22, 36],
      [-130, 20, 24],
    ].map(([a, cx, cy], i) => (
      <ellipse
        key={i}
        cx={cx}
        cy={cy}
        rx='7'
        ry='10'
        fill='none'
        stroke='#d4a0a0'
        strokeWidth='1'
        transform={`rotate(${a} ${cx} ${cy})`}
      />
    ))}
    <line x1='30' y1='35' x2='30' y2='58' stroke='#b8c9a8' strokeWidth='1.2' />
    <ellipse
      cx='22'
      cy='50'
      rx='9'
      ry='5'
      fill='none'
      stroke='#b8c9a8'
      strokeWidth='1'
      transform='rotate(-30 22 50)'
    />
    <ellipse
      cx='38'
      cy='50'
      rx='9'
      ry='5'
      fill='none'
      stroke='#b8c9a8'
      strokeWidth='1'
      transform='rotate(30 38 50)'
    />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   FLOATING PETALS
═══════════════════════════════════════════════════════════ */
function Petals() {
  const [items] = useState(() =>
    Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      dur: 12 + Math.random() * 16,
      delay: Math.random() * 18,
      size: 14 + Math.random() * 22,
      rot: Math.random() * 360,
      kind: i % 3,
    })),
  );
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {items.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            bottom: -80,
            width: p.size,
            height: p.size,
            animation: `petalRise ${p.dur}s linear ${p.delay}s infinite`,
          }}
        >
          {p.kind === 0 && (
            <svg
              viewBox='0 0 30 42'
              style={{ transform: `rotate(${p.rot}deg)`, opacity: 0.45 }}
            >
              <ellipse cx='15' cy='21' rx='11' ry='19' fill='#d4a0b0' />
              <path
                d='M15 4 Q18 21 15 38 Q12 21 15 4'
                fill='rgba(212,160,176,.35)'
              />
            </svg>
          )}
          {p.kind === 1 && (
            <svg
              viewBox='0 0 20 20'
              style={{ transform: `rotate(${p.rot}deg)`, opacity: 0.32 }}
            >
              <path
                d='M10 1L11.5 8L18 8L12.5 12L14.5 19L10 15L5.5 19L7.5 12L2 8L8.5 8Z'
                fill='rgba(212,175,112,.7)'
              />
            </svg>
          )}
          {p.kind === 2 && (
            <svg
              viewBox='0 0 22 28'
              style={{ transform: `rotate(${p.rot}deg)`, opacity: 0.38 }}
            >
              <ellipse cx='11' cy='14' rx='8' ry='13' fill='#c87090' />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COUNTDOWN
═══════════════════════════════════════════════════════════ */
function Countdown({ targetDate }: any) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) {
        setTime({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div
      style={{
        display: 'flex',
        gap: 'clamp(10px,3.5vw,24px)',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '0 4px',
      }}
    >
      {[
        ['Days', time.d],
        ['Hours', time.h],
        ['Minutes', time.m],
        ['Seconds', time.s],
      ].map(([label, val]) => (
        <div
          key={label}
          style={{ textAlign: 'center', minWidth: 'clamp(72px,20vw,110px)' }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: 'clamp(14px,4vw,20px)',
              padding: 'clamp(22px,6vw,36px) 8px clamp(16px,4vw,26px)',
              background:
                'linear-gradient(145deg,rgba(100,24,42,.6),rgba(55,12,24,.8))',
              border: '1px solid rgba(212,175,112,.28)',
              boxShadow:
                '0 20px 50px rgba(0,0,0,.45), 0 0 40px rgba(160,40,80,.1), inset 0 1px 0 rgba(255,255,255,.05)',
            }}
          >
            {/* inner top glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background:
                  'linear-gradient(to right,transparent,rgba(212,175,112,.45),transparent)',
              }}
            />
            <div
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 'clamp(48px,13vw,76px)',
                fontWeight: 300,
                lineHeight: 1,
                background: 'linear-gradient(135deg,#c8a44a,#f5de8a,#c8a44a)',
                backgroundSize: '200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {String(val).padStart(2, '0')}
            </div>
            <div style={{ position: 'absolute', top: 10, right: 10 }}>
              <Diamond size={5} opacity={0.32} />
            </div>
            <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
              <Diamond size={5} opacity={0.32} />
            </div>
          </div>
          <p
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 'clamp(8px,2.2vw,10px)',
              letterSpacing: '.42em',
              textTransform: 'uppercase',
              color: 'rgba(212,175,112,.48)',
              marginTop: 12,
              marginBottom: 0,
            }}
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WAX SEAL SVG
═══════════════════════════════════════════════════════════ */
function WaxSeal({ sealRef }) {
  return (
    <div
      ref={sealRef}
      style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}
    >
      <div
        className='seal-glow'
        style={{
          position: 'absolute',
          inset: -10,
          borderRadius: '50%',
          background:
            'radial-gradient(circle,rgba(212,175,112,.45) 0%,transparent 70%)',
        }}
      />
      <svg
        viewBox='0 0 120 120'
        width='120'
        height='120'
        style={{ display: 'block', position: 'relative', zIndex: 1 }}
      >
        <circle cx='60' cy='60' r='56' fill='#b8906a' />
        <circle cx='60' cy='60' r='52' fill='#d4a882' />
        <circle cx='60' cy='60' r='48' fill='#c49a7a' />
        {Array.from({ length: 32 }).map((_, i) => {
          const a = (i / 32) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={60 + 44 * Math.cos(a)}
              cy={60 + 44 * Math.sin(a)}
              r='1.3'
              fill='#a8804a'
            />
          );
        })}
        <circle cx='60' cy='60' r='36' fill='#c8a07a' />
        <circle cx='60' cy='60' r='32' fill='#dbb898' />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={60 + 14 * Math.cos(a)}
              y1={60 + 14 * Math.sin(a)}
              x2={60 + 29 * Math.cos(a)}
              y2={60 + 29 * Math.sin(a)}
              stroke='#a8804a'
              strokeWidth='0.7'
            />
          );
        })}
        <circle
          cx='60'
          cy='60'
          r='12'
          fill='none'
          stroke='#a8804a'
          strokeWidth='0.8'
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'Great Vibes',cursive",
            fontSize: 15,
            color: '#6a4c2a',
            lineHeight: 1,
          }}
        >
          A
        </span>
        <span
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 8,
            color: '#6a4c2a',
            letterSpacing: 2,
          }}
        >
          &amp;
        </span>
        <span
          style={{
            fontFamily: "'Great Vibes',cursive",
            fontSize: 15,
            color: '#6a4c2a',
            lineHeight: 1,
          }}
        >
          S
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function WeddingInvitation() {
  const anime = useAnime();
  const [opened, setOpened] = useState(false);
  const [cardPhase, setCardPhase] = useState('idle'); // idle | opening | done

  // refs for anime targets
  const cardRef = useRef(null);
  const leftPageRef = useRef(null);
  const rightPageRef = useRef(null);
  const sealRef = useRef(null);
  const heroRef = useRef(null);
  const namesRef = useRef(null);
  const particleContainerRef = useRef(null);
  const groomRef = useRef(null);
  const brideRef = useRef(null);
  const ampRef = useRef(null);

  // ── Hero entrance animation ──────────────────────────────
  useEffect(() => {
    if (!anime || !heroRef.current) return;
    anime({
      targets: heroRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1200,
      easing: 'easeOutExpo',
    });
  }, [anime]);

  // ── Seal pulse loop ──────────────────────────────────────
  useEffect(() => {
    if (!anime || !sealRef.current) return;
    anime({
      targets: sealRef.current.querySelector('.seal-glow'),
      scale: [1, 1.18, 1],
      opacity: [0.5, 1, 0.5],
      duration: 2200,
      easing: 'easeInOutSine',
      loop: true,
    });
  }, [anime]);

  // ── Spawn burst particles ────────────────────────────────
  const spawnParticles = useCallback(() => {
    if (!anime || !particleContainerRef.current) return;
    const container = particleContainerRef.current;
    const colors = [
      '#d4af70',
      '#f5de8a',
      '#e8a0b8',
      '#d4607a',
      '#fff4cc',
      '#c8f0c8',
    ];
    Array.from({ length: 36 }).forEach((_, i) => {
      const el = document.createElement('div');
      const isCircle = i % 3 === 0;
      el.style.cssText = `position:absolute;top:50%;left:50%;width:${isCircle ? 10 : 7}px;height:${isCircle ? 10 : 7}px;border-radius:${isCircle ? '50%' : '0'};background:${colors[i % colors.length]};transform:translate(-50%,-50%) rotate(45deg);pointer-events:none;`;
      container.appendChild(el);
      const angle = (i / 36) * 360,
        dist = 80 + Math.random() * 160;
      const tx = Math.cos((angle * Math.PI) / 180) * dist;
      const ty = Math.sin((angle * Math.PI) / 180) * dist;
      anime({
        targets: el,
        translateX: [0, tx],
        translateY: [0, ty],
        rotate: [0, 360 + Math.random() * 360],
        scale: [1, 0],
        opacity: [1, 0],
        duration: 900 + Math.random() * 400,
        easing: 'easeOutCubic',
        delay: i * 18,
        complete: () => el.remove(),
      });
    });
  }, [anime]);

  // ── Open card ────────────────────────────────────────────
  const handleOpenCard = useCallback(() => {
    if (!anime || cardPhase !== 'idle') return;
    setCardPhase('opening');

    // 1. Seal shake + scale out
    anime({
      targets: sealRef.current,
      rotate: [0, -12, 10, -6, 4, 0],
      duration: 400,
      easing: 'easeInOutSine',
    });
    setTimeout(() => {
      anime({
        targets: sealRef.current,
        scale: [1, 1.3, 0],
        opacity: [1, 0],
        duration: 450,
        easing: 'easeInBack',
      });
      spawnParticles();
    }, 380);

    // 2. Left page flips open (book-open)
    setTimeout(() => {
      anime({
        targets: leftPageRef.current,
        rotateY: [0, -185],
        duration: 1000,
        easing: 'cubicBezier(0.45, 0, 0.2, 1)',
      });
      // right page slight depth
      anime({
        targets: rightPageRef.current,
        rotateY: [0, 8, 0],
        duration: 1000,
        easing: 'easeInOutCubic',
      });
      // whole card lifts
      anime({
        targets: cardRef.current,
        scale: [1, 1.03, 1],
        duration: 1100,
        easing: 'easeInOutQuad',
      });
    }, 600);

    // 3. Fade card away, reveal names
    setTimeout(() => {
      anime({
        targets: cardRef.current,
        opacity: [1, 0],
        scale: [1.03, 0.92],
        translateY: [0, -60],
        duration: 700,
        easing: 'easeInCubic',
        complete: () => {
          setCardPhase('done');
          setOpened(true);
          setTimeout(
            () =>
              namesRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              }),
            100,
          );
        },
      });
    }, 1500);
  }, [anime, cardPhase, spawnParticles]);

  // ── Names reveal with anime ──────────────────────────────
  useEffect(() => {
    if (!opened || !anime) return;
    setTimeout(() => {
      if (groomRef.current) {
        anime({
          targets: groomRef.current,
          clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
          opacity: [0, 1],
          duration: 1400,
          easing: 'easeOutExpo',
          delay: 200,
        });
      }
      if (ampRef.current) {
        anime({
          targets: ampRef.current,
          opacity: [0, 1],
          scale: [0.6, 1],
          duration: 900,
          easing: 'easeOutBack',
          delay: 900,
        });
      }
      if (brideRef.current) {
        anime({
          targets: brideRef.current,
          clipPath: ['inset(0 0% 0 100%)', 'inset(0 0% 0 0%)'],
          opacity: [0, 1],
          duration: 1400,
          easing: 'easeOutExpo',
          delay: 1200,
        });
      }
    }, 300);
  }, [opened, anime]);

  return (
    <div
      style={{
        minHeight: '100dvh',
        background:
          'linear-gradient(160deg,#1a0c12 0%,#2c1420 40%,#1e0e18 75%,#100810 100%)',
        fontFamily: "'Cormorant Garamond',serif",
        overflowX: 'hidden',
      }}
    >
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Great+Vibes&family=Jost:wght@200;300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        html,body{margin:0;padding:0;-webkit-font-smoothing:antialiased}
        @keyframes petalRise{0%{transform:translateY(110dvh) rotate(0deg) translateX(0);opacity:0}8%{opacity:.45}50%{transform:translateY(50dvh) rotate(180deg) translateX(28px)}92%{opacity:.3}100%{transform:translateY(-10dvh) rotate(360deg) translateX(-22px);opacity:0}}
        @keyframes goldShine{0%{background-position:-300% center}100%{background-position:300% center}}
        @keyframes tapPulse{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.04)}}
        @keyframes cardFloat{0%,100%{transform:translateY(0) rotate(-.4deg)}50%{transform:translateY(-12px) rotate(.4deg)}}
        @keyframes countdownFlash{0%{color:#f5de8a;text-shadow:0 0 20px rgba(212,175,112,.8)}100%{color:inherit;text-shadow:none}}
        @keyframes shimmer{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes bgPulse{0%,100%{opacity:.15}50%{opacity:.28}}
        .gold-text{background:linear-gradient(90deg,#c8a44a 0%,#f5de8a 30%,#e8c060 50%,#f5de8a 70%,#c8a44a 100%);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:goldShine 5s linear infinite}
        .shimmer{animation:shimmer 3s ease-in-out infinite}
        .card-float{animation:cardFloat 5s ease-in-out infinite}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#d4af70;border-radius:2px}
        .story-card-cell{width:100%;display:flex;flex-direction:column;}
        .story-card-cell > div{flex:1;}
        @media(max-width:400px){html{font-size:14px}}
      `}</style>

      <Petals />

      {/* Particle burst container */}
      <div
        ref={particleContainerRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          pointerEvents: 'none',
          zIndex: 999,
        }}
      />

      {/* ══════════════════════════════════════════════════════
          HERO — FULL SCREEN
      ══════════════════════════════════════════════════════ */}
      {!opened && (
        <section
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100vw',
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 20px',
            overflow: 'hidden',
          }}
        >
          {/* ambient radial glow */}
          <div
            style={{
              position: 'absolute',
              width: 'min(700px,150vw)',
              height: 'min(700px,150vh)',
              borderRadius: '50%',
              background:
                'radial-gradient(circle,rgba(150,40,75,.22) 0%,transparent 65%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              pointerEvents: 'none',
              animation: 'bgPulse 4s ease-in-out infinite',
            }}
          />

          <div
            ref={heroRef}
            style={{
              opacity: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: 440,
            }}
          >
            {/* top label */}
            <p
              className='shimmer'
              style={{
                fontFamily: "'Jost',sans-serif",
                fontSize: 'clamp(9px,2.4vw,11px)',
                letterSpacing: '.5em',
                textTransform: 'uppercase',
                color: '#d4af70',
                marginBottom: 28,
                textAlign: 'center',
              }}
            >
              A Wedding Invitation
            </p>

            {/* ── THE CARD ── */}
            {cardPhase !== 'done' && (
              <div
                ref={cardRef}
                className={cardPhase === 'idle' ? 'card-float' : ''}
                onClick={handleOpenCard}
                style={{
                  width: '100%',
                  cursor: cardPhase === 'idle' ? 'pointer' : 'default',
                  perspective: 1000,
                  perspectiveOrigin: '50% 50%',
                  transformStyle: 'preserve-3d',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
              >
                {/* card aspect ratio box */}
                <div
                  style={{
                    position: 'relative',
                    paddingBottom: '128%',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* ── BACK / BASE LAYER ── */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 'clamp(14px,4vw,22px)',
                      background:
                        'linear-gradient(145deg,#521826 0%,#3e1020 55%,#2e0c18 100%)',
                      boxShadow:
                        '0 60px 120px rgba(0,0,0,.75), 0 0 0 1px rgba(212,175,112,.2)',
                      overflow: 'hidden',
                    }}
                  >
                    <svg
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.1,
                      }}
                      viewBox='0 0 400 512'
                      preserveAspectRatio='none'
                    >
                      <line
                        x1='0'
                        y1='0'
                        x2='200'
                        y2='210'
                        stroke='#d4af70'
                        strokeWidth='.8'
                      />
                      <line
                        x1='400'
                        y1='0'
                        x2='200'
                        y2='210'
                        stroke='#d4af70'
                        strokeWidth='.8'
                      />
                      <line
                        x1='0'
                        y1='512'
                        x2='200'
                        y2='210'
                        stroke='#d4af70'
                        strokeWidth='.8'
                      />
                      <line
                        x1='400'
                        y1='512'
                        x2='200'
                        y2='210'
                        stroke='#d4af70'
                        strokeWidth='.8'
                      />
                    </svg>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 10,
                        borderRadius: 14,
                        border: '1px solid rgba(212,175,112,.22)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 18,
                        borderRadius: 10,
                        border: '1px solid rgba(212,175,112,.08)',
                      }}
                    />
                    {/* corner roses */}
                    <div style={{ position: 'absolute', top: 8, left: 8 }}>
                      <RoseIcon s={42} op={0.28} />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        transform: 'scaleX(-1)',
                      }}
                    >
                      <RoseIcon s={42} op={0.28} />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        transform: 'scaleY(-1)',
                      }}
                    >
                      <RoseIcon s={42} op={0.28} />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        transform: 'scale(-1)',
                      }}
                    >
                      <RoseIcon s={42} op={0.28} />
                    </div>
                    {/* diamond bottom strip */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 44,
                        borderTop: '1px solid rgba(212,175,112,.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                      }}
                    >
                      {Array.from({ length: 7 }).map((_, i) => (
                        <Diamond key={i} size={6} opacity={0.28} />
                      ))}
                    </div>
                    {/* center label */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                        padding: '0 24px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 'clamp(12px,3.5vw,14px)',
                          fontStyle: 'italic',
                          color: 'rgba(255,210,190,.38)',
                          letterSpacing: 2,
                          textAlign: 'center',
                          margin: 0,
                        }}
                      >
                        Together with their families
                      </p>
                      <WaxSeal sealRef={sealRef} />
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 'clamp(12px,3.5vw,14px)',
                          fontStyle: 'italic',
                          color: 'rgba(255,200,175,.35)',
                          textAlign: 'center',
                          lineHeight: 1.9,
                          margin: 0,
                        }}
                      >
                        Esta invitación es
                        <br />
                        exclusiva para ti
                      </p>
                    </div>
                  </div>

                  {/* ── LEFT PAGE (flips open) ── */}
                  <div
                    ref={leftPageRef}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 'clamp(14px,4vw,22px)',
                      transformOrigin: '100% 50%',
                      transform: 'rotateY(0deg)',
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      zIndex: 2,
                      overflow: 'hidden',
                      background:
                        'linear-gradient(145deg,#6a2234 0%,#521828 60%,#3e1020 100%)',
                      boxShadow: '4px 0 30px rgba(0,0,0,.55)',
                    }}
                  >
                    <svg
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.08,
                      }}
                      viewBox='0 0 400 512'
                      preserveAspectRatio='none'
                    >
                      <line
                        x1='0'
                        y1='0'
                        x2='200'
                        y2='210'
                        stroke='#d4af70'
                        strokeWidth='.8'
                      />
                      <line
                        x1='400'
                        y1='0'
                        x2='200'
                        y2='210'
                        stroke='#d4af70'
                        strokeWidth='.8'
                      />
                      <line
                        x1='0'
                        y1='512'
                        x2='200'
                        y2='210'
                        stroke='#d4af70'
                        strokeWidth='.8'
                      />
                      <line
                        x1='400'
                        y1='512'
                        x2='200'
                        y2='210'
                        stroke='#d4af70'
                        strokeWidth='.8'
                      />
                    </svg>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 10,
                        borderRadius: 14,
                        border: '1px solid rgba(212,175,112,.2)',
                      }}
                    />
                    <div style={{ position: 'absolute', top: 8, left: 8 }}>
                      <RoseIcon s={42} op={0.26} />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        transform: 'scaleX(-1)',
                      }}
                    >
                      <RoseIcon s={42} op={0.26} />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        transform: 'scaleY(-1)',
                      }}
                    >
                      <RoseIcon s={42} op={0.26} />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        transform: 'scale(-1)',
                      }}
                    >
                      <RoseIcon s={42} op={0.26} />
                    </div>
                    {/* spine edge glow */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 3,
                        bottom: 0,
                        background:
                          'linear-gradient(to left,rgba(212,175,112,.35),transparent)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 12,
                        padding: '0 24px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 'clamp(12px,3.5vw,14px)',
                          fontStyle: 'italic',
                          color: 'rgba(255,210,190,.36)',
                          textAlign: 'center',
                          margin: 0,
                          letterSpacing: 2,
                        }}
                      >
                        Together with their families
                      </p>
                      <div
                        style={{
                          position: 'relative',
                          width: 100,
                          height: 100,
                          flexShrink: 0,
                        }}
                      >
                        <svg viewBox='0 0 120 120' width='100' height='100'>
                          <circle cx='60' cy='60' r='52' fill='#d4a882' />
                          <circle cx='60' cy='60' r='44' fill='#c49a7a' />
                          <circle cx='60' cy='60' r='32' fill='#dbb898' />
                        </svg>
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Great Vibes',cursive",
                              fontSize: 14,
                              color: '#6a4c2a',
                              lineHeight: 1,
                            }}
                          >
                            A
                          </span>
                          <span
                            style={{
                              fontFamily: "'Cormorant Garamond',serif",
                              fontSize: 8,
                              color: '#6a4c2a',
                              letterSpacing: 2,
                            }}
                          >
                            &amp;
                          </span>
                          <span
                            style={{
                              fontFamily: "'Great Vibes',cursive",
                              fontSize: 14,
                              color: '#6a4c2a',
                              lineHeight: 1,
                            }}
                          >
                            S
                          </span>
                        </div>
                      </div>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 'clamp(12px,3.5vw,14px)',
                          fontStyle: 'italic',
                          color: 'rgba(255,200,175,.33)',
                          textAlign: 'center',
                          lineHeight: 1.9,
                          margin: 0,
                        }}
                      >
                        Esta invitación es
                        <br />
                        exclusiva para ti
                      </p>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 44,
                        borderTop: '1px solid rgba(212,175,112,.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                      }}
                    >
                      {Array.from({ length: 7 }).map((_, i) => (
                        <Diamond key={i} size={6} opacity={0.24} />
                      ))}
                    </div>
                  </div>

                  {/* ── RIGHT HALF (stays, shows inner content peeking) ── */}
                  <div
                    ref={rightPageRef}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1,
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>
            )}

            {/* tap hint */}
            {cardPhase === 'idle' && (
              <p
                style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 'clamp(9px,2.4vw,11px)',
                  letterSpacing: '.38em',
                  textTransform: 'uppercase',
                  color: 'rgba(212,175,112,.38)',
                  marginTop: 22,
                  animation: 'tapPulse 2s ease-in-out infinite',
                  textAlign: 'center',
                }}
              >
                ✦ Tap to Open ✦
              </p>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          OPENED — full content
      ══════════════════════════════════════════════════════ */}
      {opened && (
        <>
          {/* ── NAMES (full-screen panel) ── */}
          <section
            ref={namesRef}
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100vw',
              minHeight: '140dvh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(80px,14vw,140px) 24px clamp(80px,14vw,120px)',
              textAlign: 'center',
              overflow: 'hidden',
              background:
                'linear-gradient(180deg, rgba(80,10,30,0.18) 0%, transparent 40%, rgba(80,10,30,0.18) 100%)',
            }}
          >
            {/* top border accent line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  'linear-gradient(to right,transparent,rgba(212,175,112,.35),rgba(212,175,112,.6),rgba(212,175,112,.35),transparent)',
              }}
            />
            {/* bottom border accent line */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  'linear-gradient(to right,transparent,rgba(212,175,112,.35),rgba(212,175,112,.6),rgba(212,175,112,.35),transparent)',
              }}
            />

            {/* giant bg rose */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.05,
                pointerEvents: 'none',
              }}
            >
              <RoseIcon s={Math.min(620, window.innerWidth * 1.3)} op={1} />
            </div>
            {/* twin glows */}
            <div
              style={{
                position: 'absolute',
                width: 'min(500px,120vw)',
                height: 'min(500px,120vw)',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle,rgba(160,40,80,.25) 0%,transparent 70%)',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: 'min(400px,100vw)',
                height: 'min(400px,100vw)',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle,rgba(100,20,60,.2) 0%,transparent 70%)',
                bottom: '20%',
                left: '50%',
                transform: 'translate(-50%,0)',
                pointerEvents: 'none',
              }}
            />

            <Reveal dir='scale'>
              <p
                style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 'clamp(9px,2.4vw,11px)',
                  letterSpacing: '.55em',
                  textTransform: 'uppercase',
                  color: 'rgba(212,175,112,.65)',
                  marginBottom: 32,
                  padding: '8px 20px',
                  border: '1px solid rgba(212,175,112,.2)',
                  borderRadius: 50,
                  background: 'rgba(212,175,112,.05)',
                }}
              >
                ✦ &nbsp; You Are Invited &nbsp; ✦
              </p>
            </Reveal>

            {/* GROOM — textTransform uppercase forces capital A */}
            <div
              ref={groomRef}
              style={{
                opacity: 0,
                clipPath: 'inset(0 100% 0 0)',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <h1
                style={{
                  fontFamily: "'Great Vibes',cursive",
                  fontSize: 'clamp(52px,14vw,130px)',
                  color: '#f8dde8',
                  textShadow:
                    '0 0 100px rgba(210,80,120,.65),0 0 40px rgba(210,80,120,.3),0 6px 32px rgba(0,0,0,.65)',
                  lineHeight: 1.5,
                  margin: 0,

                  letterSpacing: 2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                Ashiq rahman
              </h1>
              <p
                style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 'clamp(9px,2.4vw,11px)',
                  letterSpacing: '.45em',
                  textTransform: 'uppercase',
                  color: 'rgba(212,175,112,.5)',
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                Groom
              </p>
            </div>

            {/* ampersand */}
            <div
              ref={ampRef}
              style={{ opacity: 0, margin: 'clamp(20px,5vw,36px) 0' }}
            >
              <GoldLine w={Math.min(80, window.innerWidth * 0.14)} />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 'clamp(22px,6vw,36px)',
                  fontStyle: 'italic',
                  color: 'rgba(212,175,112,.7)',
                  margin: '10px 0',
                  letterSpacing: 6,
                }}
              >
                and
              </p>
              <GoldLine w={Math.min(80, window.innerWidth * 0.14)} />
            </div>

            {/* BRIDE */}
            <div
              ref={brideRef}
              style={{
                opacity: 0,
                clipPath: 'inset(0 0% 0 100%)',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <h1
                style={{
                  fontFamily: "'Great Vibes',cursive",
                  fontSize: 'clamp(52px,14vw,130px)',
                  color: '#f8dde8',
                  textShadow:
                    '0 0 100px rgba(210,80,120,.65),0 0 40px rgba(210,80,120,.3),0 6px 32px rgba(0,0,0,.65)',
                  lineHeight: 1.5,
                  margin: 0,
                  letterSpacing: 2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                shamida
              </h1>
              <p
                style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 'clamp(9px,2.4vw,11px)',
                  letterSpacing: '.45em',
                  textTransform: 'uppercase',
                  color: 'rgba(212,175,112,.5)',
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                Bride
              </p>
            </div>

            <Reveal delay={1.6}>
              <p
                style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 'clamp(10px,2.8vw,13px)',
                  letterSpacing: '.38em',
                  textTransform: 'uppercase',
                  color: 'rgba(212,175,112,.45)',
                  marginTop: 36,
                  padding: '12px 28px',
                  borderTop: '1px solid rgba(212,175,112,.18)',
                  borderBottom: '1px solid rgba(212,175,112,.18)',
                }}
              >
                Are Getting Married · April 5, 2026
              </p>
            </Reveal>

            {/* Scroll cue */}
            <Reveal delay={2}>
              <div
                style={{
                  marginTop: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  opacity: 0.45,
                }}
              >
                <div
                  style={{
                    width: 1,
                    height: 50,
                    background:
                      'linear-gradient(to bottom,transparent,#d4af70)',
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 9,
                    letterSpacing: '.42em',
                    textTransform: 'uppercase',
                    color: '#d4af70',
                    margin: 0,
                  }}
                >
                  scroll
                </p>
              </div>
            </Reveal>
          </section>

          {/* ══ SECTION LABEL HELPER ══ */}
          {/* ── DATE CARD ── */}
          <section
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 'clamp(64px,14vw,100px) 20px',
              background:
                'linear-gradient(180deg,rgba(20,5,14,0.7) 0%,rgba(55,14,30,0.45) 50%,rgba(20,5,14,0.7) 100%)',
              borderTop: '1px solid rgba(212,175,112,.14)',
              borderBottom: '1px solid rgba(212,175,112,.14)',
            }}
          >
            <Reveal>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                  marginBottom: 42,
                }}
              >
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    maxWidth: 70,
                    background:
                      'linear-gradient(to right,transparent,rgba(212,175,112,.45))',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 'clamp(9px,2.5vw,11px)',
                    letterSpacing: '.5em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,112,.75)',
                    padding: '7px 18px',
                    border: '1px solid rgba(212,175,112,.3)',
                    borderRadius: 50,
                    background: 'rgba(212,175,112,.06)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  📅 &nbsp; Date &amp; Venue
                </span>
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    maxWidth: 70,
                    background:
                      'linear-gradient(to left,transparent,rgba(212,175,112,.45))',
                  }}
                />
              </div>
            </Reveal>
            <Reveal dir='scale'>
              <div
                style={{
                  maxWidth: 440,
                  margin: '0 auto',
                  borderRadius: 'clamp(18px,5vw,26px)',
                  padding: 'clamp(32px,9vw,56px) clamp(24px,7vw,48px)',
                  textAlign: 'center',
                  background:
                    'linear-gradient(145deg,rgba(100,24,42,.55),rgba(55,12,24,.75))',
                  border: '1px solid rgba(212,175,112,.28)',
                  backdropFilter: 'blur(28px)',
                  boxShadow:
                    '0 0 60px rgba(160,40,80,.15),0 60px 120px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.05)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(ellipse at 50% 0%,rgba(200,70,100,.16) 0%,transparent 60%)',
                    pointerEvents: 'none',
                  }}
                />
                {[
                  ['top', 'left'],
                  ['top', 'right'],
                  ['bottom', 'left'],
                  ['bottom', 'right'],
                ].map(([v, h]) => (
                  <svg
                    key={`${v}${h}`}
                    viewBox='0 0 28 28'
                    width='28'
                    height='28'
                    style={{
                      position: 'absolute',
                      [v]: 12,
                      [h]: 12,
                      opacity: 0.4,
                    }}
                  >
                    <path
                      d={v === 'top' ? 'M0 20 L0 0 L20 0' : 'M0 8 L0 28 L20 28'}
                      stroke='#d4af70'
                      strokeWidth='1.5'
                      fill='none'
                      transform={
                        h === 'right' ? 'scale(-1,1) translate(-28,0)' : ''
                      }
                    />
                    <circle
                      cx={h === 'left' ? 0 : 20}
                      cy={v === 'top' ? 0 : 28}
                      r='2.5'
                      fill='#d4af70'
                      transform={
                        h === 'right' ? 'scale(-1,1) translate(-28,0)' : ''
                      }
                    />
                  </svg>
                ))}
                <p
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 'clamp(9px,2.4vw,10px)',
                    letterSpacing: '.45em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,112,.55)',
                    marginBottom: 26,
                    marginTop: 0,
                  }}
                >
                  Save the Date
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    gap: 'clamp(16px,5vw,28px)',
                    marginBottom: 24,
                  }}
                >
                  <div>
                    <div
                      className='gold-text'
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 'clamp(60px,17vw,82px)',
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      05
                    </div>
                    <div
                      style={{
                        fontFamily: "'Jost',sans-serif",
                        fontSize: 9,
                        letterSpacing: '.3em',
                        color: 'rgba(212,175,112,.38)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Day
                    </div>
                  </div>
                  <div
                    style={{
                      width: 1,
                      height: 66,
                      background: 'rgba(212,175,112,.2)',
                      marginBottom: 16,
                    }}
                  />
                  <div>
                    <div
                      className='gold-text'
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 'clamp(26px,8vw,36px)',
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      April
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 'clamp(38px,12vw,54px)',
                        fontWeight: 300,
                        color: '#f0d080',
                        lineHeight: 1.1,
                      }}
                    >
                      2026
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: 22 }}>
                  <GoldLine w={44} />
                </div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 'clamp(17px,5.5vw,21px)',
                    color: 'rgba(255,215,205,.75)',
                    marginBottom: 6,
                    marginTop: 0,
                  }}
                >
                  The Grand Ballroom at Villa Nediyachalil
                </p>
                <p
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 'clamp(9px,2.5vw,11px)',
                    letterSpacing: '.22em',
                    color: 'rgba(212,175,112,.4)',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  Ceremony · 4:00 PM · Reception to follow
                </p>
                <div style={{ margin: '22px 0' }}>
                  <GoldLine w={44} />
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  {[
                    ['Dress Code', 'Black Tie'],
                    ['RSVP By', 'Mar 20, 2026'],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <p
                        style={{
                          fontFamily: "'Jost',sans-serif",
                          fontSize: 9,
                          letterSpacing: '.3em',
                          color: 'rgba(212,175,112,.4)',
                          textTransform: 'uppercase',
                          marginBottom: 6,
                          marginTop: 0,
                        }}
                      >
                        {l}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 'clamp(15px,5vw,18px)',
                          color: 'rgba(255,215,200,.7)',
                          margin: 0,
                        }}
                      >
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── COUNTDOWN ── */}
          <section
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 'clamp(70px,15vw,110px) 20px',
              background:
                'linear-gradient(180deg,rgba(60,10,30,0.5) 0%,rgba(80,18,42,0.35) 50%,rgba(60,10,30,0.5) 100%)',
              borderBottom: '1px solid rgba(212,175,112,.14)',
            }}
          >
            {/* ambient glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at 50% 50%,rgba(180,50,90,.12) 0%,transparent 65%)',
                pointerEvents: 'none',
              }}
            />
            <Reveal>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                  marginBottom: 36,
                }}
              >
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    maxWidth: 70,
                    background:
                      'linear-gradient(to right,transparent,rgba(212,175,112,.45))',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 'clamp(9px,2.5vw,11px)',
                    letterSpacing: '.5em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,112,.75)',
                    padding: '7px 18px',
                    border: '1px solid rgba(212,175,112,.3)',
                    borderRadius: 50,
                    background: 'rgba(212,175,112,.06)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ⏳ &nbsp; Counting Down
                </span>
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    maxWidth: 70,
                    background:
                      'linear-gradient(to left,transparent,rgba(212,175,112,.45))',
                  }}
                />
              </div>
              <p
                style={{
                  textAlign: 'center',
                  fontFamily: "'Great Vibes',cursive",
                  fontSize: 'clamp(30px,10vw,48px)',
                  color: 'rgba(255,215,205,.5)',
                  marginBottom: 40,
                  marginTop: 0,
                }}
              >
                Until the blessed day
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <Countdown targetDate='2026-04-05T16:00:00' />
            </Reveal>
            <Reveal delay={0.4}>
              <p
                style={{
                  textAlign: 'center',
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 'clamp(14px,4vw,17px)',
                  fontStyle: 'italic',
                  color: 'rgba(255,200,180,.35)',
                  marginTop: 36,
                  marginBottom: 0,
                }}
              >
                April 5, 2026 · 4:00 PM
              </p>
            </Reveal>
          </section>

          {/* ── QUOTE ── */}
          <section
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 'clamp(60px,14vw,90px) 28px',
              textAlign: 'center',
              background:
                'linear-gradient(180deg,rgba(20,5,14,0.6) 0%,rgba(40,10,24,0.4) 50%,rgba(20,5,14,0.6) 100%)',
              borderBottom: '1px solid rgba(212,175,112,.1)',
            }}
          >
            <Reveal>
              <div style={{ maxWidth: 380, margin: '0 auto' }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 64,
                    color: 'rgba(212,175,112,.2)',
                    lineHeight: 0.5,
                  }}
                >
                  "
                </div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 'clamp(18px,6vw,24px)',
                    fontStyle: 'italic',
                    color: 'rgba(255,200,190,.52)',
                    lineHeight: 1.85,
                    margin: '16px 0',
                  }}
                >
                  And among His signs is that He created for you mates from
                  among yourselves, that you may dwell in tranquility with them,
                  and He placed love and mercy between you.
                  <br />
                  <br />— Surah Ar-Rum, 30:21
                </p>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 64,
                    color: 'rgba(212,175,112,.2)',
                    transform: 'rotate(180deg)',
                    lineHeight: 0.5,
                  }}
                >
                  "
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── TIMELINE ── */}
          <section
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 'clamp(64px,14vw,100px) 20px',
              background:
                'linear-gradient(180deg,rgba(55,14,30,0.5) 0%,rgba(70,18,36,0.35) 50%,rgba(55,14,30,0.5) 100%)',
              borderBottom: '1px solid rgba(212,175,112,.14)',
            }}
          >
            <Reveal>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                  marginBottom: 48,
                }}
              >
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    maxWidth: 70,
                    background:
                      'linear-gradient(to right,transparent,rgba(212,175,112,.45))',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 'clamp(9px,2.5vw,11px)',
                    letterSpacing: '.5em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,112,.75)',
                    padding: '7px 18px',
                    border: '1px solid rgba(212,175,112,.3)',
                    borderRadius: 50,
                    background: 'rgba(212,175,112,.06)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  🤲 &nbsp; The Day's Events
                </span>
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    maxWidth: 70,
                    background:
                      'linear-gradient(to left,transparent,rgba(212,175,112,.45))',
                  }}
                />
              </div>
            </Reveal>
            <div style={{ maxWidth: 440, margin: '0 auto' }}>
              {[
                [
                  '4:00 PM',
                  'Wedding Ceremony',
                  'Exchange of vows in the garden chapel',
                  '🌸',
                ],
                [
                  '5:30 PM',
                  'Family Gathering',
                  'Warm greetings, blessings & cherished moments with loved ones',
                  '🤲',
                ],
                [
                  '7:00 PM',
                  'Walima Dinner',
                  'A traditional feast — come hungry, leave with full hearts',
                  '🍽️',
                ],
                [
                  '9:00 PM',
                  'Celebration & Duas',
                  'Heartfelt prayers, joy and blessings for the couple',
                  '✨',
                ],
              ].map(([time, title, desc, icon], i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <div
                    style={{
                      display: 'flex',
                      gap: 'clamp(14px,4vw,20px)',
                      marginBottom: 'clamp(24px,6vw,36px)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexShrink: 0,
                        paddingTop: 4,
                      }}
                    >
                      <div
                        style={{
                          width: 'clamp(44px,12vw,52px)',
                          height: 'clamp(44px,12vw,52px)',
                          borderRadius: '50%',
                          background: 'rgba(212,175,112,.09)',
                          border: '1px solid rgba(212,175,112,.32)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 'clamp(18px,5vw,22px)',
                          boxShadow: '0 0 20px rgba(212,175,112,.12)',
                        }}
                      >
                        {icon}
                      </div>
                      {i < 3 && (
                        <div
                          style={{
                            width: 1,
                            flex: 1,
                            background: 'rgba(212,175,112,.14)',
                            marginTop: 8,
                          }}
                        />
                      )}
                    </div>
                    <div style={{ paddingBottom: 20 }}>
                      <p
                        style={{
                          fontFamily: "'Jost',sans-serif",
                          fontSize: 'clamp(8px,2.2vw,10px)',
                          letterSpacing: '.32em',
                          color: 'rgba(212,175,112,.5)',
                          textTransform: 'uppercase',
                          marginBottom: 5,
                          marginTop: 0,
                        }}
                      >
                        {time}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 'clamp(18px,5.8vw,23px)',
                          color: 'rgba(255,218,208,.86)',
                          marginBottom: 5,
                          marginTop: 0,
                        }}
                      >
                        {title}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Jost',sans-serif",
                          fontSize: 'clamp(11px,3.5vw,14px)',
                          fontWeight: 300,
                          color: 'rgba(212,175,112,.4)',
                          margin: 0,
                          lineHeight: 1.6,
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── OUR STORY ── */}
          <section
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 'clamp(64px,14vw,100px) 20px',
              background:
                'linear-gradient(180deg,rgba(20,5,14,0.65) 0%,rgba(45,12,28,0.4) 50%,rgba(20,5,14,0.65) 100%)',
              borderBottom: '1px solid rgba(212,175,112,.14)',
            }}
          >
            <Reveal>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                  marginBottom: 40,
                }}
              >
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    maxWidth: 70,
                    background:
                      'linear-gradient(to right,transparent,rgba(212,175,112,.45))',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 'clamp(9px,2.5vw,11px)',
                    letterSpacing: '.5em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,112,.75)',
                    padding: '7px 18px',
                    border: '1px solid rgba(212,175,112,.3)',
                    borderRadius: 50,
                    background: 'rgba(212,175,112,.06)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  💫 &nbsp; Our Story
                </span>
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    maxWidth: 70,
                    background:
                      'linear-gradient(to left,transparent,rgba(212,175,112,.45))',
                  }}
                />
              </div>
            </Reveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(12px,3.5vw,20px)',
                maxWidth: 500,
                margin: '0 auto',
                width: '100%',
              }}
            >
              {[
                {
                  label: 'Met',
                  year: '2019',
                  icon: '💫',
                  desc: 'First glance',
                },
                {
                  label: 'Engaged',
                  year: '2025',
                  icon: '💍',
                  desc: 'He said yes',
                },
                {
                  label: 'Forever',
                  year: '2026',
                  icon: '🌹',
                  desc: 'A new chapter',
                },
              ].map(({ label, year, icon, desc }, i) => (
                <Reveal
                  key={i}
                  delay={i * 0.14}
                  dir='scale'
                  className='story-card-cell'
                >
                  <div
                    style={{
                      width: '100%',
                      borderRadius: 'clamp(16px,5vw,22px)',
                      padding: 'clamp(20px,6vw,30px) clamp(12px,3.5vw,18px)',
                      textAlign: 'center',
                      background:
                        'linear-gradient(145deg,rgba(100,24,42,.42),rgba(55,12,24,.62))',
                      border: '1px solid rgba(212,175,112,.2)',
                      boxShadow:
                        '0 20px 50px rgba(0,0,0,.35),0 0 0 1px rgba(212,175,112,.05) inset',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 'clamp(26px,8vw,34px)',
                        marginBottom: 10,
                      }}
                    >
                      {icon}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Great Vibes',cursive",
                        fontSize: 'clamp(22px,7vw,28px)',
                        color: '#f5dde8',
                        lineHeight: 1.1,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Jost',sans-serif",
                        fontSize: 'clamp(8px,2.2vw,10px)',
                        color: 'rgba(212,175,112,.5)',
                        letterSpacing: '.3em',
                        marginTop: 6,
                        marginBottom: 6,
                        textTransform: 'uppercase',
                      }}
                    >
                      {year}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 'clamp(11px,3.5vw,13px)',
                        fontStyle: 'italic',
                        color: 'rgba(255,200,185,.38)',
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── GOOGLE MAP ── */}
          <section
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 'clamp(64px,14vw,100px) 20px',
              background:
                'linear-gradient(180deg,rgba(55,14,30,0.5) 0%,rgba(70,18,36,0.35) 50%,rgba(55,14,30,0.5) 100%)',
              borderBottom: '1px solid rgba(212,175,112,.14)',
            }}
          >
            <Reveal>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                  marginBottom: 36,
                }}
              >
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    maxWidth: 70,
                    background:
                      'linear-gradient(to right,transparent,rgba(212,175,112,.45))',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 'clamp(9px,2.5vw,11px)',
                    letterSpacing: '.5em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,112,.75)',
                    padding: '7px 18px',
                    border: '1px solid rgba(212,175,112,.3)',
                    borderRadius: 50,
                    background: 'rgba(212,175,112,.06)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  📍 &nbsp; Find Us
                </span>
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    maxWidth: 70,
                    background:
                      'linear-gradient(to left,transparent,rgba(212,175,112,.45))',
                  }}
                />
              </div>
              <p
                style={{
                  textAlign: 'center',
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 'clamp(18px,6vw,24px)',
                  color: 'rgba(255,215,200,.55)',
                  fontStyle: 'italic',
                  marginBottom: 6,
                  marginTop: 0,
                }}
              >
                Villa Rosa Ballroom
              </p>
              <p
                style={{
                  textAlign: 'center',
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 'clamp(9px,2.5vw,11px)',
                  letterSpacing: '.25em',
                  color: 'rgba(212,175,112,.32)',
                  textTransform: 'uppercase',
                  marginBottom: 32,
                }}
              >
                Your Venue Address Here
              </p>
            </Reveal>
            <Reveal delay={0.12} dir='scale'>
              <div style={{ maxWidth: 600, margin: '0 auto' }}>
                <div
                  style={{
                    borderRadius: 'clamp(18px,5vw,24px)',
                    overflow: 'hidden',
                    boxShadow:
                      '0 0 0 1px rgba(212,175,112,.25),0 60px 120px rgba(0,0,0,.6),0 0 60px rgba(160,40,80,.12)',
                  }}
                >
                  {/* ↓ Replace with your real Google Maps embed URL ↓ */}

                  <iframe
                    title='Venue'
                    src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d244.34491812352195!2d75.6168289!3d11.5146021!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba68f4d4b6bdf7b%3A0x9a6ba0109a816103!2sExcellent%20Driving%20School%20Payyoli!5e0!3m2!1sen!2sin!4v1772432022196!5m2!1sen!2sin'
                    width='100%'
                    height='340'
                    style={{
                      border: 0,
                      display: 'block',
                      filter:
                        'hue-rotate(310deg) saturate(.45) brightness(.65)',
                    }}
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                  />
                </div>
                <div style={{ textAlign: 'center', marginTop: 22 }}>
                  {/* ↓ Replace href with your real venue link ↓ */}
                  <a
                    href='https://maps.app.goo.gl/63CnD2jCLCMfYhSB9'
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 9,
                      padding: 'clamp(13px,3.5vw,16px) clamp(26px,7vw,36px)',
                      borderRadius: 50,
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 'clamp(9px,2.5vw,11px)',
                      letterSpacing: '.3em',
                      textTransform: 'uppercase',
                      color: '#d4af70',
                      border: '1px solid rgba(212,175,112,.32)',
                      textDecoration: 'none',
                      transition: 'all .3s ease',
                      background: 'rgba(212,175,112,.04)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        'rgba(212,175,112,.12)';
                      e.currentTarget.style.boxShadow =
                        '0 0 30px rgba(212,175,112,.18)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        'rgba(212,175,112,.04)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <svg
                      viewBox='0 0 24 24'
                      width='13'
                      height='13'
                      fill='currentColor'
                    >
                      <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
                    </svg>
                    Get Directions
                  </a>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── RSVP ── */}
          <section
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 'clamp(70px,15vw,110px) 20px',
              textAlign: 'center',
              background:
                'linear-gradient(180deg,rgba(20,5,14,0.65) 0%,rgba(70,16,40,0.4) 50%,rgba(20,5,14,0.65) 100%)',
            }}
          >
            <Reveal>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                  marginBottom: 44,
                }}
              >
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    maxWidth: 70,
                    background:
                      'linear-gradient(to right,transparent,rgba(212,175,112,.45))',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 'clamp(9px,2.5vw,11px)',
                    letterSpacing: '.5em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,112,.75)',
                    padding: '7px 18px',
                    border: '1px solid rgba(212,175,112,.3)',
                    borderRadius: 50,
                    background: 'rgba(212,175,112,.06)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  💌 &nbsp; RSVP
                </span>
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    maxWidth: 70,
                    background:
                      'linear-gradient(to left,transparent,rgba(212,175,112,.45))',
                  }}
                />
              </div>
            </Reveal>
            <Reveal dir='scale'>
              <div
                style={{
                  maxWidth: 420,
                  margin: '0 auto',
                  borderRadius: 'clamp(20px,6vw,30px)',
                  padding: 'clamp(36px,10vw,60px) clamp(24px,8vw,48px)',
                  background:
                    'linear-gradient(145deg,rgba(100,24,42,.65),rgba(55,12,24,.85))',
                  border: '1px solid rgba(212,175,112,.26)',
                  boxShadow:
                    '0 0 120px rgba(140,30,65,.3),0 70px 140px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.04)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(ellipse at 50% 0%,rgba(200,70,100,.2) 0%,transparent 62%)',
                    pointerEvents: 'none',
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 'clamp(9px,2.5vw,10px)',
                    letterSpacing: '.45em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,112,.5)',
                    marginBottom: 14,
                  }}
                >
                  Kindly Reply
                </p>
                <h3
                  style={{
                    fontFamily: "'Great Vibes',cursive",
                    fontSize: 'clamp(42px,13vw,60px)',
                    color: '#f8dde8',
                    textShadow: '0 0 60px rgba(200,80,120,.5)',
                    lineHeight: 1.1,
                    margin: '0 0 20px',
                  }}
                >
                  Will you
                  <br />
                  join us?
                </h3>
                <div style={{ margin: '18px 0' }}>
                  <GoldLine w={36} />
                </div>
                <p
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 'clamp(10px,3vw,13px)',
                    fontWeight: 300,
                    color: 'rgba(212,175,112,.4)',
                    letterSpacing: '.1em',
                    marginBottom: 32,
                  }}
                >
                  Please respond by March 20, 2026
                </p>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
                >
                  <button
                    style={{
                      width: '100%',
                      padding: 'clamp(15px,4.5vw,19px)',
                      borderRadius: 50,
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 'clamp(10px,3vw,12px)',
                      letterSpacing: '.32em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      background:
                        'linear-gradient(135deg,#c8a44a,#f0d485,#c8a44a)',
                      backgroundSize: '200% auto',
                      color: '#3a2010',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 14px 40px rgba(212,175,112,.32)',
                      transition: 'transform .2s,box-shadow .2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        'translateY(-3px) scale(1.02)';
                      e.currentTarget.style.boxShadow =
                        '0 22px 55px rgba(212,175,112,.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow =
                        '0 14px 40px rgba(212,175,112,.32)';
                    }}
                    onTouchStart={(e) =>
                      (e.currentTarget.style.transform = 'scale(.97)')
                    }
                    onTouchEnd={(e) =>
                      (e.currentTarget.style.transform = 'none')
                    }
                  >
                    ✦ Joyfully Accept ✦
                  </button>
                  <button
                    style={{
                      width: '100%',
                      padding: 'clamp(15px,4.5vw,19px)',
                      borderRadius: 50,
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 'clamp(10px,3vw,12px)',
                      letterSpacing: '.32em',
                      textTransform: 'uppercase',
                      background: 'transparent',
                      color: 'rgba(212,175,112,.45)',
                      border: '1px solid rgba(212,175,112,.2)',
                      cursor: 'pointer',
                      transition: 'background .25s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        'rgba(212,175,112,.08)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── FOOTER ── */}
          <footer
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 'clamp(50px,12vw,80px) 20px',
              textAlign: 'center',
              borderTop: '1px solid rgba(212,175,112,.1)',
            }}
          >
            <Reveal>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 14,
                  marginBottom: 20,
                  opacity: 0.15,
                }}
              >
                <RoseIcon s={26} op={1} />
                <RoseIcon s={19} op={1} />
                <RoseIcon s={26} op={1} />
              </div>
              <p
                style={{
                  fontFamily: "'Great Vibes',cursive",
                  fontSize: 'clamp(30px,10vw,42px)',
                  color: 'rgba(212,175,112,.28)',
                  margin: '0 0 10px',
                }}
              >
                Ashiq &amp; shamida
              </p>
              <div
                style={{
                  margin: '12px auto 12px',
                  width: 'min(120px,30vw)',
                  height: 1,
                  background:
                    'linear-gradient(to right,transparent,rgba(212,175,112,.3),transparent)',
                }}
              />
              <p
                style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 'clamp(9px,2.5vw,11px)',
                  letterSpacing: '.5em',
                  textTransform: 'uppercase',
                  color: 'rgba(212,175,112,.18)',
                  margin: 0,
                }}
              >
                April 5, 2026 · With Love
              </p>
            </Reveal>
          </footer>
        </>
      )}
    </div>
  );
}
