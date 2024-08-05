import { useEffect, useRef } from 'react';
import { styled } from "styled-components";

const VideoWrapper = styled.div`
    position: relative;
`;

const Video = styled.video`
    border-radius: 8px;
`;

const NameTag = styled.div`
    position: absolute;
    bottom: 24px;
    left: 24px;
`;

function UserVideoComponent({ streamManager }){
    const videoRef = useRef(null);

    useEffect(() => {
        if (streamManager && videoRef.current) {
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager]);

    const getNicknameTag = () => {
        const parsedData = JSON.parse(streamManager?.stream?.connection?.data.split('%/%user-data')[0]);
        return parsedData?.username;
    };

    return (
        <div>
            {streamManager !== undefined ? (
                <VideoWrapper>
                    <Video autoPlay={true} ref={videoRef} />
                    <NameTag>{getNicknameTag()}</NameTag>
                </VideoWrapper>
            ) : null}
        </div>
    );
};

export default UserVideoComponent;
