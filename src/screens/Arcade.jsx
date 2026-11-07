// Arcade
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Arcade extends Screen {
  static title = 'Arcade';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const signed = this.state.signed ?? { ludo: false, chess: false, draughts: false };
    const amt = this.state.amt ?? 10;
    const gave = this.state.gave ?? null; // { by: 'you' | 'her', amt }

    // The nine agreed games, in library order, with how many tables are live right now.
    const G = [
      [
        'Ludo',
        412,
        '#FDE3C8',
        'M6 6 H34 V34 H6 Z',
        '#F2CE6E',
        'M20 6 V34 M6 20 H34 M13 11 A2 2 0 1 0 13.01 11 M27 25 A2 2 0 1 0 27.01 25',
        'none',
      ],
      [
        'Chess',
        286,
        '#EFE4CF',
        'M15 31 L17 17 H23 L25 31 Z M10 35 H30 V31 H10 Z',
        '#FFFDF8',
        'M20 6 A5 5 0 1 0 20.01 6',
        '#FFFDF8',
      ],
      [
        'Ayo',
        198,
        '#FFFDF8',
        'M8 12 H32 Q36 12 36 16 V24 Q36 28 32 28 H8 Q4 28 4 24 V16 Q4 12 8 12 Z',
        '#C08A5B',
        'M11 17 A3 3 0 1 0 11.01 17 M20 17 A3 3 0 1 0 20.01 17 M29 17 A3 3 0 1 0 29.01 17',
        '#2A2522',
      ],
      [
        'Draughts',
        121,
        '#F7D6D6',
        'M8 25 A12 5 0 1 0 32 25 A12 5 0 1 0 8 25 Z',
        '#C8553D',
        'M8 17 A12 5 0 1 0 32 17 A12 5 0 1 0 8 17 Z',
        '#C8553D',
      ],
      ['Shapes', 164, '#E3F0DF', 'M10 5 H30 V35 H10 Z', '#FFFDF8', 'M20 13 L27 26 H13 Z', '#C8553D'],
      [
        'Reversi',
        58,
        '#FFFDF8',
        'M20 6 A14 14 0 0 0 20 34 Z',
        '#2A2522',
        'M20 6 A14 14 0 1 1 20.01 6',
        'none',
      ],
      [
        'Four in a row',
        77,
        '#CFE3F4',
        'M6 8 H34 V34 H6 Z',
        '#2F3E5C',
        'M14 14 A3 3 0 1 0 14.01 14 M26 14 A3 3 0 1 0 26.01 14 M14 25 A3 3 0 1 0 14.01 25 M26 25 A3 3 0 1 0 26.01 25',
        '#F2CE6E',
      ],
      [
        'Ultimate tic-tac-toe',
        31,
        '#FDE3C8',
        'M6 6 H34 V34 H6 Z',
        '#FFFDF8',
        'M15 6 V34 M25 6 V34 M6 15 H34 M6 25 H34',
        'none',
      ],
      [
        'Go',
        19,
        '#EFE4CF',
        'M6 6 H34 V34 H6 Z',
        '#E2B47F',
        'M13 6 V34 M20 6 V34 M27 6 V34 M6 13 H34 M6 20 H34 M6 27 H34',
        'none',
      ],
    ];
    const short = { 'Ultimate tic-tac-toe': 'Ultimate TTT' };
    const games = G.map(([name, live, bg, icon, fill, detail, fill2]) => ({
      name: short[name] || name,
      label: name + ': ' + live + ' live games',
      live: live.toLocaleString('en-US'),
      icon,
      fill,
      detail,
      fill2,
      s:
        'box-sizing: border-box; border: 3px solid #2A2522; border-radius: 18px; background: ' +
        bg +
        '; box-shadow: 3px 4px 0 #2A2522; padding: 6px 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; text-decoration: none;',
    }));
    const totalLive = G.reduce((n, g) => n + g[1], 0).toLocaleString('en-US');

    const C = [
      {
        key: 'ludo',
        when: 'SATURDAY · 8 PM',
        name: 'Ludo Night',
        taken: 412,
        of: 512,
        terms: 'Entry 5 · prize pool 2,560',
        bg: '#5B3D62',
        fg: '#FFFDF8',
        kc: '#F2CE6E',
      },
      {
        key: 'chess',
        when: 'SUNDAY · 4 PM',
        name: 'Chess blitz',
        taken: 97,
        of: 128,
        terms: 'Entry 3 · prize pool 384',
        bg: '#CFE3F4',
        fg: '#2A2522',
        kc: '#2F3E5C',
      },
      {
        key: 'draughts',
        when: 'NEXT WEEK',
        name: 'Draughts cup',
        taken: 40,
        of: 64,
        terms: 'Free · trophy and 200',
        bg: '#E3F0DF',
        fg: '#2A2522',
        kc: '#2F6B5F',
      },
    ];
    const cups = C.map((c) => {
      const on = !!signed[c.key];
      const taken = c.taken + (on ? 1 : 0);
      return {
        when: c.when,
        name: c.name,
        terms: c.terms,
        kc: c.kc,
        on,
        places: taken + ' of ' + c.of + ' places taken',
        pct: Math.round((taken / c.of) * 100) + '%',
        cta: on ? 'Signed up ✓' : 'Sign up',
        toggle: () => this.setState({ signed: { ...signed, [c.key]: !on } }),
        s:
          'flex: none; width: 196px; box-sizing: border-box; border: 3px solid #2A2522; border-radius: 20px; background: ' +
          c.bg +
          '; color: ' +
          c.fg +
          '; box-shadow: 4px 5px 0 #2A2522; padding: 11px 13px 12px; display: flex; flex-direction: column; gap: 5px;',
        btn:
          'all: unset; margin-top: 3px; height: 36px; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 15px; font-weight: 600; color: #2A2522; cursor: pointer;' +
          (on ? ' background: #E3F0DF;' : ' background: ' + accent + ';'),
      };
    });

    return {
      accent,
      games,
      totalLive,
      cups,
      amt: String(amt),
      less: () => this.setState({ amt: Math.max(0, amt - 2) }),
      more: () => this.setState({ amt: Math.min(40, amt + 2) }),
      give: () => this.setState({ gave: { by: 'you', amt } }),
      handOff: () => this.setState({ gave: { by: 'her', amt: 6 } }),
      undoFund: () => this.setState({ gave: null }),
      fundOpen: !gave,
      fundDone: !!gave,
      giverBadge:
        'width: 34px; height: 34px; flex: none; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center;' +
        (gave && gave.by === 'her'
          ? ' background: #EFE4CF; border: 2.5px dashed #2A2522;'
          : ' background: #CFE3F4; border: 2.5px solid #2A2522;'),
      giverPath:
        gave && gave.by === 'her'
          ? 'M12 3 A9 9 0 1 0 12.01 3 M9 10 V11 M15 10 V11 M8.5 15 Q12 18 15.5 15'
          : 'M4 20 L8 19 L19 8 L16 5 L5 16 Z M14 7 L17 10',
      fundNote: !gave
        ? ''
        : gave.by === 'her'
          ? 'Amara gave 6. She’s been careful with money since the esusu trouble.'
          : 'You gave ' + gave.amt + '. Nobody sees it until the fund closes on Friday.',
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
              Arcade
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Floor 9 · Play quarter
            </span>
          </div>

          <span
            style={{
              flex: 'none',
              border: '2.5px solid #2A2522',
              borderRadius: '999px',
              padding: '3px 10px',
              background: '#E3F0DF',
              fontSize: '12.5px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2F6B5F' }} />
            <span>{vals.totalLive}</span> live
          </span>
        </header>

        {/* LED ticker: the place's news mixed with labelled sponsors */}

        <div
          role="marquee"
          aria-label="SABI FOODS (sponsor), KORA LABS (sponsor), BRIGHTLINE (sponsor), NDURA MINING (sponsor)"
          style={{
            margin: '0 20px 12px',
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
            style={{ display: 'flex', width: 'max-content', animationDuration: '22s' }}
          >
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
                color: '#8FC1A9',
                textShadow: '0 0 8px #8FC1A999',
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
                NDURA MINING
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Draughts cup</span>
              <span
                style={{
                  border: '1px solid #8FC1A9',
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
                color: '#8FC1A9',
                textShadow: '0 0 8px #8FC1A999',
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
                NDURA MINING
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Draughts cup</span>
              <span
                style={{
                  border: '1px solid #8FC1A9',
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

        <div
          className="ar-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '2px 0 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Featured: one live game, picked by rule */}

          <ScreenLink
            href="Chess.dc.html"
            aria-label="Featured game: Kemi v Tunde, chess, 312 watching"
            style={{
              margin: '0 20px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '22px',
              background: '#5B3D62',
              color: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px 14px',
              display: 'flex',
              gap: '14px',
              textDecoration: 'none',
              flex: 'none',
            }}
          >
            <svg
              width="112"
              height="112"
              viewBox="0 0 112 112"
              aria-hidden="true"
              style={{
                flex: 'none',
                border: '3px solid #2A2522',
                borderRadius: '10px',
                background: '#EFE4CF',
              }}
            >
              <defs>
                <pattern id="ar-cb" width="28" height="28" patternUnits="userSpaceOnUse">
                  <rect x="14" y="0" width="14" height="14" fill="#C08A5B" />
                  <rect x="0" y="14" width="14" height="14" fill="#C08A5B" />
                </pattern>
              </defs>

              <rect width="112" height="112" fill="url(#ar-cb)" />

              <g
                fontSize="12.5"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="'Segoe UI Symbol','Noto Sans Symbols 2','DejaVu Sans',serif"
              >
                <text x="91" y="7">
                  ♚
                </text>
                <text x="77" y="21">
                  ♟
                </text>
                <text x="91" y="21">
                  ♟
                </text>
                <text x="35" y="35">
                  ♞
                </text>
                <text x="63" y="35">
                  ♛
                </text>
                <text x="49" y="49">
                  ♟
                </text>

                <text x="63" y="63" fill="#FFFDF8" stroke="#2A2522" strokeWidth=".6">
                  ♘
                </text>
                <text x="35" y="77" fill="#FFFDF8" stroke="#2A2522" strokeWidth=".6">
                  ♙
                </text>
                <text x="77" y="77" fill="#FFFDF8" stroke="#2A2522" strokeWidth=".6">
                  ♕
                </text>
                <text x="21" y="91" fill="#FFFDF8" stroke="#2A2522" strokeWidth=".6">
                  ♙
                </text>
                <text x="91" y="105" fill="#FFFDF8" stroke="#2A2522" strokeWidth=".6">
                  ♔
                </text>
              </g>
            </svg>

            <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  color: '#F2CE6E',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#C8553D',
                    border: '1.5px solid #FFFDF8',
                  }}
                />
                MOST WATCHED NOW
              </span>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '20px',
                  fontWeight: '700',
                  lineHeight: '1.05',
                }}
              >
                Kemi v Tunde
              </span>

              <span style={{ fontSize: '12.5px', fontWeight: '700', opacity: '.9' }}>
                Chess · 1,840 v 1,812 · move 31
              </span>

              <span style={{ fontSize: '12.5px', fontWeight: '700', opacity: '.9' }}>
                312 watching · Kemi to play
              </span>

              <span
                style={{
                  marginTop: 'auto',
                  alignSelf: 'flex-start',
                  height: '32px',
                  boxSizing: 'border-box',
                  padding: '0 16px',
                  border: '2.5px solid #2A2522',
                  borderRadius: '999px',
                  background: vals.accent,
                  color: '#2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '600',
                }}
              >
                Watch
              </span>
            </div>
          </ScreenLink>

          {/* Choose a game */}

          <div
            style={{
              padding: '4px 20px 0',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
              Games
            </span>
          </div>

          <nav
            aria-label="Games"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gridAutoRows: '98px',
              gap: '10px',
              padding: '0 20px',
              flex: 'none',
            }}
          >
            {vals.games.map((g, $index) => (
              <ScreenLink key={$index} href="GameLobby.dc.html" aria-label={g.label} style={css(g.s)}>
                <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
                  <path
                    d={g.icon}
                    fill={g.fill}
                    stroke="#2A2522"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={g.detail}
                    fill={g.fill2}
                    stroke="#2A2522"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '14px',
                    fontWeight: '600',
                    lineHeight: '1.05',
                    textAlign: 'center',
                  }}
                >
                  {g.name}
                </span>

                <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#2F6B5F' }}>{g.live} live</span>
              </ScreenLink>
            ))}
          </nav>

          {/* Tournaments across all games */}

          <span
            style={{
              padding: '8px 20px 0',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '18px',
              fontWeight: '700',
            }}
          >
            Tournaments
          </span>

          <div
            className="ar-row"
            style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              padding: '0 20px 6px',
              flex: 'none',
            }}
          >
            {vals.cups.map((c, $index) => (
              <div key={$index} style={css(c.s)}>
                <span style={{ fontSize: '11.5px', fontWeight: '800', letterSpacing: '.05em', color: c.kc }}>
                  {c.when}
                </span>

                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '19px',
                    fontWeight: '700',
                    lineHeight: '1.05',
                  }}
                >
                  {c.name}
                </span>

                <div
                  style={{
                    height: '10px',
                    boxSizing: 'border-box',
                    border: '2px solid #2A2522',
                    borderRadius: '999px',
                    background: '#FFFDF8',
                    overflow: 'hidden',
                  }}
                >
                  <span style={{ display: 'block', height: '100%', width: c.pct, background: '#2A2522' }} />
                </div>

                <span style={{ fontSize: '12px', fontWeight: '800' }}>{c.places}</span>

                <span style={{ fontSize: '12px', fontWeight: '700', opacity: '.85' }}>{c.terms}</span>

                <button type="button" aria-pressed={c.on} onClick={c.toggle} style={css(c.btn)}>
                  {c.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Community target: contributions stay private until it closes */}

          <section
            aria-label="Arcade fund"
            style={{
              margin: '2px 20px 0',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '9px',
              flex: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" style={{ flex: 'none' }}>
                <rect
                  x="4"
                  y="12"
                  width="32"
                  height="24"
                  rx="5"
                  fill="#F2CE6E"
                  stroke="#2A2522"
                  strokeWidth="3"
                />
                <path d="M14 12 V8 A6 6 0 0 1 26 8 V12" fill="none" stroke="#2A2522" strokeWidth="3" />
                <path d="M20 19 V29 M15 24 H25" stroke="#2A2522" strokeWidth="3" strokeLinecap="round" />
              </svg>

              <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '17px',
                    fontWeight: '700',
                    lineHeight: '1.1',
                  }}
                >
                  A games night every week
                </span>

                <span style={{ fontSize: '12px', fontWeight: '700', color: '#5E564D' }}>
                  Needs 5,000 by Friday · gifts stay hidden until then
                </span>
              </div>
            </div>

            {vals.fundOpen ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    aria-label="Give less"
                    onClick={vals.less}
                    style={{
                      all: 'unset',
                      width: '34px',
                      height: '34px',
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Fredoka, sans-serif',
                      fontSize: '20px',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      minWidth: '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '3px',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '20px',
                      fontWeight: '700',
                    }}
                  >
                    <svg width="12" height="18" viewBox="0 0 30 40" aria-hidden="true">
                      <path
                        d="M4 8 H26 L4 32 H26 M15 2 V38"
                        fill="none"
                        stroke="#2A2522"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {vals.amt}
                  </span>

                  <button
                    type="button"
                    aria-label="Give more"
                    onClick={vals.more}
                    style={{
                      all: 'unset',
                      width: '34px',
                      height: '34px',
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Fredoka, sans-serif',
                      fontSize: '20px',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    +
                  </button>

                  <span
                    style={{
                      flex: '1',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      color: '#5E564D',
                      lineHeight: '1.25',
                    }}
                  >
                    Suggested 10, scaled to what you have
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={vals.give}
                    style={{
                      all: 'unset',
                      flex: '1',
                      height: '42px',
                      boxSizing: 'border-box',
                      border: '3px solid #2A2522',
                      borderRadius: '14px',
                      background: vals.accent,
                      boxShadow: '3px 4px 0 #2A2522',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Fredoka, sans-serif',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Chip in
                  </button>

                  <button
                    type="button"
                    onClick={vals.handOff}
                    style={{
                      all: 'unset',
                      flex: '1',
                      height: '42px',
                      boxSizing: 'border-box',
                      border: '3px dashed #2A2522',
                      borderRadius: '14px',
                      background: '#EFE4CF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '7px',
                      fontFamily: 'Fredoka, sans-serif',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
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

            {vals.fundDone ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderTop: '2px dashed #2A2522',
                  paddingTop: '9px',
                }}
              >
                <span style={css(vals.giverBadge)}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2A2522"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={vals.giverPath} />
                  </svg>
                </span>

                <span style={{ flex: '1', fontSize: '13.5px', fontWeight: '700', lineHeight: '1.35' }}>
                  {vals.fundNote}
                </span>

                <button
                  type="button"
                  onClick={vals.undoFund}
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
      </div>
    );
  }
}
