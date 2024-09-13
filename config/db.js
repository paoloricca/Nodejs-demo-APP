var config = {
  server: "CSTSER035PRIC00\SQLEXPRESS",
  database: "nodejs-test-db",
  authentication: {
    type: 'default',
    options: {
        userName: 'sa',
        password: 'admin'
    }
  },
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  },  
}
  
  module.exports = config;