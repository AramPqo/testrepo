package com.novanus.medappoint.web.rest;

import com.novanus.medappoint.MedappointApp;
import com.novanus.medappoint.domain.Insurer;
import com.novanus.medappoint.repository.InsurerRepository;
import com.novanus.medappoint.service.InsurerService;
import com.novanus.medappoint.service.dto.InsurerDTO;
import com.novanus.medappoint.service.mapper.InsurerMapper;

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
 * Integration tests for the {@link InsurerResource} REST controller.
 */
@SpringBootTest(classes = MedappointApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class InsurerResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ABBR = "AAAAAAAAAA";
    private static final String UPDATED_ABBR = "BBBBBBBBBB";

    @Autowired
    private InsurerRepository insurerRepository;

    @Autowired
    private InsurerMapper insurerMapper;

    @Autowired
    private InsurerService insurerService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInsurerMockMvc;

    private Insurer insurer;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Insurer createEntity(EntityManager em) {
        Insurer insurer = new Insurer()
            .name(DEFAULT_NAME)
            .abbr(DEFAULT_ABBR);
        return insurer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Insurer createUpdatedEntity(EntityManager em) {
        Insurer insurer = new Insurer()
            .name(UPDATED_NAME)
            .abbr(UPDATED_ABBR);
        return insurer;
    }

    @BeforeEach
    public void initTest() {
        insurer = createEntity(em);
    }

    @Test
    @Transactional
    public void createInsurer() throws Exception {
        int databaseSizeBeforeCreate = insurerRepository.findAll().size();
        // Create the Insurer
        InsurerDTO insurerDTO = insurerMapper.toDto(insurer);
        restInsurerMockMvc.perform(post("/api/insurers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(insurerDTO)))
            .andExpect(status().isCreated());

        // Validate the Insurer in the database
        List<Insurer> insurerList = insurerRepository.findAll();
        assertThat(insurerList).hasSize(databaseSizeBeforeCreate + 1);
        Insurer testInsurer = insurerList.get(insurerList.size() - 1);
        assertThat(testInsurer.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testInsurer.getAbbr()).isEqualTo(DEFAULT_ABBR);
    }

    @Test
    @Transactional
    public void createInsurerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = insurerRepository.findAll().size();

        // Create the Insurer with an existing ID
        insurer.setId(1L);
        InsurerDTO insurerDTO = insurerMapper.toDto(insurer);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInsurerMockMvc.perform(post("/api/insurers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(insurerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Insurer in the database
        List<Insurer> insurerList = insurerRepository.findAll();
        assertThat(insurerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = insurerRepository.findAll().size();
        // set the field null
        insurer.setName(null);

        // Create the Insurer, which fails.
        InsurerDTO insurerDTO = insurerMapper.toDto(insurer);


        restInsurerMockMvc.perform(post("/api/insurers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(insurerDTO)))
            .andExpect(status().isBadRequest());

        List<Insurer> insurerList = insurerRepository.findAll();
        assertThat(insurerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInsurers() throws Exception {
        // Initialize the database
        insurerRepository.saveAndFlush(insurer);

        // Get all the insurerList
        restInsurerMockMvc.perform(get("/api/insurers?sort=id,desc&search=" + insurer.getName()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(insurer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].abbr").value(hasItem(DEFAULT_ABBR)));

        // no matches
        restInsurerMockMvc.perform(get("/api/insurers?search=keywordNotFound"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(content().string ("[]"));
    }
    
    @Test
    @Transactional
    public void getInsurer() throws Exception {
        // Initialize the database
        insurerRepository.saveAndFlush(insurer);

        // Get the insurer
        restInsurerMockMvc.perform(get("/api/insurers/{id}", insurer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(insurer.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.abbr").value(DEFAULT_ABBR));
    }
    @Test
    @Transactional
    public void getNonExistingInsurer() throws Exception {
        // Get the insurer
        restInsurerMockMvc.perform(get("/api/insurers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInsurer() throws Exception {
        // Initialize the database
        insurerRepository.saveAndFlush(insurer);

        int databaseSizeBeforeUpdate = insurerRepository.findAll().size();

        // Update the insurer
        Insurer updatedInsurer = insurerRepository.findById(insurer.getId()).get();
        // Disconnect from session so that the updates on updatedInsurer are not directly saved in db
        em.detach(updatedInsurer);
        updatedInsurer
            .name(UPDATED_NAME)
            .abbr(UPDATED_ABBR);
        InsurerDTO insurerDTO = insurerMapper.toDto(updatedInsurer);

        restInsurerMockMvc.perform(put("/api/insurers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(insurerDTO)))
            .andExpect(status().isOk());

        // Validate the Insurer in the database
        List<Insurer> insurerList = insurerRepository.findAll();
        assertThat(insurerList).hasSize(databaseSizeBeforeUpdate);
        Insurer testInsurer = insurerList.get(insurerList.size() - 1);
        assertThat(testInsurer.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testInsurer.getAbbr()).isEqualTo(UPDATED_ABBR);
    }

    @Test
    @Transactional
    public void updateNonExistingInsurer() throws Exception {
        int databaseSizeBeforeUpdate = insurerRepository.findAll().size();

        // Create the Insurer
        InsurerDTO insurerDTO = insurerMapper.toDto(insurer);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInsurerMockMvc.perform(put("/api/insurers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(insurerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Insurer in the database
        List<Insurer> insurerList = insurerRepository.findAll();
        assertThat(insurerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInsurer() throws Exception {
        // Initialize the database
        insurerRepository.saveAndFlush(insurer);

        int databaseSizeBeforeDelete = insurerRepository.findAll().size();

        // Delete the insurer
        restInsurerMockMvc.perform(delete("/api/insurers/{id}", insurer.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Insurer> insurerList = insurerRepository.findAll();
        assertThat(insurerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
