package com.novanus.medappoint.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novanus.medappoint.web.rest.TestUtil;

public class InsurerDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InsurerDTO.class);
        InsurerDTO insurerDTO1 = new InsurerDTO();
        insurerDTO1.setId(1L);
        InsurerDTO insurerDTO2 = new InsurerDTO();
        assertThat(insurerDTO1).isNotEqualTo(insurerDTO2);
        insurerDTO2.setId(insurerDTO1.getId());
        assertThat(insurerDTO1).isEqualTo(insurerDTO2);
        insurerDTO2.setId(2L);
        assertThat(insurerDTO1).isNotEqualTo(insurerDTO2);
        insurerDTO1.setId(null);
        assertThat(insurerDTO1).isNotEqualTo(insurerDTO2);
    }
}
