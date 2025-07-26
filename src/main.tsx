import type { ReactElement } from 'react';
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ConfigProvider, theme } from 'antd';

function withSWUpdateHandling(AppComponent: React.FC) {
  return function WithSW() {
    useEffect(() => {
      if (!('serviceWorker' in navigator)) return;

      navigator.serviceWorker
        .register('./sw.js')
        .then((reg) => {
          console.log('SW registered:', reg.scope);

          // Слушаем, когда появился новый SW в installing → installed (waiting)
          reg.addEventListener('updatefound', () => {
            const newSW = reg.installing;
            if (!newSW) return;

            newSW.addEventListener('statechange', () => {
              if (
                newSW.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                // Предлагаем SW пропустить waiting
                newSW.postMessage({ type: 'SKIP_WAITING' });
              }
            });
          });
        })
        .catch((err) => console.error('SW registration failed:', err));

      // Слушаем сообщение от активированного SW
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_ACTIVATED') {
          // Авто-перезагрузка страницы под новым SW
          window.location.reload();
        }
      });
    }, []);

    return <AppComponent />;
  };
}

const RootApp = withSWUpdateHandling(App);

const app = (
  <StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <RootApp />
    </ConfigProvider>
  </StrictMode>
) as ReactElement;

createRoot(document.getElementById('root')!).render(app);
