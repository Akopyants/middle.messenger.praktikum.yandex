import { expect } from 'chai';
import sinon from 'sinon';
import Router from './Router';
import Block from './Block';

describe('Router', () => {
  let router: Router;
  let TestPage: typeof Block;

  before(() => {
    class TestBlock extends Block {
      constructor() {
        super();
      }

      render() {
        return '<div>test</div>';
      }
    }

    TestPage = TestBlock;
  });

  beforeEach(() => {
    router = new Router('#app');
    router.use('/login', TestPage);
    router.use('/register', TestPage);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('создается новый экземпляр Роутера', () => {
    expect(router).to.be.an.instanceOf(Router);
  });

  it('Переход на новую страницу должен менять состояние сущности history', () => {
    const historyPushStateStub = sinon.stub(window.history, 'pushState');
    router.go('/login');
    router.go('/register');

    expect(historyPushStateStub.calledTwice).to.be.true;
    expect(historyPushStateStub.firstCall.calledWith({}, '', '/login')).to.be.true;
    expect(historyPushStateStub.secondCall.calledWith({}, '', '/register')).to.be.true;
  });

  it('Проверка метода back', () => {
    const historyBackStub = sinon.stub(window.history, 'back');
    router.go('/login');
    router.go('/register');
    router.back();

    expect(historyBackStub.calledOnce).to.be.true;
  });

  it('Проверка получения текущего маршрута после возврата', () => {
    router.go('/register');

    const currentRoute = router.getCurrentRoute();
    expect(currentRoute?.getPath()).to.equal('/register');
  });

  it('Проверка метода forward', () => {
    const historyForwardStub = sinon.stub(window.history, 'forward');

    router.forward();

    expect(historyForwardStub.calledOnce).to.be.true;
  });
});
