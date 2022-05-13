import * as yup from "yup";
export const rules = {
    email: yup
        .string()
        .matches(/\S+@\S+\.+(com|ru|org|net|info|io)$/, "Неверный формат эл. почты")
        .required(),
    phone: yup
        .string()
        .matches(/^\+7[0-9]{10}$/, "Невалидный номер телефона")
        .required(),
    emailOrPhone: yup
        .string()
        .test("emailOrPhone", "Неверный e-mail или телефон", function (value) {
            if (value === "") {
                return false;
            } else {
                if (
                    value &&
                    (new RegExp(/\S+@\S+\.+(com|ru|org|net|info|io)$/).test(value) ||
                        new RegExp(/^\+7[0-9]{10}$/).test(value))
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        })
        .required(),
    code_2fa: yup.string().min(6).max(6).required(),
    password: yup.string().min(8).required(),
    passwordConfirm: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Повторите пароль"),

    // requisites: {
    inn: yup.string().min(10).max(10).required(),
    kpp: yup.string().min(9).max(9).required(),
    ogrn: yup.string().min(13).max(13).required(),
    fullNameBank: yup.string().required(),
    bik: yup.string().min(9).max(9).required(),
    countScore: yup.string().min(20).max(20).required(),
    correspondentScore: yup.string().min(20).max(20).required(),
    city: yup.string().required(),
    city_actual: yup.string().required(),
    city_mailing: yup.string().required(),
    address: yup.string().required(),
    address_actual: yup.string().required(),
    address_mailing: yup.string().required(),
    officeOrFlat: yup.string().required(),
    officeOrFlatActual: yup.string().required(),
    officeOrFlatMailing: yup.string().required(),
    index: yup.string().min(6).max(6).required(),
    index_actual: yup.string().min(6).max(6).required(),
    index_mailing: yup.string().min(6).max(6).required(),
    // }

}
