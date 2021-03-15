package com.novanus.medappoint.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novanus.medappoint.web.rest.TestUtil;

public class OpeningHoursTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OpeningHours.class);
        OpeningHours openingHours1 = new OpeningHours();
        openingHours1.setId(1L);
        OpeningHours openingHours2 = new OpeningHours();
        openingHours2.setId(openingHours1.getId());
        assertThat(openingHours1).isEqualTo(openingHours2);
        openingHours2.setId(2L);
        assertThat(openingHours1).isNotEqualTo(openingHours2);
        openingHours1.setId(null);
        assertThat(openingHours1).isNotEqualTo(openingHours2);
    }
}
