// Career
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Career extends Screen {
  static title = 'Career';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const R = [
      ['Lead scientist', '520 a cycle'],
      ['Researcher', '420 a cycle'],
      ['Lab technician', 'Next · 340 a cycle'],
      ['Lab assistant', 'Now · 260 a cycle'],
      ['Trainee', 'Done'],
    ];
    const rungs = R.map(([name, sub], i) => ({
      name,
      sub,
      s:
        'display: flex; flex-direction: column; padding: 4px 8px; border-radius: 10px;' +
        (i === 3
          ? ' background: ' + accent + '; color: #2A2522; border: 2.5px solid #2A2522;'
          : i === 2
            ? ' border: 2.5px dashed #F2CE6E;'
            : ' opacity: ' + (i < 2 ? '.6' : '.75') + ';'),
    }));
    const marker =
      'position: absolute; left: 13px; top: 148px; width: 28px; height: 28px; box-sizing: border-box; border-radius: 50%; border: 3px solid #2A2522; background: #7A4A2E; box-shadow: 0 0 0 3px #F2CE6E;';
    const N = [
      ['Lab work skill', 'good', 100],
      ['Days worked', '40 of 50', 80],
      ['Reputation', 'trusted', 100],
      ['Chemistry', '71 of 75', 95],
    ];
    const needs = N.map(([name, val, pct]) => ({
      name,
      val,
      icon: pct >= 100 ? '✓' : '…',
      mark:
        'width: 22px; height: 22px; flex: none; box-sizing: border-box; border: 2px solid #2A2522; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; background: ' +
        (pct >= 100 ? '#8FC1A9' : '#F2CE6E') +
        ';',
      bar:
        'display: block; height: 100%; width: ' +
        pct +
        '%; background: ' +
        (pct >= 100 ? '#8FC1A9' : '#F2CE6E') +
        '; border-right: 2px solid #2A2522;',
    }));
    const js = this.state.js ?? {};
    const J = [
      {
        id: 'rep',
        title: 'Junior reporter',
        where: 'Block A Times · floor 3',
        pay: 240,
        fit: 'Fair fit · Writing is decent',
        fitBg: '#F2CE6E',
        bg: '#EFE4CF',
        fill: '#FFFDF8',
        glyph: 'M3 5 H17 V19 H5 A2 2 0 0 1 3 17 Z M17 9 H21 V17 A2 2 0 0 1 17 19 M6 9 H14 M6 13 H14',
        her: 'Amara stayed: promotion is close',
      },
      {
        id: 'tel',
        title: 'Bank teller',
        where: 'Block A Bank · floor 1',
        pay: 280,
        fit: 'Good fit · Numbers are good',
        fitBg: '#8FC1A9',
        bg: '#CFE3F4',
        fill: '#E8B53A',
        glyph: 'M12 3 A9 9 0 1 0 12.01 3 Z M12 7 V17 M9 9 H15',
        her: 'Amara stayed: promotion is close',
      },
    ];
    const jobs = J.map((j) => {
      const s = js[j.id];
      return {
        title: j.title,
        where: j.where,
        pay: String(j.pay),
        fit: j.fit,
        bg: j.bg,
        fill: j.fill,
        glyph: j.glyph,
        fitStyle:
          'align-self: flex-start; font-size: 12px; font-weight: 800; border: 2px solid #2A2522; border-radius: 999px; padding: 0 8px; background: ' +
          j.fitBg +
          ';',
        open: !s,
        done: !!s,
        byYou: s === 'you',
        byHer: s === 'her',
        result: s === 'you' ? 'Applied · interview on Thursday' : j.her,
        whoIcon:
          'width: 24px; height: 24px; flex: none; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center; ' +
          (s === 'you'
            ? 'border: 2px solid #2A2522; background: #CFE3F4;'
            : 'border: 2px dashed #2A2522; background: #EFE4CF;'),
        apply: () => this.setState({ js: { ...js, [j.id]: 'you' } }),
        hand: () => this.setState({ js: { ...js, [j.id]: 'her' } }),
      };
    });
    const H = [
      ['Cycle 6 · now', 'Lab assistant, Kora Labs', 'Promoted after 3 cycles', 'her'],
      ['Cycle 3', 'Trainee, Kora Labs', 'Answered a notice in the lobby', 'you'],
      ['Cycle 1', 'Shelf stacker, Sabi Foods', 'First job in Block A', 'you'],
    ];
    const history = H.map(([when, role, how, by], i) => ({
      when,
      role,
      how,
      byYou: by === 'you',
      byHer: by === 'her',
      dot:
        'width: 14px; height: 14px; flex: none; box-sizing: border-box; border-radius: 50%; border: 2.5px solid #2A2522; background: ' +
        (i === 0 ? accent : '#FFFDF8') +
        '; margin-top: 2px;',
      line: i < H.length - 1 ? 'flex: 1; width: 3px; background: #2A2522; opacity: .2;' : 'display: none;',
      whoIcon:
        'width: 22px; height: 22px; flex: none; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center; ' +
        (by === 'you'
          ? 'border: 2px solid #2A2522; background: #CFE3F4;'
          : 'border: 2px dashed #2A2522; background: #EFE4CF;'),
    }));
    return { accent, rungs, marker, needs, jobs, history };
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
            href="Work.dc.html"
            aria-label="Back to Work"
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
            Career
          </h1>
        </header>

        <div
          className="cr-scroll"
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
          {/* The ladder at Kora Labs */}

          <section
            aria-label="Kora Labs ladder"
            style={{
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#2F6B5F',
              color: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px 14px',
              display: 'flex',
              gap: '14px',
            }}
          >
            <div style={{ position: 'relative', width: '54px', flex: 'none' }}>
              <svg
                width="54"
                height="236"
                viewBox="0 0 54 236"
                aria-hidden="true"
                style={{ display: 'block' }}
              >
                <path d="M10 6 V230 M44 6 V230" stroke="#8E4129" strokeWidth="6" strokeLinecap="round" />

                <path d="M10 6 V230 M44 6 V230" stroke="#2A2522" strokeWidth="1.5" fill="none" />

                <path
                  d="M10 26 H44 M10 72 H44 M10 118 H44 M10 164 H44 M10 210 H44"
                  stroke="#FFFDF8"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>{' '}
              <span style={css(vals.marker)} />
            </div>

            <div
              style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '6px 0',
              }}
            >
              {vals.rungs.map((r, $index) => (
                <div key={$index} style={css(r.s)}>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '15px',
                      fontWeight: '600',
                      lineHeight: '1.1',
                    }}
                  >
                    {r.name}
                  </span>

                  <span style={{ fontSize: '11.5px', fontWeight: '800', opacity: '.85' }}>{r.sub}</span>
                </div>
              ))}
            </div>
          </section>

          {/* What the next step needs */}

          <section
            aria-label="Next step"
            style={{
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  flex: '1',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '17px',
                  fontWeight: '600',
                }}
              >
                To lab technician
              </span>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '16px',
                  fontWeight: '700',
                  background: '#8FC1A9',
                  border: '2.5px solid #2A2522',
                  borderRadius: '999px',
                  padding: '0 10px',
                }}
              >
                72%
              </span>
            </div>

            {vals.needs.map((n, $index) => (
              <div key={$index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={css(n.mark)}>{n.icon}</span>

                <span style={{ width: '112px', fontSize: '13px', fontWeight: '800' }}>{n.name}</span>

                <div
                  role="img"
                  aria-label={`${n.name}: ${n.val}`}
                  style={{
                    flex: '1',
                    height: '12px',
                    border: '2px solid #2A2522',
                    borderRadius: '999px',
                    background: '#F5EFE5',
                    overflow: 'hidden',
                  }}
                >
                  <span style={css(n.bar)} />
                </div>

                <span style={{ width: '62px', textAlign: 'right', fontSize: '12px', fontWeight: '800' }}>
                  {n.val}
                </span>
              </div>
            ))}

            <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#4A433B', lineHeight: '1.3' }}>
              Pay rises to 340 a cycle. Kora Labs decides when all four are met.
            </span>
          </section>

          {/* Other jobs open in the building */}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
              Open in Block A
            </span>

            <span
              style={{ flex: '1', height: '3px', borderRadius: '2px', background: '#2A2522', opacity: '.15' }}
            />
          </div>

          {vals.jobs.map((j, $index) => (
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
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '40px',
                    height: '40px',
                    flex: 'none',
                    boxSizing: 'border-box',
                    border: '2.5px solid #2A2522',
                    borderRadius: '12px',
                    background: j.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d={j.glyph}
                      fill={j.fill}
                      stroke="#2A2522"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '16px',
                      fontWeight: '600',
                      lineHeight: '1.15',
                    }}
                  >
                    {j.title}
                  </span>

                  <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#5E564D' }}>{j.where}</span>
                </div>

                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    fontSize: '13px',
                    fontWeight: '800',
                    background: '#E3F0DF',
                    border: '2px solid #2A2522',
                    borderRadius: '999px',
                    padding: '0 8px',
                  }}
                >
                  <svg width="7" height="10" viewBox="0 0 30 40" aria-hidden="true">
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
                  {j.pay}
                </span>
              </div>

              <span style={css(j.fitStyle)}>{j.fit}</span>

              {j.open ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={j.apply}
                    style={{
                      all: 'unset',
                      flex: '1',
                      height: '40px',
                      boxSizing: 'border-box',
                      borderRadius: '999px',
                      background: vals.accent,
                      border: '2.5px solid #2A2522',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Apply
                  </button>

                  <button
                    type="button"
                    onClick={j.hand}
                    style={{
                      all: 'unset',
                      flex: '1',
                      height: '40px',
                      boxSizing: 'border-box',
                      borderRadius: '999px',
                      background: '#FFFDF8',
                      border: '2.5px dashed #2A2522',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Hand Off
                  </button>
                </div>
              ) : null}

              {j.done ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={css(j.whoIcon)}>
                    {j.byYou ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M4 20 l3 -1 l12 -12 a2 2 0 0 0 -3 -3 l-12 12 z"
                          fill="#FFFDF8"
                          stroke="#2A2522"
                          strokeWidth="2.6"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}

                    {j.byHer ? (
                      <svg width="14" height="14" viewBox="0 0 40 40" aria-hidden="true">
                        <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                        <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                        <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                      </svg>
                    ) : null}
                  </span>

                  <span
                    style={{
                      flex: '1',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '15px',
                      fontWeight: '600',
                    }}
                  >
                    {j.result}
                  </span>
                </div>
              ) : null}
            </div>
          ))}

          {/* History */}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
              So far
            </span>

            <span
              style={{ flex: '1', height: '3px', borderRadius: '2px', background: '#2A2522', opacity: '.15' }}
            />
          </div>

          <section
            aria-label="Career history"
            style={{
              border: '3px solid #2A2522',
              borderRadius: '18px',
              background: '#FFFDF8',
              boxShadow: '3px 4px 0 #2A2522',
              padding: '10px 12px 10px 14px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {vals.history.map((h, $index) => (
              <div key={$index} style={{ display: 'flex', gap: '10px' }}>
                <div
                  style={{
                    width: '16px',
                    flex: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <span style={css(h.dot)} />

                  <span style={css(h.line)} />
                </div>

                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#8A8075' }}>{h.when}</span>

                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}>
                    {h.role}
                  </span>

                  <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#5E564D' }}>{h.how}</span>
                </div>

                <span style={css(h.whoIcon)}>
                  {h.byYou ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M4 20 l3 -1 l12 -12 a2 2 0 0 0 -3 -3 l-12 12 z"
                        fill="#FFFDF8"
                        stroke="#2A2522"
                        strokeWidth="2.6"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}

                  {h.byHer ? (
                    <svg width="13" height="13" viewBox="0 0 40 40" aria-hidden="true">
                      <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                      <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                      <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                    </svg>
                  ) : null}
                </span>
              </div>
            ))}
          </section>
        </div>
      </div>
    );
  }
}
