package com.novanus.medappoint.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novanus.medappoint.web.rest.TestUtil;

public class RemarkDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RemarkDTO.class);
        RemarkDTO remarkDTO1 = new RemarkDTO();
        remarkDTO1.setId(1L);
        RemarkDTO remarkDTO2 = new RemarkDTO();
        assertThat(remarkDTO1).isNotEqualTo(remarkDTO2);
        remarkDTO2.setId(remarkDTO1.getId());
        assertThat(remarkDTO1).isEqualTo(remarkDTO2);
        remarkDTO2.setId(2L);
        assertThat(remarkDTO1).isNotEqualTo(remarkDTO2);
        remarkDTO1.setId(null);
        assertThat(remarkDTO1).isNotEqualTo(remarkDTO2);
    }
}
