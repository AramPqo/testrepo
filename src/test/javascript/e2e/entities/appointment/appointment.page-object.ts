import { element, by, ElementFinder } from 'protractor';

export class AppointmentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-appointment div table .btn-danger'));
  title = element.all(by.css('jhi-appointment div h2#page-heading span')).first();
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

export class AppointmentUpdatePage {
  pageTitle = element(by.id('jhi-appointment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));
  titleInput = element(by.id('field_title'));
  cancelledInput = element(by.id('field_cancelled'));
  colorCodeInput = element(by.id('field_colorCode'));
  missedInput = element(by.id('field_missed'));
  notesInput = element(by.id('field_notes'));

  userSelect = element(by.id('field_user'));
  patientSelect = element(by.id('field_patient'));
  treatmentSelect = element(by.id('field_treatment'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStartDateInput(startDate: string): Promise<void> {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput(): Promise<string> {
    return await this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate: string): Promise<void> {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput(): Promise<string> {
    return await this.endDateInput.getAttribute('value');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  getCancelledInput(): ElementFinder {
    return this.cancelledInput;
  }

  async setColorCodeInput(colorCode: string): Promise<void> {
    await this.colorCodeInput.sendKeys(colorCode);
  }

  async getColorCodeInput(): Promise<string> {
    return await this.colorCodeInput.getAttribute('value');
  }

  getMissedInput(): ElementFinder {
    return this.missedInput;
  }

  async setNotesInput(notes: string): Promise<void> {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput(): Promise<string> {
    return await this.notesInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async patientSelectLastOption(): Promise<void> {
    await this.patientSelect.all(by.tagName('option')).last().click();
  }

  async patientSelectOption(option: string): Promise<void> {
    await this.patientSelect.sendKeys(option);
  }

  getPatientSelect(): ElementFinder {
    return this.patientSelect;
  }

  async getPatientSelectedOption(): Promise<string> {
    return await this.patientSelect.element(by.css('option:checked')).getText();
  }

  async treatmentSelectLastOption(): Promise<void> {
    await this.treatmentSelect.all(by.tagName('option')).last().click();
  }

  async treatmentSelectOption(option: string): Promise<void> {
    await this.treatmentSelect.sendKeys(option);
  }

  getTreatmentSelect(): ElementFinder {
    return this.treatmentSelect;
  }

  async getTreatmentSelectedOption(): Promise<string> {
    return await this.treatmentSelect.element(by.css('option:checked')).getText();
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

export class AppointmentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-appointment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-appointment'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
