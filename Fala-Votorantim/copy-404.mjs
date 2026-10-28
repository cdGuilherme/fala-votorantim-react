import { copyFileSync, existsSync } from "node:fs";

const indexPath = "dist/index.html";
const notFoundPath = "dist/404.html";

if (!existsSync(indexPath)) {
    throw new Error("dist/index.html não encontrado. Execute o build primeiro.");
}

copyFileSync(indexPath, notFoundPath);

console.log("Fallback do GitHub Pages criado: dist/404.html");
