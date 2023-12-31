import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        list_movies: resolve(__dirname, "src/list_movies/index.html"),
        movie_detail: resolve(__dirname, "src/movie_detail/index.html"),
        login: resolve(__dirname, "src/login/index.html")
      },
    },
  },
});
