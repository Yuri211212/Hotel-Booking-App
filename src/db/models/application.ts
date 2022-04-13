export default {
selectExistedSchema: `
select schema_name from information_schema.schemata where schema_name = 'app'
`,

createAppSchema: `create schema app`,
};