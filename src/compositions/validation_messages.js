import { setLocale } from "yup";

export const validationMessages = setLocale({
    mixed: {
        required: "Обязательное поле",
    },
    string: {
        email: "Невалидный e-mail",
        min: "Минимальная длина ${min} символов",
        max: "Максимальная длина ${max} символов",
        emailOrPhone: "Неверный e-mail или телефон"
    },
});

// export default {
//     test
// }