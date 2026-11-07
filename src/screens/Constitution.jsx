// Constitution
import { Screen } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Constitution extends Screen {
  static title = 'Constitution';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const A = [
      [
        'Housing floor',
        'Every resident always has a room. No law, debt, fine or verdict can take away the last one.',
      ],
      [
        'Rent money',
        'Each week the treasury deposits a basic income into every resident’s bank account, set aside for rent and utilities. No council law can take it or redirect it.',
      ],
      [
        'Anonymity',
        'No one has to reveal who they are. Records show residents, never the real people behind them.',
      ],
      ['No real money', 'Zael can never be bought with, sold for or cashed out into real money.'],
      [
        'Permanent records',
        'Trades, votes, verdicts and laws stay on the public record. Nothing is deleted or rewritten.',
      ],
      [
        'Court & council',
        'The court and the elected council are permanent. No law, vote or petition can abolish or suspend them.',
      ],
    ];
    const NUM = ['I', 'II', 'III', 'IV', 'V', 'VI'];
    const articles = A.map(([name, text], i) => ({ num: NUM[i], name, text }));
    return { accent, articles };
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
            aria-label="Back"
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
              Constitution
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Kept in the council hall and the court
            </span>
          </div>
        </header>

        {/* The scroll */}

        <section
          aria-label="The Constitution"
          style={{
            flex: '1',
            minHeight: '0',
            margin: '4px 14px 22px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              flex: 'none',
              position: 'relative',
              zIndex: '2',
              height: '26px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '999px',
              background: 'linear-gradient(#E2B47F 0%, #C08A5B 55%, #8E5A35 100%)',
              boxShadow: '3px 4px 0 #2A2522',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '10px',
                top: '4px',
                bottom: '4px',
                width: '7px',
                borderRadius: '3px',
                background: '#8E4129',
              }}
            />{' '}
            <span
              style={{
                position: 'absolute',
                right: '10px',
                top: '4px',
                bottom: '4px',
                width: '7px',
                borderRadius: '3px',
                background: '#8E4129',
              }}
            />
          </div>

          <div
            className="cn-scroll"
            style={{
              flex: '1',
              minHeight: '0',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              margin: '-9px 14px',
              padding: '24px 18px 26px',
              boxSizing: 'border-box',
              borderLeft: '3px solid #2A2522',
              borderRight: '3px solid #2A2522',
              background: 'radial-gradient(ellipse at 50% 30%, #FBF1D6 0%, #F3E1B4 70%, #E9CF97 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '25px',
                fontWeight: '700',
                lineHeight: '1',
                letterSpacing: '.02em',
              }}
            >
              The Constitution
            </span>

            <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#8E4129' }}>
              Set by the Admin · no vote can change it
            </span>

            <svg width="170" height="10" viewBox="0 0 170 10" aria-hidden="true" style={{ flex: 'none' }}>
              <path d="M2 5 H70 M100 5 H168" stroke="#8E4129" strokeWidth="2" strokeLinecap="round" />
              <path d="M85 1 L90 5 L85 9 L80 5 Z" fill="#8E4129" />
            </svg>

            <p
              style={{
                margin: '0',
                textAlign: 'center',
                fontSize: '13.5px',
                fontStyle: 'italic',
                fontWeight: '700',
                lineHeight: '1.45',
                color: '#3A302A',
              }}
            >
              These articles stand above every law, verdict, settlement and petition in the building. The
              council makes laws inside them. The court judges by them.
            </p>

            {vals.articles.map((a, $index) => (
              <article
                key={$index}
                style={{
                  alignSelf: 'stretch',
                  borderTop: '2px dashed rgba(142,65,41,.45)',
                  paddingTop: '11px',
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    flex: 'none',
                    width: '34px',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#8E4129',
                    textAlign: 'center',
                    lineHeight: '1.1',
                  }}
                >
                  {a.num}
                </span>

                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '17px',
                      fontWeight: '700',
                      lineHeight: '1.15',
                    }}
                  >
                    {a.name}
                  </span>

                  <span
                    style={{ fontSize: '13.5px', fontWeight: '600', lineHeight: '1.45', color: '#3A302A' }}
                  >
                    {a.text}
                  </span>
                </div>
              </article>
            ))}

            <div
              style={{
                alignSelf: 'stretch',
                borderTop: '2px dashed rgba(142,65,41,.45)',
                paddingTop: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <svg width="54" height="54" viewBox="0 0 46 46" aria-hidden="true" style={{ flex: 'none' }}>
                <path
                  d="M23 2 L28 6 L34 4 L36 10 L42 12 L40 18 L44 23 L40 28 L42 34 L36 36 L34 42 L28 40 L23 44 L18 40 L12 42 L10 36 L4 34 L6 28 L2 23 L6 18 L4 12 L10 10 L12 4 L18 6 Z"
                  fill="#C8553D"
                  stroke="#2A2522"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />

                <circle cx="23" cy="23" r="12" fill="#A8432E" stroke="#7A2E1E" strokeWidth="1.6" />

                <path
                  d="M17 20 H29 L17 27 H29 M23 15 V31"
                  fill="none"
                  stroke="#F2CE6E"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '700' }}>
                  Sealed by the Admin
                </span>

                <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#5E564D' }}>
                  In force since season 1 · on the public record
                </span>
              </div>
            </div>

            <ScreenLink
              href="LawRegister.dc.html"
              style={{
                alignSelf: 'stretch',
                marginTop: '2px',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '14px',
                background: '#FFFDF8',
                padding: '9px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <span style={{ flex: '1', fontSize: '13px', fontWeight: '800' }}>
                Laws made under it · Law register
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
            </ScreenLink>
          </div>

          <div
            aria-hidden="true"
            style={{
              flex: 'none',
              position: 'relative',
              zIndex: '2',
              height: '26px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '999px',
              background: 'linear-gradient(#E2B47F 0%, #C08A5B 55%, #8E5A35 100%)',
              boxShadow: '3px 4px 0 #2A2522',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '10px',
                top: '4px',
                bottom: '4px',
                width: '7px',
                borderRadius: '3px',
                background: '#8E4129',
              }}
            />{' '}
            <span
              style={{
                position: 'absolute',
                right: '10px',
                top: '4px',
                bottom: '4px',
                width: '7px',
                borderRadius: '3px',
                background: '#8E4129',
              }}
            />
          </div>
        </section>
      </div>
    );
  }
}
