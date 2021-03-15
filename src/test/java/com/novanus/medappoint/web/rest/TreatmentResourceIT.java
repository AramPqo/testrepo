package com.novanus.medappoint.web.rest;

import com.novanus.medappoint.MedappointApp;
import com.novanus.medappoint.domain.Treatment;
import com.novanus.medappoint.repository.TreatmentRepository;
import com.novanus.medappoint.service.TreatmentService;
import com.novanus.medappoint.service.dto.TreatmentDTO;
import com.novanus.medappoint.service.mapper.TreatmentMapper;

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
 * Integration tests for the {@link TreatmentResource} REST controller.
 */
@SpringBootTest(classes = MedappointApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TreatmentResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_DURATION = 1;
    private static final Integer UPDATED_DURATION = 2;

    @Autowired
    private TreatmentRepository treatmentRepository;

    @Autowired
    private TreatmentMapper treatmentMapper;

    @Autowired
    private TreatmentService treatmentService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTreatmentMockMvc;

    private Treatment treatment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Treatment createEntity(EntityManager em) {
        Treatment treatment = new Treatment()
            .description(DEFAULT_DESCRIPTION)
            .duration(DEFAULT_DURATION);
        return treatment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Treatment createUpdatedEntity(EntityManager em) {
        Treatment treatment = new Treatment()
            .description(UPDATED_DESCRIPTION)
            .duration(UPDATED_DURATION);
        return treatment;
    }

    @BeforeEach
    public void initTest() {
        treatment = createEntity(em);
    }

    @Test
    @Transactional
    public void createTreatment() throws Exception {
        int databaseSizeBeforeCreate = treatmentRepository.findAll().size();
        // Create the Treatment
        TreatmentDTO treatmentDTO = treatmentMapper.toDto(treatment);
        restTreatmentMockMvc.perform(post("/api/treatments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(treatmentDTO)))
            .andExpect(status().isCreated());

        // Validate the Treatment in the database
        List<Treatment> treatmentList = treatmentRepository.findAll();
        assertThat(treatmentList).hasSize(databaseSizeBeforeCreate + 1);
        Treatment testTreatment = treatmentList.get(treatmentList.size() - 1);
        assertThat(testTreatment.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTreatment.getDuration()).isEqualTo(DEFAULT_DURATION);
    }

    @Test
    @Transactional
    public void createTreatmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = treatmentRepository.findAll().size();

        // Create the Treatment with an existing ID
        treatment.setId(1L);
        TreatmentDTO treatmentDTO = treatmentMapper.toDto(treatment);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTreatmentMockMvc.perform(post("/api/treatments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(treatmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Treatment in the database
        List<Treatment> treatmentList = treatmentRepository.findAll();
        assertThat(treatmentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTreatments() throws Exception {
        // Initialize the database
        treatmentRepository.saveAndFlush(treatment);

        // Get all the treatmentList
        restTreatmentMockMvc.perform(get("/api/treatments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(treatment.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION)));
    }
    
    @Test
    @Transactional
    public void getTreatment() throws Exception {
        // Initialize the database
        treatmentRepository.saveAndFlush(treatment);

        // Get the treatment
        restTreatmentMockMvc.perform(get("/api/treatments/{id}", treatment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(treatment.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION));
    }
    @Test
    @Transactional
    public void getNonExistingTreatment() throws Exception {
        // Get the treatment
        restTreatmentMockMvc.perform(get("/api/treatments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTreatment() throws Exception {
        // Initialize the database
        treatmentRepository.saveAndFlush(treatment);

        int databaseSizeBeforeUpdate = treatmentRepository.findAll().size();

        // Update the treatment
        Treatment updatedTreatment = treatmentRepository.findById(treatment.getId()).get();
        // Disconnect from session so that the updates on updatedTreatment are not directly saved in db
        em.detach(updatedTreatment);
        updatedTreatment
            .description(UPDATED_DESCRIPTION)
            .duration(UPDATED_DURATION);
        TreatmentDTO treatmentDTO = treatmentMapper.toDto(updatedTreatment);

        restTreatmentMockMvc.perform(put("/api/treatments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(treatmentDTO)))
            .andExpect(status().isOk());

        // Validate the Treatment in the database
        List<Treatment> treatmentList = treatmentRepository.findAll();
        assertThat(treatmentList).hasSize(databaseSizeBeforeUpdate);
        Treatment testTreatment = treatmentList.get(treatmentList.size() - 1);
        assertThat(testTreatment.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTreatment.getDuration()).isEqualTo(UPDATED_DURATION);
    }

    @Test
    @Transactional
    public void updateNonExistingTreatment() throws Exception {
        int databaseSizeBeforeUpdate = treatmentRepository.findAll().size();

        // Create the Treatment
        TreatmentDTO treatmentDTO = treatmentMapper.toDto(treatment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTreatmentMockMvc.perform(put("/api/treatments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(treatmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Treatment in the database
        List<Treatment> treatmentList = treatmentRepository.findAll();
        assertThat(treatmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTreatment() throws Exception {
        // Initialize the database
        treatmentRepository.saveAndFlush(treatment);

        int databaseSizeBeforeDelete = treatmentRepository.findAll().size();

        // Delete the treatment
        restTreatmentMockMvc.perform(delete("/api/treatments/{id}", treatment.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Treatment> treatmentList = treatmentRepository.findAll();
        assertThat(treatmentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
