<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useEventListener, useLastChanged } from "@vueuse/core";
import { useRoute } from "vue-router";
const buttonCssUrl = import.meta.env.VITE_CP_AGENCY_ORIGINAL_CSS_URL;
const buttonJsUrl = import.meta.env.VITE_CP_AGENCY_ORIGINAL_JS_URL;

const route = useRoute();
const messages: any = ref([]);
const origin = ref("");
const popupUrl: any = ref(route.query?.popupUrl || "");

const commitId = ref("");

const partnerId: any = ref(route.params?.agency || "crewpass");
const lastChanged = useLastChanged(partnerId);
const lastChangedPopupUrl = useLastChanged(popupUrl);

const clear = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.reload();
};

const update = () => {
    const currentUrl: any = window.location.href;
    const urlObj: any = new URL(currentUrl);
    const baseUrl: any = `${urlObj.protocol}//${urlObj.host}/agency-original/${partnerId.value}`;
    const newUrlObj: any = new URL(baseUrl);
    newUrlObj.search = urlObj.search ? urlObj.search.toString() : "";
    const urlWithParams = newUrlObj.toString();

    console.log("url ", urlWithParams);
    window.location.href = urlWithParams;
};

const updatePopupUrl = () => {
    const url = new URL(window.location.href);

    // Create a new URLSearchParams object from the URL's search parameters
    const searchParams = new URLSearchParams(url.search);

    // Append the query string parameter
    searchParams.append("popupUrl", popupUrl.value);

    // Update the search property of the URL object with the modified search parameters
    url.search = searchParams.toString();

    const newUrl = url.toString();
    console.log("newUrl ", newUrl);
    // Navigate to the new URL
    window.location.href = newUrl;
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
    console.log("css: ", buttonCssUrl);
    console.log("js: ", buttonJsUrl);
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
        new CrewPass({ v: partnerId.value, popupUrl: popupUrl.value }).t(
            function () {}
        );
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
            class="my-8 flex flex-col justify-center items-center mb-4 overflow-hidden break-all w-full md:w-2/3 space-y-2"
        >
            <label for="agencyId" class="text-sm text-gray-500 py-4"
                >Partner ID</label
            >
            <div
                class="flex w-full flex-row justify-center items-stretch space-x-2"
            >
                <input
                    v-model="partnerId"
                    type="text"
                    name="agencyId"
                    class="text-md flex-auto font-medium p-4 rounded-3xl border-2 border-gray-200"
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
            <div class="flex flex-row justify-stretch w-full space-x-2">
                <input
                    v-model="popupUrl"
                    type="text"
                    name="popupUrl"
                    class="text-md flex-auto font-medium p-4 rounded-3xl border-2 border-gray-200"
                    placeholder="popup Url"
                />

                <button
                    @click="updatePopupUrl"
                    class="py-2 px-4 rounded-3xl text-xl disabled:cursor-not-allowed font-medium"
                    :class="
                        lastChangedPopupUrl
                            ? 'bg-yellow-400 text-gray-700 hover:bg-yellow-300'
                            : 'bg-gray-200 text-gray-400 hover:bg-gray-200'
                    "
                    :disabled="!lastChangedPopupUrl"
                >
                    Update
                </button>
            </div>
            <div
                class="flex flex-col my-4 space-y-4 justify-center items-center w-full md:w-[2/3]"
            >
                <button
                    @click="clear"
                    class="py-2 px-4 w-36 rounded-3xl text-xl disabled:cursor-not-allowed font-medium bg-yellow-400 text-gray-700 hover:bg-yellow-300"
                >
                    Clear
                </button>
                <span class="text-xs break-all">Popup Url: {{ popupUrl }}</span>
                <span class="text-xs break-all">Commit ID: {{ commitId }}</span>
            </div>
        </div>
        <form action="" id="demoForm"></form>
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
