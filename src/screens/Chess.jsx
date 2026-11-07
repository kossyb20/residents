// Chess
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Chess extends Screen {
  static title = 'Chess';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const role = this.state.role ?? 'player';
    const isWatcher = role === 'watcher';
    const start = [
      'r.bq.rk.',
      'pp..bppp',
      '..np.n..',
      '..p.p...',
      '..B.P...',
      '...P.N..',
      'PPP..PPP',
      'RNBQ.RK.',
    ];
    const board = this.state.board ?? start.map((r) => r.split(''));
    const sel = this.state.sel ?? null;
    const moved = this.state.moved ?? null; // 'you' | 'her'
    const last = this.state.last ?? [
      [0, 1],
      [2, 2],
    ]; // Tunde's knight b8 to c6
    const files = 'abcdefgh';
    const G = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
    const isMine = (c) => c !== '.' && c === c.toUpperCase();
    const move = (fr, fc, tr, tc, who) => {
      const b = board.map((row) => row.slice());
      b[tr][tc] = b[fr][fc];
      b[fr][fc] = '.';
      this.setState({
        board: b,
        sel: null,
        moved: who,
        last: [
          [fr, fc],
          [tr, tc],
        ],
      });
    };
    const canAct = !isWatcher && !moved;
    const squares = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const ch = board[r][c];
        const dark = (r + c) % 2 === 1;
        const isLast = last.some(([lr, lc]) => lr === r && lc === c);
        const isSel = sel && sel[0] === r && sel[1] === c;
        let bg = dark ? '#C08A5B' : '#FDE3C8';
        if (isLast) bg = dark ? '#D9A93F' : '#F2CE6E';
        if (isSel) bg = '#8FC1A9';
        const white = isMine(ch);
        squares.push({
          glyph: ch === '.' ? '' : G[ch.toLowerCase()],
          label:
            files[c] +
            (8 - r) +
            (ch === '.'
              ? ''
              : ', ' +
                (white ? 'white ' : 'black ') +
                { k: 'king', q: 'queen', r: 'rook', b: 'bishop', n: 'knight', p: 'pawn' }[ch.toLowerCase()]),
          coord: c === 0 || r === 7,
          coordText: (r === 7 ? files[c] : '') + (c === 0 ? String(8 - r) : ''),
          s:
            'all: unset; position: relative; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: ' +
            bg +
            ';' +
            (canAct ? ' cursor: pointer;' : ''),
          pieceStyle:
            'font-size: 32px; line-height: 1; font-family: "Segoe UI Symbol", "DejaVu Sans", "Noto Sans Symbols 2", sans-serif; color: ' +
            (white ? '#FFFDF8' : '#2A2522') +
            '; -webkit-text-stroke: ' +
            (white ? '1.4px #2A2522' : '0'),
          go: () => {
            if (!canAct) return;
            if (isMine(ch)) return this.setState({ sel: [r, c] });
            if (sel) move(sel[0], sel[1], r, c, 'you');
          },
        });
      }
    }

    // comments
    const extra = this.state.extra ?? [];
    const votes = this.state.votes ?? {};
    const base = [
      { id: 'c1', name: 'Musa', tone: '#8B5A3C', text: 'Knight to g5 is right there', up: 4, down: 1 },
      { id: 'c2', name: 'Ifeoma', tone: '#A8714A', text: 'Tunde is setting a trap', up: 2, down: 2 },
    ];
    const comments = base
      .concat(extra)
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

    const bar = (active) =>
      'margin: 0 20px; height: 36px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 12px; display: flex; align-items: center; gap: 8px; padding: 0 10px; background: ' +
      (active ? accent : '#FFFDF8') +
      ';';
    const yourTurn = !moved;
    const mtab = (on) =>
      'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 14px; font-weight: 600; cursor: pointer;' +
      (on ? ' background: ' + accent + '; border: 2px solid #2A2522;' : ' border: 2px solid transparent;');
    return {
      accent,
      squares,
      comments,
      draft,
      isWatcher,
      isPlayer: !isWatcher,
      playerTab: mtab(!isWatcher),
      watcherTab: mtab(isWatcher),
      asPlayer: () => this.setState({ role: 'player', sel: null }),
      asWatcher: () => this.setState({ role: 'watcher', sel: null }),
      watchCount: String(6 + (isWatcher ? 1 : 0)),
      topBar: bar(!yourTurn),
      botBar: bar(yourTurn),
      topClock: yourTurn ? '' : '24 h to move',
      botClock: yourTurn ? '1 h 58 m to move' : '',
      waiting: yourTurn,
      byYou: moved === 'you',
      byHer: moved === 'her',
      status: yourTurn
        ? sel
          ? 'Now tap where it goes'
          : 'Your move · tap a piece'
        : moved === 'her'
          ? 'She played knight to g5'
          : 'Moved · Tunde to play',
      watchStatus: yourTurn ? 'Watching · Amara to move' : 'Watching · Tunde to move',
      handOff: () => move(5, 5, 3, 6, 'her'),
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
              Chess vs Tunde
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              One move a day · move 9
            </span>
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
          aria-label="LUDO NIGHT Sat 8 pm, KORA LABS (sponsor), LIONS v ROVERS tonight 8 pm, BRIGHTLINE (sponsor), BLITZ Sun 4 pm · 97 of 128"
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
                LUDO NIGHT
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Sat 8 pm</span>
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
                BLITZ
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                Sun 4 pm · 97 of 128
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Sat 8 pm</span>
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
                BLITZ
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                Sun 4 pm · 97 of 128
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
                d="M7 21 H17 L16 17 H8 Z M9 17 C9 13 7 11 8 8 C9 5 13 4 15 6 L17 8 L15 10 C15 13 15 15 15 17"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="2.2"
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

        {/* Tunde (black) */}

        <div style={css(vals.topBar)}>
          <span
            style={{
              width: '22px',
              height: '22px',
              flex: 'none',
              boxSizing: 'border-box',
              border: '2px solid #2A2522',
              borderRadius: '50%',
              background: '#5A3520',
            }}
          />

          <span
            style={{ flex: '1', fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}
          >
            Tunde <span style={{ fontSize: '12.5px', color: '#8A8075' }}>1,010</span>
          </span>

          <span style={{ fontSize: '12.5px', fontWeight: '800' }}>{vals.topClock}</span>
        </div>

        {/* Board */}

        <section
          aria-label="Chess board"
          style={{
            margin: '6px auto',
            position: 'relative',
            width: '336px',
            height: '336px',
            flex: 'none',
            border: '3px solid #2A2522',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '4px 5px 0 #2A2522',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 42px)',
            gridTemplateRows: 'repeat(8, 42px)',
          }}
        >
          {vals.squares.map((q, $index) => (
            <button key={$index} type="button" aria-label={q.label} onClick={q.go} style={css(q.s)}>
              <span style={css(q.pieceStyle)}>{q.glyph}</span>

              {q.coord ? (
                <span
                  style={{
                    position: 'absolute',
                    left: '3px',
                    bottom: '1px',
                    fontSize: '9px',
                    fontWeight: '800',
                    opacity: '.6',
                  }}
                >
                  {q.coordText}
                </span>
              ) : null}
            </button>
          ))}
        </section>

        {/* Amara (white) */}

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
            Amara <span style={{ fontSize: '12.5px', color: '#8A8075' }}>980</span>
          </span>

          <span style={{ fontSize: '12.5px', fontWeight: '800' }}>{vals.botClock}</span>
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
              style={{ flex: '1', fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}
            >
              {vals.status}
            </span>

            {vals.waiting ? (
              <button
                type="button"
                onClick={vals.handOff}
                style={{
                  all: 'unset',
                  height: '44px',
                  padding: '0 16px',
                  boxSizing: 'border-box',
                  borderRadius: '999px',
                  background: '#FFFDF8',
                  border: '3px dashed #2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '16px',
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
              style={{ flex: '1', fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}
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
