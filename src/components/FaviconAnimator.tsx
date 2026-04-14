import { useEffect } from 'react';

const FaviconAnimator = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mediaQuery?.matches) return;

    const encodeSVG = (svgString: string) => {
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
    };

    const bg = `<rect width="128" height="128" rx="30" fill="#1a1a1a" />`;
    const border = `<rect x="4" y="4" width="120" height="120" rx="26" fill="none" stroke="#eab308" stroke-width="4" stroke-opacity="0.5" />`;
    const text = `<text x="64" y="86" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="75" fill="#eab308" text-anchor="middle" style="letter-spacing:-2px">DO</text>`;
    const lineBack = `<line x1="20" y1="64" x2="108" y2="64" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round" />`;
    const lineFront = `<line x1="24" y1="64" x2="104" y2="64" stroke="#eab308" stroke-width="3" stroke-linecap="round" />`;

    const getFrame = (sparkCx: number | null, intensity: number = 0) => {
      const clamped = Math.max(0, Math.min(1, intensity));
      let spark = '';

      if (sparkCx !== null) {
        const coreR = 3.5 + clamped * 2;
        const glowR = 10 + clamped * 6;
        const glowOpacity = clamped * 0.6;
        const coreOpacity = Math.min(1, clamped * 1.1);

        spark = `
          <g>
            <line x1="${sparkCx - 10}" y1="64" x2="${sparkCx + 10}" y2="64" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-opacity="${clamped * 0.35}" />
            <circle cx="${sparkCx}" cy="64" r="${glowR}" fill="#fbbf24" fill-opacity="${glowOpacity}" />
            <circle cx="${sparkCx}" cy="64" r="${coreR}" fill="white" fill-opacity="${coreOpacity}" />
          </g>
        `;
      }

      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
          ${bg}
          ${border}
          ${text}
          ${lineBack}
          ${lineFront}
          ${spark}
        </svg>
      `.trim().replace(/\s+/g, ' ');

      return encodeSVG(svg);
    };

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const buildFrames = () => {
      const frames: string[] = [];

      const pushPause = (count: number) => {
        for (let i = 0; i < count; i++) frames.push(getFrame(null));
      };

      pushPause(10);

      const sparkStartX = 30;
      const sparkEndX = 98;
      const steps: number = 16;

      for (let i = 0; i < steps; i++) {
        const t = steps === 1 ? 1 : i / (steps - 1);
        const eased = easeInOutCubic(t);
        const cx = Math.round(lerp(sparkStartX, sparkEndX, eased));
        const intensity = Math.sin(Math.PI * t);
        frames.push(getFrame(cx, intensity));
      }

      pushPause(12);

      return frames;
    };

    const frames = buildFrames();

    const iconLinks = Array.from(
      document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']")
    );

    if (iconLinks.length === 0) {
      const link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
      iconLinks.push(link);
    }

    const originalHrefs = iconLinks.map((l) => l.getAttribute('href'));

    let currentFrameIndex = 0;
    let lastHref = '';

    const applyHref = (href: string) => {
      if (href === lastHref) return;
      iconLinks.forEach((link) => link.setAttribute('href', href));
      lastHref = href;
    };

    const updateFavicon = () => {
      applyHref(frames[currentFrameIndex]);
      currentFrameIndex = (currentFrameIndex + 1) % frames.length;
    };

    const frameMs = 120;
    let intervalId: number | undefined;

    const start = () => {
      if (intervalId !== undefined) return;
      updateFavicon();
      intervalId = window.setInterval(updateFavicon, frameMs);
    };

    const stop = () => {
      if (intervalId === undefined) return;
      window.clearInterval(intervalId);
      intervalId = undefined;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    start();

    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      iconLinks.forEach((link, idx) => {
        const original = originalHrefs[idx];
        if (original) link.setAttribute('href', original);
        else link.removeAttribute('href');
      });
    };
  }, []);

  return null;
};

export default FaviconAnimator;
