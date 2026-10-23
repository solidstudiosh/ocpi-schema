import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from "fs";
import path from "path";

const OCPI_SCHEMA_DIR = ".ocpi-schema";
const SAMPLES_DIR = "samples";

// A sample file is named after its schema, optionally followed by a variant: ocpi.2_3.booking_request.cancel.json
const schemaNameOf = (sampleFile: string, schemaNames: string[]) =>
  schemaNames
    .filter((name) => sampleFile === `${name}.json` || sampleFile.startsWith(`${name}.`))
    .sort((a, b) => b.length - a.length)[0];

const schemaNames = fs.readdirSync(OCPI_SCHEMA_DIR).map((file) => file.replace(/\.json$/, ""));
const failures: string[] = [];
let checked = 0;

for (const version of fs.readdirSync(SAMPLES_DIR)) {
  for (const expectation of ["valid", "invalid"]) {
    const dir = path.join(SAMPLES_DIR, version, expectation);
    if (!fs.existsSync(dir)) {
      continue;
    }
    for (const sampleFile of fs.readdirSync(dir)) {
      const sample = path.join(dir, sampleFile);
      const schemaName = schemaNameOf(sampleFile, schemaNames);
      if (!schemaName) {
        failures.push(`${sample}: no generated schema matches its name`);
        continue;
      }
      const ajv = new Ajv({ allErrors: true, strict: false });
      addFormats(ajv);
      const schema = JSON.parse(fs.readFileSync(path.join(OCPI_SCHEMA_DIR, `${schemaName}.json`), "utf8"));
      const valid = ajv.validate(schema, JSON.parse(fs.readFileSync(sample, "utf8")));
      checked++;
      if (expectation === "valid" && !valid) {
        failures.push(`${sample}: rejected by ${schemaName}: ${ajv.errorsText(ajv.errors)}`);
      }
      if (expectation === "invalid" && valid) {
        failures.push(`${sample}: accepted by ${schemaName}, expected a rejection`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`${checked} samples match their expectation`);
