package com.kalebe.orion;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/** Sobe o contexto inteiro contra o banco orion_test: prova que configuração, banco e Flyway estão certos. */
@SpringBootTest
@ActiveProfiles("test")
class OrionApplicationTests {

	@Test
	void contextoSobe() {
	}
}
