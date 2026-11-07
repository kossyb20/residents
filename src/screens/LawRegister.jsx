// Law register
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class LawRegister extends Screen {
  static title = 'Law register';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const tabKey = this.state.tab ?? 'force';

    const ART = { housing: 'Article I · Housing floor', records: 'Article V · Permanent records' };

    const L = {
      force: [
        {
          id: 'LAW 21',
          tag: 'NEW',
          title: 'Lift repair levy',
          body: 'Every resident pays 2 a week until the lift is fixed.',
          meta: 'Passed 3–2 · Monday',
        },
        {
          id: 'LAW 20',
          tag: 'NEW',
          title: 'Quiet hours',
          body: 'No music in the common room after 11 pm.',
          meta: 'Passed 4–1 · last week',
        },
        {
          id: 'LAW 19',
          tag: 'NEW',
          title: 'Gig deposits',
          body: 'Gigs worth over 50 hold 10% until the work is done.',
          meta: 'Passed 3–2 · last week',
        },
        {
          id: 'LAW 14',
          tag: 'IN FORCE',
          title: 'Market stall fee',
          body: 'Stalls in the supermarket pay 3 a day to the treasury.',
          meta: 'Passed 5–0 · season 2',
        },
      ],
      veto: [
        {
          id: 'LAW 18',
          tag: 'VETOED',
          title: 'Councillors may trade freely',
          body: 'Lift the trading ban on councillors during votes.',
          meta: 'Passed 3–2 · vetoed by the Admin',
          reason: 'Admin’s reason: councillors could trade on laws they are about to vote on.',
        },
      ],
      blocked: [
        {
          id: 'DRAFT',
          tag: 'BLOCKED',
          title: 'Evict rent dodgers',
          body: 'Take the room of anyone who misses three rents.',
          meta: 'Proposed by Cllr Tunde · stopped by the game',
          reason: 'Can’t go to a vote. It breaches',
          breach: 'housing',
        },
        {
          id: 'DRAFT',
          tag: 'BLOCKED',
          title: 'Clear old verdicts',
          body: 'Delete court verdicts older than two seasons.',
          meta: 'Proposed by Cllr Ife · stopped by the game',
          reason: 'Can’t go to a vote. It breaches',
          breach: 'records',
        },
      ],
    };
    const tabNames = { force: 'In force', veto: 'Vetoed', blocked: 'Blocked' };
    const tabs = Object.keys(tabNames).map((key) => {
      const on = key === tabKey;
      return {
        key,
        on,
        name: tabNames[key],
        n: String(L[key].length),
        pick: () => this.setState({ tab: key }),
        s:
          'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 15px; font-weight: 600; cursor: pointer;' +
          (on
            ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
            : ' border: 2.5px solid transparent;'),
      };
    });

    const TAG = {
      NEW: ['#F2CE6E', '#2A2522'],
      'IN FORCE': ['#E3F0DF', '#2A2522'],
      VETOED: ['#C8553D', '#FFFDF8'],
      BLOCKED: ['#2F3E5C', '#FFFDF8'],
    };
    const laws = L[tabKey].map((l) => {
      const [tbg, tfg] = TAG[l.tag];
      const dim = l.tag === 'VETOED' || l.tag === 'BLOCKED';
      return {
        id: l.id,
        tag: l.tag,
        title: l.title,
        body: l.body,
        meta: l.meta,
        reason: l.reason || '',
        chip: l.breach ? ART[l.breach] : '',
        strike: dim ? 'line-through' : 'none',
        s:
          'box-sizing: border-box; border: 3px solid #2A2522; border-radius: 18px; background: ' +
          (dim ? '#EFE4CF' : '#FFFDF8') +
          '; box-shadow: 4px 5px 0 #2A2522; padding: 11px 14px 12px; display: flex; flex-direction: column; gap: 4px; flex: none;',
        tagStyle:
          'border: 2px solid #2A2522; border-radius: 999px; padding: 1px 8px; background: ' +
          tbg +
          '; color: ' +
          tfg +
          '; font-size: 11px; font-weight: 800; letter-spacing: .04em;',
        reasonStyle: l.reason
          ? 'margin-top: 4px; border-top: 2px dashed #2A2522; padding-top: 7px; display: flex; flex-wrap: wrap; align-items: center; gap: 7px;'
          : 'display: none;',
        chipStyle: l.breach
          ? 'all: unset; box-sizing: border-box; height: 26px; border-radius: 999px; padding: 0 9px; display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 800; text-decoration: none; border: 2px solid #2A2522; background: #F3E1B4; color: #2A2522;'
          : 'display: none;',
      };
    });

    return { accent, tabs, laws };
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
            href="Council.dc.html"
            aria-label="Back to the council hall"
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
              Law register
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Council hall · public record
            </span>
          </div>
        </header>

        {/* Every law answers to the Constitution */}

        <ScreenLink
          href="Constitution.dc.html"
          style={{
            margin: '0 20px',
            boxSizing: 'border-box',
            border: '3px dashed #2A2522',
            borderRadius: '16px',
            background: '#F3E1B4',
            padding: '9px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <svg width="30" height="26" viewBox="0 0 64 50" aria-hidden="true" style={{ flex: 'none' }}>
            <rect
              x="10"
              y="4"
              width="44"
              height="9"
              rx="4.5"
              fill="#C08A5B"
              stroke="#2A2522"
              strokeWidth="3.5"
            />
            <path d="M14 13 H50 V37 H14 Z" fill="#FBF1D6" stroke="#2A2522" strokeWidth="3.5" />
            <rect
              x="10"
              y="37"
              width="44"
              height="9"
              rx="4.5"
              fill="#C08A5B"
              stroke="#2A2522"
              strokeWidth="3.5"
            />
          </svg>

          <span style={{ flex: '1', fontSize: '13px', fontWeight: '800', lineHeight: '1.3' }}>
            Every law here must fit inside the Constitution
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
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </ScreenLink>

        {/* Council laws below it */}

        <div
          role="tablist"
          aria-label="Laws"
          style={{
            margin: '14px 20px 0',
            height: '44px',
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
              <span style={{ fontSize: '12.5px', opacity: '.7' }}>{t.n}</span>
            </button>
          ))}
        </div>

        <div
          className="lr-scroll"
          style={{
            flex: '1',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '14px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {vals.laws.map((l, $index) => (
            <article key={$index} style={css(l.s)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '12.5px',
                    fontWeight: '700',
                    color: '#5E564D',
                  }}
                >
                  {l.id}
                </span>

                <span style={{ flex: '1' }} />

                <span style={css(l.tagStyle)}>{l.tag}</span>
              </div>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '18px',
                  fontWeight: '700',
                  lineHeight: '1.15',
                  textDecoration: l.strike,
                }}
              >
                {l.title}
              </span>

              <span style={{ fontSize: '13.5px', fontWeight: '600', lineHeight: '1.35' }}>{l.body}</span>

              <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#5E564D' }}>{l.meta}</span>

              <div style={css(l.reasonStyle)}>
                <span style={{ fontSize: '12.5px', fontWeight: '700', lineHeight: '1.35' }}>{l.reason}</span>

                <ScreenLink
                  href="Constitution.dc.html"
                  aria-label="Read the article it breaches"
                  style={css(l.chipStyle)}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M6 11 H18 V21 H6 Z M9 11 V7 A3 3 0 0 1 15 7 V11"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {l.chip}
                </ScreenLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }
}
