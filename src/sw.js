/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable import-x/no-extraneous-dependencies */

import { precacheAndRoute } from 'workbox-precaching';

// Workbox จะแทรกรายการไฟล์ที่ถูก Precache ที่บรรทัดนี้
precacheAndRoute(self.__WB_MANIFEST || []);

// ** โค้ดสำหรับ รับ Push Notification **
self.addEventListener('push', (event) => {
  const data = event.data.json();

  const title = data.title || 'New Notification';
  const options = {
    body: data.body || 'You have a new message.',
    icon: data.icon || '/pwa-192x192.png',
    badge: data.badge || '/badge.png',
    data: { url: data.url || '/' }, // ใช้สำหรับเปิด URL เมื่อคลิก
  };

  event.waitUntil(
    self.clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then((clientList) => {
        // ตรวจสอบว่ามี Client ที่ Active หรือไม่ และหยุดการทำงานทันทีที่พบ
        const appIsVisible = clientList.some((client) => {
          if (client.visibilityState === 'visible') {
            client.postMessage({ type: 'PUSH_RECEIVED', payload: data });
            return true; // ส่งค่า true เพื่อหยุดการทำงานของ .some()
          }
          return false;
        });

        // ถ้าไม่มีหน้าต่างไหนกำลังเปิดอยู่ (หรือเปิดอยู่แต่ถูกย่อ/ซ่อน) ให้แสดง System Notification
        if (!appIsVisible) {
          return self.registration.showNotification(title, options);
        }

        return Promise.resolve(); // ไม่ต้องแสดง Notification ซ้ำ)
      })
  );
});

// ** โค้ดเมื่อผู้ใช้คลิก Notification **
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data.url;

  event.waitUntil(
    // โค้ดนี้จะเน้นไปที่การเปิดหน้าต่างที่เหมาะสม
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        const client = windowClients.find(
          (c) => c.url.includes(targetUrl) && 'focus' in c
        );

        if (client) {
          // ถ้าหน้าต่างเป้าหมายเปิดอยู่ ให้ focus
          return client.focus();
        }
        // ถ้ายังไม่เปิด ให้เปิดหน้าใหม่
        return clients.openWindow(targetUrl);
      })
  );
});
