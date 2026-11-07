// Court cases
import { Fragment } from 'react';
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Cases extends Screen {
  static title = 'Cases';

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

    const STAGES = ['Filed', 'Settler', 'Evidence', 'Jury', 'Verdict'];
    const stageDots = (at) =>
      STAGES.map((name, i) => ({
        name,
        dot:
          'width: 14px; height: 14px; box-sizing: border-box; border: 2px solid #2A2522; border-radius: 50%; background: ' +
          (i < at ? '#2A2522' : i === at ? accent : '#FFFDF8') +
          ';',
        line:
          i < STAGES.length - 1
            ? 'flex: 1; height: 2.5px; background: ' + (i < at ? '#2A2522' : 'rgba(42,37,34,.25)') + ';'
            : 'display: none;',
        label: 'font-size: 9.5px; font-weight: 800; color: ' + (i === at ? '#2A2522' : '#8A8075') + ';',
      }));
    const filter = this.state.filter ?? 'all';
    const C = [
      {
        num: 14,
        kind: 'UNFINISHED GIG',
        title: 'Sade v Yaw',
        about: '40 paid for two coats of paint. One was done.',
        at: 3,
        next: 'Jury meets Thursday 2 pm',
        role: 'YOU’RE ON THE JURY',
        roleBg: '#C8553D',
        mine: true,
        soon: true,
        href: 'JuryDuty.dc.html',
      },
      {
        num: 15,
        kind: 'ESUSU',
        title: 'Your circle v Tunde',
        about: 'Late in round 2, then missed round 3 altogether.',
        at: 1,
        next: 'With settler Dayo · an offer is waiting',
        role: 'YOUR CIRCLE',
        roleBg: '#F2CE6E',
        mine: true,
        soon: false,
        href: 'Settlers.dc.html',
      },
      {
        num: 12,
        kind: 'DEFAMATION',
        title: 'Chidi v Zainab',
        about: 'A feed post said Chidi cheats at Ayo.',
        at: 2,
        next: 'Hearing Saturday 11 am',
        role: '',
        mine: false,
        soon: true,
        href: '#',
      },
      {
        num: 16,
        kind: 'NOISE · LAW 20',
        title: 'Room 5A v Room 5B',
        about: 'Music after 11 pm on six nights this week.',
        at: 0,
        next: 'Room 5B has 3 days to answer',
        role: '',
        mine: false,
        soon: false,
        href: '#',
      },
    ];
    const keep = { all: () => true, mine: (c) => c.mine, soon: (c) => c.soon }[filter];
    const cases = C.filter(keep).map((c) => ({
      num: String(c.num),
      kind: c.kind,
      title: c.title,
      about: c.about,
      next: c.next,
      role: c.role,
      href: c.href,
      label: 'Case ' + c.num + ', ' + c.title + ': ' + c.next,
      stages: stageDots(c.at),
      roleStyle: c.role
        ? 'border: 2px solid #2A2522; border-radius: 999px; padding: 0 7px; font-size: 10px; font-weight: 800; background: ' +
          c.roleBg +
          '; color: ' +
          (c.roleBg === '#C8553D' ? '#FFFDF8' : '#2A2522') +
          ';'
        : 'display: none;',
      s:
        'flex: none; box-sizing: border-box; border: 3px solid #2A2522; border-radius: 20px; background: ' +
        (c.mine ? '#FFFDF8' : '#FBF7F0') +
        '; box-shadow: 4px 5px 0 #2A2522; padding: 11px 14px 12px; display: flex; flex-direction: column; gap: 4px; text-decoration: none;',
    }));
    const filters = [
      ['all', 'All 4'],
      ['mine', 'Involving you'],
      ['soon', 'Hearing soon'],
    ].map(([key, name]) => ({
      name,
      on: key === filter,
      pick: () => this.setState({ filter: key }),
      s: chipStyle(key === filter),
    }));
    return { accent, cases, filters };
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
              Cases
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              4 open · every case is public
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
            gap: '12px',
          }}
        >
          {vals.cases.map((c, $index) => (
            <ScreenLink key={$index} href={c.href} aria-label={c.label} style={css(c.s)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#5E564D' }}>
                  CASE {c.num} · {c.kind}
                </span>

                <span style={{ flex: '1' }} />

                <span style={css(c.roleStyle)}>{c.role}</span>
              </div>

              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '19px',
                  fontWeight: '700',
                  lineHeight: '1.1',
                }}
              >
                {c.title}
              </span>

              <span style={{ fontSize: '13px', fontWeight: '600', lineHeight: '1.35', color: '#3A302A' }}>
                {c.about}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                {c.stages.map((s, $index) => (
                  <Fragment key={$index}>
                    <span
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '3px',
                        width: '44px',
                      }}
                    >
                      <span style={css(s.dot)} />
                      <span style={css(s.label)}>{s.name}</span>
                    </span>

                    <span style={css(`${s.line}; margin-bottom: 14px`)} />
                  </Fragment>
                ))}
              </div>

              <span style={{ fontSize: '12.5px', fontWeight: '800' }}>{c.next}</span>
            </ScreenLink>
          ))}
        </div>
      </div>
    );
  }
}
