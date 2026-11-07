// Take to court
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class TakeToCourt extends Screen {
  static title = 'Take to court';

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

    const kind = this.state.kind ?? 'debt';
    const amt = this.state.amt ?? 15;
    const ev = this.state.ev ?? { bank: true, promise: true, today: true };
    const filed = this.state.filed ?? null; // 'you' | 'her'
    const K = [
      ['debt', 'Unpaid debt'],
      ['gig', 'Unfinished gig'],
      ['deal', 'Broken deal'],
      ['noise', 'Noise'],
      ['words', 'Defamation'],
    ];
    const kinds = K.map(([key, name]) => ({
      name,
      on: key === kind,
      pick: () => this.setState({ kind: key }),
      s: chipStyle(key === kind),
    }));
    const E = [
      ['bank', 'You lent Chidi 15', 'Bank record · week 5'],
      ['promise', 'Chidi: “Back by Friday, I promise”', 'Messages · week 5'],
      ['today', 'Chidi: “Next week, my sister”', 'Messages · today'],
    ];
    const evidence = E.map(([key, what, src]) => {
      const on = !!ev[key];
      return {
        what,
        src,
        on,
        toggle: () => this.setState({ ev: { ...ev, [key]: !on } }),
        s:
          'all: unset; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 14px; background: ' +
          (on ? '#FBEBC4' : '#FFFDF8') +
          '; padding: 8px 11px; display: flex; align-items: center; gap: 10px; cursor: pointer;',
        box:
          'width: 24px; height: 24px; flex: none; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 7px; display: flex; align-items: center; justify-content: center; background: ' +
          (on ? accent : '#FFFDF8') +
          ';',
        tick: on ? '' : 'display: none;',
      };
    });
    const n = Object.values(ev).filter(Boolean).length;
    const kindName = K.find(([k]) => k === kind)[1].toLowerCase();
    return {
      accent,
      kinds,
      evidence,
      amt: String(amt),
      less: () => this.setState({ amt: Math.max(1, amt - 1) }),
      more: () => this.setState({ amt: Math.min(500, amt + 1) }),
      open: !filed,
      done: !!filed,
      summary:
        'Chidi · ' + kindName + ' · ' + amt + ' · ' + n + ' piece' + (n === 1 ? '' : 's') + ' of evidence',
      file: () => this.setState({ filed: 'you' }),
      handOff: () => this.setState({ filed: 'her' }),
      fileStyle: btn(accent, false),
      handStyle: btn('#EFE4CF', true),
      fBadge: badge(filed || 'you', 34),
      fPath: filed === 'her' ? FACE : PEN,
      fNote:
        filed === 'her'
          ? 'Amara didn’t file. “He said next week. I’ll give him till Friday.”'
          : filed
            ? 'Filed as Case 17. Chidi has 3 days to answer.'
            : '',
      fUndo: () => this.setState({ filed: null }),
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
              Take to court
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '700', color: '#5E564D' }}>
              File a claim · it goes on the record
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
            padding: '2px 20px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <section
            aria-label="Against"
            style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '7px' }}
          >
            <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '.04em', color: '#5E564D' }}>
              1 · AGAINST
            </span>

            <div
              style={{
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '18px',
                background: '#FFFDF8',
                boxShadow: '3px 4px 0 #2A2522',
                padding: '9px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span
                style={{
                  width: '42px',
                  height: '42px',
                  flex: 'none',
                  boxSizing: 'border-box',
                  border: '2.5px solid #2A2522',
                  borderRadius: '50%',
                  background: '#CFE3F4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: '700',
                }}
              >
                C
              </span>

              <span style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '17px', fontWeight: '700' }}>
                  Chidi
                </span>

                <span style={{ fontSize: '12px', fontWeight: '800', color: '#5E564D' }}>
                  Your esusu circle · trust 3 of 5
                </span>
              </span>

              <span style={{ fontSize: '12.5px', fontWeight: '800', textDecoration: 'underline' }}>
                Change
              </span>
            </div>
          </section>

          <section
            aria-label="What happened"
            style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '7px' }}
          >
            <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '.04em', color: '#5E564D' }}>
              2 · WHAT HAPPENED
            </span>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {vals.kinds.map((k, $index) => (
                <button key={$index} type="button" aria-pressed={k.on} onClick={k.pick} style={css(k.s)}>
                  {k.name}
                </button>
              ))}
            </div>
          </section>

          <section
            aria-label="Amount"
            style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <span
              style={{
                flex: '1',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '.04em',
                color: '#5E564D',
              }}
            >
              3 · YOU'RE OWED
            </span>

            <button
              type="button"
              aria-label="Less"
              onClick={vals.less}
              style={{
                all: 'unset',
                width: '34px',
                height: '34px',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '10px',
                background: '#FFFDF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '20px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              −
            </button>

            <span
              style={{
                minWidth: '54px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '22px',
                fontWeight: '700',
              }}
            >
              <svg width="12" height="18" viewBox="0 0 30 40" aria-hidden="true">
                <path
                  d="M4 8 H26 L4 32 H26 M15 2 V38"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {vals.amt}
            </span>

            <button
              type="button"
              aria-label="More"
              onClick={vals.more}
              style={{
                all: 'unset',
                width: '34px',
                height: '34px',
                boxSizing: 'border-box',
                border: '2.5px solid #2A2522',
                borderRadius: '10px',
                background: '#FFFDF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '20px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              +
            </button>
          </section>

          <section
            aria-label="Evidence"
            style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '7px' }}
          >
            <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '.04em', color: '#5E564D' }}>
              4 · EVIDENCE FOUND ON THE RECORD
            </span>

            {vals.evidence.map((e, $index) => (
              <button
                key={$index}
                type="button"
                role="checkbox"
                aria-checked={e.on}
                onClick={e.toggle}
                style={css(e.s)}
              >
                <span style={css(e.box)}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2A2522"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={css(e.tick)}
                  >
                    <path d="M5 12 L10 17 L19 7" />
                  </svg>
                </span>

                <span style={{ flex: '1', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: '700', lineHeight: '1.3' }}>{e.what}</span>

                  <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#5E564D' }}>{e.src}</span>
                </span>
              </button>
            ))}
          </section>

          <div
            style={{
              flex: 'none',
              boxSizing: 'border-box',
              border: '2.5px dashed #2A2522',
              borderRadius: '16px',
              background: '#CFE3F4',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ flex: '1', fontSize: '12.5px', fontWeight: '700', lineHeight: '1.35' }}>
              Most claims settle faster with a settler. A settler costs 4; filing in court costs 5.
            </span>

            <ScreenLink
              href="Settlers.dc.html"
              style={{
                flex: 'none',
                height: '32px',
                boxSizing: 'border-box',
                padding: '0 12px',
                border: '2.5px solid #2A2522',
                borderRadius: '999px',
                background: '#FFFDF8',
                display: 'flex',
                alignItems: 'center',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '13.5px',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              Ask a settler
            </ScreenLink>
          </div>
        </div>

        <section
          aria-live="polite"
          aria-label="File"
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
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '15.5px', fontWeight: '700' }}>
                {vals.summary}
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" onClick={vals.file} style={css(vals.fileStyle)}>
                  File · 5
                </button>

                <button type="button" onClick={vals.handOff} style={css(vals.handStyle)}>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2A2522"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 12 H15 M11 7 L16 12 L11 17 M19 5 V19" />
                  </svg>
                  Hand Off
                </button>
              </div>
            </>
          ) : null}

          {vals.done ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={css(vals.fBadge)}>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2A2522"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={vals.fPath} />
                </svg>
              </span>

              <span style={{ flex: '1', fontSize: '13.5px', fontWeight: '700', lineHeight: '1.35' }}>
                {vals.fNote}
              </span>

              <button
                type="button"
                onClick={vals.fUndo}
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
