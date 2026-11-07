// Tutorial: tic-tac-toe
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class TicTacToe extends Screen {
  static title = 'Tutorial';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const b = this.state.b ?? Array(9).fill('.');
    const who = this.state.who ?? Array(9).fill(null);
    const mine = this.state.mine ?? 0; // X moves made so far
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
      return a.every((v) => v !== '.') ? 'draw' : null;
    };
    const pick = (a, me, op, order) => {
      for (const i of order)
        if (a[i] === '.') {
          const t = a.slice();
          t[i] = me;
          if (winOf(t) === me) return i;
        }
      for (const i of order)
        if (a[i] === '.') {
          const t = a.slice();
          t[i] = op;
          if (winOf(t) === op) return i;
        }
      return order.find((i) => a[i] === '.');
    };
    const end = winOf(b);
    const step = mine === 0 ? 1 : mine === 1 ? 2 : 3;
    const move = (i, by) => {
      const a = b.slice(),
        w = who.slice();
      a[i] = 'X';
      w[i] = by;
      if (!winOf(a)) {
        const o = pick(a, 'O', 'X', [4, 0, 2, 6, 8, 1, 3, 5, 7]);
        if (o !== undefined) a[o] = 'O';
      }
      this.setState({ b: a, who: w, mine: mine + 1 });
    };
    const canTap = !end && step !== 2;
    const cells = b.map((v, i) => ({
      m: v === '.' ? '' : v,
      label:
        'Square ' +
        (i + 1) +
        (v === '.'
          ? ''
          : ', ' + v + (who[i] === 'you' ? ', you decided' : who[i] === 'her' ? ', Amara decided' : '')),
      byYou: who[i] === 'you',
      byHer: who[i] === 'her',
      markStyle:
        'font-family: Fredoka, sans-serif; font-size: 58px; font-weight: 700; line-height: 1; color: ' +
        (v === 'X' ? '#C8553D' : '#2F3E5C') +
        ';',
      s:
        'all: unset; position: relative; border-radius: 14px; display: flex; align-items: center; justify-content: center; background: #FFFDF8;' +
        (canTap && v === '.' ? ' cursor: pointer;' : ''),
      go: () => {
        if (canTap && v === '.') move(i, 'you');
      },
    }));
    const texts = {
      1: ['Decide', 'Tap any square to play the move yourself. You are X.'],
      2: ['Hand Off', 'Now let Amara choose. She plays by her own skill and mood, mistakes included.'],
      3: ['Your call, every move', 'Tap a square or hand off. The tag on each X shows who chose it.'],
    };
    const result =
      end === 'X'
        ? 'You and Amara won'
        : end === 'O'
          ? 'Kemi won this one'
          : end === 'draw'
            ? 'A draw, as most are'
            : '';
    const steps = [1, 2, 3].map((k) => ({
      s:
        'flex: 1; height: 8px; border-radius: 999px; border: 2px solid #2A2522; background: ' +
        (k <= step ? accent : '#FFFDF8') +
        ';',
    }));
    return {
      accent,
      cells,
      steps,
      step: String(step),
      title: end ? "That's the whole game" : texts[step][0],
      say: end ? 'Everything in Block A works this way: decide it yourself, or hand it off.' : texts[step][1],
      showHand: !end && step >= 2,
      handStyle:
        'all: unset; height: 54px; box-sizing: border-box; border-radius: 999px; border: 3px dashed #2A2522; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 18px; font-weight: 600; cursor: pointer; background: ' +
        (step === 2 ? accent : '#FFFDF8') +
        ';' +
        (step === 2 ? ' box-shadow: 3px 4px 0 #2A2522;' : ''),
      handOff: () => {
        const i = pick(b, 'X', 'O', [0, 2, 6, 8, 4, 1, 3, 5, 7]);
        if (i !== undefined) move(i, 'her');
      },
      over: !!end,
      result,
      again: () => this.setState({ b: Array(9).fill('.'), who: Array(9).fill(null), mine: 0 }),
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
              Decide or Hand Off
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Tutorial · tic-tac-toe with Kemi
            </span>
          </div>

          <ScreenLink
            href="Play.dc.html"
            style={{
              height: '40px',
              boxSizing: 'border-box',
              border: '2.5px solid #2A2522',
              borderRadius: '999px',
              background: '#FFFDF8',
              display: 'flex',
              alignItems: 'center',
              padding: '0 14px',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '15px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Skip
          </ScreenLink>
        </header>

        {/* Progress */}

        <div
          aria-label={`Step ${vals.step} of 3`}
          style={{ margin: '4px 20px 0', display: 'flex', gap: '6px' }}
        >
          {vals.steps.map((s, $index) => (
            <span key={$index} style={css(s.s)} />
          ))}
        </div>

        {/* Coach card */}

        <section
          aria-live="polite"
          style={{
            margin: '14px 20px 0',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: '#FDE3C8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <svg
            width="64"
            height="60"
            viewBox="0 0 200 184"
            role="img"
            aria-label="Amara"
            style={{ flex: 'none' }}
          >
            <path
              d="M30 186 C30 148 62 130 100 130 C138 130 170 148 170 186 Z"
              fill={vals.accent}
              stroke="#2A2522"
              strokeWidth="6"
              strokeLinejoin="round"
            />

            <circle cx="56" cy="40" r="22" fill="#2A2522" />
            <circle cx="144" cy="40" r="22" fill="#2A2522" />

            <circle cx="100" cy="80" r="46" fill="#7A4A2E" stroke="#2A2522" strokeWidth="6" />

            <path
              d="M54 78 C52 44 74 30 100 30 C126 30 148 44 146 78 C138 60 120 54 100 54 C80 54 62 60 54 78 Z"
              fill="#2A2522"
            />

            <ellipse cx="82" cy="85" rx="5" ry="7" fill="#2A2522" />
            <ellipse cx="118" cy="85" rx="5" ry="7" fill="#2A2522" />

            <path
              d="M84 104 Q100 114 116 104"
              fill="none"
              stroke="#2A2522"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>

          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '18px',
                fontWeight: '700',
                lineHeight: '1.15',
              }}
            >
              {vals.title}
            </span>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#4A433B', lineHeight: '1.3' }}>
              {vals.say}
            </span>
          </div>
        </section>

        {/* Board: every X carries who placed it */}

        <section
          aria-label="Tic-tac-toe board"
          style={{
            margin: '18px auto 0',
            flex: 'none',
            width: '312px',
            height: '312px',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: '#2A2522',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '5px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: '5px',
          }}
        >
          {vals.cells.map((q, $index) => (
            <button key={$index} type="button" aria-label={q.label} onClick={q.go} style={css(q.s)}>
              <span style={css(q.markStyle)}>{q.m}</span>

              {q.byYou ? (
                <span
                  title="You decided"
                  style={{
                    position: 'absolute',
                    right: '6px',
                    bottom: '6px',
                    width: '24px',
                    height: '24px',
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

              {q.byHer ? (
                <span
                  title="Amara decided"
                  style={{
                    position: 'absolute',
                    right: '6px',
                    bottom: '6px',
                    width: '24px',
                    height: '24px',
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
            </button>
          ))}
        </section>

        <div style={{ flex: '1' }} />

        {/* Actions */}

        <section style={{ margin: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {vals.showHand ? (
            <button type="button" onClick={vals.handOff} style={css(vals.handStyle)}>
              Hand Off to Amara
            </button>
          ) : null}

          {vals.over ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span
                style={{
                  textAlign: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '20px',
                  fontWeight: '700',
                }}
              >
                {vals.result}
              </span>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={vals.again}
                  style={{
                    all: 'unset',
                    flex: '1',
                    height: '50px',
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
                  Again
                </button>

                <ScreenLink
                  href="Play.dc.html"
                  style={{
                    flex: '1',
                    height: '50px',
                    boxSizing: 'border-box',
                    borderRadius: '999px',
                    background: vals.accent,
                    border: '3px solid #2A2522',
                    boxShadow: '3px 4px 0 #2A2522',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '17px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    color: '#2A2522',
                  }}
                >
                  Go to Play
                </ScreenLink>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    );
  }
}
