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
    inn: yup.string().min(10).max(10),
    kpp: yup.string().min(9).max(9),
    ogrn: yup.string().min(13).max(13),
    fullNameBank: yup.string().min(1).max(100),
    bik: yup.string().min(9).max(9),
    countScore: yup.string().min(20).max(20),
    correspondentScore: yup.string().min(20).max(20),
    city: yup.string().min(1).max(100),
    city_actual: yup.string().min(1).max(100),
    city_mailing: yup.string().min(1).max(100),
    address: yup.string().min(1).max(100),
    address_actual: yup.string().min(1).max(100),
    address_mailing: yup.string().min(1).max(100),
    officeOrFlat: yup.string().min(1).max(100),
    officeOrFlatActual: yup.string().min(1).max(100),
    officeOrFlatMailing: yup.string().min(1).max(100),
    index: yup.string().min(6).max(6),
    index_actual: yup.string().min(6).max(6),
    index_mailing: yup.string().min(6).max(6),
    // }

}
