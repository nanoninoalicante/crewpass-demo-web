<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useStorage, useLastChanged, useEventListener } from "@vueuse/core";
import CrewPassButton from "../components/CrewPassButton.vue";
import { random } from "lodash";
const demoEmail = () => `christopher+vessel${random(100, 999)}@nanonino.com`;
const popupUrl = ref(
    import.meta.env.VITE_CP_POPUP_URL_VESSEL ||
        "https://master-dashboard-v1-ojo6h3z4mq-ez.a.run.app/vessellanding"
);
const inputData: any = useStorage("cp-vessel-button-data", {
    data: {
        cpPopupUrl: popupUrl.value,
        cpPartner: "yotspot",
        cpUserEmail: demoEmail(),
        cpUserId: "yotspotuser123",
        cpFirstName: "Chris",
        cpLastName: "Hill",
        cpNationality: "UK",
        cpDob: "1987-03-29",
        cpGender: "male",
        cpCountryCode: "+44",
        cpPhone: "7411103268",
        cpStreetAddress: "Calle Poeta Campos Vasallo 30",
        cpCity: "Alicante",
        cpState: "Alicante",
        cpCountry: "Spain",
        cpCountryIsoCode: "ESP",
        cpNationalityIsoCode: "ESP",
        cpZipcode: "03004",
    },
});
const fullPoupupUrl = ref("");
const lastChanged = useLastChanged(inputData.value);
const inputs = computed(() => {
    let arr = [];
    for (const input in inputData.value.data) {
        arr.push({ key: input, value: inputData.value.data[input] });
    }
    return arr;
});
useEventListener(window, "message", (message: any) => {
    console.log("message origin: ", message.origin);
    console.log("message: ", message.data);
    if (message.data?.url) {
        fullPoupupUrl.value = message.data?.url;
    }
});
const update = () => {
    window.location.reload();
};
const restoreSettings = () => {
    inputData.value = null;
    window.location.reload();
};

onMounted(() => {
    console.log("env var: ", JSON.stringify(import.meta.env));
    popupUrl.value = import.meta?.env?.VITE_CP_POPUP_URL_VESSEL || "";
});
</script>

<template>
    <main class="w-full md:w-4/5 flex flex-col justify-center items-center">
        <h1 id="title" class="text-lg font-medium">Vessel Integration</h1>
        <button
            @click="restoreSettings"
            class="mt-4 mb-10 py-2 px-4 rounded-xl bg-orange-400 hover:bg-gray-400 text-md font-medium"
        >
            Restore Default Settings
        </button>
        <div id="cp-holder-1" class="flex justify-center flex-col items-center">
            <button
                v-if="lastChanged"
                @click="update"
                class="my-0 py-2 px-4 rounded-xl bg-yellow-400 hover:bg-gray-400 text-xl font-medium"
            >
                Changed - Update
            </button>
            <CrewPassButton v-else :input-data="inputData"></CrewPassButton>
            <div class="flex mt-4">
                <p>
                    Url:
                    <span
                        class="text-sm text-gray-500 text-clip overflow-hidden break-all"
                        >{{ fullPoupupUrl }}</span
                    >
                </p>
            </div>
        </div>
        <div class="flex flex-col w-full md:w-[400px] mt-8">
            <div v-for="item in inputs" class="my-1">
                <label
                    class="text-sm italic ml-4 font-medium text-gray-400"
                    for="inputData.data[item.key]"
                    >{{ item.key }}
                    <span
                        v-if="
                            item.key === 'cpCountryIsoCode' ||
                            item.key === 'cpNationalityIsoCode'
                        "
                    >
                        -
                        <a
                            href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3"
                            target="_blank"
                            class="underline hover:text-gray-600"
                            >ISO 3166 Alpha-3</a
                        ></span
                    ></label
                >
                <input
                    v-model="inputData.data[item.key]"
                    name="inputData.data[item.key]"
                    type="text"
                    class="p-2 border-2 border-gray-200 w-full rounded-xl"
                />
            </div>
        </div>
    </main>
</template>
