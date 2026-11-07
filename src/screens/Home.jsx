// Home
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Home extends Screen {
  static title = 'Home';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const panel = this.state.panel ?? 'news';
    const headlines = [
      { kind: 'vote', headline: 'Rent cap vote on Thursday', bg: '#F7D6D6' },
      { kind: 'sport', headline: 'Rooftop Rovers top the league', bg: '#EAE0F0' },
      { kind: 'crisis', headline: 'Elevator fund 64% pledged', bg: '#FDE3C8' },
      { kind: 'science', headline: 'Lab team cracks a mineral principle', bg: '#E3F0DF' },
      { kind: 'market', headline: 'Rice runs low at the supermarket', bg: '#EFE4CF' },
    ];
    const i = this.state.i ?? 0;
    const h = headlines[i];
    const Q = [
      {
        id: 'esusu',
        title: 'Tunde skipped his esusu payment',
        left: '5 h',
        href: 'Esusu.dc.html',
        iconBg: '#EFE4CF',
        fill: '#8E4129',
        glyph: 'M6 9 H18 C21 12 21 19 12 20 C3 19 3 12 6 9 Z M8 6 H16',
        options: [
          ['Cover his 60 ZAE', 'I\u2019d have waited.'],
          ['Give him a week', 'Same as me!'],
          ['Call him out', 'Harsh. I\u2019d wait.'],
        ],
        her: 'Amara gave him a week',
      },
      {
        id: 'shift',
        title: 'Extra shift on Thursday · +40',
        left: '1 day',
        href: 'Work.dc.html',
        iconBg: '#E3F0DF',
        fill: '#FFFDF8',
        glyph: 'M3 8 H21 V20 H3 Z M9 8 V5 H15 V8 M3 13 H21',
        options: [
          ['Take the shift', 'I\u2019d have taken it too.'],
          ['Skip it', 'I\u2019m tired, fair.'],
        ],
        her: 'Amara took the shift',
      },
      {
        id: 'chess',
        title: 'Your move against Tunde',
        left: '1 h 58 m',
        href: 'Chess.dc.html',
        iconBg: '#FDE3C8',
        fill: '#FFFDF8',
        glyph: 'M7 21 H17 L16 17 H8 Z M9 17 C9 13 7 11 8 8 C9 5 13 4 15 6 L17 8 L15 10 C15 13 15 15 15 17',
        elsewhere: 'Play',
        her: 'Amara played knight to g5',
      },
    ];
    const st = this.state.q ?? { esusu: { stage: this.props.stage ?? 'ask' } };
    const stageOf = (it) => (st[it.id] && st[it.id].stage) || 'ask';
    const waiting = Q.filter((it) => stageOf(it) === 'ask' || stageOf(it) === 'choose');
    const allHandled0 = waiting.length === 0;
    const slides = Q.length + (allHandled0 ? 1 : 0);
    const qi = Math.min(this.state.qi ?? 0, slides - 1);
    const onClear = qi === Q.length;
    const cur = Q[Math.min(qi, Q.length - 1)];
    const set = (id, v) => this.setState({ q: { ...st, [id]: v } });
    const allHandled = waiting.length === 0;
    const curStage = stageOf(cur);
    const pickedIdx = st[cur.id] && st[cur.id].picked;
    const a = {
      title: cur.title,
      left: cur.left,
      href: cur.href,
      iconBg: cur.iconBg,
      fill: cur.fill,
      glyph: cur.glyph,
      inline: !cur.elsewhere,
      elsewhere: !!cur.elsewhere,
      decideLabel: cur.elsewhere || '',
      isAsk: curStage === 'ask',
      isChoose: curStage === 'choose',
      isDone: curStage === 'done',
      isHanded: curStage === 'handed',
      options: (cur.options || []).map((o, k) => ({
        label: o[0],
        pick: () => set(cur.id, { stage: 'done', picked: k }),
      })),
      choice: pickedIdx !== undefined && cur.options ? cur.options[pickedIdx][0] : '',
      shadow: pickedIdx !== undefined && cur.options ? cur.options[pickedIdx][1] : '',
      herResult: cur.her,
      decide: () => set(cur.id, { stage: 'choose' }),
      handOff: () => set(cur.id, { stage: 'handed' }),
    };
    const waitingIdx = waiting.findIndex((it) => it.id === cur.id);
    return {
      accent,
      showNews: panel === 'news',
      showAttention: panel === 'attention',
      openAttention: () => this.setState({ panel: panel === 'attention' ? 'news' : 'attention' }),
      closePanel: () => this.setState({ panel: 'news' }),
      news: {
        headline: h.headline,
        isVote: h.kind === 'vote',
        isSport: h.kind === 'sport',
        isCrisis: h.kind === 'crisis',
        isScience: h.kind === 'science',
        isMarket: h.kind === 'market',
        tile:
          'width: 54px; height: 54px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 14px; background: ' +
          h.bg +
          '; display: flex; align-items: center; justify-content: center;',
      },
      dots: headlines.map((x, k) => ({
        style:
          'width: 7px; height: 7px; border-radius: 50%; background: ' +
          (k === i ? '#F2CE6E' : 'rgba(255,253,248,0.35)') +
          ';',
      })),
      prevHeadline: () => this.setState({ i: (i + headlines.length - 1) % headlines.length }),
      next: () => this.setState({ i: (i + 1) % headlines.length }),
      a,
      allClear: onClear,
      hasItem: !onClear,
      counter: allHandled
        ? 'Attention · all clear'
        : waitingIdx >= 0
          ? 'Attention · ' + (waitingIdx + 1) + ' of ' + waiting.length
          : 'Attention · ' + waiting.length + ' left',
      prev: () => this.setState({ qi: (qi + slides - 1) % slides }),
      nextItem: () => this.setState({ qi: (qi + 1) % slides }),
      waitingCount: String(waiting.length),
      badgeHide: waiting.length ? '' : 'display: none;',
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
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 20px 12px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '24px',
                fontWeight: '600',
                lineHeight: '1.15',
              }}
            >
              Room 4C
            </span>

            <span style={{ fontSize: '14px', fontWeight: '600', color: '#5E564D' }}>Tue · 7:40 pm</span>
          </div>
        </header>

        <ScreenLink
          href="Life.dc.html"
          aria-label="Amara, restless. Open Life"
          style={{
            display: 'block',
            textDecoration: 'none',
            color: '#2A2522',
            margin: '0 20px',
            border: '3px solid #2A2522',
            borderRadius: '22px',
            overflow: 'hidden',
            background: '#FFFDF8',
            boxShadow: '4px 5px 0 #2A2522',
          }}
        >
          <div
            style={{
              height: '128px',
              background: '#FDE3C8',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '6px',
              padding: '0 12px 0 8px',
            }}
          >
            <svg
              width="136"
              height="124"
              viewBox="0 0 200 184"
              role="img"
              aria-label="Amara, looking restless"
              style={{ flex: 'none', display: 'block' }}
            >
              <path
                d="M30 186 C30 148 62 130 100 130 C138 130 170 148 170 186 Z"
                fill={vals.accent}
                stroke="#2A2522"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              <rect x="88" y="108" width="24" height="26" fill="#6B4027" stroke="#2A2522" strokeWidth="4" />

              <circle cx="56" cy="40" r="22" fill="#2A2522" />

              <circle cx="144" cy="40" r="22" fill="#2A2522" />

              <circle cx="70" cy="24" r="14" fill="#2A2522" />

              <circle cx="130" cy="24" r="14" fill="#2A2522" />

              <circle cx="100" cy="80" r="46" fill="#7A4A2E" stroke="#2A2522" strokeWidth="4" />

              <path
                d="M54 78 C52 44 74 30 100 30 C126 30 148 44 146 78 C138 60 120 54 100 54 C80 54 62 60 54 78 Z"
                fill="#2A2522"
              />

              <circle cx="55" cy="104" r="7" fill="none" stroke="#E8B53A" strokeWidth="4" />

              <circle cx="145" cy="104" r="7" fill="none" stroke="#E8B53A" strokeWidth="4" />

              <ellipse cx="77" cy="99" rx="9" ry="5" fill="#C66A55" opacity="0.6" />

              <ellipse cx="123" cy="99" rx="9" ry="5" fill="#C66A55" opacity="0.6" />

              <path
                d="M74 70 Q82 66 90 70"
                fill="none"
                stroke="#2A2522"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <path
                d="M110 66 Q118 60 126 64"
                fill="none"
                stroke="#2A2522"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <ellipse cx="82" cy="85" rx="4.5" ry="6" fill="#2A2522" />

              <ellipse cx="118" cy="85" rx="4.5" ry="6" fill="#2A2522" />

              <path d="M88 106 L114 102" fill="none" stroke="#2A2522" strokeWidth="4" strokeLinecap="round" />
            </svg>

            <p
              style={{
                alignSelf: 'flex-start',
                margin: '16px 0 0',
                background: '#FFFDF8',
                border: '3px solid #2A2522',
                borderRadius: '16px',
                padding: '6px 14px',
                fontFamily: "'Caveat', cursive",
                fontSize: '24px',
                fontWeight: '500',
                lineHeight: '1.05',
              }}
            >
              Esusu trouble...
            </p>
          </div>

          <div
            style={{
              borderTop: '3px solid #2A2522',
              padding: '7px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '27px',
                fontWeight: '700',
                lineHeight: '1.1',
              }}
            >
              Amara
            </span>

            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FDE3C8',
                border: '3px solid #2A2522',
                borderRadius: '999px',
                padding: '3px 12px',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              <span
                style={{
                  width: '13px',
                  height: '13px',
                  borderRadius: '4px',
                  border: '2.5px solid #2A2522',
                  background: '#C8553D',
                  boxSizing: 'border-box',
                }}
              />
              Restless
            </span>
          </div>
        </ScreenLink>

        {vals.showNews ? (
          <section
            aria-label="Headlines"
            aria-roledescription="carousel"
            style={{
              margin: '16px 20px 0',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 12px',
                background: '#2A2522',
                color: '#FFFDF8',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  letterSpacing: '0.04em',
                }}
              >
                THE BLOCK A TIMES
              </span>

              <span style={{ display: 'flex', gap: '5px' }}>
                {vals.dots.map((d, $index) => (
                  <span key={$index} style={css(d.style)} />
                ))}
              </span>
            </div>

            <div
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 8px 10px 12px' }}
            >
              <span style={css(vals.news.tile)}>
                {vals.news.isVote ? (
                  <svg width="38" height="38" viewBox="0 0 48 48" aria-hidden="true">
                    <rect
                      x="8"
                      y="20"
                      width="32"
                      height="22"
                      rx="4"
                      fill="#FFFDF8"
                      stroke="#2A2522"
                      strokeWidth="3"
                    />
                    <rect x="17" y="18" width="14" height="4" rx="1" fill="#2A2522" />
                    <path
                      d="M19 6 h12 v14 h-12 z"
                      fill="#F2CE6E"
                      stroke="#2A2522"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 12 l3 3 l5 -6"
                      fill="none"
                      stroke="#2A2522"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}

                {vals.news.isSport ? (
                  <svg width="38" height="38" viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      d="M14 8 h20 v8 a10 10 0 0 1 -20 0 z"
                      fill="#F2CE6E"
                      stroke="#2A2522"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 11 h-5 a5 5 0 0 0 5 8 M34 11 h5 a5 5 0 0 1 -5 8"
                      fill="none"
                      stroke="#2A2522"
                      strokeWidth="3"
                    />
                    <rect
                      x="21"
                      y="25"
                      width="6"
                      height="8"
                      fill="#F2CE6E"
                      stroke="#2A2522"
                      strokeWidth="3"
                    />
                    <rect
                      x="14"
                      y="33"
                      width="20"
                      height="7"
                      rx="2"
                      fill="#FFFDF8"
                      stroke="#2A2522"
                      strokeWidth="3"
                    />
                  </svg>
                ) : null}

                {vals.news.isCrisis ? (
                  <svg width="38" height="38" viewBox="0 0 48 48" aria-hidden="true">
                    <rect
                      x="10"
                      y="6"
                      width="28"
                      height="36"
                      rx="4"
                      fill="#FFFDF8"
                      stroke="#2A2522"
                      strokeWidth="3"
                    />
                    <path d="M24 6 v36" stroke="#2A2522" strokeWidth="3" />
                    <path
                      d="M16 18 l3 -4 l3 4 M26 30 l3 4 l3 -4"
                      fill="none"
                      stroke="#2A2522"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="38" cy="38" r="8" fill="#C8553D" stroke="#2A2522" strokeWidth="3" />
                    <path d="M38 34 v4" stroke="#FFFDF8" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                ) : null}

                {vals.news.isScience ? (
                  <svg width="38" height="38" viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      d="M19 6 h10 M21 6 v12 l-11 19 a3 3 0 0 0 3 5 h22 a3 3 0 0 0 3 -5 l-11 -19 v-12"
                      fill="#FFFDF8"
                      stroke="#2A2522"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14 32 h20 l4 7 a2 2 0 0 1 -2 3 h-24 a2 2 0 0 1 -2 -3 z"
                      fill="#8FC1A9"
                      stroke="#2A2522"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <circle cx="22" cy="36" r="2" fill="#FFFDF8" />
                  </svg>
                ) : null}

                {vals.news.isMarket ? (
                  <svg width="38" height="38" viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      d="M6 10 h6 l5 20 h20 l4 -14 h-26"
                      fill="none"
                      stroke="#2A2522"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 16 h24 l-3 12 h-18 z"
                      fill="#F2CE6E"
                      stroke="#2A2522"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <circle cx="20" cy="37" r="3.5" fill="#FFFDF8" stroke="#2A2522" strokeWidth="3" />
                    <circle cx="34" cy="37" r="3.5" fill="#FFFDF8" stroke="#2A2522" strokeWidth="3" />
                  </svg>
                ) : null}
              </span>

              <span
                style={{
                  flex: '1',
                  minWidth: '0',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '18px',
                  fontWeight: '600',
                  lineHeight: '1.15',
                }}
              >
                {vals.news.headline}
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  type="button"
                  onClick={vals.prevHeadline}
                  aria-label="Previous headline"
                  style={{
                    all: 'unset',
                    width: '34px',
                    height: '30px',
                    boxSizing: 'border-box',
                    border: '2.5px solid #2A2522',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2A2522"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={vals.next}
                  aria-label="Next headline"
                  style={{
                    all: 'unset',
                    width: '34px',
                    height: '30px',
                    boxSizing: 'border-box',
                    border: '2.5px solid #2A2522',
                    borderRadius: '10px',
                    background: vals.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2A2522"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        ) : null}

        {vals.showAttention ? (
          <section
            aria-label="Attention"
            aria-roledescription="carousel"
            style={{
              margin: '16px 20px 0',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#2E4A3B',
              color: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              overflow: 'hidden',
            }}
          >
            <div
              style={{ padding: '10px 12px 12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '30px',
                    height: '30px',
                    flex: 'none',
                    boxSizing: 'border-box',
                    border: '2.5px solid #2A2522',
                    borderRadius: '9px',
                    background: vals.a.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d={vals.a.glyph}
                      fill={vals.a.fill}
                      stroke="#2A2522"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span style={{ flex: '1', fontSize: '14px', fontWeight: '800', color: '#F2CE6E' }}>
                  {vals.counter}
                </span>

                <button
                  type="button"
                  onClick={vals.prev}
                  aria-label="Previous"
                  style={{
                    all: 'unset',
                    width: '32px',
                    height: '32px',
                    boxSizing: 'border-box',
                    border: '2.5px solid #FFFDF8',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFFDF8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 5l-7 7 7 7" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={vals.nextItem}
                  aria-label="Next"
                  style={{
                    all: 'unset',
                    width: '32px',
                    height: '32px',
                    boxSizing: 'border-box',
                    border: '2.5px solid #FFFDF8',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFFDF8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={vals.closePanel}
                  aria-label="Back to headlines"
                  style={{
                    all: 'unset',
                    width: '32px',
                    height: '32px',
                    boxSizing: 'border-box',
                    border: '2.5px solid #FFFDF8',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFFDF8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              {vals.allClear ? (
                <>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '20px',
                      fontWeight: '600',
                      lineHeight: '1.15',
                    }}
                  >
                    All clear. Nothing is waiting for you.
                  </span>

                  <button
                    type="button"
                    onClick={vals.closePanel}
                    style={{
                      all: 'unset',
                      alignSelf: 'flex-start',
                      height: '40px',
                      padding: '0 16px',
                      boxSizing: 'border-box',
                      borderRadius: '999px',
                      background: '#FFFDF8',
                      border: '3px solid #2A2522',
                      color: '#2A2522',
                      display: 'flex',
                      alignItems: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Back to headlines
                  </button>
                </>
              ) : null}

              {vals.hasItem ? (
                <>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '20px',
                      fontWeight: '600',
                      lineHeight: '1.15',
                    }}
                  >
                    {vals.a.title}
                  </span>

                  {vals.a.isAsk ? (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '12.5px',
                            fontWeight: '800',
                            background: '#FDE3C8',
                            color: '#2A2522',
                            border: '2px solid #2A2522',
                            borderRadius: '999px',
                            padding: '1px 9px 1px 6px',
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
                          She decides in <span>{vals.a.left}</span>
                        </span>

                        <span style={{ flex: '1' }} />

                        <ScreenLink
                          href={vals.a.href}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            fontFamily: "'Fredoka', sans-serif",
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#F2CE6E',
                            textDecoration: 'none',
                          }}
                        >
                          Open
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#F2CE6E"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M9 6l6 6-6 6" />
                          </svg>
                        </ScreenLink>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        {vals.a.inline ? (
                          <button
                            type="button"
                            onClick={vals.a.decide}
                            style={{
                              all: 'unset',
                              flex: '1',
                              height: '46px',
                              boxSizing: 'border-box',
                              borderRadius: '999px',
                              background: vals.accent,
                              border: '3px solid #2A2522',
                              color: '#2A2522',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: "'Fredoka', sans-serif",
                              fontSize: '17px',
                              fontWeight: '600',
                              cursor: 'pointer',
                            }}
                          >
                            Decide
                          </button>
                        ) : null}

                        {vals.a.elsewhere ? (
                          <ScreenLink
                            href={vals.a.href}
                            style={{
                              flex: '1',
                              height: '46px',
                              boxSizing: 'border-box',
                              borderRadius: '999px',
                              background: vals.accent,
                              border: '3px solid #2A2522',
                              color: '#2A2522',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: "'Fredoka', sans-serif",
                              fontSize: '17px',
                              fontWeight: '600',
                              textDecoration: 'none',
                            }}
                          >
                            {vals.a.decideLabel}
                          </ScreenLink>
                        ) : null}

                        <button
                          type="button"
                          onClick={vals.a.handOff}
                          style={{
                            all: 'unset',
                            flex: '1',
                            height: '46px',
                            boxSizing: 'border-box',
                            borderRadius: '999px',
                            background: '#FFFDF8',
                            border: '3px dashed #2A2522',
                            color: '#2A2522',
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

                  {vals.a.isChoose ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {vals.a.options.map((opt, $index) => (
                        <button
                          key={$index}
                          type="button"
                          onClick={opt.pick}
                          style={{
                            all: 'unset',
                            boxSizing: 'border-box',
                            width: '100%',
                            height: '44px',
                            padding: '0 14px',
                            borderRadius: '14px',
                            background: '#FFFDF8',
                            border: '3px solid #2A2522',
                            color: '#2A2522',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: "'Fredoka', sans-serif",
                            fontSize: '16px',
                            fontWeight: '500',
                            cursor: 'pointer',
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {vals.a.isDone ? (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          role="img"
                          aria-label="You decided"
                          style={{
                            width: '28px',
                            height: '28px',
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
                          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M4 20 l3 -1 l12 -12 a2 2 0 0 0 -3 -3 l-12 12 z"
                              fill="#FFFDF8"
                              stroke="#2A2522"
                              strokeWidth="2.4"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>

                        <span
                          style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}
                        >
                          {vals.a.choice}
                        </span>
                      </div>

                      <span
                        style={{
                          alignSelf: 'flex-start',
                          background: '#FDE3C8',
                          color: '#2A2522',
                          border: '2.5px solid #2A2522',
                          borderRadius: '4px 14px 14px 14px',
                          padding: '2px 12px',
                          fontFamily: "'Caveat', cursive",
                          fontSize: '22px',
                          lineHeight: '1.1',
                        }}
                      >
                        {vals.a.shadow}
                      </span>
                    </>
                  ) : null}

                  {vals.a.isHanded ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        role="img"
                        aria-label="On her own"
                        style={{
                          width: '28px',
                          height: '28px',
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
                        <svg width="18" height="18" viewBox="0 0 40 40" aria-hidden="true">
                          <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                          <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                          <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                        </svg>
                      </span>

                      <span
                        style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}
                      >
                        {vals.a.herResult}
                      </span>
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          </section>
        ) : null}

        <nav
          aria-label="What's happening"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '12px',
            padding: '20px 20px 0',
          }}
        >
          <button
            type="button"
            onClick={vals.openAttention}
            aria-label={`Attention, ${vals.waitingCount} waiting`}
            style={{
              all: 'unset',
              position: 'relative',
              height: '112px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#2E4A3B',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <svg width="58" height="58" viewBox="0 0 64 64" aria-hidden="true">
              <path
                d="M12 16 a6 6 0 0 1 4 -6 M8 22 a12 12 0 0 1 6 -14 M52 16 a6 6 0 0 0 -4 -6 M56 22 a12 12 0 0 0 -6 -14"
                fill="none"
                stroke="#F2CE6E"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="M32 10 c-11 0 -17 8 -17 18 v10 l-5 7 h44 l-5 -7 v-10 c0 -10 -6 -18 -17 -18 z"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              <path d="M26 49 a6 6 0 0 0 12 0" fill="#FFFDF8" stroke="#2A2522" strokeWidth="3.5" />

              <circle cx="32" cy="8" r="3.5" fill="#F2CE6E" stroke="#2A2522" strokeWidth="3" />

              <path
                d="M24 26 q3 -6 8 -7"
                fill="none"
                stroke="#FFFDF8"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '15px',
                fontWeight: '600',
                color: '#FFFDF8',
              }}
            >
              Attention
            </span>

            <span
              style={css(
                `position: absolute; top: -10px; right: -8px; min-width: 26px; height: 26px; box-sizing: border-box; padding: 0 6px; border: 3px solid #2A2522; border-radius: 999px; background: #C8553D; color: #FFFDF8; font-family: 'Fredoka', sans-serif; font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: center; ${vals.badgeHide}`,
              )}
            >
              {vals.waitingCount}
            </span>
          </button>

          <ScreenLink
            href="Diary.dc.html"
            aria-label="Diary, 2 new entries"
            style={{
              position: 'relative',
              height: '112px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#FDE3C8',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="58" height="58" viewBox="0 0 64 64" aria-hidden="true">
              <rect
                x="12"
                y="8"
                width="36"
                height="48"
                rx="5"
                fill="#C8553D"
                stroke="#2A2522"
                strokeWidth="3.5"
              />

              <rect
                x="18"
                y="8"
                width="30"
                height="48"
                rx="3"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
              />

              <path
                d="M24 20 h18 M24 28 h18 M24 36 h12"
                stroke="#2A2522"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d="M38 8 v14 l4 -3 l4 3 v-14"
                fill="#E8B53A"
                stroke="#2A2522"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              <path
                d="M44 54 l12 -24 l5 3 l-12 24 l-6 2 z"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}>
              Diary
            </span>

            <span
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-8px',
                minWidth: '26px',
                height: '26px',
                boxSizing: 'border-box',
                padding: '0 6px',
                border: '3px solid #2A2522',
                borderRadius: '999px',
                background: '#2F3E5C',
                color: '#FFFDF8',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              2
            </span>
          </ScreenLink>

          <ScreenLink
            href="Media.dc.html"
            aria-label="Media, 5 new"
            style={{
              position: 'relative',
              height: '112px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#CFE3F4',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="58" height="58" viewBox="0 0 64 64" aria-hidden="true">
              <path
                d="M10 14 h36 v36 a6 6 0 0 1 -6 6 h-28 a6 6 0 0 1 -2 -2 z"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              <path
                d="M46 24 h8 v26 a6 6 0 0 1 -12 0"
                fill="#EFE4CF"
                stroke="#2A2522"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              <rect x="16" y="20" width="24" height="7" rx="1.5" fill="#2A2522" />

              <rect
                x="16"
                y="32"
                width="11"
                height="12"
                rx="2"
                fill="#8FC1A9"
                stroke="#2A2522"
                strokeWidth="2.5"
              />

              <path
                d="M31 34 h9 M31 40 h9 M16 49 h24"
                stroke="#2A2522"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}>
              Media
            </span>

            <span
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-8px',
                minWidth: '26px',
                height: '26px',
                boxSizing: 'border-box',
                padding: '0 6px',
                border: '3px solid #2A2522',
                borderRadius: '999px',
                background: '#2F3E5C',
                color: '#FFFDF8',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              5
            </span>
          </ScreenLink>
        </nav>

        <nav
          aria-label="Go to"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridAutoRows: '82px',
            gap: '12px',
            padding: '14px 20px 0',
          }}
        >
          <ScreenLink
            href="Main.dc.html"
            style={{
              gridColumn: 'span 2',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#EFE4CF',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 14px',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="60" height="64" viewBox="0 0 60 64" aria-hidden="true">
              <path d="M12 10 V3 M48 10 V3" stroke="#2A2522" strokeWidth="2.5" strokeLinecap="round" />

              <rect
                x="7"
                y="0"
                width="10"
                height="5"
                rx="1.5"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="2"
              />

              <rect
                x="43"
                y="0"
                width="10"
                height="5"
                rx="1.5"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="2"
              />

              <rect
                x="8"
                y="12"
                width="44"
                height="48"
                rx="4"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3.5"
              />

              <rect
                x="5"
                y="9"
                width="50"
                height="6"
                rx="2"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
              />

              <rect
                x="14"
                y="20"
                width="9"
                height="8"
                rx="1.5"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="2"
              />

              <rect
                x="26"
                y="20"
                width="9"
                height="8"
                rx="1.5"
                fill="#2F3E5C"
                stroke="#2A2522"
                strokeWidth="2"
              />

              <rect
                x="38"
                y="20"
                width="9"
                height="8"
                rx="1.5"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="2"
              />

              <rect
                x="14"
                y="32"
                width="9"
                height="8"
                rx="1.5"
                fill="#2F3E5C"
                stroke="#2A2522"
                strokeWidth="2"
              />

              <rect
                x="26"
                y="32"
                width="9"
                height="8"
                rx="1.5"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="2"
              />

              <rect
                x="38"
                y="32"
                width="9"
                height="8"
                rx="1.5"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="2"
              />

              <rect
                x="24"
                y="46"
                width="12"
                height="14"
                rx="2"
                fill="#8E4129"
                stroke="#2A2522"
                strokeWidth="2.5"
              />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '600' }}>
              Building
            </span>
          </ScreenLink>

          <ScreenLink
            href="Social.dc.html"
            style={{
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#F7D6D6',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 14px',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
              <circle cx="16" cy="22" r="5" fill="#2A2522" />

              <path
                d="M2 56 C2 44 10 39 18 39 C26 39 34 44 34 56 Z"
                fill="#8FC1A9"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <circle cx="18" cy="31" r="10" fill="#5A3520" stroke="#2A2522" strokeWidth="3" />

              <path
                d="M8 29 C8 21 13 19 18 19 C23 19 28 21 28 29 C25 25 22 24 18 24 C14 24 11 25 8 29 Z"
                fill="#2A2522"
              />

              <path
                d="M14 34 Q18 37 22 34"
                fill="none"
                stroke="#2A2522"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              <path
                d="M26 58 C26 46 34 41 42 41 C50 41 58 46 58 58 Z"
                fill="#E8B53A"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <circle cx="42" cy="32" r="11" fill="#A8714A" stroke="#2A2522" strokeWidth="3" />

              <path
                d="M30 29 C30 18 36 15 42 15 C48 15 54 18 54 29 C51 24 47 23 42 23 C37 23 33 24 30 29 Z"
                fill="#C8553D"
                stroke="#2A2522"
                strokeWidth="2.2"
              />

              <path
                d="M37 36 Q42 40 47 36"
                fill="none"
                stroke="#2A2522"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              <path
                d="M28 4 h16 a4 4 0 0 1 4 4 v6 a4 4 0 0 1 -4 4 h-9 l-5 4 v-4 h-2 a4 4 0 0 1 -4 -4 v-6 a4 4 0 0 1 4 -4 z"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              <path d="M36 14 l-4 -4 a2.2 2.2 0 0 1 4 -2 a2.2 2.2 0 0 1 4 2 z" fill="#E8584E" />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '600' }}>
              Social
            </span>
          </ScreenLink>

          <ScreenLink
            href="Work.dc.html"
            style={{
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#E3F0DF',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 14px',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="60" height="64" viewBox="0 0 60 64" aria-hidden="true">
              <rect
                x="9"
                y="4"
                width="9"
                height="26"
                rx="4.5"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
              />

              <path d="M10.5 17 h6 v8 a3 3 0 0 1 -6 0 z" fill="#8FC1A9" />

              <path
                d="M40 28 l10 -21 l5.5 2.6 l-10 21 z"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <path
                d="M23 24 v-5 a3 3 0 0 1 3 -3 h8 a3 3 0 0 1 3 3 v5"
                fill="none"
                stroke="#2A2522"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              <rect
                x="4"
                y="24"
                width="52"
                height="36"
                rx="6"
                fill="#8E4129"
                stroke="#2A2522"
                strokeWidth="3.5"
              />

              <path d="M4 38 h52" stroke="#2A2522" strokeWidth="3" />

              <rect
                x="25"
                y="33"
                width="10"
                height="10"
                rx="2"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="2.5"
              />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '600' }}>
              Work
            </span>
          </ScreenLink>

          <ScreenLink
            href="Money.dc.html"
            style={{
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#2F3E5C',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 14px',
              textDecoration: 'none',
              color: '#FFFDF8',
            }}
          >
            <svg width="60" height="64" viewBox="0 0 60 64" aria-hidden="true">
              <rect
                x="4"
                y="12"
                width="40"
                height="24"
                rx="4"
                fill="#8FC1A9"
                stroke="#2A2522"
                strokeWidth="3"
                transform="rotate(-10 24 24)"
              />

              <ellipse cx="38" cy="54" rx="16" ry="6" fill="#E8B53A" stroke="#2A2522" strokeWidth="3" />

              <path d="M22 54 v-6 M54 54 v-6" stroke="#2A2522" strokeWidth="3" />

              <ellipse cx="38" cy="47" rx="16" ry="6" fill="#E8B53A" stroke="#2A2522" strokeWidth="3" />

              <ellipse cx="38" cy="40" rx="16" ry="6" fill="#F2CE6E" stroke="#2A2522" strokeWidth="3" />

              <path
                d="M33 37.5 h9 l-9 6 h9 M37.5 35 v11"
                fill="none"
                stroke="#2A2522"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '600' }}>
              Money
            </span>
          </ScreenLink>

          <ScreenLink
            href="Play.dc.html"
            style={{
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#5B3D62',
              boxShadow: '4px 5px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 14px',
              textDecoration: 'none',
              color: '#FFFDF8',
            }}
          >
            <svg width="60" height="64" viewBox="0 0 60 64" aria-hidden="true">
              <g transform="rotate(-12 22 34)">
                <rect
                  x="4"
                  y="16"
                  width="34"
                  height="34"
                  rx="8"
                  fill="#E8584E"
                  stroke="#2A2522"
                  strokeWidth="3.5"
                />

                <circle cx="13" cy="25" r="3.5" fill="#FFFDF8" stroke="#2A2522" strokeWidth="1.5" />

                <circle cx="21" cy="33" r="3.5" fill="#FFFDF8" stroke="#2A2522" strokeWidth="1.5" />

                <circle cx="29" cy="41" r="3.5" fill="#FFFDF8" stroke="#2A2522" strokeWidth="1.5" />
              </g>

              <circle cx="47" cy="22" r="7" fill="#2FCB5E" stroke="#2A2522" strokeWidth="3" />

              <path
                d="M41 58 c0 -12 3 -22 6 -28 c3 6 6 16 6 28 z"
                fill="#2FCB5E"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <rect
                x="38"
                y="56"
                width="18"
                height="6"
                rx="2"
                fill="#2FCB5E"
                stroke="#2A2522"
                strokeWidth="3"
              />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '600' }}>
              Play
            </span>
          </ScreenLink>
        </nav>
      </div>
    );
  }
}
