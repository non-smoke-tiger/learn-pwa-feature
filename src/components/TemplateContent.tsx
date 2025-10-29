import { useRef, useState } from 'react';
import { useSnackbar } from 'notistack';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FormControlLabel from '@mui/material/FormControlLabel';

import ButtonGroup from '@mui/material/ButtonGroup';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';

import LightModeRounded from '@mui/icons-material/LightModeRounded';
import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';
import ContrastRounded from '@mui/icons-material/ContrastRounded';

import { useAppTheme } from '../AppThemeContext';

import reactLogo from '../assets/react.svg';
import muiLogo from '../assets/mui.svg';
import viteLogo from '../assets/vite.svg';
import SubscribeNotiButton from './SubscribeNotiButton';
import QRScanner, { type CustomScannerHandle } from './QRScanner';

function TemplateContent() {
  // ดึง state และ helper functions จาก Context
  const { state, changeTextSize, changeColorMode, toggleContrastMode } =
    useAppTheme();

  const { colorMode, textSize, contrastMode } = state;

  // --- count ทดสอบ HMR ---
  const [count, setCount] = useState(0);

  // ---- QR CODE Scanner -----
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const scannerRef = useRef<CustomScannerHandle>(null);

  const { enqueueSnackbar } = useSnackbar();

  /** Handle ปิด scanner */
  const handleCloseScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop(); // สั่งหยุดกล้องผ่าน Ref
    }
    // Unmount Component
    setIsScannerOpen(false);
  };

  /** Handle เมื่อ scan พบข้อมูล */
  const handleDetected = (code: string) => {
    setScanResult(code);
    // ใช้ enqueueSnackbar เพื่อแสดง Notification
    enqueueSnackbar(`Content detected`, {
      variant: 'success',
      autoHideDuration: 2000,
    });
    // Unmount Component
    setIsScannerOpen(false);
  };

  /** Handle camera error */
  const handleCameraError = (error: string) => {
    // ใช้ enqueueSnackbar เพื่อแสดง Notification
    enqueueSnackbar(`Global Camera Error : ${error}`, {
      variant: 'error',
      autoHideDuration: 3000,
    });
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          mb: 4,
          gap: 4,
        }}
      >
        <Link href="https://vite.dev" target="_blank" rel="noreferrer">
          <Box
            component="img"
            src={viteLogo}
            alt="Vite logo"
            className="logo"
          />
        </Link>
        <Link href="https://react.dev" target="_blank" rel="noreferrer">
          <Box
            component="img"
            src={reactLogo}
            alt="React logo"
            className="logo react"
          />
        </Link>
        <Link
          href="https://v5.mui.com/material-ui/getting-started/"
          target="_blank"
          rel="noreferrer"
        >
          <Box
            component="img"
            src={muiLogo}
            alt="MUI logo"
            className="logo mui"
          />
        </Link>
      </Box>
      <Typography variant="h4">
        Vite 7 (RollDown) + React 19 (React Compiler) + MUI 5
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          my: 2,
        }}
      >
        <Button variant="contained" onClick={() => setCount(count + 1)}>
          count is {count}
        </Button>
        <Typography variant="body1">
          Edit <code>src/App.tsx</code> and save to test HMR
        </Typography>
      </Box>
      <Typography variant="body1" className="read-the-docs">
        Click on the Vite React and MUI logos to learn more
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          my: 2,
        }}
      >
        <ButtonGroup color={contrastMode ? 'primary' : 'info'}>
          <Button
            variant="outlined"
            disabled={contrastMode}
            tabIndex={-1}
            sx={{ pointerEvents: 'none' }}
          >
            Color Mode
          </Button>
          <Button
            variant={
              colorMode === 'light' && !contrastMode ? 'contained' : 'outlined'
            }
            disabled={contrastMode}
            onClick={() => changeColorMode('light')}
            title="Light Mode"
          >
            <LightModeRounded />
          </Button>
          <Button
            variant={
              colorMode === 'dark' && !contrastMode ? 'contained' : 'outlined'
            }
            disabled={contrastMode}
            onClick={() => changeColorMode('dark')}
            title="Dark Mode"
          >
            <DarkModeRounded />
          </Button>
          <Button
            variant={
              colorMode === 'system' && !contrastMode ? 'contained' : 'outlined'
            }
            disabled={contrastMode}
            onClick={() => changeColorMode('system')}
            title="System"
          >
            <SettingsRounded />
          </Button>
        </ButtonGroup>

        <ButtonGroup color={contrastMode ? 'primary' : 'info'}>
          <Button
            variant="outlined"
            tabIndex={-1}
            sx={{ pointerEvents: 'none' }}
          >
            Font Size
          </Button>
          <Button
            variant={textSize === 'normal' ? 'contained' : 'outlined'}
            onClick={() => changeTextSize('normal')}
            title="100%"
          >
            <Typography sx={{ fontSize: '1rem!important' }}>A</Typography>
          </Button>
          <Button
            variant={textSize === 'large' ? 'contained' : 'outlined'}
            onClick={() => changeTextSize('large')}
            title="150%"
          >
            <Typography
              sx={{
                fontSize: '1.5rem!important',
                lineHeight: '1',
              }}
            >
              A
            </Typography>
          </Button>
          <Button
            variant={textSize === 'larger' ? 'contained' : 'outlined'}
            onClick={() => changeTextSize('larger')}
            title="200%"
          >
            <Typography
              sx={{
                fontSize: '2rem!important',
                lineHeight: '1',
              }}
            >
              A
            </Typography>
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <ContrastRounded color="primary" />
        <Typography variant="caption" color="primary">
          Contrast Color
        </Typography>
        <FormControlLabel
          label=""
          control={
            <Switch
              aria-label="Contrast Color"
              checked={contrastMode}
              onChange={toggleContrastMode}
            />
          }
        />
      </Box>

      {/* NOTIFICATION */}
      <Box sx={{ my: 2 }}>
        <SubscribeNotiButton />
      </Box>

      {/* SCAN QR CODE */}
      <Box sx={{ my: 2 }}>
        {scanResult && (
          <Typography variant="h6" color="success.main">
            สแกนสำเร็จ: {scanResult}
          </Typography>
        )}
        {!isScannerOpen ? (
          <Button
            variant="contained"
            onClick={() => {
              setScanResult('');
              setIsScannerOpen(true);
            }}
            sx={{ mt: 2 }}
          >
            สแกนข้อมูลจาก QR Code
          </Button>
        ) : (
          <Paper
            sx={{
              border: 1,
              borderColor: 'grey.300',
              p: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'justify',
                width: '100%',
                gap: 1,
              }}
            >
              {/* Conditional Rendering เพื่อ Mount Component */}
              <QRScanner
                ref={scannerRef} // ส่ง Ref เข้าไป
                onDetected={handleDetected}
                onCameraError={handleCameraError}
              />
              {/* ปุ่มปิดที่จะถูกเรียกในกรณีที่ผู้ใช้ต้องการปิดโดยไม่สแกน */}
              <Button
                onClick={handleCloseScanner}
                color="error"
                variant="outlined"
                title="ปิด Scanner"
                size="small"
              >
                ยกเลิก
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default TemplateContent;
