import { AppDashboard } from './app.po';

describe('CoreUI template', () => {
  let page: AppDashboard;
  const sleep = 300;

  page = new AppDashboard();
  const browser = page.getBrowser();
  browser.driver.manage().window().setSize(600, 800);
  browser.sleep(sleep);
  page.navigateTo();

  // beforeEach(() => {
  //   page = new AppDashboard();
  //   page.navigateTo();
  // });

  it('should display CoreUI Dashboard', async () => {
    browser.sleep(sleep);
    expect(await page.getParagraphText()).toEqual('CoreUI Dashboard!');
  });

  it('should display footer containing creativeLabs', async () => {
    browser.sleep(sleep);
    expect(await page.getFooterText()).toContain('creativeLabs');
  });

  it('should toggle `c-dark-theme` class on `theme-toggler` click', () => {
    browser.manage().window().maximize();
    browser.sleep(1000);
    const button = page.getById('theme-toggler');
    button.click();
    browser.sleep(1000);
    const app = page.getByCss('.c-app');
    expect(app.getAttribute('class')).toContain('c-app c-dark-theme');
    button.click();
    browser.sleep(1000);
    expect(app.getAttribute('class')).not.toContain('c-dark-theme');
  });
  it('should toggle `c-sidebar-minimized` class on `c-sidebar-minimizer` click', () => {
    const button = page.getByCss('.c-sidebar-minimizer');
    button.click();
    browser.sleep(sleep);
    const sidebar = page.getById('sidebar');
    expect(sidebar.getAttribute('class')).toContain('c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show c-sidebar-minimized');
    browser.sleep(sleep);
    button.click();
    browser.sleep(sleep);
    expect(sidebar.getAttribute('class')).toContain('c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show');
    // browser.driver.manage().window().setSize(600, 800);
    browser.sleep(1000);
  });

  it('should toggle `sidebar-lg-show` class on `sidebar-toggler` click', () => {
    // browser.manage().window().maximize();
    browser.sleep(1000);
    const button = page.getById('sidebar-toggler');
    button.click();
    browser.sleep(sleep);
    const sidebar = page.getById('sidebar');
    expect(sidebar.getAttribute('class')).not.toContain('c-sidebar-lg-show');
    button.click();
    browser.sleep(sleep);
    expect(sidebar.getAttribute('class')).toContain('c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show');
  });
});
