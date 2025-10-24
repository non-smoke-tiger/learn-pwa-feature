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
  async function subscribeUser() {
    // 1. ตรวจสอบว่าเบราว์เซอร์รองรับ Service Worker หรือไม่
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.error(
        'Service Workers or Push Manager are not supported in this browser.'
      );
      return;
    }

    // 2. ขออนุญาตส่ง Notification 🔔
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      // ถ้าผู้ใช้ปฏิเสธ (denied) หรือเพิกเฉย (default), จะหยุดทำงาน
      console.warn(
        'Notification permission was not granted. Cannot subscribe.'
      );

      // 💡 อาจส่งสัญญาณไปที่ UI เพื่อบอกผู้ใช้ว่าต้องอนุญาต
      return;
    }

    // 3. ลงทะเบียน Service Worker และ Push Manager
    const registration = await navigator.serviceWorker.ready;

    // 4. ตรวจสอบสถานะปัจจุบันของ Subscription
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      // สถานะ: เคย Subscribe แล้ว (ไม่ต้องทำซ้ำ)
      console.log('Already subscribed:', JSON.stringify(subscription));
      // **ส่ง subscription นี้ไปที่ Server เพื่อยืนยันว่ายัง Active**
    }

    // // 5. สร้าง Subscription ใหม่ (เพราะได้รับอนุญาตแล้ว และยังไม่เคย Subscribe)
    // try {
    //   subscription = await registration.pushManager.subscribe({
    //     userVisibleOnly: true, // ต้องเปิดเสมอ
    //     applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY', // <<< คีย์สาธารณะ VAPID
    //   });

    //   console.log('New subscription created:', JSON.stringify(subscription));
    //   // **ส่ง subscription ใหม่นี้ไปที่ Server เพื่อบันทึก**
    // } catch (e) {
    //   // มักเกิดจาก VAPID Key ผิดพลาด หรือปัญหาเครือข่าย
    //   console.error('Subscription failed:', e);
    // }
  }

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
    // เรียกใช้ฟังก์ชันเมื่อ Component ถูก Mount ครั้งแรกเท่านั้น
    subscribeUser();
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
        </SnackbarProvider>
        <TemplateContent />
      </LocalizationProvider>
    </AppThemeProvider>
  );
}

export default App;
