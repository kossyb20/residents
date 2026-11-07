// Life
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Life extends Screen {
  static title = 'Life';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const sel = this.state.sel ?? 0;
    const T = [
      {
        word: 'Careful',
        val: 74,
        chg: 3,
        fill: '#8FC1A9',
        glyph: 'M3 12 A9 9 0 0 1 21 12 Z M12 12 V20 Q12 22 10 22 Q8 22 8 20',
      },
      {
        word: 'Loyal',
        val: 68,
        chg: 0,
        fill: '#F7B6C2',
        glyph: 'M12 20 C4 14 2 10 4 6.5 C6 3.5 10 4 12 7 C14 4 18 3.5 20 6.5 C22 10 20 14 12 20 Z',
      },
      {
        word: 'Curious',
        val: 61,
        chg: 1,
        fill: '#CFE3F4',
        glyph: 'M10 3 A7 7 0 1 0 10.01 3 Z M15 15 L21 21',
      },
      { word: 'Stubborn', val: 55, chg: -2, fill: '#E59A6B', glyph: 'M3 20 L7 10 L11 13 L15 6 L21 20 Z' },
      {
        word: 'Confidence',
        val: 58,
        chg: -4,
        fill: '#F2CE6E',
        glyph: 'M12 2 L14.5 9 H22 L16 13.5 L18.5 21 L12 16.5 L5.5 21 L8 13.5 L2 9 H9.5 Z',
      },
    ];
    const traits = T.map((t, i) => {
      const on = i === sel;
      return {
        word: t.word === 'Confidence' ? 'Steady' : t.word,
        glyph: t.glyph,
        fill: t.fill,
        on,
        style:
          'all: unset; height: 40px; box-sizing: border-box; border-radius: 12px; display: flex; align-items: center; gap: 7px; padding: 0 10px; font-family: Fredoka, sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; border: 2.5px solid #2A2522;' +
          (on ? ' background: ' + accent + '; box-shadow: 2px 3px 0 #2A2522;' : ' background: #FFFDF8;') +
          (t.word === 'Confidence' ? ' grid-column: span 2; justify-content: center;' : ''),
        go: () => this.setState({ sel: i }),
      };
    });
    const s = T[sel];
    const d = {
      word: s.word,
      val: String(s.val),
      bar:
        'display: block; height: 100%; width: ' +
        s.val +
        '%; background: ' +
        s.fill +
        '; border-right: 2px solid #2A2522;',
      chg: s.chg === 0 ? '=' : (s.chg > 0 ? '▲' : '▼') + Math.abs(s.chg),
      chgStyle:
        'width: 34px; text-align: center; font-size: 12px; font-weight: 800; border: 2px solid #2A2522; border-radius: 999px; background: ' +
        (s.chg > 0 ? '#8FC1A9' : s.chg < 0 ? '#F7D6D6' : '#FFFDF8') +
        ';',
    };
    const values = [
      {
        word: 'Family',
        bg: '#F7D6D6',
        glyph:
          'M3 11 L12 4 L21 11 V20 H3 Z M12 17 C9 15 8.5 13.5 9.5 12.5 C10.5 11.5 11.5 12 12 13 C12.5 12 13.5 11.5 14.5 12.5 C15.5 13.5 15 15 12 17 Z',
      },
      {
        word: 'Fairness',
        bg: '#CFE3F4',
        glyph: 'M12 3 V20 M5 7 H19 M5 7 L2 14 H8 Z M19 7 L16 14 H22 Z M8 20 H16',
      },
      {
        word: 'Security',
        bg: '#E3F0DF',
        glyph: 'M12 2 L20 5.5 V11.5 C20 16.5 16.5 20 12 21.5 C7.5 20 4 16.5 4 11.5 V5.5 Z',
      },
    ];
    return { accent, traits, d, values };
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
        <header style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px 8px' }}>
          <ScreenLink
            href="Home.dc.html"
            aria-label="Home"
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
            <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
              <path
                d="M4 15 L16 5 L28 15"
                fill="none"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 13 V27 H25 V13"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <rect
                x="13"
                y="18"
                width="6"
                height="9"
                rx="1"
                fill="#8E4129"
                stroke="#2A2522"
                strokeWidth="2"
              />
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
              Amara
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Room 4C · 41 days in Block A
            </span>
          </div>
        </header>

        {/* Portrait */}

        <section
          aria-label="Amara now"
          style={{
            margin: '6px 20px 0',
            flex: 'none',
            border: '3px solid #2A2522',
            borderRadius: '22px',
            overflow: 'hidden',
            background: '#FDE3C8',
            boxShadow: '4px 5px 0 #2A2522',
            display: 'flex',
            alignItems: 'flex-end',
            height: '168px',
            position: 'relative',
          }}
        >
          <svg
            width="168"
            height="154"
            viewBox="0 0 200 184"
            role="img"
            aria-label="Amara"
            style={{ flex: 'none', display: 'block', marginLeft: '4px' }}
          >
            <path
              d="M30 186 C30 148 62 130 100 130 C138 130 170 148 170 186 Z"
              fill={vals.accent}
              stroke="#2A2522"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            <rect x="88" y="108" width="24" height="26" fill="#6B4027" stroke="#2A2522" strokeWidth="4" />

            <circle cx="56" cy="40" r="22" fill="#2A2522" />

            <circle cx="144" cy="40" r="22" fill="#2A2522" />

            <circle cx="70" cy="24" r="14" fill="#2A2522" />

            <circle cx="130" cy="24" r="14" fill="#2A2522" />

            <circle cx="100" cy="80" r="46" fill="#7A4A2E" stroke="#2A2522" strokeWidth="4" />

            <path
              d="M54 78 C52 44 74 30 100 30 C126 30 148 44 146 78 C138 60 120 54 100 54 C80 54 62 60 54 78 Z"
              fill="#2A2522"
            />

            <circle cx="55" cy="104" r="7" fill="none" stroke="#E8B53A" strokeWidth="4" />

            <circle cx="145" cy="104" r="7" fill="none" stroke="#E8B53A" strokeWidth="4" />

            <ellipse cx="77" cy="99" rx="9" ry="5" fill="#C66A55" opacity="0.6" />

            <ellipse cx="123" cy="99" rx="9" ry="5" fill="#C66A55" opacity="0.6" />

            <path
              d="M74 70 Q82 66 90 70"
              fill="none"
              stroke="#2A2522"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <path
              d="M110 66 Q118 60 126 64"
              fill="none"
              stroke="#2A2522"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <ellipse cx="82" cy="85" rx="4.5" ry="6" fill="#2A2522" />

            <ellipse cx="118" cy="85" rx="4.5" ry="6" fill="#2A2522" />

            <path d="M88 106 L114 102" fill="none" stroke="#2A2522" strokeWidth="4" strokeLinecap="round" />
          </svg>

          <div
            style={{
              flex: '1',
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '14px 14px 14px 0',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: '#FFFDF8',
                  border: '2.5px solid #2A2522',
                  borderRadius: '999px',
                  padding: '2px 10px',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" fill="#F2CE6E" stroke="#2A2522" strokeWidth="2.4" />
                  <path d="M8 15 L16 14" stroke="#2A2522" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="9" cy="10" r="1.4" fill="#2A2522" />
                  <circle cx="15" cy="10" r="1.4" fill="#2A2522" />
                </svg>
                Restless
              </span>

              <span
                aria-label="Supports Block A Lions"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: '#E3F0DF',
                  border: '2.5px solid #2A2522',
                  borderRadius: '999px',
                  padding: '2px 10px',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 3 A9 9 0 1 0 12.01 3 Z M12 8 L16 11 L14.5 15.5 H9.5 L8 11 Z"
                    fill="#FFFDF8"
                    stroke="#2A2522"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                </svg>
                Lions
              </span>
            </div>
          </div>
        </section>

        {/* Who she is: traits in words, numbers one level deeper */}

        <section
          aria-label="Who she is"
          style={{
            margin: '16px 20px 0',
            flex: 'none',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {vals.traits.map((t, $index) => (
              <button key={$index} type="button" onClick={t.go} aria-pressed={t.on} style={css(t.style)}>
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d={t.glyph}
                    fill={t.fill}
                    stroke="#2A2522"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t.word}
              </button>
            ))}
          </div>

          <div
            aria-live="polite"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 10px',
              borderRadius: '14px',
              background: '#F5EFE5',
              border: '2px dashed #CFC4B2',
            }}
          >
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '15px',
                fontWeight: '600',
                width: '74px',
              }}
            >
              {vals.d.word}
            </span>

            <div
              role="img"
              aria-label={`${vals.d.word} ${vals.d.val} out of 100`}
              style={{
                flex: '1',
                height: '14px',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '999px',
                background: '#FFFDF8',
                overflow: 'hidden',
              }}
            >
              <span style={css(vals.d.bar)} />
            </div>

            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '16px',
                fontWeight: '700',
                width: '26px',
                textAlign: 'right',
              }}
            >
              {vals.d.val}
            </span>

            <span style={css(vals.d.chgStyle)}>{vals.d.chg}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg role="img" aria-label="Cares about" width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M12 20 C4 14 2 10 4 6.5 C6 3.5 10 4 12 7 C14 4 18 3.5 20 6.5 C22 10 20 14 12 20 Z"
                fill="#C8553D"
                stroke="#2A2522"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>

            {vals.values.map((v, $index) => (
              <span
                key={$index}
                title={v.word}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: v.bg,
                  border: '2px solid #2A2522',
                  borderRadius: '999px',
                  padding: '1px 8px 1px 4px',
                  fontSize: '13px',
                  fontWeight: '800',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d={v.glyph}
                    fill="#FFFDF8"
                    stroke="#2A2522"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {v.word}
              </span>
            ))}
          </div>
        </section>

        {/* How she has changed */}

        <ScreenLink
          href="Diary.dc.html"
          aria-label="Lately: more careful since the esusu trouble. Open the diary"
          style={{
            margin: '14px 20px 0',
            flex: 'none',
            height: '56px',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '18px',
            background: '#5B3D62',
            color: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '0 14px 0 10px',
            textDecoration: 'none',
          }}
        >
          <svg width="34" height="28" viewBox="0 0 40 32" aria-hidden="true">
            <path
              d="M3 26 L13 16 L20 21 L33 7"
              fill="none"
              stroke="#F2CE6E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26 7 H33 V14"
              fill="none"
              stroke="#F2CE6E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span
            style={{
              flex: '1',
              fontFamily: "'Caveat', cursive",
              fontSize: '22px',
              fontWeight: '700',
              lineHeight: '1',
            }}
          >
            more careful since the esusu trouble
          </span>

          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F2CE6E"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </ScreenLink>

        <div style={{ flex: '1' }} />

        {/* Deeper pages */}

        <nav
          aria-label="More about Amara"
          style={{
            margin: '0 20px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '12px',
          }}
        >
          <ScreenLink
            href="Skills.dc.html"
            aria-label="Skills and knowledge"
            style={{
              height: '108px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#CFE3F4',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="50" height="46" viewBox="0 0 54 50" aria-hidden="true">
              <path
                d="M27 6 L50 16 L27 26 L4 16 Z"
                fill="#2F3E5C"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <path
                d="M13 21 V33 C13 38 41 38 41 33 V21"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <path d="M46 18 V32" stroke="#2A2522" strokeWidth="3" strokeLinecap="round" />

              <circle cx="46" cy="35" r="3.5" fill="#E8B53A" stroke="#2A2522" strokeWidth="2" />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}>
              Skills
            </span>
          </ScreenLink>

          <ScreenLink
            href="Rules.dc.html"
            aria-label="Rules for Amara: caps and habits"
            style={{
              position: 'relative',
              height: '108px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: vals.accent,
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="50" height="46" viewBox="0 0 54 50" aria-hidden="true">
              <rect
                x="9"
                y="4"
                width="36"
                height="44"
                rx="5"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
              />

              <rect
                x="19"
                y="1"
                width="16"
                height="8"
                rx="3"
                fill="#8E4129"
                stroke="#2A2522"
                strokeWidth="2.5"
              />

              <path
                d="M15 19 l3 3 l5 -6 M15 31 l3 3 l5 -6"
                fill="none"
                stroke="#2E4A3B"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M27 20 H39 M27 32 H39 M15 42 H31"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}>
              Rules
            </span>
          </ScreenLink>

          <ScreenLink
            href="Settings.dc.html"
            aria-label="Settings"
            style={{
              height: '108px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#EFE4CF',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="46" height="46" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2 l2 3 l3.5 -1 l0.5 3.5 l3.5 1 l-1.5 3.5 l1.5 3.5 l-3.5 1 l-0.5 3.5 l-3.5 -1 l-2 3 l-2 -3 l-3.5 1 l-0.5 -3.5 l-3.5 -1 l1.5 -3.5 l-1.5 -3.5 l3.5 -1 l0.5 -3.5 l3.5 1 z"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="3.5" fill="#9DB8E0" stroke="#2A2522" strokeWidth="1.4" />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}>
              Settings
            </span>
          </ScreenLink>
        </nav>
      </div>
    );
  }
}
