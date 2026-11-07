// Councillors
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Councillors extends Screen {
  static title = 'Councillors';

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

    const sel = this.state.sel ?? 'Sade';
    const C = {
      Ife: {
        role: 'Floor 3 · second season',
        bg: '#E3F0DF',
        stand: true,
        pitch: 'Rent should never jump twice in one season.',
        attend: '100%',
        proposed: 4,
        mood: '62%',
        votes: [['for', 'for', 'against', 'for']],
      },
      Sade: {
        role: 'Chair · floor 9 · third season',
        bg: '#FDE3C8',
        stand: true,
        pitch: 'Fix what’s broken before we build anything new.',
        attend: '96%',
        proposed: 6,
        mood: '58%',
        votes: [['for', 'for', 'for', 'for']],
      },
      Tunde: {
        role: 'Floor 2 · first season',
        bg: '#CFE3F4',
        stand: true,
        pitch: 'Owners keep the building running. Don’t punish them.',
        attend: '81%',
        proposed: 3,
        mood: '39%',
        votes: [['against', 'for', 'for', 'against']],
      },
      Bisi: {
        role: 'Floor 7 · first season',
        bg: '#F7D6D6',
        stand: false,
        pitch: 'Keep the treasury for real emergencies.',
        attend: '88%',
        proposed: 1,
        mood: '47%',
        votes: [['undecided', 'against', 'against', 'for']],
      },
      Femi: {
        role: 'Floor 5 · second season',
        bg: '#EFE4CF',
        stand: true,
        pitch: 'Ask the building before we spend its money.',
        attend: '74%',
        proposed: 2,
        mood: '44%',
        votes: [['undecided', 'against', 'for', 'for']],
      },
    };
    const LAWS = [
      ['Rent cap', 'On Thursday’s agenda', 'AgendaItem.dc.html'],
      ['Law 21 · Lift repair levy', 'Passed 3–2', 'LawRegister.dc.html'],
      ['Law 18 · Councillors may trade', 'Passed 3–2 · vetoed by the Admin', 'LawRegister.dc.html'],
      ['Law 20 · Quiet hours', 'Passed 4–1', 'LawRegister.dc.html'],
    ];
    const V = {
      for: ['FOR', '#2F6B5F', '#FFFDF8'],
      against: ['AGAINST', '#C8553D', '#FFFDF8'],
      undecided: ['UNSURE', '#FFFDF8', '#2A2522'],
    };
    const c = C[sel];
    const seats = Object.keys(C).map((name) => ({
      name,
      ini: name[0],
      on: name === sel,
      pick: () => this.setState({ sel: name }),
      face:
        'width: 50px; height: 50px; box-sizing: border-box; border-radius: 50%; background: ' +
        C[name].bg +
        '; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 20px; font-weight: 700;' +
        (name === sel
          ? ' border: 3px solid #2A2522; box-shadow: 0 0 0 3px ' + accent + ', 3px 4px 0 3px #2A2522;'
          : ' border: 2.5px solid #2A2522;'),
    }));
    const record = LAWS.map(([law, out, href], i) => {
      const [label, bg, fg] = V[c.votes[0][i]];
      return {
        law,
        out,
        href,
        vote: label,
        chip:
          'flex: none; border: 2px solid #2A2522; border-radius: 999px; padding: 1px 8px; font-size: 11px; font-weight: 800; background: ' +
          bg +
          '; color: ' +
          fg +
          ';',
      };
    });
    return {
      accent,
      seats,
      record,
      name: sel,
      ini: sel[0],
      role: c.role,
      pitch: c.pitch,
      headBg: c.bg,
      stand: c.stand ? 'STANDING AGAIN' : 'STEPPING DOWN',
      standStyle:
        'flex: none; border: 2px solid #2A2522; border-radius: 999px; padding: 1px 8px; font-size: 10.5px; font-weight: 800; background: ' +
        (c.stand ? '#FFFDF8' : '#2A2522') +
        '; color: ' +
        (c.stand ? '#2A2522' : '#FFFDF8') +
        ';',
      bigFace:
        'width: 54px; height: 54px; flex: none; box-sizing: border-box; border: 3px solid #2A2522; border-radius: 50%; background: #FFFDF8; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 24px; font-weight: 700;',
      stats: [
        ['Sessions attended', c.attend, '#E3F0DF'],
        ['Motions proposed', String(c.proposed), '#FDE3C8'],
        ['Residents approve', c.mood, '#CFE3F4'],
      ].map(([k, v, bg]) => ({ k, v, bg })),
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
              Councillors
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Five seats · election in 9 days
            </span>
          </div>
        </header>

        {/* Pick a councillor */}

        <div
          role="tablist"
          aria-label="Councillors"
          style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 20px 0', flex: 'none' }}
        >
          {vals.seats.map((c, $index) => (
            <button
              key={$index}
              type="button"
              role="tab"
              aria-selected={c.on}
              onClick={c.pick}
              style={{
                all: 'unset',
                width: '62px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
              }}
            >
              <span style={css(c.face)}>{c.ini}</span>

              <span style={{ fontSize: '12px', fontWeight: '800' }}>{c.name}</span>
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
            padding: '14px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <section
            aria-label={vals.name}
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
                background: vals.headBg,
                padding: '12px 14px',
                borderBottom: '3px solid #2A2522',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={css(vals.bigFace)}>{vals.ini}</span>

              <span style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '23px',
                    fontWeight: '700',
                    lineHeight: '1',
                  }}
                >
                  Cllr {vals.name}
                </span>

                <span style={{ fontSize: '12.5px', fontWeight: '800' }}>{vals.role}</span>
              </span>

              <span style={css(vals.standStyle)}>{vals.stand}</span>
            </div>

            <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', lineHeight: '1.4' }}>“{vals.pitch}”</span>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px' }}>
                {vals.stats.map((s, $index) => (
                  <div
                    key={$index}
                    style={{
                      boxSizing: 'border-box',
                      border: '2.5px solid #2A2522',
                      borderRadius: '12px',
                      background: s.bg,
                      padding: '6px 4px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1px',
                    }}
                  >
                    <span
                      style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '700' }}
                    >
                      {s.v}
                    </span>

                    <span
                      style={{ fontSize: '10.5px', fontWeight: '800', color: '#5E564D', textAlign: 'center' }}
                    >
                      {s.k}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            aria-label="Voting record"
            style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '18px', fontWeight: '700' }}>
              How they voted
            </span>

            {vals.record.map((r, $index) => (
              <ScreenLink
                key={$index}
                href={r.href}
                style={{
                  boxSizing: 'border-box',
                  border: '2.5px solid #2A2522',
                  borderRadius: '14px',
                  background: '#FFFDF8',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                }}
              >
                <span style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15px', fontWeight: '700' }}>
                    {r.law}
                  </span>

                  <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#5E564D' }}>{r.out}</span>
                </span>

                <span style={css(r.chip)}>{r.vote}</span>
              </ScreenLink>
            ))}
          </section>

          <div style={{ display: 'flex', gap: '10px', flex: 'none' }}>
            <ScreenLink
              href="Thread.dc.html"
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
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '15.5px',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              Write to <span>{vals.name}</span>
            </ScreenLink>

            <ScreenLink
              href="Elections.dc.html"
              style={{
                flex: '1',
                height: '44px',
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '14px',
                background: '#FFFDF8',
                boxShadow: '3px 4px 0 #2A2522',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '15.5px',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              Election
            </ScreenLink>
          </div>
        </div>
      </div>
    );
  }
}
