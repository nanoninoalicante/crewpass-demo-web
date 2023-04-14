<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useEventListener, useLastChanged } from "@vueuse/core";
import { useRoute } from "vue-router";
const buttonCssUrl = import.meta.env.VITE_CP_AGENCY_ORIGINAL_CSS_URL;
const buttonJsUrl = import.meta.env.VITE_CP_AGENCY_ORIGINAL_JS_URL;

const route = useRoute();
const messages: any = ref([]);
const origin = ref("");
const popupUrl = ref("");
const commitId = ref("");

const partnerId: any = ref(route.params?.agency || "crewpass");
const lastChanged = useLastChanged(partnerId);
const update = () => {
    window.location.href = `/agency-original/${partnerId.value}`;
};

useEventListener(window, "message", (message: any) => {
    console.log("message origin: ", message.origin);
    console.log("message: ", message.data);
    const data =
        message && message.data && typeof message.data === "string"
            ? JSON.parse(message.data || "{}")
            : {};
    if (message.origin === origin.value && data.target === "crewpass") {
        popupUrl.value = data.url;
        commitId.value = data.commitId;
    }
    if (message.origin !== origin.value) {
        messages.value.push(message);
    }
});

onMounted(() => {
    function ct(t) {
        var a = document.head,
            c = document.createElement("link");
        (c.rel = "stylesheet"), (c.href = buttonCssUrl), a.appendChild(c);
        var n = document.createElement("script");
        (n.type = "text/javascript"),
            (n.src = buttonJsUrl),
            (n.onreadystatechange = t),
            (n.onload = t),
            a.appendChild(n);
    }
    ct(function () {
        new CrewPass({ v: partnerId.value }).t(function () {});
    });
    origin.value = window.location.origin;
});
</script>

<template>
    <main class="w-full md:w-4/5 flex flex-col justify-center items-center">
        <h1 id="title" class="text-lg font-medium">
            Agency Integration Original
        </h1>
        <div
            class="my-8 flex flex-col justify-center items-center mb-4 overflow-hidden break-all w-2/3"
        >
            <label for="agencyId" class="text-sm text-gray-500 py-4"
                >Partner ID</label
            >
            <div class="flex flex-row justify-stretch space-x-2">
                <input
                    v-model="partnerId"
                    type="text"
                    name="agencyId"
                    class="text-md font-medium p-4 rounded-3xl border-2 border-gray-200"
                    placeholder="partnerId"
                />

                <button
                    @click="update"
                    class="py-2 px-4 rounded-3xl text-xl disabled:cursor-not-allowed font-medium"
                    :class="
                        lastChanged
                            ? 'bg-yellow-400 text-gray-700 hover:bg-yellow-300'
                            : 'bg-gray-200 text-gray-400 hover:bg-gray-200'
                    "
                    :disabled="!lastChanged"
                >
                    Update
                </button>
            </div>
            <div class="flex flex-col my-4 space-y-4">
                <span class="text-xs break-all">Popup Url: {{ popupUrl }}</span>
                <span class="text-xs break-all">Commit ID: {{ commitId }}</span>
            </div>
        </div>
        <div id="cp-holder-1" class="w-full">
            <div id="cp-login-wrapper">
                <div id="cp-login"></div>
                <div id="cp-login-response"></div>
            </div>
        </div>
        <div v-if="messages.length > 0" class="mt-8 w-full">
            <h1 id="title" class="text-md font-medium text-gray-500">
                Messages
            </h1>
            <ul class="mt-4">
                <li
                    v-for="message in messages"
                    class="p-2 m-1 bg-gray-200 rounded-xl"
                >
                    <pre class="text-xs text-gray-600">{{
                        message.origin
                    }}</pre>
                    <pre class="text-xs text-gray-600 whitespace-pre-wrap">{{
                        message.data
                    }}</pre>
                </li>
            </ul>
        </div>
    </main>
</template>
