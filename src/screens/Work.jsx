// Work
import { Screen } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Work extends Screen {
  static title = 'Work';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const pick = this.state.pick ?? null;
    const text = { take: 'You took the shift', skip: 'You skipped it', her: 'Amara took the shift' };
    return {
      accent,
      open: !pick,
      done: !!pick,
      doneText: pick ? text[pick] : '',
      byYou: pick === 'take' || pick === 'skip',
      byHer: pick === 'her',
      take: () => this.setState({ pick: 'take' }),
      skip: () => this.setState({ pick: 'skip' }),
      handOff: () => this.setState({ pick: 'her' }),
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
            Work
          </h1>
        </header>

        {/* The job */}

        <section
          aria-label="Job"
          style={{
            margin: '0 20px',
            border: '3px solid #2A2522',
            borderRadius: '22px',
            background: '#2F6B5F',
            color: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="62" height="62" viewBox="0 0 64 64" aria-hidden="true" style={{ flex: 'none' }}>
              <path
                d="M14 22 L24 14 H40 L50 22 V58 H14 Z"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <path
                d="M24 14 L32 26 L40 14"
                fill="#CFE3F4"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <path d="M32 26 V58" stroke="#2A2522" strokeWidth="2.5" />

              <rect
                x="38"
                y="34"
                width="8"
                height="10"
                rx="1.5"
                fill="#E3F0DF"
                stroke="#2A2522"
                strokeWidth="2"
              />

              <circle cx="32" cy="8" r="6" fill="#E8B53A" stroke="#2A2522" strokeWidth="2.5" />
            </svg>

            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '21px',
                  fontWeight: '700',
                  lineHeight: '1.1',
                }}
              >
                Lab assistant
              </span>

              <span style={{ fontSize: '14px', fontWeight: '700', opacity: '.85' }}>Kora Labs · Floor 6</span>
            </div>

            <span
              aria-label="Pays 260 Zael a cycle"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '15px',
                fontWeight: '700',
                background: '#FFFDF8',
                color: '#2A2522',
                border: '2.5px solid #2A2522',
                borderRadius: '999px',
                padding: '2px 10px',
              }}
            >
              <svg width="8" height="11" viewBox="0 0 30 40" aria-hidden="true">
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
              260
            </span>
          </div>

          <div
            role="img"
            aria-label="Shift 9 am to 5 pm. Now 7:40 pm, off until 9 am"
            style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            <div
              style={{
                position: 'relative',
                height: '22px',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '999px',
                background: '#24524A',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: '16.7%',
                  width: '44.4%',
                  top: '0',
                  bottom: '0',
                  background: '#F2CE6E',
                  borderLeft: '2.5px solid #2A2522',
                  borderRight: '2.5px solid #2A2522',
                }}
              />{' '}
              <span
                style={{
                  position: 'absolute',
                  left: '76.8%',
                  top: '-2px',
                  bottom: '-2px',
                  width: '4px',
                  background: '#FFFDF8',
                }}
              />
            </div>

            <div
              style={{
                position: 'relative',
                height: '15px',
                fontSize: '11.5px',
                fontWeight: '800',
                opacity: '.85',
              }}
            >
              <span style={{ position: 'absolute', left: '0' }}>6am</span>{' '}
              <span style={{ position: 'absolute', left: '16.7%', transform: 'translateX(-50%)' }}>9</span>{' '}
              <span style={{ position: 'absolute', left: '61.1%', transform: 'translateX(-50%)' }}>5pm</span>{' '}
              <span
                style={{
                  position: 'absolute',
                  left: '77.3%',
                  transform: 'translateX(-50%)',
                  color: '#F2CE6E',
                }}
              >
                now
              </span>{' '}
              <span style={{ position: 'absolute', right: '0' }}>12am</span>
            </div>
          </div>
        </section>

        {/* Places in work */}

        <nav
          aria-label="Work places"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridAutoRows: '112px',
            gap: '12px',
            padding: '18px 20px 0',
          }}
        >
          <ScreenLink
            href="Gigs.dc.html"
            aria-label="My gigs: 2 on the go"
            style={{
              position: 'relative',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#FDE3C8',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="62" height="56" viewBox="0 0 64 58" aria-hidden="true">
              <rect
                x="4"
                y="6"
                width="56"
                height="44"
                rx="5"
                fill="#C08A5B"
                stroke="#2A2522"
                strokeWidth="3.5"
              />

              <rect
                x="10"
                y="12"
                width="20"
                height="16"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="2.5"
                transform="rotate(-6 20 20)"
              />

              <rect
                x="34"
                y="12"
                width="20"
                height="14"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="2.5"
                transform="rotate(5 44 19)"
              />

              <rect
                x="22"
                y="30"
                width="22"
                height="14"
                fill="#CFE3F4"
                stroke="#2A2522"
                strokeWidth="2.5"
                transform="rotate(-3 33 37)"
              />

              <circle cx="20" cy="13" r="2.5" fill="#C8553D" stroke="#2A2522" strokeWidth="1.5" />

              <circle cx="44" cy="13" r="2.5" fill="#C8553D" stroke="#2A2522" strokeWidth="1.5" />

              <circle cx="33" cy="31" r="2.5" fill="#C8553D" stroke="#2A2522" strokeWidth="1.5" />

              <path d="M10 50 V56 M54 50 V56" stroke="#2A2522" strokeWidth="3.5" strokeLinecap="round" />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}>
              My gigs
            </span>

            <span
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-8px',
                width: '26px',
                height: '26px',
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '50%',
                background: '#F2CE6E',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              2
            </span>
          </ScreenLink>

          <ScreenLink
            href="Notebook.dc.html"
            aria-label="Notebook: one result due today"
            style={{
              position: 'relative',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#CFE3F4',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="62" height="56" viewBox="0 0 64 58" aria-hidden="true">
              <rect
                x="10"
                y="4"
                width="40"
                height="50"
                rx="4"
                fill="#2F3E5C"
                stroke="#2A2522"
                strokeWidth="3.5"
              />

              <rect
                x="16"
                y="4"
                width="34"
                height="50"
                rx="3"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
              />

              <path
                d="M10 12 h-4 M10 22 h-4 M10 32 h-4 M10 42 h-4"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="M30 14 V22 L23 36 Q22 40 26 40 H40 Q44 40 43 36 L36 22 V14"
                fill="#E3F0DF"
                stroke="#2A2522"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              <path d="M27 14 H39" stroke="#2A2522" strokeWidth="2.5" strokeLinecap="round" />

              <path d="M25 33 H41" stroke="#8FC1A9" strokeWidth="5" />

              <circle cx="34" cy="46" r="2" fill="#2A2522" />
              <circle cx="28" cy="46" r="2" fill="#2A2522" />
              <circle cx="40" cy="46" r="2" fill="#2A2522" />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}>
              Notebook
            </span>

            <span
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-8px',
                width: '26px',
                height: '26px',
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '50%',
                background: '#C8553D',
                color: '#FFFDF8',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '14px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              !
            </span>
          </ScreenLink>

          <ScreenLink
            href="Writing.dc.html"
            aria-label="Writing: a contest is open"
            style={{
              position: 'relative',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#5B3D62',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: '#FFFDF8',
            }}
          >
            <svg width="62" height="56" viewBox="0 0 64 58" aria-hidden="true">
              <path
                d="M8 10 H40 V54 H8 Z"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              <path
                d="M14 20 H34 M14 28 H34 M14 36 H26"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="M30 46 L54 8 L60 12 L36 50 L28 54 Z"
                fill="#E8B53A"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <path d="M50 14 L56 18" stroke="#2A2522" strokeWidth="3" />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}>
              Writing
            </span>

            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-8px',
                height: '26px',
                boxSizing: 'border-box',
                padding: '0 6px',
                border: '3px solid #2A2522',
                borderRadius: '999px',
                background: '#F2CE6E',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  d="M7 3 H17 V9 A5 5 0 0 1 7 9 Z M7 5 H3 Q3 10 7 10 M17 5 H21 Q21 10 17 10 M12 14 V18 M8 21 H16 L15 18 H9 Z"
                  fill="#FFFDF8"
                  stroke="#2A2522"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </ScreenLink>

          <ScreenLink
            href="Career.dc.html"
            aria-label="Career: 72 percent of the way to lab technician"
            style={{
              position: 'relative',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#E3F0DF',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="62" height="56" viewBox="0 0 64 58" aria-hidden="true">
              <path d="M14 54 V6 M42 54 V6" stroke="#8E4129" strokeWidth="5" strokeLinecap="round" />

              <path
                d="M14 14 H42 M14 26 H42 M14 38 H42 M14 50 H42"
                stroke="#2A2522"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              <path d="M14 6 V54 M42 6 V54" stroke="#2A2522" strokeWidth="2" fill="none" />

              <circle cx="28" cy="32" r="7" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />

              <path
                d="M48 20 L56 12 L60 16 M56 12 V26"
                fill="none"
                stroke="#2E4A3B"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}>
              Career
            </span>

            <span
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-8px',
                height: '26px',
                boxSizing: 'border-box',
                padding: '0 8px',
                border: '3px solid #2A2522',
                borderRadius: '999px',
                background: '#8FC1A9',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              72%
            </span>
          </ScreenLink>
        </nav>

        <div style={{ flex: '1' }} />

        {/* An offer: Decide or Hand Off */}

        <section
          aria-label="Extra shift offer"
          style={{
            margin: '0 20px 24px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
              <rect
                x="4"
                y="8"
                width="32"
                height="28"
                rx="5"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
              />
              <path d="M4 16 H36" stroke="#2A2522" strokeWidth="3" />
              <path d="M12 4 V11 M28 4 V11" stroke="#2A2522" strokeWidth="3" strokeLinecap="round" />
              <rect
                x="20"
                y="21"
                width="10"
                height="9"
                rx="2"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="2.5"
              />
            </svg>

            <span
              style={{ flex: '1', fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '600' }}
            >
              Extra shift · Thu
            </span>

            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                fontSize: '14px',
                fontWeight: '800',
                background: '#8FC1A9',
                border: '2px solid #2A2522',
                borderRadius: '999px',
                padding: '0 9px',
              }}
            >
              +
              <svg width="8" height="11" viewBox="0 0 30 40" aria-hidden="true">
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
              40
            </span>
          </div>

          {vals.open ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={vals.take}
                style={{
                  all: 'unset',
                  flex: '1',
                  height: '46px',
                  boxSizing: 'border-box',
                  borderRadius: '999px',
                  background: vals.accent,
                  border: '3px solid #2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '17px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Take
              </button>

              <button
                type="button"
                onClick={vals.skip}
                style={{
                  all: 'unset',
                  flex: '1',
                  height: '46px',
                  boxSizing: 'border-box',
                  borderRadius: '999px',
                  background: '#FFFDF8',
                  border: '3px solid #2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '17px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Skip
              </button>

              <button
                type="button"
                onClick={vals.handOff}
                style={{
                  all: 'unset',
                  flex: '1',
                  height: '46px',
                  boxSizing: 'border-box',
                  borderRadius: '999px',
                  background: '#FFFDF8',
                  border: '3px dashed #2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '17px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Hand Off
              </button>
            </div>
          ) : null}

          {vals.done ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '46px' }}>
              <span
                style={{
                  flex: '1',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                {vals.doneText}
              </span>

              {vals.byYou ? (
                <span
                  role="img"
                  aria-label="You decided"
                  title="You decided"
                  style={{
                    width: '30px',
                    height: '30px',
                    boxSizing: 'border-box',
                    border: '2px solid #2A2522',
                    borderRadius: '50%',
                    background: '#CFE3F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M4 20 l3 -1 l12 -12 a2 2 0 0 0 -3 -3 l-12 12 z"
                      fill="#FFFDF8"
                      stroke="#2A2522"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                    />
                    <path d="M14 6 l4 4" stroke="#2A2522" strokeWidth="2.4" />
                  </svg>
                </span>
              ) : null}

              {vals.byHer ? (
                <span
                  role="img"
                  aria-label="On her own"
                  title="On her own"
                  style={{
                    width: '30px',
                    height: '30px',
                    boxSizing: 'border-box',
                    border: '2px dashed #2A2522',
                    borderRadius: '50%',
                    background: '#EFE4CF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="19" height="19" viewBox="0 0 40 40" aria-hidden="true">
                    <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                    <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                    <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                    <path
                      d="M8 21 C8 13 13 10 20 10 C27 10 32 13 32 21 C29 16 25 15 20 15 C15 15 11 16 8 21 Z"
                      fill="#2A2522"
                    />
                  </svg>
                </span>
              ) : null}
            </div>
          ) : null}
        </section>
      </div>
    );
  }
}
