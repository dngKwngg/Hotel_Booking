package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@RestController
	@RequestMapping("/api")
	public static class TestController{
		@GetMapping("/test")
		public String test(){
			return "Hello world!";
		}

		@Value("${app.frontend.url}")
		private String frontendUrl;

		@GetMapping("/test-config")
		public String testConfig() {
			return "Frontend URL is configured as: " + frontendUrl; // Return the value of FRONTEND_URL
		}
	}
}
