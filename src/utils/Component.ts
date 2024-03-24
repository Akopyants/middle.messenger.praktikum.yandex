import EventBus from './EventBus';
import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';

export default class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;
  private _id: string;

  protected props: Record<string, any>;
  protected children: Record<string, Component>;
  protected lists: Record<string, any[]>;
  protected eventBus: () => EventBus;

  constructor(propsWithChildren: Record<string, any> = {}) {
    this._id = makeUUID();

    const eventBus = new EventBus();
    const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    this.children = this._makePropsProxy(children);
    this.lists = this._makePropsProxy(lists);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  private _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      const input = this.element?.querySelector('input');
      if (input) {
        input?.addEventListener(eventName, events[eventName]);
      } else {
        this._element?.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init(): void {
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: unknown, newProps: unknown) {
    return oldProps !== newProps;
  }

  compile(template: string, data: Record<string, any>): string {
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate(data);
  }

  private _getChildrenPropsAndProps(propsAndChildren: Record<string, any>): {
    children: Record<string, Component>;
    props: Record<string, any>;
    lists: Record<string, any[]>;
  } {
    const children: Record<string, Component> = {};
    const props: Record<string, any> = {};
    const lists: Record<string, any[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  private _addAttribute() {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (typeof value === 'string') {
        this._element?.setAttribute(key, value);
      }
    });
  }

  setProps(nextProps: Record<string, any>): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {

    const propsAndStubs: Record<string, any> = { ...this.props };
    const _tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent() as HTMLElement);
      }
    });

    Object.entries(this.lists).forEach(([child]) => {
      const listCont = this._createDocumentElement('template');
      if (Array.isArray(child)) {
        child.forEach((item) => {
          if (item instanceof Component) {
            listCont.content.append(item.getContent() as HTMLElement);
          } else {
            listCont.content.append(`${item}`);
          }
        });
      }
  
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
      stub?.replaceWith(listCont.content);
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
    this._addAttribute();
  }

  render() {
    return '';
  }

  getContent() {
    return this.element;
  }

  getProps() {
    return this.props;
  }
  
  private _makePropsProxy(props: Record<string, any>) {
    const self = this;
    return new Proxy(props, {
     
      set(target, prop: string, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Component.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    const element = document.createElement(tagName);
    element.setAttribute('data-uuid', this._id);
    return element as HTMLTemplateElement;
  }

  show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'Component';
    }
  }

  hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
