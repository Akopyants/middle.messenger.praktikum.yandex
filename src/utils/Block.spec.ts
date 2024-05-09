import { expect } from 'chai';
import Block from './Block';

describe('Block', () => {
  let BlockTest: typeof Block;

  before(() => {
    class TestBlock extends Block {
      constructor() {
        super();
      }

      render() {
        return '<div>test</div>';
      }
    }

    BlockTest = TestBlock;
  });

  

  it('Проверяем текст внутри элемента', () => {
    const component = new BlockTest({});
    const element = component.getContent();
  
    expect(element?.textContent).to.equal('test');
  });

  it('Проверяем корректный ли тег используется', () => {
    const component = new BlockTest({});
    const element = component.getContent();
  
    expect(element?.tagName).to.equal('DIV');
  });

  it('Проверяем скрытие элемента', () => {
    const component = new BlockTest({});
    const element = component.getContent();
    component.hide();
    expect(element?.style.display).to.equal('none');
  });

  it('Проверяем показ элемента', () => {
    const component = new BlockTest({});
    const element = component.getContent();
    component.show();
    expect(element?.style.display).to.equal('block');
  });

  it('Проверяем обновление свойств через setProps', () => {
    const component = new BlockTest({});
    component.setProps({ title: 'New Test' });
    const props = component.getProps();
    expect(props.title).to.equal('New Test');
  });
});
