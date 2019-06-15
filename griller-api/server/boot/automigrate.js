'use strict';

module.exports = async function(app) {
  let ds = app.dataSources.MongoDb;
  let modelsArray = ['User',
                      'AccessToken',
                      'ACL',
                      'RoleMapping',
                      'Role',
                      'Client',
                      'CustomToken',
                      'Griller',
                      'Booking'];

    const promiseMigrate = function(model) {
      return new Promise((resolve, reject) => {
        ds.automigrate(model, (err) => {
          if(err) reject(err);
          resolve();
        })
      })
    }

    for(const model of modelsArray) {
        await promiseMigrate(model);
        console.log('Model ' + model + ' migrated to MongoDB.');
    }
};
