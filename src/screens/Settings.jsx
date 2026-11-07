// Settings
import { Fragment } from 'react';
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Settings extends Screen {
  static title = 'Settings';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const st = this.state;
    const installed = st.installed ?? false;
    const toggle = (k, def) => {
      const on = st[k] ?? def;
      return {
        isToggle: true,
        isValue: false,
        isButton: false,
        on,
        track:
          'all: unset; position: relative; width: 52px; height: 30px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 999px; cursor: pointer; background: ' +
          (on ? '#8FC1A9' : '#EFE4CF') +
          ';',
        knob:
          'position: absolute; top: 2px; left: ' +
          (on ? '24px' : '2px') +
          '; width: 21px; height: 21px; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 50%; background: #FFFDF8; box-shadow: 1px 2px 0 #2A2522;',
        go: () => this.setState({ [k]: !on }),
      };
    };
    const value = (v) => ({ isToggle: false, isValue: true, isButton: false, value: v });
    const G = [
      {
        title: 'Account',
        rows: [
          {
            name: 'Recovery phone',
            bg: '#CFE3F4',
            fill: '#FFFDF8',
            glyph: 'M7 2 H17 V22 H7 Z M11 18 H13',
            ...value('•••• 4471'),
          },
        ],
      },
      {
        title: 'Privacy',
        rows: [
          {
            name: "Show when I'm on",
            bg: '#E3F0DF',
            fill: '#8FC1A9',
            glyph: 'M12 3 A9 9 0 1 0 12.01 3 Z M12 8 A4 4 0 1 0 12.01 8 Z',
            ...toggle('live', true),
          },
          {
            name: 'Blocked residents',
            bg: '#F7D6D6',
            fill: '#FFFDF8',
            glyph: 'M12 3 A9 9 0 1 0 12.01 3 Z M5.6 5.6 L18.4 18.4',
            ...value('2'),
          },
        ],
      },
      {
        title: 'Notifications',
        rows: [
          {
            name: 'Attention',
            bg: '#FDE3C8',
            fill: '#E8B53A',
            glyph: 'M6 16 V11 A6 6 0 0 1 18 11 V16 L20 18 H4 Z M10 21 H14',
            ...toggle('nAtt', true),
          },
          {
            name: 'Rent and esusu reminders',
            bg: '#FDE3C8',
            fill: '#FFFDF8',
            glyph: 'M3 11 L12 4 L21 11 V20 H3 Z M10 20 V14 H14 V20',
            ...toggle('nRent', true),
          },
          {
            name: 'Headlines',
            bg: '#EFE4CF',
            fill: '#FFFDF8',
            glyph: 'M3 5 H17 V19 H5 A2 2 0 0 1 3 17 Z M17 9 H21 V17 A2 2 0 0 1 17 19 M6 9 H14 M6 13 H14',
            ...toggle('nNews', false),
          },
        ],
      },
      {
        title: 'App',
        rows: [
          {
            name: 'Add to home screen',
            bg: '#CFE3F4',
            fill: '#FFFDF8',
            glyph: 'M7 2 H17 V22 H7 Z M12 8 V15 M9 12 L12 15 L15 12',
            isToggle: false,
            isValue: false,
            isButton: true,
            btnLabel: installed ? 'Added' : 'Add',
            btn:
              'all: unset; height: 34px; padding: 0 14px; box-sizing: border-box; border-radius: 999px; border: 2.5px solid #2A2522; font-family: Fredoka, sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; background: ' +
              (installed ? '#8FC1A9' : accent) +
              ';',
            go: () => this.setState({ installed: true }),
          },
          {
            name: 'About and terms',
            bg: '#EFE4CF',
            fill: '#FFFDF8',
            glyph: 'M12 3 A9 9 0 1 0 12.01 3 Z M12 11 V17 M12 7.5 V8',
            ...value(''),
          },
        ],
      },
    ];
    const groups = G.map((g) => ({
      title: g.title,
      rows: g.rows.map((r, i) => ({
        ...r,
        rowStyle:
          'min-height: 56px; display: flex; align-items: center; gap: 10px;' +
          (i < g.rows.length - 1 ? ' border-bottom: 2px dashed #EFE6D7;' : ''),
      })),
    }));
    return { accent, groups };
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
            Settings
          </h1>

          <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2 l2 3 l3.5 -1 l0.5 3.5 l3.5 1 l-1.5 3.5 l1.5 3.5 l-3.5 1 l-0.5 3.5 l-3.5 -1 l-2 3 l-2 -3 l-3.5 1 l-0.5 -3.5 l-3.5 -1 l1.5 -3.5 l-1.5 -3.5 l3.5 -1 l0.5 -3.5 l3.5 1 z"
              fill="#EFE4CF"
              stroke="#2A2522"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3.5" fill="#9DB8E0" stroke="#2A2522" strokeWidth="1.4" />
          </svg>
        </header>

        {vals.groups.map((g, $index) => (
          <Fragment key={$index}>
            <div style={{ margin: '12px 20px 6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#5E564D',
                }}
              >
                {g.title}
              </span>

              <span
                style={{
                  flex: '1',
                  height: '3px',
                  borderRadius: '2px',
                  background: '#2A2522',
                  opacity: '.12',
                }}
              />
            </div>

            <section
              aria-label={g.title}
              style={{
                margin: '0 20px',
                border: '3px solid #2A2522',
                borderRadius: '18px',
                background: '#FFFDF8',
                boxShadow: '3px 4px 0 #2A2522',
                padding: '0 12px',
              }}
            >
              {g.rows.map((r, $index) => (
                <div key={$index} style={css(r.rowStyle)}>
                  <span
                    style={{
                      width: '34px',
                      height: '34px',
                      flex: 'none',
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '11px',
                      background: r.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d={r.glyph}
                        fill={r.fill}
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
                      minWidth: '0',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '15.5px',
                      fontWeight: '600',
                      lineHeight: '1.15',
                    }}
                  >
                    {r.name}
                  </span>

                  {r.isToggle ? (
                    <button
                      type="button"
                      role="switch"
                      aria-checked={r.on}
                      aria-label={r.name}
                      onClick={r.go}
                      style={css(r.track)}
                    >
                      <span style={css(r.knob)} />
                    </button>
                  ) : null}

                  {r.isValue ? (
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '13.5px',
                        fontWeight: '800',
                        color: '#5E564D',
                      }}
                    >
                      {r.value}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2A2522"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </span>
                  ) : null}

                  {r.isButton ? (
                    <button type="button" onClick={r.go} style={css(r.btn)}>
                      {r.btnLabel}
                    </button>
                  ) : null}
                </div>
              ))}
            </section>
          </Fragment>
        ))}

        <div style={{ flex: '1' }} />

        <p
          style={{
            margin: '0 20px 24px',
            textAlign: 'center',
            fontSize: '12.5px',
            fontWeight: '700',
            color: '#8A8075',
          }}
        >
          Residents · version 0.1 · nobody here knows who you are
        </p>
      </div>
    );
  }
}
