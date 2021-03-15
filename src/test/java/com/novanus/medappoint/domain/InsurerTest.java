package com.novanus.medappoint.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novanus.medappoint.web.rest.TestUtil;

public class InsurerTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Insurer.class);
        Insurer insurer1 = new Insurer();
        insurer1.setId(1L);
        Insurer insurer2 = new Insurer();
        insurer2.setId(insurer1.getId());
        assertThat(insurer1).isEqualTo(insurer2);
        insurer2.setId(2L);
        assertThat(insurer1).isNotEqualTo(insurer2);
        insurer1.setId(null);
        assertThat(insurer1).isNotEqualTo(insurer2);
    }
}
