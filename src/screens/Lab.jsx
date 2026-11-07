// Lab
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Lab extends Screen {
  static title = 'Lab';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const booked = this.state.booked ?? false;
    const B = [
      {
        name: 'Kora Labs bench 1',
        who: 'Amara · big batch',
        tone: '#7A4A2E',
        flask: '#E3F0DF',
        light: '#F2CE6E',
      },
      { name: 'Kora Labs bench 2', who: 'Zainab', tone: '#8B5A3C', flask: '#CFE3F4', light: '#8FC1A9' },
      {
        name: 'Public bench',
        who: booked ? 'Amara · booked 1 h' : 'Free',
        tone: booked ? '#7A4A2E' : null,
        flask: '#FDE3C8',
        light: booked ? '#F2CE6E' : '#FFFDF8',
        free: !booked,
      },
      { name: 'Ndura survey room', who: 'Chidi', tone: '#7A4A2E', flask: '#EFE4CF', light: '#8FC1A9' },
    ];
    const benches = B.map((b) => ({
      name: b.name,
      who: b.who,
      flask: b.flask,
      light: b.light,
      label: b.name + ', ' + (b.free ? 'free' : 'in use by ' + b.who),
      canBook: !!b.free,
      face: b.tone
        ? 'width: 16px; height: 16px; flex: none; border-radius: 50%; border: 2px solid #2A2522; background: ' +
          b.tone +
          ';'
        : 'width: 16px; height: 16px; flex: none; border-radius: 50%; border: 2px dashed #2A2522;',
      book: () => this.setState({ booked: true }),
    }));
    const fund = this.state.fund ?? null;
    const pct = 64 + (fund ? 4 : 0);
    const P = [
      {
        title: 'What makes the new alloy strongest?',
        owner: 'Kora Labs · you and Zainab',
        chip: 'Result 9 pm',
        chipBg: '#F2CE6E',
        bg: '#E3F0DF',
        fill: '#9DB8E0',
        glyph: 'M9 3 H15 M10 3 V9 L4 19 Q3 22 6 22 H18 Q21 22 20 19 L14 9 V3',
        mine: true,
      },
      {
        title: 'Cooling a room without power',
        owner: 'Building project · funded by residents',
        chip: pct + '%',
        chipBg: '#8FC1A9',
        bg: '#CFE3F4',
        fill: '#FFFDF8',
        glyph: 'M12 2 V22 M3 7 L21 17 M21 7 L3 17 M9 3 L12 5 L15 3 M9 21 L12 19 L15 21',
        fund: true,
      },
      {
        title: 'Mapping the ore under floor 1',
        owner: 'Ndura Mining · company notes',
        chip: '3 days left',
        chipBg: '#F5EFE5',
        bg: '#EFE4CF',
        fill: '#C08A5B',
        glyph: 'M2 20 L9 8 L13 14 L16 10 L22 20 Z M9 8 V3',
      },
    ];
    const projects = P.map((p) => ({
      title: p.title,
      owner: p.owner,
      chip: p.chip,
      bg: p.bg,
      fill: p.fill,
      glyph: p.glyph,
      chipStyle:
        'flex: none; font-size: 12px; font-weight: 800; border: 2px solid #2A2522; border-radius: 999px; padding: 0 8px; background: ' +
        p.chipBg +
        ';',
      isMine: !!p.mine,
      isFund: !!p.fund,
      pct: String(pct),
      bar:
        'display: block; height: 100%; width: ' +
        pct +
        '%; background: #8FC1A9; border-right: 2px solid #2A2522;',
      canGive: !fund,
      gave: !!fund,
      gaveText:
        fund === 'her'
          ? "Amara chipped in 5 · she's careful with money"
          : 'You chipped in 10 · credited in the paper',
      give: () => this.setState({ fund: 'you' }),
      hand: () => this.setState({ fund: 'her' }),
    }));
    const X = [
      {
        name: 'Copper keeps the cold',
        by: 'Found by Zainab · cycle 9',
        cites: '12 cites',
        bg: '#CFE3F4',
        fill: '#9DB8E0',
        glyph: 'M9 3 H15 M10 3 V9 L4 19 Q3 22 6 22 H18 Q21 22 20 19 L14 9 V3',
      },
      {
        name: 'Rice ripens faster in shade',
        by: 'Found by Chidi and Musa · cycle 7',
        cites: '8 cites',
        bg: '#E3F0DF',
        fill: '#8FC1A9',
        glyph: 'M4 20 C4 10 10 4 20 4 C20 14 14 20 4 20 Z M4 20 L13 11',
      },
      {
        name: 'Two signals beat one',
        by: 'Found by Kemi · cycle 5 · superseded',
        cites: '3 cites',
        bg: '#F5EFE5',
        fill: '#FDE3C8',
        glyph:
          'M8 9 A3 3 0 1 0 8.01 9 Z M16 9 A3 3 0 1 0 16.01 9 Z M2 21 C2 15 14 15 14 21 M10 21 C10 15 22 15 22 21',
      },
    ];
    const principles = X.map((x, i) => ({
      ...x,
      row:
        'display: flex; align-items: center; gap: 10px; padding: 8px 0;' +
        (i < X.length - 1 ? ' border-bottom: 1.5px dashed #5E564D;' : ''),
    }));
    return { accent, benches, projects, principles };
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
            href="Main.dc.html"
            aria-label="Back to the building"
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
              Lab
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Floor 6 · Mind quarter
            </span>
          </div>

          <span
            role="img"
            aria-label="5 residents here now"
            style={{
              height: '34px',
              boxSizing: 'border-box',
              border: '2.5px solid #2A2522',
              borderRadius: '999px',
              background: '#FFFDF8',
              boxShadow: '2px 3px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '0 10px 0 6px',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '14px',
              fontWeight: '700',
            }}
          >
            <span
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '2px solid #2A2522',
                background: '#8B5A3C',
              }}
            />
            <span
              style={{
                width: '18px',
                height: '18px',
                marginLeft: '-10px',
                borderRadius: '50%',
                border: '2px solid #2A2522',
                background: '#A8714A',
              }}
            />
            5 here
          </span>
        </header>

        <div
          className="lb-scroll"
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
          {/* Benches */}

          <section
            aria-label="Benches"
            style={{
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#2F6B5F',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
            }}
          >
            {vals.benches.map((b, $index) => (
              <div
                key={$index}
                aria-label={b.label}
                style={{
                  border: '2.5px solid #2A2522',
                  borderRadius: '14px',
                  background: '#FFFDF8',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <svg
                  width="100%"
                  height="46"
                  viewBox="0 0 140 46"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <rect
                    x="6"
                    y="30"
                    width="128"
                    height="8"
                    rx="2"
                    fill="#C08A5B"
                    stroke="#2A2522"
                    strokeWidth="2.5"
                  />

                  <path d="M16 38 V46 M124 38 V46" stroke="#2A2522" strokeWidth="3" />

                  <path
                    d="M30 8 V16 L22 28 H44 L36 16 V8 Z"
                    fill={b.flask}
                    stroke="#2A2522"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />

                  <path d="M28 8 H38" stroke="#2A2522" strokeWidth="2.2" strokeLinecap="round" />

                  <rect
                    x="58"
                    y="14"
                    width="10"
                    height="16"
                    rx="2"
                    fill="#FFFDF8"
                    stroke="#2A2522"
                    strokeWidth="2.2"
                  />

                  <rect
                    x="72"
                    y="18"
                    width="10"
                    height="12"
                    rx="2"
                    fill="#F2CE6E"
                    stroke="#2A2522"
                    strokeWidth="2.2"
                  />

                  <circle cx="108" cy="20" r="9" fill={b.light} stroke="#2A2522" strokeWidth="2.2" />
                </svg>

                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '14px',
                    fontWeight: '600',
                    lineHeight: '1.1',
                  }}
                >
                  {b.name}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={css(b.face)} />

                  <span style={{ flex: '1', fontSize: '11.5px', fontWeight: '800', color: '#5E564D' }}>
                    {b.who}
                  </span>
                </div>

                {b.canBook ? (
                  <button
                    type="button"
                    onClick={b.book}
                    style={{
                      all: 'unset',
                      height: '32px',
                      boxSizing: 'border-box',
                      borderRadius: '999px',
                      background: vals.accent,
                      border: '2.5px solid #2A2522',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '13.5px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Book 1 hour
                  </button>
                ) : null}
              </div>
            ))}
          </section>

          {/* Projects running here */}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
              Running here
            </span>

            <span
              style={{ flex: '1', height: '3px', borderRadius: '2px', background: '#2A2522', opacity: '.15' }}
            />
          </div>

          {vals.projects.map((p, $index) => (
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
                    width: '38px',
                    height: '38px',
                    flex: 'none',
                    boxSizing: 'border-box',
                    border: '2.5px solid #2A2522',
                    borderRadius: '12px',
                    background: p.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d={p.glyph}
                      fill={p.fill}
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
                      fontSize: '15.5px',
                      fontWeight: '600',
                      lineHeight: '1.15',
                    }}
                  >
                    {p.title}
                  </span>

                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#5E564D' }}>{p.owner}</span>
                </div>

                <span style={css(p.chipStyle)}>{p.chip}</span>
              </div>

              {p.isFund ? (
                <>
                  <div
                    role="img"
                    aria-label={`${p.pct} percent funded`}
                    style={{
                      height: '14px',
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '999px',
                      background: '#F5EFE5',
                      overflow: 'hidden',
                    }}
                  >
                    <span style={css(p.bar)} />
                  </div>

                  {p.canGive ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={p.give}
                        style={{
                          all: 'unset',
                          flex: '1',
                          height: '38px',
                          boxSizing: 'border-box',
                          borderRadius: '999px',
                          background: vals.accent,
                          border: '2.5px solid #2A2522',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: "'Fredoka', sans-serif",
                          fontSize: '14.5px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        Chip in 10
                      </button>

                      <button
                        type="button"
                        onClick={p.hand}
                        style={{
                          all: 'unset',
                          flex: '1',
                          height: '38px',
                          boxSizing: 'border-box',
                          borderRadius: '999px',
                          background: '#FFFDF8',
                          border: '2.5px dashed #2A2522',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: "'Fredoka', sans-serif",
                          fontSize: '14.5px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        Hand Off
                      </button>
                    </div>
                  ) : null}

                  {p.gave ? (
                    <span
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '14.5px',
                        fontWeight: '600',
                        color: '#2E4A3B',
                      }}
                    >
                      {p.gaveText}
                    </span>
                  ) : null}
                </>
              ) : null}

              {p.isMine ? (
                <ScreenLink
                  href="Notebook.dc.html"
                  style={{
                    alignSelf: 'flex-start',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#8E4129',
                    textDecoration: 'none',
                  }}
                >
                  Open the notebook →
                </ScreenLink>
              ) : null}
            </div>
          ))}

          {/* The canon: published principles */}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
              Principles found here
            </span>

            <span
              style={{ flex: '1', height: '3px', borderRadius: '2px', background: '#2A2522', opacity: '.15' }}
            />
          </div>

          <section
            aria-label="Published principles"
            style={{
              border: '3px solid #2A2522',
              borderRadius: '18px',
              background: '#2A2522',
              color: '#FFFDF8',
              boxShadow: '3px 4px 0 #8E4129',
              padding: '6px 12px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {vals.principles.map((x, $index) => (
              <div key={$index} style={css(x.row)}>
                <span
                  style={{
                    width: '30px',
                    height: '30px',
                    flex: 'none',
                    boxSizing: 'border-box',
                    border: '2px solid #F5EFE5',
                    borderRadius: '9px',
                    background: x.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d={x.glyph}
                      fill={x.fill}
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
                      fontSize: '14.5px',
                      fontWeight: '600',
                      color: '#F2CE6E',
                    }}
                  >
                    {x.name}
                  </span>

                  <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#CFC6B8' }}>{x.by}</span>
                </div>

                <span
                  style={{ fontSize: '11.5px', fontWeight: '800', color: '#CFC6B8', whiteSpace: 'nowrap' }}
                >
                  {x.cites}
                </span>
              </div>
            ))}
          </section>
        </div>
      </div>
    );
  }
}
