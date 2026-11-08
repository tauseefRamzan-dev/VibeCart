import { useState, useEffect } from 'react';
import { WifiOutlined, DisconnectOutlined } from '@ant-design/icons';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowRestored(true);

      // 3 seconds baad "Restored" notice hide kar do
      const timer = setTimeout(() => {
        setShowRestored(false);
      }, 3000);

      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Normal online state par kuch show na karo
  if (isOnline && !showRestored) return null;

  return (
    <div
      className={`position-fixed top-0 start-0 w-100 py-2 px-3 text-center fw-semibold text-white shadow-sm transition-all`}
      style={{
        zIndex: 99999,
        backgroundColor: isOnline ? '#52c41a' : '#ff4d4f',
        fontSize: '14px',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {isOnline ? (
        <span>
          <WifiOutlined className="me-2" />
          Internet connection restored. Back online!
        </span>
      ) : (
        <span>
          <DisconnectOutlined className="me-2" />
          You are currently offline. Please check your internet connection.
        </span>
      )}
    </div>
  );
};

export default NetworkStatus;