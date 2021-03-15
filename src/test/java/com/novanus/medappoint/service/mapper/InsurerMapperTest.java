package com.novanus.medappoint.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class InsurerMapperTest {

    private InsurerMapper insurerMapper;

    @BeforeEach
    public void setUp() {
        insurerMapper = new InsurerMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(insurerMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(insurerMapper.fromId(null)).isNull();
    }
}
