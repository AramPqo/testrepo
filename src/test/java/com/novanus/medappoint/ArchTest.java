package com.novanus.medappoint;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.novanus.medappoint");

        noClasses()
            .that()
                .resideInAnyPackage("com.novanus.medappoint.service..")
            .or()
                .resideInAnyPackage("com.novanus.medappoint.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.novanus.medappoint.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
