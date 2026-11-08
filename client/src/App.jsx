import './App.scss'
import Routes from './pages/Routes'
import Loader2 from './components/loader2';
import {useAuth} from './context/Auth'
import { FloatButton } from 'antd';
import { connectSocket, disconnectSocket } from './socket';
import { useEffect } from 'react';
import AIChat from './components/AIChat';
import NetworkStatus from './components/NetworkStatus';

function App() {
const {isLoading,isAuth}=useAuth();

useEffect(() => {
  const token = localStorage.getItem("token");
  if (isAuth && token) connectSocket(token);
  else disconnectSocket();

  return () => {
    if (!isAuth) disconnectSocket();
  };
}, [isAuth]);


  return (
    
      (isLoading)?
      <Loader2/>
      :
      <>
      <Routes/>
      <FloatButton.BackTop 
  className="bg-dark text-white shadow border border-secondary"
  style={{ insetInlineEnd: 24, bottom: 6 }} //bottom 24 
  shape="circle" 
  
/>
<AIChat/>
<NetworkStatus/>
      </>

    
  )
}

export default App
