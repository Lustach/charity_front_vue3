function fixCrlf(e: string): string {
    if (!Array.isArray(e)) {
        e = e.replace(/(\r\n|\n|\r)/g, "\r\n");
    }
    return e;
}
export function fixEnterChar(e: string): string {
    if (!Array.isArray(e)) {
        e = e.replace(/(\r\n|\n|\r)/g, "");
    }
    return e;
}

type TField = {
    value: string
    maxLength: number,
}

export function fieldHandlerMaxLength(field: TField): string {
    if (field.value.length > field.maxLength) {
        field.value = field.value.slice(0, -(field.value.length - field.maxLength));
    }
    return field.value
}

export function validateFieldByTypePhone(field: object) {
    console.log(field);
    // if (field.type === 'phone') {
    //     const fieldValue = JSON.parse(JSON.stringify(field.length));
    //     for (let i = 0; i < fieldValue; i++) {
    //         if (field.match(/[a-z]|[а-я]|[A-Z]|[А-Я]|\.|,|-|_|=|!|@|#|%|&|\$|\^|\*|;|'|\[|]|{|}|"|:|<|>|\?|\/\|:*$[^+]/)) {
    //             field = field.slice(0, -1);
    //         }
    //     }
    // }

    // else if (e.type === 'text') {
    //     // const fieldValue = JSON.parse(JSON.stringify(event.target.value));
    //     let test = event.target.value
    //     // e.model.replaceAll(/[a-z]|[а-я]|[A-Z]|[А-Я]|\.|,|-|_|=|!|@|#|%|&|\$|\^|\*|;|'|\[|]|{|}|"|:|<|>|\(|\)|\||\\|`|\/|e|\+|\?|\/\|:*$/gm,'')
    //     event.target.value.replaceAll(/[a-z]|[а-я]|[A-Z]|[А-Я]|\.|,|-|_|=|!|@|#|%|&|\$|\^|\*|;|'|\[|]|{|}|"|:|<|>|\(|\)|\||\\|`|\/|e|\+|\?|\/\|:*$/gm, '')
    //     let res = test.replaceAll(/[a-z]|[а-я]|[A-Z]|[А-Я]|\.|,|-|_|=|!|@|#|%|&|\$|\^|\*|;|'|\[|]|{|}|"|:|<|>|\(|\)|\||\\|`|\/|e|\+|\?|\/\|:*$/gm, '')
    //     event.target.value = res
    //     this.$set(e, 'model', res);
    //     // for (let i = 0; i < fieldValue.length; i++) {
    //     //     if (fieldValue[i].match(/[a-z]|[а-я]|[A-Z]|[А-Я]|\.|,|-|_|=|!|@|#|%|&|\$|\^|\*|;|'|\[|]|{|}|"|:|<|>|\(|\)|\||\\|`|\/|e|\+|\?|\/\|:*$/)) {
    //     //         console.log(event.target.value)
    //     //         event.target.value = event.target.value.splice(0,-1);
    //     //         console.log(event.target.value)
    //     //     }
    //     // }
    // }
    // if (e.model.length > e.lengthForErrorMsg) {
    //     event.target.value = event.target.value.slice(0, -(e.model.length - e.lengthForErrorMsg));
    //     this.$set(e, 'model', e.model.slice(0, -(e.model.length - e.lengthForErrorMsg)));
    // }
}
export default {
    fixCrlf,
    fixEnterChar,
    validateFieldByTypePhone
}
// export {
//     validateFieldByType
// }


// export default {
//     methods: {
//     },
//     watch: {
//         actualAddress: {
//             handler() {
//                 this.submitFormActualAddress();
//                 // this.submitForm()
//             },
//             deep: true,
//         },
//         mailAddress: {
//             handler() {
//                 this.submitFormMailAddress();
//                 // this.submitForm()
//             },
//             deep: true,
//         },
//         legalAddressCheckBoxes: function () {
//             //todo может вместо закоменченых условий попробовать о а не n?
//             this.submitForm();
//             // if (n.findIndex(e => e === 'mail_address') === -1) {
//             this.$nextTick(() => {
//                 this.validateFieldMailAddress('city1', false);
//                 this.$refs?.formMailAddress?.$refs?.formMailAddress1.validate();
//                 this.validateFormByFields(this.mailAddress, 'formMailAddress');
//             });
//             // }
//             // if (n.findIndex(e => e === 'actual_address') === -1) {
//             this.$nextTick(() => {
//                 // this.validateFieldAddressByType('city0',false,)
//                 this.validateFieldActualAddress('city0', false);
//                 this.$refs.formActualAddress?.$refs?.formActualAddress1.validate();
//                 this.validateFormByFields(this.actualAddress, 'formActualAddress');
//             });
//             // }
//         },
//         step: function (n) {
//             this.$nextTick(() => {
//                 this.validateFormByFields(this.mapForm[n]);
//                 if (n === 'step2') {
//                     if (this.legalAddressCheckBoxes.findIndex(e => e === 'mail_address') === -1) {
//                         this.validateFormByFields(this.mailAddress, 'formMailAddress');
//                     }
//                     if (this.legalAddressCheckBoxes.findIndex(e => e === 'actual_address') === -1) {
//                         this.validateFormByFields(this.actualAddress, 'formActualAddress');
//                     }
//                 }
//             });
//         },
//     },
// };
