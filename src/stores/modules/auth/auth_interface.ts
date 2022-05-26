import type { _GettersTree, _ } from 'pinia'
import type { TSignUp } from "@/types/auth"
// import { useProfileStore } from "@/stores/modules/profile/profile";

export interface ICounterStore {
    accessToken: string
    refreshToken: string
    is2faEnabled: boolean
    userId: string
    email: string
    profileId: string
}

type TGetters = _GettersTree<ICounterStore>

export interface ICounterGetters extends TGetters {
    loggedIn: (state: ICounterStore) => string
    userId: (state: ICounterStore) => string
    is2faEnabled: (state: ICounterStore) => boolean
}


type T = Awaited<Promise<PromiseLike<void>>>

export interface ICounterActions {
    destroyToken: () => void
    setTokens: (payload: { access_token: string, refresh_token: string }) => void
    updateToken: () => T
    signUp: (data: TSignUp) => T
    registerUser: (data: { name: string, email: string, username: string, password: string, confirm: string }) => Promise<any>
    setToken: () => T
    loginUser: (payload: { email?: string, phone_number?: string, otp?: string, password: string }) => void
    inspectToken: () => void
    logoutUser: () => void
}
