package com.novanus.medappoint.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ServiceItemMapperTest {

    private ServiceItemMapper serviceItemMapper;

    @BeforeEach
    public void setUp() {
        serviceItemMapper = new ServiceItemMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(serviceItemMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(serviceItemMapper.fromId(null)).isNull();
    }
}
