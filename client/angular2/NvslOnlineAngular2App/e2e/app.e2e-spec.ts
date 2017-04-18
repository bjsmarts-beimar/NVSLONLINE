import { NvslOnlineAngular2AppPage } from './app.po';

describe('nvsl-online-angular2-app App', () => {
  let page: NvslOnlineAngular2AppPage;

  beforeEach(() => {
    page = new NvslOnlineAngular2AppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
