/*animation*/
const { animate, stagger, splitText } = anime;

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const { chars } = splitText('h1', { words: false, chars: true });

  animate(chars, {
    y: [
      { to: '-2.75rem', ease: 'outExpo', duration: 600 },
      { to: 0, ease: 'outBounce', duration: 800, delay: 500 }
    ],
    rotate: {
      from: '-1turn',
      delay: 0
    },
    delay: stagger(50),
    ease: 'inOutCirc',
    loopDelay: 1000,
    loop: true
  });
}