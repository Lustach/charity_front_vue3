import Wrapper from '@/views/Wrapper';
import Home from '@/views/Home';
import Fund from '@/views/Fund';
import Program from '@/views/Program';
import About from '@/views/About';
import Price from '@/views/Price';
import Payment from '@/views/Payment';
import Registration from '@/views/Authentication/Registration';
import Login from '@/views/Authentication/Login';
import RestorePassword from '@/views/Authentication/RestorePassword';
import FillProfile from '@/views/FillProfile';
import ReviewProfile from '@/views/Authentication/ReviewProfile';
import RejectProfile from '@/views/Authentication/RejectProfile';
import NkoInfo from '@/views/Lk/NkoInfo';
import Requisite from '@/views/Lk/Requisite';
import Settings from '@/views/Lk/Settings';
import Security from '@/views/Lk/Security';
import GenerateQr from '@/views/Lk/GenerateQr';
import CryptoWidget from '@/views/Lk/CryptoWidget';
import Analytics from '@/views/Lk/Analytics';
import Terminals from '@/views/Lk/Terminals';
import ActivationSpacer from '@/views/Email/ActivationSpacer';
import ResetPasswordSpacer from '@/views/Email/ResetPasswordSpacer';
import t2FaEnableActivationSpacer from '@/views/Email/2FaEnableActivationSpacer';
import t2FaDisableActivationSpacer from '@/views/Email/2FaDisableActivationSpacer';
import NotFound from '@/views/NotFound';

import approvedStatus from '@/router/middleware/approvedStatus';
import auth from '@/router/middleware/auth';

const routes = [
    {
        path: '',
        component: Wrapper,
        children: [{
            path: '/',
            component: Home,
            meta: { lk: false, authReq: false, },
        }, {
            path: '/fund',
            component: Fund,
            meta: { lk: false, authReq: false, },
        }, {
            path: '/program',
            component: Program,
            meta: { lk: false, authReq: false, },
        }, {
            path: '/about',
            component: About,
            meta: { lk: false, authReq: false, },
        }, {
            path: '/price',
            component: Price,
            meta: { lk: false, authReq: false, },
        },
        {
            path: '/payment',
            component: Payment,
            meta: { lk: false, authReq: false, },
        },
        {
            path: '/registration',
            component: Registration,
        }, {
            path: '/login',
            component: Login,
            name: 'Login',
        }, {
            path: '/password',
            component: RestorePassword,
        }, {
            path: '/password?action=:id', //возможны два случая -> восстановление и создание нового пароля create restore
            component: RestorePassword,
        }, {
            path: '/fill_profile',
            component: FillProfile,
            name: 'FillProfile',
        }, {
            path: '/fill_profile?step=:id',
            component: FillProfile,
            name: 'FillProfile',
        }, {
            path: '/review_profile',
            component: ReviewProfile,
            name: 'ReviewProfile',
            // meta: {middleware: [approvedStatus]},
        },
        {
            path: '/reject_profile',
            component: RejectProfile,
            name: 'RejectProfile',
        },
        {
            path: '/lk/nko_info',
            component: NkoInfo,
            // meta: {middleware: [auth, approvedStatus,],},
        }, {
            path: '/lk/requisite',
            component: Requisite,
            name: 'Requisite',
            // meta: {middleware: [auth, approvedStatus,],},
        }, {
            path: '/lk/settings',
            component: Settings,
            name: 'Settings',
            // meta: {middleware: [auth, approvedStatus,],},
        }, {
            path: '/lk/security',
            component: Security,
            name: 'Security',
            // meta: {middleware: [auth, approvedStatus,],},
        }, {
            path: '/lk/generate_qr',
            component: GenerateQr,
            name: 'GenerateQr_v',
            // meta: {middleware: [auth, approvedStatus,],},
        }, {
            path: '/lk/crypto_widget',
            component: CryptoWidget,
            name: 'CryptoWidget',
            // meta: {middleware: [auth, approvedStatus,],},
        }, {
            path: '/lk/analytics',
            component: Analytics,
            name: 'Analytics',
            // meta: {middleware: [auth, approvedStatus,],},
        }, {
            path: '/lk/terminals',
            component: Terminals,
            name: 'Terminals',
            // meta: {middleware: [auth, approvedStatus,],},
        },
        {
            path: '/activate/*',
            component: ActivationSpacer,
        },
        {
            path: '/reset_password/*',
            component: ResetPasswordSpacer,
        },
        {
            path: '/confirmation_enable_2fa/*',
            component: t2FaEnableActivationSpacer,
        },
        {
            path: '/confirmation_delete_2fa/*',
            component: t2FaDisableActivationSpacer,
        },
        ],
    },
    {
        path: '*',
        component: NotFound,
    },
];


export default routes;
