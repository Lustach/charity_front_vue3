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
}
