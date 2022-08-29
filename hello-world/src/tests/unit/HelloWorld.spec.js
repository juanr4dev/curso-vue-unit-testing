import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
  it('renders hellow world component', () => {
    const wrapper = shallowMount(HelloWorld)

    const component = wrapper.find('.hello')
    expect(component.classes()).toContain('hello')
    expect(wrapper.vm.counter).toBe(0)

    wrapper.vm.increment()
    expect(wrapper.vm.counter).toBe(1)
  })
  it('button click should increment and it should be rendered', async () => {
    const wrapper = shallowMount(HelloWorld)

    const button = wrapper.find('#but-increment')
    const counter = wrapper.vm.counter

    await button.trigger('click')
    expect(wrapper.vm.counter).toBe(counter + 1)
    expect(wrapper.find('#header-counter').text()).toBe('counter: ' + (counter + 1))
  })

  it('button increment with value increment and render correctly', async () => {
    const wrapper = shallowMount(HelloWorld)

    const button = wrapper.find('#but-increment-value')
    const counter = wrapper.vm.counter
    const increment = 5
    wrapper.vm.inputValue = increment
    await button.trigger('click')
    expect(wrapper.vm.counter).toBe(counter + increment)
    expect(wrapper.find('#header-counter').text()).toBe('counter: ' + (counter + increment))
  })

  it('button click should call increment and counter data increments', async () => {
    const spyIncrement = jest.spyOn(HelloWorld.methods, 'increment')
    const wrapper = shallowMount(HelloWorld)

    const button = wrapper.find('#but-increment')
    await button.trigger('click')

    expect(spyIncrement).toBeCalledTimes(1)
    expect(wrapper.vm.counter).toBe(1)
  })

  it('button click should call increment function using mock', async () => {
    const mockedIncrement = jest.fn()
    const wrapper = shallowMount(HelloWorld)
    wrapper.setMethods({ increment: mockedIncrement })
    const button = wrapper.find('#but-increment')
    await button.trigger('click')
    expect(mockedIncrement).toBeCalledTimes(1)
    expect(wrapper.vm.counter).toBe(0)
  })
})
