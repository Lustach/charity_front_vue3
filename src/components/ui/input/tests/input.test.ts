import input from '@/components/ui/input/input.vue'
// import { describe, expect, it } from 'vitest';
// describe('test123', () => {
//     it('Math.sqrt()', () => {
//         expect(Math.sqrt(4)).toBe(2);
//         expect(Math.sqrt(144)).toBe(12);
//         expect(Math.sqrt(2)).toBe(Math.SQRT2);
//     });
// })

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
describe('Input', () => {
    it('should set correct base props', () => {
        const props = {
            type: "email",
            placeholder: "E-mail или телефон",
            label: "E-mail или телефон",
            id: "emailOrPhone",
            maxWidth: "328px",
            error: "",
            disabled: true
        }
        const wrapper = mount(input, { props: props })
        expect(wrapper.componentVM.id).toBe('emailOrPhone');
        expect(wrapper.componentVM.type).toBe('email');
        expect(wrapper.componentVM.placeholder).toBe('E-mail или телефон');
        expect(wrapper.componentVM.maxWidth).toBe('328px');
        expect(wrapper.componentVM.label).toBe('E-mail или телефон');
        expect(wrapper.componentVM.disabled).toBe(true);
    })
    it('should set correct eye', () => {
        const props = {
            modelOriginal: "+7  111-111-11-11",
            modelHidden: "+7  111-***-**-11",
            modelValue: "",
            type: "phone",
            placeholder: "",
            label: "Телефон *",
            id: "phone",
            maxWidth: "420px",
            tooltip:
                "Данный телефон является логином для входа на наш сайт и не может быть изменен самостоятельно.  Если вам необходимо сменить номер, пожалуйста, обратитесь в нашу поддержку.",
            disabled: true,
            eye: true,
            error: "",
        }
        const wrapper = mount(input, { props: props })
        expect(wrapper.get('.eye').isVisible()).toBe(true);

        // wrapper.getComponent(input).setValue('lusta.vlad2001@gmail.com')
        expect(wrapper.trigger('click'))
        // expect(wrapper.get('.eye').html()).toBe('<img src="/src/assets/images/icons/eye.svg" alt="" class="eye" data-v-5ff8814c="">');

        // expect(wrapper.contains('img')).toBe(true)

    })

})