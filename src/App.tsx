import './App.css';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { th } from 'date-fns/locale';

import CssBaseline from '@mui/material/CssBaseline';

import TemplateContent from './components/TemplateContent';
import { AppThemeProvider } from './AppThemeContext';

function App() {
  return (
    <AppThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
        <CssBaseline />
        <TemplateContent />
      </LocalizationProvider>
    </AppThemeProvider>
  );
}

export default App;
