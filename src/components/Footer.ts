import { PageComponent } from '../templates/PageComponent';

export class Footer extends PageComponent {
  constructor(tag: string, cssClassArr: string[]) {
    super(tag, cssClassArr);
  }

  createElement(){
    const footerBlock = `
    <div class="footer__school-logo">
      <a href="https://rs.school/js/" target="_blank" class="footer__href">RSSchool</a>
    </div>
    <p class="footer__year">2023</p>
    <a href="https://github.com/mskmee" target="_blank" class="footer__href">@mskmee</a>`;
    this.container.innerHTML = footerBlock;
  }

  render(): HTMLElement {
    this.createElement();
    return super.render();
  }
}