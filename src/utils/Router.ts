import Block from './Block';
import RenderDOM from './RenderDOM';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

class Route {
  public _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _props: Record<string, string>

  constructor(pathname: string, view : typeof Block, props: Record<string, string>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname : string) {
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

  match(pathname : string) {
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
}

export default class Router {
  private routes : Route[] = [];
  private history : History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery: string;
  private static __instance: Router | null = null;

  constructor(rootQuery: string) {
    this._rootQuery = rootQuery;
  }

  static getInstance(rootQuery: string): Router {
    if (!Router.__instance) {
      Router.__instance = new Router(rootQuery);
    }
    return Router.__instance;
  }

  use(pathname : string, block : typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);
    
    return this;
  }

  start() {
    window.onpopstate = (() => {
      this._onRoute(window.location.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname : string) {

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

  go(pathname : string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname : string) {

    return this.routes.find((route) => route.match(pathname));
  }
}

//   // Необходимо оставить в силу особенностей тренажёра
//   history.pushState({}, '', '/');

//   const router = new Router(".app");

//   // Можно обновиться на /user и получить сразу пользователя
//   router
//     .use("/", Chats)
//     .use("/users", Users)
//     .start();

//   // Через секунду контент изменится сам, достаточно дёрнуть переход
//   setTimeout(() => {
//     router.go("/users");
//   }, 1000);

//   // А можно и назад
//   setTimeout(() => {
//     router.back();
//   }, 3000);

//   // И снова вперёд
//   setTimeout(() => {
//     router.forward();
//   }, 5000);
