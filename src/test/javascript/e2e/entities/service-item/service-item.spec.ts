import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ServiceItemComponentsPage, ServiceItemDeleteDialog, ServiceItemUpdatePage } from './service-item.page-object';

const expect = chai.expect;

describe('ServiceItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serviceItemComponentsPage: ServiceItemComponentsPage;
  let serviceItemUpdatePage: ServiceItemUpdatePage;
  let serviceItemDeleteDialog: ServiceItemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ServiceItems', async () => {
    await navBarPage.goToEntity('service-item');
    serviceItemComponentsPage = new ServiceItemComponentsPage();
    await browser.wait(ec.visibilityOf(serviceItemComponentsPage.title), 5000);
    expect(await serviceItemComponentsPage.getTitle()).to.eq('medappointApp.serviceItem.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(serviceItemComponentsPage.entities), ec.visibilityOf(serviceItemComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ServiceItem page', async () => {
    await serviceItemComponentsPage.clickOnCreateButton();
    serviceItemUpdatePage = new ServiceItemUpdatePage();
    expect(await serviceItemUpdatePage.getPageTitle()).to.eq('medappointApp.serviceItem.home.createOrEditLabel');
    await serviceItemUpdatePage.cancel();
  });

  it('should create and save ServiceItems', async () => {
    const nbButtonsBeforeCreate = await serviceItemComponentsPage.countDeleteButtons();

    await serviceItemComponentsPage.clickOnCreateButton();

    await promise.all([
      serviceItemUpdatePage.setDescriptionInput('description'),
      serviceItemUpdatePage.setPriceInput('5'),
      serviceItemUpdatePage.setVatRateInput('5'),
    ]);

    expect(await serviceItemUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await serviceItemUpdatePage.getPriceInput()).to.eq('5', 'Expected price value to be equals to 5');
    expect(await serviceItemUpdatePage.getVatRateInput()).to.eq('5', 'Expected vatRate value to be equals to 5');

    await serviceItemUpdatePage.save();
    expect(await serviceItemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await serviceItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ServiceItem', async () => {
    const nbButtonsBeforeDelete = await serviceItemComponentsPage.countDeleteButtons();
    await serviceItemComponentsPage.clickOnLastDeleteButton();

    serviceItemDeleteDialog = new ServiceItemDeleteDialog();
    expect(await serviceItemDeleteDialog.getDialogTitle()).to.eq('medappointApp.serviceItem.delete.question');
    await serviceItemDeleteDialog.clickOnConfirmButton();

    expect(await serviceItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
