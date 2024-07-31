package com.ssafy.ditto.domain.liveroom.dto;
import io.openvidu.java.client.Recording;

public class RecordResponse {
    Recording recording;
    String url;

    public RecordResponse(Recording recording, String url) {
        super();
        this.recording = recording;
        this.url = url;
    }
}