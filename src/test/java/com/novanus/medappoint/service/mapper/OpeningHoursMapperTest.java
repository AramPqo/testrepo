package com.novanus.medappoint.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class OpeningHoursMapperTest {

    private OpeningHoursMapper openingHoursMapper;

    @BeforeEach
    public void setUp() {
        openingHoursMapper = new OpeningHoursMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(openingHoursMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(openingHoursMapper.fromId(null)).isNull();
    }
}
