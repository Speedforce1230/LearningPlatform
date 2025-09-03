import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            strategies: "injectManifest", // or 'generateSW'
            srcDir: "src",
            filename: "service-worker.js",
            injectManifest: {
                globPatterns: ["**/*.{js,css,html,png,svg}"],
                maximumFileSizeToCacheInBytes: 4000000,
            },
            registerType: "autoUpdate",
            manifest: {
                name: "Quiz Adventure",
                short_name: "QuizAdv",
                start_url: ".",
                display: "standalone",
                background_color: "#fff",
                description:
                    "Gamified learning platform with quizzes and map levels",
            },
        }),
    ],
    server: {
        host: "0.0.0.0",
        port: 3001,
    },
});
