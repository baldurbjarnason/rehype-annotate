import { toVFile } from "to-vfile";
import { reporter } from "vfile-reporter";
import { attacher } from "../index.js";
import * as path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).replace(process.cwd() + "/", "");
const require = createRequire(import.meta.url);
const tap = require("tap");
const unified = require("unified");
const parse = require("rehype-parse");
const stringify = require("rehype-stringify");
const glob = require("glob");
// const fragment = { fragment: true };

async function processAnnotations(filepath, options) {
  let file;
  const input = await toVFile.read(filepath);
  try {
    file = await unified()
      .use(parse)
      .use(attacher, options)
      .use(stringify)
      .process(input);
    console.log(reporter(file));
  } catch (err) {
    console.log(err);
    console.error(reporter(err));
  }
  return file;
}

tap.test("rehype-annotate", async (t) => {
  const fixtures = glob.sync("fixtures/*.input.html", { cwd: __dirname });
  for (const fixture of fixtures) {
    await t.test("basic " + fixture, async function (t) {
      const result = await processAnnotations(path.join(__dirname, fixture), {
        stimulus: fixture.includes("quote") || fixture.includes("xpath"),
        annotations: require("./" +
          fixture.replace("input.html", "annotations.json")).items,
        url: `https://example.com/tests/${fixture.replace(__dirname, "")}`,
        canonical: `https://canonical.example.com/tests/${fixture.replace(
          __dirname,
          ""
        )}`,
      });
      const expected = String(
        toVFile.readSync(
          path.join(__dirname, fixture.replace("input.html", "output.html"))
        )
      );
      t.matchSnapshot(result.data.annotations, `${fixture} annotations`);
      // console.dir(result);
      t.equal(String(result.contents), expected);
      t.end();
    });
  }
  t.end();
});
