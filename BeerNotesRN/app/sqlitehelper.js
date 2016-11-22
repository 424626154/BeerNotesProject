'use strict';
import React, { Component } from 'react';
import SQLite from 'react-native-sqlite-storage';
import uuid from 'react-native-uuid';

let instance = null;
var database_name = "beernotes.db";
var database_version = "1.0";
var database_displayname = "SQLite BeerNotes Database";
var database_size = 200000;
var db;

var Id = 'id'
var FormulaTable = 'formula';
var FName = 'fname';
var Malt = 'malt'
var Hops = 'hops';
var Yeast = 'yeast';
var Water = 'water';

var if_code = 1001;//插入配方失败
var df_code = 1002;//删除配方失败
var qf_all_code = 1003;//查询所有配方失败
var qf_one_code = 1004;//查询单个配方失败
var up_code = 1005;//更新配方
export default class SQLiteHelper extends React.Component {
  openCB() {
        console.log("Database OPEN");
  }
  errorCB(err) {
      console.log("Error: "+ (err.message || err));
      return false;
  }
  closeCB() {
      console.log("Database CLOSED");
  }
  openDB(){
    db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB);
  }
  closeDB(){
    if (db) {
       console.log("Closing database ...");
       console.log("Closing database");
       db.close(this.closeCB,this.errorCB);
   } else {
       console.log("Database was not OPENED");
   }
  }
  deleteCB() {
      console.log("Database DELETED");
  }
  deleteDB(){
    SQLite.deleteDatabase(database_name, this.deleteCB, this.errorCB);
  }
  /**
  *插入配方
  * fname 配方名称  malt 麦芽 hops 酒花 yeast 酵母 water 水
  *
  **/
  insertFormulaDB(fname,malt,hops,yeast,water,callback){
    var id =uuid.v4();
    var CreateFromulaTable = 'CREATE TABLE IF NOT EXISTS '+FormulaTable+' ('+Id+', '+FName+', '+Malt+', '+Hops+', '+Yeast+', '+Water+')';
    var InsertFromula =  'INSERT INTO '+FormulaTable+'('+Id+', '+FName+', '+Malt+', '+Hops+', '+Yeast+', '+Water+') VALUES (?,?,?,?,?,?)'
    db.transaction(function(tx) {
      tx.executeSql(CreateFromulaTable);
      tx.executeSql(InsertFromula, [id,fname,malt,hops,yeast,water]);
    }, function(error) {
      console.log('insertFormulaDB Error: ' + error.message);
      if (typeof callback === "function") {
        callback(if_code)
      }
    }, function() {
      console.log('insertFormulaDB Success');
      if (typeof callback === "function") {
        callback(0)
      }
    });
  }
  /**
  *查询全部配方
  **/
  queryAllFormulaDB(callback){
    console.log(typeof callback)
    var rows ;
    db.transaction(function(tx) {
      db.executeSql('SELECT * FROM '+FormulaTable, [], function(rs) {
        console.log('SELECT * FROM Formula: ' + rs.rows.length);
        rows = rs.rows;
        if (typeof callback === "function") {
          callback(0,rows)
        }
      }, function(error) {
        console.log('queryAllFormulaDB ERROR: ' + error.message);
        if (typeof callback === "function") {
          callback(qf_all_code,rows)
        }
      });
    }, function(error) {
      console.log('queryAllFormulaDB Error: ' + error.message);
      if (typeof callback === "function") {
        callback(qf_all_code,rows)
      }
    }, function() {
      // console.log('queryAllFormulaDB Success');
      // if (typeof callback === "function") {
      //   callback('queryAllFormulaDB Success',rows)
      // }
    });
  }
  /**
  *查询某个配方
  **/
  queryOneFormulaDB(rowid,callback){
    var item ;
    db.transaction(function(tx) {
      console.log('SELECT * FROM '+FormulaTable + ' WHERE '+Id+' = ?',rowid)
      db.executeSql('SELECT * FROM '+FormulaTable + ' WHERE '+Id+' = ?', [rowid], function(rs) {
        console.log('SELECT * FROM Formula: ' + rs.rows.length);
        item = rs.rows.item(0);
        if (typeof callback === "function") {
          callback(0,item)
        }
      }, function(error) {
        console.log('queryOneFormulaDB ERROR: ' + error.message);
        if (typeof callback === "function") {
          callback(qf_one_code,item)
        }
      });
    }, function(error) {
      console.log('queryOneFormulaDB Error: ' + error.message);
      if (typeof callback === "function") {
        callback(qf_one_code,item)
      }
    }, function() {

    });
  }
  // 删除配方
  deleteFormulaDB(rowid,callback){
    var DeleteFromula =  'DELETE FROM '+FormulaTable+' WHERE '+Id+' = ?';
    console.log(DeleteFromula,rowid);
    db.transaction(function(tx) {
      tx.executeSql(DeleteFromula,[rowid]);
    }, function(error) {
      console.log('deleteFormulaDB Error: ' + error.message);
      if (typeof callback === "function") {
        callback(df_code,rowid)
      }
    }, function() {
      console.log('deleteFormulaDB Success');
      if (typeof callback === "function") {
        callback(0,rowid)
      }
    });
  }
  //更新配方
  updateFormulaDB(id,fname,malt,hops,yeast,water,callback){
    db.transaction(function(tx) {
      var update = 'UPDATE '+FormulaTable+' set '+FName+' = ? , '+Malt+' = ? , '+Hops+' = ? , '+Yeast+' = ? , '+Water+' = ? WHERE ' +Id+' = ?'
      console.log(update,[fname,malt,hops,yeast,water,id])
      db.executeSql(update, [fname,malt,hops,yeast,water,id], function(rs) {
        console.log('updateFormulaDB Success')
        if (typeof callback === "function") {
          callback(0)
        }
      }, function(error) {
        console.log('updateFormulaDB ERROR: ' + error.message);
        if (typeof callback === "function") {
          callback(up_code)
        }
      });
    }, function(error) {
      console.log('updateFormulaDB Error: ' + error.message);
      if (typeof callback === "function") {
        callback(up_code,item)
      }
    }, function() {

    });
  }
}
