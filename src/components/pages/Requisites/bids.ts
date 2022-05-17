import { computed } from 'vue';
import { useProfileStore } from "@/stores/modules/profile/profile";
import API from '@/plugins/axios'
let profileStore = useProfileStore();

function bidsStatus(bidName) {
    if (profileStore.bids[bidName]?.bid_status) {
        return profileStore.bids[bidName]?.bid_status === "OPENED";
    }
}
function disabledBtn(bidName) {
    if (profileStore.bids[bidName]) {
        return getBidStatus(bidName, "CLOSED") || getBidStatus(bidName, "REJECTED");
    }
}
function getBidStatus(bidName, bidStatus) {
    if (profileStore.bids[bidName]?.bid_status) {
        return profileStore.bids[bidName]?.bid_status === bidStatus;
    }
}
export const isShowAlert = computed(() => {
    return (
        getBidStatus("bankdetailsbid", "REJECTED") ||
        getBidStatus("actualaddressbid", "REJECTED") ||
        getBidStatus("mailingaddressbid", "REJECTED") ||
        getBidStatus("legaladdressbid", "REJECTED")
    );
});

export const isDiscardBtnDisabled = computed(() => {
    return (
        disabledBtn("bankdetailsbid") &&
        disabledBtn("actualaddressbid") &&
        disabledBtn("mailingaddressbid") &&
        disabledBtn("legaladdressbid")
    );
});
export const isBidStatusOpened = computed(() => {
    return (
        bidsStatus("bankdetailsbid") ||
        bidsStatus("actualaddressbid") ||
        bidsStatus("mailingaddressbid") ||
        bidsStatus("legaladdressbid")
    );
});
export async function changeBidStatus(fnName: string, actionName: string) {
    const bidsDescription = {
        bankdetailsbid: {
            deleteApiName: "bank_details_detail",
            archiveApiName: "bank_details_to_archive",
        },
        mailingaddressbid: {
            deleteApiName: "mailing_address_detail",
            archiveApiName: "mailing_address_to_archive",
        },
        actualaddressbid: {
            deleteApiName: "actual_address_detail",
            archiveApiName: "actual_address_to_archive",
        },
        legaladdressbid: {
            deleteApiName: "legal_address_detail",
            archiveApiName: "legal_address_to_archive",
        },
    };
    for (const key in bidsDescription) {
        if (profileStore.bids[key]?.id) {
            await API.bid[fnName](profileStore.bids[key]?.id, bidsDescription[key][actionName]);
        }
    }
    await profileStore.getBids();
}

