package com.novanus.medappoint.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class RemarkMapperTest {

    private RemarkMapper remarkMapper;

    @BeforeEach
    public void setUp() {
        remarkMapper = new RemarkMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(remarkMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(remarkMapper.fromId(null)).isNull();
    }
}
