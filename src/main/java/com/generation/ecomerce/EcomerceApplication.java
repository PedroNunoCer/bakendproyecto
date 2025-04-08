package com.generation.ecomerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class EcomerceApplication {
	static{
		Dotenv dotenv = Dotenv.load();
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
	}
	public static void main(String[] args) {
		SpringApplication.run(EcomerceApplication.class, args);
	}

}
