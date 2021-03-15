import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BusinessComponentsPage, BusinessDeleteDialog, BusinessUpdatePage } from './business.page-object';

const expect = chai.expect;

describe('Business e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let businessComponentsPage: BusinessComponentsPage;
  let businessUpdatePage: BusinessUpdatePage;
  let businessDeleteDialog: BusinessDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Businesses', async () => {
    await navBarPage.goToEntity('business');
    businessComponentsPage = new BusinessComponentsPage();
    await browser.wait(ec.visibilityOf(businessComponentsPage.title), 5000);
    expect(await businessComponentsPage.getTitle()).to.eq('medappointApp.business.home.title');
    await browser.wait(ec.or(ec.visibilityOf(businessComponentsPage.entities), ec.visibilityOf(businessComponentsPage.noResult)), 1000);
  });

  it('should load create Business page', async () => {
    await businessComponentsPage.clickOnCreateButton();
    businessUpdatePage = new BusinessUpdatePage();
    expect(await businessUpdatePage.getPageTitle()).to.eq('medappointApp.business.home.createOrEditLabel');
    await businessUpdatePage.cancel();
  });

  it('should create and save Businesses', async () => {
    const nbButtonsBeforeCreate = await businessComponentsPage.countDeleteButtons();

    await businessComponentsPage.clickOnCreateButton();

    await promise.all([
      businessUpdatePage.setNameInput('name'),
      businessUpdatePage.setDescriptionInput('description'),
      businessUpdatePage.setEmailInput('email'),
      businessUpdatePage.setPhoneInput('phone'),
      businessUpdatePage.setMobileInput('mobile'),
      businessUpdatePage.setWebsiteInput('website'),
      businessUpdatePage.setLogoInput('logo'),
      businessUpdatePage.setEmailFooterInput('emailFooter'),
      businessUpdatePage.setVatNumberInput('vatNumber'),
      businessUpdatePage.setBankNameInput('bankName'),
      businessUpdatePage.setIbanInput('iban'),
      businessUpdatePage.setBicInput('bic'),
      businessUpdatePage.currencySelectLastOption(),
      businessUpdatePage.locationSelectLastOption(),
    ]);

    expect(await businessUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await businessUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await businessUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await businessUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');
    expect(await businessUpdatePage.getMobileInput()).to.eq('mobile', 'Expected Mobile value to be equals to mobile');
    expect(await businessUpdatePage.getWebsiteInput()).to.eq('website', 'Expected Website value to be equals to website');
    expect(await businessUpdatePage.getLogoInput()).to.eq('logo', 'Expected Logo value to be equals to logo');
    expect(await businessUpdatePage.getEmailFooterInput()).to.eq('emailFooter', 'Expected EmailFooter value to be equals to emailFooter');
    expect(await businessUpdatePage.getVatNumberInput()).to.eq('vatNumber', 'Expected VatNumber value to be equals to vatNumber');
    expect(await businessUpdatePage.getBankNameInput()).to.eq('bankName', 'Expected BankName value to be equals to bankName');
    expect(await businessUpdatePage.getIbanInput()).to.eq('iban', 'Expected Iban value to be equals to iban');
    expect(await businessUpdatePage.getBicInput()).to.eq('bic', 'Expected Bic value to be equals to bic');

    await businessUpdatePage.save();
    expect(await businessUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await businessComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Business', async () => {
    const nbButtonsBeforeDelete = await businessComponentsPage.countDeleteButtons();
    await businessComponentsPage.clickOnLastDeleteButton();

    businessDeleteDialog = new BusinessDeleteDialog();
    expect(await businessDeleteDialog.getDialogTitle()).to.eq('medappointApp.business.delete.question');
    await businessDeleteDialog.clickOnConfirmButton();

    expect(await businessComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
