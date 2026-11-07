// Ultimate tic-tac-toe
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class UltimateTTT extends Screen {
  static title = 'Ultimate tic-tac-toe';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const role = this.state.role ?? 'player';
    const isWatcher = role === 'watcher';
    const mtab = (on) =>
      'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 14px; font-weight: 600; cursor: pointer;' +
      (on ? ' background: ' + accent + '; border: 2px solid #2A2522;' : ' border: 2px solid transparent;');
    const bar = (active) =>
      'margin: 0 20px; height: 36px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 12px; display: flex; align-items: center; gap: 8px; padding: 0 10px; background: ' +
      (active ? accent : '#FFFDF8') +
      ';';
    const extraC = this.state.extraC ?? [];
    const votes = this.state.votes ?? {};
    const baseC = [
      {
        id: 'c0',
        name: 'Chidi',
        tone: '#7A4A2E',
        text: "Don't send her to the middle board",
        up: 3,
        down: 0,
      },
      {
        id: 'c1',
        name: 'Bayo',
        tone: '#6B4027',
        text: 'This is chess for tic-tac-toe people',
        up: 6,
        down: 0,
      },
    ];
    const comments = baseC
      .concat(extraC)
      .slice(-2)
      .map((m) => {
        const v = votes[m.id];
        const vs = (on) =>
          'all: unset; cursor: pointer; padding: 0 4px; border-radius: 6px;' +
          (on ? ' background: ' + accent + ';' : '');
        return {
          name: m.name,
          text: m.text,
          up: String(m.up + (v === 'up' ? 1 : 0)),
          down: String(m.down + (v === 'down' ? 1 : 0)),
          face:
            'width: 22px; height: 22px; flex: none; box-sizing: border-box; border-radius: 50%; border: 2px solid #2A2522; background: ' +
            m.tone +
            '; margin-top: 1px;',
          upStyle: vs(v === 'up'),
          downStyle: vs(v === 'down'),
          voteUp: () => this.setState({ votes: { ...votes, [m.id]: v === 'up' ? null : 'up' } }),
          voteDown: () => this.setState({ votes: { ...votes, [m.id]: v === 'down' ? null : 'down' } }),
        };
      });
    const draft = this.state.draft ?? '';

    // ---- game ----

    const flags = (moved) => ({ waiting: !moved, byYou: moved === 'you', byHer: moved === 'her' });

    const start = [
      'X.O......',
      '....O....',
      '......X..',
      '.O..X....',
      'X...O....',
      '........X',
      '..O......',
      '...X.....',
      'O........',
    ];
    const cells = this.state.cells ?? start.map((s) => s.split(''));
    const target = this.state.target === undefined ? 0 : this.state.target;
    const moved = this.state.moved ?? null;
    const last = this.state.last ?? [8, 0];
    const L = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const winOf = (a) => {
      for (const [x, y, z] of L) if (a[x] !== '.' && a[x] === a[y] && a[y] === a[z]) return a[x];
      return null;
    };
    const full = (a) => a.every((v) => v !== '.');
    const winners = cells.map(winOf);
    const open = (b) => !winners[b] && !full(cells[b]);
    const allowed = (b) => (target === null || !open(target) ? open(b) : b === target);
    const canAct = !isWatcher && !moved;
    const play = (b, k, who) => {
      const n = cells.map((x) => x.slice());
      n[b][k] = 'X';
      this.setState({ cells: n, target: k, moved: who, last: [b, k] });
    };
    const boards = cells.map((a, b) => {
      const act = canAct && allowed(b);
      return {
        won: !!winners[b],
        winner: winners[b] || '',
        overlay:
          'position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 84px; font-weight: 700; line-height: 1; color: ' +
          (winners[b] === 'X' ? '#C8553D' : '#2F3E5C') +
          '; background: rgba(253,227,200,.75);',
        s:
          'position: relative; border-radius: 10px; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); gap: 3px; padding: 4px; background: ' +
          (act ? accent : '#FDE3C8') +
          ';',
        cells: a.map((v, k) => {
          const ok = act && v === '.';
          const isLast = last[0] === b && last[1] === k;
          return {
            m: v === '.' ? '' : v,
            label: 'Board ' + (b + 1) + ', square ' + (k + 1) + (v === '.' ? '' : ', ' + v),
            s:
              'all: unset; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 22px; font-weight: 700; color: ' +
              (v === 'X' ? '#C8553D' : '#2F3E5C') +
              '; background: ' +
              (isLast ? '#F2CE6E' : '#FFFDF8') +
              ';' +
              (ok ? ' cursor: pointer;' : ''),
            go: () => {
              if (ok) play(b, k, 'you');
            },
          };
        }),
      };
    });
    const choose = () => {
      const opts = [];
      cells.forEach((a, b) => {
        if (!allowed(b)) return;
        a.forEach((v, k) => {
          if (v === '.') opts.push([b, k]);
        });
      });
      const score = ([b, k]) => {
        const t = cells[b].slice();
        t[k] = 'X';
        let s = winOf(t) ? 100 : 0;
        const o = cells[b].slice();
        o[k] = 'O';
        if (winOf(o)) s += 50;
        if (k === 4) s += 5;
        if (!open(k) || winners[k]) s -= 3;
        return s;
      };
      return opts.sort((p, q) => score(q) - score(p))[0];
    };
    const myWins = winners.filter((w) => w === 'X').length,
      theirWins = winners.filter((w) => w === 'O').length;
    const R = {
      ...flags(moved),
      boards,
      topActive: !!moved,
      topInfo: theirWins + ' boards',
      botInfo: myWins + ' boards',
      status: moved
        ? moved === 'you'
          ? 'Zainab must play board ' + (target + 1)
          : 'She sent Zainab to board ' + (target + 1)
        : 'Your move · glowing board',
      watchStatus: moved ? 'Watching · Zainab to move' : 'Watching · Amara to move',
      handOff: () => {
        const m = choose();
        if (m) play(m[0], m[1], 'her');
      },
    };

    // ---- end game ----

    return {
      accent,
      comments,
      draft,
      isWatcher,
      isPlayer: !isWatcher,
      playerTab: mtab(!isWatcher),
      watcherTab: mtab(isWatcher),
      asPlayer: () => this.setState({ role: 'player', sel: null }),
      asWatcher: () => this.setState({ role: 'watcher', sel: null }),
      watchCount: String(2 + (isWatcher ? 1 : 0)),
      topBar: bar(!!R.topActive),
      botBar: bar(!R.topActive),
      showExtra: false,
      extraLabel: '',
      extraGo: () => {},
      typing: (e) => this.setState({ draft: e.target.value }),
      send: () => {
        if (draft.trim())
          this.setState({
            extraC: extraC.concat([
              {
                id: 'x' + extraC.length,
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
      ...R,
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

          <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
            <h1
              style={{
                margin: '0',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '25px',
                fontWeight: '700',
                lineHeight: '1.1',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Ultimate vs Zainab
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              One move a day · move 13
            </span>
          </div>

          <span
            role="img"
            aria-label={`${vals.watchCount} residents watching`}
            style={{
              height: '34px',
              flex: 'none',
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
          aria-label="KEMI v TUNDE chess · move 31, KORA LABS (sponsor), LUDO NIGHT Sat 8 pm · 412 of 512, SABI FOODS (sponsor), LIONS v ROVERS tonight 8 pm, NDURA MINING (sponsor)"
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
            style={{ display: 'flex', width: 'max-content', animationDuration: '33s' }}
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
                color: '#9DB8E0',
                textShadow: '0 0 8px #9DB8E099',
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
                KORA LABS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Chess blitz</span>
              <span
                style={{
                  border: '1px solid #9DB8E0',
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
                color: '#8FC1A9',
                textShadow: '0 0 8px #8FC1A999',
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
                NDURA MINING
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Draughts cup</span>
              <span
                style={{
                  border: '1px solid #8FC1A9',
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
                color: '#9DB8E0',
                textShadow: '0 0 8px #9DB8E099',
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
                KORA LABS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Chess blitz</span>
              <span
                style={{
                  border: '1px solid #9DB8E0',
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
                color: '#8FC1A9',
                textShadow: '0 0 8px #8FC1A999',
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
                NDURA MINING
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Draughts cup</span>
              <span
                style={{
                  border: '1px solid #8FC1A9',
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
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Mode"
          style={{
            margin: '0 20px 8px',
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
              <path
                d="M4 20 l3 -1 l12 -12 a2 2 0 0 0 -3 -3 l-12 12 z"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
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

        <div style={css(vals.topBar)}>
          <span
            style={{
              width: '22px',
              height: '22px',
              flex: 'none',
              boxSizing: 'border-box',
              border: '2px solid #2A2522',
              borderRadius: '50%',
              background: '#8B5A3C',
            }}
          />

          <span
            style={{ flex: '1', fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}
          >
            Zainab <span style={{ fontSize: '12.5px', color: '#8A8075' }}>990</span>
          </span>

          <span style={{ fontSize: '12.5px', fontWeight: '800' }}>{vals.topInfo}</span>
        </div>

        <section
          aria-label="Ultimate tic-tac-toe board"
          style={{
            margin: '6px auto',
            flex: 'none',
            width: '336px',
            height: '336px',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '16px',
            background: '#2A2522',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '4px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: '4px',
          }}
        >
          {vals.boards.map((b, $index) => (
            <div key={$index} style={css(b.s)}>
              {b.cells.map((q, $index) => (
                <button key={$index} type="button" aria-label={q.label} onClick={q.go} style={css(q.s)}>
                  {q.m}
                </button>
              ))}

              {b.won ? <span style={css(b.overlay)}>{b.winner}</span> : null}
            </div>
          ))}
        </section>

        <div style={css(vals.botBar)}>
          <span
            style={{
              width: '22px',
              height: '22px',
              flex: 'none',
              boxSizing: 'border-box',
              border: '2px solid #2A2522',
              borderRadius: '50%',
              background: '#7A4A2E',
            }}
          />

          <span
            style={{ flex: '1', fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}
          >
            Amara <span style={{ fontSize: '12.5px', color: '#8A8075' }}>1,020</span>
          </span>

          <span style={{ fontSize: '12.5px', fontWeight: '800' }}>{vals.botInfo}</span>
        </div>

        {/* Comments */}

        <section
          aria-label="Comments from watchers"
          style={{
            margin: '10px 20px 10px',
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

                <span
                  style={{
                    flex: '1',
                    minWidth: '0',
                    fontSize: '13.5px',
                    fontWeight: '600',
                    lineHeight: '1.25',
                  }}
                >
                  <b style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: '600' }}>{m.name}</b> {m.text}
                </span>

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

        {/* Control */}

        {vals.isPlayer ? (
          <section
            aria-live="polite"
            style={{
              margin: '0 20px 24px',
              flex: 'none',
              minHeight: '64px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 8px 8px 12px',
            }}
          >
            {vals.byYou ? (
              <span
                role="img"
                aria-label="You moved"
                style={{
                  width: '26px',
                  height: '26px',
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
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
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

            {vals.byHer ? (
              <span
                role="img"
                aria-label="She moved"
                style={{
                  width: '26px',
                  height: '26px',
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
                <svg width="16" height="16" viewBox="0 0 40 40" aria-hidden="true">
                  <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                  <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                  <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                </svg>
              </span>
            ) : null}

            {vals.waiting ? (
              <span
                role="img"
                aria-label="Waiting for you"
                style={{
                  width: '26px',
                  height: '26px',
                  flex: 'none',
                  boxSizing: 'border-box',
                  border: '2px solid #2A2522',
                  borderRadius: '50%',
                  background: '#F7D6D6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 3 h12 M6 21 h12 M7 3 c0 6 10 6 10 9 c0 3 -10 3 -10 9 M17 3 c0 6 -10 6 -10 9 c0 3 10 3 10 9"
                    fill="none"
                    stroke="#2A2522"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : null}

            <span
              style={{
                flex: '1',
                minWidth: '0',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '15.5px',
                fontWeight: '600',
                lineHeight: '1.2',
              }}
            >
              {vals.status}
            </span>

            {vals.showExtra ? (
              <button
                type="button"
                onClick={vals.extraGo}
                style={{
                  all: 'unset',
                  height: '44px',
                  padding: '0 14px',
                  boxSizing: 'border-box',
                  borderRadius: '999px',
                  background: '#FFFDF8',
                  border: '3px solid #2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                {vals.extraLabel}
              </button>
            ) : null}

            {vals.waiting ? (
              <button
                type="button"
                onClick={vals.handOff}
                style={{
                  all: 'unset',
                  height: '44px',
                  padding: '0 14px',
                  boxSizing: 'border-box',
                  borderRadius: '999px',
                  background: '#FFFDF8',
                  border: '3px dashed #2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Hand Off
              </button>
            ) : null}
          </section>
        ) : null}

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
              style={{ flex: '1', fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}
            >
              {vals.watchStatus}
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
      </div>
    );
  }
}
