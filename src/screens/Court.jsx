// Courthouse
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Court extends Screen {
  static title = 'Court';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const T = [
      {
        name: 'Cases',
        label: 'Cases: 4 open',
        href: 'Cases.dc.html',
        bg: '#FDE3C8',
        badge: '4',
        badgeBg: '#F2CE6E',
        glyph: 'M8 14 H28 L32 20 H56 V50 H8 Z',
        fill: '#E8B53A',
        detail: 'M16 30 H48 M16 38 H40',
        fill2: 'none',
      },
      {
        name: 'Jury duty',
        label: 'Jury duty: Thursday',
        href: 'JuryDuty.dc.html',
        bg: '#F7D6D6',
        badge: 'Thu',
        badgeBg: '#C8553D',
        badgeFg: '#FFFDF8',
        glyph: 'M10 20 H54 V30 H10 Z',
        fill: '#8E4129',
        detail:
          'M16 30 V50 M48 30 V50 M18 14 A5 5 0 1 0 18.01 14 M32 12 A5 5 0 1 0 32.01 12 M46 14 A5 5 0 1 0 46.01 14',
        fill2: '#A8714A',
      },
      {
        name: 'Settlers',
        label: 'Settlers: 3 available',
        href: 'Settlers.dc.html',
        bg: '#E3F0DF',
        badge: '3',
        badgeBg: '#8FC1A9',
        glyph: 'M6 34 L18 24 H30 L36 28 H24',
        fill: '#FDE3C8',
        detail: 'M6 34 V46 H18 L40 36 L54 28 C51 24 47 24 43 27 L34 32 M42 14 A6 6 0 1 0 42.01 14',
        fill2: '#F2CE6E',
      },
      {
        name: 'Verdicts',
        label: 'Verdicts: public record, 12 this season',
        href: 'Verdicts.dc.html',
        bg: '#2F3E5C',
        fg: '#FFFDF8',
        badge: '12',
        badgeBg: '#FFFDF8',
        glyph: 'M10 34 L30 14 L38 22 L18 42 Z',
        fill: '#F2CE6E',
        detail: 'M26 10 L42 26 M6 50 H46 M14 44 H38',
        fill2: 'none',
      },
      {
        name: 'Appeals',
        label: 'Appeals: 1 retrial pending',
        href: 'Appeals.dc.html',
        bg: '#EFE4CF',
        badge: '1',
        badgeBg: '#F2CE6E',
        glyph: 'M32 8 A22 22 0 1 1 12 22',
        fill: 'none',
        detail: 'M8 10 L12 22 L24 18 M24 30 L32 36 L44 24',
        fill2: 'none',
      },
      {
        name: 'Law register',
        label: 'Law register: 3 new laws',
        bg: '#EFE4CF',
        badge: '3',
        badgeBg: '#FFFDF8',
        href: 'LawRegister.dc.html',
        glyph: 'M12 10 H46 C52 10 52 18 46 18 H18 V50 C18 56 10 56 10 50 V14 C10 12 11 10 12 10 Z',
        fill: '#FFFDF8',
        detail: 'M18 18 H52 V46 C52 52 46 52 46 52 H14 M26 28 H44 M26 36 H44 M26 44 H38',
        fill2: 'none',
      },
    ];
    const tiles = T.map((t) => ({
      name: t.name,
      label: t.label,
      href: t.href || '#',
      glyph: t.glyph,
      fill: t.fill,
      detail: t.detail,
      fill2: t.fill2,
      badge: t.badge,
      s:
        'position: relative; box-sizing: border-box; border: 3px solid #2A2522; border-radius: 20px; background: ' +
        t.bg +
        '; color: ' +
        (t.fg || '#2A2522') +
        '; box-shadow: 4px 5px 0 #2A2522; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; text-decoration: none;',
      badgeStyle: t.badge
        ? 'position: absolute; top: -10px; right: -8px; min-width: 26px; height: 26px; box-sizing: border-box; padding: 0 7px; border: 3px solid #2A2522; border-radius: 999px; background: ' +
          t.badgeBg +
          '; color: ' +
          (t.badgeFg || '#2A2522') +
          '; font-family: Fredoka, sans-serif; font-size: 12.5px; font-weight: 700; display: flex; align-items: center; justify-content: center;'
        : 'display: none;',
    }));
    const L = [
      ['Talk it out', '#CFE3F4', '#FFFDF8', 'M4 5 H20 V15 H11 L6 19 V15 H4 Z'],
      [
        'Settler',
        '#E3F0DF',
        '#FDE3C8',
        'M3 14 L8 10 H13 L16 12 H11 M3 14 V19 H8 L17 15 L21 12 C20 10 18 10 16 11',
      ],
      ['Court', '#F7D6D6', '#F2CE6E', 'M12 3 V20 M5 7 H19 M5 7 L2 14 H8 Z M19 7 L16 14 H22 Z M8 20 H16'],
    ];
    const ladder = L.map(([name, bg, fill, glyph], i) => ({
      name,
      bg,
      fill,
      glyph,
      arrow:
        i < L.length - 1
          ? 'font-family: Fredoka, sans-serif; font-size: 18px; font-weight: 700; color: #8E4129;'
          : 'display: none;',
    }));
    return { accent, tiles, ladder };
  }

  render() {
    const vals = this.renderVals();
    return (
      <div
        className="screen"
        style={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          background: '#F5EFE5',
          color: '#2A2522',
          fontFamily: "'Nunito', system-ui, sans-serif",
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <header style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px 10px' }}>
          <ScreenLink
            href="Main.dc.html"
            aria-label="Back to the building"
            style={{
              width: '46px',
              height: '46px',
              flex: 'none',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '14px',
              background: vals.accent,
              boxShadow: '3px 4px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2A2522"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </ScreenLink>

          <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            <h1
              style={{
                margin: '0',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '26px',
                fontWeight: '700',
                lineHeight: '1.1',
              }}
            >
              Courthouse
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Floor 8 · Civic quarter
            </span>
          </div>
        </header>

        {/* Jury duty: the thing that involves you */}

        <ScreenLink
          href="JuryDuty.dc.html"
          aria-label="Jury duty: Case 14, Thursday 2 pm"
          style={{
            textDecoration: 'none',
            margin: '0 20px',
            border: '3px solid #2A2522',
            borderRadius: '22px',
            background: '#2A2522',
            color: '#FFFDF8',
            boxShadow: '4px 5px 0 #8E4129',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <svg width="72" height="66" viewBox="0 0 64 58" aria-hidden="true" style={{ flex: 'none' }}>
            <path d="M32 6 V48" stroke="#F2CE6E" strokeWidth="4" strokeLinecap="round" />

            <path d="M12 14 H52" stroke="#F2CE6E" strokeWidth="4" strokeLinecap="round" />

            <path
              d="M12 14 L4 32 H20 Z M52 14 L44 32 H60 Z"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />

            <path
              d="M4 32 A8 4 0 0 0 20 32 M44 32 A8 4 0 0 0 60 32"
              fill="#F2CE6E"
              stroke="#2A2522"
              strokeWidth="2.6"
            />

            <rect
              x="20"
              y="48"
              width="24"
              height="7"
              rx="2"
              fill="#8E4129"
              stroke="#F5EFE5"
              strokeWidth="2"
            />

            <circle cx="32" cy="6" r="4" fill="#F2CE6E" stroke="#2A2522" strokeWidth="2" />
          </svg>

          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '.05em', color: '#F2CE6E' }}>
              YOU'RE ON THE JURY
            </span>

            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '20px',
                fontWeight: '700',
                lineHeight: '1.1',
              }}
            >
              Case 14 · Thursday 2 pm
            </span>

            <span style={{ fontSize: '12.5px', fontWeight: '700', opacity: '.85' }}>
              An unfinished gig. No trading on it while you serve.
            </span>
          </div>
        </ScreenLink>

        {/* Menu */}

        <nav
          aria-label="Court"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(3, 100px) 80px',
            gap: '12px',
            padding: '18px 20px 0',
          }}
        >
          {vals.tiles.map((t, $index) => (
            <ScreenLink key={$index} href={t.href} aria-label={t.label} style={css(t.s)}>
              <svg width="58" height="52" viewBox="0 0 64 58" aria-hidden="true">
                <path
                  d={t.glyph}
                  fill={t.fill}
                  stroke="#2A2522"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={t.detail}
                  fill={t.fill2}
                  stroke="#2A2522"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15.5px', fontWeight: '600' }}>
                {t.name}
              </span>

              <span style={css(t.badgeStyle)}>{t.badge}</span>
            </ScreenLink>
          ))}

          <ScreenLink
            href="Constitution.dc.html"
            aria-label="The Constitution: 6 articles, set by the Admin"
            style={{
              gridColumn: '1 / -1',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#F3E1B4',
              color: '#2A2522',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '0 16px',
              textDecoration: 'none',
            }}
          >
            <svg width="62" height="50" viewBox="0 0 64 50" aria-hidden="true" style={{ flex: 'none' }}>
              <path d="M14 13 H50 V37 H14 Z" fill="#FBF1D6" stroke="#2A2522" strokeWidth="3" />

              <path
                d="M20 20 H44 M20 26 H44 M20 32 H34"
                stroke="#8E4129"
                strokeWidth="2.4"
                strokeLinecap="round"
              />

              <rect
                x="8"
                y="4"
                width="48"
                height="10"
                rx="5"
                fill="#C08A5B"
                stroke="#2A2522"
                strokeWidth="3"
              />

              <rect
                x="8"
                y="36"
                width="48"
                height="10"
                rx="5"
                fill="#C08A5B"
                stroke="#2A2522"
                strokeWidth="3"
              />

              <circle cx="47" cy="34" r="7" fill="#C8553D" stroke="#2A2522" strokeWidth="2.4" />
            </svg>

            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '18px',
                  fontWeight: '700',
                  lineHeight: '1.1',
                }}
              >
                The Constitution
              </span>

              <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#8E4129' }}>
                6 articles · set by the Admin
              </span>
            </div>

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2A2522"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ flex: 'none' }}
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </ScreenLink>
        </nav>

        <div style={{ flex: '1', minHeight: '12px' }} />

        {/* Take someone to court, with the path most disputes take first */}

        <ScreenLink
          href="TakeToCourt.dc.html"
          aria-label="Take someone to court"
          style={{
            margin: '0 20px 22px',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '11px 14px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '9px',
            textDecoration: 'none',
            color: '#2A2522',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="40" height="38" viewBox="0 0 64 58" aria-hidden="true" style={{ flex: 'none' }}>
              <path
                d="M10 46 L34 22 L42 30 L18 54 Z"
                fill="#C08A5B"
                stroke="#2A2522"
                strokeWidth="3.6"
                strokeLinejoin="round"
              />
              <path
                d="M30 10 L46 26 L52 20 L36 4 Z"
                fill="#8E4129"
                stroke="#2A2522"
                strokeWidth="3.6"
                strokeLinejoin="round"
              />
            </svg>

            <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '17px',
                  fontWeight: '700',
                  lineHeight: '1.1',
                }}
              >
                Take someone to court
              </span>

              <span style={{ fontSize: '12px', fontWeight: '700', color: '#5E564D' }}>
                Most disputes settle before they get here
              </span>
            </div>

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2A2522"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ flex: 'none' }}
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div
            style={{
              borderTop: '2px dashed #2A2522',
              paddingTop: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {vals.ladder.map((l, $index) => (
              <div key={$index} style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: '1' }}>
                <div
                  style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3px',
                  }}
                >
                  <span
                    style={{
                      width: '34px',
                      height: '34px',
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '50%',
                      background: l.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d={l.glyph}
                        fill={l.fill}
                        stroke="#2A2522"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <span
                    style={{ fontSize: '11.5px', fontWeight: '800', textAlign: 'center', lineHeight: '1.1' }}
                  >
                    {l.name}
                  </span>
                </div>

                <span style={css(l.arrow)}>→</span>
              </div>
            ))}
          </div>
        </ScreenLink>
      </div>
    );
  }
}
