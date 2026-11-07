// Building map
import { Fragment } from 'react';
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Main extends Screen {
  static title = 'Building map';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const Q = {
      daily: { label: 'Daily life', bg: '#FDE3C8', fg: '#2A2522' },
      money: { label: 'Money', bg: '#2F3E5C', fg: '#FFFDF8' },
      play: { label: 'Play', bg: '#5B3D62', fg: '#FFFDF8' },
      civic: { label: 'Civic', bg: '#8E4129', fg: '#FFFDF8' },
      mind: { label: 'Mind', bg: '#2F6B5F', fg: '#FFFDF8' },
    };
    const P = {
      stadium: {
        name: 'Rooftop stadium',
        q: 'play',
        floor: 'R',
        status: 'Lions v Rovers tonight at 8 pm',
        live: true,
        href: 'Stadium.dc.html',
      },
      arcade: {
        name: 'Arcade',
        q: 'play',
        floor: '9',
        status: '1,366 games live · Ludo Night on Saturday',
        live: true,
        href: 'Arcade.dc.html',
      },
      council: {
        name: 'Council',
        q: 'civic',
        floor: '8',
        status: 'Rent cap vote on Thursday at 9 am',
        live: true,
        full: 'Council hall',
        href: 'Council.dc.html',
      },
      court: {
        name: 'Court',
        q: 'civic',
        floor: '8',
        status: '4 open cases · you are on the jury Thursday',
        live: true,
        full: 'Courthouse',
        href: 'Court.dc.html',
      },
      lab: {
        name: 'Lab',
        q: 'mind',
        floor: '6',
        status: '3 projects running · 1 result due today',
        live: false,
        href: 'Lab.dc.html',
      },
      common: {
        name: 'Common room',
        q: 'daily',
        floor: '5',
        status: 'Lions v Rovers on the TV at 8 pm',
        live: false,
        href: 'CommonRoom.dc.html',
      },
      library: {
        name: 'Library',
        q: 'mind',
        floor: '3',
        status: 'Writing contest open · quiz night at 9 pm',
        live: false,
        href: 'Library.dc.html',
      },
      trading: {
        name: 'Trading floor',
        q: 'money',
        floor: '2',
        status: 'Team stocks up 4% today',
        live: false,
        href: 'TradingFloor.dc.html',
      },
      gigs: {
        name: 'Gig Exchange',
        q: 'money',
        floor: '2',
        status: '3 new gigs · you have 2 on the go',
        live: true,
        href: 'GigExchange.dc.html',
      },
      bank: {
        name: 'Bank',
        q: 'money',
        floor: '1',
        status: 'Savings pay 3% a cycle',
        live: false,
        full: 'Bank branch',
        href: 'Bank.dc.html',
      },
      lobby: {
        name: 'Lobby',
        q: 'daily',
        floor: 'G',
        status: 'Lift fund closes tonight at 11 pm',
        live: true,
        href: 'Lobby.dc.html',
      },
      market: {
        name: 'Supermarket',
        q: 'daily',
        floor: 'G',
        status: 'Rice is running low · limit 2 each',
        live: false,
        href: 'Supermarket.dc.html',
      },
    };
    const filter = this.state.q ?? 'all';
    const selKey = this.state.sel ?? 'council';
    const keys = ['all', 'daily', 'money', 'play', 'civic', 'mind'];
    const quarters = keys.map((k) => {
      const on = k === filter;
      return {
        label: k === 'all' ? 'All' : Q[k].label,
        on: on ? 'true' : 'false',
        pick: () => this.setState({ q: k }),
        swatch:
          'width: 9px; height: 9px; border-radius: 3px; border: 2px solid #2A2522; background: ' +
          (k === 'all' ? '#FFFDF8' : Q[k].bg) +
          ';',
        style:
          'all: unset; flex: none; box-sizing: border-box; height: 30px; display: flex; align-items: center; gap: 5px; padding: 0 9px; border: 2.5px solid #2A2522; border-radius: 999px; font-family: Fredoka, sans-serif; font-size: 12.5px; font-weight: 500; cursor: pointer; background: ' +
          (on ? accent : '#FFFDF8') +
          ';',
      };
    });
    const dimRooms = filter !== 'all';
    const base =
      'position: relative; box-sizing: border-box; border-radius: 10px; border: 2.5px solid #2A2522; display: flex; align-items: center; justify-content: center; gap: 4px;';
    const tones = ['#7A4A2E', '#5A3520', '#C08A5B', '#3E2A1E', '#A86E48'];
    let n = 0;
    const place = (key, span) => {
      const p = P[key];
      const q = Q[p.q];
      const sel = key === selKey;
      const dim = filter !== 'all' && filter !== p.q;
      const pitch = key === 'stadium';
      const bgx = pitch
        ? '#4E9B5E; background-image: linear-gradient(90deg, transparent calc(50% - 1px), rgba(255,253,248,0.7) calc(50% - 1px), rgba(255,253,248,0.7) calc(50% + 1px), transparent calc(50% + 1px))'
        : q.bg;
      return {
        isPlace: true,
        isRoom: false,
        isSleep: false,
        isVacant: false,
        name: p.name,
        live: p.live,
        pick: () => this.setState({ sel: key }),
        style:
          'all: unset; grid-column: span ' +
          span +
          '; box-sizing: border-box; border-radius: 10px; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 0 8px; cursor: pointer; font-family: Fredoka, sans-serif; font-size: 13px; font-weight: 600; color: ' +
          q.fg +
          '; background: ' +
          bgx +
          '; border: ' +
          (sel ? '3.5px solid #2A2522; box-shadow: 2px 3px 0 #2A2522' : '2.5px solid #2A2522') +
          '; opacity: ' +
          (dim ? '0.28' : '1') +
          ';' +
          (pitch ? ' color: #FFFDF8;' : ''),
      };
    };
    const room = (num, code) => {
      n += 1;
      const op = dimRooms ? ' opacity: 0.28;' : '';
      if (code === 'M') {
        return {
          isPlace: false,
          isRoom: false,
          isSleep: true,
          isVacant: false,
          num,
          style: base + ' background: #2F3E5C;' + op,
        };
      }
      if (code === 'X') {
        return {
          isPlace: false,
          isRoom: false,
          isSleep: false,
          isVacant: true,
          num,
          style: base + ' background: #D8CFBF;' + op,
        };
      }
      const you = code === 'Y';
      const live = code === 'L';
      const known = code === 'K';
      let d =
        'display: inline-block; flex: none; box-sizing: border-box; border-radius: 50%; width: ' +
        (you ? 16 : 18) +
        'px; height: ' +
        (you ? 16 : 18) +
        'px; background: ' +
        tones[n % 5] +
        ';';
      d += live || you ? ' border: 3px solid #2A2522;' : ' border: 2.5px dashed #2A2522;';
      if (known) d += ' box-shadow: 0 0 0 3px ' + accent + ';';
      const title = you ? 'Amara (you)' : known ? 'Someone you know' : live ? 'Being played' : 'On their own';
      return {
        isPlace: false,
        isRoom: true,
        isSleep: false,
        isVacant: false,
        isYou: you,
        num,
        title,
        dot: d,
        style: base + ' background: ' + (you ? '#FDE3C8' : '#FFFDF8') + ';' + op,
      };
    };
    const cells = [
      place('stadium', 4),
      place('arcade', 3),
      room('9D', 'A'),
      place('council', 2),
      place('court', 2),
      room('7A', 'A'),
      room('7B', 'K'),
      room('7C', 'L'),
      room('7D', 'M'),
      place('lab', 2),
      room('6C', 'X'),
      room('6D', 'A'),
      room('5A', 'M'),
      place('common', 3),
      room('4A', 'K'),
      room('4B', 'A'),
      room('4C', 'Y'),
      room('4D', 'L'),
      place('library', 2),
      room('3C', 'A'),
      room('3D', 'M'),
      place('trading', 2),
      place('gigs', 2),
      place('bank', 2),
      room('1C', 'X'),
      room('1D', 'L'),
      place('lobby', 2),
      place('market', 2),
    ];
    const labels = ['R', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'G'].map((l) => ({ label: l }));
    const s = P[selKey];
    return {
      accent,
      quarters,
      cells,
      labels,
      sel: {
        name: s.full || s.name,
        where: s.floor === 'R' ? 'Rooftop' : s.floor === 'G' ? 'Ground floor' : 'Floor ' + s.floor,
        status: s.status,
        href: s.href || '#',
        noRoute: s.href ? 'false' : 'true',
        goLabel: 'Go to ' + (s.full || s.name),
        goStyle:
          'flex: none; height: 44px; padding: 0 16px; box-sizing: border-box; border-radius: 999px; background: ' +
          accent +
          '; border: 3px solid #2A2522; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; color: #2A2522; text-decoration: none; display: flex; align-items: center;' +
          (s.href
            ? ' box-shadow: 2px 3px 0 #2A2522; cursor: pointer;'
            : ' opacity: 0.4; pointer-events: none;'),
        swatch:
          'width: 30px; height: 30px; flex: none; box-sizing: border-box; border-radius: 9px; border: 2.5px solid #2A2522; background: ' +
          Q[s.q].bg +
          ';',
      },
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
        <header
          style={{
            padding: '12px 20px 6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1
                style={{
                  margin: '0',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '26px',
                  fontWeight: '700',
                  lineHeight: '1.15',
                }}
              >
                Block A
              </h1>

              <span style={{ fontSize: '13px', fontWeight: '600', color: '#5E564D' }}>
                Evening · 38 residents home
              </span>
            </div>
          </div>

          <span
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '15px',
              fontWeight: '600',
              background: '#2F3E5C',
              color: '#FFFDF8',
              border: '3px solid #2A2522',
              borderRadius: '999px',
              padding: '4px 13px',
              boxShadow: '3px 4px 0 #2A2522',
            }}
          >
            7:40 pm
          </span>
        </header>

        <nav
          aria-label="Quarters"
          style={{ display: 'flex', gap: '5px', padding: '4px 20px 6px', overflow: 'hidden' }}
        >
          {vals.quarters.map((q, $index) => (
            <button key={$index} type="button" onClick={q.pick} aria-pressed={q.on} style={css(q.style)}>
              <span style={css(q.swatch)} />
              {q.label}
            </button>
          ))}
        </nav>

        <section
          aria-label="Floors of Block A"
          style={{ position: 'relative', width: '350px', height: '540px', margin: '0 20px', flex: 'none' }}
        >
          <svg
            width="350"
            height="540"
            viewBox="0 0 350 540"
            aria-hidden="true"
            style={{ position: 'absolute', left: '0', top: '0' }}
          >
            <path d="M24 30 V8" stroke="#2A2522" strokeWidth="3" strokeLinecap="round" />

            <path d="M326 30 V8" stroke="#2A2522" strokeWidth="3" strokeLinecap="round" />

            <rect
              x="14"
              y="2"
              width="20"
              height="9"
              rx="2"
              fill="#F2CE6E"
              stroke="#2A2522"
              strokeWidth="2.5"
            />

            <rect
              x="316"
              y="2"
              width="20"
              height="9"
              rx="2"
              fill="#F2CE6E"
              stroke="#2A2522"
              strokeWidth="2.5"
            />

            <rect
              x="150"
              y="14"
              width="50"
              height="18"
              rx="4"
              fill="#D8CFBF"
              stroke="#2A2522"
              strokeWidth="2.5"
            />

            <rect
              x="8"
              y="36"
              width="334"
              height="496"
              rx="8"
              fill="#EFE5D2"
              stroke="#2A2522"
              strokeWidth="4"
            />

            <rect
              x="2"
              y="29"
              width="346"
              height="12"
              rx="4"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="3"
            />

            <rect x="0" y="531" width="350" height="7" rx="3" fill="#2A2522" />

            <path d="M318 531 C318 516 336 516 336 531 Z" fill="#8FC1A9" stroke="#2A2522" strokeWidth="2.5" />

            <path d="M14 531 C14 518 30 518 30 531 Z" fill="#8FC1A9" stroke="#2A2522" strokeWidth="2.5" />
          </svg>{' '}
          <div
            style={{
              position: 'absolute',
              left: '13px',
              top: '46px',
              width: '24px',
              display: 'grid',
              gridAutoRows: '40px',
              rowGap: '4px',
            }}
          >
            {vals.labels.map((l, $index) => (
              <span key={$index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    boxSizing: 'border-box',
                    border: '2px solid #2A2522',
                    borderRadius: '50%',
                    background: '#FFFDF8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '11px',
                    fontWeight: '600',
                  }}
                >
                  {l.label}
                </span>
              </span>
            ))}
          </div>
          <div
            style={{
              position: 'absolute',
              left: '40px',
              top: '46px',
              width: '296px',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gridAutoRows: '40px',
              gap: '4px',
            }}
          >
            {vals.cells.map((c, $index) => (
              <Fragment key={$index}>
                {c.isPlace ? (
                  <button type="button" onClick={c.pick} style={css(c.style)}>
                    <span>{c.name}</span>

                    {c.live ? (
                      <span
                        style={{
                          width: '9px',
                          height: '9px',
                          flex: 'none',
                          borderRadius: '50%',
                          background: '#F2CE6E',
                          border: '1.5px solid #2A2522',
                        }}
                      />
                    ) : null}
                  </button>
                ) : null}

                {c.isRoom ? (
                  <div title={c.title} style={css(c.style)}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '6px',
                        top: '3px',
                        fontSize: '10px',
                        fontWeight: '800',
                        color: '#5E564D',
                      }}
                    >
                      {c.num}
                    </span>

                    <span style={css(c.dot)} />

                    {c.isYou ? (
                      <span
                        style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '12px', fontWeight: '600' }}
                      >
                        You
                      </span>
                    ) : null}
                  </div>
                ) : null}

                {c.isSleep ? (
                  <div title="Asleep" style={css(c.style)}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '6px',
                        top: '3px',
                        fontSize: '10px',
                        fontWeight: '800',
                        color: '#C9D3E6',
                      }}
                    >
                      {c.num}
                    </span>

                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"
                        fill="#F2CE6E"
                        stroke="#2A2522"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : null}

                {c.isVacant ? (
                  <div title="Away" style={css(c.style)}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '6px',
                        top: '3px',
                        fontSize: '10px',
                        fontWeight: '800',
                        color: '#5E564D',
                      }}
                    >
                      {c.num}
                    </span>

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
                      <rect x="5" y="11" width="14" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
        </section>

        <section
          aria-live="polite"
          style={{
            margin: '10px 20px 0',
            border: '3px solid #2A2522',
            borderRadius: '18px',
            background: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '7px 8px 7px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={css(vals.sel.swatch)} />

          <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '16px',
                fontWeight: '600',
                lineHeight: '1.2',
              }}
            >
              {vals.sel.name} · {vals.sel.where}
            </span>

            <span style={{ fontSize: '13px', fontWeight: '600', color: '#4A433B', lineHeight: '1.25' }}>
              {vals.sel.status}
            </span>
          </div>

          <ScreenLink
            href={vals.sel.href}
            aria-label={vals.sel.goLabel}
            aria-disabled={vals.sel.noRoute}
            style={css(vals.sel.goStyle)}
          >
            Go
          </ScreenLink>
        </section>
      </div>
    );
  }
}
