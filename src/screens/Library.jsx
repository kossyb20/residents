// Library
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Library extends Screen {
  static title = 'Library';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const pick = this.state.pick ?? null;
    const pickBy = this.state.pickBy ?? null;
    const RIGHT = 1;
    const O = ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'];
    const opts = O.map((t, i) => {
      let bg = '#FFFDF8';
      if (pick !== null) {
        if (i === RIGHT) bg = '#8FC1A9';
        else if (i === pick) bg = '#F2B8AE';
      }
      return {
        t,
        label: t + (pick !== null && i === RIGHT ? ', correct' : ''),
        s:
          'all: unset; min-height: 42px; box-sizing: border-box; padding: 4px 10px; border: 2.5px solid #2A2522; border-radius: 12px; display: flex; align-items: center; justify-content: center; text-align: center; font-family: Fredoka, sans-serif; font-size: 15px; font-weight: 600; background: ' +
          bg +
          ';' +
          (pick === null ? ' cursor: pointer;' : ''),
        go: () => {
          if (pick === null) this.setState({ pick: i, pickBy: 'you' });
        },
      };
    });
    const right = pick === RIGHT;
    const night = this.state.night ?? null;
    const BK = [
      ['Market day', '#8FC1A9', 'Story by Amara', true],
      ['The stair song', '#F2CE6E', 'Draft', false],
      ['Floor four at night', '#D9C9E8', 'Poem by Amara', true],
      ['Generator blues', '#F2B8AE', 'Poem by Bayo', false],
      ['Letters to the council', '#CFE3F4', 'Letters by Kemi', false],
      ['The long queue', '#FDE3C8', 'Story by Ifeoma', false],
      ['Rooftop', '#E3F0DF', 'Story by Musa', false],
    ].filter((b) => b[2] !== 'Draft');
    const heights = [128, 112, 136, 120, 132, 116];
    const books = BK.map(([title, color, by, mine], i) => ({
      title,
      label: title + ', ' + by,
      s:
        'position: relative; flex: none; width: 38px; height: ' +
        heights[i % heights.length] +
        'px; box-sizing: border-box; border: 2.5px solid #2A2522; border-bottom: none; border-radius: 5px 5px 0 0; background: ' +
        color +
        '; display: flex; align-items: center; justify-content: center; padding: 8px 0; text-decoration: none; color: #2A2522;',
      badge: mine
        ? 'position: absolute; top: 6px; left: 50%; width: 10px; height: 10px; margin-left: -5px; border-radius: 50%; background: #7A4A2E; border: 2px solid #2A2522;'
        : 'display: none;',
    }));
    const votes = this.state.votes ?? {};
    const vbtn = (on) =>
      'all: unset; cursor: pointer; height: 26px; padding: 0 9px; box-sizing: border-box; border: 2px solid #2A2522; border-radius: 999px; font-size: 12px; font-weight: 800; display: flex; align-items: center; background: ' +
      (on ? accent : '#FFFDF8') +
      ';';
    const papers = [
      {
        id: 'p1',
        title: 'Copper keeps the cold: a cheaper cooling coil',
        by: 'Zainab · Kora Labs · cycle 9',
        cites: 12,
        rep: 'Replicated twice',
        ok: true,
        up: 9,
        down: 0,
      },
      {
        id: 'p2',
        title: 'Does shade speed up rice? Two seasons of trials',
        by: 'Chidi and Musa · building project · cycle 7',
        cites: 8,
        rep: 'Not yet replicated',
        ok: false,
        up: 5,
        down: 1,
      },
    ].map((p) => {
      const v = votes[p.id];
      return {
        title: p.title,
        by: p.by,
        cites: String(p.cites),
        rep: p.rep,
        repStyle:
          'font-size: 12px; font-weight: 800; border: 2px solid #2A2522; border-radius: 999px; padding: 0 8px; background: ' +
          (p.ok ? '#8FC1A9' : '#F2CE6E') +
          ';',
        up: String(p.up + (v === 'up' ? 1 : 0)),
        down: String(p.down + (v === 'down' ? 1 : 0)),
        upStyle: vbtn(v === 'up'),
        downStyle: vbtn(v === 'down'),
        voteUp: () => this.setState({ votes: { ...votes, [p.id]: v === 'up' ? null : 'up' } }),
        voteDown: () => this.setState({ votes: { ...votes, [p.id]: v === 'down' ? null : 'down' } }),
      };
    });
    return {
      accent,
      opts,
      books,
      papers,
      unanswered: pick === null,
      answered: pick !== null,
      quizResult:
        (pickBy === 'her' ? 'Amara answered: ' : 'You answered: ') +
        O[pick ?? 0] +
        (right ? '. Right! Biology knowledge +1' : ". Not quite. It's carbon dioxide."),
      quizHand: () => this.setState({ pick: RIGHT, pickBy: 'her' }),
      nightOpen: !night,
      nightDone: !!night,
      nightText:
        night === 'her' ? 'Amara will play tonight on her own · Chemistry 71' : "You're in · 9 pm, seat 6",
      join: () => this.setState({ night: 'you' }),
      nightHand: () => this.setState({ night: 'her' }),
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
              Library
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Floor 3 · Mind quarter
            </span>
          </div>

          <span
            role="img"
            aria-label="8 residents here now"
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
              padding: '0 10px 0 6px',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '14px',
              fontWeight: '700',
            }}
          >
            <span
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '2px solid #2A2522',
                background: '#A8714A',
              }}
            />
            <span
              style={{
                width: '18px',
                height: '18px',
                marginLeft: '-10px',
                borderRadius: '50%',
                border: '2px solid #2A2522',
                background: '#6B4027',
              }}
            />
            8 here
          </span>
        </header>

        <div
          className="li-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            padding: '6px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Quick round: one real-world science question */}

          <section
            aria-label="Quick round"
            style={{
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  letterSpacing: '.06em',
                  background: '#E3F0DF',
                  border: '2px solid #2A2522',
                  borderRadius: '999px',
                  padding: '0 8px',
                }}
              >
                BIOLOGY · QUICK ROUND
              </span>

              <span style={{ flex: '1' }} />

              <span style={{ fontSize: '12px', fontWeight: '800', color: '#5E564D' }}>set by the Admin</span>
            </div>

            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '18px',
                fontWeight: '600',
                lineHeight: '1.2',
              }}
            >
              Which gas do plants take in to make their food?
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {vals.opts.map((o, $index) => (
                <button key={$index} type="button" onClick={o.go} aria-label={o.label} style={css(o.s)}>
                  {o.t}
                </button>
              ))}
            </div>

            {vals.unanswered ? (
              <button
                type="button"
                onClick={vals.quizHand}
                style={{
                  all: 'unset',
                  alignSelf: 'flex-start',
                  height: '36px',
                  padding: '0 14px',
                  boxSizing: 'border-box',
                  borderRadius: '999px',
                  background: '#FFFDF8',
                  border: '2.5px dashed #2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Hand Off
              </button>
            ) : null}

            {vals.answered ? (
              <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#2E4A3B' }}>
                {vals.quizResult}
              </span>
            ) : null}
          </section>

          {/* Tonight's quiz night */}

          <section
            aria-label="Quiz night"
            style={{
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#2F3E5C',
              color: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 A9 9 0 1 0 12.01 3 Z" fill="#F2CE6E" stroke="#2A2522" strokeWidth="1.8" />
                <path
                  d="M9.5 9.5 Q9.5 7 12 7 Q14.5 7 14.5 9.5 Q14.5 11.5 12 12 V14 M12 16.5 V17"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
                  Chemistry quiz night
                </span>

                <span style={{ fontSize: '13px', fontWeight: '800', opacity: '.85' }}>
                  Tonight · 9 pm · 10 questions · timed
                </span>
              </div>
            </div>

            <span style={{ fontSize: '12.5px', fontWeight: '700', opacity: '.85', lineHeight: '1.3' }}>
              Scores feed knowledge in Chemistry, which helps research when you hand it off.
            </span>

            {vals.nightOpen ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={vals.join}
                  style={{
                    all: 'unset',
                    flex: '1',
                    height: '40px',
                    boxSizing: 'border-box',
                    borderRadius: '999px',
                    background: vals.accent,
                    border: '2.5px solid #2A2522',
                    color: '#2A2522',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Join
                </button>

                <button
                  type="button"
                  onClick={vals.nightHand}
                  style={{
                    all: 'unset',
                    flex: '1',
                    height: '40px',
                    boxSizing: 'border-box',
                    borderRadius: '999px',
                    background: '#FFFDF8',
                    border: '2.5px dashed #2A2522',
                    color: '#2A2522',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Hand Off
                </button>
              </div>
            ) : null}

            {vals.nightDone ? (
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#F2CE6E',
                }}
              >
                {vals.nightText}
              </span>
            ) : null}
          </section>

          {/* The writing contest */}

          <ScreenLink
            href="Writing.dc.html"
            aria-label="Writing contest: 100-word story, 14 entries, closes Sunday"
            style={{
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#5B3D62',
              color: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
            }}
          >
            <svg width="38" height="38" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M7 3 H17 V9 A5 5 0 0 1 7 9 Z M7 5 H3 Q3 10 7 10 M17 5 H21 Q21 10 17 10 M12 14 V18 M8 21 H16 L15 18 H9 Z"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>

            <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '700' }}>
                100-word story contest
              </span>

              <span style={{ fontSize: '13px', fontWeight: '800', opacity: '.85' }}>
                14 entries · closes Sun · must use "rain"
              </span>
            </div>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F2CE6E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </ScreenLink>

          {/* Shelf of residents' published writing */}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
              On the shelf
            </span>

            <span
              style={{ flex: '1', height: '3px', borderRadius: '2px', background: '#2A2522', opacity: '.15' }}
            />

            <span style={{ fontSize: '12px', fontWeight: '800', color: '#5E564D' }}>by residents</span>
          </div>

          <section
            aria-label="Shelf"
            style={{
              border: '3px solid #2A2522',
              borderRadius: '16px',
              background: '#C08A5B',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '10px 10px 0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '6px',
                height: '150px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                borderBottom: '8px solid #8E4129',
                padding: '0 2px',
              }}
            >
              {vals.books.map((b, $index) => (
                <ScreenLink key={$index} href="WorkDetail.dc.html" aria-label={b.label} style={css(b.s)}>
                  <span
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '12.5px',
                      fontWeight: '600',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      maxHeight: '118px',
                    }}
                  >
                    {b.title}
                  </span>
                  <span style={css(b.badge)} />
                </ScreenLink>
              ))}
            </div>

            <div style={{ height: '10px' }} />
          </section>

          {/* Published research papers */}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
              Papers
            </span>

            <span
              style={{ flex: '1', height: '3px', borderRadius: '2px', background: '#2A2522', opacity: '.15' }}
            />
          </div>

          {vals.papers.map((p, $index) => (
            <div
              key={$index}
              style={{
                border: '3px solid #2A2522',
                borderRadius: '16px',
                background: '#FFFDF8',
                boxShadow: '3px 4px 0 #2A2522',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
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

              <span style={{ fontSize: '12px', fontWeight: '800', color: '#5E564D' }}>{p.by}</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '800',
                    background: '#F5EFE5',
                    border: '2px solid #2A2522',
                    borderRadius: '999px',
                    padding: '0 8px',
                  }}
                >
                  {p.cites} cites
                </span>

                <span style={css(p.repStyle)}>{p.rep}</span>

                <span style={{ flex: '1' }} />

                <button type="button" aria-label="Vote up" onClick={p.voteUp} style={css(p.upStyle)}>
                  ▲ <span>{p.up}</span>
                </button>

                <button type="button" aria-label="Vote down" onClick={p.voteDown} style={css(p.downStyle)}>
                  ▼ <span>{p.down}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
