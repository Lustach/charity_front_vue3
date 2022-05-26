import ChFormCategoryTitle from "@/components/pages/NkoInfo/ChFormCategoryTitle.vue";

import { mount } from '@vue/test-utils'
import { describe, expect, it, beforeEach } from 'vitest'
describe('ChFormCategoryTitle', () => {
    // const wrapper = mount(ChFormCategoryTitle)
    // beforeEach(() => {
    //     const props = {
    //         title: "Ваши контактные данные",
    //         line: false
    //     }
    //     wrapper.setProps(props)
    // })
    // it('Картинка не отображается при line=false', () => {
    //     expect(wrapper.find('.line').exists()).toBeFalsy();
    // })
    it('Картинка отображается при line=true', () => {
        const props = {
            line: true
        }
        const wrapper = mount(ChFormCategoryTitle)
        // wrapper.setProps(props)
        console.log(wrapper.find('.line').exists());
    })
}
)