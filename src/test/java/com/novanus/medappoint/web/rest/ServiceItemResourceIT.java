package com.novanus.medappoint.web.rest;

import com.novanus.medappoint.MedappointApp;
import com.novanus.medappoint.domain.ServiceItem;
import com.novanus.medappoint.repository.ServiceItemRepository;
import com.novanus.medappoint.service.ServiceItemService;
import com.novanus.medappoint.service.dto.ServiceItemDTO;
import com.novanus.medappoint.service.mapper.ServiceItemMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ServiceItemResource} REST controller.
 */
@SpringBootTest(classes = MedappointApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ServiceItemResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRICE = 1;
    private static final Integer UPDATED_PRICE = 2;

    private static final Integer DEFAULT_VAT_RATE = 1;
    private static final Integer UPDATED_VAT_RATE = 2;

    @Autowired
    private ServiceItemRepository serviceItemRepository;

    @Autowired
    private ServiceItemMapper serviceItemMapper;

    @Autowired
    private ServiceItemService serviceItemService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceItemMockMvc;

    private ServiceItem serviceItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceItem createEntity(EntityManager em) {
        ServiceItem serviceItem = new ServiceItem()
            .description(DEFAULT_DESCRIPTION)
            .price(DEFAULT_PRICE)
            .vatRate(DEFAULT_VAT_RATE);
        return serviceItem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceItem createUpdatedEntity(EntityManager em) {
        ServiceItem serviceItem = new ServiceItem()
            .description(UPDATED_DESCRIPTION)
            .price(UPDATED_PRICE)
            .vatRate(UPDATED_VAT_RATE);
        return serviceItem;
    }

    @BeforeEach
    public void initTest() {
        serviceItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceItem() throws Exception {
        int databaseSizeBeforeCreate = serviceItemRepository.findAll().size();
        // Create the ServiceItem
        ServiceItemDTO serviceItemDTO = serviceItemMapper.toDto(serviceItem);
        restServiceItemMockMvc.perform(post("/api/service-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceItemDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceItem in the database
        List<ServiceItem> serviceItemList = serviceItemRepository.findAll();
        assertThat(serviceItemList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceItem testServiceItem = serviceItemList.get(serviceItemList.size() - 1);
        assertThat(testServiceItem.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testServiceItem.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testServiceItem.getVatRate()).isEqualTo(DEFAULT_VAT_RATE);
    }

    @Test
    @Transactional
    public void createServiceItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceItemRepository.findAll().size();

        // Create the ServiceItem with an existing ID
        serviceItem.setId(1L);
        ServiceItemDTO serviceItemDTO = serviceItemMapper.toDto(serviceItem);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceItemMockMvc.perform(post("/api/service-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceItemDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceItem in the database
        List<ServiceItem> serviceItemList = serviceItemRepository.findAll();
        assertThat(serviceItemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServiceItems() throws Exception {
        // Initialize the database
        serviceItemRepository.saveAndFlush(serviceItem);

        // Get all the serviceItemList
        restServiceItemMockMvc.perform(get("/api/service-items?sort=id,desc&description=" + DEFAULT_DESCRIPTION))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE)))
            .andExpect(jsonPath("$.[*].vatRate").value(hasItem(DEFAULT_VAT_RATE)));

        // Not Found
        restServiceItemMockMvc.perform(get("/api/service-items?sort=id,desc&description=NotFound"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(content().string("[]"));
    }
    
    @Test
    @Transactional
    public void getServiceItem() throws Exception {
        // Initialize the database
        serviceItemRepository.saveAndFlush(serviceItem);

        // Get the serviceItem
        restServiceItemMockMvc.perform(get("/api/service-items/{id}", serviceItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceItem.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE))
            .andExpect(jsonPath("$.vatRate").value(DEFAULT_VAT_RATE));
    }
    @Test
    @Transactional
    public void getNonExistingServiceItem() throws Exception {
        // Get the serviceItem
        restServiceItemMockMvc.perform(get("/api/service-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceItem() throws Exception {
        // Initialize the database
        serviceItemRepository.saveAndFlush(serviceItem);

        int databaseSizeBeforeUpdate = serviceItemRepository.findAll().size();

        // Update the serviceItem
        ServiceItem updatedServiceItem = serviceItemRepository.findById(serviceItem.getId()).get();
        // Disconnect from session so that the updates on updatedServiceItem are not directly saved in db
        em.detach(updatedServiceItem);
        updatedServiceItem
            .description(UPDATED_DESCRIPTION)
            .price(UPDATED_PRICE)
            .vatRate(UPDATED_VAT_RATE);
        ServiceItemDTO serviceItemDTO = serviceItemMapper.toDto(updatedServiceItem);

        restServiceItemMockMvc.perform(put("/api/service-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceItemDTO)))
            .andExpect(status().isOk());

        // Validate the ServiceItem in the database
        List<ServiceItem> serviceItemList = serviceItemRepository.findAll();
        assertThat(serviceItemList).hasSize(databaseSizeBeforeUpdate);
        ServiceItem testServiceItem = serviceItemList.get(serviceItemList.size() - 1);
        assertThat(testServiceItem.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testServiceItem.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testServiceItem.getVatRate()).isEqualTo(UPDATED_VAT_RATE);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceItem() throws Exception {
        int databaseSizeBeforeUpdate = serviceItemRepository.findAll().size();

        // Create the ServiceItem
        ServiceItemDTO serviceItemDTO = serviceItemMapper.toDto(serviceItem);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceItemMockMvc.perform(put("/api/service-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceItemDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceItem in the database
        List<ServiceItem> serviceItemList = serviceItemRepository.findAll();
        assertThat(serviceItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceItem() throws Exception {
        // Initialize the database
        serviceItemRepository.saveAndFlush(serviceItem);

        int databaseSizeBeforeDelete = serviceItemRepository.findAll().size();

        // Delete the serviceItem
        restServiceItemMockMvc.perform(delete("/api/service-items/{id}", serviceItem.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceItem> serviceItemList = serviceItemRepository.findAll();
        assertThat(serviceItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
