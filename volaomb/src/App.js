import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from './services/AuthUser';
import Guest from './navbar/Guest';
import Auth from './navbar/Auth';
const App = () => {
  const { getToken } = AuthUser();
  if (!getToken()) {
    return <Guest />
  }
  return (
    <Auth />
  );
}

export default App;