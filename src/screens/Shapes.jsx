// Shapes (Whot-style)
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Shapes extends Screen {
  static title = 'Shapes';

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
      { id: 'c0', name: 'Bayo', tone: '#6B4027', text: 'Keep that whot for the end', up: 4, down: 0 },
      { id: 'c1', name: 'Kemi', tone: '#A8714A', text: 'Tunde is down to four cards', up: 3, down: 0 },
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

    const SP = {
      circle: 'M12 4 A8 8 0 1 0 12.01 4 Z',
      triangle: 'M12 3 L21 20 H3 Z',
      cross: 'M9 3 H15 V9 H21 V15 H15 V21 H9 V15 H3 V9 H9 Z',
      square: 'M4 4 H20 V20 H4 Z',
      star: 'M12 2 L14.6 9 H22 L16 13.6 L18.3 21 L12 16.6 L5.7 21 L8 13.6 L2 9 H9.4 Z',
      whot: 'M4 6 Q12 2 20 6 L18 18 Q12 22 6 18 Z',
    };
    const FILL = {
      circle: '#C8553D',
      triangle: '#E8B53A',
      cross: '#4E9B5E',
      square: '#9DB8E0',
      star: '#F2B8AE',
      whot: '#5B3D62',
    };
    const startHand = [
      ['triangle', 3],
      ['circle', 7],
      ['star', 5],
      ['square', 10],
      ['cross', 2],
      ['whot', 20],
    ];
    const hand = this.state.hand ?? startHand;
    const pile = this.state.pile ?? [
      ['square', 7],
      ['circle', 4],
      ['triangle', 7],
    ];
    const call = this.state.call ?? null;
    const market = this.state.market ?? 23;
    const moved = this.state.moved ?? null;
    const top = pile[pile.length - 1];
    const playable = ([s, n]) => s === 'whot' || (call ? s === call : s === top[0] || n === top[1]);
    const canAct = !isWatcher && !moved;
    const cardStyle = (z) =>
      'position: relative; width: 52px; height: 74px; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 9px; background: #FFFDF8; display: flex; align-items: center; justify-content: center;' +
      z;
    const view = ([s, n]) => ({ n: String(n), path: SP[s], fill: FILL[s] });
    const playCard = (i, who) => {
      const c = hand[i],
        nh = hand.filter((_, k) => k !== i);
      this.setState({
        hand: nh,
        pile: pile.concat([c]),
        call: c[0] === 'whot' ? 'circle' : null,
        moved: who,
        playedCard: c,
      });
    };
    const handView = hand.map((c, i) => {
      const ok = canAct && playable(c);
      return {
        label: c[0] + ' ' + c[1] + (ok ? ', playable' : ''),
        ...view(c),
        s: cardStyle(
          ok
            ? ' transform: translateY(-8px); box-shadow: 0 0 0 3px ' + accent + ', 3px 4px 0 #2A2522;'
            : ' opacity: .75;',
        ),
        btn:
          'all: unset; margin-left: ' +
          (i ? '-8px' : '0') +
          '; display: block;' +
          (ok ? ' cursor: pointer;' : ''),
        go: () => {
          if (ok) playCard(i, 'you');
        },
      };
    });
    const pileView = pile
      .slice(-3)
      .map((c, i, arr) => ({
        ...view(c),
        s: cardStyle(
          ' position: absolute; left: ' +
            i * 26 +
            'px; top: ' +
            (i === arr.length - 1 ? 8 : 14 - i * 3) +
            'px; transform: rotate(' +
            (i * 7 - 7) +
            'deg);',
        ),
      }));
    const pc = this.state.playedCard;
    const opps = [
      ['Tunde', '#5A3520', 4],
      ['Ifeoma', '#A8714A', 5],
    ].map(([name, tone, n], i) => ({
      name,
      tone,
      n: String(n),
      backs: Array.from({ length: Math.min(n, 5) }, () => ({})),
      label: name + ' holds ' + n + ' cards',
      s:
        'height: 40px; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 12px; display: flex; align-items: center; gap: 6px; padding: 0 10px 0 8px; background: ' +
        (moved && i === 0 ? accent : '#FFFDF8') +
        ';',
    }));
    const R = {
      ...flags(moved),
      hand: handView,
      pile: pileView,
      opps,
      market: String(market),
      pileLabel: pile
        .slice(-3)
        .map((c) => c[0] + ' ' + c[1])
        .join(', '),
      callText: call ? 'Called: ' + call : '',
      showHand: !isWatcher,
      marketStyle:
        'all: unset; width: 52px; height: 74px; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 9px; background: #5B3D62; display: flex; align-items: center; justify-content: center; box-shadow: 3px 4px 0 #2A2522;' +
        (canAct ? ' cursor: pointer;' : ''),
      draw: () => {
        if (canAct) this.setState({ hand: hand.concat([['star', 1]]), market: market - 1, moved: 'drew' });
      },
      topActive: false,
      botInfo: hand.length + ' cards',
      byYou: moved === 'you' || moved === 'drew',
      status:
        moved === 'drew'
          ? 'You drew from the market'
          : moved
            ? (moved === 'you' ? 'You played ' : 'She played ') + pc[0] + ' ' + pc[1] + ' · Tunde next'
            : 'Match the shape or number',
      watchStatus: moved ? 'Watching · Tunde to play' : 'Watching · Amara to play',
      handOff: () => {
        let i = hand.findIndex((c) => c[0] !== 'whot' && playable(c));
        if (i < 0) i = hand.findIndex(playable);
        if (i >= 0) playCard(i, 'her');
        else
          this.setState({
            hand: hand.concat([['star', 1]]),
            market: market - 1,
            moved: 'her',
            playedCard: ['market', ''],
          });
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
      watchCount: String(11 + (isWatcher ? 1 : 0)),
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
              Shapes · Table 2
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Whot-style · 3 players · live
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

        <div
          style={{
            margin: '0 20px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            flex: 'none',
          }}
        >
          {vals.opps.map((o, $index) => (
            <div key={$index} aria-label={o.label} style={css(o.s)}>
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  flex: 'none',
                  boxSizing: 'border-box',
                  border: '2px solid #2A2522',
                  borderRadius: '50%',
                  background: o.tone,
                }}
              />

              <span
                style={{
                  flex: '1',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '15px',
                  fontWeight: '600',
                }}
              >
                {o.name}
              </span>

              <span style={{ display: 'flex' }}>
                {o.backs.map((k, $index) => (
                  <span
                    key={$index}
                    style={{
                      width: '12px',
                      height: '18px',
                      marginLeft: '-4px',
                      boxSizing: 'border-box',
                      border: '1.8px solid #2A2522',
                      borderRadius: '3px',
                      background: '#5B3D62',
                    }}
                  />
                ))}
              </span>

              <span style={{ fontSize: '12.5px', fontWeight: '800' }}>{o.n}</span>
            </div>
          ))}
        </div>

        <section
          aria-label="The table"
          style={{
            margin: '8px 20px 0',
            flex: 'none',
            height: '150px',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '22px',
            background: '#2E4A3B',
            boxShadow: '4px 5px 0 #2A2522',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '26px',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              aria-label={`Draw from the market, ${vals.market} cards`}
              onClick={vals.draw}
              style={css(vals.marketStyle)}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 L21 12 L12 21 L3 12 Z" fill="#F2CE6E" stroke="#2A2522" strokeWidth="1.8" />
              </svg>
            </button>

            <span style={{ fontSize: '12px', fontWeight: '800', color: '#FFFDF8' }}>
              Market {vals.market}
            </span>
          </div>

          <div
            aria-label={`Played: ${vals.pileLabel}`}
            style={{ position: 'relative', width: '110px', height: '96px' }}
          >
            {vals.pile.map((p, $index) => (
              <span key={$index} style={css(p.s)}>
                <span
                  style={{
                    position: 'absolute',
                    left: '5px',
                    top: '3px',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#8E4129',
                  }}
                >
                  {p.n}
                </span>
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={p.path} fill={p.fill} stroke="#2A2522" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </span>
            ))}
          </div>

          <span
            style={{
              position: 'absolute',
              right: '10px',
              bottom: '8px',
              fontSize: '11.5px',
              fontWeight: '800',
              color: '#F2CE6E',
            }}
          >
            {vals.callText}
          </span>
        </section>

        {vals.showHand ? (
          <div
            aria-label="Your hand"
            style={{
              margin: '12px 20px 0',
              flex: 'none',
              height: '82px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {vals.hand.map((h, $index) => (
              <button key={$index} type="button" aria-label={h.label} onClick={h.go} style={css(h.btn)}>
                <span style={css(h.s)}>
                  <span
                    style={{
                      position: 'absolute',
                      left: '5px',
                      top: '3px',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#8E4129',
                    }}
                  >
                    {h.n}
                  </span>
                  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d={h.path}
                      fill={h.fill}
                      stroke="#2A2522"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        ) : null}

        {vals.isWatcher ? (
          <div
            style={{
              margin: '12px 20px 0',
              flex: 'none',
              height: '82px',
              boxSizing: 'border-box',
              border: '3px dashed #2A2522',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: '#5E564D',
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5E564D"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}>
              Hands are hidden from watchers
            </span>
          </div>
        ) : null}

        <div style={css(`${vals.botBar}; margin-top: 10px`)}>
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
          />{' '}
          <span
            style={{ flex: '1', fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}
          >
            Amara <span style={{ fontSize: '12.5px', color: '#8A8075' }}>1,060</span>
          </span>{' '}
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
