// Money
import { Screen } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Money extends Screen {
  static title = 'Money';

  renderVals() {
    return { accent: this.props.accent ?? '#E8B53A' };
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
            Money
          </h1>
        </header>

        <section
          aria-label="Balance"
          style={{
            margin: '0 20px',
            border: '3px solid #2A2522',
            borderRadius: '22px',
            background: '#2F3E5C',
            color: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <svg width="70" height="70" viewBox="0 0 60 64" aria-hidden="true" style={{ flex: 'none' }}>
            <rect
              x="4"
              y="12"
              width="40"
              height="24"
              rx="4"
              fill="#8FC1A9"
              stroke="#2A2522"
              strokeWidth="3"
              transform="rotate(-10 24 24)"
            />

            <ellipse cx="38" cy="54" rx="16" ry="6" fill="#E8B53A" stroke="#2A2522" strokeWidth="3" />

            <path d="M22 54 v-6 M54 54 v-6" stroke="#2A2522" strokeWidth="3" />

            <ellipse cx="38" cy="47" rx="16" ry="6" fill="#E8B53A" stroke="#2A2522" strokeWidth="3" />

            <ellipse cx="38" cy="40" rx="16" ry="6" fill="#F2CE6E" stroke="#2A2522" strokeWidth="3" />

            <path
              d="M33 37.5 h9 l-9 6 h9 M37.5 35 v11"
              fill="none"
              stroke="#2A2522"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span
              aria-label="1,240 Zael"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '36px',
                fontWeight: '700',
                lineHeight: '1',
              }}
            >
              <svg width="20" height="28" viewBox="0 0 30 40" aria-hidden="true">
                <path
                  d="M4 8 H26 L4 32 H26"
                  fill="none"
                  stroke="#FFFDF8"
                  strokeWidth="5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path d="M15 2 V38" fill="none" stroke="#FFFDF8" strokeWidth="5" strokeLinecap="round" />
              </svg>
              1,240
            </span>

            <div style={{ display: 'flex', gap: '6px' }}>
              <span
                aria-label="Savings 600 Zael"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  background: '#FFFDF8',
                  color: '#2A2522',
                  border: '2px solid #2A2522',
                  borderRadius: '999px',
                  padding: '1px 9px',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 12 c0 -4 4 -7 9 -7 c3 0 5 1 6 3 h2 v4 h-2 c-1 2 -2 3 -4 4 v3 h-3 v-2 h-3 v2 h-3 v-3 c-1 -1 -2 -2 -2 -4 z"
                    fill="#F7D6D6"
                    stroke="#2A2522"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
                600 saved
              </span>

              <span
                aria-label="120 Zael earmarked for rent"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  background: '#FFFDF8',
                  color: '#2A2522',
                  border: '2px solid #2A2522',
                  borderRadius: '999px',
                  padding: '1px 9px',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M3 11 L12 4 L21 11 V20 H3 Z"
                    fill="#FDE3C8"
                    stroke="#2A2522"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="10"
                    y="13"
                    width="4"
                    height="7"
                    fill="#8E4129"
                    stroke="#2A2522"
                    strokeWidth="1.6"
                  />
                </svg>
                120 for rent
              </span>
            </div>
          </div>
        </section>

        <nav
          aria-label="Money places"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridAutoRows: '116px',
            gap: '12px',
            padding: '18px 20px 0',
          }}
        >
          <ScreenLink
            href="Bank.dc.html"
            aria-label="Bank: savings pay 3 percent"
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
            <svg width="62" height="58" viewBox="0 0 64 60" aria-hidden="true">
              <path
                d="M6 22 L32 6 L58 22 Z"
                fill="#E8B53A"
                stroke="#2A2522"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              <rect
                x="8"
                y="22"
                width="48"
                height="6"
                rx="1.5"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
              />

              <rect x="12" y="28" width="7" height="20" fill="#FFFDF8" stroke="#2A2522" strokeWidth="3" />

              <rect x="28.5" y="28" width="7" height="20" fill="#FFFDF8" stroke="#2A2522" strokeWidth="3" />

              <rect x="45" y="28" width="7" height="20" fill="#FFFDF8" stroke="#2A2522" strokeWidth="3" />

              <rect
                x="5"
                y="48"
                width="54"
                height="8"
                rx="2"
                fill="#2F3E5C"
                stroke="#2A2522"
                strokeWidth="3"
              />

              <circle cx="32" cy="15" r="3" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2" />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}>
              Bank
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
                background: '#FFFDF8',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              3%
            </span>
          </ScreenLink>

          <ScreenLink
            href="Esusu.dc.html"
            aria-label="Esusu: Tunde missed this round"
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
            <svg width="62" height="58" viewBox="0 0 84 72" aria-hidden="true">
              <ellipse cx="30" cy="12" rx="9" ry="4" fill="#F2CE6E" stroke="#2A2522" strokeWidth="2.5" />

              <ellipse cx="46" cy="8" rx="9" ry="4" fill="#F2CE6E" stroke="#2A2522" strokeWidth="2.5" />

              <ellipse cx="56" cy="15" rx="9" ry="4" fill="#E8B53A" stroke="#2A2522" strokeWidth="2.5" />

              <path
                d="M18 22 h48 c0 4 -3 6 -6 7 c10 6 16 16 16 26 c0 10 -14 15 -34 15 c-20 0 -34 -5 -34 -15 c0 -10 6 -20 16 -26 c-3 -1 -6 -3 -6 -7 z"
                fill="#8E4129"
                stroke="#2A2522"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              <path
                d="M14 46 c14 6 42 6 56 0"
                fill="none"
                stroke="#F2CE6E"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}>
              Esusu
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
            href="Housing.dc.html"
            aria-label="Housing: rent due Friday"
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
            <svg width="62" height="58" viewBox="0 0 64 60" aria-hidden="true">
              <path
                d="M6 28 L32 8 L58 28"
                fill="none"
                stroke="#2A2522"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M12 24 V54 H52 V24"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              <rect
                x="26"
                y="36"
                width="12"
                height="18"
                rx="2"
                fill="#8E4129"
                stroke="#2A2522"
                strokeWidth="3"
              />

              <rect
                x="16"
                y="30"
                width="8"
                height="8"
                rx="1.5"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="2.5"
              />

              <circle cx="49" cy="44" r="6" fill="#E8B53A" stroke="#2A2522" strokeWidth="2.5" />

              <path d="M54 46 l7 4 M58 48 l-1 3" stroke="#2A2522" strokeWidth="2.5" strokeLinecap="round" />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}>
              Housing
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
                background: '#F7D6D6',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Fri
            </span>
          </ScreenLink>

          <ScreenLink
            href="Markets.dc.html"
            aria-label="Markets: stocks and predictions, up 4 percent today"
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
            <svg width="62" height="58" viewBox="0 0 64 60" aria-hidden="true">
              <rect
                x="3"
                y="4"
                width="42"
                height="36"
                rx="5"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3.5"
              />

              <rect x="10" y="26" width="6" height="9" fill="#C8553D" stroke="#2A2522" strokeWidth="2" />

              <rect x="20" y="20" width="6" height="15" fill="#8FC1A9" stroke="#2A2522" strokeWidth="2" />

              <rect x="30" y="14" width="6" height="21" fill="#8FC1A9" stroke="#2A2522" strokeWidth="2" />

              <path
                d="M8 22 L18 15 L27 18 L38 9"
                fill="none"
                stroke="#2A2522"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g transform="rotate(-8 44 44)">
                <path
                  d="M24 32 h36 v8 a4 4 0 0 0 0 8 v8 h-36 v-8 a4 4 0 0 0 0 -8 z"
                  fill="#E8B53A"
                  stroke="#2A2522"
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />

                <path d="M42 34 v20" stroke="#2A2522" strokeWidth="2" strokeDasharray="3 3" />

                <text
                  x="33"
                  y="48"
                  textAnchor="middle"
                  fontFamily="Fredoka, sans-serif"
                  fontSize="9"
                  fontWeight="700"
                  fill="#2E4A3B"
                >
                  YES
                </text>

                <text
                  x="51"
                  y="48"
                  textAnchor="middle"
                  fontFamily="Fredoka, sans-serif"
                  fontSize="9"
                  fontWeight="700"
                  fill="#8E4129"
                >
                  NO
                </text>
              </g>
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}>
              Markets
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
                color: '#2A2522',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              +4%
            </span>
          </ScreenLink>
        </nav>
      </div>
    );
  }
}
