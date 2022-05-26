import { useProfileStore } from '@/stores/modules/profile/profile';
const profileStore = useProfileStore();
enum BidsStatus {
    REJECTED = "REJECTED",
    OPENED = "OPENED",
    CLOSED = "CLOSED"
}
enum BidsName {
    bankdetailsbid = "bankdetailsbid",
    actualaddressbid = "actualaddressbid",
    mailingaddressbid = "mailingaddressbid",
    legaladdressbid = "legaladdressbid"
}
type TBidsDetails = {
    id: number,
    bid_status: TBidsStatus
    bid_date: String
}
type TBidsStatus = BidsStatus[0] | BidsStatus[1] | BidsStatus[2]
type TBids = {
    fundbid: TBidsDetails | null,
    bankdetailsbid: TBidsDetails | null,
    actualaddressbid: TBidsDetails | null,
    mailingaddressbid: TBidsDetails | null,
    legaladdressbid: TBidsDetails | null,
}

const bids: TBids = profileStore.bids

const bidsStatus = (bidName: BidsName): boolean => {
    if (bids[bidName]?.bid_status) {
        return bids[bidName]?.bid_status === 'OPENED';
    }
    else return false
}
const disabledBtn = (bidName: BidsName): boolean => {
    if (bids[bidName])
        return (getBidStatus(bidName, 'CLOSED') || getBidStatus(bidName, 'REJECTED'));
    else return false
}
const getBidStatus = (bidName: BidsName, bidStatus: TBidsStatus): boolean => {
    if (bids[bidName]?.bid_status) {
        return bids[bidName]?.bid_status === bidStatus;
    }
    else return false
}

export default {
    bidsStatus,
    disabledBtn,
    getBidStatus
}