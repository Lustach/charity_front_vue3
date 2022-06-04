import * as yup from "yup";
export const FILE_SIZE_DEFAULT = 5242880;
export const SUPPORTED_FORMATS_DEFAULT = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
    "application/pdf",
    "image/svg+xml",
];
const urlPattern = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
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
    //
    site: yup.string().matches(
        // /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        urlPattern,
        "Неверный формат сайта"
    ),
    // vk: yup.string().matches(urlPattern, "Неверный формат сайта"),
    // classmates: yup.string().matches(urlPattern, "Неверный формат сайта"),
    // facebook: yup.string().matches(urlPattern, "Неверный формат сайта"),
    // insta: yup.string().matches(urlPattern, "Неверный формат сайта"),


    files: (FILE_SIZE?: number = FILE_SIZE_DEFAULT, SUPPORTED_FORMATS?: Array<string> = SUPPORTED_FORMATS_DEFAULT, isRequired: boolean) => yup
        .mixed()
        .test("fileNameLength", "Слишком длинное название файла", (value) => {
            console.log(value,'value file');
            
            if (value?.length) {
                for (const iterator of value) {
                    if (iterator.file.name.length >= 100) {
                        return false;
                    }
                }
            }
            return true;
        })
        .test("fileSize", "Вы превысили допустимый размер файла", (value) => {
            if (value?.length) {
                for (const iterator of value) {
                    return iterator.file.size <= FILE_SIZE;
                }
            }
            return true;
        })
        .test('requiredFiles', "Обязательное поле", (value, e) => {
            console.log(e, 'e');
            if (isRequired) {
                if (value?.length) return true
                return false
            } return true
        })
        .test(
            "fileType",
            "Unsupported File Format",
            (value) => {
                if (value) {
                    for (const iterator of value) {
                        if (!SUPPORTED_FORMATS.includes(iterator?.file.type)) return false;
                    }
                }
                return true;
            }
            // SUPPORTED_FORMATS.includes(value[0]?.file.type)
        )

    // }

}
