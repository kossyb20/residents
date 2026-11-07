// Game lobby
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class GameLobby extends Screen {
  static title = 'Game lobby';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const gameKey = this.state.game ?? 'ludo';
    const tabKey = this.state.tab ?? 'live';
    const filterKey = this.state.filter ?? 'all';
    const periodKey = this.state.period ?? 'week';

    const GAMES = {
      ludo: {
        name: 'Ludo',
        seats: 4,
        live: 412,
        week: 9840,
        href: 'Ludo.dc.html',
        cups: [
          ['SATURDAY · 8 PM', 'Ludo Night', 'Entry 5 · 412 of 512 places · pool 2,560'],
          ['EVERY DAY · 6 PM', 'Daily ladder', 'Free · top 10 share 100'],
        ],
      },
      chess: {
        name: 'Chess',
        seats: 2,
        live: 286,
        week: 4410,
        href: 'Chess.dc.html',
        cups: [['SUNDAY · 4 PM', 'Chess blitz', 'Entry 3 · 97 of 128 places · pool 384']],
      },
      ayo: {
        name: 'Ayo',
        seats: 2,
        live: 198,
        week: 3120,
        href: 'Ayo.dc.html',
        cups: [['FRIDAY · 7 PM', 'Ayo masters', 'Entry 2 · 40 of 64 places · pool 128']],
      },
      draughts: {
        name: 'Draughts',
        seats: 2,
        live: 121,
        week: 1980,
        href: 'Draughts.dc.html',
        cups: [['NEXT WEEK', 'Draughts cup', 'Free · 40 of 64 places · trophy and 200']],
      },
      shapes: {
        name: 'Shapes',
        seats: 4,
        live: 164,
        week: 2650,
        href: 'Shapes.dc.html',
        cups: [['THURSDAY · 9 PM', 'Shapes knockout', 'Entry 2 · 88 of 128 places · pool 256']],
      },
      reversi: { name: 'Reversi', seats: 2, live: 58, week: 870, href: 'Reversi.dc.html', cups: [] },
      four: {
        name: 'Four in a row',
        seats: 2,
        live: 77,
        week: 1210,
        href: 'FourInARow.dc.html',
        cups: [['WEDNESDAY · 5 PM', 'Quick-fire cup', 'Free · 21 of 32 places']],
      },
      uttt: {
        name: 'Ultimate tic-tac-toe',
        seats: 2,
        live: 31,
        week: 420,
        href: 'UltimateTTT.dc.html',
        cups: [],
      },
      go: { name: 'Go', seats: 2, live: 19, week: 260, href: 'Go.dc.html', cups: [] },
    };
    const SHORT = { four: 'Four in a row', uttt: 'Ultimate TTT' };
    const g = GAMES[gameKey];
    const fmt = (n) => n.toLocaleString('en-US');

    // Seeded numbers so each game's lobby looks different but stays put between renders.
    let seed = [...gameKey].reduce((n, ch) => n * 31 + ch.charCodeAt(0), 7) >>> 0;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const NAMES = [
      'Kemi',
      'Tunde',
      'Ife',
      'Sade',
      'Musa',
      'Zainab',
      'Kofi',
      'Ama',
      'Chidi',
      'Ngozi',
      'Femi',
      'Bisi',
      'Yaw',
      'Wanjiru',
      'Otieno',
      'Thabo',
      'Lerato',
      'Halima',
      'Kwame',
      'Nia',
      'Juma',
      'Efua',
      'Dayo',
      'Aisha',
    ];
    const FRIENDS = new Set(['Kemi', 'Tunde', 'Ife', 'Sade']);
    const COLORS = ['#F2CE6E', '#9DB8E0', '#8FC1A9', '#F7D6D6', '#E59A6B', '#C9B3D6', '#FDE3C8'];
    const pick = () => NAMES[Math.floor(rnd() * NAMES.length)];

    // Live tables: the sample a phone can hold, sorted by watchers.
    const raw = [];
    for (let i = 0; i < 16; i++) {
      const open = i % 5 === 3;
      const seated = open ? Math.max(1, g.seats - 1 - Math.floor(rnd() * (g.seats - 1))) : g.seats;
      const who = [];
      while (who.length < seated) {
        const n = pick();
        if (!who.includes(n)) who.push(n);
      }
      const rating = Math.round(1300 + rnd() * 700);
      const watch = open ? Math.floor(rnd() * 6) : Math.round(300 * Math.pow(0.72, i) + rnd() * 8);
      raw.push({
        who,
        open,
        seated,
        rating,
        watch,
        move: 4 + Math.floor(rnd() * 40),
        friend: who.some((n) => FRIENDS.has(n)),
      });
    }
    // The arcade's featured game is the most watched table, so it tops the chess list too.
    if (gameKey === 'chess')
      raw.push({
        who: ['Kemi', 'Tunde'],
        open: false,
        seated: 2,
        rating: 1826,
        watch: 312,
        move: 31,
        friend: true,
      });
    raw.sort((a, b) => b.watch - a.watch);
    const keep = {
      all: () => true,
      friends: (r) => r.friend,
      open: (r) => r.open,
      top: (r) => r.rating >= 1700,
    }[filterKey];
    const listed = raw.filter(keep);
    const av = (k, name) =>
      !name
        ? 'display: none;'
        : 'position: absolute; top: 2px; left: ' +
          k * 12 +
          'px; width: 26px; height: 26px; box-sizing: border-box; border: 2px solid #2A2522; border-radius: 50%; background: ' +
          COLORS[(name.charCodeAt(0) + name.length) % COLORS.length] +
          '; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 11.5px; font-weight: 700; z-index: ' +
          (5 - k) +
          ';';
    const rows = listed.map((r) => {
      const who =
        g.seats === 2 && !r.open
          ? r.who.join(' v ')
          : r.who.slice(0, 2).join(', ') + (r.who.length > 2 ? ' +' + (r.who.length - 2) : '');
      const meta = r.open
        ? r.seated + ' of ' + g.seats + ' seated · avg ' + fmt(r.rating)
        : 'Avg ' + fmt(r.rating) + ' · move ' + r.move + (r.friend ? ' · friend' : '');
      const n = r.who;
      return {
        who,
        meta,
        href: g.href,
        watch: String(r.watch),
        cta: r.open ? 'Join' : 'Watch',
        label: who + ', ' + meta,
        i1: (n[0] || '')[0] || '',
        i2: (n[1] || '')[0] || '',
        i3: (n[2] || '')[0] || '',
        i4: (n[3] || '')[0] || '',
        a1: av(0, n[0]),
        a2: av(1, n[1]),
        a3: av(2, n[2]),
        a4: av(3, n[3]),
        s:
          'box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 16px; background: ' +
          (r.friend ? '#FBEBC4' : '#FFFDF8') +
          '; padding: 8px 10px; display: flex; align-items: center; gap: 10px; text-decoration: none; flex: none;',
        btn:
          'height: 28px; box-sizing: border-box; padding: 0 12px; border: 2.5px solid #2A2522; border-radius: 999px; display: flex; align-items: center; font-family: Fredoka, sans-serif; font-size: 13px; font-weight: 600;' +
          (r.open ? ' background: ' + accent + ';' : ' background: #FFFDF8;'),
      };
    });
    const totalFor = {
      all: g.live,
      friends: Math.max(listed.length, Math.round(g.live * 0.02)),
      open: Math.round(g.live * 0.18),
      top: Math.round(g.live * 0.22),
    }[filterKey];
    const showing =
      'Showing ' + rows.length + ' of ' + fmt(Math.max(totalFor, rows.length)) + ' · most watched first';

    // Leaderboard
    const scale = { week: 1, season: 6, all: 30 }[periodKey];
    const boardSeen = new Set();
    const board = [];
    let rating = Math.round(
      2050 + rnd() * 250 + (periodKey === 'all' ? 120 : periodKey === 'season' ? 50 : 0),
    );
    while (board.length < 10) {
      const name = pick();
      if (boardSeen.has(name)) continue;
      boardSeen.add(name);
      const w = Math.round((22 - board.length) * scale * (0.8 + rnd() * 0.4));
      const l = Math.round(w * (0.3 + rnd() * 0.25));
      const k = board.length;
      board.push({
        rank: String(k + 1),
        name,
        ini: name[0],
        wl: fmt(w) + '–' + fmt(l),
        rating: fmt(rating),
        rankStyle:
          'width: 26px; font-family: Fredoka, sans-serif; font-weight: 700;' +
          (k < 3 ? ' color: ' + ['#C08A1E', '#7A7A86', '#A8714A'][k] + ';' : ''),
        av:
          'width: 22px; height: 22px; flex: none; box-sizing: border-box; border: 2px solid #2A2522; border-radius: 50%; background: ' +
          COLORS[(name.charCodeAt(0) + name.length) % COLORS.length] +
          '; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 10.5px; font-weight: 700;',
        s:
          'display: flex; align-items: center; gap: 8px; padding: 7px 12px; font-size: 13.5px; font-weight: 700;' +
          (k < 9 ? ' border-bottom: 1.5px dashed rgba(42,37,34,.25);' : '') +
          (FRIENDS.has(name) ? ' background: #FBEBC4;' : ''),
      });
      rating -= Math.round(18 + rnd() * 30);
    }
    const myRank =
      { week: 148, season: 311, all: 902 }[periodKey] + (gameKey === 'ludo' ? 0 : Math.round(rnd() * 400));
    const myWins = Math.round(9 * scale * (0.7 + rnd() * 0.5));
    const herWins = Math.round(myWins * 0.7);

    const chip = (on) =>
      'all: unset; flex: none; height: 32px; box-sizing: border-box; padding: 0 12px; border-radius: 999px; display: flex; align-items: center; font-size: 13px; font-weight: 800; cursor: pointer; border: 2.5px solid #2A2522;' +
      (on ? ' background: #2A2522; color: #FFFDF8;' : ' background: #FFFDF8; color: #2A2522;');
    const picker = Object.keys(GAMES).map((key) => ({
      name: SHORT[key] || GAMES[key].name,
      on: key === gameKey,
      pick: () => this.setState({ game: key }),
      s: chip(key === gameKey)
        .replace('height: 32px', 'height: 28px')
        .replace('font-size: 13px', 'font-size: 12px'),
    }));
    const tabs = [
      ['live', 'Live ' + fmt(g.live)],
      ['board', 'Leaderboard'],
      ['cups', 'Cups'],
    ].map(([key, name]) => ({
      name,
      on: key === tabKey,
      pick: () => this.setState({ tab: key }),
      s:
        'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 14.5px; font-weight: 600; cursor: pointer;' +
        (key === tabKey
          ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
          : ' border: 2.5px solid transparent;'),
    }));
    const filters = [
      ['all', 'All'],
      ['friends', 'Friends'],
      ['open', 'Open seats'],
      ['top', 'Top rated'],
    ].map(([key, name]) => ({
      name,
      on: key === filterKey,
      pick: () => this.setState({ filter: key }),
      s: chip(key === filterKey),
    }));
    const periods = [
      ['week', 'This week'],
      ['season', 'Season'],
      ['all', 'All time'],
    ].map(([key, name]) => ({
      name,
      on: key === periodKey,
      pick: () => this.setState({ period: key }),
      s: chip(key === periodKey),
    }));
    const cupBtn =
      'height: 34px; box-sizing: border-box; padding: 0 14px; border: 2.5px solid #2A2522; border-radius: 12px; background: ' +
      accent +
      '; display: flex; align-items: center; font-family: Fredoka, sans-serif; font-size: 14.5px; font-weight: 600;';
    const cups = g.cups.length
      ? g.cups.map(([when, name, terms]) => ({
          when,
          name,
          terms,
          btn: cupBtn,
          s: 'box-sizing: border-box; border: 3px solid #2A2522; border-radius: 18px; background: #FFFDF8; box-shadow: 4px 5px 0 #2A2522; padding: 11px 13px; display: flex; align-items: center; gap: 10px; flex: none;',
        }))
      : [
          {
            when: 'NONE YET',
            name: 'No cups scheduled',
            terms: 'Residents can ask the arcade for one on the Gig Exchange',
            btn: 'display: none;',
            s: 'box-sizing: border-box; border: 3px dashed #2A2522; border-radius: 18px; padding: 11px 13px; display: flex; align-items: center; gap: 10px; flex: none;',
          },
        ];

    return {
      accent,
      picker,
      tabs,
      filters,
      periods,
      rows,
      showing,
      board,
      cups,
      gameName: g.name,
      gameSub: fmt(g.live) + ' live · ' + fmt(g.week) + ' played this week',
      playHref: g.href,
      isLive: tabKey === 'live',
      isBoard: tabKey === 'board',
      isCups: tabKey === 'cups',
      myRank: fmt(myRank),
      myRating: fmt(1500 + Math.round(rnd() * 200)),
      mySplit: 'You won ' + myWins + ' · Amara won ' + herWins + ' on her own',
      myMove: '▲ ' + (3 + Math.round(rnd() * 20)),
      boardNote: 'Ranked by rating · your games and Amara\u2019s count as one resident',
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
            href="Arcade.dc.html"
            aria-label="Back to the arcade"
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

          <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
            <h1
              style={{
                margin: '0',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '26px',
                fontWeight: '700',
                lineHeight: '1.1',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {vals.gameName}
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>{vals.gameSub}</span>
          </div>
        </header>

        {/* LED ticker: the place's news mixed with labelled sponsors */}

        <div
          role="marquee"
          aria-label="LUDO NIGHT Sat 8 pm, SABI FOODS (sponsor), KEMI v TUNDE chess · move 31, KORA LABS (sponsor), 1,366 GAMES LIVE, NDURA MINING (sponsor)"
          style={{
            margin: '0 20px 10px',
            height: '34px',
            flex: 'none',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '12px',
            background: '#2A2522',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            className="rs-led"
            aria-hidden="true"
            style={{ display: 'flex', width: 'max-content', animationDuration: '33s' }}
          >
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#FFFDF8',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                LUDO NIGHT
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Sat 8 pm</span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#E06A4E',
                textShadow: '0 0 8px #E06A4E99',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                SABI FOODS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Ludo Night</span>
              <span
                style={{
                  border: '1px solid #E06A4E',
                  borderRadius: '3px',
                  padding: '0 3px',
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  textShadow: 'none',
                  opacity: '.85',
                }}
              >
                SPONSOR
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#FFFDF8',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                KEMI v TUNDE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>chess · move 31</span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#9DB8E0',
                textShadow: '0 0 8px #9DB8E099',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                KORA LABS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Chess blitz</span>
              <span
                style={{
                  border: '1px solid #9DB8E0',
                  borderRadius: '3px',
                  padding: '0 3px',
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  textShadow: 'none',
                  opacity: '.85',
                }}
              >
                SPONSOR
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#FFFDF8',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                1,366 GAMES LIVE
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#8FC1A9',
                textShadow: '0 0 8px #8FC1A999',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                NDURA MINING
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Draughts cup</span>
              <span
                style={{
                  border: '1px solid #8FC1A9',
                  borderRadius: '3px',
                  padding: '0 3px',
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  textShadow: 'none',
                  opacity: '.85',
                }}
              >
                SPONSOR
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#FFFDF8',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                LUDO NIGHT
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Sat 8 pm</span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#E06A4E',
                textShadow: '0 0 8px #E06A4E99',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                SABI FOODS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Ludo Night</span>
              <span
                style={{
                  border: '1px solid #E06A4E',
                  borderRadius: '3px',
                  padding: '0 3px',
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  textShadow: 'none',
                  opacity: '.85',
                }}
              >
                SPONSOR
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#FFFDF8',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                KEMI v TUNDE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>chess · move 31</span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#9DB8E0',
                textShadow: '0 0 8px #9DB8E099',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                KORA LABS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Chess blitz</span>
              <span
                style={{
                  border: '1px solid #9DB8E0',
                  borderRadius: '3px',
                  padding: '0 3px',
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  textShadow: 'none',
                  opacity: '.85',
                }}
              >
                SPONSOR
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#FFFDF8',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                1,366 GAMES LIVE
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
            <span
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 12px',
                whiteSpace: 'nowrap',
                color: '#8FC1A9',
                textShadow: '0 0 8px #8FC1A999',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '14.5px',
                  fontWeight: '700',
                  letterSpacing: '.08em',
                }}
              >
                NDURA MINING
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Draughts cup</span>
              <span
                style={{
                  border: '1px solid #8FC1A9',
                  borderRadius: '3px',
                  padding: '0 3px',
                  fontSize: '8.5px',
                  fontWeight: '800',
                  letterSpacing: '.05em',
                  textShadow: 'none',
                  opacity: '.85',
                }}
              >
                SPONSOR
              </span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
          </div>
        </div>

        {/* Mockup only: which game's lobby to show. In the game each tile opens its own lobby. */}

        <div
          className="gl-row"
          role="tablist"
          aria-label="Game"
          style={{
            display: 'flex',
            gap: '7px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            padding: '2px 20px 10px',
            flex: 'none',
          }}
        >
          {vals.picker.map((p, $index) => (
            <button
              key={$index}
              type="button"
              role="tab"
              aria-selected={p.on}
              onClick={p.pick}
              style={css(p.s)}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Play */}

        <div style={{ display: 'flex', gap: '10px', padding: '0 20px', flex: 'none' }}>
          <ScreenLink
            href={vals.playHref}
            style={{
              flex: '1.3',
              height: '48px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '16px',
              background: vals.accent,
              boxShadow: '3px 4px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '17px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 4 L20 12 L7 20 Z" fill="#2A2522" />
            </svg>
            Quick match
          </ScreenLink>

          <ScreenLink
            href={vals.playHref}
            style={{
              flex: '1',
              height: '48px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '16px',
              background: '#FFFDF8',
              boxShadow: '3px 4px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Invite a friend
          </ScreenLink>
        </div>

        <div
          role="tablist"
          aria-label="Lobby"
          style={{
            margin: '14px 20px 0',
            height: '42px',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '999px',
            background: '#FFFDF8',
            padding: '3px',
            display: 'flex',
            flex: 'none',
          }}
        >
          {vals.tabs.map((t, $index) => (
            <button
              key={$index}
              type="button"
              role="tab"
              aria-selected={t.on}
              onClick={t.pick}
              style={css(t.s)}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* LIVE: a long list, filtered and sorted, never drawn as a room */}

        {vals.isLive ? (
          <div
            className="gl-row"
            aria-label="Filter"
            style={{
              display: 'flex',
              gap: '7px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              padding: '12px 20px 2px',
              flex: 'none',
            }}
          >
            {vals.filters.map((f, $index) => (
              <button key={$index} type="button" aria-pressed={f.on} onClick={f.pick} style={css(f.s)}>
                {f.name}
              </button>
            ))}
          </div>
        ) : null}

        {vals.isBoard ? (
          <div
            className="gl-row"
            aria-label="Period"
            style={{ display: 'flex', gap: '7px', padding: '12px 20px 2px', flex: 'none' }}
          >
            {vals.periods.map((f, $index) => (
              <button key={$index} type="button" aria-pressed={f.on} onClick={f.pick} style={css(f.s)}>
                {f.name}
              </button>
            ))}
          </div>
        ) : null}

        <div
          className="gl-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '10px 20px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '9px',
          }}
        >
          {vals.isLive ? (
            <>
              {vals.rows.map((r, $index) => (
                <ScreenLink key={$index} href={r.href} aria-label={r.label} style={css(r.s)}>
                  <span style={{ width: '54px', height: '30px', flex: 'none', position: 'relative' }}>
                    <span style={css(r.a1)}>{r.i1}</span>
                    <span style={css(r.a2)}>{r.i2}</span>
                    <span style={css(r.a3)}>{r.i3}</span>
                    <span style={css(r.a4)}>{r.i4}</span>
                  </span>

                  <span
                    style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '1px' }}
                  >
                    <span
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '15px',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {r.who}
                    </span>

                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#5E564D',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {r.meta}
                    </span>
                  </span>

                  <span
                    style={{
                      flex: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '3px',
                    }}
                  >
                    <span style={css(r.btn)}>{r.cta}</span>

                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        color: '#5E564D',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#5E564D"
                        strokeWidth="2.8"
                        aria-hidden="true"
                      >
                        <path d="M2 12 C5 6 19 6 22 12 C19 18 5 18 2 12 Z M12 9 A3 3 0 1 0 12.01 9" />
                      </svg>
                      {r.watch}
                    </span>
                  </span>
                </ScreenLink>
              ))}

              <div
                style={{
                  padding: '4px 0 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#5E564D' }}>
                  {vals.showing}
                </span>

                <span
                  style={{
                    height: '34px',
                    boxSizing: 'border-box',
                    padding: '0 16px',
                    border: '2.5px dashed #2A2522',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Load more
                </span>
              </div>
            </>
          ) : null}

          {/* LEADERBOARD */}

          {vals.isBoard ? (
            <>
              <div
                style={{
                  boxSizing: 'border-box',
                  border: '3px solid #2A2522',
                  borderRadius: '18px',
                  background: '#CFE3F4',
                  boxShadow: '4px 5px 0 #2A2522',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flex: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '20px',
                    fontWeight: '700',
                    minWidth: '50px',
                  }}
                >
                  #{vals.myRank}
                </span>

                <span style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15.5px', fontWeight: '700' }}
                  >
                    You and Amara · {vals.myRating}
                  </span>

                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#3A302A' }}>
                    {vals.mySplit}
                  </span>
                </span>

                <span style={{ fontSize: '12px', fontWeight: '800', color: '#2F6B5F' }}>{vals.myMove}</span>
              </div>

              <div
                style={{
                  boxSizing: 'border-box',
                  border: '3px solid #2A2522',
                  borderRadius: '18px',
                  background: '#FFFDF8',
                  boxShadow: '4px 5px 0 #2A2522',
                  overflow: 'hidden',
                  flex: 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderBottom: '2.5px solid #2A2522',
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#5E564D',
                  }}
                >
                  <span style={{ width: '26px' }}>#</span>
                  <span style={{ flex: '1' }}>Resident</span>
                  <span style={{ width: '54px', textAlign: 'right' }}>W–L</span>
                  <span style={{ width: '48px', textAlign: 'right' }}>Rating</span>
                </div>

                {vals.board.map((b, $index) => (
                  <div key={$index} style={css(b.s)}>
                    <span style={css(b.rankStyle)}>{b.rank}</span>

                    <span
                      style={{ flex: '1', minWidth: '0', display: 'flex', alignItems: 'center', gap: '7px' }}
                    >
                      <span style={css(b.av)}>{b.ini}</span>

                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {b.name}
                      </span>
                    </span>

                    <span style={{ width: '54px', textAlign: 'right', color: '#5E564D' }}>{b.wl}</span>

                    <span
                      style={{
                        width: '48px',
                        textAlign: 'right',
                        fontFamily: "'Fredoka', sans-serif",
                        fontWeight: '700',
                      }}
                    >
                      {b.rating}
                    </span>
                  </div>
                ))}
              </div>

              <span style={{ fontSize: '12px', fontWeight: '700', color: '#5E564D', textAlign: 'center' }}>
                {vals.boardNote}
              </span>
            </>
          ) : null}

          {/* CUPS */}

          {vals.isCups ? (
            <>
              {vals.cups.map((c, $index) => (
                <div key={$index} style={css(c.s)}>
                  <span style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: '800',
                        letterSpacing: '.05em',
                        color: '#8E4129',
                      }}
                    >
                      {c.when}
                    </span>

                    <span
                      style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '700' }}
                    >
                      {c.name}
                    </span>

                    <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#5E564D' }}>{c.terms}</span>
                  </span>

                  <span style={css(c.btn)}>Sign up</span>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    );
  }
}
