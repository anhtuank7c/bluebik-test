describe('Onboarding', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('"Title" should be visible', async () => {
    await expect(element(by.id('title'))).toBeVisible();
  });

  it('"Description" text should be visible', async () => {
    await expect(element(by.id('description'))).toBeVisible();
  });

  it('Step One', async () => {
    const inputFullName = element(by.id('fullName'))
    const inputIdNumber = element(by.id('idNumber'))

    await expect(inputFullName).toExist()
    await inputFullName.tap()
    await expect(inputFullName).toBeVisible()
    await inputFullName.typeText('Tuan Nguyen')

    await expect(inputIdNumber).toExist()
    await inputIdNumber.tap()
    await expect(inputIdNumber).toBeVisible()
    await inputIdNumber.typeText('000111222333')
    await inputIdNumber.tapReturnKey()

    await expect(element(by.id('btnNext'))).toBeVisible()
    await element(by.id('btnNext')).tap()
  });

  it('Step Two', async () => {
    const inputEmail = element(by.id('email'))
    const inputphoneNumber = element(by.id('phoneNumber'))
    const inputDateOfBirth = element(by.id('dateOfBirth'))

    await expect(inputEmail).toExist()
    await inputEmail.tap()
    await expect(inputEmail).toBeVisible()
    await inputEmail.typeText('anhtuank7c@hotmail.com')

    await expect(inputphoneNumber).toExist()
    await inputphoneNumber.tap()
    await expect(inputphoneNumber).toBeVisible()
    await inputphoneNumber.typeText('0123456789')

    await expect(inputDateOfBirth).toExist()
    await inputDateOfBirth.tap()
    await expect(inputDateOfBirth).toBeVisible()
    await inputDateOfBirth.typeText('01011999')
    await inputDateOfBirth.tapReturnKey()

    await expect(element(by.id('btnNext'))).toBeVisible()
    await element(by.id('btnNext')).tap()
  });

  it('Step Three', async () => {
    const listItem0 = element(by.id('listitem-0'))
    const listItem1 = element(by.id('listitem-1'))
    const listItem2 = element(by.id('listitem-2'))

    await expect(listItem0).toBeVisible()
    await expect(listItem1).toBeVisible()
    await expect(listItem2).toBeVisible()
    await listItem0.tap()
    await listItem1.tap()
    await listItem2.tap()

    await expect(element(by.id('btnFinish'))).toBeVisible()
    await element(by.id('btnFinish')).tap()
  });

  it('Should navigate to Welcome Screen', async () => {
    await expect(element(by.id('iconMedal'))).toBeVisible()
    await expect(element(by.id('txtCongratulation'))).toBeVisible()
    await expect(element(by.id('btnShuffle'))).toBeVisible()
    await element(by.id('btnShuffle')).tap()
  });
});