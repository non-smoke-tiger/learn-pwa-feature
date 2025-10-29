import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckRounded from '@mui/icons-material/CheckRounded';
import BlockRounded from '@mui/icons-material/BlockRounded';
import NotificationsActiveRounded from '@mui/icons-material/NotificationsActiveRounded';

// YOUR_VAPID_PUBLIC_KEY_HERE (เปลี่ยนเป็นคีย์ของตัวเอง)
const VAPID_PUBLIC_KEY =
  'BMw6oYLX-4ldFlLrSY_bzeKHQfPhJiRWa-wwPyPVRSHlLwZ5mWcTnEst6S3XtiHw7Z2Wd5mnyaIgWuLK39eUYqI';

/** แปลง Base64 URL Safe string ให้เป็น Uint8Array */
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    // eslint-disable-next-line no-useless-escape
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/** สำหรับสร้าง Logic การสมัครรับ Push */
const subscribeUser = async () => {
  const registration = await navigator.serviceWorker.ready;

  // ตรวจสอบ Subscription เดิม
  let subscription = await registration.pushManager.getSubscription();

  const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);

  subscription ??= await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });

  // ส่ง Subscription ไปยังเซิร์ฟเวอร์
  // await sendSubscriptionToServer(subscription); // demo
};

/** status ที่กำหนดใหม่เพื่อตรวจสอบการรองรับ */
type NotiStatus = NotificationPermission | 'unsupported' | '';

/** ปุ่มสำหรับลงทะเบียนรับ Push Notification */
function SubscribeNotiButton() {
  // State สำหรับเก็บสถานะการอนุญาต
  const [permissionStatus, setPermissionStatus] = useState<NotiStatus>('');

  // 1. ตรวจสอบสิทธิ์เมื่อ Component ถูก Mount
  useEffect(() => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    } else {
      // แจ้งสถานะเบราว์เซอร์ที่ไม่รองรับ
      setPermissionStatus('unsupported');
    }
  }, []);

  /** เปิดรับการแจ้งเตือน */
  const handleSubscriptionClick = async () => {
    if ('Notification' in window) {
      // เรียก requestPermission ด้วย User Gesture
      const result = await Notification.requestPermission();

      // อัปเดตสถานะทันทีหลังจากขอสิทธิ์
      setPermissionStatus(result);

      // ถ้าอนุญาตแล้ว ค่อยดำเนินการ Subscribe
      if (result === 'granted') {
        subscribeUser();
      }
    }
  };

  /** แสดง UI ตามสถานะ */
  const renderUI = () => {
    if (permissionStatus === 'unsupported') {
      // ไม่รองรับ Notification
      return (
        <Box
          sx={{
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'error.main',
            gap: 1,
          }}
        >
          <BlockRounded fontSize="small" />
          <Typography variant="body1">
            เบราว์เซอร์ไม่รองรับการแจ้งเตือน{' '}
          </Typography>
        </Box>
      );
    }

    if (permissionStatus === 'granted') {
      // สถานะ 'granted' ได้รับสิทธิ์ Notification แล้ว
      return (
        <Box
          sx={{
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'success.main',
            gap: 1,
          }}
        >
          <CheckRounded fontSize="small" />
          <Typography variant="body1">
            เปิดรับการแจ้งเตือนเรียบร้อยแล้ว
          </Typography>
        </Box>
      );
    }

    if (permissionStatus === 'denied') {
      // สถานะ 'denied': แจ้งให้ผู้ใช้เปลี่ยนการตั้งค่าด้วยตนเอง
      return (
        <Box
          sx={{
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'error.main',
            gap: 1,
          }}
        >
          <BlockRounded fontSize="small" />
          <Typography variant="body1">
            คุณบล็อกการแจ้งเตือน กรุณาเปลี่ยนการตั้งค่าในเบราว์เซอร์
          </Typography>
        </Box>
      );
    }

    return (
      <Button
        variant="contained"
        startIcon={<NotificationsActiveRounded />}
        onClick={handleSubscriptionClick}
      >
        เปิดรับการแจ้งเตือน
      </Button>
    );
  };

  return renderUI();
}

export default SubscribeNotiButton;
