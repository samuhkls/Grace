package br.com.grace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class GraceApplication {
	public static void main(String[] args) {
		SpringApplication.run(GraceApplication.class, args);
	}
}
