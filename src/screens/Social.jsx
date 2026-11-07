// Social
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Social extends Screen {
  static title = 'Social';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const view = this.state.view ?? 'people';
    const group = this.state.group ?? 'all';
    const face = {
      warm: {
        brow: 'M15 22 Q18 20 21 22 M27 22 Q30 20 33 22',
        mouth: 'M19 33 Q24 37 29 33',
        bg: '#FDE3C8',
        word: 'warm',
      },
      wary: { brow: 'M15 21 L21 23 M33 21 L27 23', mouth: 'M20 34 L28 33', bg: '#F7D6D6', word: 'wary' },
      curious: {
        brow: 'M15 22 L21 22 M27 20 Q30 18 33 20',
        mouth: 'M21 33 Q24 35 27 33',
        bg: '#E3F0DF',
        word: 'curious',
      },
      fond: {
        brow: 'M15 21 Q18 19 21 21 M27 21 Q30 19 33 21',
        mouth: 'M18 32 Q24 38 30 32',
        bg: '#FDE3C8',
        word: 'fond',
      },
      unsure: {
        brow: 'M15 21 Q18 23 21 21 M27 21 Q30 23 33 21',
        mouth: 'M20 35 Q24 33 28 35',
        bg: '#EFE4CF',
        word: 'unsure',
      },
    };
    const G = {
      friend: { label: 'Friends', ring: '#E8B53A', tag: 'Friend', bg: '#FDE3C8' },
      rival: { label: 'Rivals', ring: '#C8553D', tag: 'Rival', bg: '#F7D6D6' },
      neighbour: { label: 'Neighbours', ring: 'transparent', tag: 'Neighbour', bg: '#EFE4CF' },
      circle: { label: 'Esusu', ring: 'transparent', tag: 'Esusu', bg: '#E3F0DF' },
    };
    const all = [
      {
        name: 'Kemi',
        g: 'friend',
        frame: '#F7D6D6',
        skin: '#A8714A',
        style: 'wrap',
        feel: 'warm',
        close: 4,
        trust: 5,
      },
      {
        name: 'Tunde',
        g: 'rival',
        frame: '#F7D6D6',
        skin: '#5A3520',
        style: 'short',
        feel: 'wary',
        close: 2,
        trust: 1,
      },
      {
        name: 'Mama Ngozi',
        g: 'neighbour',
        frame: '#FDE3C8',
        skin: '#6B4027',
        style: 'wrap',
        feel: 'fond',
        close: 3,
        trust: 4,
      },
      {
        name: 'Chidi',
        g: 'circle',
        frame: '#CFE3F4',
        skin: '#7A4A2E',
        style: 'short',
        feel: 'unsure',
        close: 1,
        trust: 3,
      },
      {
        name: 'Zainab',
        g: 'circle',
        frame: '#E3F0DF',
        skin: '#8B5A3C',
        style: 'puffs',
        feel: 'warm',
        close: 2,
        trust: 4,
      },
      {
        name: 'Femi',
        g: 'neighbour',
        frame: '#E3F0DF',
        skin: '#8B5A3C',
        style: 'short',
        feel: 'curious',
        close: 1,
        trust: 2,
      },
    ];
    const dots = (n, on) =>
      [0, 1, 2, 3, 4].map((k) => ({
        style:
          'width: 8px; height: 8px; box-sizing: border-box; border-radius: 50%; border: 1.5px solid #2A2522; background: ' +
          (k < n ? on : '#FFFDF8') +
          ';',
      }));
    const people = all
      .filter((p) => group === 'all' || p.g === group)
      .map((p) => {
        const g = G[p.g];
        const f = face[p.feel];
        return {
          name: p.name,
          tag: g.tag,
          ring: g.ring,
          frame: p.frame,
          skin: p.skin,
          puffs: p.style === 'puffs' ? '1' : '0',
          hair: p.style === 'wrap' ? '0' : '1',
          wrap: p.style === 'wrap' ? '1' : '0',
          tagStyle:
            'font-size: 11px; font-weight: 800; background: ' +
            g.bg +
            '; border: 2px solid #2A2522; border-radius: 999px; padding: 0 7px;',
          closeDots: dots(p.close, '#E8584E'),
          trustDots: dots(p.trust, '#8FC1A9'),
          closeLabel: 'Closeness ' + p.close + ' of 5',
          trustLabel: 'Trust ' + p.trust + ' of 5',
          brow: f.brow,
          mouth: f.mouth,
          feelBg: f.bg,
          feel: f.word,
          feelLabel: 'Amara feels ' + f.word + ' towards ' + p.name,
        };
      });
    const gkeys = ['all', 'friend', 'rival', 'neighbour', 'circle'];
    const groups = gkeys.map((k) => ({
      label: k === 'all' ? 'All' : G[k].label,
      on: group === k ? 'true' : 'false',
      pick: () => this.setState({ group: k }),
      swatch:
        k === 'all'
          ? 'display: none;'
          : 'width: 10px; height: 10px; box-sizing: border-box; border-radius: 50%; border: 2px solid #2A2522; background: ' +
            (G[k].ring === 'transparent' ? G[k].bg : G[k].ring) +
            ';',
      style:
        'all: unset; flex: none; box-sizing: border-box; height: 32px; display: flex; align-items: center; gap: 5px; padding: 0 10px; border: 2.5px solid #2A2522; border-radius: 999px; font-family: Fredoka, sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; background: ' +
        (group === k ? accent : '#FFFDF8') +
        ';',
    }));
    const tab = (on) =>
      'all: unset; height: 46px; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; background: ' +
      (on ? accent : '#FFFDF8') +
      ';';
    const threads = [
      { name: 'Kemi', last: 'Ludo again tonight?', time: '7:22 pm', unread: true, bg: '#F7D6D6' },
      { name: 'Tunde', last: 'I will pay next week, abeg', time: '7:05 pm', unread: true, bg: '#F7D6D6' },
      {
        name: 'Esusu group',
        last: 'Round 4 starts Friday',
        time: '5:40 pm',
        unread: false,
        group: true,
        bg: '#E3F0DF',
      },
      {
        name: 'Mama Ngozi',
        last: 'Thank you for the vote, my dear',
        time: 'Mon',
        unread: false,
        bg: '#FDE3C8',
      },
    ].map((t) => ({
      name: t.name,
      last: t.last,
      time: t.time,
      unread: t.unread,
      href: t.name === 'Kemi' ? 'Thread.dc.html' : '#',
      isGroup: !!t.group,
      isPerson: !t.group,
      initial: t.name.charAt(0),
      icon:
        'width: 48px; height: 48px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 14px; background: ' +
        t.bg +
        '; display: flex; align-items: center; justify-content: center;',
    }));
    return {
      accent,
      people,
      groups,
      threads,
      isPeople: view === 'people',
      isMessages: view === 'messages',
      peopleOn: view === 'people' ? 'true' : 'false',
      messagesOn: view === 'messages' ? 'true' : 'false',
      peopleTab: tab(view === 'people'),
      messagesTab: tab(view === 'messages') + ' border-left: 3px solid #2A2522;',
      showPeople: () => this.setState({ view: 'people' }),
      showMessages: () => this.setState({ view: 'messages' }),
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
            Social
          </h1>

          <svg width="52" height="52" viewBox="0 0 60 60" aria-hidden="true">
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
              d="M28 4 h16 a4 4 0 0 1 4 4 v6 a4 4 0 0 1 -4 4 h-9 l-5 4 v-4 h-2 a4 4 0 0 1 -4 -4 v-6 a4 4 0 0 1 4 -4 z"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            <path d="M36 14 l-4 -4 a2.2 2.2 0 0 1 4 -2 a2.2 2.2 0 0 1 4 2 z" fill="#E8584E" />
          </svg>
        </header>

        <nav
          aria-label="Views"
          style={{
            margin: '0 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '0',
            border: '3px solid #2A2522',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#FFFDF8',
            boxShadow: '3px 4px 0 #2A2522',
          }}
        >
          <button
            type="button"
            onClick={vals.showPeople}
            aria-pressed={vals.peopleOn}
            style={css(vals.peopleTab)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="8" cy="9" r="3.5" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2" />
              <circle cx="16" cy="9" r="3.5" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2" />
              <path
                d="M2 20 c0 -4 3 -6 6 -6 c3 0 6 2 6 6 M10 20 c0 -4 3 -6 6 -6 c3 0 6 2 6 6"
                fill="none"
                stroke="#2A2522"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            People
          </button>

          <button
            type="button"
            onClick={vals.showMessages}
            aria-pressed={vals.messagesOn}
            style={css(vals.messagesTab)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 5 h16 a1 1 0 0 1 1 1 v10 a1 1 0 0 1 -1 1 h-9 l-5 4 v-4 h-2 a1 1 0 0 1 -1 -1 v-10 a1 1 0 0 1 1 -1 z"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M8 10 h8 M8 13 h5" stroke="#2A2522" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Messages
            <span
              style={{
                minWidth: '20px',
                height: '20px',
                boxSizing: 'border-box',
                padding: '0 5px',
                border: '2px solid #2A2522',
                borderRadius: '999px',
                background: '#C8553D',
                color: '#FFFDF8',
                fontSize: '11px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              2
            </span>
          </button>
        </nav>

        {vals.isPeople ? (
          <>
            <nav
              aria-label="Groups"
              style={{
                display: 'flex',
                gap: '6px',
                padding: '14px 20px 8px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
              }}
            >
              {vals.groups.map((g, $index) => (
                <button key={$index} type="button" onClick={g.pick} aria-pressed={g.on} style={css(g.style)}>
                  <span style={css(g.swatch)} />
                  {g.label}
                </button>
              ))}
            </nav>

            <section
              aria-label="People"
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
              {vals.people.map((p, $index) => (
                <ScreenLink
                  key={$index}
                  href="ResidentCard.dc.html"
                  aria-label={p.name}
                  style={{
                    textDecoration: 'none',
                    color: '#2A2522',
                    border: '3px solid #2A2522',
                    borderRadius: '18px',
                    background: '#FFFDF8',
                    boxShadow: '3px 4px 0 #2A2522',
                    padding: '8px 12px 8px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <svg width="56" height="56" viewBox="0 0 52 52" aria-hidden="true" style={{ flex: 'none' }}>
                    <circle cx="26" cy="26" r="24" fill="none" stroke={p.ring} strokeWidth="4" />

                    <rect
                      x="6"
                      y="6"
                      width="40"
                      height="40"
                      rx="13"
                      fill={p.frame}
                      stroke="#2A2522"
                      strokeWidth="2.5"
                    />

                    <circle cx="17" cy="15" r="5" fill="#2A2522" opacity={p.puffs} />

                    <circle cx="35" cy="15" r="5" fill="#2A2522" opacity={p.puffs} />

                    <circle cx="26" cy="29" r="12" fill={p.skin} stroke="#2A2522" strokeWidth="2.5" />

                    <path
                      d="M14 27 C14 18 19 16 26 16 C33 16 38 18 38 27 C35 22 31 21 26 21 C21 21 17 22 14 27 Z"
                      fill="#2A2522"
                      opacity={p.hair}
                    />

                    <path
                      d="M13 24 C13 14 20 12 26 12 C32 12 39 14 39 24 C36 20 32 19 26 19 C20 19 16 20 13 24 Z"
                      fill="#C8553D"
                      stroke="#2A2522"
                      strokeWidth="2"
                      opacity={p.wrap}
                    />

                    <circle cx="22" cy="30" r="1.6" fill="#2A2522" />

                    <circle cx="30" cy="30" r="1.6" fill="#2A2522" />

                    <path
                      d="M22 35 Q26 37 30 35"
                      fill="none"
                      stroke="#2A2522"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div
                    style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '4px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          fontFamily: "'Fredoka', sans-serif",
                          fontSize: '17px',
                          fontWeight: '600',
                          lineHeight: '1.1',
                        }}
                      >
                        {p.name}
                      </span>

                      <span style={css(p.tagStyle)}>{p.tag}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        role="img"
                        aria-label={p.closeLabel}
                        style={{ display: 'flex', alignItems: 'center', gap: '3px' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M12 21 l-8 -8 a5 5 0 0 1 8 -6 a5 5 0 0 1 8 6 z"
                            fill="#E8584E"
                            stroke="#2A2522"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                          />
                        </svg>

                        {p.closeDots.map((d, $index) => (
                          <span key={$index} style={css(d.style)} />
                        ))}
                      </span>

                      <span
                        role="img"
                        aria-label={p.trustLabel}
                        style={{ display: 'flex', alignItems: 'center', gap: '3px' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M3 12 l5 -5 l4 3 l4 -3 l5 5 l-7 7 a2 2 0 0 1 -3 0 z"
                            fill="#8FC1A9"
                            stroke="#2A2522"
                            strokeWidth="2.3"
                            strokeLinejoin="round"
                          />
                        </svg>

                        {p.trustDots.map((d, $index) => (
                          <span key={$index} style={css(d.style)} />
                        ))}
                      </span>
                    </div>
                  </div>

                  <div
                    role="img"
                    aria-label={p.feelLabel}
                    title={p.feelLabel}
                    style={{
                      flex: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1px',
                    }}
                  >
                    <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true">
                      <rect
                        x="1.5"
                        y="1.5"
                        width="45"
                        height="45"
                        rx="15"
                        fill={p.feelBg}
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

                      <path d={p.brow} fill="none" stroke="#2A2522" strokeWidth="2" strokeLinecap="round" />

                      <circle cx="19" cy="28" r="1.8" fill="#2A2522" />
                      <circle cx="29" cy="28" r="1.8" fill="#2A2522" />

                      <path d={p.mouth} fill="none" stroke="#2A2522" strokeWidth="2" strokeLinecap="round" />
                    </svg>

                    <span style={{ fontFamily: "'Caveat', cursive", fontSize: '16px', lineHeight: '1' }}>
                      {p.feel}
                    </span>
                  </div>
                </ScreenLink>
              ))}
            </section>
          </>
        ) : null}

        {vals.isMessages ? (
          <section
            aria-label="Messages"
            style={{
              flex: '1',
              minHeight: '0',
              overflow: 'hidden',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {vals.threads.map((t, $index) => (
              <ScreenLink
                key={$index}
                href={t.href}
                style={{
                  textDecoration: 'none',
                  color: '#2A2522',
                  boxSizing: 'border-box',
                  border: '3px solid #2A2522',
                  borderRadius: '18px',
                  background: '#FFFDF8',
                  boxShadow: '3px 4px 0 #2A2522',
                  padding: '8px 12px 8px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={css(t.icon)}>
                  {t.isGroup ? (
                    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="8" fill="none" stroke="#2A2522" strokeWidth="2.4" />
                      <circle cx="12" cy="4" r="2.6" fill="#E8B53A" stroke="#2A2522" strokeWidth="1.6" />
                      <circle cx="19" cy="15" r="2.6" fill="#8FC1A9" stroke="#2A2522" strokeWidth="1.6" />
                      <circle cx="5" cy="15" r="2.6" fill="#E8584E" stroke="#2A2522" strokeWidth="1.6" />
                    </svg>
                  ) : null}

                  {t.isPerson ? (
                    <span
                      style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '20px', fontWeight: '600' }}
                    >
                      {t.initial}
                    </span>
                  ) : null}
                </span>

                <span
                  style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '1px' }}
                >
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '17px',
                      fontWeight: '600',
                      lineHeight: '1.15',
                    }}
                  >
                    {t.name}
                  </span>

                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#4A433B',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {t.last}
                  </span>
                </span>

                <span
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}
                >
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#5E564D' }}>{t.time}</span>

                  {t.unread ? (
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: '#C8553D',
                        border: '2px solid #2A2522',
                      }}
                    />
                  ) : null}
                </span>
              </ScreenLink>
            ))}
          </section>
        ) : null}
      </div>
    );
  }
}
