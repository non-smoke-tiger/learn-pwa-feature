import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  // หากหา Element ที่ชื่อ 'root' ไม่เจอ ให้แจ้ง Error ใน Console ทันที
  throw new Error(
    'Root element not found in the DOM. Check your index.html file.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
