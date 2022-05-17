import { defineStore } from "pinia";
import API from '@/plugins/axios';

export const useAnalyticsStore = defineStore("analytics", {
    // arrow function recommended for full type inference
    state: () => {
        return {
            donationTools: [],
        };
    },
    actions: {
        async getDonationList() {
            let res = (await API.analytics.getDonationList()).results;
            this.donationTools = JSON.parse(JSON.stringify(res));
            this.donationTools[0].name = "Терминалы";
            this.donationTools.unshift({ name: "По всем инструментам" });
        },
    },
});
