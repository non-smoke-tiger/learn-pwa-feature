import {
  useReducer,
  type Dispatch,
  useMemo,
  useCallback,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { createTheme, ThemeProvider, type Theme } from '@mui/material/styles';

import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// Theme set
import theme from './theme';
import darkTheme from './theme/darkTheme';
import contrastTheme from './theme/contrastTheme';
import getTypography from './theme/typography';

// --- Types and Constants --- //
/** Color Mode */
type ColorMode = 'system' | 'light' | 'dark';
/** Text size */
type TextSize = 'normal' | 'large' | 'larger';
/** Text scale factors */
const textScales = {
  normal: 1.0,
  large: 1.5,
  larger: 2,
};

// --- Reducer Definitions --- //
/** Combined State Interface */
interface AppThemeState {
  colorMode: ColorMode;
  textSize: TextSize;
  contrastMode: boolean;
}

/** Initial State */
const initialAppState: AppThemeState = {
  colorMode: 'system',
  textSize: 'normal',
  contrastMode: false,
};

/** Action Types */
type AppThemeAction =
  | { type: 'SET_COLOR_MODE'; payload: ColorMode }
  | { type: 'SET_TEXT_SIZE'; payload: TextSize }
  | { type: 'TOGGLE_CONTRAST_MODE' };

/** Reducer Function: Logic การเปลี่ยน State */
function appThemeReducer(
  state: AppThemeState,
  action: AppThemeAction
): AppThemeState {
  switch (action.type) {
    case 'SET_COLOR_MODE':
      return { ...state, colorMode: action.payload };

    case 'SET_TEXT_SIZE':
      return { ...state, textSize: action.payload };

    case 'TOGGLE_CONTRAST_MODE':
      return { ...state, contrastMode: !state.contrastMode };

    default:
      // ป้องกันการ Error หากมี Action ที่ไม่รู้จัก
      return state;
  }
}

// --- Setup Local Storage --- //
const LOCAL_STORAGE_KEY = 'appThemeState';

/** Helper function to read initial state from Local Storage */
const getInitialState = (): AppThemeState => {
  try {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedState) {
      return JSON.parse(storedState) as AppThemeState;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to read theme state from local storage:', error);
  }
  return initialAppState; // ถ้าไม่มีค่าใน Local Storage หรือเกิด Error ให้ใช้ค่าเริ่มต้น
};

// --- Context --- //
/** App Theme Context props */
interface AppThemeContextProps {
  state: AppThemeState;
  dispatch: Dispatch<AppThemeAction>;
  /** theme ปัจจุบัน */
  currentTheme: Theme;
  /** browser ตั้งค่า derk mode ไว้หรือไม่ */
  systemIsDark: boolean;
  // --- Helper functions ---
  /** เปลี่ยนขนาด Text */
  changeTextSize: (size: TextSize) => void;
  /** เปลี่ยนโหมดสี */
  changeColorMode: (mode: ColorMode) => void;
  /** เปิด-ปิด Contrast Mode */
  toggleContrastMode: () => void;
}

/** App Context - สำหรับจัดการ Theme */
const AppThemeContext = createContext<AppThemeContextProps | undefined>(
  undefined
);

/** Custom Hook สำหรับ จัดการ Theme */
export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
};

/** App Theme Provider */
export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    appThemeReducer,
    initialAppState,
    getInitialState
  );
  const { colorMode, textSize, contrastMode } = state;

  /** ค่า system dark mode - คงค่าไว้ใน Provider */
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [systemIsDark, setSystemIsDark] = useState(prefersDarkMode);
  // useEffect เพื่อ Update state เมื่อ prefersDarkMode เปลี่ยนเท่านั้น
  useEffect(() => {
    setSystemIsDark(prefersDarkMode);
  }, [prefersDarkMode]);

  // -- Action Creators (Wrapper Functions) --- //
  /** เปลี่ยนขนาด Font */
  const changeTextSize = useCallback((size: TextSize) => {
    dispatch({ type: 'SET_TEXT_SIZE', payload: size });
  }, []);
  /** เปิด-ปิด Contrast Mode */
  const toggleContrastMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_CONTRAST_MODE' });
  }, []);
  /** เปลี่ยนโหมดสี */
  const changeColorMode = useCallback((mode: ColorMode) => {
    dispatch({ type: 'SET_COLOR_MODE', payload: mode });
  }, []);

  // บันทึก State ลง Local Storage ทุกครั้งที่ State เปลี่ยนแปลง
  useEffect(() => {
    try {
      // บันทึก state object ทั้งหมดเป็น JSON string
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save theme state to local storage:', error);
    }
  }, [state]);

  /** ค่า theme ปัจจุบัน */
  const currentTheme = useMemo(() => {
    const scale = textScales[textSize];
    let baseTheme: Theme;

    if (contrastMode) {
      baseTheme = contrastTheme;
    } else if (
      (systemIsDark && colorMode === 'system') ||
      colorMode === 'dark'
    ) {
      baseTheme = darkTheme;
    } else {
      baseTheme = theme;
    }

    // สร้าง Theme ใหม่ จาก Base Theme
    const newTheme = createTheme(baseTheme);
    newTheme.typography = getTypography(newTheme, scale);
    return newTheme;
  }, [contrastMode, colorMode, textSize, systemIsDark]);

  /** ค่าต่างๆ ใน Context (Memoized) */
  const contextValue = useMemo(
    () => ({
      currentTheme,
      systemIsDark,
      state,
      dispatch,
      changeTextSize,
      changeColorMode,
      toggleContrastMode,
    }),
    [
      currentTheme,
      systemIsDark,
      state,
      dispatch,
      changeTextSize,
      changeColorMode,
      toggleContrastMode,
    ]
  );

  // class theme ของ top-level container
  const containerClass = contrastMode ? 'contrast-mode' : '';

  // Provider ส่ง Theme Object และ State
  return (
    <AppThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={currentTheme}>
        <Box className={containerClass}>{children}</Box>
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}
