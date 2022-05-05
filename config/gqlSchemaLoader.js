const fs = require('fs');
const graphql = require('graphql');
const gqltools = require('graphql-tools');

const gqlSchemaLoader = {};

gqlSchemaLoader.load = (schema, resolvers) => {
    let fdata = fs.readFileSync(schema, 'utf8');
    return gqltools.makeExecutableSchema({
        typeDefs: fdata,
        resolovers: resolvers
    });
};

module.exports = gqlSchemaLoader;