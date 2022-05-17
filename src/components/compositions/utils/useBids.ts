import { useProfileStore } from '@/stores/modules/profile/profile';
let profileStore = useProfileStore();
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

let bids: TBids = profileStore.bids

let bidsStatus = (bidName: BidsName): Boolean => {
    if (bids[bidName]?.bid_status) {
        return bids[bidName]?.bid_status === 'OPENED';
    }
    else return false
}
let disabledBtn = (bidName: BidsName): Boolean => {
    if (bids[bidName])
        return (getBidStatus(bidName, 'CLOSED') || getBidStatus(bidName, 'REJECTED'));
    else return false
}
let getBidStatus = (bidName: BidsName, bidStatus: TBidsStatus): Boolean => {
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