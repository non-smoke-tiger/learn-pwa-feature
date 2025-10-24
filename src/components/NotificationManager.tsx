import { useEffect } from 'react';
import { closeSnackbar, useSnackbar } from 'notistack';
import Button from '@mui/material/Button';

/** Push notification payload */
interface PushPayload {
  title: string;
  body: string;
  url?: string;
}

// ฟังก์ชันสำหรับนำทาง
const handleNavigate = (key: string | number, url?: string) => {
  closeSnackbar(key); // ปิด Snackbar นั้นทันที
  if (url) {
    window.open(url, '_blank');
  }
};
// ฟังก์ชันที่สร้าง Custom JSX/Component
const createPushAlertContent = (payload: PushPayload) =>
  function contentsOut(key: string | number) {
    // ถ้าไม่มี URL ก็ไม่ต้องแสดงปุ่ม
    if (!payload.url) return null;

    return (
      <Button
        key="action-button" // ควรมี key เพื่อความเสถียร
        onClick={(e) => {
          e.stopPropagation(); // ป้องกันการปิดเมื่อคลิกปุ่ม
          handleNavigate(key, payload.url);
        }}
        style={{
          color: 'white',
          background: 'transparent',
          border: 'none',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
      >
        View Details
      </Button>
    );
  };

function NotificationManager() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let cleanupFn: (() => void) | undefined;

    if ('serviceWorker' in navigator) {
      const messageListener = (event: MessageEvent) => {
        // ตรวจสอบ Type ที่ส่งมาจาก Service Worker
        if (event.data?.type === 'PUSH_RECEIVED') {
          const payload: PushPayload = event.data.payload;

          // เรียกใช้ฟังก์ชัน Wrapper ที่สร้างไว้ด้านนอก
          const actionCreator = createPushAlertContent(payload);

          // เรียกใช้ enqueueSnackbar เพื่อแสดง Notification ใหม่
          enqueueSnackbar(
            `${payload.title}${payload.body ? `: ${payload.body}` : ``}`,
            {
              variant: 'warning',
              // กำหนดระยะเวลาซ่อนอัตโนมัติ (5 วินาที)
              autoHideDuration: 5000,
              // เพิ่ม Action/Button สำหรับนำทาง
              action: actionCreator,
            }
          );
        }
      };

      // เพิ่ม Event Listener เข้าไป
      navigator.serviceWorker.addEventListener('message', messageListener);

      // Cleanup function
      cleanupFn = () => {
        navigator.serviceWorker.removeEventListener('message', messageListener);
      };
    }
    // ถ้า 'serviceWorker' ไม่มีค่าจะคืนค่า undefined
    return cleanupFn;
  }, [enqueueSnackbar]);

  return null; // Component นี้มีหน้าที่แค่แสดงผลผ่าน notistack จึงไม่คืนค่า UI
}

export default NotificationManager;
