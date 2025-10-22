import { createTheme } from '@mui/material/styles';
import { red, common } from '@mui/material/colors';
import getTypography from './typography';
import components from './components';
import shape from './shape';

// สร้าง theme โดยใช้ createTheme และ responsiveFontSizes
const baseTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFF00',
      contrastText: common.black,
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: common.black,
    },
    background: {
      default: common.black,
      paper: common.black,
    },
    text: {
      primary: '#FFFF00',
      secondary: '#E0E0E0',
    },
    error: {
      main: red[500],
      contrastText: common.white,
    },
    warning: {
      main: '#FFA000',
      contrastText: common.black,
    },
    info: {
      main: '#2e90f1ff',
      contrastText: common.white,
    },
    success: {
      main: '#4CAF50',
      contrastText: common.white,
    },

    /** คำนวณสีข้อความที่เหมาะสมโดยอัตโนมัติ */
    getContrastText: (color) => {
      // สำหรับสีที่เข้ม ให้ใช้ข้อความสีขาว
      if (color === common.black || color === '#000000') {
        return common.white;
      }
      return common.black;
    },
  },

  typography: {
    fontFamily: '"Prompt", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    ...components,
    MuiButton: {
      ...components.MuiButton,
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: 'grey !important',
            borderColor: 'grey !important',
            backgroundColor: `${common.black} !important`,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            color: 'grey !important',
            borderColor: 'grey !important',
            backgroundColor: `${common.black} !important`,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: 'grey !important',
            borderColor: 'grey !important',
            backgroundColor: `${common.black} !important`,
          },
        },
      },
    },
  },
  shape,
});

// กำหนด typography ด้วยการเรียกใช้ฟังก์ชัน getTypography และส่ง theme ที่สร้างไว้แล้วเข้าไป
const contrastTheme = createTheme(baseTheme);
contrastTheme.typography = getTypography(contrastTheme, 1);

export default contrastTheme;
