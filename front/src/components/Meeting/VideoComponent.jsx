import { useEffect, useRef } from "react";
import { styled } from "styled-components";

const VideoContainer = styled.div`
  background-color: var(--MEETING_PRIMARY);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  aspect-ratio: 4 / 3;
  position: relative;

  &.active {
    border: 2px solid var(--GREEN);
  }

  &.highlighted {
    border: 2px solid var(--RED);
  }
`;

const UserName = styled.div`
  position: absolute;
  top: 8px;
  left: 12px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

function VideoComponent({ 
    track, 
    participantIdentity, 
    local = false,
    videoEnabled 
}) {
    console.log(track);
    const videoElement = useRef(null);

    useEffect(() => {
        if (videoElement.current && videoEnabled) {
            track.attach(videoElement.current);
        } else if (videoElement.current) {
            track.detach(videoElement.current);
        }

        return () => {
            track.detach();
        };
    }, [track, videoEnabled]);

    return (
        <VideoContainer>
            <UserName>
                {participantIdentity + (local ? " (You)" : "")}
            </UserName>
            <Video ref={videoElement} id={track.sid} style={{ display: videoEnabled ? 'block' : 'none' }} />
        </VideoContainer>
    );
}

export default VideoComponent;
