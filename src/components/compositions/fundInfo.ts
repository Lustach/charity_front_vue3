import { useProfileStore } from '@/stores/modules/profile/profile'
import { inject } from 'vue'
const API = inject('API')
const profileStore = useProfileStore();
async function setMapFundInfo() {
    if (profileStore.fundIdFromStorage) {
        const fund = profileStore.fund || await API.fill_profile.getFund(profileStore.fundIdFromStorage);
        if (profileStore.isLogo) {
            try {
                const fundLogo = await API.fill_profile.getLogo(profileStore.fund?.media_files.filter(e => e.is_logo).map(e => e.id));
                profileStore.$patch((state)=>state.logoIdFromStorage=fundLogo.id)
                // this.setStateVar({ varName: 'logoIdFromStorage', value: fundLogo.id, });
                fund.upload_image = fundLogo.upload_image;
            } catch (e) {
                console.error(e);
                return false;
            }
        }
        // if (Object.hasOwnProperty.call(this.mapForm, 'step1') && Object.hasOwnProperty.call(this.mapForm, 'step3')) {
        //     this.mapperStepInfo(this.mapForm.step1, fund);
        // }
        this.mapperStepInfo(this.mapForm[this.step], fund);
        if (fund.media_files.length) {
            for (const element of fund.media_files) {
                if (!element.is_logo) {
                    this.mapForm.step1?.media?.model.push({ name: element.upload_image ? element.upload_image : element.upload_video, length: 1, });
                    this.mapForm.step1?.media?.img.push(element.upload_image ? element.upload_image : element.upload_video);
                    this.mapForm.step1?.media?.media_files.push(element.upload_image ? element.upload_image : element.upload_video);
                }
            }
        }
        return true;
    }
}