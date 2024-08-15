package com.ssafy.ditto.domain.file.service;

import com.ssafy.ditto.domain.file.dto.FileResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileService {
    int saveFile(MultipartFile requestFile) throws IOException;

    void saveList(int postId, List<MultipartFile> requestFiles) throws IOException;

    int updateFile(int fileId, MultipartFile requestFile) throws IOException;

    void updateList(int postId, List<MultipartFile> requestFiles) throws IOException;

    void deleteFile(int fileId) throws IOException;

    void deleteList(int postId) throws IOException;

    FileResponse getFile(int fileId);
}
