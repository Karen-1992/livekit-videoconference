import { AccessToken } from "livekit-server-sdk";

export const createLKToken = (identity: string, name: string, roomName: string): string => {
    const at = new AccessToken(process.env.livekitApiKey, process.env.livekitApiSecret, {
        identity,
        name,
        ttl: 3600,
    });
    if (typeof identity !== 'string') {
        throw Error('provide one (and only one) identity');
      }
      if (typeof roomName !== 'string') {
        throw Error('provide one (and only one) roomName');
      }
  
      if (Array.isArray(name)) {
        throw Error('provide max one name');
      }
    at.addGrant({
        roomJoin: true,
        room: roomName,
        canPublish: true,
        canPublishData: true,
        canSubscribe: true,
    });

    return at.toJwt();
};