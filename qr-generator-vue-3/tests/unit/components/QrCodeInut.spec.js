import { shallowMount } from '@vue/test-utils'
import QrCodeInput from '@/components/QrCodeInput'
import { createStore } from 'vuex'
describe('QrCodeInput.vue', () => {
  describe('mounting a component', () => {
    it('renders qr input component', () => {
      const wrapper = shallowMount(QrCodeInput)
      const component = wrapper.find('.hello')
      expect(component.classes()).toContain('hello')
    })
  })
  describe('renders qr code input component with its dependenced', () => {
    const store = createStore({
      state () {
        return { count: 1 }
      }
    })
    const wrapper = shallowMount(QrCodeInput, {
      global: {
        plugins: [store]
      }
    })
    it('renders generate qr code button with text', () => {
      const component = wrapper.find('#btn-generate')
      expect(component.text()).toBe('Generar QR')
    })
    it('renders txt input, change its value ans see if stored', () => {
      const input = wrapper.find('#txt-qr-code')
      expect(input.element.value).toBe('')

      input.setValue('www.platzi.com')
      expect(wrapper.vm.qrCodeInput).toBe('www.platzi.com')
    })
  })
  describe('actions and mocks', () => {
    describe('triggers click in qr code button and the event it is called', () => {
      const spySendQrCode = jest.spyOn(QrCodeInput.methods, 'sendQRCode')
      const wrapper = shallowMount(QrCodeInput)
      const txtInput = wrapper.find('#txt-qr-code')
      const qrCode = 'www.platzi.com'
      txtInput.setValue(qrCode)

      it('the send qr code function it is begin called', async () => {
        const button = wrapper.find('#btn-generate')
        button.trigger('click')
        expect(spySendQrCode).toBeCalledTimes(1)
        expect(wrapper.emitted()).toHaveProperty('qrCodeInput')
        expect(wrapper.emitted('qrCodeInput')).toHaveLength(1)
        expect(wrapper.emitted('qrCodeInput')[0]).toStrictEqual([qrCode])
      })

      it('the button is disabled by default',async () => {
        const wrapper = shallowMount(QrCodeInput)
        const button = wrapper.find('#btn-generate')
        expect(button.attributes().disabled).toBeDefined()
      })
    })
  })
})
