import { element, by, ElementFinder } from 'protractor';

export class OpeningHoursComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-opening-hours div table .btn-danger'));
  title = element.all(by.css('jhi-opening-hours div h2#page-heading span')).first();
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

export class OpeningHoursUpdatePage {
  pageTitle = element(by.id('jhi-opening-hours-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dayOfWeekSelect = element(by.id('field_dayOfWeek'));
  startTimeInput = element(by.id('field_startTime'));
  endTimeInput = element(by.id('field_endTime'));

  businessSelect = element(by.id('field_business'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDayOfWeekSelect(dayOfWeek: string): Promise<void> {
    await this.dayOfWeekSelect.sendKeys(dayOfWeek);
  }

  async getDayOfWeekSelect(): Promise<string> {
    return await this.dayOfWeekSelect.element(by.css('option:checked')).getText();
  }

  async dayOfWeekSelectLastOption(): Promise<void> {
    await this.dayOfWeekSelect.all(by.tagName('option')).last().click();
  }

  async setStartTimeInput(startTime: string): Promise<void> {
    await this.startTimeInput.sendKeys(startTime);
  }

  async getStartTimeInput(): Promise<string> {
    return await this.startTimeInput.getAttribute('value');
  }

  async setEndTimeInput(endTime: string): Promise<void> {
    await this.endTimeInput.sendKeys(endTime);
  }

  async getEndTimeInput(): Promise<string> {
    return await this.endTimeInput.getAttribute('value');
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

export class OpeningHoursDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-openingHours-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-openingHours'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
