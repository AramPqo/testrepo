import { element, by, ElementFinder } from 'protractor';

export class BusinessComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-business div table .btn-danger'));
  title = element.all(by.css('jhi-business div h2#page-heading span')).first();
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

export class BusinessUpdatePage {
  pageTitle = element(by.id('jhi-business-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
  emailInput = element(by.id('field_email'));
  phoneInput = element(by.id('field_phone'));
  mobileInput = element(by.id('field_mobile'));
  websiteInput = element(by.id('field_website'));
  logoInput = element(by.id('field_logo'));
  emailFooterInput = element(by.id('field_emailFooter'));
  vatNumberInput = element(by.id('field_vatNumber'));
  bankNameInput = element(by.id('field_bankName'));
  ibanInput = element(by.id('field_iban'));
  bicInput = element(by.id('field_bic'));

  currencySelect = element(by.id('field_currency'));
  locationSelect = element(by.id('field_location'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
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

  async setWebsiteInput(website: string): Promise<void> {
    await this.websiteInput.sendKeys(website);
  }

  async getWebsiteInput(): Promise<string> {
    return await this.websiteInput.getAttribute('value');
  }

  async setLogoInput(logo: string): Promise<void> {
    await this.logoInput.sendKeys(logo);
  }

  async getLogoInput(): Promise<string> {
    return await this.logoInput.getAttribute('value');
  }

  async setEmailFooterInput(emailFooter: string): Promise<void> {
    await this.emailFooterInput.sendKeys(emailFooter);
  }

  async getEmailFooterInput(): Promise<string> {
    return await this.emailFooterInput.getAttribute('value');
  }

  async setVatNumberInput(vatNumber: string): Promise<void> {
    await this.vatNumberInput.sendKeys(vatNumber);
  }

  async getVatNumberInput(): Promise<string> {
    return await this.vatNumberInput.getAttribute('value');
  }

  async setBankNameInput(bankName: string): Promise<void> {
    await this.bankNameInput.sendKeys(bankName);
  }

  async getBankNameInput(): Promise<string> {
    return await this.bankNameInput.getAttribute('value');
  }

  async setIbanInput(iban: string): Promise<void> {
    await this.ibanInput.sendKeys(iban);
  }

  async getIbanInput(): Promise<string> {
    return await this.ibanInput.getAttribute('value');
  }

  async setBicInput(bic: string): Promise<void> {
    await this.bicInput.sendKeys(bic);
  }

  async getBicInput(): Promise<string> {
    return await this.bicInput.getAttribute('value');
  }

  async currencySelectLastOption(): Promise<void> {
    await this.currencySelect.all(by.tagName('option')).last().click();
  }

  async currencySelectOption(option: string): Promise<void> {
    await this.currencySelect.sendKeys(option);
  }

  getCurrencySelect(): ElementFinder {
    return this.currencySelect;
  }

  async getCurrencySelectedOption(): Promise<string> {
    return await this.currencySelect.element(by.css('option:checked')).getText();
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

export class BusinessDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-business-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-business'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
