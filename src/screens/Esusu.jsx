// Esusu
import { Screen, css } from '../lib/screen.js';
import ScreenLink from '../components/ScreenLink.jsx';

export default class Esusu extends Screen {
  static title = 'Esusu';

  renderVals() {
    const accent = this.props.accent ?? '#E8B53A';
    const pay = this.state.pay ?? 'due';
    const amaraPaid = pay !== 'due';
    const pos = [
      [145, 12],
      [247, 71],
      [247, 189],
      [145, 248],
      [43, 189],
      [43, 71],
    ];
    const list = [
      { name: 'Kemi', frame: '#F7D6D6', skin: '#A8714A', style: 'wrap', status: 'paid', collected: true },
      { name: 'Zainab', frame: '#E3F0DF', skin: '#8B5A3C', style: 'puffs', status: 'paid', collected: true },
      { name: 'Chidi', frame: '#CFE3F4', skin: '#7A4A2E', style: 'short', status: 'paid', current: true },
      { name: 'Tunde', frame: '#F7D6D6', skin: '#5A3520', style: 'short', status: 'missed' },
      {
        name: 'You',
        frame: '#FDE3C8',
        skin: '#7A4A2E',
        style: 'puffs',
        status: amaraPaid ? 'paid' : 'wait',
        you: true,
      },
      { name: 'Mama Ngozi', frame: '#FDE3C8', skin: '#6B4027', style: 'wrap', status: 'paid' },
    ];
    const members = list.map((m, k) => {
      const p = pos[k];
      return {
        name: m.name,
        order: String(k + 1),
        label:
          m.name +
          ', turn ' +
          (k + 1) +
          ', ' +
          (m.status === 'paid' ? 'paid' : m.status === 'missed' ? 'missed this round' : 'waiting to pay') +
          (m.current ? ', gets the pot this round' : '') +
          (m.collected ? ', has collected' : ''),
        pos:
          'position: absolute; left: ' +
          p[0] +
          'px; top: ' +
          p[1] +
          'px; width: 60px; display: flex; flex-direction: column; align-items: center; gap: 2px;',
        ring: m.current ? accent : 'transparent',
        frame: m.frame,
        skin: m.skin,
        puffs: m.style === 'puffs' ? '1' : '0',
        hair: m.style === 'wrap' ? '0' : '1',
        wrap: m.style === 'wrap' ? '1' : '0',
        isPaid: m.status === 'paid',
        isWait: m.status === 'wait',
        isMissed: m.status === 'missed',
        orderStyle:
          'position: absolute; left: -6px; top: -4px; width: 22px; height: 22px; box-sizing: border-box; border: 2px solid #2A2522; border-radius: 50%; background: ' +
          (m.collected ? '#F2CE6E' : '#FFFDF8') +
          '; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 12px; font-weight: 700;',
        nameStyle:
          'font-family: Fredoka, sans-serif; font-size: 12.5px; font-weight: 600; white-space: nowrap;' +
          (m.you
            ? ' background: #FDE3C8; border: 2px solid #2A2522; border-radius: 999px; padding: 0 7px;'
            : '') +
          (m.current
            ? ' background: ' + accent + '; border: 2px solid #2A2522; border-radius: 999px; padding: 0 7px;'
            : ''),
      };
    });
    const view = this.state.view ?? 'now';
    const isNow = view === 'now',
      isHist = view === 'hist';
    const tab = (on) =>
      'all: unset; flex: 1; box-sizing: border-box; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: Fredoka, sans-serif; font-size: 15px; font-weight: 600; cursor: pointer;' +
      (on
        ? ' background: ' + accent + '; border: 2.5px solid #2A2522;'
        : ' border: 2.5px solid transparent;');
    // Each round: status per member in ring order (Kemi, Zainab, Chidi, Tunde, You, Mama Ngozi)
    const S = {
      paid: ['#8FC1A9', '✓', 'paid'],
      late: ['#F2CE6E', '!', 'paid late'],
      missed: ['#C8553D', '✕', 'missed'],
      wait: ['#F7D6D6', '…', 'not paid yet'],
    };
    const history = [
      {
        n: 3,
        to: 2,
        when: 'Friday · in progress',
        st: ['paid', 'paid', 'paid', 'missed', amaraPaid ? 'paid' : 'wait', 'paid'],
        pot: amaraPaid ? '250' : '200',
        live: true,
      },
      { n: 2, to: 1, when: 'Cycle 13', st: ['paid', 'paid', 'paid', 'late', 'paid', 'paid'], pot: '300' },
      { n: 1, to: 0, when: 'Cycle 12', st: ['paid', 'paid', 'paid', 'paid', 'paid', 'paid'], pot: '300' },
    ];
    const rounds = history.map((h) => {
      const rec = list[h.to];
      return {
        n: String(h.n),
        who: (h.live ? 'To ' : '') + rec.name,
        when: h.when,
        pot: h.live ? h.pot + '/300' : h.pot,
        label:
          'Round ' +
          h.n +
          ', pot ' +
          (h.live ? 'so far ' : '') +
          h.pot +
          ' ZAE to ' +
          rec.name +
          '. ' +
          h.st.map((s, k) => list[k].name + ' ' + S[s][2]).join(', '),
        frame: rec.frame,
        skin: rec.skin,
        puffs: rec.style === 'puffs' ? '1' : '0',
        hair: rec.style === 'wrap' ? '0' : '1',
        wrap: rec.style === 'wrap' ? '1' : '0',
        badge: h.live ? accent : '#F2CE6E',
        card:
          'box-sizing: border-box; border: 3px solid #2A2522; border-radius: 18px; background: #FFFDF8; box-shadow: 3px 4px 0 #2A2522; padding: 10px 12px; display: flex; flex-direction: column; gap: 10px;' +
          (h.live ? ' outline: 3px solid ' + accent + '; outline-offset: 2px;' : ''),
        potStyle:
          'flex: none; display: flex; align-items: center; gap: 2px; font-family: Fredoka, sans-serif; font-size: 15px; font-weight: 700; border: 2.5px solid #2A2522; border-radius: 999px; padding: 1px 9px; background: ' +
          (h.live ? '#F5EFE5' : '#F2CE6E') +
          ';',
        members: h.st.map((s, k) => ({
          name: list[k].you ? 'You' : list[k].name.split(' ')[0],
          mark: S[s][1],
          title: list[k].name + ': ' + S[s][2],
          dot:
            'width: 26px; height: 26px; box-sizing: border-box; border: 2.5px solid #2A2522; border-radius: 50%; background: ' +
            S[s][0] +
            '; display: flex; align-items: center; justify-content: center; font-family: Fredoka, sans-serif; font-size: 13px; font-weight: 700; color: ' +
            (s === 'missed' ? '#FFFDF8' : '#2A2522') +
            ';' +
            (k === h.to ? ' box-shadow: 0 0 0 3px #F2CE6E;' : ''),
          nameStyle:
            'font-size: 11px; font-weight: 800; white-space: nowrap; color: ' +
            (list[k].you ? '#2A2522' : '#5E564D') +
            ';' +
            (list[k].you ? ' background: #FDE3C8; border-radius: 999px; padding: 0 5px;' : ''),
        })),
      };
    });
    return {
      accent,
      isNow,
      isHist,
      nowTab: tab(isNow),
      histTab: tab(isHist),
      showNow: () => this.setState({ view: 'now' }),
      showHist: () => this.setState({ view: 'hist' }),
      rounds,
      putIn: String(amaraPaid ? 150 : 100),
      members,
      potIn: amaraPaid ? '250' : '200',
      toPay: !amaraPaid,
      paid: amaraPaid,
      paidText: pay === 'handed' ? 'Amara paid 50 ZAE' : 'You paid 50 ZAE',
      byYou: pay !== 'handed',
      byHer: pay === 'handed',
      paidTag:
        pay === 'handed'
          ? 'font-size: 12px; font-weight: 700; background: #EFE4CF; border: 2px dashed #2A2522; border-radius: 999px; padding: 0 8px;'
          : 'font-size: 12px; font-weight: 700; background: #CFE3F4; border: 2px solid #2A2522; border-radius: 999px; padding: 0 8px;',
      pay: () => this.setState({ pay: 'you' }),
      handOff: () => this.setState({ pay: 'handed' }),
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
            href="Money.dc.html"
            aria-label="Back to Money"
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
              Floor 4 esusu
            </h1>

            <span style={{ fontSize: '14px', fontWeight: '600', color: '#5E564D' }}>
              6 members · 50 ZAE a round
            </span>
          </div>

          <span
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '15px',
              fontWeight: '600',
              background: '#2F3E5C',
              color: '#FFFDF8',
              border: '3px solid #2A2522',
              borderRadius: '999px',
              padding: '4px 12px',
              boxShadow: '3px 4px 0 #2A2522',
            }}
          >
            3 / 6
          </span>
        </header>

        <div
          role="tablist"
          aria-label="Esusu view"
          style={{
            margin: '2px 20px 4px',
            height: '46px',
            flex: 'none',
            boxSizing: 'border-box',
            border: '3px solid #2A2522',
            borderRadius: '999px',
            background: '#FFFDF8',
            boxShadow: '3px 4px 0 #2A2522',
            display: 'flex',
            padding: '4px',
            gap: '4px',
          }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={vals.isNow}
            onClick={vals.showNow}
            style={css(vals.nowTab)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="#2A2522"
                strokeWidth="2.4"
                strokeDasharray="4 3"
              />
              <circle cx="12" cy="12" r="4" fill="#8E4129" stroke="#2A2522" strokeWidth="2" />
            </svg>
            This round
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={vals.isHist}
            onClick={vals.showHist}
            style={css(vals.histTab)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="#FFFDF8" stroke="#2A2522" strokeWidth="2.4" />
              <path d="M12 7 v5 l3 2" fill="none" stroke="#2A2522" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            History
          </button>
        </div>

        {vals.isNow ? (
          <>
            <section
              aria-label="Payout order"
              style={{
                position: 'relative',
                width: '350px',
                height: '330px',
                margin: '4px 20px 0',
                flex: 'none',
              }}
            >
              <svg
                width="350"
                height="330"
                viewBox="0 0 350 330"
                aria-hidden="true"
                style={{ position: 'absolute', left: '0', top: '0' }}
              >
                <circle
                  cx="175"
                  cy="160"
                  r="118"
                  fill="#EFE5D2"
                  stroke="#2A2522"
                  strokeWidth="3"
                  strokeDasharray="10 8"
                />

                <circle cx="175" cy="160" r="70" fill="#FFFDF8" stroke="#2A2522" strokeWidth="3" />
              </svg>{' '}
              <svg
                width="84"
                height="72"
                viewBox="0 0 84 72"
                role="img"
                aria-label="The pot"
                style={{ position: 'absolute', left: '133px', top: '104px' }}
              >
                <ellipse cx="30" cy="12" rx="9" ry="4" fill="#F2CE6E" stroke="#2A2522" strokeWidth="2" />

                <ellipse cx="46" cy="8" rx="9" ry="4" fill="#F2CE6E" stroke="#2A2522" strokeWidth="2" />

                <ellipse cx="56" cy="15" rx="9" ry="4" fill="#E8B53A" stroke="#2A2522" strokeWidth="2" />

                <path
                  d="M18 22 h48 c0 4 -3 6 -6 7 c10 6 16 16 16 26 c0 10 -14 15 -34 15 c-20 0 -34 -5 -34 -15 c0 -10 6 -20 16 -26 c-3 -1 -6 -3 -6 -7 z"
                  fill="#8E4129"
                  stroke="#2A2522"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />

                <path
                  d="M14 46 c14 6 42 6 56 0"
                  fill="none"
                  stroke="#F2CE6E"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>{' '}
              <div
                style={{
                  position: 'absolute',
                  left: '105px',
                  top: '180px',
                  width: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '22px',
                    fontWeight: '700',
                    lineHeight: '1',
                  }}
                >
                  <svg width="13" height="18" viewBox="0 0 30 40" aria-hidden="true">
                    <path
                      d="M4 8 H26 L4 32 H26"
                      fill="none"
                      stroke="#2A2522"
                      strokeWidth="5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path d="M15 2 V38" fill="none" stroke="#2A2522" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                  {vals.potIn}
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#5E564D' }}>/300</span>
                </span>

                <span style={{ fontSize: '12px', fontWeight: '700', color: '#5E564D' }}>
                  to Chidi on Friday
                </span>
              </div>
              {vals.members.map((m, $index) => (
                <div key={$index} style={css(m.pos)}>
                  <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                    <svg width="60" height="60" viewBox="0 0 52 52" role="img" aria-label={m.label}>
                      <circle cx="26" cy="26" r="24" fill="none" stroke={m.ring} strokeWidth="4" />

                      <rect
                        x="6"
                        y="6"
                        width="40"
                        height="40"
                        rx="13"
                        fill={m.frame}
                        stroke="#2A2522"
                        strokeWidth="2.5"
                      />

                      <circle cx="17" cy="15" r="5" fill="#2A2522" opacity={m.puffs} />

                      <circle cx="35" cy="15" r="5" fill="#2A2522" opacity={m.puffs} />

                      <circle cx="26" cy="29" r="12" fill={m.skin} stroke="#2A2522" strokeWidth="2.5" />

                      <path
                        d="M14 27 C14 18 19 16 26 16 C33 16 38 18 38 27 C35 22 31 21 26 21 C21 21 17 22 14 27 Z"
                        fill="#2A2522"
                        opacity={m.hair}
                      />

                      <path
                        d="M13 24 C13 14 20 12 26 12 C32 12 39 14 39 24 C36 20 32 19 26 19 C20 19 16 20 13 24 Z"
                        fill="#C8553D"
                        stroke="#2A2522"
                        strokeWidth="2"
                        opacity={m.wrap}
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
                    </svg>{' '}
                    <span style={css(m.orderStyle)}>{m.order}</span>{' '}
                    {m.isPaid ? (
                      <span
                        style={{
                          position: 'absolute',
                          right: '-6px',
                          bottom: '-4px',
                          width: '22px',
                          height: '22px',
                          boxSizing: 'border-box',
                          border: '2px solid #2A2522',
                          borderRadius: '50%',
                          background: '#8FC1A9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M5 12 l5 5 l9 -10"
                            fill="none"
                            stroke="#2A2522"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    ) : null}
                    {m.isWait ? (
                      <span
                        style={{
                          position: 'absolute',
                          right: '-6px',
                          bottom: '-4px',
                          width: '22px',
                          height: '22px',
                          boxSizing: 'border-box',
                          border: '2px solid #2A2522',
                          borderRadius: '50%',
                          background: '#F7D6D6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M6 3 h12 M6 21 h12 M7 3 c0 6 10 6 10 9 c0 3 -10 3 -10 9 M17 3 c0 6 -10 6 -10 9 c0 3 10 3 10 9"
                            fill="none"
                            stroke="#2A2522"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    ) : null}
                    {m.isMissed ? (
                      <span
                        style={{
                          position: 'absolute',
                          right: '-6px',
                          bottom: '-4px',
                          width: '22px',
                          height: '22px',
                          boxSizing: 'border-box',
                          border: '2px solid #2A2522',
                          borderRadius: '50%',
                          background: '#C8553D',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFDF8',
                          fontFamily: "'Fredoka', sans-serif",
                          fontSize: '14px',
                          fontWeight: '700',
                        }}
                      >
                        !
                      </span>
                    ) : null}
                  </div>

                  <span style={css(m.nameStyle)}>{m.name}</span>
                </div>
              ))}
            </section>

            <div
              aria-label="Key"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '14px',
                padding: '6px 20px 0',
                fontSize: '12px',
                fontWeight: '700',
                color: '#4A433B',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: '2px solid #2A2522',
                    background: '#8FC1A9',
                  }}
                />
                Paid
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: '2px solid #2A2522',
                    background: '#F7D6D6',
                  }}
                />
                Waiting
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: '2px solid #2A2522',
                    background: '#C8553D',
                  }}
                />
                Missed
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: '2px solid #2A2522',
                    background: '#F2CE6E',
                  }}
                />
                Collected
              </span>
            </div>

            <section
              style={{
                margin: '14px 20px 0',
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
              {vals.toPay ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '19px', fontWeight: '600' }}
                    >
                      Your 50 ZAE
                    </span>

                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        background: '#F7D6D6',
                        border: '2px solid #2A2522',
                        borderRadius: '999px',
                        padding: '0 9px',
                      }}
                    >
                      due Fri
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={vals.pay}
                      style={{
                        all: 'unset',
                        flex: '1',
                        height: '46px',
                        boxSizing: 'border-box',
                        borderRadius: '999px',
                        background: vals.accent,
                        border: '3px solid #2A2522',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '17px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Pay now
                    </button>

                    <button
                      type="button"
                      onClick={vals.handOff}
                      style={{
                        all: 'unset',
                        flex: '1',
                        height: '46px',
                        boxSizing: 'border-box',
                        borderRadius: '999px',
                        background: '#FFFDF8',
                        border: '3px dashed #2A2522',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '17px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Hand Off
                    </button>
                  </div>
                </>
              ) : null}

              {vals.paid ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '19px', fontWeight: '600' }}
                    >
                      {vals.paidText}
                    </span>

                    {vals.byYou ? (
                      <span
                        role="img"
                        aria-label="You decided"
                        title="You decided"
                        style={{
                          width: '28px',
                          height: '28px',
                          boxSizing: 'border-box',
                          border: '2px solid #2A2522',
                          borderRadius: '50%',
                          background: '#CFE3F4',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M4 20 l3 -1 l12 -12 a2 2 0 0 0 -3 -3 l-12 12 z"
                            fill="#FFFDF8"
                            stroke="#2A2522"
                            strokeWidth="2.4"
                            strokeLinejoin="round"
                          />
                          <path d="M14 6 l4 4" stroke="#2A2522" strokeWidth="2.4" />
                        </svg>
                      </span>
                    ) : null}

                    {vals.byHer ? (
                      <span
                        role="img"
                        aria-label="On her own"
                        title="On her own"
                        style={{
                          width: '28px',
                          height: '28px',
                          boxSizing: 'border-box',
                          border: '2px dashed #2A2522',
                          borderRadius: '50%',
                          background: '#EFE4CF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 40 40" aria-hidden="true">
                          <circle cx="11" cy="9" r="5.5" fill="#2A2522" />
                          <circle cx="29" cy="9" r="5.5" fill="#2A2522" />
                          <circle cx="20" cy="22" r="12" fill="#7A4A2E" stroke="#2A2522" strokeWidth="2.5" />
                          <path
                            d="M8 21 C8 13 13 10 20 10 C27 10 32 13 32 21 C29 16 25 15 20 15 C15 15 11 16 8 21 Z"
                            fill="#2A2522"
                          />
                        </svg>
                      </span>
                    ) : null}
                  </div>

                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#4A433B' }}>
                    Your turn for the pot: round 5
                  </span>
                </>
              ) : null}
            </section>

            <ScreenLink
              href="Home.dc.html"
              style={{
                margin: '12px 20px 0',
                height: '52px',
                boxSizing: 'border-box',
                border: '3px solid #2A2522',
                borderRadius: '18px',
                background: '#8E4129',
                color: '#FFFDF8',
                boxShadow: '4px 5px 0 #2A2522',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0 14px',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  width: '26px',
                  height: '26px',
                  flex: 'none',
                  boxSizing: 'border-box',
                  border: '2px solid #2A2522',
                  borderRadius: '50%',
                  background: '#F2CE6E',
                  color: '#2A2522',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '15px',
                  fontWeight: '700',
                }}
              >
                !
              </span>

              <span
                style={{
                  flex: '1',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                Tunde missed this round
              </span>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F2CE6E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </ScreenLink>
          </>
        ) : null}

        {/* HISTORY: every round so far */}

        {vals.isHist ? (
          <>
            <section
              aria-label="Your esusu so far"
              style={{
                margin: '12px 20px 0',
                flex: 'none',
                border: '3px solid #2A2522',
                borderRadius: '20px',
                background: '#2F3E5C',
                color: '#FFFDF8',
                boxShadow: '4px 5px 0 #2A2522',
                padding: '10px 12px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '.05em', opacity: '.8' }}>
                  YOU PUT IN
                </span>

                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '24px',
                    fontWeight: '700',
                    lineHeight: '1',
                  }}
                >
                  <svg width="12" height="16" viewBox="0 0 30 40" aria-hidden="true">
                    <path
                      d="M4 8 H26 L4 32 H26"
                      fill="none"
                      stroke="#FFFDF8"
                      strokeWidth="5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path d="M15 2 V38" fill="none" stroke="#FFFDF8" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                  {vals.putIn}
                </span>
              </div>

              <span
                style={{
                  width: '3px',
                  height: '38px',
                  borderRadius: '2px',
                  background: '#FFFDF8',
                  opacity: '.25',
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '.05em', opacity: '.8' }}>
                  YOUR POT
                </span>

                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '24px',
                    fontWeight: '700',
                    lineHeight: '1',
                    color: '#F2CE6E',
                  }}
                >
                  <svg width="12" height="16" viewBox="0 0 30 40" aria-hidden="true">
                    <path
                      d="M4 8 H26 L4 32 H26"
                      fill="none"
                      stroke="#F2CE6E"
                      strokeWidth="5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path d="M15 2 V38" fill="none" stroke="#F2CE6E" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                  300
                </span>
              </div>

              <span
                style={{
                  width: '3px',
                  height: '38px',
                  borderRadius: '2px',
                  background: '#FFFDF8',
                  opacity: '.25',
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '.05em', opacity: '.8' }}>
                  ARRIVES
                </span>

                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '20px',
                    fontWeight: '700',
                    lineHeight: '1.2',
                  }}
                >
                  Round 5
                </span>
              </div>
            </section>

            <ul
              aria-label="Rounds"
              style={{
                listStyle: 'none',
                margin: '14px 0 0',
                padding: '0 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {vals.rounds.map((r, $index) => (
                <li key={$index} aria-label={r.label} style={css(r.card)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        width: '34px',
                        height: '34px',
                        flex: 'none',
                        boxSizing: 'border-box',
                        border: '2.5px solid #2A2522',
                        borderRadius: '50%',
                        background: r.badge,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '16px',
                        fontWeight: '700',
                      }}
                    >
                      {r.n}
                    </span>

                    <svg width="38" height="38" viewBox="0 0 52 52" aria-hidden="true">
                      <rect
                        x="4"
                        y="4"
                        width="44"
                        height="44"
                        rx="14"
                        fill={r.frame}
                        stroke="#2A2522"
                        strokeWidth="2.5"
                      />

                      <circle cx="17" cy="14" r="5" fill="#2A2522" opacity={r.puffs} />

                      <circle cx="35" cy="14" r="5" fill="#2A2522" opacity={r.puffs} />

                      <circle cx="26" cy="29" r="12" fill={r.skin} stroke="#2A2522" strokeWidth="2.5" />

                      <path
                        d="M14 27 C14 18 19 16 26 16 C33 16 38 18 38 27 C35 22 31 21 26 21 C21 21 17 22 14 27 Z"
                        fill="#2A2522"
                        opacity={r.hair}
                      />

                      <path
                        d="M13 24 C13 14 20 12 26 12 C32 12 39 14 39 24 C36 20 32 19 26 19 C20 19 16 20 13 24 Z"
                        fill="#C8553D"
                        stroke="#2A2522"
                        strokeWidth="2"
                        opacity={r.wrap}
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

                    <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          fontFamily: "'Fredoka', sans-serif",
                          fontSize: '16px',
                          fontWeight: '600',
                          lineHeight: '1.15',
                        }}
                      >
                        {r.who}
                      </span>

                      <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#5E564D' }}>
                        {r.when}
                      </span>
                    </div>

                    <span style={css(r.potStyle)}>
                      <svg width="8" height="11" viewBox="0 0 30 40" aria-hidden="true">
                        <path
                          d="M4 8 H26 L4 32 H26"
                          fill="none"
                          stroke="#2A2522"
                          strokeWidth="5"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <path
                          d="M15 2 V38"
                          fill="none"
                          stroke="#2A2522"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </svg>
                      {r.pot}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2px' }}>
                    {r.members.map((m, $index) => (
                      <div
                        key={$index}
                        title={m.title}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '3px',
                          width: '46px',
                        }}
                      >
                        <span style={css(m.dot)}>{m.mark}</span>

                        <span style={css(m.nameStyle)}>{m.name}</span>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            <div
              aria-label="Key"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '14px',
                padding: '14px 20px 0',
                fontSize: '12px',
                fontWeight: '700',
                color: '#4A433B',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: '2px solid #2A2522',
                    background: '#8FC1A9',
                  }}
                />
                Paid
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: '2px solid #2A2522',
                    background: '#F2CE6E',
                  }}
                />
                Late
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: '2px solid #2A2522',
                    background: '#C8553D',
                  }}
                />
                Missed
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: '2px solid #2A2522',
                    background: '#F7D6D6',
                  }}
                />
                Waiting
              </span>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}
