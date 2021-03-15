package com.novanus.medappoint.web.rest;

import com.novanus.medappoint.MedappointApp;
import com.novanus.medappoint.domain.Remark;
import com.novanus.medappoint.repository.RemarkRepository;
import com.novanus.medappoint.service.RemarkService;
import com.novanus.medappoint.service.dto.RemarkDTO;
import com.novanus.medappoint.service.mapper.RemarkMapper;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RemarkResource} REST controller.
 */
@SpringBootTest(classes = MedappointApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RemarkResourceIT {

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_COLOR_CODE = "AAAAAAAAAA";
    private static final String UPDATED_COLOR_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private RemarkRepository remarkRepository;

    @Autowired
    private RemarkMapper remarkMapper;

    @Autowired
    private RemarkService remarkService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRemarkMockMvc;

    private Remark remark;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Remark createEntity(EntityManager em) {
        Remark remark = new Remark()
            .createdAt(DEFAULT_CREATED_AT)
            .colorCode(DEFAULT_COLOR_CODE)
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT);
        return remark;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Remark createUpdatedEntity(EntityManager em) {
        Remark remark = new Remark()
            .createdAt(UPDATED_CREATED_AT)
            .colorCode(UPDATED_COLOR_CODE)
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT);
        return remark;
    }

    @BeforeEach
    public void initTest() {
        remark = createEntity(em);
    }

    @Test
    @Transactional
    public void createRemark() throws Exception {
        int databaseSizeBeforeCreate = remarkRepository.findAll().size();
        // Create the Remark
        RemarkDTO remarkDTO = remarkMapper.toDto(remark);
        restRemarkMockMvc.perform(post("/api/remarks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(remarkDTO)))
            .andExpect(status().isCreated());

        // Validate the Remark in the database
        List<Remark> remarkList = remarkRepository.findAll();
        assertThat(remarkList).hasSize(databaseSizeBeforeCreate + 1);
        Remark testRemark = remarkList.get(remarkList.size() - 1);
        assertThat(testRemark.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testRemark.getColorCode()).isEqualTo(DEFAULT_COLOR_CODE);
        assertThat(testRemark.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testRemark.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createRemarkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = remarkRepository.findAll().size();

        // Create the Remark with an existing ID
        remark.setId(1L);
        RemarkDTO remarkDTO = remarkMapper.toDto(remark);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRemarkMockMvc.perform(post("/api/remarks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(remarkDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Remark in the database
        List<Remark> remarkList = remarkRepository.findAll();
        assertThat(remarkList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRemarks() throws Exception {
        // Initialize the database
        remarkRepository.saveAndFlush(remark);

        // Get all the remarkList
        restRemarkMockMvc.perform(get("/api/remarks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(remark.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].colorCode").value(hasItem(DEFAULT_COLOR_CODE)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)));
    }
    
    @Test
    @Transactional
    public void getRemark() throws Exception {
        // Initialize the database
        remarkRepository.saveAndFlush(remark);

        // Get the remark
        restRemarkMockMvc.perform(get("/api/remarks/{id}", remark.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(remark.getId().intValue()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.colorCode").value(DEFAULT_COLOR_CODE))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT));
    }
    @Test
    @Transactional
    public void getNonExistingRemark() throws Exception {
        // Get the remark
        restRemarkMockMvc.perform(get("/api/remarks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRemark() throws Exception {
        // Initialize the database
        remarkRepository.saveAndFlush(remark);

        int databaseSizeBeforeUpdate = remarkRepository.findAll().size();

        // Update the remark
        Remark updatedRemark = remarkRepository.findById(remark.getId()).get();
        // Disconnect from session so that the updates on updatedRemark are not directly saved in db
        em.detach(updatedRemark);
        updatedRemark
            .createdAt(UPDATED_CREATED_AT)
            .colorCode(UPDATED_COLOR_CODE)
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT);
        RemarkDTO remarkDTO = remarkMapper.toDto(updatedRemark);

        restRemarkMockMvc.perform(put("/api/remarks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(remarkDTO)))
            .andExpect(status().isOk());

        // Validate the Remark in the database
        List<Remark> remarkList = remarkRepository.findAll();
        assertThat(remarkList).hasSize(databaseSizeBeforeUpdate);
        Remark testRemark = remarkList.get(remarkList.size() - 1);
        assertThat(testRemark.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRemark.getColorCode()).isEqualTo(UPDATED_COLOR_CODE);
        assertThat(testRemark.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testRemark.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingRemark() throws Exception {
        int databaseSizeBeforeUpdate = remarkRepository.findAll().size();

        // Create the Remark
        RemarkDTO remarkDTO = remarkMapper.toDto(remark);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRemarkMockMvc.perform(put("/api/remarks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(remarkDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Remark in the database
        List<Remark> remarkList = remarkRepository.findAll();
        assertThat(remarkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRemark() throws Exception {
        // Initialize the database
        remarkRepository.saveAndFlush(remark);

        int databaseSizeBeforeDelete = remarkRepository.findAll().size();

        // Delete the remark
        restRemarkMockMvc.perform(delete("/api/remarks/{id}", remark.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Remark> remarkList = remarkRepository.findAll();
        assertThat(remarkList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
