import { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import PhoneFrame from './components/PhoneFrame.jsx';
import { screens } from './routes.js';
import { DEFAULT_ACCENT } from './lib/theme.js';

function ScreenRoute({ screen }) {
  const [params] = useSearchParams();
  const { pathname, search } = useLocation();
  const { Component } = screen;
  useEffect(() => {
    document.title = screen.path === '/' ? 'Residents' : `${screen.title} · Residents`;
  }, [screen]);
  return (
    <PhoneFrame>
      {/* Keyed by URL so each visit starts from the screen's initial state. */}
      <Component key={pathname + search} accent={DEFAULT_ACCENT} {...Object.fromEntries(params)} />
    </PhoneFrame>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PhoneFrame />}>
      <Routes>
        {screens.map((s) => (
          <Route key={s.path} path={s.path} element={<ScreenRoute screen={s} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
