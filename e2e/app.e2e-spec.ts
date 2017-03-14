import { KoaAngularStarterPage } from './app.po';

describe('koa-angular-starter App', () => {
  let page: KoaAngularStarterPage;

  beforeEach(() => {
    page = new KoaAngularStarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
