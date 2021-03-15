import { element, by, ElementFinder } from 'protractor';

export class PatientComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-patient div table .btn-danger'));
  title = element.all(by.css('jhi-patient div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PatientUpdatePage {
  pageTitle = element(by.id('jhi-patient-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  firstNameInput = element(by.id('field_firstName'));
  lastNameInput = element(by.id('field_lastName'));
  titleInput = element(by.id('field_title'));
  genderSelect = element(by.id('field_gender'));
  dateOfBirthInput = element(by.id('field_dateOfBirth'));
  emailInput = element(by.id('field_email'));
  phoneInput = element(by.id('field_phone'));
  mobileInput = element(by.id('field_mobile'));
  languageSelect = element(by.id('field_language'));
  insuranceNumberInput = element(by.id('field_insuranceNumber'));
  occupationInput = element(by.id('field_occupation'));
  employerInput = element(by.id('field_employer'));
  initialDiagnoseInput = element(by.id('field_initialDiagnose'));

  locationSelect = element(by.id('field_location'));
  insurerSelect = element(by.id('field_insurer'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFirstNameInput(firstName: string): Promise<void> {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput(): Promise<string> {
    return await this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName: string): Promise<void> {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput(): Promise<string> {
    return await this.lastNameInput.getAttribute('value');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setGenderSelect(gender: string): Promise<void> {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect(): Promise<string> {
    return await this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption(): Promise<void> {
    await this.genderSelect.all(by.tagName('option')).last().click();
  }

  async setDateOfBirthInput(dateOfBirth: string): Promise<void> {
    await this.dateOfBirthInput.sendKeys(dateOfBirth);
  }

  async getDateOfBirthInput(): Promise<string> {
    return await this.dateOfBirthInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setPhoneInput(phone: string): Promise<void> {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput(): Promise<string> {
    return await this.phoneInput.getAttribute('value');
  }

  async setMobileInput(mobile: string): Promise<void> {
    await this.mobileInput.sendKeys(mobile);
  }

  async getMobileInput(): Promise<string> {
    return await this.mobileInput.getAttribute('value');
  }

  async setLanguageSelect(language: string): Promise<void> {
    await this.languageSelect.sendKeys(language);
  }

  async getLanguageSelect(): Promise<string> {
    return await this.languageSelect.element(by.css('option:checked')).getText();
  }

  async languageSelectLastOption(): Promise<void> {
    await this.languageSelect.all(by.tagName('option')).last().click();
  }

  async setInsuranceNumberInput(insuranceNumber: string): Promise<void> {
    await this.insuranceNumberInput.sendKeys(insuranceNumber);
  }

  async getInsuranceNumberInput(): Promise<string> {
    return await this.insuranceNumberInput.getAttribute('value');
  }

  async setOccupationInput(occupation: string): Promise<void> {
    await this.occupationInput.sendKeys(occupation);
  }

  async getOccupationInput(): Promise<string> {
    return await this.occupationInput.getAttribute('value');
  }

  async setEmployerInput(employer: string): Promise<void> {
    await this.employerInput.sendKeys(employer);
  }

  async getEmployerInput(): Promise<string> {
    return await this.employerInput.getAttribute('value');
  }

  async setInitialDiagnoseInput(initialDiagnose: string): Promise<void> {
    await this.initialDiagnoseInput.sendKeys(initialDiagnose);
  }

  async getInitialDiagnoseInput(): Promise<string> {
    return await this.initialDiagnoseInput.getAttribute('value');
  }

  async locationSelectLastOption(): Promise<void> {
    await this.locationSelect.all(by.tagName('option')).last().click();
  }

  async locationSelectOption(option: string): Promise<void> {
    await this.locationSelect.sendKeys(option);
  }

  getLocationSelect(): ElementFinder {
    return this.locationSelect;
  }

  async getLocationSelectedOption(): Promise<string> {
    return await this.locationSelect.element(by.css('option:checked')).getText();
  }

  async insurerSelectLastOption(): Promise<void> {
    await this.insurerSelect.all(by.tagName('option')).last().click();
  }

  async insurerSelectOption(option: string): Promise<void> {
    await this.insurerSelect.sendKeys(option);
  }

  getInsurerSelect(): ElementFinder {
    return this.insurerSelect;
  }

  async getInsurerSelectedOption(): Promise<string> {
    return await this.insurerSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PatientDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-patient-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-patient'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
