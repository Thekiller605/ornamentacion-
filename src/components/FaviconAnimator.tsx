import { useEffect } from 'react';

const FaviconAnimator = () => {
  useEffect(() => {
    // Helper to encode SVG for data URI
    const encodeSVG = (svgString: string) => {
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
    };

    // Base SVG parts (minimized for performance)
    const bg = `<rect width="128" height="128" rx="30" fill="%231a1a1a" />`;
    const border = `<rect x="4" y="4" width="120" height="120" rx="26" fill="none" stroke="%23eab308" stroke-width="4" stroke-opacity="0.5" />`;
    const text = `<text x="64" y="86" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="75" fill="%23eab308" text-anchor="middle" style="letter-spacing: -2px">DO</text>`;
    const lineBack = `<line x1="20" y1="64" x2="108" y2="64" stroke="%231a1a1a" stroke-width="6" stroke-linecap="round" />`;
    const lineFront = `<line x1="24" y1="64" x2="104" y2="64" stroke="%23eab308" stroke-width="3" stroke-linecap="round" />`;

    // Function to generate full SVG with spark at specific position
    const getFrame = (sparkCx: number | null, sparkOpacity: number = 0) => {
      let spark = '';
      if (sparkCx !== null) {
        spark = `
          <circle cx="${sparkCx}" cy="64" r="6" fill="white" fill-opacity="${sparkOpacity}" />
          <circle cx="${sparkCx}" cy="64" r="12" fill="%23fbbf24" fill-opacity="${sparkOpacity * 0.6}" />
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

    // Define animation frames: Pause -> Spark Start -> Middle -> End -> Pause
    const frames = [
      getFrame(null),          // Frame 0: Static (Pause)
      getFrame(null),          // Frame 1: Static (Pause)
      getFrame(30, 0.8),       // Frame 2: Spark Start
      getFrame(64, 1),         // Frame 3: Spark Middle
      getFrame(98, 0.8),       // Frame 4: Spark End
      getFrame(null),          // Frame 5: Static (Pause)
    ];

    let currentFrameIndex = 0;
    
    const updateFavicon = () => {
      const links = document.querySelectorAll("link[rel*='icon']");
      const newHref = frames[currentFrameIndex];
      
      links.forEach(link => {
        link.setAttribute('href', newHref);
      });

      currentFrameIndex = (currentFrameIndex + 1) % frames.length;
    };

    // Start animation loop (400ms per frame)
    const intervalId = setInterval(updateFavicon, 400);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
      // Restore original static favicon
      const links = document.querySelectorAll("link[rel*='icon']");
      links.forEach(link => {
        link.setAttribute('href', '/favicon.svg?v=4');
      });
    };
  }, []);

  return null; // This component doesn't render anything in the DOM
};

export default FaviconAnimator;