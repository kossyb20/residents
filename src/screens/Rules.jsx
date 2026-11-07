// Rules for Amara
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Rules extends Screen {
  static title = 'Rules for Amara';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const L = [
      {
        k: 'shop',
        name: 'Everyday spending',
        bg: '#E3F0DF',
        fill: '#FDE3C8',
        glyph: 'M3 9 H21 L19 20 H5 Z M7 9 L10 4 M17 9 L14 4',
        mode: 'cap',
        cap: 50,
        step: 10,
      },
      {
        k: 'esusu',
        name: 'Esusu',
        bg: '#EFE4CF',
        fill: '#8E4129',
        glyph: 'M6 9 H18 C21 12 21 19 12 20 C3 19 3 12 6 9 Z M8 6 H16',
        mode: 'free',
        cap: 50,
        step: 10,
      },
      {
        k: 'stock',
        name: 'Stocks',
        bg: '#CFE3F4',
        fill: '#8FC1A9',
        glyph: 'M3 20 H21 M5 20 V13 H8 V20 M10.5 20 V9 H13.5 V20 M16 20 V5 H19 V20',
        mode: 'cap',
        cap: 30,
        step: 10,
      },
      {
        k: 'pred',
        name: 'Predictions',
        bg: '#FDE3C8',
        fill: '#E8B53A',
        glyph: 'M2 7 H22 V10 A2 2 0 0 0 22 14 V17 H2 V14 A2 2 0 0 0 2 10 Z',
        mode: 'cap',
        cap: 10,
        step: 5,
      },
      {
        k: 'loan',
        name: 'Borrowing',
        bg: '#F7D6D6',
        fill: '#E8B53A',
        glyph: 'M12 3 A9 9 0 1 0 12.01 3 Z M12 7 V17 M9 9 H15',
        mode: 'ask',
        cap: 50,
        step: 50,
      },
    ];
    const H = [
      {
        k: 'rent',
        name: 'Pay rent when due',
        bg: '#FDE3C8',
        fill: '#FFFDF8',
        glyph: 'M3 11 L12 4 L21 11 V20 H3 Z M10 20 V14 H14 V20',
        on: false,
      },
      {
        k: 'bills',
        name: 'Pay bills when due',
        bg: '#FDE3C8',
        fill: '#F2CE6E',
        glyph: 'M13 2 L5 13 H11 L9 22 L19 10 H13 Z',
        on: true,
      },
      {
        k: 'save',
        name: 'Save 10% of wages',
        bg: '#E3F0DF',
        fill: '#F7B6C2',
        glyph:
          'M4 12 C4 8 8 5 13 5 C16 5 18 6 19 8 H21 V12 H19 C18 14 17 15 15 16 V19 H12 V17 H9 V19 H6 V16 C5 15 4 14 4 12 Z',
        on: false,
      },
    ];
    const st = this.state;
    const seg = (on, kind) =>
      'all: unset; width: 32px; height: 32px; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;' +
      (on
        ? ' border: 2.5px ' +
          (kind === 'free' ? 'dashed' : 'solid') +
          ' #2A2522; background: ' +
          (kind === 'ask' ? '#F7D6D6' : kind === 'cap' ? '#F2CE6E' : '#EFE4CF') +
          ';'
        : ' border: 2.5px solid transparent; opacity: 0.45;');
    const limits = L.map((l) => {
      const mode = st['m_' + l.k] ?? l.mode;
      const cap = st['c_' + l.k] ?? l.cap;
      const set = (patch) => this.setState(patch);
      return {
        name: l.name,
        bg: l.bg,
        fill: l.fill,
        glyph: l.glyph,
        isAsk: mode === 'ask',
        isCap: mode === 'cap',
        isFree: mode === 'free',
        cap: String(cap),
        askStyle: seg(mode === 'ask', 'ask'),
        capStyle: seg(mode === 'cap', 'cap'),
        freeStyle: seg(mode === 'free', 'free'),
        ask: () => set({ ['m_' + l.k]: 'ask' }),
        capGo: () => set({ ['m_' + l.k]: 'cap' }),
        free: () => set({ ['m_' + l.k]: 'free' }),
        less: () => set({ ['c_' + l.k]: Math.max(l.step, cap - l.step) }),
        more: () => set({ ['c_' + l.k]: cap + l.step }),
      };
    });
    const habits = H.map((h) => {
      const on = st['h_' + h.k] ?? h.on;
      return {
        name: h.name,
        bg: h.bg,
        fill: h.fill,
        glyph: h.glyph,
        on,
        track:
          'all: unset; position: relative; width: 56px; height: 32px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 999px; cursor: pointer; background: ' +
          (on ? '#8FC1A9' : '#EFE4CF') +
          ';',
        knob:
          'position: absolute; top: 2px; left: ' +
          (on ? '26px' : '2px') +
          '; width: 23px; height: 23px; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 50%; background: #FFFDF8; box-shadow: 1px 2px 0 #2A2522;',
        go: () => this.setState({ ['h_' + h.k]: !on }),
      };
    });
    return { accent, limits, habits };
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
            Rules for Amara
          </h1>

          <svg width="40" height="44" viewBox="0 0 54 50" aria-hidden="true">
            <rect x="9" y="4" width="36" height="44" rx="5" fill="#FFFDF8" stroke="#2A2522" strokeWidth="3" />

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

            <path d="M27 20 H39 M27 32 H39" stroke="#2A2522" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </header>

        {/* LIMITS: what she may decide on her own */}

        <div style={{ margin: '8px 20px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
            Limits
          </span>

          <span
            style={{ flex: '1', height: '3px', borderRadius: '2px', background: '#2A2522', opacity: '.15' }}
          />

          <span aria-label="Key: ask me, up to a limit, her call" style={{ display: 'flex', gap: '4px' }}>
            <span
              style={{
                width: '22px',
                height: '22px',
                boxSizing: 'border-box',
                border: '2px solid #2A2522',
                borderRadius: '50%',
                background: '#F7D6D6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 3 h12 M6 21 h12 M7 3 c0 6 10 6 10 9 c0 3 -10 3 -10 9 M17 3 c0 6 -10 6 -10 9 c0 3 10 3 10 9"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span
              style={{
                width: '22px',
                height: '22px',
                boxSizing: 'border-box',
                border: '2px solid #2A2522',
                borderRadius: '50%',
                background: '#F2CE6E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="8" height="11" viewBox="0 0 30 40" aria-hidden="true">
                <path
                  d="M4 8 H26 L4 32 H26"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path d="M15 2 V38" fill="none" stroke="#2A2522" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>

            <span
              style={{
                width: '22px',
                height: '22px',
                boxSizing: 'border-box',
                border: '2px dashed #2A2522',
                borderRadius: '50%',
                background: '#EFE4CF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 40 40" aria-hidden="true">
                <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
              </svg>
            </span>
          </span>
        </div>

        <ul
          aria-label="Limits"
          style={{
            listStyle: 'none',
            margin: '0',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {vals.limits.map((l, $index) => (
            <li
              key={$index}
              style={{
                height: '62px',
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '18px',
                background: '#FFFDF8',
                boxShadow: '3px 4px 0 #2A2522',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0 8px 0 8px',
              }}
            >
              <span
                style={{
                  width: '40px',
                  height: '40px',
                  flex: 'none',
                  boxSizing: 'border-box',
                  border: '2.5px solid #2A2522',
                  borderRadius: '12px',
                  background: l.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
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

              <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '1.1',
                  }}
                >
                  {l.name}
                </span>

                {l.isCap ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button
                      type="button"
                      aria-label="Lower the limit"
                      onClick={l.less}
                      style={{
                        all: 'unset',
                        width: '22px',
                        height: '22px',
                        boxSizing: 'border-box',
                        border: '2px solid #2A2522',
                        borderRadius: '50%',
                        background: '#F5EFE5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      −
                    </button>

                    <span
                      style={{
                        minWidth: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2px',
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '15px',
                        fontWeight: '700',
                      }}
                    >
                      <svg width="8" height="11" viewBox="0 0 30 40" aria-hidden="true">
                        <path
                          d="M4 8 H26 L4 32 H26"
                          fill="none"
                          stroke="#2A2522"
                          strokeWidth="5"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <path
                          d="M15 2 V38"
                          fill="none"
                          stroke="#2A2522"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </svg>
                      {l.cap}
                    </span>

                    <button
                      type="button"
                      aria-label="Raise the limit"
                      onClick={l.more}
                      style={{
                        all: 'unset',
                        width: '22px',
                        height: '22px',
                        boxSizing: 'border-box',
                        border: '2px solid #2A2522',
                        borderRadius: '50%',
                        background: '#F5EFE5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      +
                    </button>
                  </span>
                ) : null}

                {l.isAsk ? (
                  <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#8E4129' }}>Ask me</span>
                ) : null}

                {l.isFree ? (
                  <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#5B3D62' }}>Her call</span>
                ) : null}
              </div>

              <div
                role="radiogroup"
                aria-label={l.name}
                style={{
                  display: 'flex',
                  gap: '3px',
                  padding: '3px',
                  border: '2.5px solid #2A2522',
                  borderRadius: '999px',
                  background: '#F5EFE5',
                }}
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={l.isAsk}
                  aria-label="Ask me"
                  onClick={l.ask}
                  style={css(l.askStyle)}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M6 3 h12 M6 21 h12 M7 3 c0 6 10 6 10 9 c0 3 -10 3 -10 9 M17 3 c0 6 -10 6 -10 9 c0 3 10 3 10 9"
                      fill="none"
                      stroke="#2A2522"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={l.isCap}
                  aria-label="Up to a limit"
                  onClick={l.capGo}
                  style={css(l.capStyle)}
                >
                  <svg width="9" height="13" viewBox="0 0 30 40" aria-hidden="true">
                    <path
                      d="M4 8 H26 L4 32 H26"
                      fill="none"
                      stroke="#2A2522"
                      strokeWidth="5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path d="M15 2 V38" fill="none" stroke="#2A2522" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={l.isFree}
                  aria-label="Her call"
                  onClick={l.free}
                  style={css(l.freeStyle)}
                >
                  <svg width="17" height="17" viewBox="0 0 40 40" aria-hidden="true">
                    <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                    <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                    <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* HABITS: standing things she does without asking */}

        <div style={{ margin: '18px 20px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
            Habits
          </span>

          <span
            style={{ flex: '1', height: '3px', borderRadius: '2px', background: '#2A2522', opacity: '.15' }}
          />
        </div>

        <ul
          aria-label="Habits"
          style={{
            listStyle: 'none',
            margin: '0',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {vals.habits.map((h, $index) => (
            <li
              key={$index}
              style={{
                height: '56px',
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '18px',
                background: '#FFFDF8',
                boxShadow: '3px 4px 0 #2A2522',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0 10px 0 8px',
              }}
            >
              <span
                style={{
                  width: '38px',
                  height: '38px',
                  flex: 'none',
                  boxSizing: 'border-box',
                  border: '2.5px solid #2A2522',
                  borderRadius: '12px',
                  background: h.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d={h.glyph}
                    fill={h.fill}
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
                  lineHeight: '1.15',
                }}
              >
                {h.name}
              </span>

              <button
                type="button"
                role="switch"
                aria-checked={h.on}
                aria-label={h.name}
                onClick={h.go}
                style={css(h.track)}
              >
                <span style={css(h.knob)} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
