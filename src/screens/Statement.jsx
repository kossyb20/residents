// Bank statement
import { Fragment } from 'react';
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Statement extends Screen {
  static title = 'Bank statement';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const acct = this.state.acct ?? 'cur';
    const isCur = acct === 'cur',
      isSav = acct === 'sav';
    const G = {
      income: [
        'M3 9 L12 3 L21 9 Z M5 11 V18 M10 11 V18 M14 11 V18 M19 11 V18 M3 21 H21',
        '#E8B53A',
        '#FDE3C8',
      ],
      wages: ['M3 8 H21 V20 H3 Z M9 8 V5 H15 V8 M3 13 H21', '#E59A6B', '#F7D6D6'],
      bills: ['M13 2 L5 13 H11 L9 22 L19 10 H13 Z', '#F2CE6E', '#FDE3C8'],
      esusu: ['M6 9 H18 C21 12 21 19 12 20 C3 19 3 12 6 9 Z M8 6 H16', '#8E4129', '#EFE4CF'],
      save: [
        'M4 12 C4 8 8 5 13 5 C16 5 18 6 19 8 H21 V12 H19 C18 14 17 15 15 16 V19 H12 V17 H9 V19 H6 V16 C5 15 4 14 4 12 Z',
        '#F7B6C2',
        '#E3F0DF',
      ],
      ticket: ['M2 7 H22 V10 A2 2 0 0 0 22 14 V17 H2 V14 A2 2 0 0 0 2 10 Z', '#E8B53A', '#EFE4CF'],
      stock: ['M3 20 H21 M5 20 V13 H8 V20 M10.5 20 V9 H13.5 V20 M16 20 V5 H19 V20', '#8FC1A9', '#CFE3F4'],
      shop: ['M3 9 H21 L19 20 H5 Z M7 9 L10 4 M17 9 L14 4', '#FDE3C8', '#E3F0DF'],
      interest: ['M12 3 A9 9 0 1 0 12.01 3 Z M8.5 15.5 L15.5 8.5', '#8FC1A9', '#E3F0DF'],
    };
    // chronological; amounts in ZAE
    const books = {
      cur: {
        open: 445,
        tx: [
          { day: 'SAT', t: 'Esusu · round 2', g: 'esusu', a: -50, by: 'her' },
          { day: 'SUN', t: 'Moved to savings', g: 'save', a: -100, by: 'you' },
          { day: 'SUN', t: 'Prediction won · bank rate', g: 'ticket', a: 27, by: 'you' },
          { day: 'MON', t: 'Wages · Kora Labs', g: 'wages', a: 260 },
          { day: 'MON', t: 'Basic income', g: 'income', a: 150, tag: 'rent and bills' },
          { day: 'MON', t: 'Electricity and water', g: 'bills', a: -30, by: 'her', tag: 'from earmark' },
          { day: 'TUE', t: 'Supermarket', g: 'shop', a: -34, by: 'her' },
          { day: 'TUE', t: 'Bought 2 LIO', g: 'stock', a: -28, by: 'you' },
        ],
      },
      sav: {
        open: 485,
        tx: [
          { day: 'SUN', t: 'From current account', g: 'save', a: 100, by: 'you' },
          { day: 'MON', t: 'Interest · 3%', g: 'interest', a: 15 },
        ],
      },
    };
    const b = books[acct];
    let bal = b.open,
      inSum = 0,
      outSum = 0;
    const chron = b.tx.map((x) => {
      bal += x.a;
      if (x.a > 0) inSum += x.a;
      else outSum -= x.a;
      return { ...x, bal };
    });
    const close = bal;
    const rows = [];
    let lastDay = null;
    chron
      .slice()
      .reverse()
      .forEach((x) => {
        if (x.day !== lastDay) {
          rows.push({ isDay: true, isTx: false, day: x.day === 'TUE' ? 'TODAY' : x.day });
          lastDay = x.day;
        }
        const g = G[x.g];
        rows.push({
          isDay: false,
          isTx: true,
          title: x.t,
          glyph: g[0],
          fill: g[1],
          bg: g[2],
          amt: (x.a > 0 ? '+' : '−') + Math.abs(x.a),
          amtStyle:
            'font-family: Fredoka, sans-serif; font-size: 17px; font-weight: 700; line-height: 1; color: ' +
            (x.a > 0 ? '#2E4A3B' : '#8E4129') +
            ';',
          bal: String(x.bal),
          hasTag: !!x.tag,
          tag: x.tag || '',
          byYou: x.by === 'you',
          byHer: x.by === 'her',
          label:
            x.t +
            ', ' +
            (x.a > 0 ? 'in ' : 'out ') +
            Math.abs(x.a) +
            ' ZAE, balance ' +
            x.bal +
            (x.by === 'you' ? ', you decided' : x.by === 'her' ? ', Amara decided' : ''),
        });
      });
    const tab = (on) =>
      'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 7px; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; cursor: pointer;' +
      (on
        ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
        : ' border: 2.5px solid transparent;');
    return {
      accent,
      isCur,
      isSav,
      curTab: tab(isCur),
      savTab: tab(isSav),
      showCur: () => this.setState({ acct: 'cur' }),
      showSav: () => this.setState({ acct: 'sav' }),
      open: String(b.open),
      close: String(close),
      inSum: String(inSum),
      outSum: String(outSum),
      rows,
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
            href="Bank.dc.html"
            aria-label="Back to the bank"
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
              Statement
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Cycle 14 · Sat to Tue
            </span>
          </div>

          <svg width="44" height="50" viewBox="0 0 44 50" aria-hidden="true">
            <path
              d="M6 3 H38 V47 L33 43 L28 47 L22 43 L16 47 L11 43 L6 47 Z"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            <path
              d="M12 13 H32 M12 21 H32 M12 29 H24"
              stroke="#2A2522"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <circle cx="31" cy="33" r="6" fill="#8FC1A9" stroke="#2A2522" strokeWidth="2.5" />
          </svg>
        </header>

        <div
          role="tablist"
          aria-label="Account"
          style={{
            margin: '6px 20px 0',
            height: '50px',
            flex: 'none',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '999px',
            background: '#FFFDF8',
            boxShadow: '3px 4px 0 #2A2522',
            display: 'flex',
            padding: '4px',
            gap: '4px',
          }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={vals.isCur}
            onClick={vals.showCur}
            style={css(vals.curTab)}
          >
            <svg width="24" height="18" viewBox="0 0 40 30" aria-hidden="true">
              <rect
                x="2"
                y="4"
                width="36"
                height="24"
                rx="4"
                fill="#9DB8E0"
                stroke="#2A2522"
                strokeWidth="3"
              />
              <path d="M2 11 H38" stroke="#2A2522" strokeWidth="4" />
            </svg>
            Current
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={vals.isSav}
            onClick={vals.showSav}
            style={css(vals.savTab)}
          >
            <svg width="24" height="20" viewBox="0 0 44 34" aria-hidden="true">
              <path
                d="M8 18 C8 9 16 5 24 5 C33 5 39 10 39 18 C39 24 35 28 30 29 V32 H25 V29 H18 V32 H13 V28 C10 26 8 22 8 18 Z"
                fill="#F7B6C2"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </svg>
            Savings
          </button>
        </div>

        {/* Opening, in, out, closing */}

        <section
          aria-label="Summary"
          style={{
            margin: '14px 20px 0',
            flex: 'none',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: '#2F3E5C',
            color: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '.05em', opacity: '.8' }}>
              OPENED
            </span>

            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '20px',
                fontWeight: '700',
                lineHeight: '1',
              }}
            >
              {vals.open}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#8FC1A9' }}>+{vals.inSum}</span>

            <span style={{ fontSize: '13px', fontWeight: '800', color: '#F2B8AE' }}>−{vals.outSum}</span>
          </div>

          <svg width="26" height="18" viewBox="0 0 28 20" aria-hidden="true">
            <path
              d="M3 10 h18 M15 4 l7 6 l-7 6"
              fill="none"
              stroke="#F2CE6E"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '.05em', opacity: '.8' }}>
              NOW
            </span>

            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '26px',
                fontWeight: '700',
                lineHeight: '1',
                color: '#F2CE6E',
              }}
            >
              <svg width="13" height="18" viewBox="0 0 30 40" aria-hidden="true">
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
              {vals.close}
            </span>
          </div>
        </section>

        {/* The statement paper */}

        <section
          aria-label="Transactions"
          style={{
            margin: '16px 20px 0',
            flex: '1',
            minHeight: '0',
            position: 'relative',
            border: '3px solid #2A2522',
            borderBottom: 'none',
            borderRadius: '18px 18px 0 0',
            background: '#FFFDF8',
            boxShadow: '4px 0 0 #2A2522',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              height: '10px',
              flex: 'none',
              background: 'repeating-linear-gradient(90deg, #E8B53A 0 14px, #2F3E5C 14px 28px)',
              borderBottom: '2.5px solid #2A2522',
            }}
          />

          <ul
            style={{ listStyle: 'none', margin: '0', padding: '4px 12px 16px', overflowY: 'auto', flex: '1' }}
          >
            {vals.rows.map((r, $index) => (
              <Fragment key={$index}>
                {r.isDay ? (
                  <li
                    style={{
                      padding: '10px 2px 4px',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '13px',
                      fontWeight: '600',
                      letterSpacing: '.06em',
                      color: '#8A8075',
                      borderBottom: '2px dashed #E3D9C8',
                    }}
                  >
                    {r.day}
                  </li>
                ) : null}

                {r.isTx ? (
                  <li
                    aria-label={r.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '7px 0',
                      borderBottom: '2px dashed #EFE6D7',
                    }}
                  >
                    <span
                      style={{
                        position: 'relative',
                        width: '36px',
                        height: '36px',
                        flex: 'none',
                        boxSizing: 'border-box',
                        border: '2.5px solid #2A2522',
                        borderRadius: '11px',
                        background: r.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d={r.glyph}
                          fill={r.fill}
                          stroke="#2A2522"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      {r.byYou ? (
                        <span
                          title="You decided"
                          style={{
                            position: 'absolute',
                            right: '-7px',
                            bottom: '-7px',
                            width: '18px',
                            height: '18px',
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
                      ) : null}

                      {r.byHer ? (
                        <span
                          title="On her own"
                          style={{
                            position: 'absolute',
                            right: '-7px',
                            bottom: '-7px',
                            width: '18px',
                            height: '18px',
                            boxSizing: 'border-box',
                            border: '2px dashed #2A2522',
                            borderRadius: '50%',
                            background: '#EFE4CF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 40 40" aria-hidden="true">
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
                          </svg>
                        </span>
                      ) : null}
                    </span>

                    <div
                      style={{
                        flex: '1',
                        minWidth: '0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Fredoka', sans-serif",
                          fontSize: '15.5px',
                          fontWeight: '600',
                          lineHeight: '1.15',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {r.title}
                      </span>

                      {r.hasTag ? (
                        <span
                          style={{
                            alignSelf: 'flex-start',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            fontSize: '11.5px',
                            fontWeight: '800',
                            background: '#FDE3C8',
                            border: '2px solid #2A2522',
                            borderRadius: '999px',
                            padding: '0 7px',
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M3 11 L12 4 L21 11 V20 H3 Z"
                              fill="#FFFDF8"
                              stroke="#2A2522"
                              strokeWidth="2.6"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {r.tag}
                        </span>
                      ) : null}
                    </div>

                    <div
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1px' }}
                    >
                      <span style={css(r.amtStyle)}>{r.amt}</span>

                      <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#8A8075' }}>{r.bal}</span>
                    </div>
                  </li>
                ) : null}
              </Fragment>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}
