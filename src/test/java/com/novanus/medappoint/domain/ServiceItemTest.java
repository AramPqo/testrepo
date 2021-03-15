package com.novanus.medappoint.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novanus.medappoint.web.rest.TestUtil;

public class ServiceItemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceItem.class);
        ServiceItem serviceItem1 = new ServiceItem();
        serviceItem1.setId(1L);
        ServiceItem serviceItem2 = new ServiceItem();
        serviceItem2.setId(serviceItem1.getId());
        assertThat(serviceItem1).isEqualTo(serviceItem2);
        serviceItem2.setId(2L);
        assertThat(serviceItem1).isNotEqualTo(serviceItem2);
        serviceItem1.setId(null);
        assertThat(serviceItem1).isNotEqualTo(serviceItem2);
    }
}
