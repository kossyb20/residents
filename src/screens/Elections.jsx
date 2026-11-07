// Elections
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Elections extends Screen {
  static title = 'Elections';

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

    const picks = this.state.picks ?? [];
    const voted = this.state.voted ?? null; // { by, picks }
    const C = [
      ['Ife', 'Councillor', 'Cap rent rises. Fix the lift first.', '#E3F0DF'],
      ['Sade', 'Chair', 'Fix what’s broken before we build anything new.', '#FDE3C8'],
      ['Tunde', 'Councillor', 'Owners keep the building running. Don’t punish them.', '#CFE3F4'],
      ['Femi', 'Councillor', 'Ask the building before we spend its money.', '#EFE4CF'],
      ['Mama Ngozi', 'New', 'Bring back the Sunday market. Lower stall fees.', '#F7D6D6'],
      ['Kofi', 'New', 'Open the rooftop at night for study and games.', '#FDE3C8'],
      ['Lerato', 'New', 'Publish every treasury payment the day it happens.', '#E3F0DF'],
    ];
    const chosen = voted ? voted.picks : picks;
    const cands = C.map(([name, tag, pitch, bg]) => {
      const on = chosen.includes(name);
      return {
        name,
        tag,
        pitch,
        ini: name[0],
        on,
        toggle: () => {
          if (voted) return;
          this.setState({
            picks: on ? picks.filter((p) => p !== name) : picks.length < 5 ? picks.concat([name]) : picks,
          });
        },
        s:
          'all: unset; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 16px; background: ' +
          (on ? '#FBEBC4' : '#FFFDF8') +
          '; padding: 9px 12px; display: flex; align-items: center; gap: 10px; cursor: pointer;' +
          (on ? ' box-shadow: 3px 4px 0 #2A2522;' : ''),
        face:
          'width: 40px; height: 40px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 50%; background: ' +
          bg +
          '; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 17px; font-weight: 700;',
        tagStyle:
          'border: 1.5px solid #2A2522; border-radius: 999px; padding: 0 6px; font-size: 10px; font-weight: 800; background: ' +
          (tag === 'New' ? '#8FC1A9' : tag === 'Chair' ? '#F2CE6E' : '#FFFDF8') +
          ';',
        box:
          'width: 28px; height: 28px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: ' +
          (on ? accent : '#FFFDF8') +
          ';',
        tickStyle: on ? '' : 'display: none;',
      };
    });
    const none = picks.length === 0;
    const HER = ['Ife', 'Sade', 'Mama Ngozi', 'Lerato'];
    return {
      accent,
      cands,
      none,
      open: !voted,
      cast_: !!voted,
      ballotLine: none ? 'Your ballot is empty' : 'Your ballot · ' + picks.length + ' of 5',
      cast: () => {
        if (!none) this.setState({ voted: { by: 'you', picks } });
      },
      handOff: () => this.setState({ voted: { by: 'her', picks: HER }, picks: HER }),
      castStyle: btn(none ? '#EFE6D7' : accent, false) + (none ? ' opacity: .6; cursor: default;' : ''),
      handStyle: btn('#EFE4CF', true),
      bBadge: badge(voted ? voted.by : 'you', 34),
      bPath: voted && voted.by === 'her' ? FACE : PEN,
      bNote: !voted
        ? ''
        : voted.by === 'her'
          ? 'Amara voted for Ife, Sade, Mama Ngozi and Lerato. “Whoever caps the rent and fixes the lift.”'
          : 'Vote cast for ' + voted.picks.join(', ') + '. It stays secret.',
      bUndo: () => this.setState({ voted: null }),
    };
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
              Elections
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Council vote in 9 days · five seats
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
            padding: '2px 20px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <section
            aria-label="Polling day"
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#E3F0DF',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '11px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <svg width="44" height="44" viewBox="0 0 64 58" aria-hidden="true" style={{ flex: 'none' }}>
              <path d="M8 30 H56 V54 H8 Z" fill="#2F3E5C" stroke="#2A2522" strokeWidth="3.4" />
              <path
                d="M24 30 V8 H40 V30 M28 14 L32 20 L38 12 M20 40 H44"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '700' }}>
                Pick up to five
              </span>

              <span style={{ fontSize: '12.5px', fontWeight: '700', lineHeight: '1.3' }}>
                The five with most votes take the seats. The new council then picks its chair.
              </span>
            </span>
          </section>

          {vals.cands.map((c, $index) => (
            <button
              key={$index}
              type="button"
              role="checkbox"
              aria-checked={c.on}
              onClick={c.toggle}
              style={css(c.s)}
            >
              <span style={css(c.face)}>{c.ini}</span>

              <span
                style={{
                  flex: '1',
                  minWidth: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1px',
                  textAlign: 'left',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '700' }}>
                    {c.name}
                  </span>
                  <span style={css(c.tagStyle)}>{c.tag}</span>
                </span>

                <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#3A302A', lineHeight: '1.3' }}>
                  {c.pitch}
                </span>
              </span>

              <span style={css(c.box)}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={css(c.tickStyle)}
                >
                  <path d="M5 12 L10 17 L19 7" />
                </svg>
              </span>
            </button>
          ))}

          <a
            href="#"
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '2.5px dashed #2A2522',
              borderRadius: '16px',
              background: '#FFFDF8',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            <span style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15.5px', fontWeight: '700' }}>
                Stand for council
              </span>

              <span style={{ fontSize: '12px', fontWeight: '700', color: '#5E564D' }}>
                Nominations close Friday · needs 20 backers
              </span>
            </span>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2A2522"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="#"
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '2.5px dashed #2A2522',
              borderRadius: '16px',
              background: '#F7D6D6',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            <span style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15.5px', fontWeight: '700' }}>
                Recall a councillor
              </span>

              <span style={{ fontSize: '12px', fontWeight: '700', color: '#5E564D', lineHeight: '1.3' }}>
                300 residents in 7 days trigger a building-wide vote on that one seat
              </span>
            </span>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2A2522"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <section
          aria-live="polite"
          aria-label="Your ballot"
          style={{
            margin: '0 20px 22px',
            flex: 'none',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {vals.open ? (
            <>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15.5px', fontWeight: '700' }}>
                {vals.ballotLine}
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={vals.cast}
                  aria-disabled={vals.none}
                  style={css(vals.castStyle)}
                >
                  Cast my vote
                </button>

                <button type="button" onClick={vals.handOff} style={css(vals.handStyle)}>
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
            </>
          ) : null}

          {vals.cast_ ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={css(vals.bBadge)}>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={vals.bPath} />
                </svg>
              </span>

              <span style={{ flex: '1', fontSize: '13.5px', fontWeight: '700', lineHeight: '1.35' }}>
                {vals.bNote}
              </span>

              <button
                type="button"
                onClick={vals.bUndo}
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
      </div>
    );
  }
}
