package lt.gallery.repository;

import lt.gallery.model.Image;
import org.springframework.data.repository.CrudRepository;

public interface ImageRepository extends CrudRepository<Image, Long> {

}
