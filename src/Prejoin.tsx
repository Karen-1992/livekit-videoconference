import * as React from 'react';
import { PreJoin, setLogLevel } from '@livekit/components-react';
import "@livekit/components-styles";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

const PrejoinExample: React.FC = () => {

  setLogLevel('debug', { liveKitClientLogLevel: 'warn' });

  const navigate = useNavigate();
  
  const handleJoin = (userName: string) => {
    navigate(`/room/${uuidv4()}`);
    sessionStorage.setItem("userName", userName)
  }

  return (
    <div data-lk-theme="default" style={{ height: '100vh' }}>
      <PreJoin
        onSubmit={(val) => handleJoin(val?.username)}
      />
      
    </div>
  );
};

export default PrejoinExample;