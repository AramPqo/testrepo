import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OpeningHoursComponentsPage, OpeningHoursDeleteDialog, OpeningHoursUpdatePage } from './opening-hours.page-object';

const expect = chai.expect;

describe('OpeningHours e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let openingHoursComponentsPage: OpeningHoursComponentsPage;
  let openingHoursUpdatePage: OpeningHoursUpdatePage;
  let openingHoursDeleteDialog: OpeningHoursDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OpeningHours', async () => {
    await navBarPage.goToEntity('opening-hours');
    openingHoursComponentsPage = new OpeningHoursComponentsPage();
    await browser.wait(ec.visibilityOf(openingHoursComponentsPage.title), 5000);
    expect(await openingHoursComponentsPage.getTitle()).to.eq('medappointApp.openingHours.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(openingHoursComponentsPage.entities), ec.visibilityOf(openingHoursComponentsPage.noResult)),
      1000
    );
  });

  it('should load create OpeningHours page', async () => {
    await openingHoursComponentsPage.clickOnCreateButton();
    openingHoursUpdatePage = new OpeningHoursUpdatePage();
    expect(await openingHoursUpdatePage.getPageTitle()).to.eq('medappointApp.openingHours.home.createOrEditLabel');
    await openingHoursUpdatePage.cancel();
  });

  it('should create and save OpeningHours', async () => {
    const nbButtonsBeforeCreate = await openingHoursComponentsPage.countDeleteButtons();

    await openingHoursComponentsPage.clickOnCreateButton();

    await promise.all([
      openingHoursUpdatePage.dayOfWeekSelectLastOption(),
      openingHoursUpdatePage.setStartTimeInput('startTime'),
      openingHoursUpdatePage.setEndTimeInput('endTime'),
      openingHoursUpdatePage.businessSelectLastOption(),
    ]);

    expect(await openingHoursUpdatePage.getStartTimeInput()).to.eq('startTime', 'Expected StartTime value to be equals to startTime');
    expect(await openingHoursUpdatePage.getEndTimeInput()).to.eq('endTime', 'Expected EndTime value to be equals to endTime');

    await openingHoursUpdatePage.save();
    expect(await openingHoursUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await openingHoursComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last OpeningHours', async () => {
    const nbButtonsBeforeDelete = await openingHoursComponentsPage.countDeleteButtons();
    await openingHoursComponentsPage.clickOnLastDeleteButton();

    openingHoursDeleteDialog = new OpeningHoursDeleteDialog();
    expect(await openingHoursDeleteDialog.getDialogTitle()).to.eq('medappointApp.openingHours.delete.question');
    await openingHoursDeleteDialog.clickOnConfirmButton();

    expect(await openingHoursComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
