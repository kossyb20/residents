// Play
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Play extends Screen {
  static title = 'Play';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const ludo = this.state.ludo ?? 'her';
    const chess = this.state.chess ?? 'wait';
    const t = this.state.t ?? null;
    const games = [
      {
        isLudo: true,
        isChess: false,
        title: 'Ludo · Arcade table 3',
        sub: ludo === 'you' ? 'You took over · your roll' : "4 players · she's in 2nd",
        isHer: ludo === 'her',
        isWait: false,
        isYou: ludo === 'you',
        mainLabel: ludo === 'you' ? 'Give back' : 'Take over',
        hasLink: true,
        href: 'Ludo.dc.html',
        linkLabel: 'Open table',
        hasMain: false,
        canHand: false,
        main: () => this.setState({ ludo: ludo === 'you' ? 'her' : 'you' }),
        hand: () => {},
      },
      {
        isLudo: false,
        isChess: true,
        title: 'Chess vs Tunde',
        sub:
          chess === 'wait'
            ? 'Your move · 2 h left'
            : chess === 'you'
              ? 'You moved · his turn'
              : 'She moved · his turn',
        isHer: chess === 'her',
        isWait: chess === 'wait',
        isYou: chess === 'you',
        mainLabel: chess === 'wait' ? 'Play' : 'Open',
        hasLink: true,
        href: 'Chess.dc.html',
        linkLabel: chess === 'wait' ? 'Play' : 'Open',
        hasMain: false,
        canHand: chess === 'wait',
        main: () => this.setState({ chess: 'you' }),
        hand: () => this.setState({ chess: 'her' }),
      },
    ];
    const LIB = [
      [
        'Ludo',
        'Ludo.dc.html',
        '1,240',
        '#F7D6D6',
        '#FFFDF8',
        'M5 5 H19 V19 H5 Z M9 9 h0.1 M15 15 h0.1 M12 12 h0.1',
      ],
      [
        'Chess',
        'Chess.dc.html',
        '980',
        '#FDE3C8',
        '#FFFDF8',
        'M7 21 H17 L16 17 H8 Z M9 17 C9 13 7 11 8 8 C9 5 13 4 15 6 L17 8 L15 10 C15 13 15 15 15 17',
      ],
      [
        'Ayo',
        'Ayo.dc.html',
        '1,040',
        '#E3F0DF',
        '#A86E48',
        'M2 7 H22 V17 H2 Z M6 10.5 A1.5 1.5 0 1 0 6.01 10.5 M12 10.5 A1.5 1.5 0 1 0 12.01 10.5 M18 10.5 A1.5 1.5 0 1 0 18.01 10.5',
      ],
      [
        'Draughts',
        'Draughts.dc.html',
        '1,010',
        '#F2B8AE',
        '#FFFDF8',
        'M12 4 A7 3 0 1 0 12.01 4 Z M5 7 V12 A7 3 0 0 0 19 12 V7 M5 12 V16 A7 3 0 0 0 19 16 V12',
      ],
      [
        'Reversi',
        'Reversi.dc.html',
        '1,090',
        '#BFE0C2',
        '#2A2522',
        'M12 3 A9 9 0 0 0 12 21 Z M12 3 A9 9 0 0 1 12 21',
      ],
      [
        'Four in a row',
        'FourInARow.dc.html',
        '1,150',
        '#CFE3F4',
        '#E8B53A',
        'M3 4 H21 V20 H3 Z M8 9 A2 2 0 1 0 8.01 9 M16 9 A2 2 0 1 0 16.01 9 M8 15 A2 2 0 1 0 8.01 15 M16 15 A2 2 0 1 0 16.01 15',
      ],
      [
        'Ultimate',
        'UltimateTTT.dc.html',
        '1,020',
        '#FDE3C8',
        'none',
        'M9 3 V21 M15 3 V21 M3 9 H21 M3 15 H21',
      ],
      ['Shapes', 'Shapes.dc.html', '1,060', '#EFE4CF', '#FFFDF8', 'M6 3 H18 V21 H6 Z M12 8 L16 15 H8 Z'],
      [
        'Go',
        'Go.dc.html',
        '820',
        '#E5B776',
        '#2A2522',
        'M8 8 A4 4 0 1 0 8.01 8 Z M16 16 A4 4 0 1 0 16.01 16 Z',
      ],
    ];
    const library = LIB.map(([name, href, rating, bg, fill, glyph]) => ({
      name,
      href,
      rating,
      fill,
      glyph,
      label: name + ', rating ' + rating,
      s:
        'position: relative; flex: none; width: 92px; height: 104px; box-sizing: border-box; border: 3px solid #2A2522; border-radius: 18px; background: ' +
        bg +
        '; box-shadow: 3px 4px 0 #2A2522; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 0 4px; text-decoration: none; color: #2A2522;',
    }));
    return {
      accent,
      games,
      library,
      seats: String(t ? 15 : 14),
      tOpen: !t,
      tDone: !!t,
      tText: t === 'you' ? "You're in · seat 15" : 'Amara entered · seat 15',
      enter: () => this.setState({ t: 'you' }),
      tHand: () => this.setState({ t: 'her' }),
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
            href="Home.dc.html"
            aria-label="Home"
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
            <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
              <path
                d="M4 15 L16 5 L28 15"
                fill="none"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 13 V27 H25 V13"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <rect
                x="13"
                y="18"
                width="6"
                height="9"
                rx="1"
                fill="#8E4129"
                stroke="#2A2522"
                strokeWidth="2"
              />
            </svg>
          </ScreenLink>

          <h1
            style={{
              flex: '1',
              margin: '0',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '26px',
              fontWeight: '700',
            }}
          >
            Play
          </h1>
        </header>

        {/* LED ticker: the place's news mixed with labelled sponsors */}

        <div
          role="marquee"
          aria-label="LUDO NIGHT Sat 8 pm · 412 of 512, SABI FOODS (sponsor), KEMI v TUNDE chess · 312 watching, KORA LABS (sponsor), 1,366 GAMES LIVE, BRIGHTLINE (sponsor)"
          style={{
            margin: '0 20px 10px',
            height: '34px',
            flex: 'none',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '12px',
            background: '#2A2522',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            className="rs-led"
            aria-hidden="true"
            style={{ display: 'flex', width: 'max-content', animationDuration: '33s' }}
          >
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#FFFDF8',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                LUDO NIGHT
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                Sat 8 pm · 412 of 512
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#E06A4E',
                textShadow: '0 0 8px #E06A4E99',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                SABI FOODS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Ludo Night</span>
              <span
                style={{
                  border: '1px solid #E06A4E',
                  borderRadius: '3px',
                  padding: '0 3px',
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  textShadow: 'none',
                  opacity: '.85',
                }}
              >
                SPONSOR
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#FFFDF8',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                KEMI v TUNDE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                chess · 312 watching
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#9DB8E0',
                textShadow: '0 0 8px #9DB8E099',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                KORA LABS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Chess blitz</span>
              <span
                style={{
                  border: '1px solid #9DB8E0',
                  borderRadius: '3px',
                  padding: '0 3px',
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  textShadow: 'none',
                  opacity: '.85',
                }}
              >
                SPONSOR
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#FFFDF8',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                1,366 GAMES LIVE
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#F2CE6E',
                textShadow: '0 0 8px #F2CE6E99',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                BRIGHTLINE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Featured table</span>
              <span
                style={{
                  border: '1px solid #F2CE6E',
                  borderRadius: '3px',
                  padding: '0 3px',
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  textShadow: 'none',
                  opacity: '.85',
                }}
              >
                SPONSOR
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#FFFDF8',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                LUDO NIGHT
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                Sat 8 pm · 412 of 512
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#E06A4E',
                textShadow: '0 0 8px #E06A4E99',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                SABI FOODS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Ludo Night</span>
              <span
                style={{
                  border: '1px solid #E06A4E',
                  borderRadius: '3px',
                  padding: '0 3px',
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  textShadow: 'none',
                  opacity: '.85',
                }}
              >
                SPONSOR
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#FFFDF8',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                KEMI v TUNDE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                chess · 312 watching
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#9DB8E0',
                textShadow: '0 0 8px #9DB8E099',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                KORA LABS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Chess blitz</span>
              <span
                style={{
                  border: '1px solid #9DB8E0',
                  borderRadius: '3px',
                  padding: '0 3px',
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  textShadow: 'none',
                  opacity: '.85',
                }}
              >
                SPONSOR
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#FFFDF8',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                1,366 GAMES LIVE
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#F2CE6E',
                textShadow: '0 0 8px #F2CE6E99',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                BRIGHTLINE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Featured table</span>
              <span
                style={{
                  border: '1px solid #F2CE6E',
                  borderRadius: '3px',
                  padding: '0 3px',
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  textShadow: 'none',
                  opacity: '.85',
                }}
              >
                SPONSOR
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
          </div>
        </div>

        {/* Games in progress */}

        <ul
          aria-label="Games in progress"
          style={{
            listStyle: 'none',
            margin: '0',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {vals.games.map((g, $index) => (
            <li
              key={$index}
              style={{
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '20px',
                background: '#FFFDF8',
                boxShadow: '4px 5px 0 #2A2522',
                padding: '10px 12px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              {g.isLudo ? (
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  role="img"
                  aria-label="Ludo board"
                  style={{ flex: 'none' }}
                >
                  <rect
                    x="2"
                    y="2"
                    width="60"
                    height="60"
                    rx="8"
                    fill="#FFFDF8"
                    stroke="#2A2522"
                    strokeWidth="3"
                  />

                  <rect
                    x="4"
                    y="4"
                    width="22"
                    height="22"
                    rx="4"
                    fill="#C8553D"
                    stroke="#2A2522"
                    strokeWidth="2"
                  />

                  <rect
                    x="38"
                    y="4"
                    width="22"
                    height="22"
                    rx="4"
                    fill="#2E4A3B"
                    stroke="#2A2522"
                    strokeWidth="2"
                  />

                  <rect
                    x="4"
                    y="38"
                    width="22"
                    height="22"
                    rx="4"
                    fill="#2F3E5C"
                    stroke="#2A2522"
                    strokeWidth="2"
                  />

                  <rect
                    x="38"
                    y="38"
                    width="22"
                    height="22"
                    rx="4"
                    fill="#E8B53A"
                    stroke="#2A2522"
                    strokeWidth="2"
                  />

                  <path d="M26 26 L38 26 L38 38 L26 38 Z" fill="#F5EFE5" stroke="#2A2522" strokeWidth="2" />

                  <path d="M26 26 L38 38 M38 26 L26 38" stroke="#2A2522" strokeWidth="1.5" />

                  <circle cx="15" cy="15" r="4" fill="#FFFDF8" stroke="#2A2522" strokeWidth="1.8" />

                  <circle cx="49" cy="49" r="4" fill="#FFFDF8" stroke="#2A2522" strokeWidth="1.8" />

                  <circle cx="32" cy="12" r="3.5" fill="#E8B53A" stroke="#2A2522" strokeWidth="1.6" />
                </svg>
              ) : null}

              {g.isChess ? (
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  role="img"
                  aria-label="Chess board"
                  style={{ flex: 'none' }}
                >
                  <rect
                    x="2"
                    y="2"
                    width="60"
                    height="60"
                    rx="8"
                    fill="#FDE3C8"
                    stroke="#2A2522"
                    strokeWidth="3"
                  />

                  <path
                    d="M5 5 h13.5 v13.5 h-13.5 Z M32 5 h13.5 v13.5 h-13.5 Z M18.5 18.5 h13.5 v13.5 h-13.5 Z M45.5 18.5 h13.5 v13.5 h-13.5 Z M5 32 h13.5 v13.5 h-13.5 Z M32 32 h13.5 v13.5 h-13.5 Z M18.5 45.5 h13.5 v13.5 h-13.5 Z M45.5 45.5 h13.5 v13.5 h-13.5 Z"
                    fill="#8E4129"
                  />

                  <path
                    d="M28 50 h12 l-2 -6 h-8 Z M30 44 l1 -10 h6 l1 10 M31 34 c-3 -2 -3 -8 3 -10 c6 2 6 8 3 10"
                    fill="#FFFDF8"
                    stroke="#2A2522"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}

              <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      flex: '1',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '17px',
                      fontWeight: '600',
                      lineHeight: '1.15',
                    }}
                  >
                    {g.title}
                  </span>

                  {g.isHer ? (
                    <span
                      role="img"
                      aria-label="She's playing on her own"
                      title="On her own"
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
                  ) : null}

                  {g.isWait ? (
                    <span
                      role="img"
                      aria-label="Waiting for you"
                      title="Waiting for you"
                      style={{
                        width: '26px',
                        height: '26px',
                        flex: 'none',
                        boxSizing: 'border-box',
                        border: '2px solid #2A2522',
                        borderRadius: '50%',
                        background: '#F7D6D6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M6 3 h12 M6 21 h12 M7 3 c0 6 10 6 10 9 c0 3 -10 3 -10 9 M17 3 c0 6 -10 6 -10 9 c0 3 10 3 10 9"
                          fill="none"
                          stroke="#2A2522"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : null}

                  {g.isYou ? (
                    <span
                      role="img"
                      aria-label="You're playing"
                      title="You're playing"
                      style={{
                        width: '26px',
                        height: '26px',
                        flex: 'none',
                        boxSizing: 'border-box',
                        border: '2px solid #2A2522',
                        borderRadius: '50%',
                        background: '#CFE3F4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M4 20 l3 -1 l12 -12 a2 2 0 0 0 -3 -3 l-12 12 z"
                          fill="#FFFDF8"
                          stroke="#2A2522"
                          strokeWidth="2.4"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : null}
                </div>

                <span style={{ fontSize: '13px', fontWeight: '700', color: '#5E564D' }}>{g.sub}</span>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {g.hasLink ? (
                    <ScreenLink
                      href={g.href}
                      style={{
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
                        fontSize: '15px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        color: '#2A2522',
                      }}
                    >
                      {g.linkLabel}
                    </ScreenLink>
                  ) : null}

                  {g.hasMain ? (
                    <button
                      type="button"
                      onClick={g.main}
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
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      {g.mainLabel}
                    </button>
                  ) : null}

                  {g.canHand ? (
                    <button
                      type="button"
                      onClick={g.hand}
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
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Hand Off
                    </button>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Game library with ratings */}

        <div style={{ margin: '18px 20px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
            Games
          </span>

          <span
            style={{ flex: '1', height: '3px', borderRadius: '2px', background: '#2A2522', opacity: '.15' }}
          />

          <ScreenLink
            href="TicTacToe.dc.html"
            style={{
              height: '30px',
              boxSizing: 'border-box',
              border: '2.5px solid #2A2522',
              borderRadius: '999px',
              background: '#FFFDF8',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '0 10px 0 6px',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 3 V21 M15 3 V21 M3 9 H21 M3 15 H21"
                fill="none"
                stroke="#2A2522"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
            Tutorial
          </ScreenLink>
        </div>

        <nav
          aria-label="Games"
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            padding: '10px 20px 8px',
            scrollbarWidth: 'none',
          }}
        >
          {vals.library.map((l, $index) => (
            <ScreenLink key={$index} href={l.href} aria-label={l.label} style={css(l.s)}>
              <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d={l.glyph}
                  fill={l.fill}
                  stroke="#2A2522"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '13.5px',
                  fontWeight: '600',
                  lineHeight: '1.1',
                  textAlign: 'center',
                }}
              >
                {l.name}
              </span>

              <span
                style={{
                  position: 'absolute',
                  top: '-9px',
                  right: '-6px',
                  height: '22px',
                  boxSizing: 'border-box',
                  padding: '0 6px',
                  border: '2.5px solid #2A2522',
                  borderRadius: '999px',
                  background: '#FFFDF8',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '11px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {l.rating}
              </span>
            </ScreenLink>
          ))}
        </nav>

        <div style={{ flex: '1' }} />

        {/* Tournament, styled as an event poster */}

        <section
          aria-label="Ludo Night tournament"
          style={{
            margin: '0 20px 24px',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: '#E8B53A',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            aria-hidden="true"
            style={{ position: 'absolute', right: '-24px', top: '-24px', opacity: '.35' }}
          >
            <circle
              cx="60"
              cy="60"
              r="56"
              fill="none"
              stroke="#FFFDF8"
              strokeWidth="10"
              strokeDasharray="14 12"
            />
          </svg>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
            <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true" style={{ flex: 'none' }}>
              <path
                d="M10 6 H44 V18 A17 17 0 0 1 10 18 Z"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <path
                d="M10 10 H3 Q3 22 12 24 M44 10 H51 Q51 22 42 24"
                fill="none"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <path
                d="M27 35 V42 M18 50 H36 L34 42 H20 Z"
                fill="#8E4129"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <circle cx="27" cy="17" r="5" fill="#C8553D" stroke="#2A2522" strokeWidth="2" />
            </svg>

            <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '23px',
                  fontWeight: '700',
                  lineHeight: '1.05',
                  letterSpacing: '.01em',
                }}
              >
                LUDO NIGHT
              </span>

              <span style={{ fontSize: '13px', fontWeight: '800' }}>Sat · 8 pm · Arcade</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', position: 'relative' }}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                fontSize: '13px',
                fontWeight: '800',
                background: '#FFFDF8',
                border: '2px solid #2A2522',
                borderRadius: '999px',
                padding: '1px 9px',
              }}
            >
              Entry
              <svg width="7" height="10" viewBox="0 0 30 40" aria-hidden="true" style={{ marginLeft: '3px' }}>
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
              10
            </span>

            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                fontSize: '13px',
                fontWeight: '800',
                background: '#FFFDF8',
                border: '2px solid #2A2522',
                borderRadius: '999px',
                padding: '1px 9px',
              }}
            >
              Prize
              <svg width="7" height="10" viewBox="0 0 30 40" aria-hidden="true" style={{ marginLeft: '3px' }}>
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
              200
            </span>

            <span
              style={{
                fontSize: '13px',
                fontWeight: '800',
                background: '#FFFDF8',
                border: '2px solid #2A2522',
                borderRadius: '999px',
                padding: '1px 9px',
              }}
            >
              {vals.seats}/32
            </span>
          </div>

          {vals.tOpen ? (
            <div style={{ display: 'flex', gap: '8px', position: 'relative' }}>
              <button
                type="button"
                onClick={vals.enter}
                style={{
                  all: 'unset',
                  flex: '1',
                  height: '44px',
                  boxSizing: 'border-box',
                  borderRadius: '999px',
                  background: '#2A2522',
                  color: '#FFFDF8',
                  border: '3px solid #2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Enter
              </button>

              <button
                type="button"
                onClick={vals.tHand}
                style={{
                  all: 'unset',
                  flex: '1',
                  height: '44px',
                  boxSizing: 'border-box',
                  borderRadius: '999px',
                  background: '#FFFDF8',
                  border: '3px dashed #2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Hand Off
              </button>
            </div>
          ) : null}

          {vals.tDone ? (
            <span
              style={{
                position: 'relative',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '17px',
                fontWeight: '600',
              }}
            >
              {vals.tText}
            </span>
          ) : null}
        </section>
      </div>
    );
  }
}
