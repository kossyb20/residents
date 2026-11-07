// Settlers
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Settlers extends Screen {
  static title = 'Settlers';

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

    const choice = this.state.choice ?? null; // { by, what }
    const asked = this.state.asked ?? null;
    const S = [
      ['Dayo', 'Settled 31 · kept 94%', 'Good with money and esusu', '6', '#9DB8E0'],
      ['Mama Ngozi', 'Settled 18 · kept 89%', 'Good with neighbours and noise', '5', '#F7D6D6'],
      ['Lerato', 'Settled 9 · kept 100%', 'Good with gigs and deals', '4', '#E3F0DF'],
    ];
    const settlers = S.map(([name, meta, good, fee, bg]) => {
      const on = asked === name;
      return {
        name,
        meta,
        good,
        fee: 'Fee ' + fee,
        ini: name[0],
        on,
        cta: on ? 'Asked ✓' : 'Ask',
        ask: () => this.setState({ asked: on ? null : name }),
        face:
          'width: 42px; height: 42px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 50%; background: ' +
          bg +
          '; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 17px; font-weight: 700;',
        btn:
          'all: unset; height: 30px; box-sizing: border-box; padding: 0 12px; border: 2.5px solid #2A2522; border-radius: 999px; display: flex; align-items: center; font-family: Fredoka, sans-serif; font-size: 13.5px; font-weight: 600; cursor: pointer; background: ' +
          (on ? '#E3F0DF' : accent) +
          ';',
      };
    });
    const NOTES = {
      'you-agree': 'You agreed. It’s binding now: Tunde pays 55 by Friday.',
      'you-court': 'You said no. Case 15 goes to court; a jury will be picked.',
      'her-agree': 'Amara agreed. “If he pays by Friday, the circle survives.”',
    };
    return {
      accent,
      settlers,
      open: !choice,
      done: !!choice,
      accept: () => this.setState({ choice: { by: 'you', what: 'agree' } }),
      refuse: () => this.setState({ choice: { by: 'you', what: 'court' } }),
      handOff: () => this.setState({ choice: { by: 'her', what: 'agree' } }),
      acceptStyle: btn(accent, false),
      refuseStyle: btn('#FFFDF8', false),
      handStyle: btn('#EFE4CF', true) + ' flex: none;',
      mBadge: badge(choice ? choice.by : 'you', 34),
      mPath: choice && choice.by === 'her' ? FACE : PEN,
      mNote: choice ? NOTES[choice.by + '-' + choice.what] : '',
      mUndo: () => this.setState({ choice: null }),
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
            href="Court.dc.html"
            aria-label="Back to the courthouse"
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
              Settlers
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Settle it before it gets to court
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
            padding: '2px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Your open matter */}

          <section
            aria-label="Your matter"
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '22px',
              background: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: '#F2CE6E',
                padding: '10px 14px',
                borderBottom: '3px solid #2A2522',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <span
                style={{ fontSize: '11.5px', fontWeight: '800', letterSpacing: '.05em', color: '#8E4129' }}
              >
                CASE 15 · YOUR CIRCLE · WITH SETTLER DAYO
              </span>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '20px',
                  fontWeight: '700',
                  lineHeight: '1.1',
                }}
              >
                Your circle v Tunde
              </span>
            </div>

            <div style={{ padding: '11px 14px 12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '600', lineHeight: '1.4' }}>
                Tunde was late in round 2 and missed round 3. His 50 is missing from Chidi’s pot this round.
              </span>

              <div
                style={{
                  boxSizing: 'border-box',
                  border: '2.5px dashed #2A2522',
                  borderRadius: '14px',
                  background: '#E3F0DF',
                  padding: '9px 11px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#2F6B5F' }}>
                  DAYO'S OFFER · BINDING IF ALL AGREE
                </span>

                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '16px',
                    fontWeight: '700',
                    lineHeight: '1.2',
                  }}
                >
                  Tunde pays the 50 plus 5 by Friday. Miss again and he leaves the circle.
                </span>

                <span style={{ fontSize: '12px', fontWeight: '800' }}>
                  4 of 5 members agreed · Tunde agreed
                </span>
              </div>

              {vals.open ? (
                <>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" onClick={vals.accept} style={css(vals.acceptStyle)}>
                      Agree
                    </button>

                    <button type="button" onClick={vals.refuse} style={css(vals.refuseStyle)}>
                      Take it to court
                    </button>
                  </div>

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
                </>
              ) : null}

              {vals.done ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={css(vals.mBadge)}>
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
                      <path d={vals.mPath} />
                    </svg>
                  </span>

                  <span style={{ flex: '1', fontSize: '13.5px', fontWeight: '700', lineHeight: '1.35' }}>
                    {vals.mNote}
                  </span>

                  <button
                    type="button"
                    onClick={vals.mUndo}
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
            </div>
          </section>

          {/* Settlers for hire */}

          <section
            aria-label="Settlers"
            style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
                Available now · 3
              </span>

              <span style={{ fontSize: '12px', fontWeight: '800', color: '#5E564D' }}>
                Both sides must agree on one
              </span>
            </div>

            {vals.settlers.map((s, $index) => (
              <div
                key={$index}
                style={{
                  boxSizing: 'border-box',
                  border: '2.5px solid #2A2522',
                  borderRadius: '16px',
                  background: '#FFFDF8',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={css(s.face)}>{s.ini}</span>

                <span
                  style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '1px' }}
                >
                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '700' }}>
                    {s.name}
                  </span>

                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#5E564D' }}>{s.meta}</span>

                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#3A302A' }}>{s.good}</span>
                </span>

                <span
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}
                >
                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '700' }}>
                    {s.fee}
                  </span>

                  <button type="button" onClick={s.ask} aria-pressed={s.on} style={css(s.btn)}>
                    {s.cta}
                  </button>
                </span>
              </div>
            ))}
          </section>

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
              A settler only decides what both sides put on the table. Courts respect a settlement unless it
              breaks the rules, like a settler paid in secret by one side.
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
              The Constitution stays above every settlement
            </ScreenLink>
          </div>
        </div>
      </div>
    );
  }
}
