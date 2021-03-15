package com.novanus.medappoint.web.rest;

import com.novanus.medappoint.MedappointApp;
import com.novanus.medappoint.domain.OpeningHours;
import com.novanus.medappoint.repository.OpeningHoursRepository;
import com.novanus.medappoint.service.OpeningHoursService;
import com.novanus.medappoint.service.dto.OpeningHoursDTO;
import com.novanus.medappoint.service.mapper.OpeningHoursMapper;

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

import com.novanus.medappoint.domain.enumeration.DayOfWeek;
/**
 * Integration tests for the {@link OpeningHoursResource} REST controller.
 */
@SpringBootTest(classes = MedappointApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class OpeningHoursResourceIT {

    private static final DayOfWeek DEFAULT_DAY_OF_WEEK = DayOfWeek.MONDAY;
    private static final DayOfWeek UPDATED_DAY_OF_WEEK = DayOfWeek.TUESDAY;

    private static final String DEFAULT_START_TIME = "AAAAAAAAAA";
    private static final String UPDATED_START_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_END_TIME = "AAAAAAAAAA";
    private static final String UPDATED_END_TIME = "BBBBBBBBBB";

    @Autowired
    private OpeningHoursRepository openingHoursRepository;

    @Autowired
    private OpeningHoursMapper openingHoursMapper;

    @Autowired
    private OpeningHoursService openingHoursService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOpeningHoursMockMvc;

    private OpeningHours openingHours;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OpeningHours createEntity(EntityManager em) {
        OpeningHours openingHours = new OpeningHours()
            .dayOfWeek(DEFAULT_DAY_OF_WEEK)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME);
        return openingHours;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OpeningHours createUpdatedEntity(EntityManager em) {
        OpeningHours openingHours = new OpeningHours()
            .dayOfWeek(UPDATED_DAY_OF_WEEK)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME);
        return openingHours;
    }

    @BeforeEach
    public void initTest() {
        openingHours = createEntity(em);
    }

    @Test
    @Transactional
    public void createOpeningHours() throws Exception {
        int databaseSizeBeforeCreate = openingHoursRepository.findAll().size();
        // Create the OpeningHours
        OpeningHoursDTO openingHoursDTO = openingHoursMapper.toDto(openingHours);
        restOpeningHoursMockMvc.perform(post("/api/opening-hours")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(openingHoursDTO)))
            .andExpect(status().isCreated());

        // Validate the OpeningHours in the database
        List<OpeningHours> openingHoursList = openingHoursRepository.findAll();
        assertThat(openingHoursList).hasSize(databaseSizeBeforeCreate + 1);
        OpeningHours testOpeningHours = openingHoursList.get(openingHoursList.size() - 1);
        assertThat(testOpeningHours.getDayOfWeek()).isEqualTo(DEFAULT_DAY_OF_WEEK);
        assertThat(testOpeningHours.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testOpeningHours.getEndTime()).isEqualTo(DEFAULT_END_TIME);
    }

    @Test
    @Transactional
    public void createOpeningHoursWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = openingHoursRepository.findAll().size();

        // Create the OpeningHours with an existing ID
        openingHours.setId(1L);
        OpeningHoursDTO openingHoursDTO = openingHoursMapper.toDto(openingHours);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOpeningHoursMockMvc.perform(post("/api/opening-hours")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(openingHoursDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OpeningHours in the database
        List<OpeningHours> openingHoursList = openingHoursRepository.findAll();
        assertThat(openingHoursList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOpeningHours() throws Exception {
        // Initialize the database
        openingHoursRepository.saveAndFlush(openingHours);

        // Get all the openingHoursList
        restOpeningHoursMockMvc.perform(get("/api/opening-hours?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(openingHours.getId().intValue())))
            .andExpect(jsonPath("$.[*].dayOfWeek").value(hasItem(DEFAULT_DAY_OF_WEEK.toString())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME)))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME)));
    }
    
    @Test
    @Transactional
    public void getOpeningHours() throws Exception {
        // Initialize the database
        openingHoursRepository.saveAndFlush(openingHours);

        // Get the openingHours
        restOpeningHoursMockMvc.perform(get("/api/opening-hours/{id}", openingHours.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(openingHours.getId().intValue()))
            .andExpect(jsonPath("$.dayOfWeek").value(DEFAULT_DAY_OF_WEEK.toString()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME));
    }
    @Test
    @Transactional
    public void getNonExistingOpeningHours() throws Exception {
        // Get the openingHours
        restOpeningHoursMockMvc.perform(get("/api/opening-hours/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOpeningHours() throws Exception {
        // Initialize the database
        openingHoursRepository.saveAndFlush(openingHours);

        int databaseSizeBeforeUpdate = openingHoursRepository.findAll().size();

        // Update the openingHours
        OpeningHours updatedOpeningHours = openingHoursRepository.findById(openingHours.getId()).get();
        // Disconnect from session so that the updates on updatedOpeningHours are not directly saved in db
        em.detach(updatedOpeningHours);
        updatedOpeningHours
            .dayOfWeek(UPDATED_DAY_OF_WEEK)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME);
        OpeningHoursDTO openingHoursDTO = openingHoursMapper.toDto(updatedOpeningHours);

        restOpeningHoursMockMvc.perform(put("/api/opening-hours")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(openingHoursDTO)))
            .andExpect(status().isOk());

        // Validate the OpeningHours in the database
        List<OpeningHours> openingHoursList = openingHoursRepository.findAll();
        assertThat(openingHoursList).hasSize(databaseSizeBeforeUpdate);
        OpeningHours testOpeningHours = openingHoursList.get(openingHoursList.size() - 1);
        assertThat(testOpeningHours.getDayOfWeek()).isEqualTo(UPDATED_DAY_OF_WEEK);
        assertThat(testOpeningHours.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testOpeningHours.getEndTime()).isEqualTo(UPDATED_END_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingOpeningHours() throws Exception {
        int databaseSizeBeforeUpdate = openingHoursRepository.findAll().size();

        // Create the OpeningHours
        OpeningHoursDTO openingHoursDTO = openingHoursMapper.toDto(openingHours);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOpeningHoursMockMvc.perform(put("/api/opening-hours")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(openingHoursDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OpeningHours in the database
        List<OpeningHours> openingHoursList = openingHoursRepository.findAll();
        assertThat(openingHoursList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOpeningHours() throws Exception {
        // Initialize the database
        openingHoursRepository.saveAndFlush(openingHours);

        int databaseSizeBeforeDelete = openingHoursRepository.findAll().size();

        // Delete the openingHours
        restOpeningHoursMockMvc.perform(delete("/api/opening-hours/{id}", openingHours.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OpeningHours> openingHoursList = openingHoursRepository.findAll();
        assertThat(openingHoursList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
