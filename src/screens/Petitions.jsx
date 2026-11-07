// Petitions
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Petitions extends Screen {
  static title = 'Petitions';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const PEN = 'M4 20 L8 19 L19 8 L16 5 L5 16 Z M14 7 L17 10';
    const FACE = 'M12 3 A9 9 0 1 0 12.01 3 M9 10 V11 M15 10 V11 M8.5 15 Q12 18 15.5 15';
    const badge = (by, size) =>
      'width: ' +
      size +
      'px; height: ' +
      size +
      'px; flex: none; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center;' +
      (by === 'her'
        ? ' background: #EFE4CF; border: 2.5px dashed #2A2522;'
        : ' background: #CFE3F4; border: 2.5px solid #2A2522;');
    const tabStyle = (on) =>
      'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 5px; font-family: Fredoka, sans-serif; font-size: 14.5px; font-weight: 600; cursor: pointer;' +
      (on
        ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
        : ' border: 2.5px solid transparent;');
    const chipStyle = (on) =>
      'all: unset; flex: none; height: 32px; box-sizing: border-box; padding: 0 12px; border-radius: 999px; display: flex; align-items: center; font-size: 13px; font-weight: 800; cursor: pointer; border: 2.5px solid #2A2522;' +
      (on ? ' background: #2A2522; color: #FFFDF8;' : ' background: #FFFDF8; color: #2A2522;');
    const btn = (bg, dashed) =>
      'all: unset; flex: 1; height: 42px; box-sizing: border-box; border: 3px ' +
      (dashed ? 'dashed' : 'solid') +
      ' #2A2522; border-radius: 14px; background: ' +
      bg +
      ';' +
      (dashed ? '' : ' box-shadow: 3px 4px 0 #2A2522;') +
      ' display: flex; align-items: center; justify-content: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 15.5px; font-weight: 600; cursor: pointer; color: #2A2522;';

    const signed = this.state.signed ?? {}; // key -> 'you' | 'her' | 'herNo'
    const P = [
      {
        key: 'lift',
        title: 'Service the lift every month',
        by: 'Kemi',
        left: '3 days left',
        n: 188,
        color: '#F2CE6E',
        body: 'Four days without a lift is too long. Book a monthly service so it doesn’t break again.',
        her: ['her', 'Amara signed. She’s been on the stairs all week.'],
      },
      {
        key: 'market',
        title: 'Bring back the Sunday market',
        by: 'Mama Ngozi',
        left: '6 days left',
        n: 61,
        color: '#8FC1A9',
        body: 'Let residents sell food and crafts in the lobby on Sundays, like last season.',
        her: ['herNo', 'Amara didn’t sign. She works Sundays and wasn’t sure.'],
      },
    ];
    const petitions = P.map((p) => {
      const s = signed[p.key];
      const plus = s === 'you' || s === 'her' ? 1 : 0;
      const n = p.n + plus;
      return {
        title: p.title,
        by: p.by,
        left: p.left,
        body: p.body,
        color: p.color,
        pct: Math.min(100, Math.round((n / 250) * 100)) + '%',
        count: n + ' of 250 signatures',
        open: !s,
        done: !!s,
        sign: () => this.setState({ signed: { ...signed, [p.key]: 'you' } }),
        hand: () => this.setState({ signed: { ...signed, [p.key]: p.her[0] } }),
        undo: () => this.setState({ signed: { ...signed, [p.key]: null } }),
        signStyle: btn(accent, false),
        handStyle: btn('#EFE4CF', true),
        badge: badge(s === 'you' ? 'you' : 'her', 28),
        path: s === 'you' ? PEN : FACE,
        note: s === 'you' ? 'You signed. Your name goes on the record.' : s ? p.her[1] : '',
      };
    });
    return { accent, petitions };
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
            href="Council.dc.html"
            aria-label="Back to the council hall"
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

          <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
            <h1
              style={{
                margin: '0',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '26px',
                fontWeight: '700',
                lineHeight: '1.1',
              }}
            >
              Petitions
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Laws and living conditions
            </span>
          </div>
        </header>

        <div
          className="pg-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '2px 20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {vals.petitions.map((p, $index) => (
            <section
              key={$index}
              style={{
                flex: 'none',
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '22px',
                background: '#FFFDF8',
                boxShadow: '4px 5px 0 #2A2522',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '9px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg width="40" height="40" viewBox="0 0 64 58" aria-hidden="true" style={{ flex: 'none' }}>
                  <path
                    d="M8 22 V36 H18 L40 48 V10 L18 22 Z"
                    fill={p.color}
                    stroke="#2A2522"
                    strokeWidth="3.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M46 18 Q52 29 46 40"
                    fill="none"
                    stroke="#2A2522"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />
                </svg>

                <span style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '18px',
                      fontWeight: '700',
                      lineHeight: '1.15',
                    }}
                  >
                    {p.title}
                  </span>

                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#5E564D' }}>
                    Started by {p.by} · {p.left}
                  </span>
                </span>
              </div>

              <span style={{ fontSize: '13.5px', fontWeight: '600', lineHeight: '1.4' }}>{p.body}</span>

              <div
                style={{
                  height: '14px',
                  boxSizing: 'border-box',
                  border: '2.5px solid #2A2522',
                  borderRadius: '999px',
                  background: '#F5EFE5',
                  overflow: 'hidden',
                }}
              >
                <span style={{ display: 'block', height: '100%', width: p.pct, background: p.color }} />
              </div>

              <span style={{ fontSize: '12.5px', fontWeight: '800' }}>{p.count}</span>

              {p.open ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" onClick={p.sign} style={css(p.signStyle)}>
                    Sign
                  </button>

                  <button type="button" onClick={p.hand} style={css(p.handStyle)}>
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2A2522"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 12 H15 M11 7 L16 12 L11 17 M19 5 V19" />
                    </svg>
                    Hand Off
                  </button>
                </div>
              ) : null}

              {p.done ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderTop: '2px dashed #2A2522',
                    paddingTop: '8px',
                  }}
                >
                  <span style={css(p.badge)}>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2A2522"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={p.path} />
                    </svg>
                  </span>

                  <span style={{ flex: '1', fontSize: '13px', fontWeight: '700', lineHeight: '1.35' }}>
                    {p.note}
                  </span>

                  <button
                    type="button"
                    onClick={p.undo}
                    style={{
                      all: 'unset',
                      fontSize: '12.5px',
                      fontWeight: '800',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    Change
                  </button>
                </div>
              ) : null}
            </section>
          ))}

          <div
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '2.5px dashed #2A2522',
              borderRadius: '16px',
              background: '#EFE4CF',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
            }}
          >
            <span style={{ fontSize: '12.5px', fontWeight: '700', lineHeight: '1.4' }}>
              A petition asks the council to change a law or fix living conditions, never to act against a
              resident. 250 signatures in 7 days puts it on the agenda. A complaint about a person goes to a
              settler or the court. A petition can’t overturn a verdict, a law or the constitution either.
            </span>

            <ScreenLink
              href="Constitution.dc.html"
              style={{
                alignSelf: 'flex-start',
                boxSizing: 'border-box',
                border: '2px solid #2A2522',
                borderRadius: '999px',
                background: '#F3E1B4',
                padding: '3px 10px 3px 6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: '800',
                textDecoration: 'none',
              }}
            >
              <svg width="20" height="16" viewBox="0 0 64 50" aria-hidden="true">
                <rect
                  x="10"
                  y="4"
                  width="44"
                  height="9"
                  rx="4.5"
                  fill="#C08A5B"
                  stroke="#2A2522"
                  strokeWidth="4"
                />
                <path d="M14 13 H50 V37 H14 Z" fill="#FBF1D6" stroke="#2A2522" strokeWidth="4" />
                <rect
                  x="10"
                  y="37"
                  width="44"
                  height="9"
                  rx="4.5"
                  fill="#C08A5B"
                  stroke="#2A2522"
                  strokeWidth="4"
                />
              </svg>
              Article VI · Court & council
            </ScreenLink>
          </div>
        </div>

        <a
          href="#"
          style={{
            margin: '0 20px 22px',
            flex: 'none',
            height: '48px',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '16px',
            background: vals.accent,
            boxShadow: '4px 5px 0 #2A2522',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '17px',
            fontWeight: '600',
            textDecoration: 'none',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2A2522"
            strokeWidth="3"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M12 5 V19 M5 12 H19" />
          </svg>
          Start a petition
        </a>
      </div>
    );
  }
}
