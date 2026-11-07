// Ludo table
import { Fragment } from 'react';
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Ludo extends Screen {
  static title = 'Ludo';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const S = 336 / 15;
    const ctrl = this.state.ctrl ?? 'her';
    const rolled = this.state.rolled ?? null;
    const moved = this.state.moved ?? false;
    const mine = this.state.mine ?? [8, 20, -1, -1];

    // 52-square track, clockwise from red's start
    const T = [];
    const run = (pts) => pts.forEach((p) => T.push(p));
    run([
      [1, 6],
      [2, 6],
      [3, 6],
      [4, 6],
      [5, 6],
    ]);
    run([
      [6, 5],
      [6, 4],
      [6, 3],
      [6, 2],
      [6, 1],
      [6, 0],
    ]);
    run([
      [7, 0],
      [8, 0],
    ]);
    run([
      [8, 1],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 5],
    ]);
    run([
      [9, 6],
      [10, 6],
      [11, 6],
      [12, 6],
      [13, 6],
      [14, 6],
    ]);
    run([
      [14, 7],
      [14, 8],
    ]);
    run([
      [13, 8],
      [12, 8],
      [11, 8],
      [10, 8],
      [9, 8],
    ]);
    run([
      [8, 9],
      [8, 10],
      [8, 11],
      [8, 12],
      [8, 13],
      [8, 14],
    ]);
    run([
      [7, 14],
      [6, 14],
    ]);
    run([
      [6, 13],
      [6, 12],
      [6, 11],
      [6, 10],
      [6, 9],
    ]);
    run([
      [5, 8],
      [4, 8],
      [3, 8],
      [2, 8],
      [1, 8],
      [0, 8],
    ]);
    run([
      [0, 7],
      [0, 6],
    ]);

    const P = [
      {
        key: 'y',
        name: 'Amara',
        you: true,
        col: '#E8B53A',
        light: '#F2CE6E',
        start: 26,
        lane: (i) => [14 - i, 7],
        yard: [9, 9],
      },
      {
        key: 'b',
        name: 'Zainab',
        col: '#2F3E5C',
        light: '#9DB8E0',
        start: 39,
        lane: (i) => [7, 14 - i],
        yard: [0, 9],
      },
      {
        key: 'r',
        name: 'Kemi',
        col: '#C8553D',
        light: '#F2B8AE',
        start: 0,
        lane: (i) => [i, 7],
        yard: [0, 0],
      },
      {
        key: 'g',
        name: 'Chidi',
        col: '#4E9B5E',
        light: '#BFE0C2',
        start: 13,
        lane: (i) => [7, i],
        yard: [9, 0],
      },
    ];
    const prog = { y: mine, b: [5, 22, 47, -1], r: [30, 12, -1, 56], g: [40, -1, -1, -1] };

    // board squares
    const cells = [];
    const sq = (x, y, fill) =>
      cells.push({
        s:
          'position: absolute; left: ' +
          x * S +
          'px; top: ' +
          y * S +
          'px; width: ' +
          S +
          'px; height: ' +
          S +
          'px; box-sizing: border-box; border: 1.2px solid #2A2522; background: ' +
          fill +
          ';',
      });
    T.forEach(([x, y], i) => {
      const owner = P.find((p) => p.start === i);
      sq(x, y, owner ? owner.light : '#FFFDF8');
    });
    P.forEach((p) => {
      for (let i = 1; i <= 5; i++) {
        const [x, y] = p.lane(i);
        sq(x, y, p.light);
      }
    });

    // sponsor panels in the white yard of each home corner (placeholder in-world brands)
    const AD = [
      {
        yard: [0, 0],
        name: 'Sabi Foods',
        fill: '#E59A6B',
        glyph: 'M3 11 H21 A9 9 0 0 1 3 11 Z M9 7 Q8 5 10 3 M14 7 Q13 5 15 3',
      },
      {
        yard: [9, 0],
        name: 'Kora Labs',
        fill: '#9DB8E0',
        glyph: 'M9 3 H15 M10 3 V9 L4 19 Q3 22 6 22 H18 Q21 22 20 19 L14 9 V3',
      },
      { yard: [9, 9], name: 'Brightline', fill: '#F2CE6E', glyph: 'M13 2 L5 13 H11 L9 22 L19 10 H13 Z' },
      { yard: [0, 9], name: 'Ndura Mining', fill: '#C08A5B', glyph: 'M3 20 L12 7 L21 20 Z' },
    ];
    const ads = AD.map((a) => ({
      brand: 'Sponsored by ' + a.name,
      name: a.name,
      glyph: a.glyph,
      fill: a.fill,
      s:
        'position: absolute; left: ' +
        (a.yard[0] + 1) * S +
        'px; top: ' +
        (a.yard[1] + 1) * S +
        'px; width: ' +
        4 * S +
        'px; height: ' +
        4 * S +
        'px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; color: #2A2522;',
    }));

    // where a piece sits
    const at = (p, n, slot) => {
      if (n < 0) {
        const ox = slot % 2 ? 3.95 : 1.05,
          oy = slot < 2 ? 1.05 : 3.95;
        return [p.yard[0] + ox + 0.5, p.yard[1] + oy + 0.5];
      }
      if (n >= 56) return [7.5 + (slot % 2 ? 0.35 : -0.35), 7.5 + (slot < 2 ? -0.35 : 0.35)];
      if (n > 50) {
        const [x, y] = p.lane(n - 50);
        return [x + 0.5, y + 0.5];
      }
      const [x, y] = T[(p.start + n) % 52];
      return [x + 0.5, y + 0.5];
    };
    const yourTurn = ctrl === 'you' && rolled && !moved;
    const canMove = (n) => rolled && ((n < 0 && rolled === 6) || (n >= 0 && n < 56 && n + rolled <= 56));
    const movable = yourTurn ? mine.map((n, i) => (canMove(n) ? i : -1)).filter((i) => i >= 0) : [];
    const pieces = [];
    P.forEach((p) => {
      prog[p.key].forEach((n, slot) => {
        const [cx, cy] = at(p, n, slot);
        const r = n >= 56 ? 6 : 8;
        const can = p.you && movable.includes(slot);
        pieces.push({
          can,
          still: !can,
          label: 'Move piece ' + (slot + 1),
          s:
            (can ? 'all: unset; cursor: pointer; animation: ludo-glow 1.2s ease-in-out infinite; ' : '') +
            'position: absolute; left: ' +
            (cx * S - r) +
            'px; top: ' +
            (cy * S - r) +
            'px; width: ' +
            2 * r +
            'px; height: ' +
            2 * r +
            'px; box-sizing: border-box; border-radius: 50%; border: 2.5px solid #2A2522; background: ' +
            p.col +
            ';' +
            (can ? '' : ' box-shadow: 1px 2px 0 #2A2522;'),
          go: () => {
            const next = mine.slice();
            next[slot] = n < 0 ? 0 : Math.min(56, n + rolled);
            this.setState({ mine: next, moved: true });
          },
        });
      });
    });

    const players = P.map((p, i) => {
      const home = prog[p.key].filter((n) => n >= 56).length;
      const turn = moved ? i === 1 : i === 0;
      return {
        name: p.name,
        home: String(home),
        label: p.name + ', ' + home + ' of 4 pieces home' + (turn ? ', their turn' : ''),
        fg: p.key === 'y' ? '#2A2522' : '#FFFDF8',
        dot: turn
          ? 'width: 12px; height: 12px; border-radius: 50%; border: 2px solid #2A2522; background: #FFFDF8;'
          : 'display: none;',
        style:
          'box-sizing: border-box; height: 50px; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; background: ' +
          p.col +
          ';' +
          (turn
            ? ' border: 3px solid #2A2522; box-shadow: 3px 4px 0 #2A2522; transform: translateY(-2px);'
            : ' border: 2.5px solid #2A2522; opacity: 0.8;'),
      };
    });

    const face = ctrl === 'her' ? 4 : rolled || 0;
    const PIPS = {
      1: [[2, 2]],
      2: [
        [1, 1],
        [3, 3],
      ],
      3: [
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      4: [
        [1, 1],
        [3, 1],
        [1, 3],
        [3, 3],
      ],
      5: [
        [1, 1],
        [3, 1],
        [2, 2],
        [1, 3],
        [3, 3],
      ],
      6: [
        [1, 1],
        [3, 1],
        [1, 2],
        [3, 2],
        [1, 3],
        [3, 3],
      ],
    };
    const pips = (PIPS[face] || []).map(([x, y]) => ({
      s:
        'position: absolute; left: ' +
        (x * 13 - 4.5) +
        'px; top: ' +
        (y * 13 - 4.5) +
        'px; width: 9px; height: 9px; border-radius: 50%; background: #2A2522;',
    }));

    let status;
    if (ctrl === 'her') status = "She's playing · rolled 4";
    else if (!rolled) status = 'Your roll';
    else if (moved) status = "Zainab's turn";
    else if (!movable.length) status = 'Rolled ' + rolled + ' · no move';
    else status = 'Rolled ' + rolled + ' · pick a piece';

    // Viewer: 'player' (Amara's seat) or 'watcher' (another resident)
    const ROLE = this.state.role ?? 'player';
    const isWatcher = ROLE === 'watcher';

    // Comments: free text from real players only; votes up and down shown apart
    const extra = this.state.extra ?? [];
    const votes = this.state.votes ?? {};
    const base = [
      {
        id: 'c1',
        name: 'Tunde',
        tone: '#5A3520',
        text: 'She always keeps two at home. Too careful',
        up: 3,
        down: 1,
      },
      {
        id: 'c2',
        name: 'Ifeoma',
        tone: '#A8714A',
        text: 'Zainab is one roll from cutting her',
        up: 5,
        down: 0,
      },
      { id: 'c3', name: 'Musa', tone: '#8B5A3C', text: 'Six is coming, I can feel it', up: 1, down: 0 },
    ];
    const all = base.concat(extra).slice(-3);
    const comments = all.map((c) => {
      const v = votes[c.id];
      const up = c.up + (v === 'up' ? 1 : 0),
        down = c.down + (v === 'down' ? 1 : 0);
      const vs = (on) =>
        'all: unset; cursor: pointer; padding: 0 4px; border-radius: 6px;' +
        (on ? ' background: ' + accent + ';' : '');
      return {
        name: c.name,
        text: c.text,
        up: String(up),
        down: String(down),
        face:
          'width: 22px; height: 22px; flex: none; box-sizing: border-box; border-radius: 50%; border: 2px solid #2A2522; background: ' +
          c.tone +
          '; margin-top: 1px;',
        upStyle: vs(v === 'up'),
        downStyle: vs(v === 'down'),
        voteUp: () => this.setState({ votes: { ...votes, [c.id]: v === 'up' ? null : 'up' } }),
        voteDown: () => this.setState({ votes: { ...votes, [c.id]: v === 'down' ? null : 'down' } }),
      };
    });
    const draft = this.state.draft ?? '';
    const rx = this.state.rx ?? {};
    const R = [
      {
        k: 'clap',
        label: 'Clap',
        n: 6,
        fill: '#F2CE6E',
        glyph:
          'M7 13 L4 10 A1.5 1.5 0 0 1 6 8 L10 12 M8 9 L6 7 A1.5 1.5 0 0 1 8 5 L12 9 M10 6 A1.5 1.5 0 0 1 12 4 L17 9 C20 12 20 17 16 20 C13 22 9 21 7 19 L3 15 A1.5 1.5 0 0 1 5 13 L7 15',
      },
      {
        k: 'wow',
        label: 'Wow',
        n: 2,
        fill: '#F2CE6E',
        glyph: 'M12 3 A9 9 0 1 0 12.01 3 Z M9 9 V10 M15 9 V10 M12 13 A2 2.5 0 1 0 12.01 13 Z',
      },
      {
        k: 'laugh',
        label: 'Laugh',
        n: 4,
        fill: '#F2CE6E',
        glyph:
          'M12 3 A9 9 0 1 0 12.01 3 Z M8 9 Q9 8 10 9 M14 9 Q15 8 16 9 M7 13 H17 Q16 18 12 18 Q8 18 7 13 Z',
      },
    ];
    const reacts = R.map((r) => {
      const on = !!rx[r.k];
      return {
        label: r.label + ', ' + (r.n + (on ? 1 : 0)),
        glyph: r.glyph,
        fill: r.fill,
        n: String(r.n + (on ? 1 : 0)),
        style:
          'all: unset; height: 36px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 999px; padding: 0 6px; display: flex; align-items: center; gap: 2px; cursor: pointer; background: ' +
          (on ? accent : '#FFFDF8') +
          ';',
        go: () => this.setState({ rx: { ...rx, [r.k]: !on } }),
      };
    });

    const mtab = (on) =>
      'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 14px; font-weight: 600; cursor: pointer;' +
      (on ? ' background: ' + accent + '; border: 2px solid #2A2522;' : ' border: 2px solid transparent;');
    return {
      isWatcher,
      isPlayer: !isWatcher,
      playerTab: mtab(!isWatcher),
      watcherTab: mtab(isWatcher),
      asPlayer: () => this.setState({ role: 'player' }),
      asWatcher: () => this.setState({ role: 'watcher' }),
      watchCount: String(14 + (isWatcher ? 1 : 0)),
      comments,
      reacts,
      draft,
      typing: (e) => this.setState({ draft: e.target.value }),
      send: () => {
        if (draft.trim())
          this.setState({
            extra: extra.concat([
              {
                id: 'x' + extra.length,
                name: isWatcher ? 'You' : 'Amara',
                tone: '#7A4A2E',
                text: draft.trim(),
                up: 0,
                down: 0,
              },
            ]),
            draft: '',
          });
      },
      accent,
      cells,
      ads,
      pieces,
      players,
      pips,
      diceBg: ctrl === 'her' ? '#EFE4CF' : '#FFFDF8',
      diceLabel: face ? 'Dice shows ' + face : 'Dice not rolled',
      isHer: ctrl === 'her',
      isYou: ctrl === 'you',
      status,
      canRoll: ctrl === 'you' && !rolled,
      noMove: ctrl === 'you' && !!rolled && !moved && !movable.length,
      roll: () => this.setState({ rolled: 1 + Math.floor(Math.random() * 6) }),
      pass: () => this.setState({ moved: true }),
      swapLabel: ctrl === 'her' ? 'Take over' : 'Hand Off',
      swapStyle:
        'all: unset; flex: 1; height: 42px; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; ' +
        (ctrl === 'her'
          ? 'background: ' + accent + '; border: 3px solid #2A2522;'
          : 'background: #FFFDF8; border: 3px dashed #2A2522;'),
      swap: () =>
        ctrl === 'her'
          ? this.setState({ ctrl: 'you', rolled: null, moved: false })
          : this.setState({ ctrl: 'her', rolled: null, moved: false }),
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
            href="Play.dc.html"
            aria-label="Back to Play"
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
              Ludo · Table 3
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>Arcade · Floor 9</span>
          </div>

          <span
            role="img"
            aria-label={`${vals.watchCount} residents watching`}
            style={{
              height: '34px',
              boxSizing: 'border-box',
              border: '2.5px solid #2A2522',
              borderRadius: '999px',
              background: '#FFFDF8',
              boxShadow: '2px 3px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '0 10px 0 7px',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '15px',
              fontWeight: '700',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M2 12 C5 6 9 4 12 4 C15 4 19 6 22 12 C19 18 15 20 12 20 C9 20 5 18 2 12 Z"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="4" fill="#2F3E5C" stroke="#2A2522" strokeWidth="2" />
            </svg>
            {vals.watchCount}
          </span>
        </header>

        {/* LED ticker: the place's news mixed with labelled sponsors */}

        <div
          role="marquee"
          aria-label="KEMI v TUNDE chess · move 31, SABI FOODS (sponsor), LIONS v ROVERS tonight 8 pm, BRIGHTLINE (sponsor), LUDO NIGHT Sat 8 pm · 412 of 512"
          style={{
            margin: '0 20px 8px',
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
            style={{ display: 'flex', width: 'max-content', animationDuration: '28s' }}
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
                KEMI v TUNDE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>chess · move 31</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Ludo Night</span>
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
                LIONS v ROVERS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>tonight 8 pm</span>
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
                color: '#F2CE6E',
                textShadow: '0 0 8px #F2CE6E99',
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
                BRIGHTLINE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Featured table</span>
              <span
                style={{
                  border: '1px solid #F2CE6E',
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
                LUDO NIGHT
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                Sat 8 pm · 412 of 512
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
                KEMI v TUNDE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>chess · move 31</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Ludo Night</span>
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
                LIONS v ROVERS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>tonight 8 pm</span>
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
                color: '#F2CE6E',
                textShadow: '0 0 8px #F2CE6E99',
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
                BRIGHTLINE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Featured table</span>
              <span
                style={{
                  border: '1px solid #F2CE6E',
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
                LUDO NIGHT
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                Sat 8 pm · 412 of 512
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Mode"
          style={{
            margin: '0 20px 6px',
            height: '40px',
            flex: 'none',
            boxSizing: 'border-box',
            border: '2.5px solid #2A2522',
            borderRadius: '999px',
            background: '#FFFDF8',
            display: 'flex',
            padding: '3px',
            gap: '3px',
          }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={vals.isPlayer}
            onClick={vals.asPlayer}
            style={css(vals.playerTab)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="2.4"
              />
              <circle cx="8.5" cy="8.5" r="1.8" fill="#2A2522" />
              <circle cx="15.5" cy="15.5" r="1.8" fill="#2A2522" />
              <circle cx="12" cy="12" r="1.8" fill="#2A2522" />
            </svg>
            Playing
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={vals.isWatcher}
            onClick={vals.asWatcher}
            style={css(vals.watcherTab)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M2 12 C5 6 9 4 12 4 C15 4 19 6 22 12 C19 18 15 20 12 20 C9 20 5 18 2 12 Z"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="4" fill="#2F3E5C" stroke="#2A2522" strokeWidth="2" />
            </svg>
            Watching
          </button>
        </div>

        {/* Players */}

        <div
          role="list"
          aria-label="Players"
          style={{
            margin: '4px 20px 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '6px',
          }}
        >
          {vals.players.map((p, $index) => (
            <div key={$index} role="listitem" aria-label={p.label} style={css(p.style)}>
              <span style={css(p.dot)} />

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  lineHeight: '1',
                  color: p.fg,
                }}
              >
                {p.name}
              </span>

              <span style={{ fontSize: '11px', fontWeight: '800', color: p.fg, opacity: '.85' }}>
                {p.home}/4 home
              </span>
            </div>
          ))}
        </div>

        {/* Board */}

        <section
          aria-label="Ludo board"
          style={{
            margin: '12px auto 0',
            position: 'relative',
            width: '336px',
            height: '336px',
            flex: 'none',
            boxSizing: 'content-box',
            border: '3px solid #2A2522',
            borderRadius: '14px',
            background: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            overflow: 'hidden',
          }}
        >
          <svg
            width="336"
            height="336"
            viewBox="0 0 15 15"
            aria-hidden="true"
            style={{ position: 'absolute', left: '0', top: '0' }}
          >
            <rect x="0" y="0" width="6" height="6" fill="#C8553D" />

            <rect x="9" y="0" width="6" height="6" fill="#4E9B5E" />

            <rect x="9" y="9" width="6" height="6" fill="#E8B53A" />

            <rect x="0" y="9" width="6" height="6" fill="#2F3E5C" />

            <rect
              x="1"
              y="1"
              width="4"
              height="4"
              rx="0.6"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="0.12"
            />

            <rect
              x="10"
              y="1"
              width="4"
              height="4"
              rx="0.6"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="0.12"
            />

            <rect
              x="10"
              y="10"
              width="4"
              height="4"
              rx="0.6"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="0.12"
            />

            <rect
              x="1"
              y="10"
              width="4"
              height="4"
              rx="0.6"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="0.12"
            />

            <path
              d="M0 6 H6 V0 M9 0 V6 H15 M15 9 H9 V15 M6 15 V9 H0"
              fill="none"
              stroke="#2A2522"
              strokeWidth="0.14"
            />

            <polygon points="6,6 6,9 7.5,7.5" fill="#C8553D" stroke="#2A2522" strokeWidth="0.1" />

            <polygon points="6,6 9,6 7.5,7.5" fill="#4E9B5E" stroke="#2A2522" strokeWidth="0.1" />

            <polygon points="9,6 9,9 7.5,7.5" fill="#E8B53A" stroke="#2A2522" strokeWidth="0.1" />

            <polygon points="6,9 9,9 7.5,7.5" fill="#2F3E5C" stroke="#2A2522" strokeWidth="0.1" />
          </svg>{' '}
          {vals.cells.map((c, $index) => (
            <span key={$index} style={css(c.s)} />
          ))}
          {vals.ads.map((a, $index) => (
            <span key={$index} role="img" aria-label={a.brand} style={css(a.s)}>
              <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d={a.glyph}
                  fill={a.fill}
                  stroke="#2A2522"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '10px',
                  fontWeight: '700',
                  lineHeight: '1',
                  letterSpacing: '.02em',
                  textAlign: 'center',
                }}
              >
                {a.name}
              </span>
            </span>
          ))}
          {vals.pieces.map((k, $index) => (
            <Fragment key={$index}>
              {k.can ? (
                <button
                  type="button"
                  className="ludo-can"
                  aria-label={k.label}
                  onClick={k.go}
                  style={css(k.s)}
                />
              ) : null}

              {k.still ? <span aria-hidden="true" style={css(k.s)} /> : null}
            </Fragment>
          ))}
        </section>

        {/* Watchers' comments */}

        <section
          aria-label="Comments from watchers"
          style={{
            margin: '12px 20px 12px',
            flex: '1',
            minHeight: '0',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              flex: '1',
              minHeight: '0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              gap: '6px',
              padding: '8px 10px 4px',
            }}
          >
            {vals.comments.map((m, $index) => (
              <div key={$index} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
                <span aria-hidden="true" style={css(m.face)} />

                <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: '600', lineHeight: '1.25' }}>
                    <b style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: '600' }}>{m.name}</b>{' '}
                    {m.text}
                  </span>
                </div>

                <span
                  aria-label={`${m.up} up, ${m.down} down`}
                  style={{
                    flex: 'none',
                    display: 'flex',
                    gap: '5px',
                    fontSize: '11.5px',
                    fontWeight: '800',
                    color: '#5E564D',
                  }}
                >
                  <button type="button" aria-label="Vote up" onClick={m.voteUp} style={css(m.upStyle)}>
                    ▲<span>{m.up}</span>
                  </button>

                  <button type="button" aria-label="Vote down" onClick={m.voteDown} style={css(m.downStyle)}>
                    ▼<span>{m.down}</span>
                  </button>
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 8px 8px',
              borderTop: '2px dashed #EFE6D7',
            }}
          >
            {vals.reacts.map((r, $index) => (
              <button key={$index} type="button" aria-label={r.label} onClick={r.go} style={css(r.style)}>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d={r.glyph}
                    fill={r.fill}
                    stroke="#2A2522"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span style={{ fontSize: '11.5px', fontWeight: '800' }}>{r.n}</span>
              </button>
            ))}

            <input
              type="text"
              aria-label="Write a comment"
              placeholder="Say something…"
              value={vals.draft}
              onChange={vals.typing}
              style={{
                flex: '1',
                minWidth: '0',
                height: '36px',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '999px',
                background: '#F5EFE5',
                padding: '0 12px',
                fontFamily: "'Nunito', sans-serif",
                fontSize: '14px',
                fontWeight: '700',
                color: '#2A2522',
                outline: 'none',
              }}
            />

            <button
              type="button"
              aria-label="Send"
              onClick={vals.send}
              style={{
                all: 'unset',
                width: '36px',
                height: '36px',
                flex: 'none',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '50%',
                background: vals.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 12 H20 M14 6 L20 12 L14 18" />
              </svg>
            </button>
          </div>
        </section>

        {/* Watchers get a simple bar instead of the controls */}

        {vals.isWatcher ? (
          <section
            style={{
              margin: '0 20px 24px',
              height: '60px',
              flex: 'none',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#2F3E5C',
              color: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 8px 0 14px',
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M2 12 C5 6 9 4 12 4 C15 4 19 6 22 12 C19 18 15 20 12 20 C9 20 5 18 2 12 Z"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="4" fill="#E8B53A" stroke="#2A2522" strokeWidth="2" />
            </svg>

            <span
              style={{ flex: '1', fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}
            >
              Watching · Amara to roll
            </span>

            <ScreenLink
              href="Play.dc.html"
              style={{
                height: '40px',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '999px',
                background: '#FFFDF8',
                color: '#2A2522',
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '15px',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              Leave
            </ScreenLink>
          </section>
        ) : null}

        {/* Control: watch her, or take over */}

        {vals.isPlayer ? (
          <section
            aria-live="polite"
            style={{
              margin: '0 20px 24px',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              role="img"
              aria-label={vals.diceLabel}
              style={{
                width: '58px',
                height: '58px',
                flex: 'none',
                position: 'relative',
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '14px',
                background: vals.diceBg,
                boxShadow: '2px 3px 0 #2A2522',
              }}
            >
              {vals.pips.map((d, $index) => (
                <span key={$index} style={css(d.s)} />
              ))}
            </div>

            <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {vals.isHer ? (
                  <span
                    role="img"
                    aria-label="She's playing"
                    style={{
                      width: '24px',
                      height: '24px',
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
                      <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                    </svg>
                  </span>
                ) : null}

                {vals.isYou ? (
                  <span
                    role="img"
                    aria-label="You're playing"
                    style={{
                      width: '24px',
                      height: '24px',
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
                    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
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
                  {vals.status}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {vals.canRoll ? (
                  <button
                    type="button"
                    onClick={vals.roll}
                    style={{
                      all: 'unset',
                      flex: '1',
                      height: '42px',
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
                    Roll
                  </button>
                ) : null}

                {vals.noMove ? (
                  <button
                    type="button"
                    onClick={vals.pass}
                    style={{
                      all: 'unset',
                      flex: '1',
                      height: '42px',
                      boxSizing: 'border-box',
                      borderRadius: '999px',
                      background: '#FFFDF8',
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
                    Pass
                  </button>
                ) : null}

                <button type="button" onClick={vals.swap} style={css(vals.swapStyle)}>
                  {vals.swapLabel}
                </button>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    );
  }
}
