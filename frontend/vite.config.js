import { defineConfig } from "vite";
import { exec } from "child_process";
import react from "@vitejs/plugin-react-swc";
import eslintPlugin from "vite-plugin-eslint";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: '../backend/public',
    emptyOutDir: true, // also necessary
    rollupOptions: {
      output: {
        entryFileNames: 'index.[hash].js', // Agregar hash al nombre del archivo
        chunkFileNames: 'assets/[name].[hash].js', // Agregar hash a los chunks
        assetFileNames: 'assets/[name].[hash].[ext]',
      }
    }
  },
  plugins: [
    react(),
    mkcert({
      savePath: "../backend/certs", // save the generated certificate into certs directory
    }),
    eslintPlugin({
      cache: false,
      include: ["./src/**/*.js", "./src/**/*.jsx"],
      exclude: [],
    }),
    {
      name: "move-index-html",
      closeBundle() {
        exec(
          "mv ../backend/public/index.html ../backend/resources/views/app.blade.php",
          (err, stdout, stderr) => {
            if (err) {
              console.error(`Error moving index.html: ${stderr}`);
            } else {
              console.log(`index.html moved to app.blade.php: ${stdout}`);
            }
          }
        );
      },
    },
  ],
});
