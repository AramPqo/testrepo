package com.novanus.medappoint.web.rest;

import com.novanus.medappoint.MedappointApp;
import com.novanus.medappoint.domain.Business;
import com.novanus.medappoint.repository.BusinessRepository;
import com.novanus.medappoint.service.BusinessService;
import com.novanus.medappoint.service.dto.BusinessDTO;
import com.novanus.medappoint.service.mapper.BusinessMapper;

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
 * Integration tests for the {@link BusinessResource} REST controller.
 */
@SpringBootTest(classes = MedappointApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BusinessResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE = "BBBBBBBBBB";

    private static final String DEFAULT_WEBSITE = "AAAAAAAAAA";
    private static final String UPDATED_WEBSITE = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO = "AAAAAAAAAA";
    private static final String UPDATED_LOGO = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL_FOOTER = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_FOOTER = "BBBBBBBBBB";

    private static final String DEFAULT_VAT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_VAT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_BANK_NAME = "AAAAAAAAAA";
    private static final String UPDATED_BANK_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IBAN = "AAAAAAAAAA";
    private static final String UPDATED_IBAN = "BBBBBBBBBB";

    private static final String DEFAULT_BIC = "AAAAAAAAAA";
    private static final String UPDATED_BIC = "BBBBBBBBBB";

    private static final Boolean DEFAULT_SHOW_PATIENT_NAME = false;
    private static final Boolean UPDATED_SHOW_PATIENT_NAME = true;

    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private BusinessMapper businessMapper;

    @Autowired
    private BusinessService businessService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBusinessMockMvc;

    private Business business;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Business createEntity(EntityManager em) {
        Business business = new Business()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .email(DEFAULT_EMAIL)
            .phone(DEFAULT_PHONE)
            .mobile(DEFAULT_MOBILE)
            .website(DEFAULT_WEBSITE)
            .logo(DEFAULT_LOGO)
            .emailFooter(DEFAULT_EMAIL_FOOTER)
            .vatNumber(DEFAULT_VAT_NUMBER)
            .bankName(DEFAULT_BANK_NAME)
            .iban(DEFAULT_IBAN)
            .bic(DEFAULT_BIC)
            .showPatientName(DEFAULT_SHOW_PATIENT_NAME);
        return business;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Business createUpdatedEntity(EntityManager em) {
        Business business = new Business()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE)
            .mobile(UPDATED_MOBILE)
            .website(UPDATED_WEBSITE)
            .logo(UPDATED_LOGO)
            .emailFooter(UPDATED_EMAIL_FOOTER)
            .vatNumber(UPDATED_VAT_NUMBER)
            .bankName(UPDATED_BANK_NAME)
            .iban(UPDATED_IBAN)
            .bic(UPDATED_BIC)
            .showPatientName(UPDATED_SHOW_PATIENT_NAME);
        return business;
    }

    @BeforeEach
    public void initTest() {
        business = createEntity(em);
    }

    @Test
    @Transactional
    public void createBusiness() throws Exception {
        int databaseSizeBeforeCreate = businessRepository.findAll().size();
        // Create the Business
        BusinessDTO businessDTO = businessMapper.toDto(business);
        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessDTO)))
            .andExpect(status().isCreated());

        // Validate the Business in the database
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeCreate + 1);
        Business testBusiness = businessList.get(businessList.size() - 1);
        assertThat(testBusiness.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBusiness.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testBusiness.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testBusiness.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testBusiness.getMobile()).isEqualTo(DEFAULT_MOBILE);
        assertThat(testBusiness.getWebsite()).isEqualTo(DEFAULT_WEBSITE);
        assertThat(testBusiness.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testBusiness.getEmailFooter()).isEqualTo(DEFAULT_EMAIL_FOOTER);
        assertThat(testBusiness.getVatNumber()).isEqualTo(DEFAULT_VAT_NUMBER);
        assertThat(testBusiness.getBankName()).isEqualTo(DEFAULT_BANK_NAME);
        assertThat(testBusiness.getIban()).isEqualTo(DEFAULT_IBAN);
        assertThat(testBusiness.getBic()).isEqualTo(DEFAULT_BIC);
        assertThat(testBusiness.isShowPatientName()).isEqualTo(DEFAULT_SHOW_PATIENT_NAME);
    }

    @Test
    @Transactional
    public void createBusinessWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = businessRepository.findAll().size();

        // Create the Business with an existing ID
        business.setId(1L);
        BusinessDTO businessDTO = businessMapper.toDto(business);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Business in the database
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBusinesses() throws Exception {
        // Initialize the database
        businessRepository.saveAndFlush(business);

        // Get all the businessList
        restBusinessMockMvc.perform(get("/api/businesses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(business.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].mobile").value(hasItem(DEFAULT_MOBILE)))
            .andExpect(jsonPath("$.[*].website").value(hasItem(DEFAULT_WEBSITE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(DEFAULT_LOGO)))
            .andExpect(jsonPath("$.[*].emailFooter").value(hasItem(DEFAULT_EMAIL_FOOTER)))
            .andExpect(jsonPath("$.[*].vatNumber").value(hasItem(DEFAULT_VAT_NUMBER)))
            .andExpect(jsonPath("$.[*].bankName").value(hasItem(DEFAULT_BANK_NAME)))
            .andExpect(jsonPath("$.[*].iban").value(hasItem(DEFAULT_IBAN)))
            .andExpect(jsonPath("$.[*].bic").value(hasItem(DEFAULT_BIC)))
            .andExpect(jsonPath("$.[*].showPatientName").value(hasItem(DEFAULT_SHOW_PATIENT_NAME.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getBusiness() throws Exception {
        // Initialize the database
        businessRepository.saveAndFlush(business);

        // Get the business
        restBusinessMockMvc.perform(get("/api/businesses/{id}", business.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(business.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE))
            .andExpect(jsonPath("$.website").value(DEFAULT_WEBSITE))
            .andExpect(jsonPath("$.logo").value(DEFAULT_LOGO))
            .andExpect(jsonPath("$.emailFooter").value(DEFAULT_EMAIL_FOOTER))
            .andExpect(jsonPath("$.vatNumber").value(DEFAULT_VAT_NUMBER))
            .andExpect(jsonPath("$.bankName").value(DEFAULT_BANK_NAME))
            .andExpect(jsonPath("$.iban").value(DEFAULT_IBAN))
            .andExpect(jsonPath("$.bic").value(DEFAULT_BIC))
            .andExpect(jsonPath("$.showPatientName").value(DEFAULT_SHOW_PATIENT_NAME.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingBusiness() throws Exception {
        // Get the business
        restBusinessMockMvc.perform(get("/api/businesses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBusiness() throws Exception {
        // Initialize the database
        businessRepository.saveAndFlush(business);

        int databaseSizeBeforeUpdate = businessRepository.findAll().size();

        // Update the business
        Business updatedBusiness = businessRepository.findById(business.getId()).get();
        // Disconnect from session so that the updates on updatedBusiness are not directly saved in db
        em.detach(updatedBusiness);
        updatedBusiness
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE)
            .mobile(UPDATED_MOBILE)
            .website(UPDATED_WEBSITE)
            .logo(UPDATED_LOGO)
            .emailFooter(UPDATED_EMAIL_FOOTER)
            .vatNumber(UPDATED_VAT_NUMBER)
            .bankName(UPDATED_BANK_NAME)
            .iban(UPDATED_IBAN)
            .bic(UPDATED_BIC)
            .showPatientName(UPDATED_SHOW_PATIENT_NAME);
        BusinessDTO businessDTO = businessMapper.toDto(updatedBusiness);

        restBusinessMockMvc.perform(put("/api/businesses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessDTO)))
            .andExpect(status().isOk());

        // Validate the Business in the database
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeUpdate);
        Business testBusiness = businessList.get(businessList.size() - 1);
        assertThat(testBusiness.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBusiness.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testBusiness.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testBusiness.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testBusiness.getMobile()).isEqualTo(UPDATED_MOBILE);
        assertThat(testBusiness.getWebsite()).isEqualTo(UPDATED_WEBSITE);
        assertThat(testBusiness.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testBusiness.getEmailFooter()).isEqualTo(UPDATED_EMAIL_FOOTER);
        assertThat(testBusiness.getVatNumber()).isEqualTo(UPDATED_VAT_NUMBER);
        assertThat(testBusiness.getBankName()).isEqualTo(UPDATED_BANK_NAME);
        assertThat(testBusiness.getIban()).isEqualTo(UPDATED_IBAN);
        assertThat(testBusiness.getBic()).isEqualTo(UPDATED_BIC);
        assertThat(testBusiness.isShowPatientName()).isEqualTo(UPDATED_SHOW_PATIENT_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingBusiness() throws Exception {
        int databaseSizeBeforeUpdate = businessRepository.findAll().size();

        // Create the Business
        BusinessDTO businessDTO = businessMapper.toDto(business);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBusinessMockMvc.perform(put("/api/businesses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Business in the database
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBusiness() throws Exception {
        // Initialize the database
        businessRepository.saveAndFlush(business);

        int databaseSizeBeforeDelete = businessRepository.findAll().size();

        // Delete the business
        restBusinessMockMvc.perform(delete("/api/businesses/{id}", business.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
