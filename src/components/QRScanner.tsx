import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { Html5Qrcode, type Html5QrcodeResult } from 'html5-qrcode';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import QrCodeScannerRounded from '@mui/icons-material/QrCodeScannerRounded';

// Handle Type
export interface CustomScannerHandle {
  stop: () => void;
  start: () => void;
}

interface ScannerProps {
  onDetected: (code: string, result: Html5QrcodeResult) => void;
  onCameraError: (error: string) => void;
  // eslint-disable-next-line react/require-default-props
  qrboxSize?: number;
}

/**
 * QR Code Scanner
 * ใช้ forwardRef เพื่อให้เรียกเมธอด stop/start ได้
 * @param onDetected - เมื่อ scan พบข้อมูล
 * @param onCameraError - เมื่อเกิดข้อผิดพลาด
 * @param qrboxSize - ขนาดของ QR Scan box
 */
const QRScanner = forwardRef<CustomScannerHandle, ScannerProps>(
  ({ onDetected, onCameraError, qrboxSize = 250 }, ref) => {
    const mountId = 'qr-scanner-mount';
    const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [permissionError, setPermissionError] = useState<string | null>(null);

    /** หยุดการ Scan */
    const stopScanner = useCallback(async () => {
      const scanner = html5QrcodeRef.current;
      if (scanner?.isScanning) {
        try {
          await scanner.stop();
          setIsScanning(false);
          setIsLoading(false);
        } catch (error) {
          // console.error('Error stopping scanner:', error);
          onCameraError(`Failed to stop scanner gracefully. - ${error}`);
        }
      }
    }, [onCameraError]);

    /** เริ่ม Scan */
    const startScanner = useCallback(async () => {
      const scanner = html5QrcodeRef.current;
      if (!scanner || isScanning) return;

      setPermissionError(null);
      setIsLoading(true);

      try {
        await scanner.start(
          { facingMode: 'environment' }, // ใช้กล้องหลัง/หลัก
          { fps: 10, qrbox: { width: qrboxSize, height: qrboxSize } },
          (decodedText, decodedResult) => {
            stopScanner(); // หยุดกล้องทันทีที่สแกนเสร็จ
            onDetected(decodedText, decodedResult);
          },
          () => {} // ไม่ทำอะไรกับ error message ของการสแกนปกติ
          // (err) => {
          //   console.warn('warning scan noting:', err);
          // }
        );
        setIsScanning(true);
      } catch (err) {
        let errMsg: string;
        // ตรวจสอบว่า 'err' เป็น Error Object มาตรฐานหรือไม่
        if (err instanceof Error) {
          errMsg = err.message;
        } else if (typeof err === 'string') {
          errMsg = err;
        } else {
          errMsg = 'Unknown camera error';
        }
        setPermissionError(errMsg);
        onCameraError(errMsg);
      } finally {
        setIsLoading(false);
      }
    }, [isScanning, onCameraError, onDetected, qrboxSize, stopScanner]);

    // 3. 💡 เปิดเผยเมธอด Start/Stop ให้ Component แม่เรียกใช้
    useImperativeHandle(
      ref,
      () => ({
        start: startScanner,
        stop: stopScanner,
      }),
      [startScanner, stopScanner]
    );

    // 4. useEffect: สร้าง Html5Qrcode Instance และ Cleanup
    useEffect(() => {
      // สร้าง Instance
      html5QrcodeRef.current ??= new Html5Qrcode(mountId);

      // Cleanup function: จะถูกเรียกเมื่อ Component ถูก Unmount เท่านั้น
      return () => {
        stopScanner(); // หยุดกล้องเมื่อ Component ถูกถอด
      };
    }, [stopScanner]);

    // --- Render UI ---
    if (permissionError) {
      return (
        <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
          <Typography variant="h6">Error: ไม่สามารถเข้าถึงกล้อง</Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        {/* Video Feed */}
        <Box
          id={mountId}
          sx={{
            width: '100%',
            minHeight: 300,
            display: isScanning || isLoading ? 'block' : 'none',
            // minHeight: isScanning ? 300 : 0,
          }}
        />

        {/* UI Overlay */}
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.7)',
            }}
          >
            <CircularProgress sx={{ color: 'white' }} />
            <Typography variant="body1" sx={{ ml: 2, color: 'white' }}>
              กำลังขอสิทธิ์กล้อง...
            </Typography>
          </Box>
        )}

        {/* Button */}
        {!isScanning && !isLoading && (
          <Box sx={{ minHeight: 300, display: 'flex', alignItems: 'center' }}>
            <Button
              variant="outlined"
              onClick={startScanner}
              startIcon={<QrCodeScannerRounded />}
            >
              เริ่มสแกน
            </Button>
          </Box>
        )}

        {/* <Box sx={{ mt: 2 }}>
          {!isScanning && !isLoading ? (
            <Button variant="contained" onClick={startScanner}>
              เริ่มสแกน QR Code
            </Button>
          ) : (
            <Button variant="outlined" onClick={stopScanner} color="error">
              หยุดการสแกน
            </Button>
          )}
        </Box> */}
      </Box>
    );
  }
);

export default QRScanner;
