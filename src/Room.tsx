import * as React from 'react';
import { LiveKitRoom, RoomAudioRenderer, VideoConference, setLogLevel } from '@livekit/components-react';
import "@livekit/components-styles";
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import Timer from "./Timer";
import axios from 'axios';

const Room: React.FC = () => {
  const [isConnected, setIsConnected] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string | null>(null);

  setLogLevel('debug', { liveKitClientLogLevel: 'warn' });
  
  const { roomId } = useParams();
  const navigate = useNavigate();
  const userId = uuidv4();
  const userName = sessionStorage.getItem("userName") || `user-${uuidv4()}`;

  React.useEffect(() => {
    const fetchData = async () => {
      if (!token && userId && roomId && userName) {
        try {
          
          const response = await axios.post('http://localhost:5000/token', {
            identity: userId,
            name: userName,
            roomName: roomId,
          });
          const data = await response?.data;
          if (data?.accessToken) {
            setToken(data.accessToken);
          }
        } catch (error) {
          console.error('Error fetching token');
        }
      }
    };

    fetchData();
  }, [roomId, userId, token, userName]);

  return (
    <div data-lk-theme="default" >
      <Timer />
      {token && (
        <LiveKitRoom
          token={token}
          audio={true}
          serverUrl={process.env.REACT_APP_LIVEKIT_HOST}
          video={true}
          onConnected={() => setIsConnected(true)}
          onDisconnected={() => navigate("/")}
      >
          {isConnected && (
              <VideoConference />
          )}
          <RoomAudioRenderer />
      </LiveKitRoom>
      )}
    </div>
  );
};

export default Room;
