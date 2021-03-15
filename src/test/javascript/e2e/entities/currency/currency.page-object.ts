import { element, by, ElementFinder } from 'protractor';

export class CurrencyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-currency div table .btn-danger'));
  title = element.all(by.css('jhi-currency div h2#page-heading span')).first();
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

export class CurrencyUpdatePage {
  pageTitle = element(by.id('jhi-currency-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  isoCodeInput = element(by.id('field_isoCode'));
  symbolInput = element(by.id('field_symbol'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setIsoCodeInput(isoCode: string): Promise<void> {
    await this.isoCodeInput.sendKeys(isoCode);
  }

  async getIsoCodeInput(): Promise<string> {
    return await this.isoCodeInput.getAttribute('value');
  }

  async setSymbolInput(symbol: string): Promise<void> {
    await this.symbolInput.sendKeys(symbol);
  }

  async getSymbolInput(): Promise<string> {
    return await this.symbolInput.getAttribute('value');
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

export class CurrencyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-currency-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-currency'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
