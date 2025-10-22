import { createTheme } from '@mui/material/styles';
import getTypography from './typography';
import palette from './palette';
import components from './components';
import shape from './shape';

// สร้าง theme โดยใช้ createTheme และ responsiveFontSizes
const baseTheme = createTheme({
  palette: { ...palette, mode: 'dark' },
  typography: {
    fontFamily: '"Prompt", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components,
  shape,
});

// กำหนด typography ด้วยการเรียกใช้ฟังก์ชัน getTypography และส่ง theme ที่สร้างไว้แล้วเข้าไป
const darkTheme = createTheme(baseTheme);
darkTheme.typography = getTypography(darkTheme, 1);

export default darkTheme;
