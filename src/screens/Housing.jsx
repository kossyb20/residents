// Housing
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Housing extends Screen {
  static title = 'Housing';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const pay = this.state.pay ?? 'due';
    const isPaid = pay !== 'due';
    const today = 1; // Tuesday
    const week = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((l, i) => {
      const due = i === 4,
        now = i === today;
      let bg = '#F5EFE5';
      if (due) bg = isPaid ? '#8FC1A9' : '#F7D6D6';
      if (now) bg = accent;
      return {
        l,
        style:
          'width: 36px; height: 36px; box-sizing: border-box; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 15px; font-weight: 600; background: ' +
          bg +
          '; border: ' +
          (due || now ? '2.5px solid #2A2522' : '2px solid #D8CFBF') +
          ';',
      };
    });
    const weeks = isPaid ? 7 : 6;
    const streak = Array.from({ length: 8 }, (_, i) => ({
      tick: i < weeks ? '#2A2522' : 'transparent',
      style:
        'width: 18px; height: 18px; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px ' +
        (i < weeks ? 'solid' : 'dashed') +
        ' #2A2522; background: ' +
        (i < weeks ? '#8FC1A9' : '#FFFDF8') +
        ';',
    }));
    const comfort = [1, 2, 3, 4, 5].map((k) => ({ fill: k <= 3 ? '#E8B53A' : '#FFFDF8' }));
    return {
      accent,
      comfort,
      week,
      streak,
      streakLabel: weeks + ' weeks paid on time',
      earmark: isPaid ? '0' : '120',
      earmarkLabel: isPaid ? 'Rent money used' : '120 Zael of basic income set aside for rent',
      earmarkStyle:
        'height: 30px; box-sizing: border-box; padding: 0 10px 0 6px; border: 2px solid #2A2522; border-radius: 999px; display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 800; background: ' +
        (isPaid ? '#EFE4CF' : '#FDE3C8') +
        ';',
      dueText: isPaid ? 'Paid' : 'Due Fri',
      dueStyle:
        'font-size: 13px; font-weight: 800; border: 2px solid #2A2522; border-radius: 999px; padding: 1px 10px; background: ' +
        (isPaid ? '#8FC1A9' : '#F7D6D6') +
        ';',
      toPay: !isPaid,
      paid: isPaid,
      paidText: pay === 'handed' ? 'Amara paid 120 ZAE' : 'You paid 120 ZAE',
      byYou: pay === 'you',
      byHer: pay === 'handed',
      pay: () => this.setState({ pay: 'you' }),
      handOff: () => this.setState({ pay: 'handed' }),
      rooms: [
        { num: '6C', rent: '100', bg: '#8FC1A9', label: 'Room 6C is free, 100 ZAE a week' },
        { num: '1C', rent: '90', bg: '#8FC1A9', label: 'Room 1C is free, 90 ZAE a week' },
      ],
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
        <header style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px 8px' }}>
          <ScreenLink
            href="Money.dc.html"
            aria-label="Back to Money"
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
              Room 4C
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>Floor 4 · Block A</span>
          </div>

          <div
            role="img"
            aria-label="Comfort 3 out of 5"
            style={{
              display: 'flex',
              gap: '2px',
              background: '#FFFDF8',
              border: '3px solid #2A2522',
              borderRadius: '999px',
              padding: '5px 8px',
              boxShadow: '3px 4px 0 #2A2522',
            }}
          >
            {vals.comfort.map((c, $index) => (
              <svg key={$index} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 11 L12 4 L21 11 V20 H3 Z"
                  fill={c.fill}
                  stroke="#2A2522"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
              </svg>
            ))}
          </div>
        </header>

        {/* The room, drawn */}

        <section
          aria-label="Amara's room"
          style={{
            margin: '6px 20px 0',
            height: '214px',
            flex: 'none',
            position: 'relative',
            border: '3px solid #2A2522',
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow: '4px 5px 0 #2A2522',
            background: '#FDE3C8',
          }}
        >
          <svg
            width="344"
            height="208"
            viewBox="0 0 344 208"
            aria-hidden="true"
            style={{ position: 'absolute', left: '0', top: '0' }}
          >
            <rect x="0" y="0" width="344" height="150" fill="#FDE3C8" />

            <path d="M0 150 H344 V208 H0 Z" fill="#C08A5B" />

            <path d="M0 150 H344" stroke="#2A2522" strokeWidth="3" />

            <path
              d="M40 150 L20 208 M120 150 L110 208 M200 150 L204 208 M280 150 L296 208"
              stroke="#A86E48"
              strokeWidth="2"
            />

            {/* window, evening */}

            <rect
              x="132"
              y="22"
              width="96"
              height="78"
              rx="6"
              fill="#5B3D62"
              stroke="#2A2522"
              strokeWidth="3"
            />

            <circle cx="204" cy="44" r="10" fill="#F2CE6E" stroke="#2A2522" strokeWidth="2" />

            <path
              d="M132 84 h20 v-14 h14 v14 h10 v-22 h16 v22 h12 v-10 h24 v26 h-96 z"
              fill="#2F3E5C"
              stroke="#2A2522"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            <path d="M180 22 V100 M132 61 H228" stroke="#2A2522" strokeWidth="3" />

            <path d="M126 18 h108" stroke="#2A2522" strokeWidth="4" strokeLinecap="round" />

            <path
              d="M128 18 c4 30 4 60 -2 86 l14 0 c-6 -30 -6 -60 -2 -86 z"
              fill="#C8553D"
              stroke="#2A2522"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            <path
              d="M232 18 c-4 30 -4 60 2 86 l-14 0 c6 -30 6 -60 2 -86 z"
              fill="#C8553D"
              stroke="#2A2522"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* bed */}

            <rect
              x="16"
              y="112"
              width="104"
              height="44"
              rx="8"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="3"
            />

            <rect
              x="16"
              y="126"
              width="104"
              height="30"
              rx="6"
              fill="#9DB8E0"
              stroke="#2A2522"
              strokeWidth="3"
            />

            <rect
              x="22"
              y="104"
              width="34"
              height="18"
              rx="7"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="2.5"
            />

            <path d="M12 96 V170 M124 120 V170" stroke="#2A2522" strokeWidth="5" strokeLinecap="round" />

            <path d="M40 140 h60 M50 148 h40" stroke="#2F3E5C" strokeWidth="2" strokeDasharray="4 4" />

            {/* lamp + side table */}

            <rect
              x="250"
              y="122"
              width="40"
              height="34"
              rx="4"
              fill="#8E4129"
              stroke="#2A2522"
              strokeWidth="3"
            />

            <path d="M262 122 V96" stroke="#2A2522" strokeWidth="3" />

            <path
              d="M250 96 L256 76 H270 L276 96 Z"
              fill="#F2CE6E"
              stroke="#2A2522"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            <ellipse cx="263" cy="104" rx="26" ry="8" fill="#F2CE6E" opacity="0.35" />

            <rect
              x="276"
              y="112"
              width="10"
              height="10"
              rx="2"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="2"
            />

            {/* plant */}

            <path
              d="M314 156 l-6 -24 h24 l-6 24 z"
              fill="#E59A6B"
              stroke="#2A2522"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            <path
              d="M320 132 c-12 -6 -14 -20 -8 -30 c6 8 8 18 8 30 c2 -14 8 -24 16 -28 c2 12 -4 22 -16 28"
              fill="#8FC1A9"
              stroke="#2A2522"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* shelf with books */}

            <path d="M252 46 h70" stroke="#2A2522" strokeWidth="4" strokeLinecap="round" />

            <rect x="258" y="26" width="8" height="20" fill="#E8B53A" stroke="#2A2522" strokeWidth="2" />

            <rect x="267" y="22" width="8" height="24" fill="#2E4A3B" stroke="#2A2522" strokeWidth="2" />

            <rect x="276" y="28" width="8" height="18" fill="#C8553D" stroke="#2A2522" strokeWidth="2" />

            <circle cx="304" cy="38" r="8" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2" />

            <path d="M304 33 v5 l3 2" stroke="#2A2522" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* rug */}

            <ellipse cx="190" cy="182" rx="62" ry="14" fill="#E8B53A" stroke="#2A2522" strokeWidth="2.5" />

            <ellipse
              cx="190"
              cy="182"
              rx="40"
              ry="8"
              fill="none"
              stroke="#8E4129"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
          </svg>
        </section>

        {/* Rent */}

        <section
          aria-label="Rent"
          style={{
            margin: '16px 20px 0',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="13" cy="20" r="9" fill="#E8B53A" stroke="#2A2522" strokeWidth="3" />
              <circle cx="13" cy="20" r="3" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2" />
              <path
                d="M22 20 H37 M31 20 V27 M36 20 V25"
                stroke="#2A2522"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>

            <span
              style={{
                flex: '1',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '26px',
                fontWeight: '700',
                lineHeight: '1',
              }}
            >
              <svg width="14" height="19" viewBox="0 0 30 40" aria-hidden="true">
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
              120
              <span style={{ fontSize: '15px', fontWeight: '600', color: '#5E564D' }}>/week</span>
            </span>

            <span style={css(vals.dueStyle)}>{vals.dueText}</span>
          </div>

          <div
            role="img"
            aria-label="Week, rent due Friday"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {vals.week.map((d, $index) => (
              <span key={$index} style={css(d.style)}>
                {d.l}
              </span>
            ))}
          </div>

          <div
            role="img"
            aria-label={vals.streakLabel}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {vals.streak.map((s, $index) => (
              <span key={$index} style={css(s.style)}>
                <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M5 12 l5 5 l9 -10"
                    fill="none"
                    stroke={s.tick}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ))}

            <span style={{ marginLeft: '4px', fontSize: '13px', fontWeight: '800', color: '#4A433B' }}>
              on time
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span role="img" aria-label={vals.earmarkLabel} style={css(vals.earmarkStyle)}>
              <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 11 L12 4 L21 11 V20 H3 Z"
                  fill="#FFFDF8"
                  stroke="#2A2522"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
                <rect x="10" y="13" width="4" height="7" fill="#8E4129" stroke="#2A2522" strokeWidth="1.6" />
              </svg>
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
              <span>{vals.earmark}</span> set aside
            </span>

            <ScreenLink
              href="Rules.dc.html"
              aria-label="Auto-pay is off. Change it in Rules for Amara"
              style={{
                height: '30px',
                boxSizing: 'border-box',
                padding: '0 10px 0 6px',
                border: '2px dashed #2A2522',
                borderRadius: '999px',
                background: '#FFFDF8',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '13px',
                fontWeight: '800',
                color: '#2A2522',
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 2 l2 3 l3.5 -1 l0.5 3.5 l3.5 1 l-1.5 3.5 l1.5 3.5 l-3.5 1 l-0.5 3.5 l-3.5 -1 l-2 3 l-2 -3 l-3.5 1 l-0.5 -3.5 l-3.5 -1 l1.5 -3.5 l-1.5 -3.5 l3.5 -1 l0.5 -3.5 l3.5 1 z"
                  fill="#EFE4CF"
                  stroke="#2A2522"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="3.5" fill="#FFFDF8" stroke="#2A2522" strokeWidth="1.8" />
              </svg>
              Auto-pay off
            </ScreenLink>
          </div>

          {vals.toPay ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={vals.pay}
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
                Pay now
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

          {vals.paid ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '46px' }}>
                <span
                  style={{
                    flex: '1',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '18px',
                    fontWeight: '600',
                  }}
                >
                  {vals.paidText}
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

              {vals.byHer ? (
                <span
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: '21px',
                    fontWeight: '700',
                    color: '#5B3D62',
                    lineHeight: '1.1',
                    marginTop: '-6px',
                  }}
                >
                  rent first, always
                </span>
              ) : null}
            </>
          ) : null}
        </section>

        {/* Other rooms */}

        <section
          aria-label="Free rooms"
          style={{ margin: '16px 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
            <rect
              x="4"
              y="3"
              width="13"
              height="18"
              rx="1.5"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="2.2"
            />
            <circle cx="14" cy="12" r="1.3" fill="#2A2522" />
            <path
              d="M17 5 h3 v14 h-3"
              fill="none"
              stroke="#2A2522"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </svg>

          {vals.rooms.map((r, $index) => (
            <ScreenLink
              key={$index}
              href="Main.dc.html"
              aria-label={r.label}
              style={{
                flex: '1',
                height: '54px',
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '16px',
                background: '#FFFDF8',
                boxShadow: '3px 4px 0 #2A2522',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
                color: '#2A2522',
              }}
            >
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
                {r.num}
              </span>

              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '14px',
                  fontWeight: '800',
                  background: r.bg,
                  border: '2px solid #2A2522',
                  borderRadius: '999px',
                  padding: '0 8px',
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
                {r.rent}
              </span>
            </ScreenLink>
          ))}
        </section>
      </div>
    );
  }
}
