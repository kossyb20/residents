// Agenda item
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class AgendaItem extends Screen {
  static title = 'Agenda item';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const item = this.props.item ?? 'rent';
    const votes = this.state.votes ?? {};
    const said = this.state.said ?? {}; // item -> { who, text }
    const draft = this.state.draft ?? '';

    const ITEMS = {
      rent: {
        num: '1',
        tab: 'Rent cap',
        kicker: 'ITEM 1 · MOTION BY CLLR IFE',
        title: 'Cap rent rises at 10% a season',
        headBg: '#8E4129',
        body: 'No room’s rent could rise by more than 10% in a single season. Rents on floors 3 to 6 rose twice this season. If it passes, the cap starts next season.',
        links: [
          ['Predict · 41% yes', 'TradingFloor.dc.html', '#F2CE6E'],
          ['Full story', 'Story.dc.html', '#FFFDF8'],
        ],
        seats: [
          ['Ife', 'for'],
          ['Sade', 'for'],
          ['Tunde', 'against'],
          ['Bisi', 'undecided'],
          ['Femi', 'undecided'],
        ],
        comments: [
          {
            id: 'r1',
            name: 'Mama Ngozi',
            ini: 'N',
            text: 'My rent went up twice since harvest. Pass it.',
            up: 31,
            down: 4,
          },
          {
            id: 'r2',
            name: 'Chidi',
            ini: 'C',
            text: 'Landlords will just stop fixing rooms.',
            up: 12,
            down: 9,
          },
          {
            id: 'r3',
            name: 'Zainab',
            ini: 'Z',
            text: 'Ten percent is still a lot. Make it five.',
            up: 8,
            down: 6,
          },
        ],
        herLine: 'I rent on floor 4. Two rises this season. Please vote yes.',
      },
      lift: {
        num: '2',
        tab: 'Lift repair',
        kicker: 'ITEM 2 · REPORT AND VOTE',
        title: 'Top up the lift repair from the treasury',
        headBg: '#2F3E5C',
        body: 'The levy has raised 6,200. The fastest quote is 9,000. The motion moves 2,800 from the treasury so work starts this week, if the lobby fund falls short tonight.',
        links: [
          ['Treasury · 9,400', 'Treasury.dc.html', '#E3F0DF'],
          ['Lift fund', 'Lobby.dc.html', '#FFFDF8'],
        ],
        seats: [
          ['Ife', 'for'],
          ['Sade', 'for'],
          ['Tunde', 'for'],
          ['Bisi', 'against'],
          ['Femi', 'undecided'],
        ],
        comments: [
          { id: 'l1', name: 'Kemi', ini: 'K', text: 'Four days of stairs. Just fix it.', up: 44, down: 2 },
          {
            id: 'l2',
            name: 'Femi',
            ini: 'F',
            text: 'Wait for the fund first. The treasury is for emergencies.',
            up: 10,
            down: 15,
          },
        ],
        herLine: 'Fix it this week. I take the stairs to work every day.',
      },
    };
    const it = ITEMS[item];

    const links = it.links.map(([name, href, bg]) => ({ name, href, bg }));

    const POS = {
      for: ['FOR', '#2F6B5F', '#FFFDF8'],
      against: ['AGAINST', '#C8553D', '#FFFDF8'],
      undecided: ['UNSURE', '#FFFDF8', '#2A2522'],
    };
    const seats = it.seats.map(([name, pos]) => {
      const [label, bg, fg] = POS[pos];
      return {
        name,
        ini: name[0],
        pos: label,
        label: 'Councillor ' + name + ': ' + pos,
        s:
          'box-sizing: border-box; border: 2.5px ' +
          (pos === 'undecided' ? 'dashed' : 'solid') +
          ' #2A2522; border-radius: 14px; background: #FFFDF8; padding: 7px 2px 6px; display: flex; flex-direction: column; align-items: center; gap: 4px;',
        face:
          'width: 32px; height: 32px; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 50%; background: ' +
          (pos === 'for' ? '#E3F0DF' : pos === 'against' ? '#F7D6D6' : '#EFE4CF') +
          '; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 14px; font-weight: 700;',
        chip:
          'border: 1.5px solid #2A2522; border-radius: 999px; padding: 0 4px; font-size: 8.5px; font-weight: 800; letter-spacing: .03em; background: ' +
          bg +
          '; color: ' +
          fg +
          ';',
      };
    });
    const forCount = it.seats.filter(([, p]) => p === 'for').length;
    const needs = forCount >= 3 ? 'Has the 3 votes it needs' : 'Needs 3 of 5 · has ' + forCount;

    const PEN = 'M4 20 L8 19 L19 8 L16 5 L5 16 Z M14 7 L17 10';
    const FACE = 'M12 3 A9 9 0 1 0 12.01 3 M9 10 V11 M15 10 V11 M8.5 15 Q12 18 15.5 15';
    const mine = said[item];
    const list = it.comments.concat(
      mine
        ? [
            {
              id: item + '-me',
              name: mine.who === 'her' ? 'Amara' : 'You',
              ini: '',
              text: mine.text,
              up: 0,
              down: 0,
              who: mine.who,
            },
          ]
        : [],
    );
    const vs = (on) =>
      'all: unset; cursor: pointer; padding: 0 4px; border-radius: 6px;' +
      (on ? ' background: ' + accent + ';' : '');
    const comments = list.map((m) => {
      const v = votes[m.id];
      return {
        name: m.name,
        text: m.text,
        ini: m.ini,
        ups: String(m.up + (v === 'up' ? 1 : 0)),
        downs: String(m.down + (v === 'down' ? 1 : 0)),
        up: () => this.setState({ votes: { ...votes, [m.id]: v === 'up' ? null : 'up' } }),
        down: () => this.setState({ votes: { ...votes, [m.id]: v === 'down' ? null : 'down' } }),
        upStyle: vs(v === 'up'),
        downStyle: vs(v === 'down'),
        mark: m.who === 'her' ? FACE : PEN,
        markStyle: m.who ? '' : 'display: none;',
        iniStyle: m.who ? 'display: none;' : '',
        face:
          'width: 26px; height: 26px; flex: none; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 12px; font-weight: 700;' +
          (m.who === 'her'
            ? ' background: #EFE4CF; border: 2px dashed #2A2522;'
            : m.who === 'you'
              ? ' background: #CFE3F4; border: 2px solid #2A2522;'
              : ' background: #FDE3C8; border: 2px solid #2A2522;'),
      };
    });

    return {
      accent,
      links,
      seats,
      needs,
      comments,
      draft,
      kicker: it.kicker,
      title: it.title,
      body: it.body,
      headBg: it.headBg,
      canSpeak: !mine,
      typing: (e) => this.setState({ draft: e.target.value }),
      post: () => {
        if (draft.trim())
          this.setState({ said: { ...said, [item]: { who: 'you', text: draft.trim() } }, draft: '' });
      },
      handOff: () =>
        this.setState({ said: { ...said, [item]: { who: 'her', text: it.herLine } }, draft: '' }),
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
        <header style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px 10px' }}>
          <ScreenLink
            href="CouncilAgenda.dc.html"
            aria-label="Back to the agenda"
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
              Agenda item
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Item 1 of 3 · Thursday 9 am
            </span>
          </div>
        </header>

        <div
          className="ag-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '2px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* The motion */}

          <section
            aria-label="Motion"
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '22px',
              background: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: vals.headBg,
                color: '#FFFDF8',
                padding: '11px 14px',
                borderBottom: '3px solid #2A2522',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
              }}
            >
              <span style={{ fontSize: '11.5px', fontWeight: '800', letterSpacing: '.05em', opacity: '.9' }}>
                {vals.kicker}
              </span>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '21px',
                  fontWeight: '700',
                  lineHeight: '1.1',
                }}
              >
                {vals.title}
              </span>
            </div>

            <div style={{ padding: '11px 14px 13px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', lineHeight: '1.45' }}>
                {vals.body}
              </p>

              <ScreenLink
                href="Constitution.dc.html"
                style={{
                  alignSelf: 'flex-start',
                  boxSizing: 'border-box',
                  border: '2px solid #2A2522',
                  borderRadius: '999px',
                  background: '#F3E1B4',
                  padding: '3px 10px 3px 6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: '800',
                  textDecoration: 'none',
                }}
              >
                <svg width="20" height="16" viewBox="0 0 64 50" aria-hidden="true">
                  <rect
                    x="10"
                    y="4"
                    width="44"
                    height="9"
                    rx="4.5"
                    fill="#C08A5B"
                    stroke="#2A2522"
                    strokeWidth="4"
                  />
                  <path d="M14 13 H50 V37 H14 Z" fill="#FBF1D6" stroke="#2A2522" strokeWidth="4" />
                  <rect
                    x="10"
                    y="37"
                    width="44"
                    height="9"
                    rx="4.5"
                    fill="#C08A5B"
                    stroke="#2A2522"
                    strokeWidth="4"
                  />
                </svg>
                Checked against the Constitution · fits
              </ScreenLink>

              <div style={{ display: 'flex', gap: '8px' }}>
                {vals.links.map((l, $index) => (
                  <ScreenLink
                    key={$index}
                    href={l.href}
                    style={{
                      flex: '1',
                      height: '36px',
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '12px',
                      background: l.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '14px',
                      fontWeight: '600',
                      textDecoration: 'none',
                    }}
                  >
                    {l.name}
                  </ScreenLink>
                ))}
              </div>
            </div>
          </section>

          {/* Where the five councillors stand */}

          <section
            aria-label="Councillors"
            style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
                Where they stand
              </span>

              <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#5E564D' }}>{vals.needs}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '6px' }}>
              {vals.seats.map((c, $index) => (
                <div key={$index} role="img" aria-label={c.label} style={css(c.s)}>
                  <span style={css(c.face)}>{c.ini}</span>

                  <span style={{ fontSize: '11.5px', fontWeight: '800', lineHeight: '1' }}>{c.name}</span>

                  <span style={css(c.chip)}>{c.pos}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Residents can't vote on laws, but they can speak before the vote */}

          <section
            aria-label="Public comments"
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '11px 12px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '9px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '700' }}>
                Residents speak
              </span>

              <span style={{ fontSize: '12px', fontWeight: '800', color: '#5E564D' }}>
                Read out at the session
              </span>
            </div>

            {vals.comments.map((m, $index) => (
              <div key={$index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={css(m.face)}>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2A2522"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={css(m.markStyle)}
                  >
                    <path d={m.mark} />
                  </svg>
                  <span style={css(m.iniStyle)}>{m.ini}</span>
                </span>

                <span
                  style={{
                    flex: '1',
                    minWidth: '0',
                    fontSize: '13.5px',
                    fontWeight: '600',
                    lineHeight: '1.35',
                  }}
                >
                  <b style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: '600' }}>{m.name}</b> {m.text}
                </span>

                <span
                  style={{
                    flex: 'none',
                    display: 'flex',
                    gap: '4px',
                    fontSize: '11.5px',
                    fontWeight: '800',
                    color: '#5E564D',
                  }}
                >
                  <button type="button" aria-label="Vote up" onClick={m.up} style={css(m.upStyle)}>
                    ▲<span>{m.ups}</span>
                  </button>

                  <button type="button" aria-label="Vote down" onClick={m.down} style={css(m.downStyle)}>
                    ▼<span>{m.downs}</span>
                  </button>
                </span>
              </div>
            ))}

            {vals.canSpeak ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  borderTop: '2px dashed #EFE6D7',
                  paddingTop: '9px',
                }}
              >
                <input
                  type="text"
                  aria-label="Your comment"
                  placeholder="Say your piece…"
                  value={vals.draft}
                  onChange={vals.typing}
                  style={{
                    flex: '1',
                    minWidth: '0',
                    height: '38px',
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
                  aria-label="Post"
                  onClick={vals.post}
                  style={{
                    all: 'unset',
                    width: '38px',
                    height: '38px',
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
                    height: '38px',
                    flex: 'none',
                    boxSizing: 'border-box',
                    padding: '0 12px',
                    border: '2.5px dashed #2A2522',
                    borderRadius: '999px',
                    background: '#EFE4CF',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Hand Off
                </button>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    );
  }
}
