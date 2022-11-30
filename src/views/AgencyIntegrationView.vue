<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useEventListener } from "@vueuse/core";

const messages = ref([]);

useEventListener(window, "message", (message: any) => {
    console.log("message origin: ", message.origin);
    console.log("message: ", message.data);
    messages.value.push(message);
});

onMounted(() => {
    function ct(t) {
        var a = document.head,
            c = document.createElement("link");
        (c.rel = "stylesheet"),
            (c.href =
                "https://storage.googleapis.com/crewpass-production-loginbutton/crewpass-loginbutton-js-prod-aug2021.css?v=4"),
            a.appendChild(c);
        var n = document.createElement("script");
        (n.type = "text/javascript"),
            (n.src =
                "https://storage.googleapis.com/crewpass-production-loginbutton/crewpass-loginbutton-js-prod-aug2021.js?v=4"),
            (n.onreadystatechange = t),
            (n.onload = t),
            a.appendChild(n);
    }
    ct(function () {
        new CrewPass({ v: "yourseasonalstaff" }).t(function () {});
    });
});
</script>

<template>
    <main class="w-full md:w-4/5 flex flex-col justify-center items-center">
        <h1 id="title" class="text-lg font-medium">Agency Integration - Dev</h1>
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
                    <pre class="text-xs text-gray-600">{{ message }}</pre>
                </li>
            </ul>
        </div>
    </main>
</template>
