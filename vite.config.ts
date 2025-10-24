import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    VitePWA({
      // PUSH setup
      // เปลี่ยนจาก 'generateSW' เป็น 'injectManifest'
      strategies: 'injectManifest',
      srcDir: 'src', // โฟลเดอร์ที่มีไฟล์ Service Worker ต้นฉบับ
      filename: 'sw.js', // ชื่อไฟล์ Service Worker ที่คุณจะเขียนเอง

      // 1. ตั้งค่าพื้นฐานสำหรับ PWA
      registerType: 'autoUpdate', // หรือ 'prompt'
      injectRegister: 'auto',

      // 2. กำหนดค่า Service Worker (Workbox)
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        // สามารถเพิ่ม runtime caching สำหรับ API calls หรือรูปภาพภายนอกได้ที่นี่
        runtimeCaching: [
          // แคช Google Fonts (ใช้ CacheFirst เพราะไม่ค่อยเปลี่ยน)
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }, // 1 ปี
            },
          },
          // แคช API ที่สำคัญ
          // {
          //   urlPattern: /^(?:https|http):\/\/api\.yourapp\.com\/api\/.*/i,
          //   handler: 'StaleWhileRevalidate',
          //   options: {
          //     cacheName: 'api-data-cache',
          //     expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 }, // 24 ชั่วโมง
          //   },
          // },
        ],
      },

      // 3. กำหนดไฟล์ Manifest (สำคัญสำหรับ PWA)
      manifest: {
        name: 'My Awesome React App',
        short_name: 'ReactPWA',
        description: 'A sample React PWA with Vite',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'vite.svg',
            sizes: '48x48 72x72 96x96 128x128 256x256 512x512',
            type: 'image/svg+xml',
          },
          // เตรียมไฟล์ไอคอนไว้ในโฟลเดอร์ public
        ],
      },

      // 4. การจัดการไฟล์ Service Worker
      devOptions: {
        enabled: true, // เปิดใช้งาน Service Worker ในโหมด Dev (สะดวกในการทดสอบ)
      },
    }),
  ],
  server: {
    open: true,
  },
});
