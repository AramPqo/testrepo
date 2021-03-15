import { element, by, ElementFinder } from 'protractor';

export class RemarkComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-remark div table .btn-danger'));
  title = element.all(by.css('jhi-remark div h2#page-heading span')).first();
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

export class RemarkUpdatePage {
  pageTitle = element(by.id('jhi-remark-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  createdAtInput = element(by.id('field_createdAt'));
  colorCodeInput = element(by.id('field_colorCode'));
  titleInput = element(by.id('field_title'));
  contentInput = element(by.id('field_content'));

  patientSelect = element(by.id('field_patient'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCreatedAtInput(createdAt: string): Promise<void> {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput(): Promise<string> {
    return await this.createdAtInput.getAttribute('value');
  }

  async setColorCodeInput(colorCode: string): Promise<void> {
    await this.colorCodeInput.sendKeys(colorCode);
  }

  async getColorCodeInput(): Promise<string> {
    return await this.colorCodeInput.getAttribute('value');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setContentInput(content: string): Promise<void> {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput(): Promise<string> {
    return await this.contentInput.getAttribute('value');
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

export class RemarkDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-remark-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-remark'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
