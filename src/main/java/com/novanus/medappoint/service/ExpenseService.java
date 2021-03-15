package com.novanus.medappoint.service;

import com.novanus.medappoint.service.dto.ExpenseDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.novanus.medappoint.domain.Expense}.
 */
public interface ExpenseService {

    /**
     * Save a expense.
     *
     * @param expenseDTO the entity to save.
     * @return the persisted entity.
     */
    ExpenseDTO save(ExpenseDTO expenseDTO);

    /**
     * Get all the expenses.
     *
     * @return the list of entities.
     */
    List<ExpenseDTO> findAll();


    /**
     * Get the "id" expense.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ExpenseDTO> findOne(Long id);

    /**
     * Delete the "id" expense.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
