import { computed, ref, markRaw, inject, unref, watch } from "vue";
import type { Ref } from 'vue'
import { object } from "yup";
import { SUPPORTED_FORMATS_DEFAULT, rules } from "@/compositions/validation_rules";
import * as yup from "yup";
//components
import ChFormCategoryTitle from "@/components/pages/NkoInfo/ChFormCategoryTitle.vue";
import ChCheckbox from "@/components/ui/checkbox/checkbox.vue";
import ChTextArea from "@/components/ui/textarea/textarea.vue";
import ChInput from "@/components/ui/input/input.vue";
import ChFileUpload from "@/components/ui/file_loader/FileUpload.vue";
import ChMultiselect from "@/components/ui/multiselect/multiselect.vue";
//
markRaw(ChInput);
markRaw(ChTextArea);
markRaw(ChFileUpload);
markRaw(ChCheckbox);
export type TForm = {
    //step1
    fullNameNko: string;
    shortDescriptionActivity: string;
    fullDescriptionActivity: string;
    helpCategory: string;
    charter: string;
    certificateRecord: string;
    certificateRegistration: string;
    logo: string;
    //step2
    inn: string;
    kpp: string;
    ogrn: string;
    fullNameBank: string;
    bik: string;
    countScore: string;
    correspondentScore: string;
    city: string;
    address: string;
    officeOrFlat: string;
    index: string;
    city_actual: string;
    address_actual: string;
    officeOrFlatActual: string;
    index_actual: string;
    city_mailing: string;
    address_mailing: string;
    officeOrFlatMailing: string;
    index_mailing: string;
    actualAddress: boolean,
    mailingAddress: boolean,
    //step3
    fullNameDirector: string;
    workPost: string;
    fullNameContactPerson: string;
    phoneContactPerson: string;
    emailContactPerson: string;
    site: string;
    email: string;
    phone: string;
    vk: string;
    classmates: string;
    facebook: string;
    insta: string;
    isShowStep1: boolean;
    isShowStep2: boolean;
    isShowStep3: boolean;

};
export const form: Ref<TForm> = ref({
    isShowStep1: true,
    isShowStep2: false,
    isShowStep3: false,
    //step1
    fullNameNko: "",
    shortDescriptionActivity: "",
    fullDescriptionActivity: "",
    helpCategory: "",
    charter: "",
    certificateRecord: "",
    certificateRegistration: "",
    logo: "",
    //step2
    inn: "",
    kpp: "",
    ogrn: "",
    fullNameBank: "",
    bik: "",
    countScore: "",
    correspondentScore: "",
    city: "",
    address: "",
    officeOrFlat: "",
    index: "",
    city_actual: "",
    address_actual: "",
    officeOrFlatActual: "",
    index_actual: "",
    city_mailing: "",
    address_mailing: "",
    officeOrFlatMailing: "",
    index_mailing: "",
    actualAddress: true,
    mailingAddress: true,
    //step3
    fullNameDirector: "",
    workPost: "",
    fullNameContactPerson: "",
    phoneContactPerson: "",
    emailContactPerson: "",
    site: "",
    email: "",
    phone: "",
    vk: "",
    classmates: "",
    facebook: "",
    insta: "",
});

export const schema = computed(() => [
    {
        component: ChInput,
        placeholder: "E-mail или телефон",
        id: "fullNameNko",
        error: "",
        model: "fullNameNko",
        label: "Полное наименование НКО *",
        tooltip: "Наименование организации согласно Уставу",
        apiKey: "name",
        condition: (model: TForm) => model.isShowStep1,
    },
    {
        component: ChTextArea,
        label: "Краткое описание деятельности *",
        placeholder: "",
        id: "shortDescriptionActivity",
        tooltip:
            "Опишите вашу миссию. Данное описание будет отражаться в карточке вашего НКО в каталоге на нашем сайте.",
        error: "",
        model: "shortDescriptionActivity",

        maxLength: 150,
        fullSize: false,
        condition: (model: TForm) => model.isShowStep1,
    },
    {
        component: ChTextArea,
        type: "text",
        label: "Полное описание деятельности *",
        placeholder: "",
        id: "fullDescriptionActivity",
        tooltip:
            "Расскажите, на что направлена деятельность НКО, кому и как помогает ваша организация. Данное описание будет отражаться на странице вашего НКО на нашем сайте.",
        model: "fullDescriptionActivity",
        error: "",
        maxLength: 2000,
        fullSize: true,
        condition: (model: TForm) => model.isShowStep1,
    },
    {
        component: ChMultiselect,
        id: "helpCategory",
        placeholder: "",
        name: "helpCategory",
        options: [
            { id: 2, title: "Взрослым" },
            { id: 1, title: "Детям" },
            { id: 4, title: "Животным" },
            { id: 6, title: "Обществу" },
            { id: 3, title: "Пожилым" },
            { id: 5, title: "Природе" },
        ],
        multiselectLabel: "title",
        trackBy: "id",
        model: "",
        error: "",
        label: "Кому вы помогаете *",
        tooltip: "Выберите одну или несколько целевых групп согласно Уставу НКО",
        multiple: true,
        apiKey: "category",
        limit: 4,
        condition: (model: TForm) => model.isShowStep1,
    },
    {
        component: ChFileUpload,
        label: "Устав НКО *",
        type: "file",
        id: "charter",
        error: "",
        accept: SUPPORTED_FORMATS_DEFAULT.join(","),
        uploadTextTip: "PNG, SVG, AI, PDF, JPG до 5 Мб",
        multiple: false,
        model: "charter",
        tooltip:
            "Документы необходимы для верификации НКО во избежание случаев мошенничества",
        apiKey: "nko_statute",
        size: 10485760,
        condition: (model: TForm) => model.isShowStep1,
    },
    {
        component: ChFileUpload,
        label: "Свидетельство о постановке на учет в налоговом органе *",
        apiKey: "nko_taxes_certificate",
        type: "file",
        id: "certificateRecord",
        error: "",
        accept: SUPPORTED_FORMATS_DEFAULT.join(","),
        uploadTextTip: "PNG, SVG, AI, PDF, JPG до 5 Мб",
        multiple: false,
        model: "certificateRecord",
        size: 10485760,
        condition: (model: TForm) => model.isShowStep1,
    },
    {
        component: ChFileUpload,
        label: "Свидетельство о государственной регистрации НКО *",
        apiKey: "nko_register_certificate",
        type: "file",
        id: "certificateRegistration",
        error: "",
        accept: SUPPORTED_FORMATS_DEFAULT.join(","),
        uploadTextTip: "PNG, SVG, AI, PDF, JPG до 5 Мб",
        multiple: false,
        model: "certificateRegistration",
        size: 10485760,
        condition: (model: TForm) => model.isShowStep1,
    },
    {
        component: ChFileUpload,
        label: "Логотип",
        tooltip:
            "Прикрепите лого НКО в хорошем качестве. Он будет отражаться на странице вашего НКО на нашем сайте.",
        apiKey: "upload_image",
        size: 5242880,
        type: "file",
        id: "logo",
        error: "",
        model: "logo",
        accept: SUPPORTED_FORMATS_DEFAULT.join(","),
        uploadTextTip: "PNG, SVG, AI, PDF, JPG до 5 Мб",
        multiple: false,
        condition: (model: TForm) => model.isShowStep1,
    },
    //step2
    {
        component: ChInput,
        type: "url",
        label: "ИНН *",
        placeholder: "",
        id: "inn",
        model: "inn",
        maxLength: 10,
        apiKey: "inn",
        error: "",
        condition: (model: TForm) => model.isShowStep2,
    },
    {
        component: ChInput,
        type: "text",
        label: "КПП *",
        placeholder: "",
        id: "kpp",
        maxLength: 9,
        apiKey: "kpp",
        model: "kpp",
        error: "",
        condition: (model: TForm) => model.isShowStep2,
    },
    {
        component: ChInput,
        type: "text",
        label: "ОГРН *",
        placeholder: "",
        id: "ogrn",
        maxLength: 13,
        apiKey: "ogrn",
        model: "ogrn",
        error: "",
        condition: (model: TForm) => model.isShowStep2,
    },
    {
        component: ChFormCategoryTitle,
        title: "Банковские реквизиты",
        model: "",
        line: true,
        condition: (model: TForm) => model.isShowStep2,
    },
    {
        component: ChInput,
        type: "text",
        label: "Полное наименование банка *",
        placeholder: "",
        id: "fullNameBank",
        apiKey: "full_name",
        model: "fullNameBank",
        error: "",
        condition: (model: TForm) => model.isShowStep2,
    },
    {
        component: ChInput,
        type: "url",
        label: "БИК *",
        placeholder: "",
        id: "bik",
        maxLength: 9,
        apiKey: "bik",
        model: "bik",
        error: "",
        condition: (model: TForm) => model.isShowStep2,
    },
    {
        component: ChInput,
        type: "url",
        label: "Расчетный счет *",
        placeholder: "",
        id: "countScore",
        maxLength: 20,
        apiKey: "checking_account",
        model: "countScore",
        error: "",
        condition: (model: TForm) => model.isShowStep2,
    },
    {
        component: ChInput,
        type: "url",
        label: "Корреспондентский счет *",
        placeholder: "",
        id: "correspondentScore",
        maxLength: 20,
        apiKey: "correspondent_account",
        model: "correspondentScore",
        error: "",
        condition: (model: TForm) => model.isShowStep2,
    },
    {
        component: ChFormCategoryTitle,
        title: "Юридический адрес",
        model: "",
        line: true,
        condition: (model: TForm) => model.isShowStep2,
    },
    {
        component: ChInput,
        type: "url",
        label: "Город или населенный пункт *",
        placeholder: "",
        id: "city",
        apiKey: "city",
        model: "city",
        error: "",
        condition: (model: TForm) => model.isShowStep2,
    },
    {
        component: ChInput,
        type: "url",
        label: "Адрес *",
        placeholder: "",
        id: "address",
        apiKey: "address",
        model: "address",
        error: "",
        condition: (model: TForm) => model.isShowStep2,
    },
    [
        {
            component: ChInput,
            type: "url",
            label: "Офис/квартира *",
            placeholder: "",
            id: "officeOrFlat",
            apiKey: "office",
            model: "officeOrFlat",
            error: "",
            style: "margin-right: 8px;",
            condition: (model: TForm) => model.isShowStep2,
        },
        {
            component: ChInput,
            type: "url",
            label: "Индекс *",
            placeholder: "",
            id: "index",
            maxLength: 6,
            apiKey: "index",
            model: "index",
            error: "",
            condition: (model: TForm) => model.isShowStep2,
        },
    ],
    // acutal address
    {
        component: ChFormCategoryTitle,
        title: "Фактический адрес",
        model: "",
        line: true,
        condition: (model) => !model.mailingAddress && model.isShowStep2,
    },
    {
        component: ChInput,
        type: "url",
        label: "Город или населенный пункт *",
        placeholder: "",
        id: "city_actual",
        apiKey: "city",
        model: "city_actual",
        error: "",
        condition: (model) => !model.mailingAddress && model.isShowStep2,
    },
    {
        component: ChInput,
        type: "url",
        label: "Адрес *",
        placeholder: "",
        id: "address_actual",
        apiKey: "address",
        model: "address_actual",
        error: "",
        condition: (model) => !model.mailingAddress && model.isShowStep2,
    },
    [
        {
            component: ChInput,
            type: "url",
            label: "Офис/квартира *",
            placeholder: "",
            id: "officeOrFlatActual",
            apiKey: "office",
            model: "officeOrFlatActual",
            error: "",
            style: "margin-right: 8px;",
            condition: (model) => !model.mailingAddress && model.isShowStep2,
        },
        {
            component: ChInput,
            type: "url",
            label: "Индекс *",
            placeholder: "",
            id: "index_actual",
            maxLength: 6,
            apiKey: "index",
            model: "index_actual",
            error: "",
            condition: (model) => !model.mailingAddress && model.isShowStep2,
        },
    ],

    //mailing address
    {
        component: ChFormCategoryTitle,
        title: "Почтовый адрес",
        model: "",
        line: true,
        condition: (model) => !model.actualAddress && model.isShowStep2,
    },
    {
        component: ChInput,
        type: "url",
        label: "Город или населенный пункт *",
        placeholder: "",
        id: "city_mailing",
        apiKey: "city",
        model: "city_mailing",
        error: "",
        condition: (model) => !model.actualAddress && model.isShowStep2,
    },
    {
        component: ChInput,
        type: "url",
        label: "Адрес *",
        placeholder: "",
        id: "address_mailing",
        apiKey: "address",
        model: "address_mailing",
        error: "",
        condition: (model) => !model.actualAddress && model.isShowStep2,
    },
    [
        {
            component: ChInput,
            type: "url",
            label: "Офис/квартира *",
            placeholder: "",
            id: "officeOrFlatMailing",
            apiKey: "office",
            model: "officeOrFlatMailing",
            error: "",
            style: "margin-right: 8px;",
            condition: (model) => !model.actualAddress && model.isShowStep2,
        },
        {
            component: ChInput,
            type: "url",
            label: "Индекс *",
            placeholder: "",
            id: "index_mailing",
            maxLength: 6,
            apiKey: "index",
            model: "index_mailing",
            error: "",
            condition: (model) => !model.actualAddress && model.isShowStep2,
        },
    ],
    {
        component: ChCheckbox,
        type: "checkbox",
        label: "Соглашаюсь на обработку",
        id: "actualAddress",
        model: "actualAddress",
        error: "",
        name: "actualAddress",
        slot: `<p>Фактический адрес совпадает с юридическим</p>`,
        condition: (model) => model.isShowStep2,
    },
    {
        component: ChCheckbox,
        type: "checkbox",
        label: "Соглашаюсь на обработку",
        id: "mailingAddress",
        model: "mailingAddress",
        error: "",
        name: "mailingAddress",
        slot: `<p>Почтовый адрес совпадает с юридическим</p>`,
        condition: (model) => model.isShowStep2,
    },
    //step3
    {
        component: ChInput,
        label: "ФИО руководителя НКО *",
        id: "fullNameDirector",
        apiKey: "nko_director_name",
        placeholder: "",
        model: "fullNameDirector",
        error: "",
        condition: (model) => model.isShowStep3,
    },
    {
        component: ChInput,
        label: "Должность согласно Уставу *",
        model: "workPost",
        id: "workPost",
        placeholder: "",
        apiKey: "nko_director_position",
        error: "",
        condition: (model) => model.isShowStep3,
    },
    {
        component: ChInput,
        label: "ФИО контактного лица *",
        model: "fullNameContactPerson",
        tooltip: "Укажите, с кем мы можем взаимодействовать по возникающим вопросам",
        apiKey: "nko_representative_name",
        id: "fullNameContactPerson",
        placeholder: "",
        error: "",
        condition: (model) => model.isShowStep3,
    },
    {
        component: ChInput,
        label: "Телефон *",
        model: "phoneContactPerson",
        //+79225551234
        apiKey: "nko_representative_phone",
        type: "phone",
        placeholder: "+7",
        maxLength: 12,
        id: "phoneContactPerson",
        error: "",
        condition: (model) => model.isShowStep3,
    },
    {
        component: ChInput,
        label: "Эл. почта *",
        model: "emailContactPerson",
        type: "email",
        //lusta.vlad2001@gmail.com
        placeholder: "email@email.ru",
        apiKey: "nko_representative_email",
        id: "emailContactPerson",
        error: "",
        condition: (model) => model.isShowStep3,
    },
    {
        component: ChInput,
        type: "url",
        label: "Сайт",
        placeholder: "www",
        id: "site",
        model: "site",
        error: "",
        condition: (model) => model.isShowStep3,
    },
    {
        component: ChInput,
        type: "phone",
        label: "Телефон *",
        placeholder: "+7",
        id: "phone",
        error: "",
        model: "phone",
        condition: (model) => model.isShowStep3,
    },
    {
        component: ChInput,
        type: "email",
        label: "Эл. почта *",
        placeholder: "email@email.ru",
        id: "email",
        model: "email",
        error: "",
        condition: (model) => model.isShowStep3,
    },
    {
        component: ChInput,
        type: "url",
        label: "Вконтакте",
        placeholder: "www",
        id: "vk",
        error: "",
        model: "vk",
        condition: (model) => model.isShowStep3,
    },
    {
        component: ChInput,
        type: "url",
        label: "Одноклассники",
        placeholder: "www",
        id: "classmates",
        error: "",
        model: "classmates",
        condition: (model) => model.isShowStep3,
    },
    {
        component: ChInput,
        type: "url",
        label: "Фейсбук",
        placeholder: "www",
        id: "facebook",
        error: "",
        model: "facebook",
        condition: (model) => model.isShowStep3,
    },
    {
        component: ChInput,
        type: "url",
        label: "Инстаграм",
        placeholder: "www",
        id: "insta",
        error: "",
        model: "insta",
        condition: (model) => model.isShowStep3,
    },
]);
export const validationSchema = computed(() => {
    if (form.value.isShowStep1) {
        return object().shape({
            helpCategory: yup
                .mixed()
                .test("helpCategoryLength", "Обязательное поле", (value) => {
                    if (value.length) {
                        return true;
                    }
                    return false;
                }),
            shortDescriptionActivity: yup.string().max(150).required(),
            fullDescriptionActivity: yup.string().max(2000).required(),
            fullNameNko: yup.string().required("Обязательное поле"),
            charter: rules.files(10485760, undefined, true),
            certificateRecord: rules.files(10485760, undefined, true),
            certificateRegistration: rules.files(10485760, undefined, true),
            logo: rules.files(undefined, undefined, true),
        });
    } else if (form.value.isShowStep2) {
        return object().shape({
            inn: rules.inn,
            kpp: rules.kpp,
            ogrn: rules.ogrn,
            fullNameBank: rules.fullNameBank,
            bik: rules.bik,
            countScore: rules.countScore,
            correspondentScore: rules.correspondentScore,
            city: rules.city,
            city_actual: rules.city_actual,
            city_mailing: rules.city_mailing,
            address: rules.address,
            address_actual: rules.address_actual,
            address_mailing: rules.address_mailing,
            officeOrFlat: rules.officeOrFlat,
            officeOrFlatActual: rules.officeOrFlatActual,
            officeOrFlatMailing: rules.officeOrFlatMailing,
            index: rules.index,
            index_actual: rules.index_actual,
            index_mailing: rules.index_mailing,
        });
    } else if (form.value.isShowStep3) {
        return object().shape({
            fullNameDirector: yup.string().required(),
            workPost: yup.string().required(),
            fullNameContactPerson: yup.string().required(),
            phoneContactPerson: rules.phone,
            emailContactPerson: rules.email,
            site: rules.site,
            email: rules.email,
            phone: rules.phone,
            vk: rules.site,
            classmates: rules.site,
            facebook: rules.site,
            insta: rules.site,
        });
    }
    return undefined;
});
