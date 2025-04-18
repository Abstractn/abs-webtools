import { AbsComponent } from 'abs-component';
import { AbsTemplate, AbsTemplatePrintMethod, AbsTemplateBracketType } from 'abs-template';
import { queryParam } from '../../script/utils';
import * as Anime from 'animejs';

export class Header implements AbsComponent {
  constructor(public readonly node: HTMLElement) {
    this.headerListItemTemplateNode = this.node.getNode('template#header-list-item') as HTMLElement;
    this.headerDesktopListNode = this.node.getNode('.header-list.-dsk') as HTMLElement;
    this.headerMobileListNode = this.node.getNode('.header-list.-mob') as HTMLElement;
    //WIP attempting to solve scroll when menu has many items
    //this.headerMobileListNode = this.node.getNode('.header-list.-mob .header-list-items') as HTMLElement;
    this.viewNodeList = document.getNodes('main view') as HTMLElement[];
  }

  private readonly VIEW_QUERYPARAM = 'view';
  private readonly VIEW_VISIBLE_CLASS = 'visible';
  private readonly BUTTON_ACTIVE_CLASS = 'active';
  private readonly MOBILE_MENU_BUTTON_ICON_HIDDEN_CLASS = 'hidden';
  private readonly MOBILE_MENU_VISIBLE_CLASS = 'visible';
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

  private assignViewButtonEvents(viewNode: HTMLElement) {
    const viewNodeId = viewNode.getAttribute('id') as string;

    const viewDesktopButtonNode = this.headerDesktopListNode.getNode(`button[data-target-id="${viewNodeId}"]`) as HTMLButtonElement;
    const viewMobileButtonNode = this.headerMobileListNode.getNode(`button[data-target-id="${viewNodeId}"]`) as HTMLButtonElement;

    [viewDesktopButtonNode, viewMobileButtonNode].forEach(viewButtonNode => {
      viewButtonNode.addEventListener('click', (event) => {
        const previousVisibleView = document.getNode('main view.visible');
        const previousActiveDesktopButtonNode = this.headerDesktopListNode.getNode('button.active');
        const previousActiveMobileButtonNode = this.headerMobileListNode.getNode('button.active');
        if(viewNode !== previousVisibleView) {
          if(previousVisibleView) {
            const previousViewNodeIndex = document.getNodes('main view')?.findIndex(vn => vn == previousVisibleView);
            const currentViewNodeIndex = document.getNodes('main view')?.findIndex(vn => vn == viewNode);
            if(
              currentViewNodeIndex !== undefined &&
              currentViewNodeIndex !== -1 &&
              previousViewNodeIndex !== undefined &&
              previousViewNodeIndex !== -1
            ) {
              const isCurrentBefore = currentViewNodeIndex < previousViewNodeIndex;
              
              Anime.animate(viewNode, {
                translateX: [isCurrentBefore ? -100 : 100, 0],
                opacity: [0, 1],

                duration: 400,
                ease: Anime.eases.out(4),
              });
            }
          }
          previousVisibleView && previousVisibleView.classList.remove(this.VIEW_VISIBLE_CLASS);
          viewNode.classList.add(this.VIEW_VISIBLE_CLASS);

          previousActiveDesktopButtonNode && previousActiveDesktopButtonNode.classList.remove(this.BUTTON_ACTIVE_CLASS);
          previousActiveMobileButtonNode && previousActiveMobileButtonNode.classList.remove(this.BUTTON_ACTIVE_CLASS);

          viewDesktopButtonNode.classList.add(this.BUTTON_ACTIVE_CLASS);
          viewMobileButtonNode.classList.add(this.BUTTON_ACTIVE_CLASS);

          queryParam.set(this.VIEW_QUERYPARAM, viewNodeId);
        }
      });
    });
  }

  private assignMobileMenuEvents() {
    const menuButtonNode = this.node.getNode('[js-mobile-menu]') as HTMLButtonElement;
    
    //FIXME abs-utils v1.3 is not released yet
    menuButtonNode.on('click', () => {
      const menuIconNode = menuButtonNode.getNode('.micon[name="menu"]') as HTMLElement;
      const closeIconNode = menuButtonNode.getNode('.micon[name="close"]') as HTMLElement;
      
      menuIconNode.classList.toggle(this.MOBILE_MENU_BUTTON_ICON_HIDDEN_CLASS);
      closeIconNode.classList.toggle(this.MOBILE_MENU_BUTTON_ICON_HIDDEN_CLASS);
      
      const isMenuOpen = menuIconNode?.classList.contains(this.MOBILE_MENU_BUTTON_ICON_HIDDEN_CLASS)

      Anime.animate(
        isMenuOpen ? closeIconNode : menuIconNode,
        {
          opacity: [0, 1],
          scale: [.8, 1],
          
          duration: 400,
        }
      );

      const mobileMenu = this.node.getNode('.header-list.-mob');
      isMenuOpen ? mobileMenu?.classList.add(this.MOBILE_MENU_VISIBLE_CLASS) : mobileMenu?.classList.remove(this.MOBILE_MENU_VISIBLE_CLASS);
    });
  }

  private buildHeaderList() {
    this.viewNodeList?.sort((a, b) => {
      const aTitle = (a.getAttribute('data-title') as string).toLowerCase();
      const bTitle = (b.getAttribute('data-title') as string).toLowerCase();
      return aTitle.localeCompare(bTitle);
    }).forEach(viewNode => {
      const viewNodeId = viewNode.getAttribute('id') as string;
      const viewNodeTitle = viewNode.getAttribute('data-title') as string;

      const templateData = {
        targetId: viewNodeId,
        label: viewNodeTitle,
      };

      AbsTemplate.build({
        templateNode: this.headerListItemTemplateNode,
        printTargetNode: this.headerDesktopListNode,
        templateData: templateData,
        printMethod: AbsTemplatePrintMethod.BEFORE_END,
        bracketType: AbsTemplateBracketType.SQUARE,
      });
      AbsTemplate.build({
        templateNode: this.headerListItemTemplateNode,
        printTargetNode: this.headerMobileListNode,
        templateData: templateData,
        printMethod: AbsTemplatePrintMethod.BEFORE_END,
        bracketType: AbsTemplateBracketType.SQUARE,
      });

      this.assignViewButtonEvents(viewNode);
    });
    this.assignMobileMenuEvents();

    this.headerDesktopButtonNodeList = this.headerDesktopListNode.getNodes('button') as HTMLButtonElement[];
    this.headerMobileButtonNodeList = this.headerMobileListNode.getNodes('button') as HTMLButtonElement[];
  }

  private preselectHeaderItem() {
    const preselectedViewId = queryParam.get('view');
    if(preselectedViewId) {
      const preselectedViewNode = this.viewNodeList.find(viewNode => viewNode.getAttribute('id') === preselectedViewId);
      const preselectedViewDesktopButtonNode = this.headerDesktopListNode.getNode(`button[data-target-id="${preselectedViewId}"]`);
      const preselectedViewMobileButtonNode = this.headerMobileListNode.getNode(`button[data-target-id="${preselectedViewId}"]`);;
      preselectedViewNode && preselectedViewNode.classList.add(this.VIEW_VISIBLE_CLASS);
      preselectedViewDesktopButtonNode && preselectedViewDesktopButtonNode.classList.add(this.BUTTON_ACTIVE_CLASS);
      preselectedViewMobileButtonNode && preselectedViewMobileButtonNode.classList.add(this.BUTTON_ACTIVE_CLASS);
    } else {
      this.viewNodeList[0].classList.add(this.VIEW_VISIBLE_CLASS);
      this.headerDesktopButtonNodeList[0].classList.add(this.BUTTON_ACTIVE_CLASS);
      this.headerMobileButtonNodeList[0].classList.add(this.BUTTON_ACTIVE_CLASS);
      const viewId = this.viewNodeList[0].getAttribute('id') as string;
      queryParam.set(this.VIEW_QUERYPARAM, viewId);
    }
  }
}