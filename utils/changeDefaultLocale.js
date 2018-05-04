// This script was used for changing the default locale from English to German
// for the Contentful CMS by exporting the old content, fiddling with the JSON
// to change the locale, and then import the output. It's not production
// quality code, just a quick hack. But I committed it just in case.
//
// The export/import process is described here:
//
// https://www.contentful.com/developers/docs/tutorials/general/import-and-export/
//
// After exporting the file, the first step was to manually edit the locales
// section of the JSON to switch the default. Then run this script to update
// all entries and assets that only have an en locale to have a de locale
// instead. That was enough to allow an import of the data into a new Contentful
// space with German set as the default locale.

/* eslint-disable */

const exportFile = process.argv[2]

const json = require(exportFile)

function changeFields(fields) {
  Object.keys(fields).forEach((k) => {
    const f = fields[k]
    if ('en' in f && !('de' in f)) {
      f.de = f.en
      delete f.en
      return f
    }
    fields[k] = f
  })
  return fields
}

json.entries = json.entries.map((e) => {
  const newFields = changeFields(e.fields)
  return { ...e, fields: newFields }
})


json.assets = json.assets.map((a) => {
  const newFields = changeFields(a.fields)
  return { ...a, fields: newFields }
})


console.log(JSON.stringify(json, null, 2))
