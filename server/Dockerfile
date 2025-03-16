# ======= Stage 1: Build =======
FROM maven:3.9.6-amazoncorretto-17 AS builder

WORKDIR /app

COPY pom.xml ./
COPY mvnw ./
COPY .mvn .mvn/
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B
COPY src ./src
RUN ./mvnw package -DskipTests

# ======= Stage 2: Run =======
FROM amazoncorretto:17-alpine

WORKDIR /app

# Remove backslash from last environment variable
ENV SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/booking_management \
    SPRING_DATASOURCE_USERNAME=root \
    SPRING_DATASOURCE_PASSWORD=password

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["java", "-XX:+UseContainerSupport", "-Xmx512m", "-jar", "app.jar"]
