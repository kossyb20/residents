import { Component } from 'react';

/**
 * Base class for every screen. A screen keeps its UI state in `this.state`,
 * derives everything the markup needs in `renderVals()`, and renders from
 * that snapshot. Props: `accent` (theme accent) plus any query-string params.
 */
export class Screen extends Component {
  state = {};
}

const cache = new Map();

function splitDecls(str) {
  const out = [];
  let depth = 0;
  let quote = null;
  let cur = '';
  for (const ch of str) {
    if (quote) {
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === '(') {
      depth++;
    } else if (ch === ')') {
      depth--;
    } else if (ch === ';' && depth === 0) {
      out.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out;
}

const toKey = (prop) => {
  if (prop.startsWith('--')) return prop;
  const p = prop.startsWith('-') ? prop.slice(1).replace(/^[a-z]/, (c) => c.toUpperCase()) : prop;
  return p.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
};

/** Turns a CSS declaration string ("display: flex; gap: 4px") into a React style object. */
export function css(str) {
  if (!str) return undefined;
  let style = cache.get(str);
  if (style) return style;
  style = {};
  for (const decl of splitDecls(str)) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (prop && value) style[toKey(prop)] = value;
  }
  if (cache.size > 2000) cache.clear();
  cache.set(str, style);
  return style;
}
