// Resident card
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class ResidentCard extends Screen {
  static title = 'Resident';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const dots = (n, c) =>
      [0, 1, 2, 3, 4].map((k) => ({
        s:
          'width: 8px; height: 8px; box-sizing: border-box; border-radius: 50%; border: 1.5px solid #2A2522; background: ' +
          (k < n ? c : '#FFFDF8') +
          ';',
      }));
    const val = 'font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 700; line-height: 1;';
    const meters = [
      { name: 'Closeness', value: '4 of 5', n: 4, c: '#E8584E', bg: '#FDE3C8' },
      { name: 'Trust', value: '5 of 5', n: 5, c: '#8FC1A9', bg: '#E3F0DF' },
      { name: 'She feels', value: 'warm', n: 0, c: '', bg: '#FFFDF8' },
    ].map((m) => ({
      name: m.name,
      value: m.value,
      bg: m.bg,
      label: m.name + ': ' + m.value,
      valueStyle: val,
      dots: m.n ? dots(m.n, m.c) : [],
    }));

    const A = [
      ['Message', 'Thread.dc.html', 'M4 5 H20 V16 H10 L5 20 V16 H4 Z'],
      ['Play', 'GameLobby.dc.html', 'M5 5 H19 V19 H5 Z M12 5 V19 M5 12 H19'],
      ['Send Zael', 'Bank.dc.html', 'M5 7 H17 L5 17 H17 M11 3 V21'],
    ];
    const actions = A.map(([name, href, icon], i) => ({
      name,
      href,
      icon,
      label: name + ' Kemi',
      s:
        'box-sizing: border-box; height: 64px; border: 3px solid #2A2522; border-radius: 16px; background: ' +
        (i === 0 ? accent : '#FFFDF8') +
        '; box-shadow: 3px 4px 0 #2A2522; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; font-family: Fredoka, sans-serif; font-size: 14.5px; font-weight: 600; text-decoration: none;',
    }));

    const facts = [
      ['ESUSU', 'Paid on time · 12 of 12', '#E3F0DF'],
      ['COURT', 'No cases', '#FFFDF8'],
      ['CHESS', '1,840 · 3rd this week', '#CFE3F4'],
      ['PUBLISHED', '2 papers · 1 replicated', '#EFE4CF'],
    ].map(([k, v, bg]) => ({ k, v, bg }));

    const H = [
      ['Today', 'On the sofa in the common room, talking about the rent cap', '#E8B53A'],
      ['Week 6', 'Lent Amara 20 after the esusu trouble. Still open.', '#C8553D'],
      ['Week 4', '14 games of Ludo together · Amara won 6', '#9DB8E0'],
      ['Week 1', 'Met in the lobby on Amara’s first day', '#8FC1A9'],
    ];
    const history = H.map(([when, what, c], i) => ({
      when,
      what,
      dot:
        'width: 12px; height: 12px; flex: none; margin-top: 3px; box-sizing: border-box; border: 2px solid #2A2522; border-radius: 50%; background: ' +
        c +
        ';',
      s:
        'display: flex; align-items: flex-start; gap: 8px; padding: 7px 0;' +
        (i < H.length - 1 ? ' border-bottom: 1.5px dashed rgba(42,37,34,.25);' : ''),
    }));

    return { accent, meters, actions, facts, history };
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
            href="Social.dc.html"
            aria-label="Back to Social"
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
              Resident
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Public record · Amara's view
            </span>
          </div>
        </header>

        <div
          className="rc-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '2px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Who she is */}

          <section
            aria-label="Kemi"
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '22px',
              background: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <svg width="96" height="96" viewBox="0 0 52 52" aria-hidden="true" style={{ flex: 'none' }}>
                <circle cx="26" cy="26" r="24" fill="none" stroke="#E8B53A" strokeWidth="3.5" />

                <rect
                  x="6"
                  y="6"
                  width="40"
                  height="40"
                  rx="13"
                  fill="#F7D6D6"
                  stroke="#2A2522"
                  strokeWidth="2"
                />

                <circle cx="26" cy="29" r="12" fill="#A8714A" stroke="#2A2522" strokeWidth="2" />

                <path
                  d="M13 24 C13 14 20 12 26 12 C32 12 39 14 39 24 C36 20 32 19 26 19 C20 19 16 20 13 24 Z"
                  fill="#C8553D"
                  stroke="#2A2522"
                  strokeWidth="1.6"
                />

                <path
                  d="M20 26 Q22 24.5 24 26 M28 26 Q30 24.5 32 26"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />

                <circle cx="22" cy="30" r="1.4" fill="#2A2522" />

                <circle cx="30" cy="30" r="1.4" fill="#2A2522" />

                <path
                  d="M21.5 34.5 Q26 38 30.5 34.5"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>

              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '26px',
                    fontWeight: '700',
                    lineHeight: '1',
                  }}
                >
                  Kemi
                </span>

                <span style={{ fontSize: '13px', fontWeight: '700', color: '#5E564D' }}>
                  Room 3C · lab assistant · since season 1
                </span>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: '800',
                      background: '#FDE3C8',
                      border: '2px solid #2A2522',
                      borderRadius: '999px',
                      padding: '0 8px',
                    }}
                  >
                    Friend
                  </span>

                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: '800',
                      background: '#E3F0DF',
                      border: '2px solid #2A2522',
                      borderRadius: '999px',
                      padding: '0 8px',
                    }}
                  >
                    Supports the Lions
                  </span>
                </div>
              </div>
            </div>

            {/* How Amara feels about her */}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px' }}>
              {vals.meters.map((m, $index) => (
                <div
                  key={$index}
                  role="img"
                  aria-label={m.label}
                  style={{
                    boxSizing: 'border-box',
                    border: '2.5px solid #2A2522',
                    borderRadius: '14px',
                    background: m.bg,
                    padding: '7px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#5E564D' }}>{m.name}</span>

                  <span style={css(m.valueStyle)}>{m.value}</span>

                  <span style={{ display: 'flex', gap: '3px' }}>
                    {m.dots.map((d, $index) => (
                      <span key={$index} style={css(d.s)} />
                    ))}
                  </span>
                </div>
              ))}
            </div>

            {/* Amara's own note, in her hand */}

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                borderTop: '2px dashed #2A2522',
                paddingTop: '10px',
              }}
            >
              <span
                role="img"
                aria-label="Amara's note"
                style={{
                  width: '26px',
                  height: '26px',
                  flex: 'none',
                  boxSizing: 'border-box',
                  border: '2px dashed #2A2522',
                  borderRadius: '50%',
                  background: '#EFE4CF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 40 40" aria-hidden="true">
                  <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                  <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                  <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                </svg>
              </span>

              <span
                style={{
                  flex: '1',
                  fontFamily: "'Caveat', cursive",
                  fontSize: '21px',
                  fontWeight: '700',
                  lineHeight: '1.1',
                  color: '#3A302A',
                }}
              >
                Lent me 20 when the esusu went wrong. Never asked when I'd pay it back.
              </span>
            </div>
          </section>

          {/* Actions */}

          <div
            style={{
              flex: 'none',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '10px',
            }}
          >
            {vals.actions.map((a, $index) => (
              <ScreenLink key={$index} href={a.href} aria-label={a.label} style={css(a.s)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={a.icon} />
                </svg>

                <span>{a.name}</span>
              </ScreenLink>
            ))}
          </div>

          {/* The public record */}

          <section
            aria-label="On the record"
            style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
              On the record
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
              {vals.facts.map((f, $index) => (
                <div
                  key={$index}
                  style={{
                    boxSizing: 'border-box',
                    border: '2.5px solid #2A2522',
                    borderRadius: '14px',
                    background: f.bg,
                    padding: '8px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1px',
                  }}
                >
                  <span
                    style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '.04em', color: '#5E564D' }}
                  >
                    {f.k}
                  </span>

                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '15.5px',
                      fontWeight: '700',
                      lineHeight: '1.15',
                    }}
                  >
                    {f.v}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Shared history */}

          <section
            aria-label="Together"
            style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
              You two
            </span>

            <div
              style={{
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '18px',
                background: '#FFFDF8',
                boxShadow: '4px 5px 0 #2A2522',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {vals.history.map((h, $index) => (
                <div key={$index} style={css(h.s)}>
                  <span
                    style={{
                      width: '54px',
                      flex: 'none',
                      fontSize: '11.5px',
                      fontWeight: '800',
                      color: '#5E564D',
                      paddingTop: '2px',
                    }}
                  >
                    {h.when}
                  </span>

                  <span style={css(h.dot)} />

                  <span style={{ flex: '1', fontSize: '13.5px', fontWeight: '700', lineHeight: '1.3' }}>
                    {h.what}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
