import { createRouter, createWebHistory } from "vue-router";
import VesselIntegrationButtonView from "../views/VesselIntegrationButtonView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "vesselintegration",
            component: VesselIntegrationButtonView,
        },
        {
            path: "/crew",
            name: "crewintegration",
            component: () => import("../views/CrewIntegrationView.vue"),
        },
        {
            path: "/crew-clean",
            name: "crewintegration-clean",
            component: () => import("../views/CrewIntegrationCleanView.vue"),
        },
        {
            path: "/agency-dev",
            name: "agencyintegration-dev",
            component: () => import("../views/AgencyIntegrationView.vue"),
        },
        {
            path: "/crew-messages",
            name: "crewintegration-messages",
            component: () =>
                import("../views/CrewIntegrationPostMessageView.vue"),
        },
    ],
});

export default router;
