##  Photo gallery - simple Spring Boot application

### Database configuration

For database configuration you need to change source url, username and password:
```
spring.datasource.url=jdbc:mysql://localhost:3306/gallery
spring.datasource.username=root
spring.datasource.password=root
```

### Running Photo gallery locally

Photo gallery is a Spring Boot application built using Maven. You can build a jar file and run it from the command line:
```
git clone https://github.com/modestas612/Photo-gallery.git
cd Photo-gallery
./mvnw package
java -jar target/*.jar
```
You can then access Photo gallery here: http://localhost:8080/

### Working with Photo gallery in your IDE

You can run it directly from your IDE using the Spring Boot Maven plugin. If you do this it will pick up changes that you make in the project immediately.
```
Maven -> Plugins -> spring-boot -> spring-boot:run
```
