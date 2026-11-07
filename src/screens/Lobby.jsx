// Lobby
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Lobby extends Screen {
  static title = 'Lobby';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const amt = this.state.amt ?? 12;
    const gave = this.state.gave ?? null; // { by, amt }
    const meet = this.state.meet ?? null; // 'tour' | 'wave' | 'her'
    const waved = this.state.waved ?? {};

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

    const A = [
      ['musa', 'Musa', '4B', '#E59A6B', '#FDE3C8'],
      ['halima', 'Halima', '7A', '#C9B3D6', '#FFFDF8'],
      ['kwame', 'Kwame', '2D', '#8FC1A9', '#E3F0DF'],
    ];
    const arrivals = A.map(([key, name, room, face, bg]) => {
      const on = !!waved[key] || (key === 'musa' && !!meet);
      return {
        name,
        ini: name[0],
        room: 'Room ' + room,
        face,
        bg,
        on,
        cta: on ? 'Welcomed ✓' : 'Welcome',
        wave: () => this.setState({ waved: { ...waved, [key]: !waved[key] } }),
        btn:
          'all: unset; margin-top: 2px; height: 30px; box-sizing: border-box; padding: 0 10px; border: 2.5px solid #2A2522; border-radius: 999px; display: flex; align-items: center; font-family: Fredoka, sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; background: ' +
          (on ? '#E3F0DF' : accent) +
          ';',
      };
    });

    const N = [
      [
        'NEWSPAPER',
        'Rent cap vote on Thursday',
        'Front page · full story inside',
        'Story.dc.html',
        '#FFFDF8',
        '#C8553D',
        '-2deg',
      ],
      [
        'REQUEST',
        'Help moving a sofa to 9C',
        'Reward 10 · on the Gig Exchange',
        'GigExchange.dc.html',
        '#F2CE6E',
        '#2F3E5C',
        '1.5deg',
      ],
      [
        'NEW LAW',
        'Quiet hours after 11 pm',
        'Law 20 · common room',
        'LawRegister.dc.html',
        '#CFE3F4',
        '#2F6B5F',
        '1deg',
      ],
      ['LOST', 'Blue umbrella, by the stairs', 'Ask at 3C', '#', '#F7D6D6', '#E8B53A', '-1.5deg'],
    ];
    const notes = N.map(([kind, title, sub, href, bg, pin, rot]) => ({
      kind,
      title,
      sub,
      href,
      pin,
      label: kind + ': ' + title,
      s:
        'position: relative; box-sizing: border-box; min-height: 104px; border: 2.5px solid #2A2522; border-radius: 6px; background: ' +
        bg +
        '; box-shadow: 2px 3px 0 rgba(42,37,34,.6); padding: 12px 10px 10px; display: flex; flex-direction: column; gap: 3px; text-decoration: none; transform: rotate(' +
        rot +
        ');',
    }));

    const MEET = {
      tour: ['you', 'You showed Musa the arcade and the common room. He’s a friend now.'],
      wave: ['you', 'You waved and kept walking. Musa waved back.'],
      her: ['her', 'Amara walked Musa to the supermarket and lent him her trolley.'],
    };
    return {
      accent,
      arrivals,
      notes,
      amt: String(amt),
      less: () => this.setState({ amt: Math.max(0, amt - 2) }),
      more: () => this.setState({ amt: Math.min(60, amt + 2) }),
      give: () => this.setState({ gave: { by: 'you', amt } }),
      handOff: () => this.setState({ gave: { by: 'her', amt: 8 } }),
      undoFund: () => this.setState({ gave: null }),
      fundOpen: !gave,
      fundDone: !!gave,
      giverBadge: badge(gave ? gave.by : 'you', 34),
      giverPath: gave && gave.by === 'her' ? FACE : PEN,
      fundNote: !gave
        ? ''
        : gave.by === 'her'
          ? 'Amara gave 8. She takes the stairs to work, so she wants it fixed.'
          : 'You gave ' + gave.amt + '. Nobody sees it until the fund closes at 11 pm.',
      meetOpen: !meet,
      meetDone: !!meet,
      sayHi: () => this.setState({ meet: 'tour' }),
      nod: () => this.setState({ meet: 'wave' }),
      meetHand: () => this.setState({ meet: 'her' }),
      meetBadge: badge(meet ? MEET[meet][0] : 'you', 28),
      meetPath: meet && MEET[meet][0] === 'her' ? FACE : PEN,
      meetNote: meet ? MEET[meet][1] : '',
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
              Lobby
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Ground floor · Daily quarter
            </span>
          </div>
        </header>

        {/* LED ticker: the place's news mixed with labelled sponsors */}

        <div
          role="marquee"
          aria-label="LIFT FUND closes tonight 11 pm, NDURA MINING (sponsor), RENT CAP VOTE Thu 9 am · council hall, SABI FOODS (sponsor), 3 NEW ARRIVALS say hello, KORA LABS (sponsor)"
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
                LIFT FUND
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                closes tonight 11 pm
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Building partner</span>
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
                RENT CAP VOTE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                Thu 9 am · council hall
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Lobby café</span>
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
                3 NEW ARRIVALS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>say hello</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Noticeboard</span>
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
                LIFT FUND
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                closes tonight 11 pm
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Building partner</span>
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
                RENT CAP VOTE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                Thu 9 am · council hall
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Lobby café</span>
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
                3 NEW ARRIVALS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>say hello</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Noticeboard</span>
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
          </div>
        </div>

        <div
          className="lb-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '0 0 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Building crisis: the lift. A public-goods fund, gifts hidden until it closes */}

          <section
            aria-label="Lift fund"
            style={{
              margin: '0 20px',
              flex: 'none',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '22px',
              background: '#8E4129',
              color: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px 14px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="54" height="64" viewBox="0 0 54 64" aria-hidden="true" style={{ flex: 'none' }}>
                <rect
                  x="4"
                  y="4"
                  width="46"
                  height="56"
                  rx="5"
                  fill="#C08A5B"
                  stroke="#2A2522"
                  strokeWidth="3"
                />

                <path d="M27 10 V54" stroke="#2A2522" strokeWidth="3" />

                <rect
                  x="10"
                  y="10"
                  width="34"
                  height="44"
                  rx="2"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="2"
                />

                <path d="M8 24 L46 40 M8 40 L46 24" stroke="#F2CE6E" strokeWidth="5" strokeLinecap="round" />

                <path
                  d="M8 24 L46 40 M8 40 L46 24"
                  stroke="#2A2522"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
              </svg>

              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span
                  style={{ fontSize: '11.5px', fontWeight: '800', letterSpacing: '.05em', color: '#F2CE6E' }}
                >
                  BUILDING ALERT · DAY 4
                </span>

                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '21px',
                    fontWeight: '700',
                    lineHeight: '1.05',
                  }}
                >
                  The lift is out
                </span>

                <span style={{ fontSize: '12.5px', fontWeight: '700', opacity: '.9', lineHeight: '1.3' }}>
                  If the fund reaches 8,000 by 11 pm, it's fixed this week. What anyone gives stays hidden
                  until then.
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
                      background: '#FFFDF8',
                      color: '#2A2522',
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
                      fontSize: '21px',
                      fontWeight: '700',
                    }}
                  >
                    <svg width="12" height="18" viewBox="0 0 30 40" aria-hidden="true">
                      <path
                        d="M4 8 H26 L4 32 H26 M15 2 V38"
                        fill="none"
                        stroke="#FFFDF8"
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
                      background: '#FFFDF8',
                      color: '#2A2522',
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
                      opacity: '.85',
                      lineHeight: '1.25',
                    }}
                  >
                    Suggested 12, scaled to what you have
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
                      color: '#2A2522',
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
                      color: '#2A2522',
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
                  borderTop: '2px dashed rgba(255,253,248,.5)',
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

          {/* A public encounter */}

          <section
            aria-label="Encounter"
            style={{
              margin: '0 20px',
              flex: 'none',
              boxSizing: 'border-box',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ position: 'relative', width: '62px', height: '46px', flex: 'none' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '2px',
                    width: '40px',
                    height: '40px',
                    boxSizing: 'border-box',
                    border: '2.5px dashed #2A2522',
                    borderRadius: '50%',
                    background: '#7A4A2E',
                    color: '#FFFDF8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: '700',
                  }}
                >
                  A
                </span>{' '}
                <span
                  style={{
                    position: 'absolute',
                    left: '22px',
                    top: '2px',
                    width: '40px',
                    height: '40px',
                    boxSizing: 'border-box',
                    border: '2.5px solid #2A2522',
                    borderRadius: '50%',
                    background: '#E59A6B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: '700',
                  }}
                >
                  M
                </span>
              </span>

              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span
                  style={{ fontSize: '11.5px', fontWeight: '800', letterSpacing: '.05em', color: '#8E4129' }}
                >
                  BY THE MAILBOXES
                </span>

                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '16px',
                    fontWeight: '700',
                    lineHeight: '1.2',
                  }}
                >
                  Musa from 4B says hello. He moved in yesterday.
                </span>
              </div>
            </div>

            {vals.meetOpen ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={vals.sayHi}
                  style={{
                    all: 'unset',
                    flex: '1',
                    height: '38px',
                    boxSizing: 'border-box',
                    border: '2.5px solid #2A2522',
                    borderRadius: '12px',
                    background: vals.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '14.5px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Show him around
                </button>

                <button
                  type="button"
                  onClick={vals.nod}
                  style={{
                    all: 'unset',
                    flex: '1',
                    height: '38px',
                    boxSizing: 'border-box',
                    border: '2.5px solid #2A2522',
                    borderRadius: '12px',
                    background: '#FFFDF8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '14.5px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Just a wave
                </button>

                <button
                  type="button"
                  onClick={vals.meetHand}
                  style={{
                    all: 'unset',
                    flex: '1',
                    height: '38px',
                    boxSizing: 'border-box',
                    border: '2.5px dashed #2A2522',
                    borderRadius: '12px',
                    background: '#EFE4CF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '14.5px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Hand Off
                </button>
              </div>
            ) : null}

            {vals.meetDone ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderTop: '2px dashed #2A2522',
                  paddingTop: '9px',
                }}
              >
                <span style={css(vals.meetBadge)}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2A2522"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={vals.meetPath} />
                  </svg>
                </span>

                <span style={{ flex: '1', fontSize: '13.5px', fontWeight: '700', lineHeight: '1.35' }}>
                  {vals.meetNote}
                </span>
              </div>
            ) : null}
          </section>

          {/* Arrivals */}

          <section
            aria-label="New arrivals"
            style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <span
              style={{
                padding: '0 20px',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              Moved in this week
            </span>

            <div
              className="lb-row"
              style={{
                display: 'flex',
                gap: '10px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                padding: '0 20px 6px',
              }}
            >
              {vals.arrivals.map((r, $index) => (
                <div
                  key={$index}
                  style={{
                    flex: 'none',
                    width: '104px',
                    boxSizing: 'border-box',
                    border: '3px solid #2A2522',
                    borderRadius: '18px',
                    background: r.bg,
                    boxShadow: '3px 4px 0 #2A2522',
                    padding: '10px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span
                    style={{
                      width: '40px',
                      height: '40px',
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '50%',
                      background: r.face,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '16px',
                      fontWeight: '700',
                    }}
                  >
                    {r.ini}
                  </span>

                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '700' }}>
                    {r.name}
                  </span>

                  <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#5E564D' }}>{r.room}</span>

                  <button type="button" aria-pressed={r.on} onClick={r.wave} style={css(r.btn)}>
                    {r.cta}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* The noticeboard */}

          <section
            aria-label="Noticeboard"
            style={{
              margin: '0 20px',
              flex: 'none',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#C08A5B',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '13px',
                fontWeight: '700',
                letterSpacing: '.08em',
                color: '#FFFDF8',
              }}
            >
              NOTICEBOARD
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
              {vals.notes.map((n, $index) => (
                <ScreenLink key={$index} href={n.href} aria-label={n.label} style={css(n.s)}>
                  <span
                    style={{
                      position: 'absolute',
                      top: '-7px',
                      left: '50%',
                      marginLeft: '-7px',
                      width: '14px',
                      height: '14px',
                      boxSizing: 'border-box',
                      border: '2px solid #2A2522',
                      borderRadius: '50%',
                      background: n.pin,
                    }}
                  />

                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: '800',
                      letterSpacing: '.05em',
                      color: '#8E4129',
                    }}
                  >
                    {n.kind}
                  </span>

                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '14.5px',
                      fontWeight: '700',
                      lineHeight: '1.15',
                    }}
                  >
                    {n.title}
                  </span>

                  <span
                    style={{ fontSize: '11.5px', fontWeight: '700', color: '#5E564D', lineHeight: '1.25' }}
                  >
                    {n.sub}
                  </span>
                </ScreenLink>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
