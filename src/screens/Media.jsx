// Media
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Media extends Screen {
  static title = 'Media';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const tab = this.state.tab ?? 'paper';
    const votes = this.state.votes ?? {};
    const vbtn = (on) =>
      'all: unset; cursor: pointer; height: 28px; padding: 0 10px; box-sizing: border-box; border: 2px solid #2A2522; border-radius: 999px; font-size: 12.5px; font-weight: 800; display: flex; align-items: center; background: ' +
      (on ? accent : '#FFFDF8') +
      ';';
    const vote = (id, dir) => this.setState({ votes: { ...votes, [id]: votes[id] === dir ? null : dir } });
    const T = [
      {
        k: 'paper',
        label: 'Paper',
        fill: '#FFFDF8',
        glyph: 'M3 5 H17 V19 H5 A2 2 0 0 1 3 17 Z M17 9 H21 V17 A2 2 0 0 1 17 19 M6 9 H14 M6 13 H14',
      },
      { k: 'feed', label: 'Feed', fill: '#F7D6D6', glyph: 'M4 5 H20 V16 H11 L6 20 V16 H4 Z', badge: '5' },
      {
        k: 'notices',
        label: 'Notices',
        fill: '#F2CE6E',
        glyph: 'M5 4 H19 V20 H5 Z M12 4 V2 M8 9 H16 M8 13 H16 M8 17 H12',
      },
    ];
    const tabs = T.map((t) => ({
      label: t.label,
      glyph: t.glyph,
      fill: t.fill,
      on: tab === t.k,
      hasBadge: !!t.badge && tab !== t.k,
      badge: t.badge || '',
      s:
        'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 5px; font-family: Fredoka, sans-serif; font-size: 15px; font-weight: 600; cursor: pointer;' +
        (tab === t.k
          ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
          : ' border: 2.5px solid transparent;'),
      go: () => this.setState({ tab: t.k }),
    }));
    const cv = votes.col;
    const extra = this.state.extra ?? [];
    const draft = this.state.draft ?? '';
    const TAG = {
      win: ['Win', '#8FC1A9', 'M7 3 H17 V9 A5 5 0 0 1 7 9 Z M12 14 V18 M8 21 H16 L15 18 H9 Z'],
      gripe: ['Gripe', '#F2B8AE', 'M3 10 V14 H7 L15 19 V5 L7 10 Z'],
      rumour: ['Rumour', '#D9C9E8', 'M4 6 H20 V15 H9 L5 19 V15 H4 Z M8 10 h0.1 M12 10 h0.1 M16 10 h0.1'],
      chat: ['Chat', '#CFE3F4', 'M4 5 H20 V16 H11 L6 20 V16 H4 Z'],
      ad: ['Sponsored', '#F2CE6E', 'M4 8 H8 L16 4 V20 L8 16 H4 Z'],
    };
    const F = [
      {
        id: 'f1',
        name: 'Zainab',
        tone: '#8B5A3C',
        kind: 'win',
        text: 'Passed my first chemistry quiz night. 8 out of 10!',
        up: 12,
        down: 0,
      },
      {
        id: 'f2',
        name: 'Bayo',
        tone: '#6B4027',
        kind: 'gripe',
        text: 'Lift on floor 6 stuck again. Who is fixing it?',
        up: 9,
        down: 1,
      },
      {
        id: 'f3',
        name: 'Brightline Power',
        tone: '#E8B53A',
        kind: 'ad',
        text: 'Power cuts? Our new solar packs keep your room lit.',
        ad: true,
      },
      {
        id: 'f4',
        name: 'Ifeoma',
        tone: '#A8714A',
        kind: 'rumour',
        text: 'Heard the bank is short on reserves. Anyone else?',
        up: 3,
        down: 7,
      },
      {
        id: 'f5',
        name: 'Musa',
        tone: '#8B5A3C',
        kind: 'chat',
        text: 'Ludo Night Saturday. Who is bringing snacks?',
        up: 5,
        down: 0,
      },
    ];
    const feed = extra.concat(F).map((f) => {
      const v = votes[f.id],
        tg = TAG[f.kind];
      return {
        name: f.name,
        text: f.text,
        tag: tg[0],
        tagGlyph: tg[2],
        votable: !f.ad,
        tagStyle:
          'display: flex; align-items: center; gap: 3px; font-size: 11.5px; font-weight: 800; border: 2px solid #2A2522; border-radius: 999px; padding: 0 7px 0 4px; background: ' +
          tg[1] +
          ';',
        face:
          'width: 26px; height: 26px; flex: none; box-sizing: border-box; border-radius: ' +
          (f.ad ? '7px' : '50%') +
          '; border: 2.5px solid #2A2522; background: ' +
          f.tone +
          ';',
        card:
          'border: 3px ' +
          (f.ad ? 'dashed' : 'solid') +
          ' #2A2522; border-radius: 18px; background: #FFFDF8; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px;' +
          (f.ad ? '' : ' box-shadow: 3px 4px 0 #2A2522;'),
        up: String((f.up || 0) + (v === 'up' ? 1 : 0)),
        down: String((f.down || 0) + (v === 'down' ? 1 : 0)),
        upStyle: vbtn(v === 'up'),
        downStyle: vbtn(v === 'down'),
        voteUp: () => vote(f.id, 'up'),
        voteDown: () => vote(f.id, 'down'),
      };
    });
    const notices = [
      {
        kind: 'JOB',
        title: 'Lab technician · Kora Labs',
        chip: 'Floor 6',
        chipBg: '#CFE3F4',
        href: 'Work.dc.html',
        bg: '#CFE3F4',
        fill: '#9DB8E0',
        glyph: 'M9 3 H15 M10 3 V9 L4 19 Q3 22 6 22 H18 Q21 22 20 19 L14 9 V3',
        tilt: -1,
      },
      {
        kind: 'GIG',
        title: 'Hand out Ludo Night flyers',
        chip: '+12',
        chipBg: '#8FC1A9',
        href: 'GigExchange.dc.html',
        bg: '#FDE3C8',
        fill: '#F2CE6E',
        glyph: 'M4 4 H16 V20 H4 Z M16 8 L21 6 V18 L16 16 M7 8 H13 M7 12 H13',
        tilt: 1,
      },
      {
        kind: 'EVENT',
        title: 'Ludo Night · Saturday 8 pm',
        chip: 'Arcade',
        chipBg: '#F7D6D6',
        href: 'Play.dc.html',
        bg: '#F7D6D6',
        fill: '#FFFDF8',
        glyph: 'M5 5 H19 V19 H5 Z M9 9 h0.1 M15 15 h0.1 M12 12 h0.1',
        tilt: -0.5,
      },
      {
        kind: 'PREDICTION',
        title: 'Will the rent cap pass?',
        chip: '41% yes',
        chipBg: '#F2CE6E',
        href: 'TradingFloor.dc.html',
        bg: '#EFE4CF',
        fill: '#E8B53A',
        glyph: 'M2 7 H22 V10 A2 2 0 0 0 22 14 V17 H2 V14 A2 2 0 0 0 2 10 Z',
        tilt: 0.8,
      },
      {
        kind: 'GIG',
        title: 'Judge the 100-word story contest',
        chip: '+20',
        chipBg: '#8FC1A9',
        href: 'GigExchange.dc.html',
        bg: '#E3F0DF',
        fill: '#FFFDF8',
        glyph: 'M4 20 L5 15 L16 4 L20 8 L9 19 Z M14 6 L18 10',
        tilt: -1,
      },
    ].map((n) => ({
      ...n,
      tilt: String(n.tilt),
      label: n.kind.toLowerCase() + ': ' + n.title + ', ' + n.chip,
    }));
    const seconds = [
      {
        kicker: 'SPORT',
        kc: '#2E4A3B',
        head: 'Lions edge the Hawks 2\u20131',
        body: 'A late goal on the rooftop pitch. Lions stock rose 9% by the final whistle.',
      },
      {
        kicker: 'MARKETS',
        kc: '#2F3E5C',
        head: 'Ndura up 6% on a new seam',
        body: 'A survey of the mine points to more ore than the company had booked.',
      },
    ].map((x, i) => ({
      ...x,
      s:
        'padding: 7px ' +
        (i ? '0 0 10px' : '10px 0 0') +
        '; display: flex; flex-direction: column; gap: 3px;' +
        (i ? ' border-left: 1.5px solid #2A2522;' : ''),
    }));
    const inBrief = [
      { t: 'Kora Labs logs a result on alloy strength' },
      { t: 'Lift repair on floor 6 booked for Wednesday' },
      { t: 'Floor 4 esusu pays out to Chidi on Friday' },
    ];
    return {
      accent,
      tabs,
      goNotices: () => this.setState({ tab: 'notices' }),
      seconds,
      inBrief,
      isPaper: tab === 'paper',
      isFeed: tab === 'feed',
      isNotices: tab === 'notices',
      colUp: String(14 + (cv === 'up' ? 1 : 0)),
      colDown: String(6 + (cv === 'down' ? 1 : 0)),
      feed,
      draft,
      typing: (e) => this.setState({ draft: e.target.value }),
      post: () => {
        if (draft.trim())
          this.setState({
            extra: [
              {
                id: 'p' + extra.length,
                name: 'Amara',
                tone: '#7A4A2E',
                kind: 'chat',
                text: draft.trim(),
                up: 0,
                down: 0,
              },
            ].concat(extra),
            draft: '',
          });
      },
      notices,
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
            href="Home.dc.html"
            aria-label="Home"
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
            <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
              <path
                d="M4 15 L16 5 L28 15"
                fill="none"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 13 V27 H25 V13"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <rect
                x="13"
                y="18"
                width="6"
                height="9"
                rx="1"
                fill="#8E4129"
                stroke="#2A2522"
                strokeWidth="2"
              />
            </svg>
          </ScreenLink>

          <h1
            style={{
              flex: '1',
              margin: '0',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '26px',
              fontWeight: '700',
            }}
          >
            Media
          </h1>
        </header>

        <div
          role="tablist"
          aria-label="Media"
          style={{
            margin: '2px 20px 0',
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
          {vals.tabs.map((t, $index) => (
            <button
              key={$index}
              type="button"
              role="tab"
              aria-selected={t.on}
              onClick={t.go}
              style={css(t.s)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d={t.glyph}
                  fill={t.fill}
                  stroke="#2A2522"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.label}
              {t.hasBadge ? (
                <span
                  style={{
                    height: '18px',
                    minWidth: '18px',
                    boxSizing: 'border-box',
                    padding: '0 4px',
                    border: '2px solid #2A2522',
                    borderRadius: '999px',
                    background: '#F7D6D6',
                    fontSize: '11px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {t.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        <div
          className="md-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            padding: '14px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* PAPER */}

          {vals.isPaper ? (
            <article
              aria-label="The Block A Times, front page"
              style={{
                border: '3px solid #2A2522',
                borderRadius: '6px',
                background: '#FBF6EC',
                boxShadow: '4px 5px 0 #2A2522',
                padding: '12px 12px 10px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'stretch', gap: '8px' }}>
                <div
                  style={{
                    width: '60px',
                    flex: 'none',
                    boxSizing: 'border-box',
                    border: '2px solid #2A2522',
                    borderRadius: '6px',
                    padding: '3px 2px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9.5px',
                    fontWeight: '800',
                    letterSpacing: '.04em',
                    lineHeight: '1.1',
                    textAlign: 'center',
                  }}
                >
                  BANK RATE
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '17px',
                      fontWeight: '700',
                      letterSpacing: '0',
                    }}
                  >
                    3%
                  </span>
                </div>

                <div
                  style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '10px',
                      fontWeight: '700',
                      letterSpacing: '.3em',
                    }}
                  >
                    THE
                  </span>

                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '29px',
                      fontWeight: '700',
                      lineHeight: '.95',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Block A Times
                  </span>
                </div>

                <div
                  style={{
                    width: '60px',
                    flex: 'none',
                    boxSizing: 'border-box',
                    border: '2px solid #2A2522',
                    borderRadius: '6px',
                    padding: '3px 2px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9.5px',
                    fontWeight: '800',
                    letterSpacing: '.04em',
                    lineHeight: '1.1',
                    textAlign: 'center',
                  }}
                >
                  ROOFTOP
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '14px',
                      fontWeight: '700',
                      letterSpacing: '0',
                    }}
                  >
                    Lions 2–1
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginTop: '7px',
                  borderTop: '3px solid #2A2522',
                  borderBottom: '1.5px solid #2A2522',
                  padding: '3px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '10.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                }}
              >
                <span>No. 214</span>
                <span>TUESDAY · CYCLE 14</span>
                <span>FREE</span>
              </div>

              <span
                style={{
                  marginTop: '10px',
                  fontSize: '10.5px',
                  fontWeight: '800',
                  letterSpacing: '.1em',
                  color: '#8E4129',
                }}
              >
                CIVIC
              </span>

              <h2
                style={{
                  margin: '1px 0 4px',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '27px',
                  fontWeight: '700',
                  lineHeight: '1.02',
                }}
              >
                <ScreenLink href="Story.dc.html" style={{ color: '#2A2522', textDecoration: 'none' }}>
                  Rent cap goes to a council vote on Thursday
                </ScreenLink>
              </h2>

              <p
                style={{
                  margin: '0 0 8px',
                  fontSize: '13.5px',
                  fontWeight: '700',
                  color: '#4A433B',
                  lineHeight: '1.3',
                }}
              >
                Five councillors decide whether any room's rent may rise more than 10% a season.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 1fr',
                  gap: '10px',
                  borderTop: '1.5px solid #2A2522',
                  paddingTop: '8px',
                }}
              >
                <figure style={{ margin: '0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div
                    style={{
                      height: '118px',
                      boxSizing: 'border-box',
                      border: '2px solid #2A2522',
                      background: '#8E4129',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <svg width="150" height="100" viewBox="0 0 220 120" aria-hidden="true">
                      <path
                        d="M40 48 L110 14 L180 48 Z"
                        fill="#F2CE6E"
                        stroke="#2A2522"
                        strokeWidth="3.5"
                        strokeLinejoin="round"
                      />

                      <rect
                        x="44"
                        y="48"
                        width="132"
                        height="10"
                        fill="#FFFDF8"
                        stroke="#2A2522"
                        strokeWidth="3"
                      />

                      <path
                        d="M60 58 V106 M85 58 V106 M110 58 V106 M135 58 V106 M160 58 V106"
                        stroke="#FFFDF8"
                        strokeWidth="11"
                        strokeLinecap="round"
                      />

                      <rect
                        x="34"
                        y="106"
                        width="152"
                        height="12"
                        fill="#2F3E5C"
                        stroke="#2A2522"
                        strokeWidth="3"
                      />

                      <circle cx="110" cy="34" r="6" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2.5" />
                    </svg>
                  </div>

                  <figcaption
                    style={{ fontSize: '10.5px', fontWeight: '700', color: '#5E564D', lineHeight: '1.25' }}
                  >
                    The council hall, floor 8. Voting opens at 9 am.
                  </figcaption>
                </figure>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <p
                    style={{
                      margin: '0',
                      fontSize: '12px',
                      fontWeight: '600',
                      lineHeight: '1.4',
                      textAlign: 'justify',
                      hyphens: 'auto',
                    }}
                  >
                    The council has set Thursday's vote on a rent cap. If it passes, no room's rent may rise
                    more than 10% in a season. 31 of Block A's 38 households rent. The trading floor gives it
                    a 41% chance.
                  </p>

                  <ScreenLink
                    href="Story.dc.html"
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '12.5px',
                      fontWeight: '700',
                      color: '#8E4129',
                      textDecoration: 'none',
                    }}
                  >
                    Full story →
                  </ScreenLink>
                </div>
              </div>

              <div
                style={{
                  marginTop: '10px',
                  borderTop: '3px double #2A2522',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                }}
              >
                {vals.seconds.map((x, $index) => (
                  <div key={$index} style={css(x.s)}>
                    <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '.1em', color: x.kc }}>
                      {x.kicker}
                    </span>

                    <span
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '16px',
                        fontWeight: '700',
                        lineHeight: '1.1',
                      }}
                    >
                      {x.head}
                    </span>

                    <span
                      style={{ fontSize: '11.5px', fontWeight: '600', lineHeight: '1.35', color: '#4A433B' }}
                    >
                      {x.body}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: '8px',
                  borderTop: '1.5px solid #2A2522',
                  paddingTop: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '.1em' }}>IN BRIEF</span>

                {vals.inBrief.map((i, $index) => (
                  <span
                    key={$index}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: '700',
                      lineHeight: '1.3',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        flex: 'none',
                        background: '#2A2522',
                        transform: 'translateY(-1px)',
                      }}
                    />
                    {i.t}
                  </span>
                ))}
              </div>

              <div
                style={{
                  marginTop: '8px',
                  borderTop: '1.5px solid #2A2522',
                  paddingTop: '8px',
                  display: 'grid',
                  gridTemplateColumns: '1.3fr 1fr',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    boxSizing: 'border-box',
                    border: '2px solid #2A2522',
                    borderRadius: '6px',
                    background: '#FDE3C8',
                    padding: '6px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <span
                    style={{
                      alignSelf: 'flex-start',
                      fontSize: '9.5px',
                      fontWeight: '800',
                      letterSpacing: '.08em',
                      background: '#2A2522',
                      color: '#F2CE6E',
                      borderRadius: '999px',
                      padding: '0 6px',
                    }}
                  >
                    OPINION
                  </span>

                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '13.5px',
                      fontWeight: '700',
                      lineHeight: '1.1',
                    }}
                  >
                    A rent cap protects the people already inside
                  </span>

                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '10.5px',
                      fontWeight: '800',
                      color: '#5E564D',
                    }}
                  >
                    <span
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        border: '1.5px solid #2A2522',
                        background: '#A8714A',
                      }}
                    />
                    Kemi · ▲<span>{vals.colUp}</span> ▼<span>{vals.colDown}</span>
                  </span>
                </div>

                <div
                  aria-label="Advert"
                  style={{
                    boxSizing: 'border-box',
                    border: '2px dashed #2A2522',
                    borderRadius: '6px',
                    background: '#FFFDF8',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '9px', fontWeight: '800', letterSpacing: '.08em' }}>ADVERT</span>

                  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M3 11 H21 A9 9 0 0 1 3 11 Z M9 7 Q8 5 10 3 M14 7 Q13 5 15 3"
                      fill="#E59A6B"
                      stroke="#2A2522"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '12px',
                      fontWeight: '700',
                      lineHeight: '1.1',
                    }}
                  >
                    Sabi Foods rice, half price
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginTop: '8px',
                  borderTop: '3px solid #2A2522',
                  paddingTop: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: '800',
                }}
              >
                <span style={{ letterSpacing: '.08em' }}>INSIDE</span>

                <button
                  type="button"
                  onClick={vals.goNotices}
                  style={{ all: 'unset', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Notices
                </button>
              </div>
            </article>
          ) : null}

          {/* FEED */}

          {vals.isFeed ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="text"
                  aria-label="Post to the feed"
                  placeholder="Say something to Block A…"
                  value={vals.draft}
                  onChange={vals.typing}
                  style={{
                    flex: '1',
                    minWidth: '0',
                    height: '44px',
                    boxSizing: 'border-box',
                    border: '3px solid #2A2522',
                    borderRadius: '999px',
                    background: '#FFFDF8',
                    padding: '0 14px',
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: '14.5px',
                    fontWeight: '700',
                    color: '#2A2522',
                    outline: 'none',
                    boxShadow: '3px 4px 0 #2A2522',
                  }}
                />

                <button
                  type="button"
                  aria-label="Post"
                  onClick={vals.post}
                  style={{
                    all: 'unset',
                    width: '44px',
                    height: '44px',
                    flex: 'none',
                    boxSizing: 'border-box',
                    border: '3px solid #2A2522',
                    borderRadius: '50%',
                    background: vals.accent,
                    boxShadow: '3px 4px 0 #2A2522',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
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

              {vals.feed.map((f, $index) => (
                <div key={$index} style={css(f.card)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span aria-hidden="true" style={css(f.face)} />

                    <span
                      style={{
                        flex: '1',
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '15px',
                        fontWeight: '600',
                      }}
                    >
                      {f.name}
                    </span>

                    <span style={css(f.tagStyle)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d={f.tagGlyph}
                          fill="#FFFDF8"
                          stroke="#2A2522"
                          strokeWidth="2.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                      </svg>
                      {f.tag}
                    </span>
                  </div>

                  <span style={{ fontSize: '14px', fontWeight: '700', lineHeight: '1.3' }}>{f.text}</span>

                  {f.votable ? (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button type="button" aria-label="Vote up" onClick={f.voteUp} style={css(f.upStyle)}>
                        ▲ <span>{f.up}</span>
                      </button>

                      <button
                        type="button"
                        aria-label="Vote down"
                        onClick={f.voteDown}
                        style={css(f.downStyle)}
                      >
                        ▼ <span>{f.down}</span>
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          {/* NOTICES */}

          {vals.isNotices ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {vals.notices.map((n, $index) => (
                <ScreenLink
                  key={$index}
                  href={n.href}
                  aria-label={n.label}
                  style={{
                    position: 'relative',
                    border: '3px solid #2A2522',
                    borderRadius: '18px',
                    background: '#FFFDF8',
                    boxShadow: '4px 5px 0 #2A2522',
                    padding: '10px 12px 10px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    color: '#2A2522',
                    transform: `rotate(${n.tilt}deg)`,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '-7px',
                      left: '50%',
                      width: '14px',
                      height: '14px',
                      marginLeft: '-7px',
                      borderRadius: '50%',
                      background: '#C8553D',
                      border: '2px solid #2A2522',
                    }}
                  />

                  <span
                    style={{
                      width: '42px',
                      height: '42px',
                      flex: 'none',
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '13px',
                      background: n.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d={n.glyph}
                        fill={n.fill}
                        stroke="#2A2522"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <div
                    style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '2px' }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        letterSpacing: '.06em',
                        color: '#8A8075',
                      }}
                    >
                      {n.kind}
                    </span>

                    <span
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '16px',
                        fontWeight: '600',
                        lineHeight: '1.15',
                      }}
                    >
                      {n.title}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: '800',
                      background: n.chipBg,
                      border: '2px solid #2A2522',
                      borderRadius: '999px',
                      padding: '1px 8px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {n.chip}
                  </span>
                </ScreenLink>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
