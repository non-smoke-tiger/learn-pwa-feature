import { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { th } from 'date-fns/locale';
// ตัวช่วยลงทะเบียนของ vite-plugin-pwa
// eslint-disable-next-line import-x/no-unresolved
import { registerSW } from 'virtual:pwa-register';

import CssBaseline from '@mui/material/CssBaseline';

import TemplateContent from './components/TemplateContent';
import { AppThemeProvider } from './AppThemeContext';
import NotificationManager from './components/NotificationManager';

import './App.css';

function App() {
  useEffect(() => {
    // 1. ลงทะเบียน Service Worker ก่อน (ถ้าใช้ registerSW ก็เรียกตรงนี้)
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
      registerSW();
      console.log('Service Worker registered via PWA helper.');
    } else if ('serviceWorker' in navigator) {
      // สำหรับโหมด dev ให้ลงทะเบียนด้วยตนเองตามที่แก้ไขในขั้นตอนก่อนหน้า
      // โดยใช้ type: 'module'
      navigator.serviceWorker
        .register('/dev-sw.js?dev-sw', { type: 'module' })
        .then(() => console.log('Service Worker registered in DEV mode.'))
        .catch((err) => console.error('SW registration failed:', err));
    }
  }, []);

  return (
    <AppThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <NotificationManager />
          <TemplateContent />
        </SnackbarProvider>
      </LocalizationProvider>
    </AppThemeProvider>
  );
}

export default App;
