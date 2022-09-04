import React from 'react';
import Start from './components/Start';
import Home from './components/Home';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

const App = () => {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
      </Routes>
      {location.pathname !== '/' && <Home />}
    </>
  );
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
