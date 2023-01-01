import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import HomePage from 'scenes/homePage/indexHomePage';
import LoginPage from 'scenes/loginPage/indexLoginPage';
import ProfilePage from 'scenes/profilePage/indexProfile';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/profile/:userId" element={<ProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
