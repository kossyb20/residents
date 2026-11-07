// Writing
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Writing extends Screen {
  static title = 'Writing';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const tab = this.state.tab ?? 'write';
    const START =
      'The lift on floor six has been broken for nine days. Mama Ngozi climbs the stairs every morning with a bucket of water on her head and a song on her lips. Nobody knows the song. Kemi says it is about a river that moved house. Chidi says it is about money. I think it is about the lift. On the ninth day she stopped on my landing, put the bucket down, and taught me the chorus. Tonight the whole floor is singing it, badly, and nobody has complained about the stairs since.';
    const HERS =
      'Rain came through the roof on floor nine and nobody moved. Tunde held the big bucket. Zainab held the torch. I held my breath, because the ceiling was making a sound like a drum learning to talk. Mama Ngozi arrived in her night wrapper, looked up once, and laughed. She said this building has leaked since before any of us were born, and it has never once fallen down. Then she sat on the stairs and told us about her first rainy season here. By the time she finished, the bucket was full and the sky was finally quiet again.';
    const draft = this.state.draft ?? START;
    const title = this.state.title ?? 'The stair song';
    const by = this.state.by ?? 'you';
    const entered = this.state.entered ?? null;
    const writesLeft = this.state.writesLeft ?? 2;
    const words = draft.trim() ? draft.trim().split(/\s+/) : [];
    const count = words.length;
    const hasRain = /\brain\b/i.test(draft);
    const clean = words.map((w) => w.toLowerCase().replace(/[^a-z']/g, '')).filter(Boolean);
    const variety = clean.length ? Math.round((new Set(clean).size / clean.length) * 100) : 0;
    const LIGHT = ['song', 'laughed', 'singing', 'sun', 'warm', 'chorus', 'smile', 'quiet', 'home', 'taught'];
    const DARK = [
      'broken',
      'leaked',
      'dark',
      'fear',
      'breath',
      'fallen',
      'complained',
      'alone',
      'cold',
      'drum',
    ];
    let tone = 0;
    clean.forEach((w) => {
      if (LIGHT.includes(w)) tone -= 1;
      if (DARK.includes(w)) tone += 1;
    });
    const tonePos = Math.max(5, Math.min(95, 50 + tone * 12));
    const okCount = count === 100;
    const ok = okCount && hasRain;
    const chk = (pass) =>
      'display: inline-flex; align-items: center; gap: 4px; height: 30px; box-sizing: border-box; padding: 0 10px; border: 2.5px solid #2A2522; border-radius: 999px; font-size: 13px; font-weight: 800; background: ' +
      (pass ? '#8FC1A9' : '#F7D6D6') +
      ';';
    const checks = [
      {
        label: okCount ? '100 words exactly' : count + ' words, need 100',
        mark: okCount ? '✓' : '✕',
        s: chk(okCount),
      },
      { label: 'uses "rain"', mark: hasRain ? '✓' : '✕', s: chk(hasRain) },
    ];
    const tagState = this.state.tags ?? { Building: true, Neighbours: true };
    const tags = ['Building', 'Neighbours', 'Family', 'Money', 'Weather'].map((n) => ({
      name: n,
      on: !!tagState[n],
      s:
        'all: unset; height: 26px; padding: 0 9px; box-sizing: border-box; border: 2px solid #2A2522; border-radius: 999px; font-size: 12px; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; background: ' +
        (tagState[n] ? accent : '#FFFDF8') +
        ';',
      go: () => this.setState({ tags: { ...tagState, [n]: !tagState[n] } }),
    }));
    const tabStyle = (on) =>
      'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; cursor: pointer;' +
      (on
        ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
        : ' border: 2.5px solid transparent;');
    const WK = [
      {
        kind: 'COLUMN',
        kindBg: '#2A2522',
        kindFg: '#F2CE6E',
        where: 'Block A Times · Tue',
        title: 'Fix the lift before the cap',
        up: 14,
        down: 3,
        reception: 'Warm',
        note: 'Ran on page 2',
        royalty: 8,
        by: 'you',
      },
      {
        kind: 'POEM',
        kindBg: '#D9C9E8',
        kindFg: '#2A2522',
        where: 'Library shelf · Sun',
        title: 'Floor four at night',
        up: 6,
        down: 1,
        reception: 'Quiet, dark',
        note: 'Liked by readers who prefer dark, simple pieces',
        royalty: 0,
        by: 'her',
      },
      {
        kind: 'STORY',
        kindBg: '#8FC1A9',
        kindFg: '#2A2522',
        where: "Last week's contest",
        title: 'Market day',
        up: 19,
        down: 2,
        reception: 'Loved',
        note: 'Shortlisted · jury picked another',
        royalty: 0,
        by: 'you',
      },
    ];
    const works = WK.map((w) => ({
      ...w,
      up: String(w.up),
      down: String(w.down),
      royalty: String(w.royalty),
      hasRoyalty: w.royalty > 0,
      byYou: w.by === 'you',
      byHer: w.by === 'her',
      kindStyle:
        'font-size: 10.5px; font-weight: 800; letter-spacing: .06em; border: 2px solid #2A2522; border-radius: 999px; padding: 0 8px; background: ' +
        w.kindBg +
        '; color: ' +
        w.kindFg +
        ';',
      whoIcon:
        'width: 22px; height: 22px; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center; ' +
        (w.by === 'you'
          ? 'border: 2px solid #2A2522; background: #CFE3F4;'
          : 'border: 2px dashed #2A2522; background: #EFE4CF;'),
    }));
    return {
      accent,
      isWrite: tab === 'write',
      isPub: tab === 'pub',
      writeTab: tabStyle(tab === 'write'),
      pubTab: tabStyle(tab === 'pub'),
      showWrite: () => this.setState({ tab: 'write' }),
      showPub: () => this.setState({ tab: 'pub' }),
      draft,
      title,
      checks,
      tags,
      count: String(count),
      countColor: okCount ? '#2E4A3B' : '#C8553D',
      variety: String(variety),
      varietyBar:
        'display: block; height: 100%; width: ' +
        variety +
        '%; background: #8FC1A9; border-right: 2px solid #2A2522;',
      toneWord: tone < 0 ? 'light' : tone > 0 ? 'dark' : 'balanced',
      toneDot:
        'position: absolute; top: 50%; left: ' +
        tonePos +
        '%; width: 16px; height: 16px; margin: -8px 0 0 -8px; box-sizing: border-box; border-radius: 50%; border: 2.5px solid #2A2522; background: #FFFDF8;',
      byHer: by === 'her',
      typing: (e) => this.setState({ draft: e.target.value, by: 'you' }),
      typeTitle: (e) => this.setState({ title: e.target.value }),
      open: !entered,
      entered: !!entered,
      blocked: ok ? 'false' : 'true',
      enterStyle:
        'all: unset; flex: 1.3; height: 48px; box-sizing: border-box; border-radius: 999px; border: 3px solid #2A2522; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; ' +
        (ok ? 'background: ' + accent + '; cursor: pointer;' : 'background: #EFE4CF; color: #8A8075;'),
      enter: () => {
        if (ok) this.setState({ entered: by });
      },
      enteredText:
        entered === 'her'
          ? "Amara's story is entered · votes open Sun"
          : 'Your story is entered · votes open Sun',
      writesLeft: String(writesLeft),
      handOff: () => {
        if (writesLeft > 0)
          this.setState({ draft: HERS, title: 'Leak season', by: 'her', writesLeft: writesLeft - 1 });
      },
      works,
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
            href="Work.dc.html"
            aria-label="Back to Work"
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

          <h1
            style={{
              flex: '1',
              margin: '0',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '26px',
              fontWeight: '700',
              lineHeight: '1.1',
            }}
          >
            Writing
          </h1>

          <svg width="44" height="40" viewBox="0 0 64 58" aria-hidden="true">
            <path
              d="M8 10 H40 V54 H8 Z"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            <path
              d="M14 20 H34 M14 28 H34 M14 36 H26"
              stroke="#2A2522"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M30 46 L54 8 L60 12 L36 50 L28 54 Z"
              fill="#E8B53A"
              stroke="#2A2522"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
        </header>

        <div
          role="tablist"
          aria-label="Writing"
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
          <button
            type="button"
            role="tab"
            aria-selected={vals.isWrite}
            onClick={vals.showWrite}
            style={css(vals.writeTab)}
          >
            Write
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={vals.isPub}
            onClick={vals.showPub}
            style={css(vals.pubTab)}
          >
            Published
          </button>
        </div>

        <div
          className="wr-scroll"
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
          {/* WRITE */}

          {vals.isWrite ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <section
                aria-label="Contest"
                style={{
                  border: '3px solid #2A2522',
                  borderRadius: '20px',
                  background: '#5B3D62',
                  color: '#FFFDF8',
                  boxShadow: '4px 5px 0 #2A2522',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M7 3 H17 V9 A5 5 0 0 1 7 9 Z M7 5 H3 Q3 10 7 10 M17 5 H21 Q21 10 17 10 M12 14 V18 M8 21 H16 L15 18 H9 Z"
                      fill="#F2CE6E"
                      stroke="#2A2522"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span
                    style={{
                      flex: '1',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '18px',
                      fontWeight: '700',
                    }}
                  >
                    100-word story
                  </span>

                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '800',
                      background: '#FFFDF8',
                      color: '#2A2522',
                      border: '2px solid #2A2522',
                      borderRadius: '999px',
                      padding: '0 8px',
                    }}
                  >
                    Library · closes Sun
                  </span>
                </div>

                <span style={{ fontSize: '13px', fontWeight: '700', opacity: '.9', lineHeight: '1.3' }}>
                  Exactly 100 words, and the word "rain" must appear. Votes shortlist; a jury picks the
                  winner.
                </span>
              </section>

              {/* Rule checks: automatic, no AI */}

              <div
                role="list"
                aria-label="Contest rules"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}
              >
                {vals.checks.map((c, $index) => (
                  <span key={$index} role="listitem" style={css(c.s)}>
                    <span>{c.mark}</span> <span>{c.label}</span>
                  </span>
                ))}
              </div>

              <section
                aria-label="Draft"
                style={{
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
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    borderBottom: '2px dashed #EFE6D7',
                  }}
                >
                  <input
                    type="text"
                    aria-label="Title"
                    value={vals.title}
                    onChange={vals.typeTitle}
                    style={{
                      flex: '1',
                      minWidth: '0',
                      border: 'none',
                      background: 'transparent',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '17px',
                      fontWeight: '600',
                      color: '#2A2522',
                      outline: 'none',
                    }}
                  />

                  {vals.byHer ? (
                    <span
                      title="Amara wrote this"
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
                      <svg width="14" height="14" viewBox="0 0 40 40" aria-hidden="true">
                        <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                        <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                        <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                      </svg>
                    </span>
                  ) : null}

                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '14px',
                      fontWeight: '700',
                      color: vals.countColor,
                    }}
                  >
                    {vals.count}/100
                  </span>
                </div>{' '}
                <textarea
                  aria-label="Your story"
                  value={vals.draft}
                  onChange={vals.typing}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '196px',
                    boxSizing: 'border-box',
                    border: 'none',
                    resize: 'none',
                    padding: '10px 12px',
                    background: 'repeating-linear-gradient(180deg, #FFFDF8 0 23px, #EAF0F6 23px 24px)',
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: '14px',
                    fontWeight: '600',
                    lineHeight: '24px',
                    color: '#2A2522',
                    outline: 'none',
                  }}
                />
              </section>

              {/* Cheap measurements the building reacts to */}

              <section
                aria-label="How it reads"
                style={{
                  border: '3px solid #2A2522',
                  borderRadius: '18px',
                  background: '#FFFDF8',
                  boxShadow: '3px 4px 0 #2A2522',
                  padding: '10px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '70px', fontSize: '12.5px', fontWeight: '800' }}>Tone</span>

                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#5E564D' }}>light</span>

                  <div
                    role="img"
                    aria-label={`Tone ${vals.toneWord}`}
                    style={{
                      flex: '1',
                      position: 'relative',
                      height: '12px',
                      border: '2px solid #2A2522',
                      borderRadius: '999px',
                      background: 'linear-gradient(90deg, #F2CE6E, #2F3E5C)',
                    }}
                  >
                    <span style={css(vals.toneDot)} />
                  </div>

                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#5E564D' }}>dark</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '70px', fontSize: '12.5px', fontWeight: '800' }}>Variety</span>

                  <div
                    role="img"
                    aria-label={`Word variety ${vals.variety} percent`}
                    style={{
                      flex: '1',
                      height: '12px',
                      border: '2px solid #2A2522',
                      borderRadius: '999px',
                      background: '#F5EFE5',
                      overflow: 'hidden',
                    }}
                  >
                    <span style={css(vals.varietyBar)} />
                  </div>

                  <span style={{ width: '34px', textAlign: 'right', fontSize: '12px', fontWeight: '800' }}>
                    {vals.variety}%
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ width: '70px', fontSize: '12.5px', fontWeight: '800' }}>Tags</span>

                  {vals.tags.map((t, $index) => (
                    <button key={$index} type="button" aria-pressed={t.on} onClick={t.go} style={css(t.s)}>
                      {t.name}
                    </button>
                  ))}
                </div>
              </section>

              {vals.open ? (
                <>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={vals.enter}
                      aria-disabled={vals.blocked}
                      style={css(vals.enterStyle)}
                    >
                      Enter contest
                    </button>

                    <button
                      type="button"
                      onClick={vals.handOff}
                      style={{
                        all: 'unset',
                        flex: '1',
                        height: '48px',
                        boxSizing: 'border-box',
                        borderRadius: '999px',
                        background: '#FFFDF8',
                        border: '3px dashed #2A2522',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Hand Off
                    </button>
                  </div>

                  <span
                    style={{ textAlign: 'center', fontSize: '12px', fontWeight: '800', color: '#5E564D' }}
                  >
                    Amara can write {vals.writesLeft} more pieces this week
                  </span>
                </>
              ) : null}

              {vals.entered ? (
                <div
                  style={{
                    border: '3px solid #2A2522',
                    borderRadius: '18px',
                    background: '#E3F0DF',
                    padding: '10px 14px',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  {vals.enteredText}
                </div>
              ) : null}
            </div>
          ) : null}

          {/* PUBLISHED */}

          {vals.isPub ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {vals.works.map((w, $index) => (
                <ScreenLink
                  key={$index}
                  href="WorkDetail.dc.html"
                  aria-label={`Open ${w.title}`}
                  style={{
                    border: '3px solid #2A2522',
                    borderRadius: '18px',
                    background: '#FFFDF8',
                    boxShadow: '3px 4px 0 #2A2522',
                    padding: '10px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    textDecoration: 'none',
                    color: '#2A2522',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={css(w.kindStyle)}>{w.kind}</span>

                    <span style={{ flex: '1', fontSize: '12px', fontWeight: '800', color: '#5E564D' }}>
                      {w.where}
                    </span>

                    <span style={css(w.whoIcon)}>
                      {w.byYou ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M4 20 l3 -1 l12 -12 a2 2 0 0 0 -3 -3 l-12 12 z"
                            fill="#FFFDF8"
                            stroke="#2A2522"
                            strokeWidth="2.6"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}

                      {w.byHer ? (
                        <svg width="14" height="14" viewBox="0 0 40 40" aria-hidden="true">
                          <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                          <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                          <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                        </svg>
                      ) : null}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '17px',
                      fontWeight: '700',
                      lineHeight: '1.15',
                    }}
                  >
                    {w.title}
                  </span>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div
                      style={{
                        border: '2px solid #2A2522',
                        borderRadius: '10px',
                        padding: '5px 8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: '800',
                          letterSpacing: '.05em',
                          color: '#5E564D',
                        }}
                      >
                        PLAYERS' VOTES
                      </span>

                      <span
                        style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '700' }}
                      >
                        ▲ {w.up} ▼ {w.down}
                      </span>
                    </div>

                    <div
                      style={{
                        border: '2px dashed #2A2522',
                        borderRadius: '10px',
                        padding: '5px 8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: '800',
                          letterSpacing: '.05em',
                          color: '#5E564D',
                        }}
                      >
                        BUILDING READ IT AS
                      </span>

                      <span
                        style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '700' }}
                      >
                        {w.reception}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ flex: '1', fontSize: '12.5px', fontWeight: '700', color: '#5E564D' }}>
                      {w.note}
                    </span>

                    {w.hasRoyalty ? (
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px',
                          fontSize: '12.5px',
                          fontWeight: '800',
                          background: '#E3F0DF',
                          border: '2px solid #2A2522',
                          borderRadius: '999px',
                          padding: '0 8px',
                        }}
                      >
                        +
                        <svg width="7" height="10" viewBox="0 0 30 40" aria-hidden="true">
                          <path
                            d="M4 8 H26 L4 32 H26"
                            fill="none"
                            stroke="#2A2522"
                            strokeWidth="5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                          <path
                            d="M15 2 V38"
                            fill="none"
                            stroke="#2A2522"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>{w.royalty}</span> royalties
                      </span>
                    ) : null}
                  </div>
                </ScreenLink>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
