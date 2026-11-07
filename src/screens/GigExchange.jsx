// Gig Exchange
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class GigExchange extends Screen {
  static title = 'Gig Exchange';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const tab = this.state.tab ?? 'gigs';
    const isGigs = tab === 'gigs',
      isReq = tab === 'req';
    const tabStyle = (on) =>
      'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; cursor: pointer;' +
      (on
        ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
        : ' border: 2.5px solid transparent;');
    const words = ['', 'weak', 'shaky', 'decent', 'good', 'great'];
    const dots = (n) =>
      [1, 2, 3, 4, 5].map((k) => ({
        s:
          'width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid #2A2522; background: ' +
          (k <= n ? '#2E4A3B' : '#FFFDF8') +
          ';',
      }));
    const ODDS = {
      5: ['Likely', '#8FC1A9'],
      4: ['Likely', '#8FC1A9'],
      3: ['Tight', '#F2CE6E'],
      2: ['Risky', '#F2B8AE'],
      1: ['Risky', '#F2B8AE'],
    };
    const gs = this.state.gs ?? { stock: 'taken' };
    const G = [
      {
        id: 'flyers',
        title: 'Hand out Ludo Night flyers',
        poster: 'the Arcade',
        pay: 12,
        due: 'Sat',
        skill: 'People',
        lvl: 3,
        places: '3 of 5 left',
        bg: '#FDE3C8',
        fill: '#F2CE6E',
        glyph: 'M4 4 H16 V20 H4 Z M16 8 L21 6 V18 L16 16 M7 8 H13 M7 12 H13',
        her: 'take',
      },
      {
        id: 'judge',
        title: 'Judge the 100-word story contest',
        poster: 'the Library',
        pay: 20,
        due: 'Sun',
        skill: 'Writing',
        lvl: 3,
        places: '1 of 3 left',
        bg: '#E3F0DF',
        fill: '#FFFDF8',
        glyph: 'M4 20 L5 15 L16 4 L20 8 L9 19 Z M14 6 L18 10',
        her: 'take',
      },
      {
        id: 'ore',
        title: 'Map ore samples on floor 1',
        poster: 'Ndura Mining',
        pay: 40,
        due: 'Fri',
        skill: 'Earth science',
        lvl: 2,
        places: '2 of 2 left',
        bg: '#EFE4CF',
        fill: '#C08A5B',
        glyph: 'M2 20 L9 8 L13 14 L16 10 L22 20 Z M9 8 V3',
        sponsored: true,
        her: 'pass',
      },
      {
        id: 'stock',
        title: 'Count supermarket stock',
        poster: 'Sabi Foods',
        pay: 25,
        due: 'Thu',
        skill: 'Numbers',
        lvl: 4,
        places: 'full',
        bg: '#E3F0DF',
        fill: '#FDE3C8',
        glyph: 'M3 9 H21 L19 20 H5 Z M7 9 L10 4 M17 9 L14 4',
        sponsored: true,
        her: 'take',
      },
    ];
    const gigs = G.map((g) => {
      const s = gs[g.id];
      const o = ODDS[g.lvl];
      const youTook = s === 'you',
        herTook = s === 'her' || s === 'taken',
        herPass = s === 'pass';
      return {
        title: g.title,
        poster: g.poster,
        pay: String(g.pay),
        due: g.due,
        skill: g.skill,
        word: words[g.lvl],
        dots: dots(g.lvl),
        places: g.places,
        bg: g.bg,
        fill: g.fill,
        glyph: g.glyph,
        sponsored: !!g.sponsored,
        odds: o[0],
        oddsStyle:
          'font-size: 12px; font-weight: 800; border: 2px solid #2A2522; border-radius: 999px; padding: 0 8px; background: ' +
          o[1] +
          ';',
        label: g.title + ' for ' + g.poster + ', pays ' + g.pay + ' Zael, due ' + g.due,
        open: !s,
        done: !!s,
        isMine: youTook || herTook,
        byYou: youTook,
        byHer: herTook || herPass,
        result: youTook
          ? 'You took it · pay held in escrow'
          : s === 'taken'
            ? 'She took this one on Monday'
            : herTook
              ? 'Amara took it'
              : 'Amara passed: too far from her skills',
        whoIcon:
          'width: 26px; height: 26px; flex: none; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center; ' +
          (youTook
            ? 'border: 2px solid #2A2522; background: #CFE3F4;'
            : 'border: 2px dashed #2A2522; background: #EFE4CF;'),
        card:
          'position: relative; border: 3px solid #2A2522; border-radius: 16px; background: #FFFDF8; box-shadow: 3px 4px 0 #2A2522; padding: 12px 12px 10px; display: flex; flex-direction: column; gap: 8px;' +
          (s ? ' opacity: .92;' : ''),
        take: () => this.setState({ gs: { ...gs, [g.id]: 'you' } }),
        hand: () => this.setState({ gs: { ...gs, [g.id]: g.her === 'pass' ? 'pass' : 'her' } }),
      };
    });
    const mine =
      2 + Object.entries(gs).filter(([k, v]) => k !== 'stock' && (v === 'you' || v === 'her')).length;

    const votes = this.state.votes ?? {};
    const rs = this.state.rs ?? {};
    const draftA = this.state.draftA ?? '';
    const vbtn = (on) =>
      'all: unset; cursor: pointer; height: 28px; padding: 0 10px; box-sizing: border-box; border: 2px solid #2A2522; border-radius: 999px; font-size: 12.5px; font-weight: 800; display: flex; align-items: center; background: ' +
      (on ? accent : '#FFFDF8') +
      ';';
    const extraQ = this.state.extraQ ?? [];
    const RQ = extraQ.concat([
      {
        id: 'r1',
        name: 'Ifeoma',
        tone: '#A8714A',
        bounty: 10,
        text: 'Any cheap way to keep a room cool when the power goes out?',
        up: 5,
        down: 0,
        n: 3,
        her: 'Wet cloth over the window and a bowl of water by the fan.',
      },
      {
        id: 'r2',
        name: 'Chidi',
        tone: '#7A4A2E',
        bounty: 5,
        text: 'Ideas for a name for our floor 4 Ludo team?',
        up: 8,
        down: 1,
        n: 7,
        her: 'The Fourth Floor Rollers.',
      },
      {
        id: 'r3',
        name: 'Kemi',
        tone: '#A8714A',
        bounty: 15,
        text: 'Who understands the rent cap rules? Explain it simply please',
        up: 11,
        down: 0,
        n: 4,
        her: 'If it passes, your rent can only go up 10% a season.',
      },
    ]);
    const reqs = RQ.map((r) => {
      const v = votes[r.id],
        st = rs[r.id];
      return {
        name: r.name,
        bounty: String(r.bounty),
        text: r.text,
        face:
          'width: 26px; height: 26px; flex: none; box-sizing: border-box; border-radius: 50%; border: 2.5px solid #2A2522; background: ' +
          r.tone +
          ';',
        up: String(r.up + (v === 'up' ? 1 : 0)),
        down: String(r.down + (v === 'down' ? 1 : 0)),
        upStyle: vbtn(v === 'up'),
        downStyle: vbtn(v === 'down'),
        voteUp: () => this.setState({ votes: { ...votes, [r.id]: v === 'up' ? null : 'up' } }),
        voteDown: () => this.setState({ votes: { ...votes, [r.id]: v === 'down' ? null : 'down' } }),
        answers: 'See ' + (r.n + (st && st.done ? 1 : 0)) + ' answers',
        canAnswer: !r.own && !st,
        writing: !!st && !st.done,
        answered: !!st && st.done,
        byYou: !!st && st.by === 'you',
        byHer: !!st && st.by === 'her',
        myAnswer: st && st.done ? st.text : '',
        whoIcon:
          'width: 22px; height: 22px; flex: none; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center; ' +
          (st && st.by === 'you'
            ? 'border: 2px solid #2A2522; background: #CFE3F4;'
            : 'border: 2px dashed #2A2522; background: #EFE4CF;'),
        write: () => this.setState({ rs: { ...rs, [r.id]: { by: 'you' } }, draftA: '' }),
        send: () => {
          if (draftA.trim())
            this.setState({
              rs: { ...rs, [r.id]: { by: 'you', done: true, text: draftA.trim() } },
              draftA: '',
            });
        },
        hand: () =>
          this.setState({
            rs: { ...rs, [r.id]: { by: 'her', done: true, text: r.her || 'She skipped this one.' } },
          }),
      };
    });

    const posted = this.state.posted ?? null;
    const T = [
      ['Errand', '#FDE3C8', 'M3 9 H21 L19 20 H5 Z M7 9 L10 4 M17 9 L14 4'],
      ['Tutoring', '#CFE3F4', 'M12 4 L22 9 L12 14 L2 9 Z M6 11 V16 C6 18 18 18 18 16 V11'],
      ['Repair', '#E3F0DF', 'M14 4 A5 5 0 0 0 9 10 L3 16 L6 19 L12 13 A5 5 0 0 0 18 8 L15 9 L13 7 Z'],
      ['Survey', '#F7D6D6', 'M5 3 H19 V21 H5 Z M8 8 H16 M8 12 H16 M8 16 H12'],
    ];
    const templates = T.map(([name, bg, glyph]) => ({
      name,
      glyph,
      fill: bg,
      s:
        'all: unset; flex: none; height: 36px; padding: 0 12px 0 8px; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 999px; display: flex; align-items: center; gap: 5px; font-family: Fredoka, sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; background: ' +
        (posted === name ? accent : '#FFFDF8') +
        ';',
      go: () => this.setState({ posted: name }),
    }));
    const draftQ = this.state.draftQ ?? '';
    const bounty = this.state.bounty ?? 10;
    return {
      accent,
      isGigs,
      isReq,
      gigsTab: tabStyle(isGigs),
      reqTab: tabStyle(isReq),
      showGigs: () => this.setState({ tab: 'gigs' }),
      showReq: () => this.setState({ tab: 'req' }),
      gigs,
      mine: String(mine),
      reqs,
      draftA,
      typeA: (e) => this.setState({ draftA: e.target.value }),
      templates,
      postTitle: posted ? posted + ' gig posted · pay held in escrow' : 'Post a gig · pick a template',
      draftQ,
      typeQ: (e) => this.setState({ draftQ: e.target.value }),
      bounty: String(bounty),
      bLess: () => this.setState({ bounty: Math.max(0, bounty - 5) }),
      bMore: () => this.setState({ bounty: bounty + 5 }),
      askTitle: 'Ask the building · set a reward',
      ask: () => {
        if (draftQ.trim())
          this.setState({
            extraQ: [
              {
                id: 'q' + extraQ.length,
                name: 'Amara',
                tone: '#7A4A2E',
                bounty,
                text: draftQ.trim(),
                up: 0,
                down: 0,
                n: 0,
                own: true,
              },
            ].concat(extraQ),
            draftQ: '',
          });
      },
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
              Gig Exchange
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>Floor 2</span>
          </div>

          <ScreenLink
            href="Gigs.dc.html"
            aria-label={`My gigs, ${vals.mine} on the go`}
            style={{
              position: 'relative',
              height: '46px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '14px',
              background: '#FDE3C8',
              boxShadow: '3px 4px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 12px 0 8px',
              textDecoration: 'none',
              color: '#2A2522',
            }}
          >
            <svg width="28" height="26" viewBox="0 0 64 58" aria-hidden="true">
              <rect
                x="4"
                y="6"
                width="56"
                height="44"
                rx="5"
                fill="#C08A5B"
                stroke="#2A2522"
                strokeWidth="4"
              />

              <rect
                x="10"
                y="12"
                width="20"
                height="16"
                fill="#FFFDF8"
                stroke="#2A2522"
                strokeWidth="3"
                transform="rotate(-6 20 20)"
              />

              <rect
                x="34"
                y="12"
                width="20"
                height="14"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="3"
                transform="rotate(5 44 19)"
              />
            </svg>

            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '600' }}>
              Mine
            </span>

            <span
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-8px',
                width: '24px',
                height: '24px',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '50%',
                background: '#F2CE6E',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '12px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {vals.mine}
            </span>
          </ScreenLink>
        </header>

        <div
          role="tablist"
          aria-label="Board"
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
            aria-selected={vals.isGigs}
            onClick={vals.showGigs}
            style={css(vals.gigsTab)}
          >
            <svg width="20" height="18" viewBox="0 0 64 58" aria-hidden="true">
              <rect
                x="4"
                y="6"
                width="56"
                height="44"
                rx="5"
                fill="#C08A5B"
                stroke="#2A2522"
                strokeWidth="5"
              />
              <rect x="12" y="13" width="20" height="16" fill="#FFFDF8" stroke="#2A2522" strokeWidth="4" />
            </svg>
            Gigs
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={vals.isReq}
            onClick={vals.showReq}
            style={css(vals.reqTab)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 5 H20 V16 H11 L6 20 V16 H4 Z"
                fill="#F2CE6E"
                stroke="#2A2522"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M10 9 Q10 7 12 7 Q14 7 14 9 Q14 10.5 12 11 V12"
                fill="none"
                stroke="#2A2522"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            Requests
          </button>
        </div>

        <div
          className="gx-scroll"
          style={{ flex: '1', minHeight: '0', overflowY: 'auto', margin: '14px 0 0', padding: '0 20px 12px' }}
        >
          {/* GIGS: structured, from templates */}

          {vals.isGigs ? (
            <div
              style={{
                border: '3px solid #2A2522',
                borderRadius: '20px',
                background: '#C08A5B',
                boxShadow: '4px 5px 0 #2A2522',
                padding: '16px 12px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {vals.gigs.map((g, $index) => (
                <div key={$index} aria-label={g.label} style={css(g.card)}>
                  <span
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      left: '50%',
                      width: '14px',
                      height: '14px',
                      marginLeft: '-7px',
                      borderRadius: '50%',
                      background: '#C8553D',
                      border: '2px solid #2A2522',
                    }}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        width: '40px',
                        height: '40px',
                        flex: 'none',
                        boxSizing: 'border-box',
                        border: '2.5px solid #2A2522',
                        borderRadius: '12px',
                        background: g.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d={g.glyph}
                          fill={g.fill}
                          stroke="#2A2522"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          fontFamily: "'Fredoka', sans-serif",
                          fontSize: '16px',
                          fontWeight: '600',
                          lineHeight: '1.15',
                        }}
                      >
                        {g.title}
                      </span>

                      <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#5E564D' }}>
                        for {g.poster}
                      </span>
                    </div>

                    {g.sponsored ? (
                      <span
                        style={{
                          alignSelf: 'flex-start',
                          fontSize: '10px',
                          fontWeight: '800',
                          letterSpacing: '.06em',
                          border: '2px solid #2A2522',
                          borderRadius: '6px',
                          padding: '0 5px',
                          background: '#F2CE6E',
                        }}
                      >
                        SPONSORED
                      </span>
                    ) : null}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
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
                      {g.pay}
                    </span>

                    <span
                      style={{
                        fontSize: '12.5px',
                        fontWeight: '800',
                        background: '#F7D6D6',
                        border: '2px solid #2A2522',
                        borderRadius: '999px',
                        padding: '0 8px',
                      }}
                    >
                      {g.due}
                    </span>

                    <span
                      aria-label={`${g.skill}, Amara is ${g.word}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        fontSize: '12.5px',
                        fontWeight: '800',
                        background: '#F5EFE5',
                        border: '2px solid #2A2522',
                        borderRadius: '999px',
                        padding: '0 8px',
                      }}
                    >
                      {g.skill}
                      {g.dots.map((d, $index) => (
                        <span key={$index} style={css(d.s)} />
                      ))}
                    </span>

                    <span style={css(g.oddsStyle)}>{g.odds}</span>

                    <span
                      style={{ fontSize: '12px', fontWeight: '800', color: '#5E564D', padding: '1px 2px' }}
                    >
                      {g.places}
                    </span>
                  </div>

                  {g.open ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={g.take}
                        style={{
                          all: 'unset',
                          flex: '1',
                          height: '40px',
                          boxSizing: 'border-box',
                          borderRadius: '999px',
                          background: vals.accent,
                          border: '2.5px solid #2A2522',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: "'Fredoka', sans-serif",
                          fontSize: '15px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        Take
                      </button>

                      <button
                        type="button"
                        onClick={g.hand}
                        style={{
                          all: 'unset',
                          flex: '1',
                          height: '40px',
                          boxSizing: 'border-box',
                          borderRadius: '999px',
                          background: '#FFFDF8',
                          border: '2.5px dashed #2A2522',
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

                  {g.done ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={css(g.whoIcon)}>
                        {g.byYou ? (
                          <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M4 20 l3 -1 l12 -12 a2 2 0 0 0 -3 -3 l-12 12 z"
                              fill="#FFFDF8"
                              stroke="#2A2522"
                              strokeWidth="2.6"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : null}

                        {g.byHer ? (
                          <svg width="15" height="15" viewBox="0 0 40 40" aria-hidden="true">
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
                          </svg>
                        ) : null}
                      </span>

                      <span
                        style={{
                          flex: '1',
                          fontFamily: "'Fredoka', sans-serif",
                          fontSize: '15px',
                          fontWeight: '600',
                        }}
                      >
                        {g.result}
                      </span>

                      {g.isMine ? (
                        <ScreenLink
                          href="Gigs.dc.html"
                          style={{
                            fontFamily: "'Fredoka', sans-serif",
                            fontSize: '13.5px',
                            fontWeight: '600',
                            color: '#8E4129',
                            textDecoration: 'none',
                          }}
                        >
                          My gigs →
                        </ScreenLink>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          {/* REQUESTS: free text, bounties, voted by real players */}

          {vals.isReq ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {vals.reqs.map((r, $index) => (
                <div
                  key={$index}
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
                    <span aria-hidden="true" style={css(r.face)} />

                    <span
                      style={{
                        flex: '1',
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '15px',
                        fontWeight: '600',
                      }}
                    >
                      {r.name}
                    </span>

                    <span
                      aria-label={`Reward ${r.bounty} Zael`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        fontSize: '12.5px',
                        fontWeight: '800',
                        background: '#F2CE6E',
                        border: '2px solid #2A2522',
                        borderRadius: '999px',
                        padding: '0 8px',
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
                      {r.bounty}
                    </span>
                  </div>

                  <ScreenLink
                    href="Request.dc.html"
                    style={{
                      fontSize: '14.5px',
                      fontWeight: '700',
                      lineHeight: '1.3',
                      color: '#2A2522',
                      textDecoration: 'none',
                    }}
                  >
                    {r.text}
                  </ScreenLink>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button type="button" aria-label="Vote up" onClick={r.voteUp} style={css(r.upStyle)}>
                      ▲ <span>{r.up}</span>
                    </button>

                    <button
                      type="button"
                      aria-label="Vote down"
                      onClick={r.voteDown}
                      style={css(r.downStyle)}
                    >
                      ▼ <span>{r.down}</span>
                    </button>

                    <ScreenLink
                      href="Request.dc.html"
                      style={{
                        flex: '1',
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '13.5px',
                        fontWeight: '600',
                        color: '#8E4129',
                        textAlign: 'right',
                        textDecoration: 'none',
                      }}
                    >
                      {r.answers} →
                    </ScreenLink>
                  </div>

                  {r.canAnswer ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={r.write}
                        style={{
                          all: 'unset',
                          flex: '1',
                          height: '38px',
                          boxSizing: 'border-box',
                          borderRadius: '999px',
                          background: vals.accent,
                          border: '2.5px solid #2A2522',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: "'Fredoka', sans-serif",
                          fontSize: '15px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        Answer
                      </button>

                      <button
                        type="button"
                        onClick={r.hand}
                        style={{
                          all: 'unset',
                          flex: '1',
                          height: '38px',
                          boxSizing: 'border-box',
                          borderRadius: '999px',
                          background: '#FFFDF8',
                          border: '2.5px dashed #2A2522',
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

                  {r.writing ? (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="text"
                        aria-label="Your answer"
                        placeholder="Your answer…"
                        value={vals.draftA}
                        onChange={vals.typeA}
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
                        aria-label="Send answer"
                        onClick={r.send}
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
                          width="15"
                          height="15"
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
                  ) : null}

                  {r.answered ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        background: '#F5EFE5',
                        border: '2px dashed #CFC4B2',
                        borderRadius: '12px',
                        padding: '6px 8px',
                      }}
                    >
                      <span style={css(r.whoIcon)}>
                        {r.byYou ? (
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

                        {r.byHer ? (
                          <svg width="14" height="14" viewBox="0 0 40 40" aria-hidden="true">
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
                          </svg>
                        ) : null}
                      </span>

                      <span style={{ flex: '1', fontSize: '13.5px', fontWeight: '700', lineHeight: '1.3' }}>
                        {r.myAnswer}
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Post: a gig from a template, or a free-text request with a bounty */}

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
          {vals.isGigs ? (
            <>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}>
                {vals.postTitle}
              </span>

              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                {vals.templates.map((t, $index) => (
                  <button key={$index} type="button" onClick={t.go} style={css(t.s)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d={t.glyph}
                        fill={t.fill}
                        stroke="#2A2522"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {t.name}
                  </button>
                ))}
              </div>
            </>
          ) : null}

          {vals.isReq ? (
            <>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '600' }}>
                {vals.askTitle}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="text"
                  aria-label="Your question"
                  placeholder="Ask anything…"
                  value={vals.draftQ}
                  onChange={vals.typeQ}
                  style={{
                    flex: '1',
                    minWidth: '0',
                    height: '40px',
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

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2.5px solid #2A2522',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    height: '40px',
                    boxSizing: 'border-box',
                  }}
                >
                  <button
                    type="button"
                    aria-label="Lower reward"
                    onClick={vals.bLess}
                    style={{
                      all: 'unset',
                      width: '26px',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: '700',
                      cursor: 'pointer',
                      background: '#F5EFE5',
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      minWidth: '30px',
                      textAlign: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '14px',
                      fontWeight: '700',
                    }}
                  >
                    {vals.bounty}
                  </span>

                  <button
                    type="button"
                    aria-label="Raise reward"
                    onClick={vals.bMore}
                    style={{
                      all: 'unset',
                      width: '26px',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: '700',
                      cursor: 'pointer',
                      background: '#F5EFE5',
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={vals.ask}
                  style={{
                    all: 'unset',
                    height: '40px',
                    padding: '0 12px',
                    boxSizing: 'border-box',
                    borderRadius: '999px',
                    background: vals.accent,
                    border: '2.5px solid #2A2522',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Post
                </button>
              </div>
            </>
          ) : null}
        </section>
      </div>
    );
  }
}
