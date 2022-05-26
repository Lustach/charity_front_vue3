import ChFormCategoryTitle from "@/components/pages/NkoInfo/ChFormCategoryTitle.vue";

import { mount } from '@vue/test-utils'
import { describe, expect, it} from 'vitest'
describe('ChFormCategoryTitle', () => {
    it('Картинка отображается при line=true', () => {
        const props = {
            line: true
        }
        const wrapper = mount(ChFormCategoryTitle, { props: props })
        expect(wrapper.find('.line').exists());
    })
    it('Картинка не отображается при line=false', () => {
        const props = {
            line: false
        }
        const wrapper = mount(ChFormCategoryTitle, { props: props })
        expect(wrapper.find('.line').exists()).toBe(false)
    })
    it('h2 отображается всегда', () => {
        const wrapper = mount(ChFormCategoryTitle)
        expect(wrapper.find('h2').exists()).toBe(true)
    })
    it('Текст отображается корректно', () => {
        const props = {
            title: "Ваши контактные данные",
        }
        const wrapper = mount(ChFormCategoryTitle, { props: props })
        expect(wrapper.text()).toBe('Ваши контактные данные')
    })
}
)