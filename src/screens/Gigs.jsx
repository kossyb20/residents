// My gigs
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Gigs extends Screen {
  static title = 'My gigs';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const view = this.state.view ?? 'now';
    const isNow = view === 'now',
      isDone = view === 'done';
    const G = {
      page: ['M5 3 H15 L19 7 V21 H5 Z M15 3 V7 H19 M8 11 H16 M8 15 H16 M8 18 H12', '#FFFDF8', '#CFE3F4'],
      basket: ['M3 9 H21 L19 20 H5 Z M7 9 L10 4 M17 9 L14 4', '#FDE3C8', '#E3F0DF'],
      board: ['M3 4 H21 V16 H3 Z M7 16 L5 21 M17 16 L19 21 M7 8 H11 M13 10 H17', '#C08A5B', '#FDE3C8'],
      flask: ['M9 3 H15 M10 3 V9 L4 19 Q3 22 6 22 H18 Q21 22 20 19 L14 9 V3', '#9DB8E0', '#CFE3F4'],
      flyer: ['M4 4 H16 V20 H4 Z M16 8 L21 6 V18 L16 16 M7 8 H13 M7 12 H13', '#F2CE6E', '#F7D6D6'],
    };
    const dots = (n) =>
      [1, 2, 3, 4, 5].map((k) => ({
        s:
          'width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid #2A2522; background: ' +
          (k <= n ? '#2E4A3B' : '#FFFDF8') +
          ';',
      }));
    const words = ['', 'weak', 'shaky', 'decent', 'good', 'great'];
    const acted = this.state.acted ?? {};
    const L = [
      {
        k: 'proof',
        g: 'page',
        title: 'Proofread a column',
        poster: 'Kemi',
        pay: 15,
        due: 'Sat',
        skill: 'Writing',
        lvl: 3,
        prog: 40,
        odds: 'Tight',
        oddsBg: '#F2CE6E',
        by: 'you',
      },
      {
        k: 'stock',
        g: 'basket',
        title: 'Count supermarket stock',
        poster: 'Sabi Foods',
        pay: 25,
        due: 'Thu',
        skill: 'Numbers',
        lvl: 4,
        prog: 70,
        odds: 'On track',
        oddsBg: '#8FC1A9',
        by: 'her',
      },
    ];
    const live = L.map((x) => {
      const a = acted[x.k];
      const g = G[x.g];
      const by = a === 'her' ? 'her' : a === 'you' || a === 'take' ? 'you' : x.by;
      return {
        title: x.title,
        poster: x.poster,
        pay: String(x.pay),
        due: x.due,
        skill: x.skill,
        skillWord: words[x.lvl],
        dots: dots(x.lvl),
        glyph: g[0],
        fill: g[1],
        bg: g[2],
        prog: String(x.prog),
        bar:
          'display: block; height: 100%; width: ' +
          x.prog +
          '%; background: #8FC1A9; border-right: 2px solid #2A2522;',
        odds: x.odds,
        oddsStyle:
          'font-size: 12.5px; font-weight: 800; border: 2px solid #2A2522; border-radius: 999px; padding: 1px 9px; background: ' +
          x.oddsBg +
          ';',
        byYou: by === 'you',
        byHer: by === 'her',
        open: !a,
        acted: !!a,
        doLabel: x.by === 'you' ? 'Work on it' : 'Take over',
        actedText:
          a === 'you'
            ? 'You worked on it tonight'
            : a === 'take'
              ? 'You took it over'
              : 'Amara will finish it',
        doIt: () => this.setState({ acted: { ...acted, [x.k]: x.by === 'you' ? 'you' : 'take' } }),
        handOff: () => this.setState({ acted: { ...acted, [x.k]: 'her' } }),
      };
    });
    const O = {
      done: ['Done', '#8FC1A9'],
      part: ['Partly', '#F2CE6E'],
      fail: ['Failed', '#F2B8AE'],
    };
    const past = [
      { g: 'board', title: 'Fix the lobby noticeboard', o: 'done', paid: 20, of: 20, by: 'her' },
      {
        g: 'flask',
        title: 'Tutor Zainab in chemistry',
        o: 'part',
        paid: 8,
        of: 16,
        by: 'you',
        why: 'Ran out of time',
      },
      {
        g: 'flyer',
        title: 'Hand out Ludo Night flyers',
        o: 'fail',
        paid: 0,
        of: 12,
        by: 'her',
        why: 'Rain kept people indoors',
      },
      { g: 'page', title: 'Write a menu for Sabi Foods', o: 'done', paid: 18, of: 18, by: 'you' },
    ].map((p) => {
      const g = G[p.g];
      return {
        title: p.title,
        glyph: g[0],
        fill: g[1],
        bg: g[2],
        outcome: O[p.o][0],
        tagStyle:
          'font-size: 12px; font-weight: 800; border: 2px solid #2A2522; border-radius: 999px; padding: 0 8px; background: ' +
          O[p.o][1] +
          ';',
        paid: '+' + p.paid + ' / ' + p.of,
        payStyle:
          'font-family: Fredoka, sans-serif; font-size: 14px; font-weight: 700; color: ' +
          (p.paid ? '#2E4A3B' : '#8A8075') +
          ';',
        hasWhy: !!p.why,
        why: p.why || '',
        byYou: p.by === 'you',
        byHer: p.by === 'her',
        label:
          p.title +
          ', ' +
          O[p.o][0] +
          ', paid ' +
          p.paid +
          ' of ' +
          p.of +
          ' ZAE' +
          (p.why ? ', ' + p.why : ''),
      };
    });
    const tab = (on) =>
      'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; cursor: pointer;' +
      (on
        ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
        : ' border: 2.5px solid transparent;');
    return {
      accent,
      isNow,
      isDone,
      nowTab: tab(isNow),
      doneTab: tab(isDone),
      showNow: () => this.setState({ view: 'now' }),
      showDone: () => this.setState({ view: 'done' }),
      live,
      past,
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
            href="Work.dc.html"
            aria-label="Back to Work"
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
              fontSize: '26px',
              fontWeight: '700',
              lineHeight: '1.1',
            }}
          >
            My gigs
          </h1>

          <ScreenLink
            href="GigExchange.dc.html"
            aria-label="Find more gigs at the Gig Exchange, floor 2"
            style={{
              height: '46px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '14px',
              background: '#FDE3C8',
              boxShadow: '3px 4px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 10px 0 6px',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="32" height="30" viewBox="0 0 64 58" aria-hidden="true">
              <rect
                x="4"
                y="6"
                width="56"
                height="44"
                rx="5"
                fill="#C08A5B"
                stroke="#2A2522"
                strokeWidth="4"
              />

              <rect
                x="10"
                y="12"
                width="20"
                height="16"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
                transform="rotate(-6 20 20)"
              />

              <rect
                x="34"
                y="12"
                width="20"
                height="14"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="3"
                transform="rotate(5 44 19)"
              />

              <rect
                x="22"
                y="30"
                width="22"
                height="14"
                fill="#CFE3F4"
                stroke="#2A2522"
                strokeWidth="3"
                transform="rotate(-3 33 37)"
              />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}>
              Floor 2
            </span>
          </ScreenLink>
        </header>

        <div
          role="tablist"
          aria-label="Gigs view"
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
            aria-selected={vals.isNow}
            onClick={vals.showNow}
            style={css(vals.nowTab)}
          >
            On the go
            <span
              style={{
                height: '20px',
                minWidth: '20px',
                boxSizing: 'border-box',
                padding: '0 5px',
                border: '2px solid #2A2522',
                borderRadius: '999px',
                background: '#FFFDF8',
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

          <button
            type="button"
            role="tab"
            aria-selected={vals.isDone}
            onClick={vals.showDone}
            style={css(vals.doneTab)}
          >
            Done
          </button>
        </div>

        {/* ON THE GO: full detail per gig */}

        {vals.isNow ? (
          <ul
            aria-label="Gigs on the go"
            style={{
              listStyle: 'none',
              margin: '14px 0 0',
              padding: '0 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {vals.live.map((g, $index) => (
              <li
                key={$index}
                style={{
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '42px',
                      height: '42px',
                      flex: 'none',
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '13px',
                      background: g.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d={g.glyph}
                        fill={g.fill}
                        stroke="#2A2522"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '17px',
                        fontWeight: '600',
                        lineHeight: '1.15',
                      }}
                    >
                      {g.title}
                    </span>

                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#5E564D' }}>
                      for {g.poster}
                    </span>
                  </div>

                  {g.byYou ? (
                    <span
                      role="img"
                      aria-label="You took it"
                      title="You took it"
                      style={{
                        width: '28px',
                        height: '28px',
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
                      <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
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

                  {g.byHer ? (
                    <span
                      role="img"
                      aria-label="She's doing it"
                      title="She's doing it"
                      style={{
                        width: '28px',
                        height: '28px',
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
                      <svg width="18" height="18" viewBox="0 0 40 40" aria-hidden="true">
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

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span
                    aria-label={`Pays ${g.pay} Zael, held in escrow`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontSize: '13px',
                      fontWeight: '800',
                      background: '#E3F0DF',
                      border: '2px solid #2A2522',
                      borderRadius: '999px',
                      padding: '1px 8px',
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
                      <rect
                        x="5"
                        y="11"
                        width="14"
                        height="10"
                        rx="2"
                        fill="#F2CE6E"
                        stroke="#2A2522"
                        strokeWidth="2.6"
                      />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" fill="none" stroke="#2A2522" strokeWidth="2.6" />
                    </svg>

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
                    {g.pay}
                  </span>

                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontSize: '13px',
                      fontWeight: '800',
                      background: '#F7D6D6',
                      border: '2px solid #2A2522',
                      borderRadius: '999px',
                      padding: '1px 8px',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2.6" />
                      <path
                        d="M12 7 v5 l3 2"
                        fill="none"
                        stroke="#2A2522"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    {g.due}
                  </span>

                  <span
                    aria-label={`${g.skill} needed, Amara is ${g.skillWord}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '13px',
                      fontWeight: '800',
                      background: '#F5EFE5',
                      border: '2px solid #2A2522',
                      borderRadius: '999px',
                      padding: '1px 8px',
                    }}
                  >
                    {g.skill}
                    {g.dots.map((d, $index) => (
                      <span key={$index} style={css(d.s)} />
                    ))}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    role="img"
                    aria-label={`${g.prog} percent done`}
                    style={{
                      flex: '1',
                      height: '16px',
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '999px',
                      background: '#F5EFE5',
                      overflow: 'hidden',
                    }}
                  >
                    <span style={css(g.bar)} />
                  </div>

                  <span style={css(g.oddsStyle)}>{g.odds}</span>
                </div>

                {g.open ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={g.doIt}
                      style={{
                        all: 'unset',
                        flex: '1',
                        height: '44px',
                        boxSizing: 'border-box',
                        borderRadius: '999px',
                        background: vals.accent,
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
                      {g.doLabel}
                    </button>

                    {g.byYou ? (
                      <button
                        type="button"
                        onClick={g.handOff}
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
                    ) : null}
                  </div>
                ) : null}

                {g.acted ? (
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#2E4A3B',
                    }}
                  >
                    {g.actedText}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        {/* DONE: outcomes with a reason */}

        {vals.isDone ? (
          <ul
            aria-label="Finished gigs"
            style={{
              listStyle: 'none',
              margin: '14px 0 0',
              padding: '0 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {vals.past.map((p, $index) => (
              <li
                key={$index}
                aria-label={p.label}
                style={{
                  boxSizing: 'border-box',
                  border: '3px solid #2A2522',
                  borderRadius: '18px',
                  background: '#FFFDF8',
                  boxShadow: '3px 4px 0 #2A2522',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    position: 'relative',
                    width: '38px',
                    height: '38px',
                    flex: 'none',
                    boxSizing: 'border-box',
                    border: '2.5px solid #2A2522',
                    borderRadius: '12px',
                    background: p.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d={p.glyph}
                      fill={p.fill}
                      stroke="#2A2522"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {p.byYou ? (
                    <span
                      title="You did it"
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

                  {p.byHer ? (
                    <span
                      title="She did it"
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
                        <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                      </svg>
                    </span>
                  ) : null}
                </span>

                <div
                  style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '3px' }}
                >
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '15.5px',
                      fontWeight: '600',
                      lineHeight: '1.15',
                    }}
                  >
                    {p.title}
                  </span>

                  {p.hasWhy ? (
                    <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#5E564D' }}>{p.why}</span>
                  ) : null}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
                  <span style={css(p.tagStyle)}>{p.outcome}</span>

                  <span style={css(p.payStyle)}>{p.paid}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}
