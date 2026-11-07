// Jury duty
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class JuryDuty extends Screen {
  static title = 'Jury duty';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const pick = this.state.pick ?? null; // 'refund' | 'split' | 'keep'
    const vote = this.state.vote ?? null; // { by, pick }
    const openEv = this.state.ev ?? 'gig';

    const E = [
      [
        'gig',
        'The gig post',
        'Gig Exchange · week 7',
        'M5 4 H19 V20 H5 Z M8 9 H16 M8 13 H16 M8 17 H12',
        '#F2CE6E',
        '“Paint room 9C, two coats, walls and door. Reward 40. Paid up front.” Posted by Sade. Taken by Yaw the same day.',
      ],
      [
        'pay',
        'Payment',
        'Bank record · week 7',
        'M5 7 H17 L5 17 H17 M11 3 V21',
        '#E3F0DF',
        'Sade to Yaw · 40 · note “paint 9C”. Cleared the same day.',
      ],
      [
        'msgs',
        'Their messages',
        'Shared by both · weeks 7–8',
        'M4 5 H20 V15 H11 L6 19 V15 H4 Z',
        '#CFE3F4',
        'Yaw, day 2: “First coat done, second tomorrow.” Then nothing for 9 days. Sade asked 4 times.',
      ],
      [
        'health',
        'Yaw’s health log',
        'Life record · week 8',
        'M12 20 L4 12 A5 5 0 0 1 12 6 A5 5 0 0 1 20 12 Z',
        '#F7D6D6',
        'Sick for 6 days in week 8. Back at work on day 7. No message to Sade after he recovered.',
      ],
    ];
    const evidence = E.map(([key, title, when, icon, bg, detail]) => {
      const open = key === openEv;
      return {
        title,
        when,
        icon,
        detail,
        open,
        arrow: open ? '−' : '+',
        toggle: () => this.setState({ ev: open ? null : key }),
        iconBox:
          'width: 34px; height: 34px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 10px; background: ' +
          bg +
          '; display: flex; align-items: center; justify-content: center;',
        detailStyle: open
          ? 'display: block; margin-top: 8px; border-top: 2px dashed #2A2522; padding-top: 8px; font-size: 13.5px; font-weight: 600; line-height: 1.4; text-align: left;'
          : 'display: none;',
        s:
          'all: unset; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 16px; background: #FFFDF8; padding: 9px 12px; display: flex; flex-direction: column; cursor: pointer;' +
          (open ? ' box-shadow: 3px 4px 0 #2A2522;' : ''),
      };
    });

    const O = {
      refund: ['Full refund', 'Sade gets 40'],
      split: ['Split it', '20 each'],
      keep: ['Yaw keeps it', 'no refund'],
    };
    const options = Object.keys(O).map((key) => ({
      name: O[key][0],
      sub: O[key][1],
      on: pick === key,
      pick: () => this.setState({ pick: key }),
      s:
        'all: unset; box-sizing: border-box; height: 52px; border: 2.5px solid #2A2522; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; text-align: center; cursor: pointer; background: ' +
        (pick === key ? '#F2CE6E' : '#F5EFE5') +
        ';',
    }));

    const PEN = 'M4 20 L8 19 L19 8 L16 5 L5 16 Z M14 7 L17 10';
    const FACE = 'M12 3 A9 9 0 1 0 12.01 3 M9 10 V11 M15 10 V11 M8.5 15 Q12 18 15.5 15';
    const noPick = !pick;
    return {
      accent,
      evidence,
      options,
      open: !vote,
      sealed: !!vote,
      noPick,
      seal: () => {
        if (pick) this.setState({ vote: { by: 'you', pick } });
      },
      handOff: () => this.setState({ vote: { by: 'her', pick: 'split' }, pick: 'split' }),
      reopen: () => this.setState({ vote: null }),
      sealStyle:
        'all: unset; flex: 1.3; height: 40px; box-sizing: border-box; border: 3px solid #2A2522; border-radius: 14px; box-shadow: 3px 4px 0 #2A2522; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 15px; font-weight: 600; background: ' +
        (noPick ? '#EFE6D7' : accent) +
        '; opacity: ' +
        (noPick ? '.6' : '1') +
        '; cursor: ' +
        (noPick ? 'default' : 'pointer') +
        ';',
      badge:
        'width: 36px; height: 36px; flex: none; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center;' +
        (vote && vote.by === 'her'
          ? ' background: #EFE4CF; border: 2.5px dashed #2A2522;'
          : ' background: #CFE3F4; border: 2.5px solid #2A2522;'),
      badgePath: vote && vote.by === 'her' ? FACE : PEN,
      sealedTitle: vote ? 'Sealed: ' + O[vote.pick][0].toLowerCase() : '',
      sealedNote: !vote
        ? ''
        : vote.by === 'her'
          ? 'Amara voted to split it. “He did one coat of two, so he earned half.”'
          : 'Nobody sees it until the jury meets on Thursday at 2 pm.',
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
            href="Court.dc.html"
            aria-label="Back to the courthouse"
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
              Jury duty
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Case 14 · jury meets Thursday 2 pm
            </span>
          </div>
        </header>

        <div
          className="jd-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '2px 20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* The case */}

          <section
            aria-label="The case"
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '22px',
              background: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: '#2A2522',
                color: '#FFFDF8',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span
                  style={{ fontSize: '11.5px', fontWeight: '800', letterSpacing: '.05em', color: '#F2CE6E' }}
                >
                  CASE 14 · AN UNFINISHED GIG
                </span>

                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '21px',
                    fontWeight: '700',
                    lineHeight: '1.05',
                  }}
                >
                  Sade v Yaw
                </span>
              </span>

              <span
                style={{
                  border: '2px solid #F2CE6E',
                  borderRadius: '999px',
                  padding: '1px 8px',
                  fontSize: '11px',
                  fontWeight: '800',
                  color: '#F2CE6E',
                }}
              >
                AT STAKE · 40
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div
                style={{
                  padding: '10px 12px',
                  borderRight: '2px dashed #2A2522',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#8E4129' }}>SADE SAYS</span>

                <span style={{ fontSize: '13px', fontWeight: '600', lineHeight: '1.4' }}>
                  “I paid 40 for two coats of paint. He did one and stopped answering. I want my 40 back.”
                </span>
              </div>

              <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#2F3E5C' }}>YAW SAYS</span>

                <span style={{ fontSize: '13px', fontWeight: '600', lineHeight: '1.4' }}>
                  “The first coat was the hard part. I got sick. 20 of it is mine.”
                </span>
              </div>
            </div>

            <div
              style={{
                borderTop: '2px dashed #2A2522',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: '800',
                color: '#5E564D',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5E564D"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 5 H20 V15 H11 L6 19 V15 H4 Z" />
              </svg>
              A settler tried first. Yaw walked away from the deal.
            </div>
          </section>

          {/* Evidence: only what the record holds */}

          <section
            aria-label="Evidence"
            style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
                Evidence
              </span>

              <span style={{ fontSize: '12px', fontWeight: '800', color: '#5E564D' }}>
                From the permanent record
              </span>
            </div>

            {vals.evidence.map((e, $index) => (
              <button key={$index} type="button" aria-expanded={e.open} onClick={e.toggle} style={css(e.s)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={css(e.iconBox)}>
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
                      <path d={e.icon} />
                    </svg>
                  </span>

                  <span style={{ flex: '1', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <span
                      style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '700' }}
                    >
                      {e.title}
                    </span>

                    <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#5E564D' }}>{e.when}</span>
                  </span>

                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
                    {e.arrow}
                  </span>
                </span>

                <span style={css(e.detailStyle)}>{e.detail}</span>
              </button>
            ))}
          </section>

          {/* Rules of serving */}

          <div
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '2.5px dashed #2A2522',
              borderRadius: '16px',
              background: '#EFE4CF',
              padding: '9px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              fontSize: '12.5px',
              fontWeight: '700',
              lineHeight: '1.35',
            }}
          >
            <span>· Trading on Case 14 is paused for you until the verdict.</span>

            <span>· Five jurors. Votes stay sealed until Thursday; the majority decides.</span>

            <span>· Serving pays 10. If you can't make it, Amara serves in your place.</span>
          </div>
        </div>

        {/* Your vote */}

        <section
          aria-live="polite"
          aria-label="Your vote"
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
          {vals.open ? (
            <>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '16px', fontWeight: '700' }}>
                Your vote · sealed until Thursday
              </span>

              <div
                role="radiogroup"
                aria-label="Verdict"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '6px' }}
              >
                {vals.options.map((o, $index) => (
                  <button
                    key={$index}
                    type="button"
                    role="radio"
                    aria-checked={o.on}
                    onClick={o.pick}
                    style={css(o.s)}
                  >
                    <span
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '14px',
                        fontWeight: '700',
                        lineHeight: '1.1',
                      }}
                    >
                      {o.name}
                    </span>

                    <span style={{ fontSize: '10.5px', fontWeight: '800', opacity: '.8' }}>{o.sub}</span>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={vals.seal}
                  aria-disabled={vals.noPick}
                  style={css(vals.sealStyle)}
                >
                  Seal my vote
                </button>

                <button
                  type="button"
                  onClick={vals.handOff}
                  style={{
                    all: 'unset',
                    flex: '1',
                    height: '40px',
                    boxSizing: 'border-box',
                    border: '3px dashed #2A2522',
                    borderRadius: '14px',
                    background: '#EFE4CF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Hand Off
                </button>
              </div>
            </>
          ) : null}

          {vals.sealed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={css(vals.badge)}>
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
                  <path d={vals.badgePath} />
                </svg>
              </span>

              <span style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15.5px', fontWeight: '700' }}>
                  {vals.sealedTitle}
                </span>

                <span style={{ fontSize: '12.5px', fontWeight: '700', lineHeight: '1.35', color: '#3A302A' }}>
                  {vals.sealedNote}
                </span>
              </span>

              <button
                type="button"
                onClick={vals.reopen}
                style={{
                  all: 'unset',
                  fontSize: '12.5px',
                  fontWeight: '800',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Change
              </button>
            </div>
          ) : null}
        </section>
      </div>
    );
  }
}
