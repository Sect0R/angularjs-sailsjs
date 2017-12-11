'use strict';

angular.module('myApp.services', [])
  .factory('dataSet', ['$http', '$q', function ($http, $q) {

    return {

      loadFromUrl: function (jsonUrl) {
        return $q(function (resolve, reject) {
          $http({
            url: jsonUrl,
            method: 'GET'
          }).then(function (response) {
            if (response.data) {
              resolve(response.data);
            } else {
              reject(response.error);
            }
          })
        });
      },


      loadFromFile: function (file) {
        return $q(function (resolve, reject) {
          if (file && file.size) {

            var fReader = new FileReader();
            fReader.readAsText(file);
            fReader.onloadend = function () {
              resolve(fReader.result);
            }

          } else {
            reject(false);
          }
        });
      },

      load: function () {
        return $q(function (resolve, reject) {
          $http({
            url: '/load',
            method: 'GET'
          }).then(function (response) {
            if (response.data && response.data.success) {
              resolve(response.data.json);
            } else {
              reject(response.error);
            }
          })
        });
      },

      save: function (json) {
        return $q(function (resolve, reject) {
          $http({
            url: '/save',
            method: 'POST',
            data: {'json': json}
          }).then(function (response) {
            if (response.data) {
              console.log(response);
              resolve(response.data);
            } else {
              reject(response.error);
            }
          })
        });
      },

      fetchData: function (data, filterBy) {

        var regions = [],
          types = [],
          contracts = [];

        data.forEach(function (item, i) {

          if ( regions[item.region] ) {
            regions[item.region].value += 1;
            regions[item.region].types.push(item.type);
          } else {
            regions[item.region] = {
              label: item.region,
              value: 1,
              type: 'region',
              item: item,
              types: new Array(item.type)
            }
          }

          if ( types[item.type] ) {
            types[item.type].value += 1;
            types[item.type].regions.push(item.region);
          } else {
            types[item.type] = {
              label: item.type,
              value: 1,
              type: 'type',
              item: item,
              regions: new Array(item.region)
            }
          }

          if (item.contracts.length) {
            item.contracts.forEach(function (contract, key) {

              if ( contracts[contract.type] ) {
                contracts[contract.type].value += contract.amount;
                contracts[contract.type].types.push(item.type);
                contracts[contract.type].regions.push(item.region);
              } else {
                contracts[contract.type] = {
                  label: contract.type,
                  value: contract.amount,
                  type: 'contract',
                  item: item,
                  types: new Array(item.type),
                  regions: new Array(item.region)
                };
              }
            });
          }

        });

        var result = {
          regions: Object.values(regions),
          types: Object.values(types),
          contracts: Object.values(contracts)
        };
        console.log(filterBy);
        if ( filterBy ) {
          switch ( filterBy.type ) {
            case 'region':

              result.regions = result.regions.filter(function(item, index) {
                return (item.label == filterBy.label);
              });

              result.types = result.types.filter(function(item, index) {
                return ( item.regions.indexOf(filterBy.label) != -1 );
              });

              result.contracts = result.contracts.filter(function(item, index) {
                return ( item.regions.indexOf(filterBy.label) != -1 );
              });

              break;

            case 'type':

              result.regions = result.regions.filter(function(item, index) {
                return ( item.types.indexOf(filterBy.label) != -1 );
              });

              result.types = result.types.filter(function(item, index) {
                return (item.label == filterBy.label);
              });

              result.contracts = result.contracts.filter(function(item, index) {
                return ( item.types.indexOf(filterBy.label) != -1 );
              });

              break;

            case 'contract':

              result.regions = result.regions.filter(function(item, index) {
                return ( filterBy.regions.indexOf(item.label) != -1 );
              });

              result.types = result.types.filter(function(item, index) {
                return ( filterBy.types.indexOf(item.label) != -1 );
              });

              result.contracts = result.contracts.filter(function(item, index) {
                return ( item.label == filterBy.label );
              });

              break;
          }
        }

        return result;

      }

    };

  }]);
