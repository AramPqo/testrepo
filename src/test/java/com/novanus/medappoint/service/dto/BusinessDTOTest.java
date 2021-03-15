package com.novanus.medappoint.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novanus.medappoint.web.rest.TestUtil;

public class BusinessDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusinessDTO.class);
        BusinessDTO businessDTO1 = new BusinessDTO();
        businessDTO1.setId(1L);
        BusinessDTO businessDTO2 = new BusinessDTO();
        assertThat(businessDTO1).isNotEqualTo(businessDTO2);
        businessDTO2.setId(businessDTO1.getId());
        assertThat(businessDTO1).isEqualTo(businessDTO2);
        businessDTO2.setId(2L);
        assertThat(businessDTO1).isNotEqualTo(businessDTO2);
        businessDTO1.setId(null);
        assertThat(businessDTO1).isNotEqualTo(businessDTO2);
    }
}
