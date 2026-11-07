// Common room
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class CommonRoom extends Screen {
  static title = 'Common room';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const ad = this.state.ad ?? 'none'; // 'none' | 'done'
    const rsvp = this.state.rsvp ?? {}; // key -> 'you' | 'her'

    // Who's here: Amara first, then friends and rivals, then everyone else
    const H = [
      ['Amara', '#7A4A2E', 'me'],
      ['Kemi', '#F2CE6E', 'friend'],
      ['Tunde', '#9DB8E0', 'rival'],
      ['Ife', '#8FC1A9', 'friend'],
      ['Musa', '#E59A6B', ''],
      ['Zainab', '#C9B3D6', ''],
      ['Kofi', '#FDE3C8', ''],
      ['Ngozi', '#F7D6D6', 'rival'],
      ['Yaw', '#CFE3F4', ''],
    ];
    const here = H.map(([name, bg, rel]) => {
      const ringC = rel === 'friend' ? '#E8B53A' : rel === 'rival' ? '#C8553D' : 'transparent';
      return {
        name: rel === 'me' ? 'Amara' : name,
        ini: name[0],
        label: name + (rel === 'me' ? ', your avatar' : rel ? ', ' + rel : ''),
        ring:
          'width: 52px; height: 52px; box-sizing: border-box; border-radius: 50%; padding: 3px; border: 3.5px ' +
          (rel === 'me' ? 'dashed #2A2522' : 'solid ' + ringC) +
          '; display: flex;',
        face:
          'flex: 1; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 50%; background: ' +
          bg +
          '; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 17px; font-weight: 700; color: ' +
          (rel === 'me' ? '#FFFDF8' : '#2A2522') +
          ';',
      };
    });

    const PEN = 'M4 20 L8 19 L19 8 L16 5 L5 16 Z M14 7 L17 10';
    const FACE = 'M12 3 A9 9 0 1 0 12.01 3 M9 10 V11 M15 10 V11 M8.5 15 Q12 18 15.5 15';
    const E = [
      {
        key: 'meet',
        day: 'WED',
        time: '7 pm',
        name: "Residents' meeting",
        sub: 'Lift repair and the levy · council reports back',
        going: 23,
        bg: '#FDE3C8',
        herLine: 'Amara’s going. She wants the lift fixed.',
      },
      {
        key: 'party',
        day: 'TONIGHT',
        time: '8 pm',
        name: 'Lions v Rovers watch party',
        sub: 'On the TV · bring a chair',
        going: 41,
        bg: '#E3F0DF',
        herLine: 'Amara’s going. She never misses a Lions game.',
      },
      {
        key: 'esusu',
        day: 'SUN',
        time: '4 pm',
        name: 'Esusu circle',
        sub: 'Your circle meets · round 6 payout',
        going: 7,
        bg: '#EFE4CF',
        herLine: 'Amara’s going. It’s her circle.',
      },
      {
        key: 'books',
        day: 'THU',
        time: '6 pm',
        name: 'Book swap',
        sub: 'Bring one, take one',
        going: 9,
        bg: '#FFFDF8',
        herLine: 'Amara’s skipping it. She has a shift.',
      },
    ];
    const events = E.map((e) => {
      const who = rsvp[e.key];
      const herSkips = who === 'her' && e.key === 'books';
      const going = who && !herSkips;
      return {
        day: e.day,
        time: e.time,
        name: e.name,
        sub: e.sub,
        on: !!going,
        status: !who
          ? e.going + ' going'
          : who === 'her'
            ? e.herLine
            : 'You’re going · ' + (e.going + 1) + ' going',
        cta: going && who === 'you' ? 'Going ✓' : 'Go',
        toggle: () => this.setState({ rsvp: { ...rsvp, [e.key]: who === 'you' ? undefined : 'you' } }),
        hand: () => this.setState({ rsvp: { ...rsvp, [e.key]: 'her' } }),
        byPath: who === 'her' ? FACE : PEN,
        byStyle: !who
          ? 'display: none;'
          : 'width: 26px; height: 26px; flex: none; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center;' +
            (who === 'her'
              ? ' background: #EFE4CF; border: 2px dashed #2A2522;'
              : ' background: #CFE3F4; border: 2px solid #2A2522;'),
        dateStyle:
          'width: 58px; height: 46px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 12px; background: #FFFDF8; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;',
        s:
          'box-sizing: border-box; border: 3px solid #2A2522; border-radius: 18px; background: ' +
          e.bg +
          '; box-shadow: 4px 5px 0 #2A2522; padding: 10px 12px; display: flex; flex-direction: column; gap: 8px;',
        btn:
          who === 'her'
            ? 'display: none;'
            : 'all: unset; height: 32px; box-sizing: border-box; padding: 0 14px; border: 2.5px solid #2A2522; border-radius: 999px; display: flex; align-items: center; font-family: Fredoka, sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; background: ' +
              (going ? '#E3F0DF' : accent) +
              ';',
        handStyle: who
          ? 'display: none;'
          : 'all: unset; height: 32px; box-sizing: border-box; padding: 0 12px; border: 2.5px dashed #2A2522; border-radius: 999px; display: flex; align-items: center; font-family: Fredoka, sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; background: #FFFDF8;',
      };
    });

    const adDone = ad === 'done';
    return {
      accent,
      here,
      events,
      adDone,
      watchAd: () => this.setState({ ad: adDone ? 'none' : 'done' }),
      adLabel: adDone ? 'Replay unlocked' : 'Watch an ad',
      adIcon: adDone ? 'M5 12 L10 17 L19 7' : 'M3 6 H21 V18 H3 Z M10 9 L15 12 L10 15 Z',
      adNote: adDone
        ? 'Saturday’s Lions 2–1 Hawks replay is in your diary · thanks for watching'
        : 'Optional · 30 s from Brightline · unlocks Saturday’s match replay',
      adStyle:
        'all: unset; flex: 1; height: 44px; box-sizing: border-box; border: 3px dashed #2A2522; border-radius: 14px; background: ' +
        (adDone ? '#E3F0DF' : '#FFFDF8') +
        '; display: flex; align-items: center; justify-content: center; gap: 7px; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; cursor: pointer;',
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
              Common room
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Floor 5 · Daily quarter
            </span>
          </div>
        </header>

        {/* LED ticker: the place's news mixed with labelled sponsors */}

        <div
          role="marquee"
          aria-label="LIONS v ROVERS on the TV at 8 pm, SABI FOODS (sponsor), RESIDENTS' MEETING Wed 7 pm · lift repair, BRIGHTLINE (sponsor), QUIZ NIGHT library 9 pm"
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
                LIONS v ROVERS
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>on the TV at 8 pm</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Watch party snacks</span>
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
                RESIDENTS' MEETING
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                Wed 7 pm · lift repair
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>The TV</span>
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
                QUIZ NIGHT
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>library 9 pm</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>on the TV at 8 pm</span>
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>Watch party snacks</span>
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
                RESIDENTS' MEETING
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>
                Wed 7 pm · lift repair
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
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>The TV</span>
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
                QUIZ NIGHT
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.85' }}>library 9 pm</span>
              <span style={{ color: '#5E564D', fontSize: '12px', textShadow: 'none' }}>★</span>
            </span>
          </div>
        </div>

        <div
          className="cr-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '0 0 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* The TV */}

          <section
            aria-label="The TV"
            style={{
              margin: '0 20px',
              flex: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                alignSelf: 'stretch',
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '22px',
                background: '#8E4129',
                boxShadow: '4px 5px 0 #2A2522',
                padding: '10px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  height: '158px',
                  boxSizing: 'border-box',
                  border: '3px solid #2A2522',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: 'repeating-linear-gradient(90deg, #2F6B5F 0 26px, #2E4A3B 26px 52px)',
                  color: '#FFFDF8',
                }}
              >
                <svg
                  width="324"
                  height="152"
                  viewBox="0 0 324 152"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '0', top: '0', opacity: '.3' }}
                >
                  <rect x="8" y="8" width="308" height="136" fill="none" stroke="#FFFDF8" strokeWidth="2.5" />

                  <path d="M162 8 V144" stroke="#FFFDF8" strokeWidth="2.5" />

                  <circle cx="162" cy="76" r="24" fill="none" stroke="#FFFDF8" strokeWidth="2.5" />
                </svg>{' '}
                <div style={{ position: 'absolute', left: '10px', top: '9px', display: 'flex', gap: '6px' }}>
                  <span
                    style={{
                      border: '2px solid #FFFDF8',
                      borderRadius: '6px',
                      padding: '0 6px',
                      fontSize: '11px',
                      fontWeight: '800',
                      background: '#C8553D',
                    }}
                  >
                    8 PM
                  </span>

                  <span
                    style={{
                      border: '2px solid #FFFDF8',
                      borderRadius: '6px',
                      padding: '0 6px',
                      fontSize: '11px',
                      fontWeight: '800',
                    }}
                  >
                    LEAGUE · WEEK 9
                  </span>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    inset: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '28px',
                      fontWeight: '700',
                      letterSpacing: '.02em',
                      textShadow: '2px 2px 0 #2A2522',
                    }}
                  >
                    LIONS v ROVERS
                  </span>

                  <span style={{ fontSize: '13px', fontWeight: '800' }}>2nd v 1st · live tonight</span>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    height: '26px',
                    background: 'rgba(42,37,34,.85)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0 10px',
                    fontSize: '12px',
                    fontWeight: '800',
                  }}
                >
                  <span style={{ color: '#F2CE6E' }}>NOW</span>
                  <span>Building news at 6</span>

                  <span style={{ flex: '1' }} />
                  <span style={{ opacity: '.8' }}>Next: quiz highlights</span>
                </div>
              </div>
            </div>

            {/* stand */}

            <svg width="120" height="16" viewBox="0 0 120 16" aria-hidden="true" style={{ flex: 'none' }}>
              <path
                d="M48 0 V8 H72 V0 M30 14 H90"
                fill="#C08A5B"
                stroke="#2A2522"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div style={{ alignSelf: 'stretch', display: 'flex', gap: '10px', marginTop: '4px' }}>
              <ScreenLink
                href="Stadium.dc.html"
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
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 4 L20 12 L7 20 Z" fill="#2A2522" />
                </svg>
                Watch here
              </ScreenLink>

              <button
                type="button"
                onClick={vals.watchAd}
                aria-pressed={vals.adDone}
                style={css(vals.adStyle)}
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
                  <path d={vals.adIcon} />
                </svg>
                {vals.adLabel}
              </button>
            </div>

            <span
              style={{
                alignSelf: 'stretch',
                marginTop: '7px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#5E564D',
                textAlign: 'center',
              }}
            >
              {vals.adNote}
            </span>
          </section>

          {/* Who's here */}

          <section
            aria-label="Who's here"
            style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <div
              style={{
                padding: '0 20px',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
                Here now · 9
              </span>

              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  color: '#5E564D',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      boxSizing: 'border-box',
                      border: '2.5px solid #E8B53A',
                      borderRadius: '50%',
                    }}
                  />
                  friend
                </span>

                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      boxSizing: 'border-box',
                      border: '2.5px solid #C8553D',
                      borderRadius: '50%',
                    }}
                  />
                  rival
                </span>
              </span>
            </div>

            <div
              className="cr-row"
              style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                padding: '2px 20px 4px',
              }}
            >
              {vals.here.map((h, $index) => (
                <ScreenLink
                  key={$index}
                  href="ResidentCard.dc.html"
                  aria-label={h.label}
                  style={{
                    flex: 'none',
                    width: '56px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    textDecoration: 'none',
                  }}
                >
                  <span style={css(h.ring)}>
                    <span style={css(h.face)}>{h.ini}</span>
                  </span>

                  <span style={{ fontSize: '12px', fontWeight: '800', whiteSpace: 'nowrap' }}>{h.name}</span>
                </ScreenLink>
              ))}
            </div>

            <span style={{ padding: '0 20px', fontSize: '13px', fontWeight: '700', color: '#3A302A' }}>
              Amara's on the sofa with Kemi, talking about the rent cap.
            </span>
          </section>

          {/* Meetings and events */}

          <section
            aria-label="Meetings and events"
            style={{ flex: 'none', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
              Meetings and events
            </span>

            {vals.events.map((e, $index) => (
              <div key={$index} style={css(e.s)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={css(e.dateStyle)}>
                    <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '.04em' }}>
                      {e.day}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '15px',
                        fontWeight: '700',
                        lineHeight: '1',
                      }}
                    >
                      {e.time}
                    </span>
                  </span>

                  <span
                    style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '1px' }}
                  >
                    <span
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '16px',
                        fontWeight: '700',
                        lineHeight: '1.15',
                      }}
                    >
                      {e.name}
                    </span>

                    <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#5E564D' }}>{e.sub}</span>
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={css(e.byStyle)}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2A2522"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={e.byPath} />
                    </svg>
                  </span>

                  <span style={{ flex: '1', fontSize: '12.5px', fontWeight: '800' }}>{e.status}</span>

                  <button type="button" aria-pressed={e.on} onClick={e.toggle} style={css(e.btn)}>
                    {e.cta}
                  </button>

                  <button type="button" onClick={e.hand} style={css(e.handStyle)}>
                    Hand Off
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    );
  }
}
