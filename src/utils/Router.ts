import Block from './Block';
import RenderDOM from './RenderDOM';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

class Route {
  public _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _props: Record<string, string>;

  constructor(pathname: string, view: typeof Block, props: Record<string, string>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      // this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }

    if (this._block) {
      RenderDOM(this._props.rootQuery, this._block);
    }
  }

  getPath() {
    return this._pathname;
  }
}

export default class Router {
  public routes: Route[] = [];
  public history: History | undefined;
  private _currentRoute: Route | null = null;
  private _rootQuery: string;
  private static __instance: Router | null = null;

  constructor(rootQuery: string) {
    this._rootQuery = rootQuery;
    this.history = window.history;
  }

  static getInstance(rootQuery: string): Router {
    if (!Router.__instance) {
      Router.__instance = new Router(rootQuery);
    }
    return Router.__instance;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    console.log(this.routes);

    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  getCurrentRoute() {
    return this._currentRoute;
  }
}
