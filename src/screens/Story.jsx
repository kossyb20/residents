// News story
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Story extends Screen {
  static title = 'Story';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const P = [
      "The council will vote at 9 am on Thursday on a cap for rents in Block A. Under the proposal, no room's rent could rise by more than 10% in a single season.",
      "31 of the building's 38 households rent their rooms. The average rent is 118 Zael a week, and rents on floors 3 to 6 rose twice this season.",
      'The cap needs three of the five councillors\' votes to pass. On the trading floor, the question "Will the rent cap pass?" stood at 41% yes this morning.',
      'If it passes, the cap applies from next season and is written into the building rules.',
    ];
    const paras = P.map((t, i) => ({
      t,
      s:
        'margin: 0; font-size: 14.5px; font-weight: 600; line-height: 1.55;' +
        (i === 0 ? ' font-weight: 700;' : ''),
    }));
    const F = [
      ['Vote', 'Thu · 9 am'],
      ['Where', 'Council hall · floor 8'],
      ['Proposal', 'Rent rises capped at 10% a season'],
      ['Needs', '3 of 5 councillors'],
      ['Households renting', '31 of 38'],
    ];
    const facts = F.map(([k, v], i) => ({
      k,
      v,
      row:
        'display: flex; justify-content: space-between; align-items: baseline; gap: 12px; padding: 5px 0;' +
        (i < F.length - 1 ? ' border-bottom: 1.5px dashed #E3D9C8;' : ''),
    }));
    return { accent, paras, facts };
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
            href="Media.dc.html"
            aria-label="Back to the paper"
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

          <div
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingRight: '58px',
            }}
          >
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '9.5px',
                fontWeight: '700',
                letterSpacing: '.3em',
              }}
            >
              THE
            </span>

            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '22px',
                fontWeight: '700',
                lineHeight: '.95',
              }}
            >
              Block A Times
            </span>
          </div>
        </header>

        <div
          className="st-scroll"
          style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '8px 20px 24px' }}
        >
          <article
            style={{
              border: '3px solid #2A2522',
              borderRadius: '6px',
              background: '#FBF6EC',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '14px 14px 16px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                borderTop: '3px solid #2A2522',
                borderBottom: '1.5px solid #2A2522',
                padding: '3px 0',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '10.5px',
                fontWeight: '800',
                letterSpacing: '.05em',
              }}
            >
              <span style={{ color: '#8E4129' }}>CIVIC</span>
              <span>TUESDAY · CYCLE 14</span>
            </div>

            <h1
              style={{
                margin: '10px 0 6px',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '30px',
                fontWeight: '700',
                lineHeight: '1.02',
              }}
            >
              Rent cap goes to a council vote on Thursday
            </h1>

            <p
              style={{
                margin: '0 0 10px',
                fontSize: '15px',
                fontWeight: '700',
                color: '#4A433B',
                lineHeight: '1.35',
              }}
            >
              Five councillors decide whether any room's rent may rise more than 10% a season.
            </p>

            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: '800',
                color: '#5E564D',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 3 H15 L19 7 V21 H5 Z M15 3 V7 H19 M8 11 H16 M8 15 H16"
                  fill="#FFFDF8"
                  stroke="#2A2522"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              From the council record
            </span>

            <figure style={{ margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div
                style={{
                  height: '168px',
                  boxSizing: 'border-box',
                  border: '2px solid #2A2522',
                  background: '#8E4129',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <svg width="250" height="150" viewBox="0 0 220 132" aria-hidden="true">
                  <path
                    d="M30 56 L110 16 L190 56 Z"
                    fill="#F2CE6E"
                    stroke="#2A2522"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />

                  <rect
                    x="34"
                    y="56"
                    width="152"
                    height="11"
                    fill="#FFFDF8"
                    stroke="#2A2522"
                    strokeWidth="3"
                  />

                  <path
                    d="M52 67 V114 M79 67 V114 M106 67 V114 M133 67 V114 M160 67 V114"
                    stroke="#FFFDF8"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />

                  <rect
                    x="24"
                    y="114"
                    width="172"
                    height="13"
                    fill="#2F3E5C"
                    stroke="#2A2522"
                    strokeWidth="3"
                  />

                  <circle cx="110" cy="39" r="7" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2.5" />
                </svg>
              </div>

              <figcaption
                style={{ fontSize: '11.5px', fontWeight: '700', color: '#5E564D', lineHeight: '1.3' }}
              >
                The council hall on floor 8. Voting opens at 9 am on Thursday.
              </figcaption>
            </figure>

            <div
              style={{
                marginTop: '12px',
                borderTop: '1.5px solid #2A2522',
                paddingTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {vals.paras.map((p, $index) => (
                <p key={$index} style={css(p.s)}>
                  {p.t}
                </p>
              ))}
            </div>

            {/* The record: the facts the story is built from */}

            <section
              aria-label="The record"
              style={{
                marginTop: '14px',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '8px',
                background: '#FFFDF8',
                padding: '8px 10px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: '800',
                  letterSpacing: '.1em',
                  paddingBottom: '4px',
                  borderBottom: '2px solid #2A2522',
                }}
              >
                THE RECORD
              </span>

              {vals.facts.map((f, $index) => (
                <div key={$index} style={css(f.row)}>
                  <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#5E564D' }}>{f.k}</span>

                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '14px',
                      fontWeight: '600',
                      textAlign: 'right',
                    }}
                  >
                    {f.v}
                  </span>
                </div>
              ))}
            </section>
          </article>

          {/* Directly attached to this story */}

          <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <ScreenLink
              href="TradingFloor.dc.html"
              aria-label="Will the rent cap pass? 41 percent yes. Open the trading floor"
              style={{
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '16px',
                background: '#5B3D62',
                color: '#FFFDF8',
                boxShadow: '3px 4px 0 #2A2522',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                textDecoration: 'none',
              }}
            >
              <svg width="28" height="24" viewBox="0 0 28 24" aria-hidden="true">
                <path
                  d="M2 5 h24 v5 a2.5 2.5 0 0 0 0 5 v5 h-24 v-5 a2.5 2.5 0 0 0 0 -5 z"
                  fill="#E8B53A"
                  stroke="#2A2522"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '600',
                  lineHeight: '1.15',
                }}
              >
                Will it pass?
              </span>

              <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#F2CE6E' }}>41% yes</span>
            </ScreenLink>

            <ScreenLink
              href="Housing.dc.html"
              aria-label="Your rent: 120 Zael a week. Open Housing"
              style={{
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '16px',
                background: '#FDE3C8',
                boxShadow: '3px 4px 0 #2A2522',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                textDecoration: 'none',
                color: '#2A2522',
              }}
            >
              <svg width="26" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 11 L12 4 L21 11 V20 H3 Z"
                  fill="#FFFDF8"
                  stroke="#2A2522"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <rect x="10" y="13" width="4" height="7" fill="#8E4129" stroke="#2A2522" strokeWidth="1.6" />
              </svg>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '600',
                  lineHeight: '1.15',
                }}
              >
                Your rent
              </span>

              <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#8E4129' }}>120 a week</span>
            </ScreenLink>
          </div>
        </div>
      </div>
    );
  }
}
