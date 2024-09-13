const express = require('express');
var config = require('../config/db');
var exception = require('../model/exception');
const sql = require('mssql');
//var Connection = require('tedious').Connection;
//var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

function getOrders() {
  const customPromise = new Promise((resolve, reject) => {
    sql.connect(config, function (err) {
      
        if (err) reject(new Error(err));

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('SELECT * FROM [nodejs-test-db].[dbo].[Orders]', function (err, response) {
            
            if (err) reject(new Error(err));
            
            // send records as a response
            resolve(response.recordset);
          });
        });
      });
      return customPromise
  }

  function getOrder(Id) {

    const sender = arguments.callee.name;
    
    const customPromise = new Promise((resolve, reject) => {
      sql.connect(config, function (err) {
                
        if (err) {
          reject(JSON.stringify(
            new exception(sender, err.message, err.name, err.stack)
          ))
        } else {

          var request = new sql.Request();
          
          request.input('Id', sql.Int, Id);
          request.query('SELECT * FROM [nodejs-test-db].[dbo].[Orders] Where Id = @Id', function (err, response) {
            
            if (err) {
                reject(JSON.stringify(
                  new exception(sender, err.message, err.name, err.stack)
                ))
              } else {
                resolve(JSON.stringify(response.recordset) );
              }
            });
          }
        });
      });
      return customPromise
    }


    function deleteOrder(Id) {

      const sender = arguments.callee.name;
      
      const customPromise = new Promise((resolve, reject) => {
        sql.connect(config, function (err) {
                  
          if (err) {
            reject(JSON.stringify(
              new exception(sender, err.message, err.name, err.stack)
            ))
          } else {
  
            var request = new sql.Request();
            
            request.input('Id', sql.Int, Id);
            request.query('DELETE FROM [nodejs-test-db].[dbo].[Orders] Where Id = @Id', function (err, response) {
              
              if (err) {
                  reject(JSON.stringify(
                    new exception(sender, err.message, err.name, err.stack)
                  ))
                } else {
                  resolve(JSON.stringify(response.recordset) );
                }
              });
            }
          });
        });
        return customPromise
      }


    function addOrder(newOrder) {

      console.log(newOrder)
      const sender = arguments.callee.name;
    
      const customPromise = new Promise((resolve, reject) => {
        sql.connect(config, function (err) {
                  
          if (err) {
            reject(JSON.stringify(
              new exception(sender, err.message, err.name, err.stack)
            ))
          } else {
  
            var request = new sql.Request();
            request.input('Id', sql.Int, newOrder.Id);
            request.input('Title', sql.NVarChar(50), newOrder.Title);
            request.input('Quantity', sql.Int, newOrder.Quantity);
            request.input('Message', sql.NVarChar, newOrder.Message);
            request.input('City', sql.NVarChar(50), newOrder.City);
            request.output('output', sql.Int)

            request.execute('addOrder', function (err, response) {
              
              if (err) {
                  reject(JSON.stringify(
                    new exception(sender, err.message, err.name, err.stack)
                  ))
                } else {
                  console.log(response.output);
                  resolve(JSON.stringify(response.output) );
                }
              });

            }
          });
        });
        return customPromise
      }

  module.exports = { 
      getOrders, 
      getOrder,
      addOrder,
      deleteOrder
    }
  