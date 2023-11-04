FROM openjdk:21-slim
COPY ./target/server-0.0.1-SNAPSHOT.jar /tmp
WORKDIR /tmp
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "server-0.0.1-SNAPSHOT.jar"]
