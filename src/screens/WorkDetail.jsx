// Published work
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class WorkDetail extends Screen {
  static title = 'Published work';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const votes = this.state.votes ?? {};
    const paras = [
      "Everyone is talking about Thursday's rent cap. I am talking about the lift. It has been broken for nine days, and the people who pay for that are the ones on the top floors, carrying water up the stairs.",
      'A cap on rent is fine. But a room on floor nine with no lift is not worth the same as a room on floor two, cap or no cap. The council should fix what we already pay for before it argues about what we might pay next season.',
      "So here is my ask: put the lift repair on Thursday's agenda first. Then vote on the cap.",
    ].map((t) => ({ t }));
    const groups = [
      ['Practical readers', 82],
      ['Familiar-taste', 71],
      ['Novel-taste', 38],
      ['Dark-tone fans', 45],
    ].map(([name, pct]) => ({
      name,
      pct: String(pct),
      bar:
        'display: block; height: 100%; width: ' +
        pct +
        '%; background: ' +
        (pct >= 60 ? '#8FC1A9' : pct >= 45 ? '#F2CE6E' : '#F2B8AE') +
        '; border-right: 2px solid #2A2522;',
    }));
    const vbtn = (on) =>
      'all: unset; cursor: pointer; height: 28px; padding: 0 10px; box-sizing: border-box; border: 2px solid #2A2522; border-radius: 999px; font-size: 12.5px; font-weight: 800; display: flex; align-items: center; background: ' +
      (on ? accent : '#FFFDF8') +
      ';';
    const reviews = [
      {
        id: 'r1',
        name: 'Bayo',
        tone: '#6B4027',
        text: 'Finally someone says it. Floor nine has been forgotten.',
        up: 7,
        down: 0,
      },
      {
        id: 'r2',
        name: 'Kemi',
        tone: '#A8714A',
        text: 'Fair point, but the cap and the lift are not either-or. We can do both.',
        up: 5,
        down: 1,
      },
    ].map((r) => {
      const v = votes[r.id];
      return {
        name: r.name,
        text: r.text,
        face:
          'width: 26px; height: 26px; flex: none; box-sizing: border-box; border-radius: 50%; border: 2.5px solid #2A2522; background: ' +
          r.tone +
          ';',
        up: String(r.up + (v === 'up' ? 1 : 0)),
        down: String(r.down + (v === 'down' ? 1 : 0)),
        upStyle: vbtn(v === 'up'),
        downStyle: vbtn(v === 'down'),
        voteUp: () => this.setState({ votes: { ...votes, [r.id]: v === 'up' ? null : 'up' } }),
        voteDown: () => this.setState({ votes: { ...votes, [r.id]: v === 'down' ? null : 'down' } }),
      };
    });
    return { accent, paras, groups, reviews };
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
            href="Writing.dc.html"
            aria-label="Back to Writing"
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
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '1.1',
              }}
            >
              Your column
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Block A Times · Tue · page 2
            </span>
          </div>
        </header>

        <div
          className="wd-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            padding: '6px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* The piece as readers see it */}

          <article
            style={{
              border: '3px solid #2A2522',
              borderRadius: '6px',
              background: '#FBF6EC',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: '800',
                  letterSpacing: '.08em',
                  background: '#2A2522',
                  color: '#F2CE6E',
                  borderRadius: '999px',
                  padding: '1px 8px',
                }}
              >
                OPINION
              </span>

              <span style={{ flex: '1' }} />

              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '12px',
                  fontWeight: '800',
                  color: '#5E564D',
                }}
              >
                <span
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: '2px solid #2A2522',
                    background: '#7A4A2E',
                  }}
                />
                by Amara
                <span
                  title="You wrote this"
                  style={{
                    width: '20px',
                    height: '20px',
                    boxSizing: 'border-box',
                    border: '2px solid #2A2522',
                    borderRadius: '50%',
                    background: '#CFE3F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M4 20 l3 -1 l12 -12 a2 2 0 0 0 -3 -3 l-12 12 z"
                      fill="#FFFDF8"
                      stroke="#2A2522"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </div>

            <h2
              style={{
                margin: '0',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '26px',
                fontWeight: '700',
                lineHeight: '1.05',
              }}
            >
              Fix the lift before the cap
            </h2>

            <div
              style={{
                borderTop: '1.5px solid #2A2522',
                paddingTop: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {vals.paras.map((p, $index) => (
                <p
                  key={$index}
                  style={{ margin: '0', fontSize: '14.5px', fontWeight: '600', lineHeight: '1.55' }}
                >
                  {p.t}
                </p>
              ))}
            </div>

            <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#8A8075' }}>
              Opinion. Not the Times' record.
            </span>
          </article>

          {/* Two signals, kept apart */}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <section
              aria-label="Players' votes"
              style={{
                border: '3px solid #2A2522',
                borderRadius: '18px',
                background: '#FFFDF8',
                boxShadow: '3px 4px 0 #2A2522',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span
                style={{ fontSize: '10.5px', fontWeight: '800', letterSpacing: '.05em', color: '#5E564D' }}
              >
                PLAYERS' VOTES
              </span>

              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '22px', fontWeight: '700' }}>
                ▲ 14
              </span>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#8E4129',
                }}
              >
                ▼ 3
              </span>

              <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#5E564D' }}>
                Real players only
              </span>
            </section>

            <section
              aria-label="Royalties"
              style={{
                border: '3px solid #2A2522',
                borderRadius: '18px',
                background: '#E3F0DF',
                boxShadow: '3px 4px 0 #2A2522',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span
                style={{ fontSize: '10.5px', fontWeight: '800', letterSpacing: '.05em', color: '#5E564D' }}
              >
                ROYALTIES
              </span>

              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '22px',
                  fontWeight: '700',
                }}
              >
                +
                <svg width="12" height="16" viewBox="0 0 30 40" aria-hidden="true">
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
                8
              </span>

              <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#4A433B', lineHeight: '1.3' }}>
                4 a day while it runs. Votes don't change it.
              </span>
            </section>
          </div>

          <section
            aria-label="How the building read it"
            style={{
              border: '3px dashed #2A2522',
              borderRadius: '18px',
              background: '#FFFDF8',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  flex: '1',
                  fontSize: '10.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  color: '#5E564D',
                }}
              >
                HOW THE BUILDING READ IT
              </span>

              <span style={{ fontSize: '12px', fontWeight: '800' }}>31 readers</span>
            </div>

            {vals.groups.map((g, $index) => (
              <div key={$index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '118px', fontSize: '12.5px', fontWeight: '800' }}>{g.name}</span>

                <div
                  role="img"
                  aria-label={`${g.name}: ${g.pct} percent liked it`}
                  style={{
                    flex: '1',
                    height: '12px',
                    border: '2px solid #2A2522',
                    borderRadius: '999px',
                    background: '#F5EFE5',
                    overflow: 'hidden',
                  }}
                >
                  <span style={css(g.bar)} />
                </div>

                <span style={{ width: '34px', textAlign: 'right', fontSize: '12px', fontWeight: '800' }}>
                  {g.pct}%
                </span>
              </div>
            ))}

            <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#5E564D' }}>
              Worked out from residents' taste, without anyone reading it.
            </span>
          </section>

          {/* Reviews: free text, so they get votes too */}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
              Reviews
            </span>

            <span
              style={{ flex: '1', height: '3px', borderRadius: '2px', background: '#2A2522', opacity: '.15' }}
            />
          </div>

          {vals.reviews.map((r, $index) => (
            <div
              key={$index}
              style={{
                border: '3px solid #2A2522',
                borderRadius: '18px',
                background: '#FFFDF8',
                boxShadow: '3px 4px 0 #2A2522',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span aria-hidden="true" style={css(r.face)} />

                <span
                  style={{
                    flex: '1',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '15px',
                    fontWeight: '600',
                  }}
                >
                  {r.name}
                </span>
              </div>

              <span style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.35' }}>{r.text}</span>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button type="button" aria-label="Vote up" onClick={r.voteUp} style={css(r.upStyle)}>
                  ▲ <span>{r.up}</span>
                </button>

                <button type="button" aria-label="Vote down" onClick={r.voteDown} style={css(r.downStyle)}>
                  ▼ <span>{r.down}</span>
                </button>
              </div>
            </div>
          ))}

          <ScreenLink
            href="Writing.dc.html"
            style={{
              height: '52px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '999px',
              background: vals.accent,
              boxShadow: '3px 4px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '17px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Write a follow-up
          </ScreenLink>
        </div>
      </div>
    );
  }
}
