import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';

import HomePage from 'scenes/homePage/indexHomePage';
import LoginPage from 'scenes/loginPage/indexLoginPage';
import ProfilePage from 'scenes/profilePage/indexProfile';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/profile/:userId" element={<ProfilePage />}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
