// Notebook
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Notebook extends Screen {
  static title = 'Notebook';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const HEAT = { low: ['Low', '#9DB8E0', 0], med: ['Medium', '#F2CE6E', 6], high: ['High', '#C8553D', -8] };
    const HK = ['low', 'med', 'high'];
    // Hidden principle (the player never sees this): a peak near 30% copper, medium heat best
    const strength = (cu, h) =>
      Math.round(40 + 1.6 * cu - 0.027 * cu * cu + HEAT[h][2] + (((cu * 7 + HK.indexOf(h) * 13) % 5) - 2));
    const start = [
      [10, 'low', 'you'],
      [20, 'low', 'you'],
      [40, 'low', 'her'],
      [20, 'med', 'you'],
      [50, 'med', 'her'],
    ];
    const runs = this.state.runs ?? start.map(([cu, h, by]) => ({ cu, h, by, v: strength(cu, h) }));
    const runsLeft = this.state.runsLeft ?? 4;
    const cu = this.state.cu ?? 30;
    const heat = this.state.heat ?? 'med';
    const draft = this.state.draft ?? '';
    const notes = this.state.notes ?? [
      { by: 'you', t: 'Low heat: strength climbs from 10% to 20% copper, then drops by 40%.' },
      { by: 'her', t: "more copper helps, until it doesn't. try the middle?" },
      { by: 'you', t: 'Medium heat looks stronger than low at 20%.' },
    ];
    const hyp = this.state.hyp ?? { cu: 30, heat: 'med' };
    const submitted = this.state.submitted ?? false;
    const prior = runs.find((r) => r.cu === cu && r.h === heat);
    const addRun = (c, h, by, extraNote) => {
      if (runsLeft <= 0) return;
      const nr = runs.concat([{ cu: c, h, by, v: strength(c, h) }]);
      const patch = { runs: nr, runsLeft: runsLeft - 1 };
      if (extraNote) patch.notes = notes.concat([{ by: 'her', t: extraNote }]);
      this.setState(patch);
    };
    const chip = (on, w) =>
      'all: unset; ' +
      (w ? 'flex: 1; ' : '') +
      'height: 34px; min-width: 34px; padding: 0 6px; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 10px; display: flex; align-items: center; justify-content: center; gap: 4px; font-family: Fredoka, sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; background: ' +
      (on ? accent : '#FFFDF8') +
      ';';
    const cuSteps = [0, 10, 20, 30, 40, 50, 60].map((v) => ({
      v: String(v),
      on: v === cu,
      s: chip(v === cu, true),
      go: () => this.setState({ cu: v }),
    }));
    const heats = HK.map((k) => ({
      label: HEAT[k][0],
      fill: HEAT[k][1],
      on: k === heat,
      s: chip(k === heat, true),
      go: () => this.setState({ heat: k }),
    }));
    const points = runs.map((r) => ({
      t: r.cu + '% copper, ' + HEAT[r.h][0].toLowerCase() + ' heat: ' + r.v,
      s:
        'position: absolute; left: calc(' +
        (r.cu / 60) * 100 +
        '% - 7px); bottom: calc(' +
        ((r.v - 35) / 40) * 100 +
        '% - 7px); width: 14px; height: 14px; box-sizing: border-box; border-radius: 50%; border: 2.5px solid #2A2522; background: ' +
        HEAT[r.h][1] +
        ';',
    }));
    const best = runs.reduce((a, b) => (b.v > a.v ? b : a), runs[0]);
    const rows = runs.map((r, i) => ({
      n: String(i + 1),
      cu: String(r.cu),
      heat: HEAT[r.h][0],
      v: String(r.v),
      byYou: r.by === 'you',
      byHer: r.by === 'her',
      s:
        'display: grid; grid-template-columns: 34px 1fr 1fr 1fr 28px; gap: 4px; align-items: center; padding: 4px 8px; font-size: 13px; font-weight: 700; border-top: 1.5px solid #EFE6D7;' +
        (r === best ? ' background: #E3F0DF;' : ''),
      who:
        'width: 20px; height: 20px; box-sizing: border-box; border-radius: 50%; display: flex; align-items: center; justify-content: center; ' +
        (r.by === 'you'
          ? 'border: 2px solid #2A2522; background: #CFE3F4;'
          : 'border: 2px dashed #2A2522; background: #EFE4CF;'),
    }));
    const hchip = (on) =>
      'all: unset; height: 28px; padding: 0 8px; box-sizing: border-box; border: 2px solid #2A2522; border-radius: 8px; display: inline-flex; align-items: center; font-family: Fredoka, sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; background: ' +
      (on ? accent : '#FFFDF8') +
      ';';
    const hCu = [10, 20, 30, 40, 50].map((v) => ({
      v: String(v),
      s: hchip(hyp.cu === v),
      go: () => !submitted && this.setState({ hyp: { ...hyp, cu: v } }),
    }));
    const hHeat = HK.map((k) => ({
      v: HEAT[k][0].toLowerCase(),
      s: hchip(hyp.heat === k),
      go: () => !submitted && this.setState({ hyp: { ...hyp, heat: k } }),
    }));
    const herPick = () => {
      // Amara tries an untested setting next to the best result so far, preferring medium heat
      const cands = [];
      [best.cu - 10, best.cu + 10, best.cu].forEach((c) =>
        HK.forEach((h) => {
          if (c >= 0 && c <= 60 && !runs.some((r) => r.cu === c && r.h === h)) cands.push([c, h]);
        }),
      );
      cands.sort((a, b) => (a[1] === 'med' ? -1 : 0) - (b[1] === 'med' ? -1 : 0));
      return cands[0] || [30, 'med'];
    };
    return {
      accent,
      cu: String(cu),
      cuSteps,
      heats,
      points,
      rows,
      hCu,
      hHeat,
      runsLeft: String(runsLeft),
      tested: !!prior,
      testedS: prior ? String(prior.v) : '',
      runStyle:
        'all: unset; flex: 1.3; height: 44px; box-sizing: border-box; border-radius: 999px; background: ' +
        (runsLeft > 0 ? accent : '#EFE4CF') +
        '; border: 3px solid #2A2522; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 16px; font-weight: 600; cursor: pointer;',
      run: () => addRun(cu, heat, 'you'),
      handOff: () => {
        const [c, h] = herPick();
        addRun(
          c,
          h,
          'her',
          'tried ' + c + '% at ' + HEAT[h][0].toLowerCase() + ' heat. close to the best one',
        );
      },
      notes: notes.map((n) => ({
        t: n.t,
        s:
          n.by === 'her'
            ? 'font-family: Caveat, cursive; font-size: 21px; font-weight: 700; color: #5B3D62; line-height: 28px;'
            : 'font-size: 13.5px; font-weight: 700; line-height: 28px;',
      })),
      draft,
      typing: (e) => this.setState({ draft: e.target.value }),
      addNote: () => {
        if (draft.trim()) this.setState({ notes: notes.concat([{ by: 'you', t: draft.trim() }]), draft: '' });
      },
      canSubmit: !submitted,
      submitted,
      submit: () => this.setState({ submitted: true }),
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
            href="Work.dc.html"
            aria-label="Back to Work"
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
              Notebook
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              Kora Labs project · Chemistry
            </span>
          </div>

          <svg width="40" height="44" viewBox="0 0 64 58" aria-hidden="true">
            <rect
              x="10"
              y="4"
              width="40"
              height="50"
              rx="4"
              fill="#2F3E5C"
              stroke="#2A2522"
              strokeWidth="3.5"
            />

            <rect
              x="16"
              y="4"
              width="34"
              height="50"
              rx="3"
              fill="#FFFDF8"
              stroke="#2A2522"
              strokeWidth="3"
            />

            <path
              d="M30 14 V22 L23 36 Q22 40 26 40 H40 Q44 40 43 36 L36 22 V14"
              fill="#E3F0DF"
              stroke="#2A2522"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        </header>

        <div
          className="nb-scroll"
          style={{
            flex: '1',
            minHeight: '0',
            overflowY: 'auto',
            padding: '6px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Project */}

          <section
            aria-label="Project"
            style={{
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#2F6B5F',
              color: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '19px',
                fontWeight: '700',
                lineHeight: '1.15',
              }}
            >
              What makes the new alloy strongest?
            </span>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  fontWeight: '800',
                  background: '#FFFDF8',
                  color: '#2A2522',
                  border: '2px solid #2A2522',
                  borderRadius: '999px',
                  padding: '0 8px',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="5"
                    y="11"
                    width="14"
                    height="10"
                    rx="2"
                    fill="#F2CE6E"
                    stroke="#2A2522"
                    strokeWidth="2.6"
                  />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" fill="none" stroke="#2A2522" strokeWidth="2.6" />
                </svg>
                Company notes
              </span>

              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  background: '#FFFDF8',
                  color: '#2A2522',
                  border: '2px solid #2A2522',
                  borderRadius: '999px',
                  padding: '0 8px',
                }}
              >
                {vals.runsLeft} runs left · 1 lab hour each
              </span>
            </div>

            <div
              role="status"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#24524A',
                border: '2px solid #2A2522',
                borderRadius: '12px',
                padding: '6px 10px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 3 h12 M6 21 h12 M7 3 c0 6 10 6 10 9 c0 3 -10 3 -10 9 M17 3 c0 6 -10 6 -10 9 c0 3 10 3 10 9"
                  fill="none"
                  stroke="#F2CE6E"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span style={{ flex: '1', fontSize: '13px', fontWeight: '800' }}>
                Big batch: 30% copper, high heat
              </span>

              <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#F2CE6E' }}>back at 9 pm</span>
            </div>
          </section>

          {/* Experiment card: set inputs, run */}

          <section
            aria-label="Next run"
            style={{
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
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
              Next run
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '13px',
                  fontWeight: '800',
                }}
              >
                <span>Copper</span>
                <span>{vals.cu}%</span>
              </div>

              <div role="radiogroup" aria-label="Copper percent" style={{ display: 'flex', gap: '4px' }}>
                {vals.cuSteps.map((c, $index) => (
                  <button
                    key={$index}
                    type="button"
                    role="radio"
                    aria-checked={c.on}
                    aria-label={`${c.v} percent`}
                    onClick={c.go}
                    style={css(c.s)}
                  >
                    {c.v}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800' }}>Heat</span>

              <div role="radiogroup" aria-label="Heat" style={{ display: 'flex', gap: '6px' }}>
                {vals.heats.map((h, $index) => (
                  <button
                    key={$index}
                    type="button"
                    role="radio"
                    aria-checked={h.on}
                    onClick={h.go}
                    style={css(h.s)}
                  >
                    <svg width="14" height="16" viewBox="0 0 20 24" aria-hidden="true">
                      <path
                        d="M10 2 C14 8 17 11 17 15 A7 7 0 0 1 3 15 C3 11 6 9 8 5 C9 8 10 9 11 9 C11 6 10 4 10 2 Z"
                        fill={h.fill}
                        stroke="#2A2522"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            {vals.tested ? (
              <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#8E4129' }}>
                Already run · result {vals.testedS}
              </span>
            ) : null}

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={vals.run} style={css(vals.runStyle)}>
                Run · 1 lab hour
              </button>

              <button
                type="button"
                onClick={vals.handOff}
                style={{
                  all: 'unset',
                  flex: '1',
                  height: '44px',
                  boxSizing: 'border-box',
                  borderRadius: '999px',
                  background: '#FFFDF8',
                  border: '3px dashed #2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Hand Off
              </button>
            </div>
          </section>

          {/* Results: chart and table, logged automatically */}

          <section
            aria-label="Results"
            style={{
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  flex: '1',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '17px',
                  fontWeight: '600',
                }}
              >
                Results
              </span>

              <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#5E564D' }}>
                logged by the lab
              </span>
            </div>

            <div
              role="img"
              aria-label="Chart of strength against copper percent"
              style={{
                position: 'relative',
                height: '128px',
                marginLeft: '22px',
                borderLeft: '2.5px solid #2A2522',
                borderBottom: '2.5px solid #2A2522',
                background: 'repeating-linear-gradient(0deg, transparent 0 31px, #EFE6D7 31px 32px)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: '-24px',
                  top: '-2px',
                  fontSize: '10px',
                  fontWeight: '800',
                  color: '#5E564D',
                }}
              >
                75
              </span>{' '}
              <span
                style={{
                  position: 'absolute',
                  left: '-24px',
                  bottom: '-2px',
                  fontSize: '10px',
                  fontWeight: '800',
                  color: '#5E564D',
                }}
              >
                35
              </span>{' '}
              <span
                style={{
                  position: 'absolute',
                  left: '0',
                  bottom: '-17px',
                  fontSize: '10px',
                  fontWeight: '800',
                  color: '#5E564D',
                }}
              >
                0%
              </span>{' '}
              <span
                style={{
                  position: 'absolute',
                  right: '0',
                  bottom: '-17px',
                  fontSize: '10px',
                  fontWeight: '800',
                  color: '#5E564D',
                }}
              >
                60% copper
              </span>{' '}
              {vals.points.map((p, $index) => (
                <span key={$index} title={p.t} style={css(p.s)} />
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                marginTop: '10px',
                fontSize: '11.5px',
                fontWeight: '800',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    border: '2px solid #2A2522',
                    background: '#9DB8E0',
                  }}
                />
                Low heat
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    border: '2px solid #2A2522',
                    background: '#F2CE6E',
                  }}
                />
                Medium
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    border: '2px solid #2A2522',
                    background: '#C8553D',
                  }}
                />
                High
              </span>
            </div>

            <div
              role="table"
              aria-label="Runs"
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid #2A2522',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <div
                role="row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '34px 1fr 1fr 1fr 28px',
                  gap: '4px',
                  padding: '4px 8px',
                  background: '#EFE4CF',
                  fontSize: '11.5px',
                  fontWeight: '800',
                }}
              >
                <span>#</span>
                <span>Copper</span>
                <span>Heat</span>
                <span>Strength</span>
                <span />
              </div>

              {vals.rows.map((r, $index) => (
                <div key={$index} role="row" style={css(r.s)}>
                  <span>{r.n}</span>
                  <span>{r.cu}%</span>
                  <span>{r.heat}</span>
                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: '700' }}>{r.v}</span>

                  <span style={css(r.who)}>
                    {r.byYou ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M4 20 l3 -1 l12 -12 a2 2 0 0 0 -3 -3 l-12 12 z"
                          fill="#FFFDF8"
                          stroke="#2A2522"
                          strokeWidth="3"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}

                    {r.byHer ? (
                      <svg width="12" height="12" viewBox="0 0 40 40" aria-hidden="true">
                        <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                        <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                        <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                      </svg>
                    ) : null}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Hypothesis builder */}

          <section
            aria-label="Hypothesis"
            style={{
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#FDE3C8',
              boxShadow: '4px 5px 0 #2A2522',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '600' }}>
              Hypothesis
            </span>

            <div style={{ fontSize: '14.5px', fontWeight: '700', lineHeight: '1.9' }}>
              Strength peaks near{' '}
              <span style={{ display: 'inline-flex', gap: '3px', verticalAlign: 'middle' }}>
                {vals.hCu.map((o, $index) => (
                  <button key={$index} type="button" onClick={o.go} style={css(o.s)}>
                    <span>{o.v}</span>%
                  </button>
                ))}
              </span>{' '}
              copper, and{' '}
              <span style={{ display: 'inline-flex', gap: '3px', verticalAlign: 'middle' }}>
                {vals.hHeat.map((o, $index) => (
                  <button key={$index} type="button" onClick={o.go} style={css(o.s)}>
                    {o.v}
                  </button>
                ))}
              </span>{' '}
              heat is best.
            </div>

            {vals.canSubmit ? (
              <button
                type="button"
                onClick={vals.submit}
                style={{
                  all: 'unset',
                  alignSelf: 'flex-start',
                  height: '42px',
                  padding: '0 16px',
                  boxSizing: 'border-box',
                  borderRadius: '999px',
                  background: vals.accent,
                  border: '3px solid #2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Submit to Kora Labs
              </button>
            ) : null}

            {vals.submitted ? (
              <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#2E4A3B' }}>
                Submitted · scored against the principle when the big batch lands
              </span>
            ) : null}
          </section>

          {/* Notes: yours and hers */}

          <section
            aria-label="Notes"
            style={{
              border: '3px solid #2A2522',
              borderRadius: '20px',
              background: '#FFFDF8',
              boxShadow: '4px 5px 0 #2A2522',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '10px 14px 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  flex: '1',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '17px',
                  fontWeight: '600',
                }}
              >
                Notes
              </span>

              <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#5E564D' }}>
                can't be sold or stolen
              </span>
            </div>

            <div
              style={{
                padding: '4px 14px 10px 30px',
                background: 'repeating-linear-gradient(180deg, transparent 0 27px, #DCE6F2 27px 28px)',
                borderLeft: '3px solid #F2B8AE',
                marginLeft: '14px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {vals.notes.map((n, $index) => (
                <span key={$index} style={css(n.s)}>
                  {n.t}
                </span>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '6px',
                padding: '8px 10px 10px',
                borderTop: '2px dashed #EFE6D7',
              }}
            >
              <input
                type="text"
                aria-label="Add a note"
                placeholder="Add a note…"
                value={vals.draft}
                onChange={vals.typing}
                style={{
                  flex: '1',
                  minWidth: '0',
                  height: '38px',
                  boxSizing: 'border-box',
                  border: '2.5px solid #2A2522',
                  borderRadius: '999px',
                  background: '#F5EFE5',
                  padding: '0 12px',
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#2A2522',
                  outline: 'none',
                }}
              />

              <button
                type="button"
                aria-label="Save note"
                onClick={vals.addNote}
                style={{
                  all: 'unset',
                  width: '38px',
                  height: '38px',
                  flex: 'none',
                  boxSizing: 'border-box',
                  border: '2.5px solid #2A2522',
                  borderRadius: '50%',
                  background: vals.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12 l5 5 l9 -10" />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
