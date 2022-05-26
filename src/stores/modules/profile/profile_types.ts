import type { _GettersTree } from 'pinia'
import { defineStore } from 'pinia'
type TMediaFiles = {
    url: string,
    id: number,
    name: string,
    short_description: string,
    video_ref: string,
    image_ref: string,
    upload_video: null,
    upload_image: string,
    upload_date: string,
    is_background: boolean,
    is_logo: boolean,
    is_carousel_main: boolean,
    fund: number,
    program: any
}
enum FundStatus {
    UNAPPROVED = "UNAPPROVED",
    IN_PROGRESS = "IN_PROGRESS",
    APPROVED = "APPROVED",
    DECLINED = "DECLINED",
}
export type TFund = {
    url: string,
    id: number,
    name: string,
    category: number[],
    profiles: number[],
    short_description: string,
    long_description: string,
    fundraised: null,
    donated: null,
    spent: null, partner: string,
    fund_site: number[],
    crypto_widget: number,
    bank_details: number,
    terminals: number[],
    status: FundStatus[0] | FundStatus[1] | FundStatus[2] | FundStatus[3],
    nko_director_name: string,
    nko_director_position: string,
    nko_representative_name: string,
    nko_representative_phone: string,
    nko_representative_email: string,
    nko_reference: string,
    nko_phone: string,
    nko_email: string,
    vip_partner: string,
    programs: number[],
    statements: number[],
    media_files: TMediaFiles[],
    vk_ref: string,
    facebook_ref: string,
    ok_ref: string,
    instagram_ref: string,
    supported: number,
    supported_monthly: number,
    nko_statute: string,
    nko_taxes_certificate: string,
    nko_register_certificate: string,
    registration_date: string
}


export type TBids = {
    fundbid?: null,
    bankdetailsbid: TBid | undefined,
    actualaddressbid: TBid | undefined,
    mailingaddressbid: TBid | undefined,
    legaladdressbid: TBid | undefined,
}
type TBid = {
    id: number,
    bid_status: string,
    bid_date: string,
}


export type TBankDetails = {
    url: string,
    id: number,
    fund: number,
    inn: string,
    kpp: string,
    ogrn: string,
    full_name: string,
    bik: string,
    checking_account: string,
    correspondent_account: string,
    legal_address: number,
    actual_address: number,
    mailing_address: number,
}

export interface IProfileState {
    fund: TFund | undefined,
    bankDetails: TBankDetails | undefined,
    bids: TBids | undefined,
    stepFromStorage: number | undefined,
    bankDetailsIdFromStorage: number | undefined,
    fundIdFromStorage: number | undefined,
    mailingAddressIdFromStorage: number | undefined,
    actualAddressIdFromStorage: number | undefined,
    legalAddressIdFromStorage: number | undefined,
    fillAllStepsFromStorage: number | undefined,
    logoIdFromStorage: number | undefined,
    isLogo: boolean | undefined,
    loading: boolean,
    authStore: any,
}

type TGetters = _GettersTree<IProfileState>

export interface IProfileGetters extends TGetters {
    getStepFromStorage: (state: IProfileState) => number | undefined,
    getBankDetailsIdFromStorage: (state: IProfileState) => number | undefined,
    getFundIdFromStorage: (state: IProfileState) => number | undefined,
    getMailingAddressIdFromStorage: (state: IProfileState) => number | undefined,
    getActualAddressIdFromStorage: (state: IProfileState) => number | undefined,
    getLegalAddressIdFromStorage: (state: IProfileState) => number | undefined,
    getFillAllStepsFromStorage: (state: IProfileState) => number | undefined,
    getIsLogo: (state: IProfileState) => boolean | undefined,
    getFund: (state: IProfileState) => TFund | undefined,
    getBankDetails: (state: IProfileState) => TBankDetails | undefined,
    getLogoIdFromStorage: (state: IProfileState) => number | undefined,
}


type T = Awaited<Promise<PromiseLike<void>>>

export interface IProfileActions {
    updateMediaFile: (payload: number) => void
    deleteMediaFiles: (payload: number) => void
    setFundMediaFiles: (payload: number) => void
    getBids: () => Promise<{ bids: TBids; }>
    initDataFromLocalStorage: () => void
}
