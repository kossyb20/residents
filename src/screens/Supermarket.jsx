// Supermarket
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Supermarket extends Screen {
  static title = 'Supermarket';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const tabKey = this.state.tab ?? 'ess';
    const qty = this.state.qty ?? { rice: 1, beans: 1, tomato: 2 };
    const done = this.state.done ?? null; // { by, total, n }

    // icon paths in a 46×42 box
    const SACK = 'M14 8 Q23 2 32 8 L37 36 Q23 42 9 36 Z',
      SACK_D = 'M15 9 Q23 13 31 9 M14 28 H32';
    const CAN = 'M11 8 H35 V36 H11 Z',
      CAN_D = 'M11 14 H35 M11 30 H35';
    const LOAF = 'M6 20 Q6 8 23 8 Q40 8 40 20 V34 H6 Z',
      LOAF_D = 'M15 14 V22 M23 13 V22 M31 14 V22';
    const TOM = 'M23 12 A12 12 0 1 0 23.01 12',
      TOM_D = 'M17 10 L23 14 L29 10 M23 14 V8';
    const BOT = 'M19 4 H27 V11 L32 17 V38 H14 V17 L19 11 Z',
      BOT_D = 'M14 22 H32 V31 H14 Z';
    const EGGS = 'M4 22 H42 V34 H4 Z',
      EGGS_D = 'M11 22 A4 6 0 1 1 11.01 22 M23 22 A4 6 0 1 1 23.01 22 M35 22 A4 6 0 1 1 35.01 22';
    const BOWL = 'M5 18 H41 Q41 36 23 36 Q5 36 5 18 Z',
      BOWL_D = 'M10 18 Q15 10 23 12 Q31 10 36 18';
    const SOAP = 'M8 14 H38 Q42 14 42 18 V30 Q42 34 38 34 H8 Q4 34 4 30 V18 Q4 14 8 14 Z',
      SOAP_D = 'M14 22 Q23 18 32 24';
    const BULB = 'M23 4 A12 12 0 0 1 29 26 V31 H17 V26 A12 12 0 0 1 23 4 Z',
      BULB_D = 'M17 35 H29 M19 39 H27';

    const P = {
      ess: [
        ['rice', 'Rice · 5 kg', 18, '+20%', 'up', SACK, '#FFFDF8', SACK_D, 'none', { tag: 'LOW', limit: 2 }],
        ['beans', 'Beans · 2 kg', 9, '−5%', 'down', SACK, '#C08A5B', SACK_D, 'none'],
        ['bread', 'Bread', 4, '', '', LOAF, '#E2B47F', LOAF_D, 'none'],
        ['tomato', 'Tomatoes', 3, '−8%', 'down', TOM, '#C8553D', TOM_D, 'none'],
        ['oil', 'Palm oil · 1 l', 11, '+3%', 'up', BOT, '#E59A6B', BOT_D, '#F2CE6E'],
        ['eggs', 'Eggs · 6', 6, '', '', EGGS, '#EFE4CF', EGGS_D, '#FFFDF8'],
        ['garri', 'Garri · 2 kg', 7, '−2%', 'down', BOWL, '#FFFDF8', BOWL_D, 'none'],
        ['soap', 'Soap', 3, '', '', SOAP, '#CFE3F4', SOAP_D, 'none'],
      ],
      brand: [
        [
          'sabirice',
          'Sabi Foods rice · 5 kg',
          22,
          '',
          '',
          SACK,
          '#F2CE6E',
          SACK_D,
          'none',
          { tag: 'SPONSORED' },
        ],
        ['sabinood', 'Sabi noodles · 5', 5, '', '', CAN, '#E06A4E', CAN_D, 'none', { tag: 'SPONSORED' }],
        ['bulb', 'Brightline bulb', 6, '', '', BULB, '#FDE3C8', BULB_D, 'none', { tag: 'SPONSORED' }],
        ['tin', 'Sabi tomato paste', 2, '', '', CAN, '#C8553D', CAN_D, 'none', { tag: 'SPONSORED' }],
      ],
      deals: [
        ['tomato', 'Tomatoes', 3, '−8%', 'down', TOM, '#C8553D', TOM_D, 'none', { tag: 'DEAL' }],
        ['beans', 'Beans · 2 kg', 9, '−5%', 'down', SACK, '#C08A5B', SACK_D, 'none', { tag: 'DEAL' }],
        ['garri', 'Garri · 2 kg', 7, '−2%', 'down', BOWL, '#FFFDF8', BOWL_D, 'none', { tag: 'DEAL' }],
      ],
    };
    const ALL = {};
    Object.values(P)
      .flat()
      .forEach((r) => {
        ALL[r[0]] = r;
      });

    const step = (on) =>
      'all: unset; width: 30px; height: 30px; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 18px; font-weight: 700; cursor: pointer; background: ' +
      (on ? '#FFFDF8' : '#EFE6D7') +
      '; opacity: ' +
      (on ? '1' : '.45') +
      ';';
    const items = P[tabKey].map(([id, name, price, chg, dir, icon, fill, detail, fill2, extra]) => {
      const n = qty[id] || 0;
      const limit = (extra && extra.limit) || 9;
      const tag = extra && extra.tag;
      return {
        name,
        price: String(price),
        chg,
        icon,
        fill,
        detail,
        fill2,
        qty: String(n),
        tag: tag || '',
        lessLabel: 'One less ' + name,
        moreLabel: 'One more ' + name,
        less: () => this.setState({ qty: { ...qty, [id]: Math.max(0, n - 1) } }),
        more: () => this.setState({ qty: { ...qty, [id]: Math.min(limit, n + 1) } }),
        lessStyle: step(n > 0),
        moreStyle: step(n < limit),
        chgStyle: chg
          ? 'font-size: 11.5px; font-weight: 800; color: ' + (dir === 'up' ? '#C8553D' : '#2F6B5F') + ';'
          : 'display: none;',
        tagStyle: tag
          ? 'position: absolute; top: 8px; right: 8px; border: 2px solid #2A2522; border-radius: 999px; padding: 0 6px; font-size: 9.5px; font-weight: 800; letter-spacing: .04em; background: ' +
            { LOW: '#C8553D', SPONSORED: '#2A2522', DEAL: '#8FC1A9' }[tag] +
            '; color: ' +
            (tag === 'DEAL' ? '#2A2522' : '#FFFDF8') +
            ';'
          : 'display: none;',
        s:
          'position: relative; box-sizing: border-box; border: 3px solid #2A2522; border-radius: 18px; background: ' +
          (n ? '#FBEBC4' : '#FFFDF8') +
          '; box-shadow: 3px 4px 0 #2A2522; padding: 10px 10px 10px; display: flex; flex-direction: column; gap: 3px;',
      };
    });

    const lines = Object.entries(qty).filter(([, n]) => n > 0);
    const count = lines.reduce((s, [, n]) => s + n, 0);
    const total = lines.reduce((s, [id, n]) => s + n * ALL[id][2], 0);
    const tabs = [
      ['ess', 'Essentials'],
      ['brand', 'Brands'],
      ['deals', 'Deals'],
    ].map(([key, name]) => ({
      name,
      on: key === tabKey,
      pick: () => this.setState({ tab: key }),
      s:
        'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 15px; font-weight: 600; cursor: pointer;' +
        (key === tabKey
          ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
          : ' border: 2.5px solid transparent;'),
    }));
    const PEN = 'M4 20 L8 19 L19 8 L16 5 L5 16 Z M14 7 L17 10';
    const FACE = 'M12 3 A9 9 0 1 0 12.01 3 M9 10 V11 M15 10 V11 M8.5 15 Q12 18 15.5 15';
    const empty = count === 0;
    return {
      accent,
      tabs,
      items,
      empty,
      basketOpen: !done,
      basketDone: !!done,
      basketLine: empty
        ? 'Basket is empty'
        : 'Basket · ' + count + ' item' + (count > 1 ? 's' : '') + ' · ' + total,
      payLabel: empty ? 'Pay' : 'Pay ' + total,
      pay: () => {
        if (!empty) this.setState({ done: { by: 'you', total, n: count }, qty: {} });
      },
      handOff: () => this.setState({ done: { by: 'her', total: 22, n: 5 }, qty: {} }),
      again: () => this.setState({ done: null, qty: {} }),
      payStyle:
        'all: unset; flex: 1; height: 42px; box-sizing: border-box; border: 3px solid #2A2522; border-radius: 14px; background: ' +
        (empty ? '#EFE6D7' : accent) +
        '; box-shadow: 3px 4px 0 #2A2522; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; cursor: ' +
        (empty ? 'default' : 'pointer') +
        '; opacity: ' +
        (empty ? '.6' : '1') +
        ';',
      doneBadge:
        'width: 34px; height: 34px; flex: none; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center;' +
        (done && done.by === 'her'
          ? ' background: #EFE4CF; border: 2.5px dashed #2A2522;'
          : ' background: #CFE3F4; border: 2.5px solid #2A2522;'),
      donePath: done && done.by === 'her' ? FACE : PEN,
      doneNote: !done
        ? ''
        : done.by === 'her'
          ? 'Amara did the shop for 22. She skipped rice at this price and got garri and beans instead.'
          : 'Paid ' +
            done.total +
            ' for ' +
            done.n +
            ' item' +
            (done.n > 1 ? 's' : '') +
            '. It’s in your kitchen.',
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
              Supermarket
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Ground floor · Daily quarter
            </span>
          </div>
        </header>

        {/* LED ticker: the place's news mixed with labelled sponsors */}

        <div
          role="marquee"
          aria-label="RICE RUNNING LOW 14 bags · limit 2, SABI FOODS (sponsor), TOMATOES down 8%, BRIGHTLINE (sponsor), NEW STOCK FRIDAY rice · oil · soap"
          style={{
            margin: '0 20px 12px',
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
            style={{ display: 'flex', width: 'max-content', animationDuration: '28s' }}
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
                RICE RUNNING LOW
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>14 bags · limit 2</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Brand of the week</span>
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
                TOMATOES
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>down 8%</span>
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
                color: '#F2CE6E',
                textShadow: '0 0 8px #F2CE6E99',
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
                BRIGHTLINE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Late opening Fri</span>
              <span
                style={{
                  border: '1px solid #F2CE6E',
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
                NEW STOCK FRIDAY
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>rice · oil · soap</span>
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
                RICE RUNNING LOW
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>14 bags · limit 2</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Brand of the week</span>
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
                TOMATOES
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>down 8%</span>
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
                color: '#F2CE6E',
                textShadow: '0 0 8px #F2CE6E99',
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
                BRIGHTLINE
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Late opening Fri</span>
              <span
                style={{
                  border: '1px solid #F2CE6E',
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
                NEW STOCK FRIDAY
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>rice · oil · soap</span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
          </div>
        </div>

        {/* Shortage */}

        <ScreenLink
          href="TradingFloor.dc.html"
          aria-label="Rice is running low. Predict whether it runs out by Friday"
          style={{
            margin: '0 20px',
            flex: 'none',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '18px',
            background: '#F2CE6E',
            boxShadow: '4px 5px 0 #2A2522',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
        >
          <svg width="40" height="44" viewBox="0 0 40 44" aria-hidden="true" style={{ flex: 'none' }}>
            <path
              d="M10 8 Q20 2 30 8 L34 38 Q20 44 6 38 Z"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M12 8 Q20 12 28 8" fill="none" stroke="#2A2522" strokeWidth="2.5" />
            <path
              d="M10 30 Q20 34 30 30 L31 37 Q20 41 9 37 Z"
              fill="#EFE4CF"
              stroke="#2A2522"
              strokeWidth="2"
            />
          </svg>

          <span style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '.05em', color: '#8E4129' }}>
              SHORTAGE
            </span>

            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '16.5px',
                fontWeight: '700',
                lineHeight: '1.15',
              }}
            >
              Rice is running low · limit 2 each
            </span>

            <span style={{ fontSize: '12px', fontWeight: '700' }}>
              Will it run out by Friday? The building says 58% yes
            </span>
          </span>

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
            style={{ flex: 'none' }}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </ScreenLink>

        <div
          role="tablist"
          aria-label="Aisles"
          style={{
            margin: '14px 20px 0',
            height: '42px',
            flex: 'none',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '999px',
            background: '#FFFDF8',
            padding: '3px',
            display: 'flex',
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

        {/* Shelves */}

        <div
          className="sm-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '14px 20px 14px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
            {vals.items.map((p, $index) => (
              <div key={$index} style={css(p.s)}>
                <span style={css(p.tagStyle)}>{p.tag}</span>

                <svg
                  width="46"
                  height="42"
                  viewBox="0 0 46 42"
                  aria-hidden="true"
                  style={{ alignSelf: 'center' }}
                >
                  <path
                    d={p.icon}
                    fill={p.fill}
                    stroke="#2A2522"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={p.detail}
                    fill={p.fill2}
                    stroke="#2A2522"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '15px',
                    fontWeight: '700',
                    lineHeight: '1.1',
                  }}
                >
                  {p.name}
                </span>

                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '17px',
                      fontWeight: '700',
                    }}
                  >
                    <svg width="9" height="13" viewBox="0 0 30 40" aria-hidden="true">
                      <path
                        d="M4 8 H26 L4 32 H26 M15 2 V38"
                        fill="none"
                        stroke="#2A2522"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {p.price}
                  </span>

                  <span style={css(p.chgStyle)}>{p.chg}</span>
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <button type="button" aria-label={p.lessLabel} onClick={p.less} style={css(p.lessStyle)}>
                    −
                  </button>

                  <span
                    style={{
                      flex: '1',
                      textAlign: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '16px',
                      fontWeight: '700',
                    }}
                  >
                    {p.qty}
                  </span>

                  <button type="button" aria-label={p.moreLabel} onClick={p.more} style={css(p.moreStyle)}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Basket */}

        <section
          aria-live="polite"
          aria-label="Basket"
          style={{
            margin: '0 20px 22px',
            flex: 'none',
            boxSizing: 'border-box',
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
          {vals.basketOpen ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="30" height="28" viewBox="0 0 30 28" aria-hidden="true" style={{ flex: 'none' }}>
                  <path
                    d="M2 3 H7 L10 19 H25 L28 8 H8"
                    fill="none"
                    stroke="#2A2522"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="24" r="2.5" fill="#2A2522" />
                  <circle cx="23" cy="24" r="2.5" fill="#2A2522" />
                </svg>

                <span style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '700' }}>
                    {vals.basketLine}
                  </span>

                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#5E564D' }}>
                    From your current account · 640
                  </span>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={vals.pay}
                  aria-disabled={vals.empty}
                  style={css(vals.payStyle)}
                >
                  {vals.payLabel}
                </button>

                <button
                  type="button"
                  onClick={vals.handOff}
                  style={{
                    all: 'unset',
                    flex: '1',
                    height: '42px',
                    boxSizing: 'border-box',
                    border: '3px dashed #2A2522',
                    borderRadius: '14px',
                    background: '#EFE4CF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '7px',
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2A2522"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 12 H15 M11 7 L16 12 L11 17 M19 5 V19" />
                  </svg>
                  Hand Off
                </button>
              </div>
            </>
          ) : null}

          {vals.basketDone ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={css(vals.doneBadge)}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={vals.donePath} />
                </svg>
              </span>

              <span style={{ flex: '1', fontSize: '13.5px', fontWeight: '700', lineHeight: '1.35' }}>
                {vals.doneNote}
              </span>

              <button
                type="button"
                onClick={vals.again}
                style={{
                  all: 'unset',
                  fontSize: '12.5px',
                  fontWeight: '800',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                New shop
              </button>
            </div>
          ) : null}
        </section>
      </div>
    );
  }
}
