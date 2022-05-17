import { useProfileStore } from '@/stores/modules/profile/profile'
const profileStore = useProfileStore();
import API from '@/plugins/axios';

export async function* getRequisitesInfo() {
    let bankDetails = null;
    let legalAddress = null;
    let actualAddress = null;
    let mailingAddress = null;

    const { bankDetailsIdFromStorage, legalAddressIdFromStorage, actualAddressIdFromStorage, mailingAddressIdFromStorage } = profileStore

    if (bankDetailsIdFromStorage) {
        bankDetails = profileStore.bankDetails || await API.fill_profile.getBankDetails(bankDetailsIdFromStorage);
    }
    if (legalAddressIdFromStorage) {
        legalAddress = await API.fill_profile.getLegalAddress(legalAddressIdFromStorage);
    }
    if (actualAddressIdFromStorage) {
        actualAddress = await API.fill_profile.getActualAddress(actualAddressIdFromStorage);
    }
    if (mailingAddressIdFromStorage) {
        mailingAddress = await API.fill_profile.getMailingAddress(mailingAddressIdFromStorage);
    }
    yield { bankDetails, legalAddress, actualAddress, mailingAddress }
    yield { actualAddressIdFromStorage, mailingAddressIdFromStorage }
}