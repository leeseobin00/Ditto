package com.ssafy.ditto.domain.file.service;

import com.ssafy.ditto.domain.file.FileStore;
import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.domain.FilePost;
import com.ssafy.ditto.domain.file.dto.FileResponse;
import com.ssafy.ditto.domain.file.dto.UploadFile;
import com.ssafy.ditto.domain.file.exception.FileException;
import com.ssafy.ditto.domain.file.repository.FilePostRepository;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.post.domain.Post;
import com.ssafy.ditto.domain.post.exception.PostException;
import com.ssafy.ditto.domain.post.repository.PostRepository;
import com.ssafy.ditto.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.ditto.domain.file.exception.FileErrorCode.FILE_NOT_EXIST;

@Component
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {
    private final PostRepository postRepository;
    private final FileRepository fileRepository;
    private final FilePostRepository filePostRepository;
    private final FileStore fileStore;

    public int saveFile(MultipartFile requestFile) throws IOException {
        UploadFile uploadFile = fileStore.storeFile(requestFile);

        File file = new File();
        file.setUploadFileName(uploadFile.getUploadFileName());
        file.setStoreFileName(uploadFile.getStoreFileName());
        file.setFileSize(uploadFile.getFileSize());
        file.setFileUrl(fileStore.getFullPath(uploadFile.getStoreFileName()));

        fileRepository.save(file);
        return file.getFileId();
    }

    public void saveList(int postId, List<MultipartFile> requestFiles) throws IOException {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(ErrorCode.POST_NOT_EXIST));
        List<UploadFile> uploadFiles = fileStore.storeFiles(requestFiles);

        List<File> fileList = new ArrayList<>();
        for (UploadFile uploadFile : uploadFiles) {
            File file = new File();
            file.setUploadFileName(uploadFile.getUploadFileName());
            file.setStoreFileName(uploadFile.getStoreFileName());
            file.setFileSize(uploadFile.getFileSize());
            file.setFileUrl(fileStore.getFullPath(uploadFile.getStoreFileName()));
            fileList.add(file);
        }
        fileRepository.saveAll(fileList);

        List<FilePost> filePosts = new ArrayList<>();
        for (File file : fileList) {
            FilePost filePost = new FilePost();
            filePost.setFile(file);
            filePost.setPost(post);
            filePosts.add(filePost);
        }
        filePostRepository.saveAll(filePosts);
    }

    @Override
    public int updateFile(int fileId, MultipartFile requestFile) throws IOException {
        deleteFile(fileId);
        return saveFile(requestFile);
    }

    @Override
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
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(ErrorCode.POST_NOT_EXIST));
        List<File> files = fileRepository.findByPostId(postId);
        for (File file : files) {
            List<FilePost> filePosts = filePostRepository.findByFile(file);
            filePostRepository.deleteAll(filePosts);
        }
        fileRepository.deleteAll(files);
    }

    @Override
    public FileResponse getFile(int fileId) {
        File file = fileRepository.findById(fileId).orElseThrow(() -> new FileException(FILE_NOT_EXIST));
        return FileResponse.of(file);
    }
}
