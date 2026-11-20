import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import chokidar from "chokidar";

function sourceReloadPlugin() {
  return {
    name: "source-reload",
    configureServer(server) {
      const watcher = chokidar.watch("src", {
        cwd: server.config.root,
        usePolling: true,
        interval: 100,
        ignoreInitial: true,
        ignored: ["**/node_modules/**", "**/.git/**"],
      });

      watcher.on("add", (file) => {
        server.config.logger.info(`Reload: ${file}`);
        server.ws.send({ type: "full-reload" });
      });
      watcher.on("change", (file) => {
        server.moduleGraph.invalidateAll();
        server.config.logger.info(`Reload: ${file}`);
        server.ws.send({ type: "full-reload" });
      });
      watcher.on("unlink", (file) => {
        server.config.logger.info(`Reload: ${file}`);
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), sourceReloadPlugin()],
  server: {
    watch: {
      usePolling: true,
      interval: 100,
      binaryInterval: 300,
      awaitWriteFinish: {
        stabilityThreshold: 100,
        pollInterval: 20,
      },
      ignored: ["**/node_modules/**", "**/.git/**"],
    },
  },
});