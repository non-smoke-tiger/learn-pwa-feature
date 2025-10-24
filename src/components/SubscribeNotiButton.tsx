import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckRounded from '@mui/icons-material/CheckRounded';
import BlockRounded from '@mui/icons-material/BlockRounded';
import NotificationsActiveRounded from '@mui/icons-material/NotificationsActiveRounded';

// สมมติว่า subscribeUser เป็นฟังก์ชันที่คุณสร้างไว้
declare function subscribeUser(): void;

function SubscribeNotiButton() {
  // 💡 State สำหรับเก็บสถานะการอนุญาต
  const [permissionStatus, setPermissionStatus] = useState(
    Notification.permission
  );

  // 1. ตรวจสอบสิทธิ์เมื่อ Component ถูก Mount
  useEffect(() => {
    // กำหนดสถานะเริ่มต้นจาก API
    setPermissionStatus(Notification.permission);
  }, []);

  // 2. ฟังก์ชันที่เรียกเมื่อผู้ใช้คลิก
  const handleSubscriptionClick = async () => {
    // 💡 การเรียก requestPermission ต้องอยู่ใน User Gesture
    const result = await Notification.requestPermission();

    // อัปเดตสถานะทันทีหลังจากขอสิทธิ์
    setPermissionStatus(result);

    // ถ้าอนุญาตแล้ว ค่อยดำเนินการ Subscribe
    if (result === 'granted') {
      subscribeUser();
    }
  };

  // 3. แสดงผลตามสถานะ
  const renderButton = () => {
    if (!('Notification' in window)) {
      // เบราว์เซอร์ไม่รองรับ Notification
      return <p>เบราว์เซอร์ไม่รองรับการแจ้งเตือน</p>;
    }

    if (permissionStatus === 'granted') {
      // 💡 สถานะ 'granted': ซ่อนปุ่ม
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

  return <div>{renderButton()}</div>;
}

export default SubscribeNotiButton;
