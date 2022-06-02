// import type TForm from '@/'
import { form } from '@/components/pages/FillProfile/form'
export const steps = [
    { value: true, description: 'Общая информация', },
    { value: false, description: 'Реквизиты', },
    { value: false, description: 'Контакты', },
]
// async nextStep() {
//     this.isBtnLoading = true;
//     if (this.step === 'step1') {
//         this.step = 'step2';
//         this.setActiveStep(1);
//         await this.step1Request();
//     } else if (this.step === 'step2') {
//         this.step = 'step3';
//         this.setActiveStep(2);
//         await this.step2Request();
//     } else if (this.step === 'step3') {
//         await this.step3Request();
//     }
//     this.isBtnLoading = false;
// },
export function setActiveStep(i:number) {
    steps.forEach(e => e.value = false);
    steps[i].value = true;
    window.scrollTo(0, 0);
}
export function backStep() {
    if (form.value.isShowStep2) {
        form.value.isShowStep1 = true
        form.value.isShowStep2 = false
        form.value.isShowStep3 = false
        setActiveStep(1);
    } else if (form.value.isShowStep3) {
        form.value.isShowStep2 = true
        form.value.isShowStep3 = false
        form.value.isShowStep1 = false
        setActiveStep(1);
    }

    // if (this.step === 'step2') {
    //     this.step = 'step1';
    //     this.setActiveStep(0);
    // } else if (this.step === 'step3') {
    //     this.step = 'step2';
    //     this.setActiveStep(1);
    // }
}
        // setStepModel() {
        //     if (this.fundIdFromStorage) {
        //         this.$store.state.profile.stepFromStorage = 'step1';
        //         if (this.fund.name) {
        //             this.step = 'step2';
        //             this.$store.state.profile.stepFromStorage = 'step2';
        //         }
        //         if (this.bankDetails?.inn) {
        //             this.step = 'step3';
        //             this.$store.state.profile.stepFromStorage = 'step3';
        //         }
        //         this.setActiveStep(this.step[this.step.length - 1] - 1);
        //     } else {
        //         this.step = 'step1';
        //     }
        // },

