// Appeals
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Appeals extends Screen {
  static title = 'Appeals';

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

    const following = this.state.following ?? false;
    const steps = [
      ['Within 7 days', 'Only the losing side can appeal, once, within a week of the verdict.'],
      ['Show a reason', 'New evidence the jury never saw, or a rule that was broken in the first trial.'],
      ['Pay 10', 'Refunded if the appeal wins. Kept by the treasury if it loses.'],
      ['A fresh jury decides', 'Five new jurors. Their verdict is final.'],
    ].map(([t, d], i) => ({ n: String(i + 1), t, d }));
    return {
      accent,
      steps,
      following,
      follow: () => this.setState({ following: !following }),
      followLabel: following ? 'Following ✓ · you’ll get the verdict' : 'Follow the retrial',
      followStyle: btn(following ? '#E3F0DF' : accent, false) + ' flex: none;',
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
              Appeals
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>One retrial pending</span>
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
          <section
            aria-label="Retrial"
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
                background: '#2F3E5C',
                color: '#FFFDF8',
                padding: '11px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span
                  style={{ fontSize: '11.5px', fontWeight: '800', letterSpacing: '.05em', color: '#F2CE6E' }}
                >
                  RETRIAL · SATURDAY 3 PM
                </span>

                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '21px',
                    fontWeight: '700',
                    lineHeight: '1.05',
                  }}
                >
                  Ife appeals Case 13
                </span>
              </span>

              <span
                style={{
                  border: '2px solid #FFFDF8',
                  borderRadius: '999px',
                  padding: '1px 8px',
                  fontSize: '11px',
                  fontWeight: '800',
                }}
              >
                New jury of 5
              </span>
            </div>

            <div style={{ padding: '11px 14px 13px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span
                  style={{
                    flex: '1',
                    boxSizing: 'border-box',
                    border: '2px solid #2A2522',
                    borderRadius: '12px',
                    background: '#EFE4CF',
                    padding: '6px 9px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#5E564D' }}>
                    FIRST VERDICT
                  </span>
                  <span
                    style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '14.5px', fontWeight: '700' }}
                  >
                    For Kofi · 4–1
                  </span>
                </span>

                <span
                  style={{
                    flex: '1',
                    boxSizing: 'border-box',
                    border: '2px solid #2A2522',
                    borderRadius: '12px',
                    background: '#E3F0DF',
                    padding: '6px 9px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#5E564D' }}>GROUNDS</span>
                  <span
                    style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '14.5px', fontWeight: '700' }}
                  >
                    New evidence
                  </span>
                </span>
              </div>

              <span style={{ fontSize: '13.5px', fontWeight: '600', lineHeight: '1.4' }}>
                Ife found messages from week 5 where Kofi moved the study group to a time she couldn't make.
                The first jury never saw them.
              </span>

              <button
                type="button"
                onClick={vals.follow}
                aria-pressed={vals.following}
                style={css(vals.followStyle)}
              >
                {vals.followLabel}
              </button>
            </div>
          </section>

          <section
            aria-label="How appeals work"
            style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
              How an appeal works
            </span>

            {vals.steps.map((s, $index) => (
              <div
                key={$index}
                style={{
                  boxSizing: 'border-box',
                  border: '2.5px solid #2A2522',
                  borderRadius: '14px',
                  background: '#FFFDF8',
                  padding: '9px 12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '26px',
                    height: '26px',
                    flex: 'none',
                    boxSizing: 'border-box',
                    border: '2.5px solid #2A2522',
                    borderRadius: '50%',
                    background: vals.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '13px',
                    fontWeight: '700',
                  }}
                >
                  {s.n}
                </span>

                <span style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '700' }}>
                    {s.t}
                  </span>

                  <span
                    style={{ fontSize: '12.5px', fontWeight: '600', lineHeight: '1.35', color: '#3A302A' }}
                  >
                    {s.d}
                  </span>
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
              None of your cases can be appealed right now. If a retrial changes a verdict, the first one
              stays on the record beside it.
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
              Article V · Permanent records
            </ScreenLink>
          </div>
        </div>
      </div>
    );
  }
}
