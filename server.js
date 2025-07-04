import Fastify from "fastify";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const fastify = Fastify();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spells = JSON.parse(readFileSync(join(__dirname, "data/spells.json")));
const spellsByClass = JSON.parse(
  readFileSync(join(__dirname, "data/spells-by-class.json"))
);

fastify.get("/v1/classes", async (request, reply) => {
  return ["bard", "cleric", "druid", "sorcerer", "warlock", "wizard"];
});

fastify.get("/v1/classes/:name/spells", async (request, reply) => {
  const className = request.params.name;
  if (spellsByClass[className]) {
    return spellsByClass[className];
  } else {
    reply.code(404).send({ error: "Not found" });
  }
});

fastify.get("/v1/spells/:id", async (request, reply) => {
  const spellId = request.params.id;
  const spell = spells.find((s) => s.id === spellId);
  if (spell) {
    return spell;
  } else {
    reply.code(404).send({ error: "Not found" });
  }
});

fastify.get("/v1/assets/classes/:assetName", async (request, reply) => {
  const assetName = request.params.assetName + ".png";
  const filePath = join(__dirname, "assets/classes", assetName);
  try {
    const data = readFileSync(filePath);
    reply.type("image/png").send(data);
  } catch (err) {
    reply.code(404).send({ error: "Not found" });
  }
});

fastify.get("/v1/assets/spells/:spellId", async (request, reply) => {
  const spellAsset = request.params.spellId + ".png";
  const filePath = join(__dirname, "assets/spells", spellAsset);
  try {
    const data = readFileSync(filePath);
    reply.type("image/png").send(data);
  } catch (err) {
    reply.code(404).send({ error: "Not found" });
  }
});

fastify.setNotFoundHandler((request, reply) => {
  reply.code(404).send({ error: "Not found" });
});

async function run() {
  try {
    fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

run();
