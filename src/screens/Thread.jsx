// Message thread
import { Fragment } from 'react';
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Thread extends Screen {
  static title = 'Messages';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const extra = this.state.extra ?? [];
    const draft = this.state.draft ?? '';

    // who: 'kemi' | 'you' | 'her'. kind: text | day | money | invite
    const base = [
      { kind: 'day', text: 'Week 6' },
      { who: 'kemi', text: 'Heard about the esusu. You okay?', time: '6:12 pm' },
      { who: 'her', text: 'Not really. Tunde’s late with his round. Again.', time: '6:20 pm' },
      { kind: 'money', text: 'No rush. Pay me when you can.' },
      { who: 'you', text: 'Thank you. I’ll pay you back after round 6.', time: '6:31 pm' },
      { kind: 'day', text: 'Today' },
      { who: 'kemi', text: 'You going to the meeting Wednesday? About the lift.', time: '7:10 pm' },
      { who: 'her', text: 'Yes. Taking the stairs every day is killing me.', time: '7:14 pm' },
      { who: 'kemi', text: 'Ludo again tonight?', time: '7:22 pm' },
      { kind: 'invite' },
    ];
    const PEN = 'M4 20 L8 19 L19 8 L16 5 L5 16 Z M14 7 L17 10';
    const FACE = 'M12 3 A9 9 0 1 0 12.01 3 M9 10 V11 M15 10 V11 M8.5 15 Q12 18 15.5 15';
    const msgs = base.concat(extra).map((m) => {
      const kind = m.kind || 'text';
      const mine = m.who === 'you' || m.who === 'her';
      return {
        isDay: kind === 'day',
        isText: kind === 'text',
        isMoney: kind === 'money',
        isInvite: kind === 'invite',
        text: m.text || '',
        time: m.time || '',
        row:
          'display: flex; align-items: flex-end; gap: 6px; max-width: 86%;' +
          (mine ? ' align-self: flex-end; flex-direction: row-reverse;' : ' align-self: flex-start;'),
        bubble:
          'box-sizing: border-box; padding: 7px 11px 5px; display: flex; flex-direction: column; gap: 1px; border-radius: 16px;' +
          (m.who === 'kemi'
            ? ' background: #FFFDF8; border: 2.5px solid #2A2522; border-bottom-left-radius: 4px;'
            : m.who === 'her'
              ? ' background: #EFE4CF; border: 2.5px dashed #2A2522; border-bottom-right-radius: 4px;'
              : ' background: #CFE3F4; border: 2.5px solid #2A2522; border-bottom-right-radius: 4px;'),
        badge: !mine
          ? 'display: none;'
          : 'width: 22px; height: 22px; flex: none; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center;' +
            (m.who === 'her'
              ? ' background: #EFE4CF; border: 2px dashed #2A2522;'
              : ' background: #CFE3F4; border: 2px solid #2A2522;'),
        badgePath: m.who === 'her' ? FACE : PEN,
      };
    });
    const answered = extra.some((m) => m.who === 'you' || m.who === 'her');
    const say = (text) =>
      this.setState({ extra: extra.concat([{ who: 'you', text, time: 'now' }]), draft: '' });
    const quick = ['I’m in', 'After the match?', 'Not tonight'].map((text) => ({
      text,
      say: () => say(text),
    }));
    return {
      accent,
      msgs,
      quick,
      draft,
      waiting: !answered,
      typing: (e) => this.setState({ draft: e.target.value }),
      send: () => {
        if (draft.trim()) say(draft.trim());
      },
      handOff: () =>
        this.setState({
          extra: extra.concat([
            {
              who: 'her',
              text: 'Lions play at 8! Ludo after the match? Save me the yellow seat.',
              time: 'now',
            },
          ]),
          draft: '',
        }),
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
            alignItems: 'center',
            gap: '12px',
            padding: '14px 20px 10px',
            borderBottom: '3px solid #2A2522',
            background: '#FFFDF8',
          }}
        >
          <ScreenLink
            href="Social.dc.html"
            aria-label="Back to messages"
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

          <ScreenLink
            href="ResidentCard.dc.html"
            aria-label="Kemi's card"
            style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <svg width="44" height="44" viewBox="0 0 52 52" aria-hidden="true" style={{ flex: 'none' }}>
              <circle cx="26" cy="26" r="24" fill="none" stroke="#E8B53A" strokeWidth="4" />

              <rect
                x="6"
                y="6"
                width="40"
                height="40"
                rx="13"
                fill="#F7D6D6"
                stroke="#2A2522"
                strokeWidth="2.5"
              />

              <circle cx="26" cy="29" r="12" fill="#A8714A" stroke="#2A2522" strokeWidth="2.5" />

              <path
                d="M13 24 C13 14 20 12 26 12 C32 12 39 14 39 24 C36 20 32 19 26 19 C20 19 16 20 13 24 Z"
                fill="#C8553D"
                stroke="#2A2522"
                strokeWidth="2"
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

            <span style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '22px',
                  fontWeight: '700',
                  lineHeight: '1.1',
                }}
              >
                Kemi
              </span>

              <span style={{ fontSize: '13px', fontWeight: '700', color: '#5E564D' }}>
                Friend · Room 3C · in the common room
              </span>
            </span>
          </ScreenLink>
        </header>

        {/* The conversation */}

        <div
          className="th-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '12px 16px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {vals.msgs.map((m, $index) => (
            <Fragment key={$index}>
              {m.isDay ? (
                <span
                  style={{
                    alignSelf: 'center',
                    margin: '4px 0',
                    border: '2px solid #2A2522',
                    borderRadius: '999px',
                    background: '#EFE4CF',
                    padding: '1px 10px',
                    fontSize: '11.5px',
                    fontWeight: '800',
                  }}
                >
                  {m.text}
                </span>
              ) : null}

              {m.isText ? (
                <div style={css(m.row)}>
                  <span style={css(m.badge)}>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2A2522"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={m.badgePath} />
                    </svg>
                  </span>

                  <div style={css(m.bubble)}>
                    <span style={{ fontSize: '14.5px', fontWeight: '600', lineHeight: '1.35' }}>
                      {m.text}
                    </span>

                    <span
                      style={{ alignSelf: 'flex-end', fontSize: '10.5px', fontWeight: '800', opacity: '.6' }}
                    >
                      {m.time}
                    </span>
                  </div>
                </div>
              ) : null}

              {m.isMoney ? (
                <ScreenLink
                  href="Statement.dc.html"
                  style={{
                    alignSelf: 'flex-start',
                    width: '230px',
                    boxSizing: 'border-box',
                    border: '3px solid #2A2522',
                    borderRadius: '16px',
                    background: '#E3F0DF',
                    boxShadow: '3px 4px 0 #2A2522',
                    padding: '9px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 30 40" aria-hidden="true" style={{ flex: 'none' }}>
                    <path
                      d="M4 8 H26 L4 32 H26 M15 2 V38"
                      fill="none"
                      stroke="#2A2522"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}
                    >
                      Kemi sent 20
                    </span>

                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#3A302A' }}>{m.text}</span>
                  </span>
                </ScreenLink>
              ) : null}

              {m.isInvite ? (
                <div
                  style={{
                    alignSelf: 'flex-start',
                    width: '250px',
                    boxSizing: 'border-box',
                    border: '3px solid #2A2522',
                    borderRadius: '16px',
                    background: '#FDE3C8',
                    boxShadow: '3px 4px 0 #2A2522',
                    padding: '10px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 40 40"
                      aria-hidden="true"
                      style={{ flex: 'none' }}
                    >
                      <path d="M6 6 H34 V34 H6 Z" fill="#F2CE6E" stroke="#2A2522" strokeWidth="2.8" />
                      <path d="M20 6 V34 M6 20 H34" stroke="#2A2522" strokeWidth="2.4" />
                    </svg>

                    <span style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '700' }}
                      >
                        Ludo · Table 4
                      </span>

                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#5E564D' }}>
                        Tonight 8 pm · 2 of 4 seated
                      </span>
                    </span>
                  </div>

                  <ScreenLink
                    href="Ludo.dc.html"
                    style={{
                      height: '34px',
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '999px',
                      background: '#FFFDF8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '14.5px',
                      fontWeight: '600',
                      textDecoration: 'none',
                    }}
                  >
                    Open the table
                  </ScreenLink>
                </div>
              ) : null}
            </Fragment>
          ))}

          {/* Waiting on you: if you don't answer, she will */}

          {vals.waiting ? (
            <div
              style={{
                alignSelf: 'stretch',
                marginTop: '4px',
                boxSizing: 'border-box',
                border: '2.5px dashed #2A2522',
                borderRadius: '14px',
                background: '#F7D6D6',
                padding: '7px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  flex: 'none',
                  boxSizing: 'border-box',
                  border: '2px solid #2A2522',
                  borderRadius: '50%',
                  background: '#FFFDF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 3 h12 M6 21 h12 M7 3 c0 6 10 6 10 9 c0 3 -10 3 -10 9 M17 3 c0 6 -10 6 -10 9 c0 3 10 3 10 9"
                    fill="none"
                    stroke="#2A2522"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span style={{ flex: '1', fontSize: '12.5px', fontWeight: '800' }}>
                Kemi's waiting. Amara will answer in 20 min if you don't.
              </span>
            </div>
          ) : null}
        </div>

        {/* Reply */}

        <section
          aria-label="Reply"
          style={{
            flex: 'none',
            borderTop: '3px solid #2A2522',
            background: '#FFFDF8',
            padding: '10px 16px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '9px',
          }}
        >
          <div style={{ display: 'flex', gap: '7px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {vals.quick.map((q, $index) => (
              <button
                key={$index}
                type="button"
                onClick={q.say}
                style={{
                  all: 'unset',
                  flex: 'none',
                  height: '32px',
                  boxSizing: 'border-box',
                  padding: '0 12px',
                  border: '2.5px solid #2A2522',
                  borderRadius: '999px',
                  background: '#F5EFE5',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '13px',
                  fontWeight: '800',
                  cursor: 'pointer',
                }}
              >
                {q.text}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="text"
              aria-label="Write a message"
              placeholder="Write to Kemi…"
              value={vals.draft}
              onChange={vals.typing}
              style={{
                flex: '1',
                minWidth: '0',
                height: '44px',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '999px',
                background: '#F5EFE5',
                padding: '0 14px',
                fontFamily: "'Nunito', sans-serif",
                fontSize: '15px',
                fontWeight: '700',
                color: '#2A2522',
                outline: 'none',
              }}
            />

            <button
              type="button"
              aria-label="Send"
              onClick={vals.send}
              style={{
                all: 'unset',
                width: '44px',
                height: '44px',
                flex: 'none',
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '50%',
                background: vals.accent,
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

            <button
              type="button"
              onClick={vals.handOff}
              style={{
                all: 'unset',
                height: '44px',
                flex: 'none',
                boxSizing: 'border-box',
                padding: '0 14px',
                border: '3px dashed #2A2522',
                borderRadius: '999px',
                background: '#EFE4CF',
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Hand Off
            </button>
          </div>
        </section>
      </div>
    );
  }
}
