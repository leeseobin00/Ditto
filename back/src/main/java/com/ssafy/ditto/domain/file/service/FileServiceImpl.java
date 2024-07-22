package com.ssafy.ditto.domain.file.service;

import com.ssafy.ditto.domain.file.FileStore;
import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.dto.UploadFile;
import com.ssafy.ditto.domain.file.exception.FileException;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.post.domain.Post;
import com.ssafy.ditto.domain.post.exception.PostException;
import com.ssafy.ditto.domain.post.repository.PostRepository;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.ditto.domain.file.exception.FileErrorCode.*;
import static com.ssafy.ditto.domain.post.exception.PostErrorCode.POST_NOT_EXIST;

@Component
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService{
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final FileRepository fileRepository;
    private final FileStore fileStore;

    // 1장 저장
    public int saveFile(MultipartFile requestFile) throws IOException {
        UploadFile uploadFile = fileStore.storeFile(requestFile);

        File file = new File();
        file.setUploadFileName(uploadFile.getUploadFileName());
        file.setStoreFileName(uploadFile.getStoreFileName());
        file.setFileSize(uploadFile.getFileSize());

        fileRepository.save(file);
        // 저장된 fildId return 필요
        return file.getFileId();
    }


    // 게시글 파일 여러장 저장
    public void saveList(int postId, List<MultipartFile> requestFiles) throws IOException {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
        List<UploadFile> uploadFiles = fileStore.storeFiles(requestFiles);

        List<File> fileList = new ArrayList<>();
        for (UploadFile uploadFile : uploadFiles) {
            File file = new File();
            file.setUploadFileName(uploadFile.getUploadFileName());
            file.setStoreFileName(uploadFile.getStoreFileName());
            file.setFileSize(uploadFile.getFileSize());
            fileList.add(file);
        }
        fileRepository.saveAll(fileList);
    }


    public int updateFile(int fileId, MultipartFile requestFile) throws IOException {
        deleteFile(fileId);
        return saveFile(requestFile);
    }

    public void updateList(int postId, List<MultipartFile> requestFiles) throws IOException {
        deleteList(postId);
        saveList(postId, requestFiles);
    }

    @Override
    public void deleteFile(int fileId) throws IOException {
        File file = fileRepository.findById(fileId).orElseThrow(() -> new FileException(FILE_NOT_EXIST));
        fileRepository.delete(file);
    }

    @Override
    public void deleteList(int postId) throws IOException {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
        List<File> files = fileRepository.findByPostId(postId);
        fileRepository.deleteAll(files);
    }
}
