import { AbsComponent } from 'abs-component';
import { AbsTemplate, AbsTemplatePrintMethod } from '../../new-abs-template';
import { queryParam } from '../../script/utils';

export class Header implements AbsComponent {
  constructor(public readonly node: HTMLElement) {
    this.headerListItemTemplateNode = this.node.getNode('template#header-list-item') as HTMLElement;
    this.headerDesktopListNode = this.node.getNode('.header-list-dsk') as HTMLElement;
    this.headerMobileListNode = this.node.getNode('.header-list-mob') as HTMLElement;
    this.viewNodeList = document.getNodes('main view') as HTMLElement[];
  }

  private readonly VIEW_QUERYPARAM = 'view';
  private readonly VIEW_VISIBLE_CLASS = 'visible';
  private readonly BUTTON_ACTIVE_CLASS = 'active';
  private readonly headerListItemTemplateNode: HTMLElement;
  private readonly headerDesktopListNode: HTMLElement;
  private readonly headerMobileListNode: HTMLElement;
  private readonly viewNodeList: HTMLElement[];
  private headerDesktopButtonNodeList: HTMLButtonElement[] = [];
  private headerMobileButtonNodeList: HTMLButtonElement[] = [];

  init() {}
  
  ready() {
    this.buildHeaderList();
    this.preselectHeaderItem();
  }

  private buildHeaderList() {
    this.viewNodeList?.sort((a, b) => {
      const aTitle = (a.getAttribute('data-title') as String).toLowerCase();
      const bTitle = (b.getAttribute('data-title') as String).toLowerCase();
      return aTitle.localeCompare(bTitle);
    }).forEach(viewNode => {
      const viewNodeId = viewNode.getAttribute('id');
      const viewNodeTitle = viewNode.getAttribute('data-title');

      const templateData = {
        targetId: viewNodeId,
        label: viewNodeTitle,
      };

      AbsTemplate.build({
        templateNode: this.headerListItemTemplateNode,
        printTargetNode: this.headerDesktopListNode,
        templateData: templateData,
        printMethod: AbsTemplatePrintMethod.BEFORE_END,
      });
      AbsTemplate.build({
        templateNode: this.headerListItemTemplateNode,
        printTargetNode: this.headerMobileListNode,
        templateData: templateData,
        printMethod: AbsTemplatePrintMethod.BEFORE_END,
      });

      const viewDesktopButtonNode = this.headerDesktopListNode.getNode(`button[data-target-id="${viewNodeId}"]`) as HTMLButtonElement;
      const viewMobileButtonNode = this.headerMobileListNode.getNode(`button[data-target-id="${viewNodeId}"]`) as HTMLButtonElement;

      [viewDesktopButtonNode, viewMobileButtonNode].forEach(viewButtonNode => {
        viewButtonNode.addEventListener('click', (event) => {
          const previousVisibleView = document.getNode('main view.visible');
          const previousActiveDesktopButtonNode = this.headerDesktopListNode.getNode('button.active');
          const previousActiveMobileButtonNode = this.headerMobileListNode.getNode('button.active');
          if(viewNode !== previousVisibleView) {
            previousVisibleView && previousVisibleView.classList.remove(this.VIEW_VISIBLE_CLASS);
            viewNode.classList.add(this.VIEW_VISIBLE_CLASS);
  
            previousActiveDesktopButtonNode && previousActiveDesktopButtonNode.classList.remove(this.BUTTON_ACTIVE_CLASS);
            previousActiveMobileButtonNode && previousActiveMobileButtonNode.classList.remove(this.BUTTON_ACTIVE_CLASS);
  
            viewDesktopButtonNode.classList.add(this.BUTTON_ACTIVE_CLASS);
            viewMobileButtonNode.classList.add(this.BUTTON_ACTIVE_CLASS);
          }
        });
      });
    });

    this.headerDesktopButtonNodeList = this.headerDesktopListNode.getNodes('button') as HTMLButtonElement[];
    this.headerMobileButtonNodeList = this.headerMobileListNode.getNodes('button') as HTMLButtonElement[];
  }

  private preselectHeaderItem() {
    const preselectedView = queryParam.get('view');
    if(preselectedView) {
      
    } else {
      this.viewNodeList[0].classList.add(this.VIEW_VISIBLE_CLASS);
      this.headerDesktopButtonNodeList[0].classList.add(this.BUTTON_ACTIVE_CLASS);
      this.headerMobileButtonNodeList[0].classList.add(this.BUTTON_ACTIVE_CLASS);
    }
  }
}