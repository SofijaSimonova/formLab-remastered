package com.formlab;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FormlabBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FormlabBackendApplication.class, args);
	}

}