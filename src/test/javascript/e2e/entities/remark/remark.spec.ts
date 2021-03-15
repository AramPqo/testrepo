import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RemarkComponentsPage, RemarkDeleteDialog, RemarkUpdatePage } from './remark.page-object';

const expect = chai.expect;

describe('Remark e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let remarkComponentsPage: RemarkComponentsPage;
  let remarkUpdatePage: RemarkUpdatePage;
  let remarkDeleteDialog: RemarkDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Remarks', async () => {
    await navBarPage.goToEntity('remark');
    remarkComponentsPage = new RemarkComponentsPage();
    await browser.wait(ec.visibilityOf(remarkComponentsPage.title), 5000);
    expect(await remarkComponentsPage.getTitle()).to.eq('medappointApp.remark.home.title');
    await browser.wait(ec.or(ec.visibilityOf(remarkComponentsPage.entities), ec.visibilityOf(remarkComponentsPage.noResult)), 1000);
  });

  it('should load create Remark page', async () => {
    await remarkComponentsPage.clickOnCreateButton();
    remarkUpdatePage = new RemarkUpdatePage();
    expect(await remarkUpdatePage.getPageTitle()).to.eq('medappointApp.remark.home.createOrEditLabel');
    await remarkUpdatePage.cancel();
  });

  it('should create and save Remarks', async () => {
    const nbButtonsBeforeCreate = await remarkComponentsPage.countDeleteButtons();

    await remarkComponentsPage.clickOnCreateButton();

    await promise.all([
      remarkUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      remarkUpdatePage.setColorCodeInput('colorCode'),
      remarkUpdatePage.setTitleInput('title'),
      remarkUpdatePage.setContentInput('content'),
      remarkUpdatePage.patientSelectLastOption(),
    ]);

    expect(await remarkUpdatePage.getCreatedAtInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdAt value to be equals to 2000-12-31'
    );
    expect(await remarkUpdatePage.getColorCodeInput()).to.eq('colorCode', 'Expected ColorCode value to be equals to colorCode');
    expect(await remarkUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await remarkUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');

    await remarkUpdatePage.save();
    expect(await remarkUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await remarkComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Remark', async () => {
    const nbButtonsBeforeDelete = await remarkComponentsPage.countDeleteButtons();
    await remarkComponentsPage.clickOnLastDeleteButton();

    remarkDeleteDialog = new RemarkDeleteDialog();
    expect(await remarkDeleteDialog.getDialogTitle()).to.eq('medappointApp.remark.delete.question');
    await remarkDeleteDialog.clickOnConfirmButton();

    expect(await remarkComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
