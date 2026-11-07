// Treasury
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Treasury extends Screen {
  static title = 'Treasury';

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

    const tab = this.state.tab ?? 'in';
    const F = {
      in: {
        label: 'Money in',
        total: 'Money in this cycle · 14,800',
        rows: [
          ['Lift repair levy', 6200, '#F2CE6E', 'Law 21 · 2 a week from every resident · ring-fenced'],
          ['The Admin\u2019s grant', 4900, '#8FC1A9', 'Weekly, to fund basic income'],
          ['Market stall fees', 2400, '#E59A6B', 'Law 14 · 3 a day'],
          ['Court and filing fees', 1300, '#9DB8E0', ''],
        ],
      },
      out: {
        label: 'Money out',
        total: 'Money out this cycle · 12,600',
        rows: [
          [
            'Basic income',
            8400,
            '#8FC1A9',
            'Paid to every resident each week, set aside for rent · Article II',
          ],
          ['Building upkeep', 2100, '#E59A6B', 'Cleaning, lights, the noticeboard'],
          ['Jurors and settlers', 1300, '#9DB8E0', '10 per juror per case'],
          ['Events', 800, '#F2CE6E', 'Ludo Night prizes, the watch party'],
        ],
      },
    };
    const f = F[tab];
    const max = Math.max(...f.rows.map((r) => r[1]));
    const rows = f.rows.map(([name, amt, color, note]) => ({
      name,
      amt: amt.toLocaleString('en-US'),
      color,
      note,
      pct: Math.round((amt / max) * 100) + '%',
      noteStyle: note ? 'font-size: 11.5px; font-weight: 700; color: #5E564D;' : 'display: none;',
    }));
    const tabs = [
      ['in', 'Money in'],
      ['out', 'Money out'],
    ].map(([key, name]) => ({
      name,
      on: key === tab,
      pick: () => this.setState({ tab: key }),
      s: tabStyle(key === tab),
    }));
    return { accent, tabs, rows, flowLabel: f.label, flowTotal: f.total };
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
              Treasury
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              The building’s money · public record
            </span>
          </div>
        </header>

        <div
          className="pg-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            padding: '2px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <section
            aria-label="Balance"
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '22px',
              background: '#2F3E5C',
              color: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '11.5px', fontWeight: '800', letterSpacing: '.05em', color: '#F2CE6E' }}>
              IN THE TREASURY
            </span>

            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '40px',
                fontWeight: '700',
                lineHeight: '1',
              }}
            >
              <svg width="22" height="30" viewBox="0 0 30 40" aria-hidden="true">
                <path
                  d="M4 8 H26 L4 32 H26 M15 2 V38"
                  fill="none"
                  stroke="#FFFDF8"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              9,400
            </span>

            <div style={{ display: 'flex', gap: '8px' }}>
              <span
                style={{
                  flex: '1',
                  boxSizing: 'border-box',
                  border: '2px solid #FFFDF8',
                  borderRadius: '12px',
                  padding: '6px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.8' }}>Ring-fenced</span>
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '700' }}>
                  6,200 lift levy
                </span>
              </span>

              <span
                style={{
                  flex: '1',
                  boxSizing: 'border-box',
                  border: '2px solid #FFFDF8',
                  borderRadius: '12px',
                  padding: '6px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: '800', opacity: '.8' }}>Free to spend</span>
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '700' }}>
                  3,200
                </span>
              </span>
            </div>
          </section>

          <div
            role="tablist"
            aria-label="Flow"
            style={{
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

          <section
            aria-label={vals.flowLabel}
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#5E564D' }}>{vals.flowTotal}</span>

            {vals.rows.map((r, $index) => (
              <div key={$index} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '8px',
                    fontSize: '13.5px',
                    fontWeight: '800',
                  }}
                >
                  <span>{r.name}</span>
                  <span style={{ fontFamily: "'Fredoka', sans-serif" }}>{r.amt}</span>
                </span>

                <div
                  style={{
                    height: '12px',
                    boxSizing: 'border-box',
                    border: '2px solid #2A2522',
                    borderRadius: '999px',
                    background: '#F5EFE5',
                    overflow: 'hidden',
                  }}
                >
                  <span style={{ display: 'block', height: '100%', width: r.pct, background: r.color }} />
                </div>

                <span style={css(r.noteStyle)}>{r.note}</span>
              </div>
            ))}
          </section>

          <section
            aria-label="Waiting on a vote"
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '2.5px dashed #2A2522',
              borderRadius: '18px',
              background: '#FDE3C8',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '11.5px', fontWeight: '800', letterSpacing: '.05em', color: '#8E4129' }}>
              WAITING ON A VOTE
            </span>

            <ScreenLink
              href="CouncilAgenda.dc.html"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '16px',
                fontWeight: '700',
                textDecoration: 'none',
              }}
            >
              2,800 to the lift repair · Thursday →
            </ScreenLink>

            <span style={{ fontSize: '12.5px', fontWeight: '700', lineHeight: '1.35' }}>
              Bailouts from the treasury need the Admin’s approval too, published with a reason.
            </span>
          </section>
        </div>
      </div>
    );
  }
}
