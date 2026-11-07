// Bank
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Bank extends Screen {
  static title = 'Bank';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const mode = this.state.mode ?? 'move';
    const dir = this.state.dir ?? 'save';
    const amt = this.state.amt ?? 100;
    const done = this.state.done ?? null;
    const cur = this.state.cur ?? 640;
    const sav = this.state.sav ?? 600;
    const owed = this.state.owed ?? 0;
    const LIMIT = 300;
    const isMove = mode === 'move',
      isBorrow = mode === 'borrow';
    const pill = (bg) =>
      'min-width: 104px; height: 40px; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 14px; background: ' +
      bg +
      '; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600;';
    const saving = dir === 'save';
    const maxAmt = isBorrow ? LIMIT - owed : saving ? cur - 120 : sav;
    const step = 50;
    let doneText = '',
      herLine = '';
    if (done === 'you') doneText = isBorrow ? 'You borrowed ' + amt + ' ZAE' : 'You moved ' + amt + ' ZAE';
    if (done === 'her') {
      if (isBorrow) {
        doneText = "Amara didn't borrow";
        herLine = 'not with rent due Friday';
      } else {
        doneText = 'Amara saved 50 ZAE';
        herLine = 'a little, just in case';
      }
    }
    const act = () => {
      if (isBorrow) this.setState({ done: 'you', owed: owed + amt, cur: cur + amt });
      else if (saving) this.setState({ done: 'you', cur: cur - amt, sav: sav + amt });
      else this.setState({ done: 'you', cur: cur + amt, sav: sav - amt });
    };
    const handOff = () => {
      if (isBorrow) this.setState({ done: 'her' });
      else this.setState({ done: 'her', cur: cur - 50, sav: sav + 50 });
    };
    return {
      accent,
      cur: cur.toLocaleString('en'),
      sav: sav.toLocaleString('en'),
      owed: String(owed),
      needle: String(28),
      owedBar:
        'display: block; height: 100%; width: ' +
        Math.round((owed / LIMIT) * 100) +
        '%; background: #E59A6B;' +
        (owed > 0 ? ' border-right: 2px solid #2A2522;' : ''),
      borrowBtn:
        'all: unset; flex: none; height: 44px; padding: 0 12px; box-sizing: border-box; border-radius: 999px; border: 3px solid #2A2522; display: flex; align-items: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; background: ' +
        (isBorrow ? accent : '#FFFDF8') +
        ';' +
        (isBorrow ? '' : ' box-shadow: 2px 3px 0 #2A2522;'),
      isMove,
      isBorrow,
      cardLabel: isBorrow ? 'Borrow' : 'Move money',
      fromName: saving ? 'Current' : 'Savings',
      toName: saving ? 'Savings' : 'Current',
      fromStyle: pill(saving ? '#FFFDF8' : '#E3F0DF'),
      toStyle: pill(saving ? '#E3F0DF' : '#FFFDF8'),
      flip: () => this.setState({ dir: saving ? 'withdraw' : 'save', done: null }),
      toMove: () => this.setState({ mode: 'move', done: null, amt: 100 }),
      toBorrow: () => this.setState({ mode: 'borrow', done: null, amt: 100 }),
      amt: String(amt),
      less: () => this.setState({ amt: Math.max(step, amt - step) }),
      more: () => this.setState({ amt: Math.min(maxAmt, amt + step) }),
      actLabel: isBorrow ? 'Borrow' : saving ? 'Save' : 'Withdraw',
      act,
      handOff,
      open: !done,
      done: !!done,
      doneText,
      herLine,
      byYou: done === 'you',
      byHer: done === 'her',
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
              Block A Bank
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>Floor 1</span>
          </div>

          <svg width="54" height="50" viewBox="0 0 54 50" role="img" aria-label="Bank building">
            <path
              d="M4 18 L27 4 L50 18 Z"
              fill="#E8B53A"
              stroke="#2A2522"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            <rect x="6" y="18" width="42" height="5" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2.5" />

            <path
              d="M12 23 V40 M21 23 V40 M33 23 V40 M42 23 V40"
              stroke="#2A2522"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <rect
              x="3"
              y="40"
              width="48"
              height="7"
              rx="2"
              fill="#2F3E5C"
              stroke="#2A2522"
              strokeWidth="2.5"
            />

            <circle cx="27" cy="13" r="3" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2" />
          </svg>
        </header>

        {/* Bank health: fractional reserve, it can fail */}

        <section
          aria-label="Bank health"
          style={{
            margin: '6px 20px 0',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: '#2F3E5C',
            color: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <svg
            width="110"
            height="64"
            viewBox="0 0 110 64"
            role="img"
            aria-label="Reserves at 18 percent: healthy"
          >
            <path d="M10 56 A45 45 0 0 1 25 22" fill="none" stroke="#C8553D" strokeWidth="12" />

            <path d="M25 22 A45 45 0 0 1 64 11" fill="none" stroke="#E8B53A" strokeWidth="12" />

            <path d="M64 11 A45 45 0 0 1 100 56" fill="none" stroke="#8FC1A9" strokeWidth="12" />

            <path d="M10 56 A45 45 0 0 1 100 56" fill="none" stroke="#2A2522" strokeWidth="2" />

            <g transform={`rotate(${vals.needle} 55 56)`}>
              <path d="M55 56 L55 18" stroke="#FFFDF8" strokeWidth="4" strokeLinecap="round" />
            </g>

            <circle cx="55" cy="56" r="7" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2.5" />
          </svg>

          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '22px',
                fontWeight: '700',
                lineHeight: '1',
              }}
            >
              Healthy
            </span>

            <span style={{ fontSize: '13px', fontWeight: '800', opacity: '.85' }}>Reserves 18%</span>

            <span
              style={{
                alignSelf: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                fontWeight: '800',
                background: '#FFFDF8',
                color: '#2A2522',
                border: '2px solid #2A2522',
                borderRadius: '999px',
                padding: '0 8px',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 2 l9 3.5 v6.5 c0 5.5 -4 9 -9 10.5 c-5 -1.5 -9 -5 -9 -10.5 v-6.5 z"
                  fill="#8FC1A9"
                  stroke="#2A2522"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
              </svg>
              Rent money insured
            </span>
          </div>
        </section>

        {/* Accounts */}

        <div style={{ margin: '14px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            type="button"
            onClick={vals.toMove}
            aria-label={`Current account, ${vals.cur} ZAE, 120 of it earmarked for rent`}
            style={{
              all: 'unset',
              position: 'relative',
              boxSizing: 'border-box',
              height: '104px',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <svg width="40" height="30" viewBox="0 0 40 30" aria-hidden="true">
              <rect
                x="2"
                y="4"
                width="36"
                height="24"
                rx="4"
                fill="#9DB8E0"
                stroke="#2A2522"
                strokeWidth="2.8"
              />
              <path d="M2 11 H38" stroke="#2A2522" strokeWidth="4" />
              <rect
                x="7"
                y="18"
                width="10"
                height="5"
                rx="1.5"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="2"
              />
            </svg>

            <span
              style={{
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
              {vals.cur}
            </span>

            <span
              title="Earmarked for rent"
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-8px',
                height: '26px',
                boxSizing: 'border-box',
                padding: '0 8px 0 5px',
                border: '3px solid #2A2522',
                borderRadius: '999px',
                background: '#FDE3C8',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 11 L12 4 L21 11 V20 H3 Z"
                  fill="#FFFDF8"
                  stroke="#2A2522"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
                <rect x="10" y="13" width="4" height="7" fill="#8E4129" stroke="#2A2522" strokeWidth="1.6" />
              </svg>
              120
            </span>
          </button>

          <button
            type="button"
            onClick={vals.toMove}
            aria-label={`Savings, ${vals.sav} ZAE, earning 3 percent a cycle`}
            style={{
              all: 'unset',
              position: 'relative',
              boxSizing: 'border-box',
              height: '104px',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#E3F0DF',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <svg width="44" height="34" viewBox="0 0 44 34" aria-hidden="true">
              <path
                d="M8 18 C8 9 16 5 24 5 C33 5 39 10 39 18 C39 24 35 28 30 29 V32 H25 V29 H18 V32 H13 V28 C10 26 8 22 8 18 Z"
                fill="#F7B6C2"
                stroke="#2A2522"
                strokeWidth="2.6"
                strokeLinejoin="round"
              />
              <path
                d="M8 16 H3 V21 H8"
                fill="#F7B6C2"
                stroke="#2A2522"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <circle cx="31" cy="14" r="2" fill="#2A2522" />
              <path d="M20 8 H28" stroke="#2A2522" strokeWidth="2.6" strokeLinecap="round" />
            </svg>

            <span
              style={{
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
              {vals.sav}
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
              3%
            </span>
          </button>
        </div>

        {/* Credit rating and borrowing */}

        <section
          aria-label="Borrowing"
          style={{
            margin: '14px 20px 0',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            role="img"
            aria-label="Credit rating B"
            style={{
              width: '54px',
              height: '54px',
              flex: 'none',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '50%',
              background: vals.accent,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: '1',
            }}
          >
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '24px', fontWeight: '700' }}>
              B
            </span>
          </div>

          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div
              role="img"
              aria-label={`${vals.owed} of 300 ZAE borrowed`}
              style={{
                height: '16px',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '999px',
                background: '#F5EFE5',
                overflow: 'hidden',
              }}
            >
              <span style={css(vals.owedBar)} />
            </div>

            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                fontSize: '13px',
                fontWeight: '800',
                color: '#4A433B',
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
              <span>{vals.owed}</span> / 300 owed
            </span>
          </div>

          <button type="button" onClick={vals.toBorrow} style={css(vals.borrowBtn)}>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M2 14 l5 -4 h5 l3 2 h-5 M2 14 v6 h6 l9 -4 l5 -4 c-1 -1.5 -2.5 -1.5 -4 -0.5 l-4 2.5"
                fill="#FDE3C8"
                stroke="#2A2522"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="6" r="3.5" fill="#E8B53A" stroke="#2A2522" strokeWidth="2" />
            </svg>
            Borrow
          </button>
        </section>

        <ScreenLink
          href="Statement.dc.html"
          aria-label="Statement: every transaction this cycle"
          style={{
            margin: '14px 20px 0',
            height: '56px',
            flex: 'none',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '18px',
            background: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '0 14px 0 10px',
            textDecoration: 'none',
            color: '#2A2522',
          }}
        >
          <svg width="32" height="36" viewBox="0 0 44 50" aria-hidden="true">
            <path
              d="M6 3 H38 V47 L33 43 L28 47 L22 43 L16 47 L11 43 L6 47 Z"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path
              d="M12 13 H32 M12 21 H32 M12 29 H24"
              stroke="#2A2522"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>

          <span
            style={{ flex: '1', fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}
          >
            Statement
          </span>

          <span style={{ fontSize: '13px', fontWeight: '800', color: '#2E4A3B' }}>+195 this cycle</span>

          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2A2522"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </ScreenLink>

        <div style={{ flex: '1' }} />

        {/* Action card: Decide or Hand Off */}

        <section
          aria-label={vals.cardLabel}
          style={{
            margin: '0 20px 24px',
            flex: 'none',
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
          {vals.isMove ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span style={css(vals.fromStyle)}>{vals.fromName}</span>

              <button
                type="button"
                onClick={vals.flip}
                aria-label="Swap direction"
                style={{
                  all: 'unset',
                  width: '44px',
                  height: '44px',
                  boxSizing: 'border-box',
                  border: '3px solid #2A2522',
                  borderRadius: '50%',
                  background: vals.accent,
                  boxShadow: '2px 3px 0 #2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12 h15 M13 6 l6 6 l-6 6" />
                </svg>
              </button>

              <span style={css(vals.toStyle)}>{vals.toName}</span>
            </div>
          ) : null}

          {vals.isBorrow ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '18px',
                  fontWeight: '600',
                  flex: '1',
                }}
              >
                Borrow
              </span>

              <span
                style={{
                  fontSize: '13px',
                  fontWeight: '800',
                  background: '#F7D6D6',
                  border: '2px solid #2A2522',
                  borderRadius: '999px',
                  padding: '0 9px',
                }}
              >
                5% a cycle
              </span>
            </div>
          ) : null}

          {vals.open ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2.5px solid #2A2522',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    height: '42px',
                    boxSizing: 'border-box',
                  }}
                >
                  <button
                    type="button"
                    aria-label="Less"
                    onClick={vals.less}
                    style={{
                      all: 'unset',
                      width: '44px',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '22px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      background: '#F5EFE5',
                      borderRight: '2.5px solid #2A2522',
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      minWidth: '96px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '3px',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '22px',
                      fontWeight: '700',
                    }}
                  >
                    <svg width="12" height="16" viewBox="0 0 30 40" aria-hidden="true">
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
                    {vals.amt}
                  </span>

                  <button
                    type="button"
                    aria-label="More"
                    onClick={vals.more}
                    style={{
                      all: 'unset',
                      width: '44px',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '22px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      background: '#F5EFE5',
                      borderLeft: '2.5px solid #2A2522',
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={vals.act}
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
                  {vals.actLabel}
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
            </>
          ) : null}

          {vals.done ? (
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

              {vals.byHer ? (
                <span
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: '21px',
                    fontWeight: '700',
                    color: '#5B3D62',
                    lineHeight: '1.1',
                  }}
                >
                  {vals.herLine}
                </span>
              ) : null}
            </>
          ) : null}
        </section>
      </div>
    );
  }
}
