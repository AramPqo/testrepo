import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AppointmentComponentsPage, AppointmentDeleteDialog, AppointmentUpdatePage } from './appointment.page-object';

const expect = chai.expect;

describe('Appointment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appointmentComponentsPage: AppointmentComponentsPage;
  let appointmentUpdatePage: AppointmentUpdatePage;
  let appointmentDeleteDialog: AppointmentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Appointments', async () => {
    await navBarPage.goToEntity('appointment');
    appointmentComponentsPage = new AppointmentComponentsPage();
    await browser.wait(ec.visibilityOf(appointmentComponentsPage.title), 5000);
    expect(await appointmentComponentsPage.getTitle()).to.eq('medappointApp.appointment.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(appointmentComponentsPage.entities), ec.visibilityOf(appointmentComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Appointment page', async () => {
    await appointmentComponentsPage.clickOnCreateButton();
    appointmentUpdatePage = new AppointmentUpdatePage();
    expect(await appointmentUpdatePage.getPageTitle()).to.eq('medappointApp.appointment.home.createOrEditLabel');
    await appointmentUpdatePage.cancel();
  });

  it('should create and save Appointments', async () => {
    const nbButtonsBeforeCreate = await appointmentComponentsPage.countDeleteButtons();

    await appointmentComponentsPage.clickOnCreateButton();

    await promise.all([
      appointmentUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      appointmentUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      appointmentUpdatePage.setTitleInput('title'),
      appointmentUpdatePage.setColorCodeInput('colorCode'),
      appointmentUpdatePage.setNotesInput('notes'),
      appointmentUpdatePage.userSelectLastOption(),
      appointmentUpdatePage.patientSelectLastOption(),
      appointmentUpdatePage.treatmentSelectLastOption(),
    ]);

    expect(await appointmentUpdatePage.getStartDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startDate value to be equals to 2000-12-31'
    );
    expect(await appointmentUpdatePage.getEndDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected endDate value to be equals to 2000-12-31'
    );
    expect(await appointmentUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    const selectedCancelled = appointmentUpdatePage.getCancelledInput();
    if (await selectedCancelled.isSelected()) {
      await appointmentUpdatePage.getCancelledInput().click();
      expect(await appointmentUpdatePage.getCancelledInput().isSelected(), 'Expected cancelled not to be selected').to.be.false;
    } else {
      await appointmentUpdatePage.getCancelledInput().click();
      expect(await appointmentUpdatePage.getCancelledInput().isSelected(), 'Expected cancelled to be selected').to.be.true;
    }
    expect(await appointmentUpdatePage.getColorCodeInput()).to.eq('colorCode', 'Expected ColorCode value to be equals to colorCode');
    const selectedMissed = appointmentUpdatePage.getMissedInput();
    if (await selectedMissed.isSelected()) {
      await appointmentUpdatePage.getMissedInput().click();
      expect(await appointmentUpdatePage.getMissedInput().isSelected(), 'Expected missed not to be selected').to.be.false;
    } else {
      await appointmentUpdatePage.getMissedInput().click();
      expect(await appointmentUpdatePage.getMissedInput().isSelected(), 'Expected missed to be selected').to.be.true;
    }
    expect(await appointmentUpdatePage.getNotesInput()).to.eq('notes', 'Expected Notes value to be equals to notes');

    await appointmentUpdatePage.save();
    expect(await appointmentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await appointmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Appointment', async () => {
    const nbButtonsBeforeDelete = await appointmentComponentsPage.countDeleteButtons();
    await appointmentComponentsPage.clickOnLastDeleteButton();

    appointmentDeleteDialog = new AppointmentDeleteDialog();
    expect(await appointmentDeleteDialog.getDialogTitle()).to.eq('medappointApp.appointment.delete.question');
    await appointmentDeleteDialog.clickOnConfirmButton();

    expect(await appointmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
