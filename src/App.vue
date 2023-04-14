<script setup lang="ts">
import { RouterView } from "vue-router";
const env = import.meta.env.VITE_ENVIRONMENT || "dev";
</script>

<template>
    <a
        v-if="env === 'dev'"
        href="https://crewpass-demo-web-prod.netlify.app/"
        target="_blank"
    >
        <div
            class="w-full p-2 m-0 top-0 left-0 bg-red-800 text-white text-center cursor-pointer hover:bg-red-600"
        >
            <p class="text-md">
                This is running in development environment - for live/prod -
                click here
            </p>
        </div>
    </a>
    <header class="w-full p-8 flex justify-center items-center">
        <div class="wrapper text-center">
            <h1 class="text-xl font-medium mb-6">CrewPass</h1>
            <nav class="flex space-x-4">
                <a class="p-2 bg-gray-100 rounded-xl hover:bg-gray-300" href="/"
                    >Vessel Integration</a
                >
                <a
                    class="p-2 bg-gray-100 rounded-xl hover:bg-gray-300"
                    href="/crew"
                    >Crew Integration</a
                >
                <a
                    class="p-2 bg-gray-100 rounded-xl hover:bg-gray-300"
                    href="/agency-original"
                    >Agency Integration (original)</a
                >
            </nav>
        </div>
    </header>
    <main
        class="w-full flex justify-center items-start p-6 min-h-[50vh] bg-gray-50"
    >
        <RouterView />
    </main>
</template>
