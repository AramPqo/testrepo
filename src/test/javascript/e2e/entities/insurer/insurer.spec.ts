import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InsurerComponentsPage, InsurerDeleteDialog, InsurerUpdatePage } from './insurer.page-object';

const expect = chai.expect;

describe('Insurer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let insurerComponentsPage: InsurerComponentsPage;
  let insurerUpdatePage: InsurerUpdatePage;
  let insurerDeleteDialog: InsurerDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Insurers', async () => {
    await navBarPage.goToEntity('insurer');
    insurerComponentsPage = new InsurerComponentsPage();
    await browser.wait(ec.visibilityOf(insurerComponentsPage.title), 5000);
    expect(await insurerComponentsPage.getTitle()).to.eq('medappointApp.insurer.home.title');
    await browser.wait(ec.or(ec.visibilityOf(insurerComponentsPage.entities), ec.visibilityOf(insurerComponentsPage.noResult)), 1000);
  });

  it('should load create Insurer page', async () => {
    await insurerComponentsPage.clickOnCreateButton();
    insurerUpdatePage = new InsurerUpdatePage();
    expect(await insurerUpdatePage.getPageTitle()).to.eq('medappointApp.insurer.home.createOrEditLabel');
    await insurerUpdatePage.cancel();
  });

  it('should create and save Insurers', async () => {
    const nbButtonsBeforeCreate = await insurerComponentsPage.countDeleteButtons();

    await insurerComponentsPage.clickOnCreateButton();

    await promise.all([insurerUpdatePage.setNameInput('name'), insurerUpdatePage.setAbbrInput('abbr')]);

    expect(await insurerUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await insurerUpdatePage.getAbbrInput()).to.eq('abbr', 'Expected Abbr value to be equals to abbr');

    await insurerUpdatePage.save();
    expect(await insurerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await insurerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Insurer', async () => {
    const nbButtonsBeforeDelete = await insurerComponentsPage.countDeleteButtons();
    await insurerComponentsPage.clickOnLastDeleteButton();

    insurerDeleteDialog = new InsurerDeleteDialog();
    expect(await insurerDeleteDialog.getDialogTitle()).to.eq('medappointApp.insurer.delete.question');
    await insurerDeleteDialog.clickOnConfirmButton();

    expect(await insurerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
