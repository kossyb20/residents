// Trading floor
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class TradingFloor extends Screen {
  static title = 'Trading floor';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const view = this.state.view ?? 'ex';
    const filter = this.state.filter ?? 'all';
    const sel = this.state.sel ?? 6;
    const qty = this.state.qty ?? 2;
    const pick = this.state.pick ?? { i: 0, side: 'YES' };
    const stake = this.state.stake ?? 10;
    const done = this.state.done ?? null;
    const isEx = view === 'ex',
      isPr = view === 'pr';

    const G = {
      mine: 'M3 20 L12 7 L21 20 Z',
      bolt: 'M13 2 L5 13 H11 L9 22 L19 10 H13 Z',
      flask: 'M9 3 H15 M10 3 V9 L4 19 Q3 22 6 22 H18 Q21 22 20 19 L14 9 V3',
      food: 'M3 11 H21 A9 9 0 0 1 3 11 Z M9 7 Q8 5 10 3 M14 7 Q13 5 15 3',
      football: 'M12 3 A9 9 0 1 0 12.01 3 Z M12 8 L16 11 L14.5 15.5 H9.5 L8 11 Z',
      basket: 'M12 3 A9 9 0 1 0 12.01 3 Z M3 12 H21 M12 3 V21',
      cricket: 'M4 20 L14 10 L17 7 L19 9 L16 12 L6 22 Z M19 18 A2.5 2.5 0 1 0 19.01 18 Z',
      tennis: 'M12 3 A9 9 0 1 0 12.01 3 Z M5 6 Q10 12 5 18 M19 6 Q14 12 19 18',
      civic: 'M3 9 L12 3 L21 9 Z M5 11 V18 M10 11 V18 M14 11 V18 M19 11 V18 M3 21 H21',
      coin: 'M12 3 A9 9 0 1 0 12.01 3 Z M12 7 V17 M9 9 H15',
    };
    const book = [
      {
        code: 'NDM',
        name: 'Ndura Mining',
        type: 'co',
        g: 'mine',
        fill: '#8E4129',
        bg: '#EFE4CF',
        price: 48,
        chg: 6,
      },
      {
        code: 'BLP',
        name: 'Brightline Power',
        type: 'co',
        g: 'bolt',
        fill: '#E8B53A',
        bg: '#FDE3C8',
        price: 31,
        chg: -2,
      },
      {
        code: 'KRL',
        name: 'Kora Labs',
        type: 'co',
        g: 'flask',
        fill: '#9DB8E0',
        bg: '#CFE3F4',
        price: 66,
        chg: 3,
      },
      {
        code: 'SBF',
        name: 'Sabi Foods',
        type: 'co',
        g: 'food',
        fill: '#E59A6B',
        bg: '#F7D6D6',
        price: 19,
        chg: -1,
      },
      {
        code: 'LIO',
        name: 'Block A Lions',
        type: 'tm',
        g: 'football',
        fill: '#FFFDF8',
        bg: '#E3F0DF',
        price: 14,
        chg: 9,
      },
      {
        code: 'HWK',
        name: 'Riverside Hawks',
        type: 'tm',
        g: 'basket',
        fill: '#E59A6B',
        bg: '#CFE3F4',
        price: 22,
        chg: 1,
      },
      {
        code: 'HBK',
        name: 'Harbour Kings',
        type: 'tm',
        g: 'cricket',
        fill: '#E8B53A',
        bg: '#FDE3C8',
        price: 17,
        chg: -4,
      },
      {
        code: 'ACE',
        name: 'Hilltop Aces',
        type: 'tm',
        g: 'tennis',
        fill: '#C9D96A',
        bg: '#E3F0DF',
        price: 11,
        chg: 2,
      },
    ];
    const reset = { done: null };
    const rows = book
      .map((s, i) => ({ s, i }))
      .filter((x) => filter === 'all' || x.s.type === filter)
      .map(({ s, i }) => {
        const on = i === sel;
        return {
          code: s.code,
          name: s.name,
          price: String(s.price),
          chg: (s.chg >= 0 ? '▲' : '▼') + Math.abs(s.chg) + '%',
          glyph: G[s.g],
          fill: s.fill,
          bg: s.bg,
          label:
            s.name +
            ', ' +
            s.price +
            ' ZAE, ' +
            (s.chg >= 0 ? 'up ' : 'down ') +
            Math.abs(s.chg) +
            ' percent',
          chgStyle:
            'width: 44px; text-align: right; font-size: 12.5px; font-weight: 800; color: ' +
            (s.chg >= 0 ? '#8FC1A9' : '#E59A6B') +
            ';',
          style:
            'all: unset; box-sizing: border-box; height: 38px; border-radius: 11px; display: flex; align-items: center; gap: 8px; padding: 0 8px; cursor: pointer;' +
            (on ? ' background: #4A3F38; box-shadow: inset 4px 0 0 ' + accent + ';' : ''),
          go: () => this.setState({ sel: i, qty: 1, ...reset }),
        };
      });
    const filters = [
      ['all', 'All'],
      ['co', 'Companies'],
      ['tm', 'Teams'],
    ].map(([k, t]) => ({
      t,
      on: filter === k,
      style:
        'all: unset; height: 26px; padding: 0 11px; border-radius: 999px; font-family: Fredoka, sans-serif; font-size: 13px; font-weight: 600; cursor: pointer;' +
        (filter === k
          ? ' background: ' + accent + '; color: #2A2522; border: 2px solid ' + accent + ';'
          : ' color: #F5EFE5; border: 2px solid #6E645A;'),
      go: () => this.setState({ filter: k }),
    }));

    const questions = [
      {
        q: 'Lions beat the Hawks on Saturday?',
        g: 'football',
        fill: '#FFFDF8',
        bg: '#E3F0DF',
        yes: 62,
        closes: 'Sat',
      },
      {
        q: 'Council passes the rent cap?',
        g: 'civic',
        fill: '#FFFDF8',
        bg: '#EFE4CF',
        yes: 41,
        closes: 'Thu',
      },
      {
        q: 'Kora Labs finds a new principle this month?',
        g: 'flask',
        fill: '#9DB8E0',
        bg: '#CFE3F4',
        yes: 23,
        closes: '30th',
      },
      {
        q: 'Bank raises its rate this week?',
        g: 'coin',
        fill: '#E8B53A',
        bg: '#FDE3C8',
        yes: 55,
        closes: 'Fri',
      },
    ];
    const sideBtn = (on, yesSide) =>
      'all: unset; flex: 1; height: 38px; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; border: 2.5px solid #2A2522; color: ' +
      (yesSide ? '#2E4A3B' : '#8E4129') +
      '; background: ' +
      (on ? (yesSide ? '#8FC1A9' : '#F2B8AE') : '#FFFDF8') +
      ';' +
      (on ? ' box-shadow: 2px 3px 0 #2A2522;' : '');
    const qs = questions.map((x, i) => {
      const yesOn = pick.i === i && pick.side === 'YES',
        noOn = pick.i === i && pick.side === 'NO';
      return {
        q: x.q,
        glyph: G[x.g],
        fill: x.fill,
        bg: x.bg,
        closes: x.closes,
        yes: String(x.yes),
        no: String(100 - x.yes),
        yesOn,
        noOn,
        yesStyle: sideBtn(yesOn, true),
        noStyle: sideBtn(noOn, false),
        card:
          'box-sizing: border-box; border: 3px solid #2A2522; border-radius: 18px; background: #FFFDF8; box-shadow: 3px 4px 0 #2A2522; padding: 10px 12px; display: flex; flex-direction: column; gap: 9px;' +
          (pick.i === i ? ' outline: 3px solid ' + accent + '; outline-offset: 2px;' : ''),
        yesGo: () => this.setState({ pick: { i, side: 'YES' }, ...reset }),
        noGo: () => this.setState({ pick: { i, side: 'NO' }, ...reset }),
      };
    });

    let t,
      doneText = '',
      herLine = '';
    if (isEx) {
      const s = book[sel];
      t = {
        isStock: true,
        isPred: false,
        title: s.name,
        sub: s.code + ' · ' + s.price + ' ZAE',
        glyph: G[s.g],
        fill: s.fill,
        bg: s.bg,
        amt: String(qty),
        costLabel: '',
        cost: String(qty * s.price),
        a1: 'Buy',
      };
      if (done === 'buy') doneText = 'You bought ' + qty + ' ' + s.code;
      if (done === 'sell') doneText = 'You sold ' + qty + ' ' + s.code;
      if (done === 'her') {
        doneText = 'Amara bought 1 ' + s.code;
        herLine = 'just one, to be safe';
      }
    } else {
      const x = questions[pick.i];
      const p = (pick.side === 'YES' ? x.yes : 100 - x.yes) / 100;
      t = {
        isStock: false,
        isPred: true,
        title: x.q,
        sub: 'closes ' + x.closes,
        glyph: G[x.g],
        fill: x.fill,
        bg: x.bg,
        side: pick.side,
        sideStyle:
          'flex: none; font-family: Fredoka, sans-serif; font-size: 14px; font-weight: 700; border: 2.5px solid #2A2522; border-radius: 999px; padding: 2px 10px; color: ' +
          (pick.side === 'YES' ? '#2E4A3B' : '#8E4129') +
          '; background: ' +
          (pick.side === 'YES' ? '#8FC1A9' : '#F2B8AE') +
          ';',
        amt: String(stake),
        costLabel: 'pays',
        cost: String(Math.round(stake / p)),
        a1: 'Place',
      };
      if (done === 'buy') doneText = 'You put ' + stake + ' ZAE on ' + pick.side;
      if (done === 'her') {
        const herSide = x.yes >= 50 ? 'YES' : 'NO';
        doneText = 'Amara put 5 ZAE on ' + herSide;
        herLine = herSide === pick.side ? 'felt right to me' : 'I went the other way';
      }
    }
    const news = [
      ['Lions up 9% after derby win', true],
      ['Ndura finds a new seam', true],
      ['Harbour Kings lose captain', false],
      ['Rent cap vote on Thursday', null],
      ['Brightline fined by council', false],
      ['Kora Labs hiring', true],
      ['Bank rate decision Friday', null],
      ['Aces into the semis', true],
    ];
    const dot = (u) =>
      'width: 9px; height: 9px; border-radius: 50%; flex: none; background: ' +
      (u === true ? '#8FC1A9' : u === false ? '#E59A6B' : '#F2CE6E') +
      ';';
    const n1 = news.map(([t2, u]) => ({ t: t2, dot: dot(u) }));
    const tab = (on) =>
      'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; cursor: pointer;' +
      (on
        ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
        : ' border: 2.5px solid transparent;');

    return {
      accent,
      isEx,
      isPr,
      exTab: tab(isEx),
      prTab: tab(isPr),
      showEx: () => this.setState({ view: 'ex', done: null }),
      showPr: () => this.setState({ view: 'pr', done: null }),
      news2: n1.concat(n1),
      filters,
      rows,
      qs,
      t,
      open: !done,
      done: !!done,
      doneText,
      herLine,
      byYou: done === 'buy' || done === 'sell',
      byHer: done === 'her',
      less: () =>
        isEx
          ? this.setState({ qty: Math.max(1, qty - 1) })
          : this.setState({ stake: Math.max(5, stake - 5) }),
      more: () => (isEx ? this.setState({ qty: qty + 1 }) : this.setState({ stake: stake + 5 })),
      act1: () => this.setState({ done: 'buy' }),
      act2: () => this.setState({ done: 'sell' }),
      handOff: () => this.setState({ done: 'her' }),
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
              Trading floor
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>Floor 2</span>
          </div>

          <div
            role="img"
            aria-label="14 residents on the floor now"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <svg width="78" height="38" viewBox="0 0 78 38" aria-hidden="true">
              <g>
                <rect
                  x="2"
                  y="3"
                  width="32"
                  height="32"
                  rx="11"
                  fill="#CFE3F4"
                  stroke="#2A2522"
                  strokeWidth="2.5"
                />
                <circle cx="18" cy="21" r="9" fill="#5A3520" stroke="#2A2522" strokeWidth="2" />
                <path
                  d="M9 19 C9 12 13 10 18 10 C23 10 27 12 27 19 C25 15 22 14 18 14 C14 14 11 15 9 19 Z"
                  fill="#2A2522"
                />
              </g>

              <g>
                <rect
                  x="22"
                  y="3"
                  width="32"
                  height="32"
                  rx="11"
                  fill="#F7D6D6"
                  stroke="#2A2522"
                  strokeWidth="2.5"
                />
                <circle cx="38" cy="21" r="9" fill="#A8714A" stroke="#2A2522" strokeWidth="2" />
                <path
                  d="M28 18 C28 10 33 8 38 8 C43 8 48 10 48 18 C45 14 42 13 38 13 C34 13 31 14 28 18 Z"
                  fill="#C8553D"
                  stroke="#2A2522"
                  strokeWidth="1.8"
                />
              </g>

              <g>
                <rect
                  x="42"
                  y="3"
                  width="32"
                  height="32"
                  rx="11"
                  fill="#E3F0DF"
                  stroke="#2A2522"
                  strokeWidth="2.5"
                />
                <circle cx="51" cy="11" r="4" fill="#2A2522" />
                <circle cx="65" cy="11" r="4" fill="#2A2522" />
                <circle cx="58" cy="21" r="9" fill="#8B5A3C" stroke="#2A2522" strokeWidth="2" />
              </g>
            </svg>

            <span
              style={{
                marginLeft: '-6px',
                height: '24px',
                minWidth: '24px',
                boxSizing: 'border-box',
                padding: '0 6px',
                border: '2.5px solid #2A2522',
                borderRadius: '999px',
                background: '#FFFDF8',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              14
            </span>
          </div>
        </header>

        <div
          aria-label="Market news"
          style={{
            margin: '4px 20px 0',
            height: '36px',
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
          <span
            style={{
              flex: 'none',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
              background: '#C8553D',
              borderRight: '3px solid #2A2522',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '12px',
              fontWeight: '700',
              color: '#FFFDF8',
              letterSpacing: '.05em',
              position: 'relative',
              zIndex: '1',
            }}
          >
            NEWS
          </span>

          <div style={{ flex: '1', overflow: 'hidden' }}>
            <div
              className="tf-crawl"
              style={{
                display: 'flex',
                width: 'max-content',
                animation: 'tf-crawl 26s linear infinite',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '14px',
                fontWeight: '500',
                color: '#F5EFE5',
                whiteSpace: 'nowrap',
              }}
            >
              {vals.news2.map((n, $index) => (
                <span
                  key={$index}
                  style={{ padding: '0 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span style={css(n.dot)} />
                  {n.t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Floor view"
          style={{
            margin: '12px 20px 0',
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
            aria-selected={vals.isEx}
            onClick={vals.showEx}
            style={css(vals.exTab)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="13" width="4" height="8" fill="#8FC1A9" stroke="#2A2522" strokeWidth="2" />
              <rect x="10" y="9" width="4" height="12" fill="#8FC1A9" stroke="#2A2522" strokeWidth="2" />
              <rect x="17" y="4" width="4" height="17" fill="#8FC1A9" stroke="#2A2522" strokeWidth="2" />
            </svg>
            Exchange
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={vals.isPr}
            onClick={vals.showPr}
            style={css(vals.prTab)}
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
          </button>
        </div>

        {/* EXCHANGE: the price board */}

        {vals.isEx ? (
          <section
            aria-label="Price board"
            style={{
              margin: '14px 20px 0',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#2A2522',
              boxShadow: '4px 5px 0 #8E4129',
              padding: '10px 8px 8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', gap: '6px', padding: '0 4px 2px' }}>
              {vals.filters.map((f, $index) => (
                <button key={$index} type="button" onClick={f.go} aria-pressed={f.on} style={css(f.style)}>
                  {f.t}
                </button>
              ))}
            </div>

            {vals.rows.map((r, $index) => (
              <button key={$index} type="button" onClick={r.go} aria-label={r.label} style={css(r.style)}>
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    flex: 'none',
                    boxSizing: 'border-box',
                    border: '2px solid #F5EFE5',
                    borderRadius: '9px',
                    background: r.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d={r.glyph}
                      fill={r.fill}
                      stroke="#2A2522"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span
                  style={{
                    width: '40px',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#F2CE6E',
                    letterSpacing: '.03em',
                  }}
                >
                  {r.code}
                </span>

                <span
                  style={{
                    flex: '1',
                    minWidth: '0',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    color: '#CFC6B8',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {r.name}
                </span>

                <span
                  style={{
                    width: '38px',
                    textAlign: 'right',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#FFFDF8',
                  }}
                >
                  {r.price}
                </span>

                <span style={css(r.chgStyle)}>{r.chg}</span>
              </button>
            ))}
          </section>
        ) : null}

        {/* PREDICTIONS: open questions */}

        {vals.isPr ? (
          <ul
            aria-label="Open questions"
            style={{
              listStyle: 'none',
              margin: '14px 0 0',
              padding: '0 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {vals.qs.map((q, $index) => (
              <li key={$index} style={css(q.card)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '34px',
                      height: '34px',
                      flex: 'none',
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '11px',
                      background: q.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d={q.glyph}
                        fill={q.fill}
                        stroke="#2A2522"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <span
                    style={{
                      flex: '1',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '15.5px',
                      fontWeight: '600',
                      lineHeight: '1.2',
                    }}
                  >
                    {q.q}
                  </span>

                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontSize: '12px',
                      fontWeight: '800',
                      color: '#5E564D',
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
                    {q.closes}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" onClick={q.yesGo} aria-pressed={q.yesOn} style={css(q.yesStyle)}>
                    YES
                    <span style={{ fontWeight: '600' }}>{q.yes}%</span>
                  </button>

                  <button type="button" onClick={q.noGo} aria-pressed={q.noOn} style={css(q.noStyle)}>
                    NO
                    <span style={{ fontWeight: '600' }}>{q.no}%</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        <div style={{ flex: '1' }} />

        {/* Trade card: Decide or Hand Off */}

        <section
          aria-label="Trade"
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
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '40px',
                height: '40px',
                flex: 'none',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '12px',
                background: vals.t.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d={vals.t.glyph}
                  fill={vals.t.fill}
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
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {vals.t.title}
              </span>

              <span style={{ fontSize: '13px', fontWeight: '700', color: '#5E564D' }}>{vals.t.sub}</span>
            </div>

            {vals.t.isPred ? <span style={css(vals.t.sideStyle)}>{vals.t.side}</span> : null}
          </div>

          {vals.open ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2.5px solid #2A2522',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    height: '38px',
                    boxSizing: 'border-box',
                  }}
                >
                  <button
                    type="button"
                    aria-label="Less"
                    onClick={vals.less}
                    style={{
                      all: 'unset',
                      width: '38px',
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
                      minWidth: '54px',
                      textAlign: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '18px',
                      fontWeight: '700',
                    }}
                  >
                    {vals.t.amt}
                  </span>

                  <button
                    type="button"
                    aria-label="More"
                    onClick={vals.more}
                    style={{
                      all: 'unset',
                      width: '38px',
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

                <span
                  style={{
                    flex: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '4px',
                    fontSize: '14px',
                    fontWeight: '800',
                    color: '#4A433B',
                  }}
                >
                  {vals.t.costLabel}
                  <svg width="10" height="14" viewBox="0 0 30 40" aria-hidden="true">
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

                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#2A2522',
                    }}
                  >
                    {vals.t.cost}
                  </span>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={vals.act1}
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
                  {vals.t.a1}
                </button>

                {vals.t.isStock ? (
                  <button
                    type="button"
                    onClick={vals.act2}
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
                    Sell
                  </button>
                ) : null}

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
