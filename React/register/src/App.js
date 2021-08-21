// import logo from './logo.svg';
import './App.css';
import { CookiesProvider } from 'react-cookie';
// import FormDemo from './Component/FormDemo/FormDemo';
import Parent from './Component/Parent';
// import Cms from './Component/Cms';
function App() {
  return (
    <CookiesProvider>
      {/* <Cms /> */}
      <Parent/>
      {/* <Demo/> */}
    </CookiesProvider>
  );
}

export default App;
