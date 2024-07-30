package io.openvidu.recording.java;
import io.openvidu.java.client.Recording;

public class Record {
    Recording recording;
    String url;

    public Record(Recording recording, String url) {
        super();
        this.recording = recording;
        this.url = url;
    }
}
