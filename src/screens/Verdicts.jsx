// Verdicts
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Verdicts extends Screen {
  static title = 'Verdicts';

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

    const filter = this.state.filter ?? 'all';
    const V = [
      {
        num: 13,
        kind: 'BROKEN DEAL',
        g: 'deal',
        when: 'week 8',
        title: 'Kofi v Ife',
        out: 'For Kofi · Ife pays 15',
        win: true,
        split: '4–1',
        cite: '',
        why: 'Ife left a paid study group halfway through.',
        appealed: true,
      },
      {
        num: 11,
        kind: 'DEBT',
        g: 'debt',
        when: 'week 8',
        title: 'Nia v Juma',
        out: 'Juma repays 25',
        win: true,
        split: '5–0',
        cite: '',
        why: 'The loan and the promise were both on the record.',
      },
      {
        num: 10,
        kind: 'LIFT',
        g: 'deal',
        when: 'week 7',
        title: 'Mama Ngozi v the building',
        out: 'Dismissed',
        win: false,
        split: '3–2',
        cite: 'Law 21',
        why: 'The levy already covers the repair. No refund owed.',
      },
      {
        num: 9,
        kind: 'NOISE',
        g: 'noise',
        when: 'week 7',
        title: 'Room 7B v Room 7C',
        out: 'Fine of 10',
        win: true,
        split: '4–1',
        cite: 'Law 20',
        why: 'Music past 11 pm on four nights.',
      },
      {
        num: 8,
        kind: 'DEFAMATION',
        g: 'words',
        when: 'week 6',
        title: 'Tunde v Kemi',
        out: 'Dismissed',
        win: false,
        split: '5–0',
        cite: '',
        why: 'Kemi’s post was true. Saying something true is not defamation.',
      },
      {
        num: 7,
        kind: 'ESUSU',
        g: 'debt',
        when: 'week 5',
        title: 'Circle 1 v Efua',
        out: 'Efua pays 40 and 5 costs',
        win: true,
        split: '5–0',
        cite: '',
        why: 'Missed a round after taking the payout.',
      },
      {
        num: 5,
        kind: 'EVICTION',
        g: 'deal',
        when: 'week 3',
        title: 'Owner of 6C v tenant',
        out: 'Dismissed',
        win: false,
        split: 'judge',
        cite: 'Article I',
        why: 'Nobody can lose their last room. Thrown out before a jury.',
      },
    ];
    const G = [
      ['all', 'All'],
      ['debt', 'Debts'],
      ['deal', 'Deals'],
      ['noise', 'Noise'],
      ['words', 'Defamation'],
    ];
    const list = V.filter((v) => filter === 'all' || v.g === filter);
    const verdicts = list.map((v) => ({
      num: String(v.num),
      kind: v.kind,
      when: v.when,
      title: v.title,
      out: v.out,
      split: v.split,
      cite: v.cite,
      why: v.why,
      appealStyle: v.appealed
        ? 'border: 2px solid #2A2522; border-radius: 999px; padding: 0 6px; font-size: 9.5px; font-weight: 800; background: #F2CE6E;'
        : 'display: none;',
      outStyle:
        'border: 2px solid #2A2522; border-radius: 999px; padding: 1px 8px; font-size: 12px; font-weight: 800; background: ' +
        (v.win ? '#2F3E5C' : '#EFE4CF') +
        '; color: ' +
        (v.win ? '#FFFDF8' : '#2A2522') +
        ';',
      citeStyle: v.cite
        ? 'border: 1.5px solid #2A2522; border-radius: 6px; padding: 0 6px; font-size: 11px; font-weight: 800; background: ' +
          (v.cite.startsWith('Article') ? '#F3E1B4' : '#CFE3F4') +
          ';'
        : 'display: none;',
    }));
    const filters = G.map(([key, name]) => ({
      name,
      on: key === filter,
      pick: () => this.setState({ filter: key }),
      s: chipStyle(key === filter),
    }));
    return {
      accent,
      verdicts,
      filters,
      showing:
        filter === 'all' ? 'Showing 7 of 12 · older verdicts in the archive' : 'Showing ' + list.length,
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
              Verdicts
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              12 this season · on the record for good
            </span>
          </div>
        </header>

        <div
          className="pg-row"
          aria-label="Filter"
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
            gap: '10px',
          }}
        >
          {vals.verdicts.map((v, $index) => (
            <article
              key={$index}
              style={{
                flex: 'none',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '16px',
                background: '#FFFDF8',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#5E564D' }}>
                  CASE {v.num} · {v.kind} · {v.when}
                </span>

                <span style={{ flex: '1' }} />

                <span style={css(v.appealStyle)}>APPEALED</span>
              </div>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '17px',
                  fontWeight: '700',
                  lineHeight: '1.15',
                }}
              >
                {v.title}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={css(v.outStyle)}>{v.out}</span>

                <span style={{ fontSize: '12px', fontWeight: '800', color: '#5E564D' }}>Jury {v.split}</span>

                <span style={css(v.citeStyle)}>{v.cite}</span>
              </div>

              <span style={{ fontSize: '12.5px', fontWeight: '600', lineHeight: '1.35', color: '#3A302A' }}>
                {v.why}
              </span>
            </article>
          ))}

          <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#5E564D', textAlign: 'center' }}>
            {vals.showing}
          </span>
        </div>
      </div>
    );
  }
}
