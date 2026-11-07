// Diary
import { Fragment } from 'react';
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Diary extends Screen {
  static title = 'Diary';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const who = null;
    const topic = this.state.topic ?? 'all';
    const face = {
      happy: { brow: 'M15 22 Q18 20 21 22 M27 22 Q30 20 33 22', mouth: 'M19 33 Q24 37 29 33' },
      proud: { brow: 'M15 21 Q18 19 21 21 M27 20 Q30 17 33 19', mouth: 'M18 32 Q24 38 30 32' },
      worried: { brow: 'M15 21 Q18 23 21 21 M27 21 Q30 23 33 21', mouth: 'M20 35 Q24 32 28 35' },
      annoyed: { brow: 'M15 21 L21 23 M33 21 L27 23', mouth: 'M20 34 L28 33' },
      calm: { brow: 'M15 22 L21 22 M27 22 L33 22', mouth: 'M20 33 Q24 35 28 33' },
    };
    const ppl = [
      {
        id: 'kemi',
        name: 'Kemi',
        tag: 'Friend',
        ring: '#E8B53A',
        frame: '#F7D6D6',
        skin: '#A8714A',
        style: 'wrap',
        f: 'happy',
        tagBg: '#FDE3C8',
      },
      {
        id: 'tunde',
        name: 'Tunde',
        tag: 'Rival',
        ring: '#C8553D',
        frame: '#F7D6D6',
        skin: '#5A3520',
        style: 'short',
        f: 'annoyed',
        tagBg: '#F7D6D6',
      },
      {
        id: 'femi',
        name: 'Femi',
        tag: 'New',
        ring: 'transparent',
        frame: '#E3F0DF',
        skin: '#8B5A3C',
        style: 'short',
        f: 'calm',
        tagBg: '#E3F0DF',
      },
      {
        id: 'ngozi',
        name: 'Mama Ngozi',
        tag: 'Neighbour',
        ring: 'transparent',
        frame: '#FDE3C8',
        skin: '#6B4027',
        style: 'wrap',
        f: 'happy',
        tagBg: '#EFE4CF',
      },
    ];
    const people = ppl.map((p) => ({
      name: p.name,
      tag: p.tag,
      ring: p.ring,
      frame: p.frame,
      skin: p.skin,
      puffs: '0',
      hair: p.style === 'short' ? '1' : '0',
      wrap: p.style === 'wrap' ? '1' : '0',
      brow: face[p.f].brow.replace(/(\d+) /g, '$1 '),
      mouth: face[p.f].mouth,
      on: who === p.id ? 'true' : 'false',
      opacity: who && who !== p.id ? '0.35' : '1',
      tagStyle:
        'font-size: 11px; font-weight: 800; background: ' +
        p.tagBg +
        '; border: 2px solid #2A2522; border-radius: 999px; padding: 0 7px; white-space: nowrap;',
      pick: () => this.setState({ who: who === p.id ? null : p.id }),
    }));
    const T = [
      { id: 'all', label: 'All topics' },
      { id: 'money', label: 'Money' },
      { id: 'people', label: 'People' },
      { id: 'play', label: 'Play' },
      { id: 'civic', label: 'Civic' },
      { id: 'mind', label: 'Mind' },
    ];
    const topics = T.map((t) => ({
      label: t.label,
      on: topic === t.id ? 'true' : 'false',
      isAll: t.id === 'all',
      isMoney: t.id === 'money',
      isPeople: t.id === 'people',
      isPlay: t.id === 'play',
      isCivic: t.id === 'civic',
      isMind: t.id === 'mind',
      pick: () => this.setState({ topic: t.id }),
      style:
        'all: unset; height: 42px; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 14px; display: flex; align-items: center; justify-content: center; cursor: pointer; background: ' +
        (topic === t.id ? accent : '#FFFDF8') +
        ';' +
        (topic === t.id ? ' box-shadow: 2px 3px 0 #2A2522;' : ''),
    }));
    const A = {
      you: {
        label: 'you decided',
        style:
          'font-size: 12px; font-weight: 700; background: #CFE3F4; border: 2px solid #2A2522; border-radius: 999px; padding: 0 8px;',
      },
      own: {
        label: 'on her own',
        style:
          'font-size: 12px; font-weight: 700; background: #EFE4CF; border: 2px dashed #2A2522; border-radius: 999px; padding: 0 8px;',
      },
      wait: {
        label: 'waiting for you',
        style:
          'font-size: 12px; font-weight: 700; background: #F7D6D6; border: 2px solid #2A2522; border-radius: 999px; padding: 0 8px;',
      },
    };
    const all = [
      {
        day: 'Today',
        text: 'Tunde skipped the esusu. Again?',
        time: '7:10 pm',
        a: 'wait',
        f: 'worried',
        frame: '#F7D6D6',
        who: ['tunde'],
        topic: 'money',
      },
      {
        day: 'Today',
        text: 'Second at Ludo. Kemi rolled a six at the end!',
        time: '6:40 pm',
        a: 'own',
        f: 'happy',
        frame: '#FDE3C8',
        who: ['kemi'],
        topic: 'play',
      },
      {
        day: 'Today',
        text: 'Saved 200 ZAE. Future me says thanks.',
        time: '2:15 pm',
        a: 'you',
        f: 'proud',
        frame: '#E3F0DF',
        who: [],
        topic: 'money',
      },
      {
        day: 'Yesterday',
        text: 'Headphones came back a day late.',
        time: '9:30 pm',
        a: 'own',
        f: 'annoyed',
        frame: '#EFE4CF',
        who: ['tunde'],
        topic: 'people',
      },
      {
        day: 'Yesterday',
        text: 'Voted to cap the rent. Mama Ngozi agrees.',
        time: '4:00 pm',
        a: 'you',
        f: 'calm',
        frame: '#CFE3F4',
        who: ['ngozi'],
        topic: 'civic',
      },
    ];
    const pass = (e) => (!who || e.who.indexOf(who) >= 0) && (topic === 'all' || e.topic === topic);
    const shape = (e) => ({
      text: e.text,
      time: e.time,
      frame: e.frame,
      brow: face[e.f].brow,
      mouth: face[e.f].mouth,
      isYou: e.a === 'you',
      isOwn: e.a === 'own',
      isWait: e.a === 'wait',
    });
    const days = ['Today', 'Yesterday']
      .map((d) => ({ label: d, entries: all.filter((e) => e.day === d && pass(e)).map(shape) }))
      .filter((d) => d.entries.length > 0);
    return { accent, people, topics, days, empty: days.length === 0 };
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
              Amara's diary
            </h1>

            <span style={{ fontFamily: "'Caveat', cursive", fontSize: '19px', lineHeight: '1' }}>
              in her own words
            </span>
          </div>

          <svg width="48" height="48" viewBox="0 0 64 64" aria-hidden="true">
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
        </header>

        <nav
          aria-label="Topics"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
            gap: '6px',
            padding: '4px 20px 6px',
          }}
        >
          {vals.topics.map((t, $index) => (
            <button
              key={$index}
              type="button"
              onClick={t.pick}
              aria-label={t.label}
              aria-pressed={t.on}
              style={css(t.style)}
            >
              {t.isAll ? (
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '14px', fontWeight: '600' }}>
                  All
                </span>
              ) : null}

              {t.isMoney ? (
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" fill="#F2CE6E" stroke="#2A2522" strokeWidth="2.2" />
                  <path
                    d="M9 9 h6 l-6 6 h6 M12 7 v10"
                    fill="none"
                    stroke="#2A2522"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}

              {t.isPeople ? (
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 20 l-7 -7 a4.2 4.2 0 0 1 7 -5 a4.2 4.2 0 0 1 7 5 z"
                    fill="#E8584E"
                    stroke="#2A2522"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}

              {t.isPlay ? (
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="4"
                    fill="#FFFDF8"
                    stroke="#2A2522"
                    strokeWidth="2.2"
                  />
                  <circle cx="9" cy="9" r="1.6" fill="#2A2522" />
                  <circle cx="15" cy="15" r="1.6" fill="#2A2522" />
                  <circle cx="12" cy="12" r="1.6" fill="#2A2522" />
                </svg>
              ) : null}

              {t.isCivic ? (
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="4"
                    y="11"
                    width="16"
                    height="10"
                    rx="2"
                    fill="#FFFDF8"
                    stroke="#2A2522"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M9 3 h6 v8 h-6 z"
                    fill="#F2CE6E"
                    stroke="#2A2522"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}

              {t.isMind ? (
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M10 3 h4 M11 3 v6 l-6 10 a1.5 1.5 0 0 0 1.3 2 h11.4 a1.5 1.5 0 0 0 1.3 -2 l-6 -10 v-6"
                    fill="#FFFDF8"
                    stroke="#2A2522"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path d="M7.5 15 h9 l2 4 h-13 z" fill="#8FC1A9" />
                </svg>
              ) : null}
            </button>
          ))}
        </nav>

        <section
          aria-label="Entries"
          style={{
            flex: '1',
            minHeight: '0',
            overflow: 'hidden',
            padding: '6px 20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {vals.empty ? (
            <p
              style={{
                margin: '40px 0 0',
                textAlign: 'center',
                fontFamily: "'Caveat', cursive",
                fontSize: '26px',
                color: '#5E564D',
              }}
            >
              Nothing here yet.
            </p>
          ) : null}

          {vals.days.map((d, $index) => (
            <Fragment key={$index}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '4px' }}>
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
                  {d.label}
                </span>

                <span style={{ flex: '1', borderTop: '2.5px dashed #D8CCB6' }} />
              </div>

              {d.entries.map((e, $index) => (
                <article
                  key={$index}
                  style={{
                    border: '3px solid #2A2522',
                    borderRadius: '18px',
                    background: '#FFFDF8',
                    boxShadow: '3px 4px 0 #2A2522',
                    padding: '10px 12px',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                  }}
                >
                  <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden="true" style={{ flex: 'none' }}>
                    <rect
                      x="1.5"
                      y="1.5"
                      width="45"
                      height="45"
                      rx="15"
                      fill={e.frame}
                      stroke="#2A2522"
                      strokeWidth="3"
                    />

                    <circle cx="14" cy="13" r="6" fill="#2A2522" />
                    <circle cx="34" cy="13" r="6" fill="#2A2522" />

                    <circle cx="24" cy="27" r="13" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />

                    <path
                      d="M11 26 C11 16 17 13 24 13 C31 13 37 16 37 26 C34 21 29 19 24 19 C19 19 14 21 11 26 Z"
                      fill="#2A2522"
                    />

                    <path d={e.brow} fill="none" stroke="#2A2522" strokeWidth="2" strokeLinecap="round" />

                    <circle cx="19" cy="28" r="1.8" fill="#2A2522" />
                    <circle cx="29" cy="28" r="1.8" fill="#2A2522" />

                    <path d={e.mouth} fill="none" stroke="#2A2522" strokeWidth="2" strokeLinecap="round" />
                  </svg>

                  <div
                    style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '4px' }}
                  >
                    <p
                      style={{
                        margin: '0',
                        fontFamily: "'Caveat', cursive",
                        fontSize: '22px',
                        fontWeight: '500',
                        lineHeight: '1.05',
                      }}
                    >
                      {e.text}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#5E564D' }}>{e.time}</span>

                      {e.isYou ? (
                        <span
                          role="img"
                          aria-label="You decided"
                          title="You decided"
                          style={{
                            width: '26px',
                            height: '26px',
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
                            <path d="M14 6 l4 4" stroke="#2A2522" strokeWidth="2.4" />
                          </svg>
                        </span>
                      ) : null}

                      {e.isOwn ? (
                        <span
                          role="img"
                          aria-label="On her own"
                          title="On her own"
                          style={{
                            width: '26px',
                            height: '26px',
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
                            <circle
                              cx="20"
                              cy="22"
                              r="12"
                              fill="#7A4A2E"
                              stroke="#2A2522"
                              strokeWidth="2.5"
                            />
                            <path
                              d="M8 21 C8 13 13 10 20 10 C27 10 32 13 32 21 C29 16 25 15 20 15 C15 15 11 16 8 21 Z"
                              fill="#2A2522"
                            />
                          </svg>
                        </span>
                      ) : null}

                      {e.isWait ? (
                        <span
                          role="img"
                          aria-label="Waiting for you"
                          title="Waiting for you"
                          style={{
                            width: '26px',
                            height: '26px',
                            boxSizing: 'border-box',
                            border: '2px solid #2A2522',
                            borderRadius: '50%',
                            background: '#F7D6D6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M6 3 h12 M6 21 h12 M7 3 c0 6 10 6 10 9 c0 3 -10 3 -10 9 M17 3 c0 6 -10 6 -10 9 c0 3 10 3 10 9"
                              fill="none"
                              stroke="#2A2522"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path d="M9 19 h6 l-3 -3 z" fill="#C8553D" />
                          </svg>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </Fragment>
          ))}
        </section>
      </div>
    );
  }
}
