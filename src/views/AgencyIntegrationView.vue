<script setup lang="ts">
import { onMounted } from "vue"; onMounted(() => {
    function ct(t) {
        var a =
            document.head, c = document.createElement("link"); (c.rel = "stylesheet"), (c.href
                =
                "https://storage.googleapis.com/crewpass-development-loginbutton/crewpass-loginbutton-js-dev-aug2021.css?v=4"), a.appendChild(c); var
                    n = document.createElement("script"); (n.type = "text/javascript"), (n.src =
                        "https://storage.googleapis.com/crewpass-development-loginbutton/crewpass-loginbutton-js-dev-aug2021.js?v=4"), (n.onreadystatechange
                            = t), (n.onload = t), a.appendChild(n);
    } ct(function () {
        new CrewPass({
            v:
                "yourseasonalstaff"
        }).t(function () { })
    });
})</script>

<template>
    <main class="w-full md:w-4/5 flex flex-col justify-center items-center">
        <h1 id="title" class="text-lg font-medium">Agency Integration - Dev</h1>
        <div id="cp-holder-1" class="w-full">
            <div id="cp-login-wrapper">
                <div id="cp-login"></div>
                <div id="cp-login-response"></div>
            </div>
        </div>
    </main>
</template>
