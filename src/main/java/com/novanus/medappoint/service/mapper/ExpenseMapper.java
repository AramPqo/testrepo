package com.novanus.medappoint.service.mapper;

import com.novanus.medappoint.domain.Expense;
import com.novanus.medappoint.service.dto.ExpenseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link Expense} and its DTO {@link ExpenseDTO}.
 */
@Mapper(componentModel = "spring", uses = {ExpenseMapper.class, BusinessMapper.class})
public interface ExpenseMapper extends EntityMapper<ExpenseDTO, Expense> {

    @Mapping(source = "business.id", target = "businessId")
    ExpenseDTO toDto(Expense expense);

    @Mapping(source = "businessId", target = "business")
    Expense toEntity(ExpenseDTO expenseDTO);

    default Expense fromId(Long id) {
        if (id == null) {
            return null;
        }
        Expense expense = new Expense();
        expense.setId(id);
        return expense;
    }
}
