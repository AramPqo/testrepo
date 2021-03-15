package com.novanus.medappoint.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novanus.medappoint.web.rest.TestUtil;

public class RemarkTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Remark.class);
        Remark remark1 = new Remark();
        remark1.setId(1L);
        Remark remark2 = new Remark();
        remark2.setId(remark1.getId());
        assertThat(remark1).isEqualTo(remark2);
        remark2.setId(2L);
        assertThat(remark1).isNotEqualTo(remark2);
        remark1.setId(null);
        assertThat(remark1).isNotEqualTo(remark2);
    }
}
