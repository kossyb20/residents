// Council agenda
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class CouncilAgenda extends Screen {
  static title = 'Agenda';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const PEN = 'M4 20 L8 19 L19 8 L16 5 L5 16 Z M14 7 L17 10';
    const FACE = 'M12 3 A9 9 0 1 0 12.01 3 M9 10 V11 M15 10 V11 M8.5 15 Q12 18 15.5 15';
    const badge = (by, size) =>
      'width: ' +
      size +
      'px; height: ' +
      size +
      'px; flex: none; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center;' +
      (by === 'her'
        ? ' background: #EFE4CF; border: 2.5px dashed #2A2522;'
        : ' background: #CFE3F4; border: 2.5px solid #2A2522;');
    const tabStyle = (on) =>
      'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 5px; font-family: Fredoka, sans-serif; font-size: 14.5px; font-weight: 600; cursor: pointer;' +
      (on
        ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
        : ' border: 2.5px solid transparent;');
    const chipStyle = (on) =>
      'all: unset; flex: none; height: 32px; box-sizing: border-box; padding: 0 12px; border-radius: 999px; display: flex; align-items: center; font-size: 13px; font-weight: 800; cursor: pointer; border: 2.5px solid #2A2522;' +
      (on ? ' background: #2A2522; color: #FFFDF8;' : ' background: #FFFDF8; color: #2A2522;');
    const btn = (bg, dashed) =>
      'all: unset; flex: 1; height: 42px; box-sizing: border-box; border: 3px ' +
      (dashed ? 'dashed' : 'solid') +
      ' #2A2522; border-radius: 14px; background: ' +
      bg +
      ';' +
      (dashed ? '' : ' box-shadow: 3px 4px 0 #2A2522;') +
      ' display: flex; align-items: center; justify-content: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 15.5px; font-weight: 600; cursor: pointer; color: #2A2522;';

    const filter = this.state.filter ?? 'upcoming';
    // Sessions and items come from the record, so there can be any number of each.
    const SESSIONS = [
      {
        key: 'thu',
        when: 'upcoming',
        title: 'Thursday',
        meta: '9 am · council hall',
        tag: 'NEXT',
        items: [
          {
            kind: 'MOTION',
            by: 'Cllr Ife',
            title: 'Cap rent rises at 10% a season',
            status: 'Needs 3 of 5 · has 2',
            tone: 'open',
            comments: 41,
            href: 'AgendaItem.dc.html',
            mine: true,
          },
          {
            kind: 'MOTION',
            by: 'Cllr Sade',
            title: 'Top up the lift repair from the treasury',
            status: 'Has the 3 votes it needs',
            tone: 'ok',
            comments: 18,
            href: '#',
            mine: true,
          },
          {
            kind: 'REPORT',
            by: 'Treasurer',
            title: 'The treasury this cycle',
            status: 'For information · no vote',
            tone: 'info',
            comments: 3,
            href: 'Treasury.dc.html',
          },
        ],
      },
      {
        key: 'next',
        when: 'upcoming',
        title: 'Thursday week',
        meta: '9 am · being drafted',
        tag: '',
        items: [
          {
            kind: 'MOTION',
            by: 'Cllr Femi',
            title: 'Review the market stall fee',
            status: 'Drafted · positions not declared',
            tone: 'info',
            comments: 6,
            href: '#',
          },
          {
            kind: 'PETITION',
            by: 'Started by Kemi',
            title: 'Service the lift every month',
            status: '188 of 250 signatures · joins if it gets there',
            tone: 'open',
            comments: 22,
            href: 'Petitions.dc.html',
            mine: true,
          },
          {
            kind: 'MOTION',
            by: 'Cllr Sade',
            title: 'Let watch parties run past 11 pm',
            status: 'Drafted · amends Law 20',
            tone: 'info',
            comments: 9,
            href: '#',
          },
          {
            kind: 'MOTION',
            by: 'Cllr Tunde',
            title: 'Let owners set rents above the cap for new tenants',
            status: 'Waiting on the constitution check',
            tone: 'open',
            comments: 14,
            href: '#',
          },
        ],
      },
      {
        key: 'last',
        when: 'past',
        title: 'Last Thursday',
        meta: 'decided',
        tag: '',
        items: [
          {
            kind: 'MOTION',
            by: 'Cllr Sade',
            title: 'Lift repair levy',
            status: 'Passed 3–2 · now Law 21',
            tone: 'ok',
            comments: 57,
            href: 'LawRegister.dc.html',
          },
          {
            kind: 'MOTION',
            by: 'Cllr Bisi',
            title: 'Quiet hours after 11 pm',
            status: 'Passed 4–1 · now Law 20',
            tone: 'ok',
            comments: 30,
            href: 'LawRegister.dc.html',
          },
          {
            kind: 'MOTION',
            by: 'Cllr Tunde',
            title: 'Councillors may trade during votes',
            status: 'Passed 3–2 · vetoed by the Admin',
            tone: 'bad',
            comments: 88,
            href: 'LawRegister.dc.html',
          },
        ],
      },
    ];
    const KIND = { MOTION: '#FDE3C8', REPORT: '#CFE3F4', PETITION: '#E3F0DF' };
    const TONE = { open: '#8E4129', ok: '#2F6B5F', bad: '#C8553D', info: '#5E564D' };
    const pass = { upcoming: (g) => g.when === 'upcoming', past: (g) => g.when === 'past', mine: () => true }[
      filter
    ];
    let n = 0;
    const sessions = SESSIONS.filter(pass)
      .map((g) => {
        const items = g.items
          .filter((i) => filter !== 'mine' || i.mine)
          .map((i, k) => ({
            num: String(k + 1),
            kind: i.kind,
            by: i.by,
            title: i.title,
            status: i.status,
            href: i.href,
            comments: String(i.comments),
            label: i.kind.toLowerCase() + ': ' + i.title + ', ' + i.status,
            s:
              'box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 16px; background: #FFFDF8; padding: 9px 11px; display: flex; align-items: center; gap: 10px; text-decoration: none;' +
              (g.tag ? ' box-shadow: 3px 4px 0 #2A2522;' : ''),
            numStyle:
              'width: 28px; height: 28px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 50%; background: ' +
              (g.tag ? accent : '#F5EFE5') +
              '; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 13px; font-weight: 700;',
            kindStyle:
              'flex: none; border: 1.5px solid #2A2522; border-radius: 999px; padding: 0 6px; font-size: 9.5px; font-weight: 800; letter-spacing: .04em; background: ' +
              KIND[i.kind] +
              ';',
            statusStyle: 'font-size: 12px; font-weight: 800; color: ' + TONE[i.tone] + ';',
          }));
        n += items.length;
        return {
          title: g.title,
          meta: g.meta + ' · ' + items.length + ' item' + (items.length === 1 ? '' : 's'),
          tag: g.tag,
          items,
          liveStyle: g.tag
            ? 'border: 2px solid #2A2522; border-radius: 999px; padding: 0 7px; font-size: 10px; font-weight: 800; background: #C8553D; color: #FFFDF8;'
            : 'display: none;',
        };
      })
      .filter((g) => g.items.length);
    const filters = [
      ['upcoming', 'Coming up'],
      ['mine', 'Following'],
      ['past', 'Decided'],
    ].map(([key, name]) => ({
      name,
      on: key === filter,
      pick: () => this.setState({ filter: key }),
      s: chipStyle(key === filter),
    }));
    return {
      accent,
      sessions,
      filters,
      emptyStyle: n
        ? 'display: none;'
        : 'align-self: center; font-size: 13px; font-weight: 700; color: #5E564D;',
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

          <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
            <h1
              style={{
                margin: '0',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '26px',
                fontWeight: '700',
                lineHeight: '1.1',
              }}
            >
              Agenda
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              What the council will decide
            </span>
          </div>
        </header>

        <div
          className="pg-row"
          aria-label="Show"
          style={{
            display: 'flex',
            gap: '7px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            padding: '2px 20px 4px',
            flex: 'none',
          }}
        >
          {vals.filters.map((f, $index) => (
            <button key={$index} type="button" aria-pressed={f.on} onClick={f.pick} style={css(f.s)}>
              {f.name}
            </button>
          ))}
        </div>

        <div
          className="pg-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '10px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {vals.sessions.map((g, $index) => (
            <section
              key={$index}
              aria-label={g.title}
              style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
                  {g.title}
                </span>

                <span style={{ flex: '1', fontSize: '12.5px', fontWeight: '800', color: '#5E564D' }}>
                  {g.meta}
                </span>

                <span style={css(g.liveStyle)}>{g.tag}</span>
              </div>

              {g.items.map((i, $index) => (
                <ScreenLink key={$index} href={i.href} aria-label={i.label} style={css(i.s)}>
                  <span style={css(i.numStyle)}>{i.num}</span>

                  <span
                    style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '2px' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={css(i.kindStyle)}>{i.kind}</span>
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: '800',
                          color: '#5E564D',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {i.by}
                      </span>
                    </span>

                    <span
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '16px',
                        fontWeight: '700',
                        lineHeight: '1.15',
                      }}
                    >
                      {i.title}
                    </span>

                    <span style={css(i.statusStyle)}>{i.status}</span>
                  </span>

                  <span
                    style={{
                      flex: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '4px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: '800',
                        color: '#5E564D',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#5E564D"
                        strokeWidth="2.6"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 5 H20 V15 H11 L6 19 V15 H4 Z" />
                      </svg>
                      {i.comments}
                    </span>

                    <svg
                      width="16"
                      height="16"
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
                  </span>
                </ScreenLink>
              ))}
            </section>
          ))}

          <span style={css(vals.emptyStyle)}>Nothing here yet.</span>
        </div>

        <ScreenLink
          href="Petitions.dc.html"
          style={{
            margin: '0 20px 22px',
            flex: 'none',
            boxSizing: 'border-box',
            border: '2.5px dashed #2A2522',
            borderRadius: '16px',
            background: '#FFFDF8',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <span style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15.5px', fontWeight: '700' }}>
              Want something on the agenda?
            </span>

            <span style={{ fontSize: '12px', fontWeight: '700', color: '#5E564D' }}>
              A petition with 250 signatures gets a slot
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
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </ScreenLink>
      </div>
    );
  }
}
