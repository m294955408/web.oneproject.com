import { Web.Oneproject.ComPage } from './app.po';

describe('web.oneproject.com App', () => {
  let page: Web.Oneproject.ComPage;

  beforeEach(() => {
    page = new Web.Oneproject.ComPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
