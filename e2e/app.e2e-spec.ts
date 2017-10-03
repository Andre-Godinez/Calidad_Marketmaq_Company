import { AdminMarketmaqPage } from './app.po';

describe('admin-marketmaq App', () => {
  let page: AdminMarketmaqPage;

  beforeEach(() => {
    page = new AdminMarketmaqPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
