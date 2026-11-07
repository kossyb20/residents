// Council hall
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Council extends Screen {
  static title = 'Council';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const T = [
      {
        name: 'Agenda',
        label: 'Agenda: 3 items on Thursday',
        href: 'CouncilAgenda.dc.html',
        bg: '#FDE3C8',
        fg: '#2A2522',
        badge: '3',
        badgeBg: '#F2CE6E',
        glyph: 'M14 8 H50 V54 H14 Z',
        fill: '#FFFDF8',
        detail: 'M24 4 H40 V12 H24 Z M21 24 L25 28 L32 20 M36 24 H44 M21 38 L25 42 L32 34 M36 38 H44',
        fill2: '#8E4129',
      },
      {
        name: 'Councillors',
        label: 'Councillors: 5, election in 9 days',
        href: 'Councillors.dc.html',
        bg: '#F7D6D6',
        fg: '#2A2522',
        badge: '9 days',
        badgeBg: '#FFFDF8',
        glyph: 'M20 22 A8 8 0 1 0 20.01 22 Z M44 22 A8 8 0 1 0 44.01 22 Z',
        fill: '#A8714A',
        detail:
          'M6 52 C6 38 34 38 34 52 Z M30 52 C30 38 58 38 58 52 Z M32 6 L35 12 L41 12 L36 16 L38 22 L32 18 L26 22 L28 16 L23 12 L29 12 Z',
        fill2: '#F2CE6E',
      },
      {
        name: 'Petitions',
        label: 'Petitions: 2 open',
        href: 'Petitions.dc.html',
        bg: '#FFFDF8',
        fg: '#2A2522',
        badge: '2',
        badgeBg: '#C8553D',
        badgeFg: '#FFFDF8',
        glyph: 'M8 22 V36 H18 L40 48 V10 L18 22 Z',
        fill: '#F2CE6E',
        detail:
          'M46 18 Q52 29 46 40 M18 36 L22 50 H28 L26 38 M50 8 A4 4 0 1 0 50.01 8 Z M58 16 A4 4 0 1 0 58.01 16 Z',
        fill2: '#C8553D',
      },
      {
        name: 'Treasury',
        label: 'Treasury: 9,400 in this cycle',
        href: 'Treasury.dc.html',
        bg: '#2F3E5C',
        fg: '#FFFDF8',
        badge: '9,400',
        badgeBg: '#8FC1A9',
        glyph: 'M8 24 H56 V52 H8 Z',
        fill: '#8E4129',
        detail:
          'M8 24 L14 12 H50 L56 24 M28 32 H36 V42 H28 Z M22 10 A6 3 0 1 0 22.01 10 M40 8 A6 3 0 1 0 40.01 8',
        fill2: '#F2CE6E',
      },
      {
        name: 'Law register',
        label: 'Law register: the constitution and 3 new laws',
        href: 'LawRegister.dc.html',
        bg: '#EFE4CF',
        fg: '#2A2522',
        badge: '3',
        badgeBg: '#FFFDF8',
        glyph: 'M12 10 H46 C52 10 52 18 46 18 H18 V50 C18 56 10 56 10 50 V14 C10 12 11 10 12 10 Z',
        fill: '#FFFDF8',
        detail: 'M18 18 H52 V46 C52 52 46 52 46 52 H14 M26 28 H44 M26 36 H44 M26 44 H38',
        fill2: 'none',
      },
      {
        name: 'Elections',
        label: 'Elections: council vote in 9 days',
        href: 'Elections.dc.html',
        bg: '#E3F0DF',
        fg: '#2A2522',
        badge: 'Soon',
        badgeBg: '#F2CE6E',
        glyph: 'M8 30 H56 V54 H8 Z',
        fill: '#2F3E5C',
        detail: 'M24 30 V8 H40 V30 M28 14 L32 20 L38 12 M20 40 H44',
        fill2: '#FFFDF8',
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
        t.fg +
        '; box-shadow: 4px 5px 0 #2A2522; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; text-decoration: none;',
      badgeStyle:
        'position: absolute; top: -10px; right: -8px; min-width: 26px; height: 26px; box-sizing: border-box; padding: 0 7px; border: 3px solid #2A2522; border-radius: 999px; background: ' +
        t.badgeBg +
        '; color: ' +
        (t.badgeFg || '#2A2522') +
        '; font-family: Fredoka, sans-serif; font-size: 12.5px; font-weight: 700; display: flex; align-items: center; justify-content: center;',
    }));
    return { accent, tiles };
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
              Council hall
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Floor 8 · Civic quarter
            </span>
          </div>
        </header>

        {/* Next session: the one thing happening */}

        <section
          aria-label="Next session"
          style={{
            margin: '0 20px',
            border: '3px solid #2A2522',
            borderRadius: '22px',
            background: '#8E4129',
            color: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <svg width="74" height="68" viewBox="0 0 54 50" aria-hidden="true" style={{ flex: 'none' }}>
            <path
              d="M4 18 L27 4 L50 18 Z"
              fill="#F2CE6E"
              stroke="#2A2522"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />

            <rect x="6" y="18" width="42" height="5" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2.2" />

            <path
              d="M12 23 V40 M21 23 V40 M33 23 V40 M42 23 V40"
              stroke="#FFFDF8"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <rect
              x="3"
              y="40"
              width="48"
              height="7"
              rx="2"
              fill="#2F3E5C"
              stroke="#2A2522"
              strokeWidth="2.2"
            />

            <circle cx="27" cy="13" r="2.6" fill="#FFFDF8" stroke="#2A2522" strokeWidth="1.6" />
          </svg>

          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '.05em', opacity: '.85' }}>
              NEXT SESSION
            </span>

            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '22px',
                fontWeight: '700',
                lineHeight: '1.05',
              }}
            >
              Thursday · 9 am
            </span>

            <span style={{ fontSize: '13.5px', fontWeight: '800' }}>Rent cap · lift repair</span>
          </div>
        </section>

        {/* Menu */}

        <nav
          aria-label="Council"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(3, 112px) 84px',
            gap: '12px',
            padding: '18px 20px 0',
          }}
        >
          {vals.tiles.map((t, $index) => (
            <ScreenLink key={$index} href={t.href} aria-label={t.label} style={css(t.s)}>
              <svg width="60" height="54" viewBox="0 0 64 58" aria-hidden="true">
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

              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}>
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
      </div>
    );
  }
}
