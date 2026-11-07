// Skills
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Skills extends Screen {
  static title = 'Skills';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const sel = this.state.sel ?? 1;
    const dots = (n) =>
      [1, 2, 3, 4, 5].map((k) => ({
        s:
          'width: 12px; height: 12px; border-radius: 50%; border: 2px solid #2A2522; background: ' +
          (k <= n ? '#2E4A3B' : '#FFFDF8') +
          ';',
      }));
    const words = ['', 'weak', 'shaky', 'decent', 'good', 'great'];
    const W = [
      {
        name: 'Lab work',
        lvl: 4,
        job: true,
        bg: '#CFE3F4',
        fill: '#9DB8E0',
        glyph: 'M9 3 H15 M10 3 V9 L4 19 Q3 22 6 22 H18 Q21 22 20 19 L14 9 V3',
      },
      {
        name: 'Numbers',
        lvl: 4,
        bg: '#E3F0DF',
        fill: '#FFFDF8',
        glyph: 'M4 4 H20 V20 H4 Z M8 8 H16 M8 12 H10 M14 12 H16 M8 16 H10 M14 16 H16',
      },
      {
        name: 'Writing',
        lvl: 3,
        bg: '#F7D6D6',
        fill: '#E8B53A',
        glyph: 'M4 20 L5 15 L16 4 L20 8 L9 19 Z M14 6 L18 10',
      },
    ];
    const work = W.map((w, i) => ({
      name: w.name,
      glyph: w.glyph,
      fill: w.fill,
      bg: w.bg,
      isJob: !!w.job,
      dots: dots(w.lvl),
      label: w.name + ': ' + words[w.lvl] + (w.job ? ', her job skill' : ''),
      row:
        'display: flex; align-items: center; gap: 10px; padding: 7px 0;' +
        (i < W.length - 1 ? ' border-bottom: 2px dashed #EFE6D7;' : ''),
    }));
    const F = [
      {
        name: 'Physics',
        short: 'Physics',
        lvl: 34,
        q: 6,
        r: 50,
        fill: '#F2CE6E',
        glyph: 'M14 1 L5 13 H11 L9 23 L19 10 H13 Z',
      },
      {
        name: 'Chemistry',
        short: 'Chem',
        lvl: 71,
        q: 14,
        r: 79,
        fill: '#9DB8E0',
        glyph: 'M9 2 H15 M10 2 V8 L4 18 Q3 21 6 21 H18 Q21 21 20 18 L14 8 V2',
      },
      {
        name: 'Biology',
        short: 'Biology',
        lvl: 52,
        q: 9,
        r: 67,
        fill: '#8FC1A9',
        glyph: 'M4 20 C4 10 10 4 20 4 C20 14 14 20 4 20 Z M4 20 L13 11',
      },
      {
        name: 'Medicine',
        short: 'Medicine',
        lvl: 28,
        q: 4,
        r: 50,
        fill: '#F7B6C2',
        glyph: 'M9 3 H15 V9 H21 V15 H15 V21 H9 V15 H3 V9 H9 Z',
      },
      {
        name: 'Earth science',
        short: 'Earth',
        lvl: 45,
        q: 7,
        r: 57,
        fill: '#C08A5B',
        glyph: 'M2 20 L9 8 L13 14 L16 10 L22 20 Z M9 8 V3',
      },
      {
        name: 'Maths and computing',
        short: 'Maths',
        lvl: 63,
        q: 11,
        r: 73,
        fill: '#FFFDF8',
        glyph: 'M3 4 H21 V20 H3 Z M7 9 L10 12 L7 15 M12 15 H17',
      },
      {
        name: 'Social science',
        short: 'Social',
        lvl: 40,
        q: 5,
        r: 60,
        fill: '#FDE3C8',
        glyph:
          'M8 9 A3 3 0 1 0 8.01 9 Z M16 9 A3 3 0 1 0 16.01 9 Z M2 21 C2 15 14 15 14 21 M10 21 C10 15 22 15 22 21',
      },
      {
        name: 'Engineering',
        short: 'Engineer',
        lvl: 22,
        q: 3,
        r: 33,
        fill: '#E59A6B',
        glyph:
          'M12 2 L14 5 L17.5 4 L18 7.5 L21.5 8.5 L20 12 L21.5 15.5 L18 16.5 L17.5 20 L14 19 L12 22 L10 19 L6.5 20 L6 16.5 L2.5 15.5 L4 12 L2.5 8.5 L6 7.5 L6.5 4 L10 5 Z M12 9 A3 3 0 1 0 12.01 9 Z',
      },
    ];
    const C = 2 * Math.PI * 19;
    const fields = F.map((f, i) => {
      const on = i === sel;
      return {
        name: f.name,
        short: f.short,
        glyph: f.glyph,
        fill: f.fill,
        on,
        ring: f.lvl >= 60 ? '#2E4A3B' : f.lvl >= 40 ? '#E8B53A' : '#C8553D',
        dash: ((C * f.lvl) / 100).toFixed(1) + ' ' + C.toFixed(1),
        style:
          'all: unset; box-sizing: border-box; height: 78px; border: 2.5px solid #2A2522; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; cursor: pointer;' +
          (on ? ' background: ' + accent + '; box-shadow: 2px 3px 0 #2A2522;' : ' background: #FFFDF8;'),
        go: () => this.setState({ sel: i }),
      };
    });
    const s = F[sel];
    const d = {
      name: s.name,
      lvl: String(s.lvl),
      quizzes: String(s.q),
      right: String(s.r),
      bar:
        'display: block; height: 100%; width: ' +
        s.r +
        '%; background: #8FC1A9; border-right: 2px solid #2A2522;',
    };
    return { accent, work, fields, d };
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
            href="Life.dc.html"
            aria-label="Back to Life"
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

          <h1
            style={{
              flex: '1',
              margin: '0',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '26px',
              fontWeight: '700',
              lineHeight: '1.1',
            }}
          >
            Skills
          </h1>

          <svg width="46" height="42" viewBox="0 0 54 50" aria-hidden="true">
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
        </header>

        {/* Work skills */}

        <section
          aria-label="Work skills"
          style={{
            margin: '6px 20px 0',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {vals.work.map((w, $index) => (
            <div key={$index} aria-label={w.label} style={css(w.row)}>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  flex: 'none',
                  boxSizing: 'border-box',
                  border: '2.5px solid #2A2522',
                  borderRadius: '11px',
                  background: w.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d={w.glyph}
                    fill={w.fill}
                    stroke="#2A2522"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span
                style={{
                  flex: '1',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {w.name}
              </span>

              {w.isJob ? (
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: '800',
                    background: '#2F6B5F',
                    color: '#FFFDF8',
                    border: '2px solid #2A2522',
                    borderRadius: '999px',
                    padding: '0 7px',
                  }}
                >
                  JOB
                </span>
              ) : null}

              <span style={{ display: 'flex', gap: '4px' }}>
                {w.dots.map((d, $index) => (
                  <span key={$index} style={css(d.s)} />
                ))}
              </span>
            </div>
          ))}
        </section>

        {/* Knowledge: the eight fields */}

        <div style={{ margin: '16px 20px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
            Knowledge
          </span>

          <span
            style={{ flex: '1', height: '3px', borderRadius: '2px', background: '#2A2522', opacity: '.15' }}
          />
        </div>

        <div
          role="group"
          aria-label="Fields of science"
          style={{
            margin: '0 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '8px',
          }}
        >
          {vals.fields.map((f, $index) => (
            <button
              key={$index}
              type="button"
              onClick={f.go}
              aria-pressed={f.on}
              aria-label={f.name}
              style={css(f.style)}
            >
              <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
                <circle cx="22" cy="22" r="19" fill="none" stroke="#E3D9C8" strokeWidth="5" />

                <circle
                  cx="22"
                  cy="22"
                  r="19"
                  fill="none"
                  stroke={f.ring}
                  strokeWidth="5"
                  strokeDasharray={f.dash}
                  transform="rotate(-90 22 22)"
                  strokeLinecap="round"
                />

                <g transform="translate(10 10)">
                  <path
                    d={f.glyph}
                    fill={f.fill}
                    stroke="#2A2522"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '12px',
                  fontWeight: '600',
                  lineHeight: '1.05',
                  textAlign: 'center',
                }}
              >
                {f.short}
              </span>
            </button>
          ))}
        </div>

        {/* Detail for the chosen field: level and quiz record */}

        <section
          aria-live="polite"
          style={{
            margin: '12px 20px 0',
            border: '3px solid #2A2522',
            borderRadius: '18px',
            background: '#FFFDF8',
            boxShadow: '3px 4px 0 #2A2522',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{ flex: '1', fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}
            >
              {vals.d.name}
            </span>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
              {vals.d.lvl}
              <span style={{ fontSize: '13px', color: '#8A8075' }}>/100</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="3"
                fill="#FDE3C8"
                stroke="#2A2522"
                strokeWidth="2"
              />
              <path
                d="M8 9 l2 2 l4 -4 M8 15 H16"
                fill="none"
                stroke="#2A2522"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span style={{ fontSize: '13.5px', fontWeight: '800' }}>{vals.d.quizzes} quizzes</span>

            <div
              role="img"
              aria-label={`${vals.d.right} percent right`}
              style={{
                flex: '1',
                height: '14px',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '999px',
                background: '#F7D6D6',
                overflow: 'hidden',
              }}
            >
              <span style={css(vals.d.bar)} />
            </div>

            <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#2E4A3B' }}>
              {vals.d.right}% right
            </span>
          </div>
        </section>

        <div style={{ flex: '1' }} />

        {/* Game ratings */}

        <ScreenLink
          href="Play.dc.html"
          aria-label="Game ratings: Ludo 1,240, Chess 980. Open Play"
          style={{
            margin: '0 20px 24px',
            height: '60px',
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
          <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M7 3 H17 V9 A5 5 0 0 1 7 9 Z M7 5 H3 Q3 10 7 10 M17 5 H21 Q21 10 17 10 M12 14 V18 M8 21 H16 L15 18 H9 Z"
              fill="#E8B53A"
              stroke="#2A2522"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>

          <span style={{ flex: '1', display: 'flex', gap: '8px' }}>
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '15px',
                fontWeight: '600',
                background: '#FFFDF8',
                color: '#2A2522',
                border: '2px solid #2A2522',
                borderRadius: '999px',
                padding: '1px 10px',
              }}
            >
              Ludo 1,240
            </span>

            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '15px',
                fontWeight: '600',
                background: '#FFFDF8',
                color: '#2A2522',
                border: '2px solid #2A2522',
                borderRadius: '999px',
                padding: '1px 10px',
              }}
            >
              Chess 980
            </span>
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
      </div>
    );
  }
}
