import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import ButtonGroup from '@mui/material/ButtonGroup';
import Switch from '@mui/material/Switch';

import LightModeRounded from '@mui/icons-material/LightModeRounded';
import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';
import ContrastRounded from '@mui/icons-material/ContrastRounded';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAppTheme } from '../AppThemeContext';

import reactLogo from '../assets/react.svg';
import muiLogo from '../assets/mui.svg';
import viteLogo from '../assets/vite.svg';

function TemplateContent() {
  // ดึง state และ helper functions จาก Context
  const { state, changeTextSize, changeColorMode, toggleContrastMode } =
    useAppTheme();

  const { colorMode, textSize, contrastMode } = state;

  // ------>
  const [count, setCount] = useState(0);

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
    </Box>
  );
}

export default TemplateContent;
