import { useLayoutEffect, useState } from 'react';

/** The design's screen size. Screens are laid out for exactly this and scaled as a whole. */
export const SCREEN_W = 390;
export const SCREEN_H = 844;
const PHONE_MAX_W = 480; // at or below this width the screen goes edge-to-edge, without the frame
const BORDER = 3;
const GUTTER = 24;

function fitScale() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w <= PHONE_MAX_W) return { scale: Math.min(w / SCREEN_W, h / SCREEN_H), framed: false };
  const fw = SCREEN_W + BORDER * 2;
  const fh = SCREEN_H + BORDER * 2;
  return { scale: Math.min(1, (w - GUTTER * 2) / fw, (h - GUTTER * 2) / fh), framed: true };
}

/**
 * Holds one screen at the design's fixed 390×844 and scales it to fit the window,
 * so nothing is cropped, pushed out of view or overlapped at any viewport size.
 */
export default function PhoneFrame({ children }) {
  const [{ scale, framed }, setFit] = useState(fitScale);

  useLayoutEffect(() => {
    const update = () => setFit(fitScale());
    update();
    window.addEventListener('resize', update);
    window.visualViewport?.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('resize', update);
    };
  }, []);

  const border = framed ? BORDER : 0;
  return (
    <div className={framed ? 'phone-stage' : 'phone-stage phone-stage--bleed'}>
      <div
        className="phone-slot"
        style={{ width: (SCREEN_W + border * 2) * scale, height: (SCREEN_H + border * 2) * scale }}
      >
        <div
          className={framed ? 'phone-frame' : 'phone-frame phone-frame--bleed'}
          style={{ transform: `scale(${scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
