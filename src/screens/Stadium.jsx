// Rooftop stadium
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Stadium extends Screen {
  static title = 'Stadium';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const tabKey = this.state.tab ?? 'table';
    const reminded = this.state.reminded ?? false;

    const sports = [
      ['Football', true],
      ['Basketball', false],
      ['Tennis', false],
      ['Cricket', false],
    ].map(([name, live]) => ({
      name,
      s:
        'box-sizing: border-box; height: 32px; border-radius: 999px; padding: 0 11px; display: flex; align-items: center; gap: 5px; font-family: Fredoka, sans-serif; font-size: 14px; font-weight: 600; border: 2.5px solid #2A2522;' +
        (live
          ? ' background: #2E4A3B; color: #FFFDF8;'
          : ' background: transparent; color: #5E564D; border-style: dashed;'),
      soonStyle: live
        ? 'display: none;'
        : 'font-family: Nunito, sans-serif; font-size: 9px; font-weight: 800; letter-spacing: .04em;',
    }));

    const tabs = [
      ['table', 'Table'],
      ['fixtures', 'Fixtures'],
      ['team', 'My team'],
    ].map(([key, name]) => {
      const on = key === tabKey;
      return {
        key,
        name,
        on,
        pick: () => this.setState({ tab: key }),
        s:
          'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 15px; font-weight: 600; cursor: pointer;' +
          (on
            ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
            : ' border: 2.5px solid transparent;'),
      };
    });

    const dot = (r) => ({
      s:
        'width: 10px; height: 10px; box-sizing: border-box; border: 1.5px solid #2A2522; border-radius: 50%; background: ' +
        { W: '#2F6B5F', D: '#F2CE6E', L: '#C8553D' }[r] +
        ';',
    });
    const T = [
      ['Rooftop Rovers', '#9DB8E0', 19, 'WWD'],
      ['Block A Lions', '#F2CE6E', 17, 'WWW', true],
      ['Riverside Hawks', '#E59A6B', 15, 'LWW'],
      ['Harbour Kings', '#5B3D62', 13, 'LDW'],
      ['Baobab United', '#8FC1A9', 11, 'DWL'],
      ['Atlas Comets', '#FDE3C8', 9, 'WLL'],
      ['Sahel Strikers', '#C08A5B', 7, 'LDL'],
      ['Coral Bay', '#F7D6D6', 4, 'LLD'],
    ];
    const table = T.map(([name, color, pts, form, mine], i) => ({
      pos: String(i + 1),
      name,
      color,
      p: '8',
      pts: String(pts),
      f1: dot(form[0]).s,
      f2: dot(form[1]).s,
      f3: dot(form[2]).s,
      s:
        'display: flex; align-items: center; gap: 8px; padding: 7px 12px; font-size: 13.5px; font-weight: 700;' +
        (i < T.length - 1 ? ' border-bottom: 1.5px dashed rgba(42,37,34,.25);' : '') +
        (mine ? ' background: #FBEBC4; font-weight: 800;' : ''),
    }));

    const F = [
      ['Tonight\n8 pm', 'Lions v Rovers', '', 'next'],
      ['Saturday', 'Lions 2–1 Hawks', 'W'],
      ['Wednesday', 'Coral Bay 0–3 Lions', 'W'],
      ['Next Sat', 'Harbour Kings v Lions', ''],
      ['Next Wed', 'Lions v Atlas Comets', ''],
    ];
    const fixtures = F.map(([when, match, res, next]) => ({
      when,
      match,
      res: res || (next ? 'LIVE 8' : '—'),
      s:
        'box-sizing: border-box; border: 3px solid #2A2522; border-radius: 16px; background: ' +
        (next ? '#FBEBC4' : '#FFFDF8') +
        '; box-shadow: 3px 4px 0 #2A2522; padding: 9px 12px; display: flex; align-items: center; gap: 10px; white-space: pre-line;',
      resStyle:
        'flex: none; min-width: 28px; height: 26px; box-sizing: border-box; padding: 0 7px; border: 2px solid #2A2522; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 12.5px; font-weight: 700;' +
        (res === 'W'
          ? ' background: #2F6B5F; color: #FFFDF8;'
          : next
            ? ' background: #C8553D; color: #FFFDF8;'
            : ' background: transparent; color: #5E564D; border-style: dashed;'),
    }));

    return {
      accent,
      sports,
      tabs,
      table,
      fixtures,
      isTable: tabKey === 'table',
      isFixtures: tabKey === 'fixtures',
      isTeam: tabKey === 'team',
      reminded,
      bellFill: reminded ? '#F2CE6E' : 'none',
      remindLabel: reminded ? 'Reminder set' : 'Remind me',
      toggleRemind: () => this.setState({ reminded: !reminded }),
      remindStyle:
        'all: unset; flex: 1; height: 44px; box-sizing: border-box; border: 3px solid #2A2522; border-radius: 14px; background: ' +
        (reminded ? '#E3F0DF' : '#FFFDF8') +
        '; box-shadow: 3px 4px 0 #2A2522; display: flex; align-items: center; justify-content: center; gap: 7px; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; cursor: pointer;',
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
              Rooftop stadium
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>Roof · Play quarter</span>
          </div>
        </header>

        {/* LED ticker: the place's news mixed with labelled sponsors */}

        <div
          role="marquee"
          aria-label="LIONS v ROVERS tonight 8 pm, SABI FOODS (sponsor), BAOBAB 2–2 COMETS full time, BRIGHTLINE (sponsor), CORAL BAY 0–1 STRIKERS half time, NDURA MINING (sponsor)"
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
                LIONS v ROVERS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>tonight 8 pm</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Lions kit</span>
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
                BAOBAB 2–2 COMETS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>full time</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>League partner</span>
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
                CORAL BAY 0–1 STRIKERS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>half time</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Match ball</span>
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
                LIONS v ROVERS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>tonight 8 pm</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Lions kit</span>
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
                BAOBAB 2–2 COMETS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>full time</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>League partner</span>
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
                CORAL BAY 0–1 STRIKERS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>half time</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Match ball</span>
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

        {/* Sports: football first, the rest roll out later */}

        <div aria-label="Sports" style={{ display: 'flex', gap: '8px', padding: '2px 20px 12px' }}>
          {vals.sports.map((s, $index) => (
            <span key={$index} style={css(s.s)}>
              {s.name}
              <span style={css(s.soonStyle)}>SOON</span>
            </span>
          ))}
        </div>

        {/* Tonight's match, on the pitch */}

        <section
          aria-label="Tonight's match"
          style={{
            margin: '0 20px',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '22px',
            boxShadow: '4px 5px 0 #2A2522',
            overflow: 'hidden',
            position: 'relative',
            background: 'repeating-linear-gradient(90deg, #2F6B5F 0 34px, #2E4A3B 34px 68px)',
            color: '#FFFDF8',
          }}
        >
          <svg
            width="384"
            height="168"
            viewBox="0 0 384 168"
            aria-hidden="true"
            style={{ position: 'absolute', left: '0', top: '0', opacity: '.35' }}
          >
            <rect x="10" y="10" width="364" height="148" fill="none" stroke="#FFFDF8" strokeWidth="2.5" />

            <path d="M192 10 V158" stroke="#FFFDF8" strokeWidth="2.5" />

            <circle cx="192" cy="84" r="26" fill="none" stroke="#FFFDF8" strokeWidth="2.5" />

            <rect x="10" y="48" width="38" height="72" fill="none" stroke="#FFFDF8" strokeWidth="2.5" />

            <rect x="336" y="48" width="38" height="72" fill="none" stroke="#FFFDF8" strokeWidth="2.5" />
          </svg>{' '}
          <div
            style={{
              position: 'relative',
              padding: '12px 14px 10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '.05em', color: '#F2CE6E' }}>
                TONIGHT · LEAGUE · WEEK 9
              </span>

              <span
                style={{
                  border: '2px solid #FFFDF8',
                  borderRadius: '999px',
                  padding: '1px 8px',
                  fontSize: '11.5px',
                  fontWeight: '800',
                }}
              >
                8 pm
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <svg width="52" height="58" viewBox="0 0 52 58" aria-hidden="true">
                  <path
                    d="M4 6 L26 2 L48 6 V28 C48 44 36 52 26 56 C16 52 4 44 4 28 Z"
                    fill="#F2CE6E"
                    stroke="#2A2522"
                    strokeWidth="3"
                  />
                  <path d="M4 22 H48" stroke="#2E4A3B" strokeWidth="5" />
                  <text
                    x="26"
                    y="44"
                    textAnchor="middle"
                    fontFamily="Fredoka, sans-serif"
                    fontSize="16"
                    fontWeight="700"
                    fill="#2A2522"
                  >
                    L
                  </text>
                </svg>

                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '15px',
                    fontWeight: '700',
                    textAlign: 'center',
                    lineHeight: '1.05',
                  }}
                >
                  Block A Lions
                </span>

                <span style={{ fontSize: '11.5px', fontWeight: '800', opacity: '.85' }}>2nd · your team</span>
              </div>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#F2CE6E',
                }}
              >
                vs
              </span>

              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <svg width="52" height="58" viewBox="0 0 52 58" aria-hidden="true">
                  <path
                    d="M4 6 L26 2 L48 6 V28 C48 44 36 52 26 56 C16 52 4 44 4 28 Z"
                    fill="#9DB8E0"
                    stroke="#2A2522"
                    strokeWidth="3"
                  />
                  <path d="M26 2 V56" stroke="#2F3E5C" strokeWidth="5" />
                  <text
                    x="26"
                    y="40"
                    textAnchor="middle"
                    fontFamily="Fredoka, sans-serif"
                    fontSize="16"
                    fontWeight="700"
                    fill="#FFFDF8"
                    stroke="#2A2522"
                    strokeWidth="0.8"
                  >
                    R
                  </text>
                </svg>

                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '15px',
                    fontWeight: '700',
                    textAlign: 'center',
                    lineHeight: '1.05',
                  }}
                >
                  Rooftop Rovers
                </span>

                <span style={{ fontSize: '11.5px', fontWeight: '800', opacity: '.85' }}>
                  1st · top of the league
                </span>
              </div>
            </div>

            {/* What the building thinks, from the prediction market */}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div
                style={{
                  height: '14px',
                  boxSizing: 'border-box',
                  border: '2px solid #2A2522',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  display: 'flex',
                }}
              >
                <span style={{ width: '41%', background: '#F2CE6E' }} />
                <span style={{ width: '23%', background: '#FFFDF8' }} />
                <span style={{ width: '36%', background: '#9DB8E0' }} />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11.5px',
                  fontWeight: '800',
                }}
              >
                <span>Lions 41%</span>
                <span>Draw 23%</span>
                <span>Rovers 36%</span>
              </div>
            </div>
          </div>
        </section>

        <div style={{ display: 'flex', gap: '10px', padding: '12px 20px 0' }}>
          <ScreenLink
            href="TradingFloor.dc.html"
            style={{
              flex: '1',
              height: '44px',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '14px',
              background: vals.accent,
              boxShadow: '3px 4px 0 #2A2522',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2A2522"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 17 L9 11 L13 15 L21 7 M15 7 H21 V13" />
            </svg>
            Predict
          </ScreenLink>

          <button
            type="button"
            aria-pressed={vals.reminded}
            onClick={vals.toggleRemind}
            style={css(vals.remindStyle)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={vals.bellFill}
              stroke="#2A2522"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 16 V11 A6 6 0 0 1 18 11 V16 L20 18 H4 Z M10 21 H14" />
            </svg>
            {vals.remindLabel}
          </button>
        </div>

        <span
          style={{
            padding: '7px 20px 0',
            fontSize: '12px',
            fontWeight: '700',
            color: '#5E564D',
            textAlign: 'center',
          }}
        >
          Also on the common room TV
        </span>

        {/* League */}

        <div
          role="tablist"
          aria-label="League"
          style={{
            margin: '10px 20px 0',
            height: '42px',
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

        <div
          className="st-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '12px 20px 22px',
          }}
        >
          {/* Table */}

          {vals.isTable ? (
            <div
              style={{
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '18px',
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
                  padding: '6px 12px',
                  borderBottom: '2.5px solid #2A2522',
                  fontSize: '11px',
                  fontWeight: '800',
                  color: '#5E564D',
                }}
              >
                <span style={{ width: '16px' }}>#</span>
                <span style={{ flex: '1' }}>Team</span>
                <span style={{ width: '22px', textAlign: 'center' }}>P</span>
                <span style={{ width: '46px', textAlign: 'center' }}>Form</span>
                <span style={{ width: '28px', textAlign: 'right' }}>Pts</span>
              </div>

              {vals.table.map((r, $index) => (
                <div key={$index} style={css(r.s)}>
                  <span style={{ width: '16px', fontFamily: "'Fredoka', sans-serif", fontWeight: '700' }}>
                    {r.pos}
                  </span>

                  <span
                    style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '7px', minWidth: '0' }}
                  >
                    <span
                      style={{
                        width: '13px',
                        height: '13px',
                        flex: 'none',
                        boxSizing: 'border-box',
                        border: '2px solid #2A2522',
                        borderRadius: '4px',
                        background: r.color,
                      }}
                    />

                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {r.name}
                    </span>
                  </span>

                  <span style={{ width: '22px', textAlign: 'center' }}>{r.p}</span>

                  <span style={{ width: '46px', display: 'flex', justifyContent: 'center', gap: '3px' }}>
                    <span style={css(r.f1)} />
                    <span style={css(r.f2)} />
                    <span style={css(r.f3)} />
                  </span>

                  <span
                    style={{
                      width: '28px',
                      textAlign: 'right',
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: '700',
                    }}
                  >
                    {r.pts}
                  </span>
                </div>
              ))}
            </div>
          ) : null}

          {/* Fixtures */}

          {vals.isFixtures ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {vals.fixtures.map((x, $index) => (
                <div key={$index} style={css(x.s)}>
                  <span
                    style={{
                      width: '64px',
                      flex: 'none',
                      fontSize: '12px',
                      fontWeight: '800',
                      color: '#5E564D',
                      lineHeight: '1.2',
                    }}
                  >
                    {x.when}
                  </span>

                  <span
                    style={{
                      flex: '1',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '15px',
                      fontWeight: '600',
                      lineHeight: '1.2',
                    }}
                  >
                    {x.match}
                  </span>

                  <span style={css(x.resStyle)}>{x.res}</span>
                </div>
              ))}
            </div>
          ) : null}

          {/* My team */}

          {vals.isTeam ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  boxSizing: 'border-box',
                  border: '3px solid #2A2522',
                  borderRadius: '18px',
                  background: '#E3F0DF',
                  boxShadow: '4px 5px 0 #2A2522',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <svg width="44" height="50" viewBox="0 0 52 58" aria-hidden="true" style={{ flex: 'none' }}>
                  <path
                    d="M4 6 L26 2 L48 6 V28 C48 44 36 52 26 56 C16 52 4 44 4 28 Z"
                    fill="#F2CE6E"
                    stroke="#2A2522"
                    strokeWidth="3"
                  />
                  <path d="M4 22 H48" stroke="#2E4A3B" strokeWidth="5" />
                  <text
                    x="26"
                    y="44"
                    textAnchor="middle"
                    fontFamily="Fredoka, sans-serif"
                    fontSize="16"
                    fontWeight="700"
                    fill="#2A2522"
                  >
                    L
                  </text>
                </svg>

                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
                    Block A Lions
                  </span>

                  <span style={{ fontSize: '12.5px', fontWeight: '700' }}>
                    Amara's team since season 1 · won 5, drew 2, lost 1
                  </span>
                </div>
              </div>

              <ScreenLink
                href="Markets.dc.html"
                style={{
                  boxSizing: 'border-box',
                  border: '3px solid #2A2522',
                  borderRadius: '18px',
                  background: '#FFFDF8',
                  boxShadow: '4px 5px 0 #2A2522',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '13px',
                    fontWeight: '700',
                    border: '2px solid #2A2522',
                    borderRadius: '8px',
                    padding: '2px 6px',
                    background: '#E3F0DF',
                  }}
                >
                  LIO
                </span>

                <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '700' }}>
                    14 <span style={{ color: '#2F6B5F' }}>▲ 9%</span>
                  </span>

                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#5E564D' }}>
                    You hold 8 shares · prize money pays dividends
                  </span>
                </div>

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
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </ScreenLink>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
                <div
                  style={{
                    boxSizing: 'border-box',
                    border: '3px solid #2A2522',
                    borderRadius: '16px',
                    background: '#FDE3C8',
                    padding: '9px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#5E564D' }}>TOP SCORER</span>

                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '700' }}>
                    Dayo Mensah · 6
                  </span>
                </div>

                <div
                  style={{
                    boxSizing: 'border-box',
                    border: '3px solid #2A2522',
                    borderRadius: '16px',
                    background: '#EFE4CF',
                    padding: '9px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#5E564D' }}>KIT SPONSOR</span>

                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '700' }}>
                    Sabi Foods
                  </span>
                </div>
              </div>

              <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#5E564D', textAlign: 'center' }}>
                Supporters can switch teams only at season end · 6 weeks left
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
