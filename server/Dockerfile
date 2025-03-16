# ======= Stage 1: Build =======
FROM maven:3.9.6-amazoncorretto-17 AS builder

# Set the working directory
WORKDIR /app

# Copy only necessary files first to leverage Docker cache
COPY pom.xml ./
COPY mvnw ./
COPY .mvn .mvn/

# Ensure Maven wrapper is executable
RUN chmod +x mvnw

# Download dependencies to cache layers
RUN ./mvnw dependency:go-offline -B

# Copy the source code
COPY src ./src

# Build the application (skip tests to speed up)
RUN ./mvnw package -DskipTests

# ======= Stage 2: Run =======
FROM amazoncorretto:17-alpine

# Set the working directory
WORKDIR /app

# Copy the compiled JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the jar file
CMD ["java", "-jar", "app.jar"]