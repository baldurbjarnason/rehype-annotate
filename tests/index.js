const tap = require("tap");
const vfile = require("to-vfile");
const unified = require("unified");
const annotate = require("../");
const parse = require("rehype-parse");
const stringify = require("rehype-stringify");
const report = require("vfile-reporter");
const glob = require("glob");
const path = require("path");

const fragment = { fragment: true };

async function process(filepath, options) {
  let file;
  const input = await vfile.read(filepath);
  try {
    file = await unified()
      .use(parse, fragment)
      .use(annotate, options)
      .use(stringify)
      .process(input);
    console.log(report(file));
  } catch (err) {
    console.log(err);
    console.error(report(err));
  }
  return String(file);
}

tap.test("rehype-annotate", async t => {
  const fixtures = glob.sync("fixtures/*.input.html", { cwd: __dirname });
  for (const fixture of fixtures) {
    await t.test("basic", async function(t) {
      const result = await process(path.join(__dirname, fixture), {
        annotations: require("./" +
          fixture.replace("input.html", "annotations.json")).items,
        url: `https://example.com/tests/${fixture.replace(__dirname, "")}`,
        canonical: `https://canonical.example.com/tests/${fixture.replace(
          __dirname,
          ""
        )}`
      });
      const expected = String(
        vfile.readSync(
          path.join(__dirname, fixture.replace("input.html", "output.html"))
        )
      );
      t.equal(result, expected);
      t.end();
    });
  }
  t.end();
});
