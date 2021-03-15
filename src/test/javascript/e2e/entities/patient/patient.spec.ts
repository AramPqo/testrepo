import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PatientComponentsPage, PatientDeleteDialog, PatientUpdatePage } from './patient.page-object';

const expect = chai.expect;

describe('Patient e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let patientComponentsPage: PatientComponentsPage;
  let patientUpdatePage: PatientUpdatePage;
  let patientDeleteDialog: PatientDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Patients', async () => {
    await navBarPage.goToEntity('patient');
    patientComponentsPage = new PatientComponentsPage();
    await browser.wait(ec.visibilityOf(patientComponentsPage.title), 5000);
    expect(await patientComponentsPage.getTitle()).to.eq('medappointApp.patient.home.title');
    await browser.wait(ec.or(ec.visibilityOf(patientComponentsPage.entities), ec.visibilityOf(patientComponentsPage.noResult)), 1000);
  });

  it('should load create Patient page', async () => {
    await patientComponentsPage.clickOnCreateButton();
    patientUpdatePage = new PatientUpdatePage();
    expect(await patientUpdatePage.getPageTitle()).to.eq('medappointApp.patient.home.createOrEditLabel');
    await patientUpdatePage.cancel();
  });

  it('should create and save Patients', async () => {
    const nbButtonsBeforeCreate = await patientComponentsPage.countDeleteButtons();

    await patientComponentsPage.clickOnCreateButton();

    await promise.all([
      patientUpdatePage.setFirstNameInput('firstName'),
      patientUpdatePage.setLastNameInput('lastName'),
      patientUpdatePage.setTitleInput('title'),
      patientUpdatePage.genderSelectLastOption(),
      patientUpdatePage.setDateOfBirthInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      patientUpdatePage.setEmailInput('email'),
      patientUpdatePage.setPhoneInput('phone'),
      patientUpdatePage.setMobileInput('mobile'),
      patientUpdatePage.languageSelectLastOption(),
      patientUpdatePage.setInsuranceNumberInput('insuranceNumber'),
      patientUpdatePage.setOccupationInput('occupation'),
      patientUpdatePage.setEmployerInput('employer'),
      patientUpdatePage.setInitialDiagnoseInput('initialDiagnose'),
      patientUpdatePage.locationSelectLastOption(),
      patientUpdatePage.insurerSelectLastOption(),
    ]);

    expect(await patientUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await patientUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await patientUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await patientUpdatePage.getDateOfBirthInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateOfBirth value to be equals to 2000-12-31'
    );
    expect(await patientUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await patientUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');
    expect(await patientUpdatePage.getMobileInput()).to.eq('mobile', 'Expected Mobile value to be equals to mobile');
    expect(await patientUpdatePage.getInsuranceNumberInput()).to.eq(
      'insuranceNumber',
      'Expected InsuranceNumber value to be equals to insuranceNumber'
    );
    expect(await patientUpdatePage.getOccupationInput()).to.eq('occupation', 'Expected Occupation value to be equals to occupation');
    expect(await patientUpdatePage.getEmployerInput()).to.eq('employer', 'Expected Employer value to be equals to employer');
    expect(await patientUpdatePage.getInitialDiagnoseInput()).to.eq(
      'initialDiagnose',
      'Expected InitialDiagnose value to be equals to initialDiagnose'
    );

    await patientUpdatePage.save();
    expect(await patientUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await patientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Patient', async () => {
    const nbButtonsBeforeDelete = await patientComponentsPage.countDeleteButtons();
    await patientComponentsPage.clickOnLastDeleteButton();

    patientDeleteDialog = new PatientDeleteDialog();
    expect(await patientDeleteDialog.getDialogTitle()).to.eq('medappointApp.patient.delete.question');
    await patientDeleteDialog.clickOnConfirmButton();

    expect(await patientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
