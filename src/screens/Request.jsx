// Request detail
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Request extends Screen {
  static title = 'Request';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const votes = this.state.votes ?? {};
    const mineA = this.state.mineA ?? null;
    const draft = this.state.draft ?? '';
    const vbtn = (on) =>
      'all: unset; cursor: pointer; height: 30px; padding: 0 11px; box-sizing: border-box; border: 2px solid #2A2522; border-radius: 999px; font-size: 13px; font-weight: 800; display: flex; align-items: center; background: ' +
      (on ? accent : '#FFFDF8') +
      ';';
    const vote = (id, dir) => this.setState({ votes: { ...votes, [id]: votes[id] === dir ? null : dir } });
    const base = [
      {
        id: 'a1',
        name: 'Musa',
        tone: '#8B5A3C',
        text: 'If it passes, your landlord can only raise your rent by 10% each season. So 120 can go to 132 at most.',
        up: 9,
        down: 0,
      },
      {
        id: 'a2',
        name: 'Ifeoma',
        tone: '#A8714A',
        text: 'It only covers rent, not bills. And it starts next season, not straight away.',
        up: 6,
        down: 1,
      },
      {
        id: 'a3',
        name: 'Tunde',
        tone: '#5A3520',
        text: 'It will never pass, the council always sides with owners.',
        up: 2,
        down: 5,
      },
      {
        id: 'a4',
        name: 'Bayo',
        tone: '#6B4027',
        text: 'Read the council notice in the lobby, it has a table.',
        up: 1,
        down: 2,
      },
    ];
    const all = mineA
      ? base.concat([
          {
            id: 'me',
            name: mineA.by === 'her' ? 'Amara' : 'Amara (you)',
            tone: '#7A4A2E',
            text: mineA.text,
            up: 0,
            down: 0,
            by: mineA.by,
          },
        ])
      : base;
    const scored = all
      .map((a) => {
        const v = votes[a.id];
        return { ...a, v, upN: a.up + (v === 'up' ? 1 : 0), downN: a.down + (v === 'down' ? 1 : 0) };
      })
      .sort((x, y) => y.upN - x.upN);
    const answers = scored.map((a, i) => ({
      name: a.name,
      text: a.text,
      up: String(a.upN),
      down: String(a.downN),
      short: i < 2 && a.upN > a.downN,
      byYou: a.by === 'you',
      byHer: a.by === 'her',
      face:
        'width: 26px; height: 26px; flex: none; box-sizing: border-box; border-radius: 50%; border: 2.5px solid #2A2522; background: ' +
        a.tone +
        ';',
      card:
        'border: 3px solid #2A2522; border-radius: 18px; background: #FFFDF8; padding: 10px 12px; display: flex; flex-direction: column; gap: 8px;' +
        (a.by
          ? ' box-shadow: 3px 4px 0 #2A2522; outline: 3px solid ' + accent + '; outline-offset: 2px;'
          : ' box-shadow: 3px 4px 0 #2A2522;'),
      upStyle: vbtn(a.v === 'up'),
      downStyle: vbtn(a.v === 'down'),
      voteUp: () => vote(a.id, 'up'),
      voteDown: () => vote(a.id, 'down'),
    }));
    const qv = votes.q;
    return {
      accent,
      answers,
      draft,
      countLabel: answers.length + ' answers',
      qUpN: String(11 + (qv === 'up' ? 1 : 0)),
      qDownN: String(qv === 'down' ? 1 : 0),
      qUpStyle: vbtn(qv === 'up'),
      qDownStyle: vbtn(qv === 'down'),
      qUp: () => vote('q', 'up'),
      qDown: () => vote('q', 'down'),
      canAnswer: !mineA,
      answered: !!mineA,
      doneText: mineA
        ? (mineA.by === 'her' ? 'Amara answered for you' : 'Your answer is in') + ' · Kemi picks by Sat'
        : '',
      typing: (e) => this.setState({ draft: e.target.value }),
      send: () => {
        if (draft.trim()) this.setState({ mineA: { by: 'you', text: draft.trim() }, draft: '' });
      },
      handOff: () =>
        this.setState({ mineA: { by: 'her', text: 'If it passes, your rent can only go up 10% a season.' } }),
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
            href="GigExchange.dc.html"
            aria-label="Back to the Gig Exchange"
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
              Request
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Gig Exchange · open until Sat
            </span>
          </div>
        </header>

        <div
          className="rq-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            padding: '6px 20px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* The question */}

          <section
            aria-label="Question"
            style={{
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#FDE3C8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                aria-hidden="true"
                style={{
                  width: '30px',
                  height: '30px',
                  flex: 'none',
                  boxSizing: 'border-box',
                  borderRadius: '50%',
                  border: '2.5px solid #2A2522',
                  background: '#A8714A',
                }}
              />

              <span
                style={{
                  flex: '1',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                Kemi asks
              </span>

              <span
                aria-label="Reward 15 Zael, held until Kemi picks an answer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: '13px',
                  fontWeight: '800',
                  background: '#F2CE6E',
                  border: '2px solid #2A2522',
                  borderRadius: '999px',
                  padding: '1px 9px',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M7 3 H17 V9 A5 5 0 0 1 7 9 Z M12 14 V18 M8 21 H16 L15 18 H9 Z"
                    fill="#FFFDF8"
                    stroke="#2A2522"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                  />
                </svg>
                Reward
                <svg
                  width="7"
                  height="10"
                  viewBox="0 0 30 40"
                  aria-hidden="true"
                  style={{ marginLeft: '2px' }}
                >
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
                15
              </span>
            </div>

            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '20px',
                fontWeight: '600',
                lineHeight: '1.2',
              }}
            >
              Who understands the rent cap rules? Explain it simply please
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button type="button" aria-label="Vote up" onClick={vals.qUp} style={css(vals.qUpStyle)}>
                ▲ <span>{vals.qUpN}</span>
              </button>

              <button type="button" aria-label="Vote down" onClick={vals.qDown} style={css(vals.qDownStyle)}>
                ▼ <span>{vals.qDownN}</span>
              </button>

              <span
                style={{
                  flex: '1',
                  textAlign: 'right',
                  fontSize: '12.5px',
                  fontWeight: '800',
                  color: '#5E564D',
                }}
              >
                Kemi picks the best answer
              </span>
            </div>
          </section>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
              {vals.countLabel}
            </span>

            <span
              style={{ flex: '1', height: '3px', borderRadius: '2px', background: '#2A2522', opacity: '.15' }}
            />

            <span style={{ fontSize: '12px', fontWeight: '800', color: '#5E564D' }}>Most up votes first</span>
          </div>

          {/* Answers */}

          {vals.answers.map((a, $index) => (
            <div key={$index} style={css(a.card)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span aria-hidden="true" style={css(a.face)} />

                <span
                  style={{
                    flex: '1',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '15px',
                    fontWeight: '600',
                  }}
                >
                  {a.name}
                </span>

                {a.byYou ? (
                  <span
                    title="You wrote this"
                    style={{
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
                    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
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

                {a.byHer ? (
                  <span
                    title="Amara wrote this"
                    style={{
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
                    <svg width="14" height="14" viewBox="0 0 40 40" aria-hidden="true">
                      <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                      <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                      <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                    </svg>
                  </span>
                ) : null}

                {a.short ? (
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: '800',
                      letterSpacing: '.05em',
                      background: '#8FC1A9',
                      border: '2px solid #2A2522',
                      borderRadius: '999px',
                      padding: '0 7px',
                    }}
                  >
                    SHORTLISTED
                  </span>
                ) : null}
              </div>

              <span style={{ fontSize: '14.5px', fontWeight: '600', lineHeight: '1.4' }}>{a.text}</span>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button type="button" aria-label="Vote up" onClick={a.voteUp} style={css(a.upStyle)}>
                  ▲ <span>{a.up}</span>
                </button>

                <button type="button" aria-label="Vote down" onClick={a.voteDown} style={css(a.downStyle)}>
                  ▼ <span>{a.down}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Your answer */}

        <section
          style={{
            margin: '0 20px 24px',
            flex: 'none',
            border: '3px solid #2A2522',
            borderRadius: '20px',
            background: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {vals.canAnswer ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="text"
                aria-label="Your answer"
                placeholder="Write your answer…"
                value={vals.draft}
                onChange={vals.typing}
                style={{
                  flex: '1',
                  minWidth: '0',
                  height: '42px',
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
                  width: '42px',
                  height: '42px',
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

              <button
                type="button"
                onClick={vals.handOff}
                style={{
                  all: 'unset',
                  height: '42px',
                  padding: '0 12px',
                  boxSizing: 'border-box',
                  borderRadius: '999px',
                  background: '#FFFDF8',
                  border: '2.5px dashed #2A2522',
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
            </div>
          ) : null}

          {vals.answered ? (
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}>
              {vals.doneText}
            </span>
          ) : null}
        </section>
      </div>
    );
  }
}
