package lt.gallery.controller;

import lt.gallery.exception.StorageFileNotFoundException;
import lt.gallery.model.Image;
import lt.gallery.repository.ImageRepository;
import lt.gallery.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Controller
public class UploadController {

    private final StorageService storageService;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    public UploadController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/uploadform")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                   @RequestParam("name") String name,
                                   @RequestParam("description") String description,
                                   Model model) {
        try {
            Image imageInfo = new Image();

            imageInfo.setFilename(name);
            imageInfo.setDescription(description);
            imageInfo.setUrl(file.getOriginalFilename());

            imageRepository.save(imageInfo);
            storageService.store(file);

            model.addAttribute("message", "File uploaded successfully! -> filename = " + file.getOriginalFilename());
        }catch (Exception e) {
            model.addAttribute("message", "Failed to upload file: " + file.getOriginalFilename());
        }
        return "redirect:/";
    }

    @GetMapping("/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=" + file.getFilename()).body(file);
    }

    @GetMapping("/")
    public String displayAllUploadedFiles(Model model) {

        Iterable<Image> imagesInfo = imageRepository.findAll();

        List<Image> images = new ArrayList<>();

        for (Image image : imagesInfo) {
            image.setUrl("/" + image.getUrl());
            images.add(image);
        }

        model.addAttribute("images", images);

        return "listfiles";
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{Id}")
    public String deleteFile(@PathVariable Long Id){
        imageRepository.deleteById(Id);
        return "redirect:/";
    }

    @DeleteMapping("/all")
    public String deleteAllFiles(){
        imageRepository.deleteAll();
        storageService.deleteAll();
        storageService.init();
        return "redirect:/";
    }
}
