import { element, by, ElementFinder } from 'protractor';

export class TreatmentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-treatment div table .btn-danger'));
  title = element.all(by.css('jhi-treatment div h2#page-heading span')).first();
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

export class TreatmentUpdatePage {
  pageTitle = element(by.id('jhi-treatment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  descriptionInput = element(by.id('field_description'));
  durationInput = element(by.id('field_duration'));
  colorCodeInput = element(by.id('field_colorCode'));

  businessSelect = element(by.id('field_business'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setDurationInput(duration: string): Promise<void> {
    await this.durationInput.sendKeys(duration);
  }

  async getDurationInput(): Promise<string> {
    return await this.durationInput.getAttribute('value');
  }

  async setColorCodeInput(colorCode: string): Promise<void> {
    await this.colorCodeInput.sendKeys(colorCode);
  }

  async getColorCodeInput(): Promise<string> {
    return await this.colorCodeInput.getAttribute('value');
  }

  async businessSelectLastOption(): Promise<void> {
    await this.businessSelect.all(by.tagName('option')).last().click();
  }

  async businessSelectOption(option: string): Promise<void> {
    await this.businessSelect.sendKeys(option);
  }

  getBusinessSelect(): ElementFinder {
    return this.businessSelect;
  }

  async getBusinessSelectedOption(): Promise<string> {
    return await this.businessSelect.element(by.css('option:checked')).getText();
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

export class TreatmentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-treatment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-treatment'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
