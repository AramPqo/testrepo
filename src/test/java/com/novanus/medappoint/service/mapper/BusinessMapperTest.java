package com.novanus.medappoint.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class BusinessMapperTest {

    private BusinessMapper businessMapper;

    @BeforeEach
    public void setUp() {
        businessMapper = new BusinessMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(businessMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(businessMapper.fromId(null)).isNull();
    }
}
