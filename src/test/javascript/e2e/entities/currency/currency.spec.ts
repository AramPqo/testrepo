import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CurrencyComponentsPage, CurrencyDeleteDialog, CurrencyUpdatePage } from './currency.page-object';

const expect = chai.expect;

describe('Currency e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let currencyComponentsPage: CurrencyComponentsPage;
  let currencyUpdatePage: CurrencyUpdatePage;
  let currencyDeleteDialog: CurrencyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Currencies', async () => {
    await navBarPage.goToEntity('currency');
    currencyComponentsPage = new CurrencyComponentsPage();
    await browser.wait(ec.visibilityOf(currencyComponentsPage.title), 5000);
    expect(await currencyComponentsPage.getTitle()).to.eq('medappointApp.currency.home.title');
    await browser.wait(ec.or(ec.visibilityOf(currencyComponentsPage.entities), ec.visibilityOf(currencyComponentsPage.noResult)), 1000);
  });

  it('should load create Currency page', async () => {
    await currencyComponentsPage.clickOnCreateButton();
    currencyUpdatePage = new CurrencyUpdatePage();
    expect(await currencyUpdatePage.getPageTitle()).to.eq('medappointApp.currency.home.createOrEditLabel');
    await currencyUpdatePage.cancel();
  });

  it('should create and save Currencies', async () => {
    const nbButtonsBeforeCreate = await currencyComponentsPage.countDeleteButtons();

    await currencyComponentsPage.clickOnCreateButton();

    await promise.all([
      currencyUpdatePage.setNameInput('name'),
      currencyUpdatePage.setIsoCodeInput('isoCode'),
      currencyUpdatePage.setSymbolInput('symbol'),
    ]);

    expect(await currencyUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await currencyUpdatePage.getIsoCodeInput()).to.eq('isoCode', 'Expected IsoCode value to be equals to isoCode');
    expect(await currencyUpdatePage.getSymbolInput()).to.eq('symbol', 'Expected Symbol value to be equals to symbol');

    await currencyUpdatePage.save();
    expect(await currencyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await currencyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Currency', async () => {
    const nbButtonsBeforeDelete = await currencyComponentsPage.countDeleteButtons();
    await currencyComponentsPage.clickOnLastDeleteButton();

    currencyDeleteDialog = new CurrencyDeleteDialog();
    expect(await currencyDeleteDialog.getDialogTitle()).to.eq('medappointApp.currency.delete.question');
    await currencyDeleteDialog.clickOnConfirmButton();

    expect(await currencyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
