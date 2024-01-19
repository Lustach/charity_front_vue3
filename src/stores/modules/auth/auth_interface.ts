import type { _GettersTree, } from 'pinia'
import type { TSignUp } from "@/types/auth"
// import { useProfileStore } from "@/stores/modules/profile/profile";

export interface IAuthState {
    accessToken: string | undefined
    refreshToken: string | undefined
    is2faEnabled: boolean | undefined
    userId: string | undefined
    email: string | undefined
    profileId: string | undefined
}

type TGetters = _GettersTree<IAuthState>

export interface IAuthGetters extends TGetters {
    loggedIn: (state: IAuthState) => string | undefined
}


type T = Awaited<Promise<PromiseLike<void>>>

export interface IAuthActions {
    destroyToken: () => void
    setTokens: (payload: { access_token: string, refresh_token: string }) => void
    updateToken: () => T
    signUp: (data: TSignUp) => T
    registerUser: (data: { name: string, email: string, password: string, }) => Promise<any>
    setToken: () => T
    loginUser: (payload: { email?: string, phone_number?: string, otp?: string, password: string }) => void
    inspectToken: () => void
    logoutUser: () => void
}
