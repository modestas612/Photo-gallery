##  Photo gallery - simple Spring Boot application

### Database configuration

To build this application you need to change database properties. For database configuration you need to change source url, username and password:
```
spring.datasource.url=jdbc:mysql://localhost:3306/gallery
spring.datasource.username=root
spring.datasource.password=root
```

### Running Photo gallery locally in your IDE

Photo gallery is a Spring Boot application built using Maven. You can run it directly from your IDE using the Spring Boot Maven plugin. If you do this it will pick up changes that you make in the project immediately.
```
Maven -> Plugins -> spring-boot -> spring-boot:run
```
You can then access Photo gallery here: http://localhost:8080/
