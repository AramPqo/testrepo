package com.novanus.medappoint.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novanus.medappoint.web.rest.TestUtil;

public class OpeningHoursDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OpeningHoursDTO.class);
        OpeningHoursDTO openingHoursDTO1 = new OpeningHoursDTO();
        openingHoursDTO1.setId(1L);
        OpeningHoursDTO openingHoursDTO2 = new OpeningHoursDTO();
        assertThat(openingHoursDTO1).isNotEqualTo(openingHoursDTO2);
        openingHoursDTO2.setId(openingHoursDTO1.getId());
        assertThat(openingHoursDTO1).isEqualTo(openingHoursDTO2);
        openingHoursDTO2.setId(2L);
        assertThat(openingHoursDTO1).isNotEqualTo(openingHoursDTO2);
        openingHoursDTO1.setId(null);
        assertThat(openingHoursDTO1).isNotEqualTo(openingHoursDTO2);
    }
}
