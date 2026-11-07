// Markets
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Markets extends Screen {
  static title = 'Markets';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const view = this.state.view ?? 'stocks';
    const isStocks = view === 'stocks';
    const isPred = view === 'pred';
    const tab = (on) =>
      'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; cursor: pointer;' +
      (on
        ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
        : ' border: 2.5px solid transparent;');
    const spark = (v) => {
      const lo = Math.min(...v),
        hi = Math.max(...v),
        r = hi - lo || 1;
      return v
        .map(
          (y, i) => (3 + (i * 46) / (v.length - 1)).toFixed(1) + ',' + (23 - ((y - lo) / r) * 20).toFixed(1),
        )
        .join(' ');
    };
    const stocks = [
      {
        kind: 'mine',
        name: 'Ndura Mining',
        qty: 12,
        price: 48,
        chg: 6,
        bg: '#EFE4CF',
        by: 'you',
        v: [40, 42, 41, 44, 45, 48],
      },
      {
        kind: 'power',
        name: 'Brightline Power',
        qty: 5,
        price: 31,
        chg: -2,
        bg: '#FDE3C8',
        by: 'her',
        v: [34, 33, 34, 32, 32, 31],
      },
      {
        kind: 'football',
        name: 'Block A Lions',
        qty: 8,
        price: 14,
        chg: 9,
        bg: '#E3F0DF',
        by: 'you',
        v: [10, 11, 10, 12, 13, 14],
      },
      {
        kind: 'basket',
        name: 'Riverside Hawks',
        qty: 3,
        price: 22,
        chg: 1,
        bg: '#CFE3F4',
        by: 'her',
        v: [23, 21, 22, 21, 22, 22],
      },
    ].map((s) => ({
      name: s.name,
      qty: String(s.qty),
      price: String(s.price),
      bg: s.bg,
      chg: (s.chg > 0 ? '+' : '') + s.chg + '%',
      chgStyle:
        'font-size: 12px; font-weight: 800; border: 2px solid #2A2522; border-radius: 999px; padding: 0 6px; background: ' +
        (s.chg >= 0 ? '#8FC1A9' : '#F7D6D6') +
        ';',
      line: s.chg >= 0 ? '#2E4A3B' : '#C8553D',
      spark: spark(s.v),
      isMine: s.kind === 'mine',
      isPower: s.kind === 'power',
      isFootball: s.kind === 'football',
      isBasket: s.kind === 'basket',
      byYou: s.by === 'you',
      byHer: s.by === 'her',
    }));
    const preds = [
      {
        q: 'Lions beat the Hawks on Saturday?',
        side: 'YES',
        yes: 62,
        stake: 20,
        payout: 32,
        closes: 'Sat',
        by: 'you',
      },
      {
        q: 'Council passes the rent cap?',
        side: 'NO',
        yes: 41,
        stake: 30,
        payout: 51,
        closes: 'Thu',
        by: 'her',
      },
      {
        q: 'Bank raises its rate this week?',
        side: 'YES',
        yes: 100,
        stake: 15,
        payout: 27,
        won: true,
        by: 'you',
      },
    ].map((p) => ({
      q: p.q,
      side: p.side,
      yes: String(p.yes),
      stake: String(p.stake),
      payout: String(p.payout),
      closes: p.closes,
      open: !p.won,
      won: !!p.won,
      byYou: p.by === 'you',
      byHer: p.by === 'her',
      barLabel: p.yes + ' percent of the market say yes',
      barFill:
        'width: ' +
        p.yes +
        '%; background: #8FC1A9;' +
        (p.yes < 100 ? ' border-right: 2px solid #2A2522;' : ''),
      cardStyle:
        'box-sizing: border-box; border: 3px solid #2A2522; border-radius: 18px; background: ' +
        (p.won ? '#FBF3DC' : '#FFFDF8') +
        '; box-shadow: 3px 4px 0 #2A2522; display: flex; overflow: hidden;' +
        (p.won ? ' opacity: .9;' : ''),
      stubStyle:
        'width: 62px; flex: none; box-sizing: border-box; border-right: 3px dashed #2A2522; background: ' +
        (p.side === 'YES' ? '#8FC1A9' : '#F7D6D6') +
        '; color: ' +
        (p.side === 'YES' ? '#2E4A3B' : '#8E4129') +
        '; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;',
    }));
    return {
      accent,
      isStocks,
      isPred,
      stocksTab: tab(isStocks),
      predTab: tab(isPred),
      showStocks: () => this.setState({ view: 'stocks' }),
      showPred: () => this.setState({ view: 'pred' }),
      stocks,
      preds,
      floorCta: isStocks ? 'Buy and sell on the floor' : 'More questions on the floor',
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

          <h1
            style={{
              flex: '1',
              margin: '0',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '28px',
              fontWeight: '700',
              lineHeight: '1.1',
            }}
          >
            Markets
          </h1>

          <ScreenLink
            href="TradingFloor.dc.html"
            aria-label="Go to the trading floor, floor 2"
            style={{
              height: '46px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '14px',
              background: '#5B3D62',
              color: '#FFFDF8',
              boxShadow: '3px 4px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 10px 0 6px',
              textDecoration: 'none',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true">
              <rect
                x="6"
                y="6"
                width="28"
                height="30"
                rx="2"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="2.5"
              />

              <rect x="10" y="10" width="20" height="9" rx="1.5" fill="#2A2522" />

              <path
                d="M12 17 l4 -4 l3 2 l5 -4"
                fill="none"
                stroke="#8FC1A9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M11 24 h6 M23 24 h6 M11 29 h6 M23 29 h6"
                stroke="#2A2522"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}>
              Floor 2
            </span>
          </ScreenLink>
        </header>

        <div
          role="tablist"
          aria-label="Markets view"
          style={{
            margin: '6px 20px 0',
            height: '50px',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '999px',
            background: '#FFFDF8',
            boxShadow: '3px 4px 0 #2A2522',
            display: 'flex',
            padding: '4px',
            gap: '4px',
            flex: 'none',
          }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={vals.isStocks}
            onClick={vals.showStocks}
            style={css(vals.stocksTab)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="13" width="4" height="8" fill="#8FC1A9" stroke="#2A2522" strokeWidth="2" />
              <rect x="10" y="9" width="4" height="12" fill="#8FC1A9" stroke="#2A2522" strokeWidth="2" />
              <rect x="17" y="4" width="4" height="17" fill="#8FC1A9" stroke="#2A2522" strokeWidth="2" />
            </svg>
            Stocks
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={vals.isPred}
            onClick={vals.showPred}
            style={css(vals.predTab)}
          >
            <svg width="24" height="22" viewBox="0 0 28 24" aria-hidden="true">
              <path
                d="M2 5 h24 v5 a2.5 2.5 0 0 0 0 5 v5 h-24 v-5 a2.5 2.5 0 0 0 0 -5 z"
                fill="#E8B53A"
                stroke="#2A2522"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path d="M14 6 v12" stroke="#2A2522" strokeWidth="1.6" strokeDasharray="2 2" />
            </svg>
            Predictions
            <span
              style={{
                height: '20px',
                minWidth: '20px',
                boxSizing: 'border-box',
                padding: '0 5px',
                border: '2px solid #2A2522',
                borderRadius: '999px',
                background: '#F7D6D6',
                fontSize: '12px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              2
            </span>
          </button>
        </div>

        {/* STOCKS */}

        {vals.isStocks ? (
          <>
            <section
              aria-label="Your stocks"
              style={{
                margin: '16px 20px 0',
                border: '3px solid #2A2522',
                borderRadius: '20px',
                background: '#2F3E5C',
                color: '#FFFDF8',
                boxShadow: '4px 5px 0 #2A2522',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '34px',
                    fontWeight: '700',
                    lineHeight: '1',
                  }}
                >
                  <svg width="20" height="27" viewBox="0 0 30 40" aria-hidden="true">
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
                  909
                </span>

                <span style={{ display: 'flex', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: '800',
                      background: '#8FC1A9',
                      color: '#2A2522',
                      border: '2px solid #2A2522',
                      borderRadius: '999px',
                      padding: '0 8px',
                    }}
                  >
                    +4% today
                  </span>

                  <span
                    role="img"
                    aria-label="Can borrow up to 300 ZAE to invest"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontSize: '13px',
                      fontWeight: '800',
                      background: '#FFFDF8',
                      color: '#2A2522',
                      border: '2px solid #2A2522',
                      borderRadius: '999px',
                      padding: '0 8px',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 2 l9 3.5 v6.5 c0 5.5 -4 9 -9 10.5 c-5 -1.5 -9 -5 -9 -10.5 v-6.5 z"
                        fill="#8FC1A9"
                        stroke="#2A2522"
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                      />
                    </svg>
                    300
                  </span>
                </span>
              </div>

              <svg width="110" height="56" viewBox="0 0 110 56" aria-hidden="true">
                <path
                  d="M4 44 L22 38 L38 42 L56 28 L72 32 L88 18 L106 10 V54 H4 Z"
                  fill="#8FC1A9"
                  opacity="0.35"
                />

                <path
                  d="M4 44 L22 38 L38 42 L56 28 L72 32 L88 18 L106 10"
                  fill="none"
                  stroke="#8FC1A9"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle cx="106" cy="10" r="4.5" fill="#E8B53A" stroke="#2A2522" strokeWidth="2" />
              </svg>
            </section>

            <ul
              aria-label="Holdings"
              style={{
                listStyle: 'none',
                margin: '16px 0 0',
                padding: '0 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {vals.stocks.map((s, $index) => (
                <li
                  key={$index}
                  style={{
                    boxSizing: 'border-box',
                    height: '72px',
                    border: '3px solid #2A2522',
                    borderRadius: '18px',
                    background: '#FFFDF8',
                    boxShadow: '3px 4px 0 #2A2522',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '0 12px 0 10px',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '48px',
                      height: '48px',
                      flex: 'none',
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '14px',
                      background: s.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {s.isMine ? (
                      <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true">
                        <path
                          d="M6 34 L20 22 L34 34 Z"
                          fill="#8E4129"
                          stroke="#2A2522"
                          strokeWidth="2.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 30 l3 -3 M24 28 l2 2"
                          stroke="#F2CE6E"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 10 C16 4 26 4 32 10"
                          fill="none"
                          stroke="#2A2522"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path d="M21 7 L15 22" stroke="#2A2522" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    ) : null}

                    {s.isPower ? (
                      <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true">
                        <path
                          d="M23 3 L9 22 H19 L15 37 L31 16 H21 Z"
                          fill="#E8B53A"
                          stroke="#2A2522"
                          strokeWidth="2.8"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}

                    {s.isFootball ? (
                      <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true">
                        <circle cx="20" cy="20" r="15" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2.8" />
                        <path d="M20 13 l6 4.5 l-2.3 7 h-7.4 l-2.3 -7 z" fill="#2A2522" />
                        <path
                          d="M20 13 v-8 M26 17.5 l7 -3 M23.7 24.5 l4.5 6.5 M16.3 24.5 l-4.5 6.5 M14 17.5 l-7 -3"
                          stroke="#2A2522"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : null}

                    {s.isBasket ? (
                      <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true">
                        <circle cx="20" cy="20" r="15" fill="#E59A6B" stroke="#2A2522" strokeWidth="2.8" />
                        <path
                          d="M5 20 h30 M20 5 v30 M9 9 c6 6 6 16 0 22 M31 9 c-6 6 -6 16 0 22"
                          fill="none"
                          stroke="#2A2522"
                          strokeWidth="2.2"
                        />
                      </svg>
                    ) : null}

                    {s.byYou ? (
                      <span
                        role="img"
                        aria-label="You bought this"
                        title="You decided"
                        style={{
                          position: 'absolute',
                          right: '-8px',
                          bottom: '-8px',
                          width: '22px',
                          height: '22px',
                          boxSizing: 'border-box',
                          border: '2px solid #2A2522',
                          borderRadius: '50%',
                          background: '#CFE3F4',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M4 20 l3 -1 l12 -12 a2 2 0 0 0 -3 -3 l-12 12 z"
                            fill="#FFFDF8"
                            stroke="#2A2522"
                            strokeWidth="2.6"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    ) : null}

                    {s.byHer ? (
                      <span
                        role="img"
                        aria-label="Amara bought this on her own"
                        title="On her own"
                        style={{
                          position: 'absolute',
                          right: '-8px',
                          bottom: '-8px',
                          width: '22px',
                          height: '22px',
                          boxSizing: 'border-box',
                          border: '2px dashed #2A2522',
                          borderRadius: '50%',
                          background: '#EFE4CF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 40 40" aria-hidden="true">
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

                  <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '16px',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {s.name}
                    </span>

                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#5E564D' }}>× {s.qty}</span>
                  </div>

                  <svg width="52" height="26" viewBox="0 0 52 26" aria-hidden="true">
                    <polyline
                      points={s.spark}
                      fill="none"
                      stroke={s.line}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div
                    style={{
                      width: '58px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '2px',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '17px',
                        fontWeight: '700',
                        lineHeight: '1',
                      }}
                    >
                      <svg width="9" height="12" viewBox="0 0 30 40" aria-hidden="true">
                        <path
                          d="M4 8 H26 L4 32 H26"
                          fill="none"
                          stroke="#2A2522"
                          strokeWidth="5"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <path
                          d="M15 2 V38"
                          fill="none"
                          stroke="#2A2522"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </svg>
                      {s.price}
                    </span>

                    <span style={css(s.chgStyle)}>{s.chg}</span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {/* PREDICTIONS */}

        {vals.isPred ? (
          <>
            <section
              aria-label="Your predictions"
              style={{
                margin: '16px 20px 0',
                border: '3px solid #2A2522',
                borderRadius: '20px',
                background: '#5B3D62',
                color: '#FFFDF8',
                boxShadow: '4px 5px 0 #2A2522',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '.04em', opacity: '.85' }}>
                  IN PLAY
                </span>

                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '28px',
                    fontWeight: '700',
                    lineHeight: '1',
                  }}
                >
                  <svg width="15" height="20" viewBox="0 0 30 40" aria-hidden="true">
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
                  50
                </span>
              </div>

              <svg width="28" height="20" viewBox="0 0 28 20" aria-hidden="true">
                <path
                  d="M3 10 h18 M15 4 l7 6 l-7 6"
                  fill="none"
                  stroke="#F2CE6E"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '.04em', opacity: '.85' }}>
                  COULD WIN
                </span>

                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '28px',
                    fontWeight: '700',
                    lineHeight: '1',
                    color: '#F2CE6E',
                  }}
                >
                  <svg width="15" height="20" viewBox="0 0 30 40" aria-hidden="true">
                    <path
                      d="M4 8 H26 L4 32 H26"
                      fill="none"
                      stroke="#F2CE6E"
                      strokeWidth="5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path d="M15 2 V38" fill="none" stroke="#F2CE6E" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                  83
                </span>
              </div>
            </section>

            <ul
              aria-label="Prediction tickets"
              style={{
                listStyle: 'none',
                margin: '16px 0 0',
                padding: '0 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {vals.preds.map((p, $index) => (
                <li key={$index} style={css(p.cardStyle)}>
                  <div style={css(p.stubStyle)}>
                    <span
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '17px',
                        fontWeight: '700',
                        letterSpacing: '.02em',
                      }}
                    >
                      {p.side}
                    </span>

                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1px',
                        fontSize: '13px',
                        fontWeight: '800',
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
                        <path
                          d="M15 2 V38"
                          fill="none"
                          stroke="#2A2522"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </svg>
                      {p.stake}
                    </span>
                  </div>

                  <div
                    style={{
                      flex: '1',
                      minWidth: '0',
                      padding: '10px 12px 10px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '7px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <span
                        style={{
                          flex: '1',
                          fontFamily: "'Fredoka', sans-serif",
                          fontSize: '16px',
                          fontWeight: '600',
                          lineHeight: '1.2',
                        }}
                      >
                        {p.q}
                      </span>

                      {p.byYou ? (
                        <span
                          role="img"
                          aria-label="You decided"
                          title="You decided"
                          style={{
                            width: '22px',
                            height: '22px',
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
                          <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M4 20 l3 -1 l12 -12 a2 2 0 0 0 -3 -3 l-12 12 z"
                              fill="#FFFDF8"
                              stroke="#2A2522"
                              strokeWidth="2.6"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      ) : null}

                      {p.byHer ? (
                        <span
                          role="img"
                          aria-label="On her own"
                          title="On her own"
                          style={{
                            width: '22px',
                            height: '22px',
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
                          <svg width="15" height="15" viewBox="0 0 40 40" aria-hidden="true">
                            <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                            <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                            <circle
                              cx="20"
                              cy="22"
                              r="12"
                              fill="#7A4A2E"
                              stroke="#2A2522"
                              strokeWidth="2.5"
                            />
                            <path
                              d="M8 21 C8 13 13 10 20 10 C27 10 32 13 32 21 C29 16 25 15 20 15 C15 15 11 16 8 21 Z"
                              fill="#2A2522"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </div>

                    <div
                      role="img"
                      aria-label={p.barLabel}
                      style={{
                        height: '14px',
                        boxSizing: 'border-box',
                        border: '2px solid #2A2522',
                        borderRadius: '999px',
                        background: '#F7D6D6',
                        overflow: 'hidden',
                        display: 'flex',
                      }}
                    >
                      <span style={css(p.barFill)} />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        fontWeight: '800',
                        color: '#4A433B',
                      }}
                    >
                      <span style={{ color: '#2E4A3B' }}>{p.yes}% yes</span>

                      <span style={{ flex: '1' }} />

                      {p.open ? (
                        <>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                              <circle
                                cx="12"
                                cy="12"
                                r="9"
                                fill="#FFFDF8"
                                stroke="#2A2522"
                                strokeWidth="2.6"
                              />
                              <path
                                d="M12 7 v5 l3 2"
                                fill="none"
                                stroke="#2A2522"
                                strokeWidth="2.6"
                                strokeLinecap="round"
                              />
                            </svg>
                            {p.closes}
                          </span>

                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1px',
                              background: '#F5EFE5',
                              border: '2px solid #2A2522',
                              borderRadius: '999px',
                              padding: '0 7px',
                              color: '#2A2522',
                            }}
                          >
                            →
                            <svg
                              width="7"
                              height="10"
                              viewBox="0 0 30 40"
                              aria-hidden="true"
                              style={{ marginLeft: '2px' }}
                            >
                              <path
                                d="M4 8 H26 L4 32 H26"
                                fill="none"
                                stroke="#2A2522"
                                strokeWidth="5"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                              />
                              <path
                                d="M15 2 V38"
                                fill="none"
                                stroke="#2A2522"
                                strokeWidth="5"
                                strokeLinecap="round"
                              />
                            </svg>
                            {p.payout}
                          </span>
                        </>
                      ) : null}

                      {p.won ? (
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1px',
                            background: '#E8B53A',
                            border: '2px solid #2A2522',
                            borderRadius: '999px',
                            padding: '0 8px',
                            color: '#2A2522',
                            transform: 'rotate(-4deg)',
                          }}
                        >
                          Won
                          <svg
                            width="7"
                            height="10"
                            viewBox="0 0 30 40"
                            aria-hidden="true"
                            style={{ marginLeft: '4px' }}
                          >
                            <path
                              d="M4 8 H26 L4 32 H26"
                              fill="none"
                              stroke="#2A2522"
                              strokeWidth="5"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                            />
                            <path
                              d="M15 2 V38"
                              fill="none"
                              stroke="#2A2522"
                              strokeWidth="5"
                              strokeLinecap="round"
                            />
                          </svg>
                          {p.payout}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <div style={{ flex: '1' }} />

        <ScreenLink
          href="TradingFloor.dc.html"
          style={{
            margin: '0 20px 26px',
            height: '60px',
            flex: 'none',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: vals.accent,
            boxShadow: '4px 5px 0 #2A2522',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '0 16px',
            textDecoration: 'none',
          }}
        >
          <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true">
            <path
              d="M4 36 V12 L20 4 L36 12 V36 Z"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />

            <rect x="10" y="14" width="20" height="10" rx="1.5" fill="#2A2522" />

            <path
              d="M12 22 l4 -4 l3 2 l6 -5"
              fill="none"
              stroke="#8FC1A9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <rect x="16" y="28" width="8" height="8" fill="#5B3D62" stroke="#2A2522" strokeWidth="2.2" />
          </svg>

          <span
            style={{ flex: '1', fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '600' }}
          >
            {vals.floorCta}
          </span>

          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2A2522"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </ScreenLink>
      </div>
    );
  }
}
