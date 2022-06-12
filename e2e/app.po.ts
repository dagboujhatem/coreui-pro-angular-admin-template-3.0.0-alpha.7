import { browser, by, element } from 'protractor';

export class AppDashboard {

  getBrowser() {
    return browser;
    
  }

  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.xpath('/html/body/app-dashboard/c-wrapper/c-body/main/c-container/ng-component/div')).getText();
  }
  getBody() {
    return element(by.xpath('/html/body'));
  }
  getByCss(selector) {
    return element.all(by.css(selector));
  }
  getById(selector) {
    return element.all(by.id(selector));
  }
  getFooterText() {
    return element(by.className('c-footer')).getText();
  }
}
