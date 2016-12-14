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
var Malts = 'malts'
var Hopss = 'hopss';
var Yeasts = 'yeasts';
var Water = 'water';
var FType = 'type';//1 配方 2笔记


var NotesTable = 'notes';
var Fid = 'fid';
var NFid = 'nfid';

var if_code = 1001;//插入配方失败
var df_code = 1002;//删除配方失败
var qf_all_code = 1003;//查询所有配方失败
var qf_one_code = 1004;//查询单个配方失败
var up_code = 1005;//更新配方
var insert_notes_code = 1006;//插入笔记失败
var qn_all_code = 10007;//查询笔记

export default class SQLiteHelper {
  // 配方
  // formula
  // {
  //   fname,//名称
  //   malt,//麦芽
  //   hops,//酒花
  //   yeast,//酵母
  //   water//水
  // }
  // 笔记
  // notesvc
  // {
  //   nname,
  //   fid
  // }
  constructor(){
    if(!instance){
      instance = this;
    }
    return instance;
  }
  // initDBTable(){
  //
  // }
  openCB() {
        console.log("---notes sql--- open db success");
        var create_formula_sql = 'CREATE TABLE IF NOT EXISTS '+FormulaTable+' ('
        +Id+' VARCHAR(256) PRIMARY KEY NOT NULL, '
        +FName+' VARCHAR(512) , '
        +Malts+' VARCHAR(1024) , '
        +Hopss+' INTEGER , '
        +Yeasts+' INTEGER , '
        +Water+' INTEGER , '
        +FType+' INTEGER )';
        db.transaction(function(tx) {
          console.log('---notes sql---  create_formula_sql:'+create_formula_sql);
           tx.executeSql(create_formula_sql);
         }, function(error) {
           console.log('---notes sql---  create_table Error: ' + error.message);
         }, function() {
           console.log('---notes sql---  create_table Success');
         });
  }
  errorCB(err) {
      console.log("---notes sql--- error: "+ (err.message || err));
      return false;
  }
  closeCB() {
      console.log("---notes sql--- close db");
  }
  openDB(){
    db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB);
  }
  closeDB(){
    if (db) {
       console.log("---notes sql--- closing database ...");
       db.close(this.closeCB,this.errorCB);
   } else {
       console.log("---notes sql--- db was not opened");
   }
  }
  deleteCB() {
      console.log("---notes sql--- db delete");
  }
  deleteDB(){
    SQLite.deleteDatabase(database_name, this.deleteCB, this.errorCB);
  }
  /**
  *插入配方
  * fname 配方名称  malt 麦芽 hops 酒花 yeast 酵母 water 水
  *
  **/
  insertFormulaDB(fname,malts,hopss,yeasts,water,type,callback){
    console.log('---notes sql---  insert foemula fname = '+fname+' malts = '+malts
    +' hopss = '+hopss+' yeasts = '+yeasts+' water = '+water
    +' type = '+type+'callback ='+typeof callback);
    var id =uuid.v4();
    var InsertFromula =  'INSERT INTO '+FormulaTable+'('+Id+', '+FName+', '+Malts+', '+Hopss+', '+Yeasts+', '+Water+', '+FType+') VALUES (?,?,?,?,?,?,?)'
    db.transaction(function(tx) {
      tx.executeSql(InsertFromula, [id,fname,malts,hopss,yeasts,water,type]);
    }, function(error) {
      console.log('---notes sql---  insertFormulaDB Error: ' + error.message);
      if (typeof callback === "function") {
        callback(if_code,id)
      }
    }, function() {
      console.log('---notes sql---  insertFormulaDB Success',id);
      if (typeof callback === "function") {
        callback(0,id)
      }
    });
  }
  /**
  *查询全部配方
  **/
  queryAllFormulaDB(type,callback){
    var sql = 'SELECT * FROM '+FormulaTable+' WHERE '+FType+' = '+ type;
    console.log('---notes sql---  queryAllFormulaDB:'+sql)
    // var rows = null;
    db.executeSql('SELECT * FROM '+FormulaTable+' WHERE '+FType+'= ?', [type], function(rs) {
      console.log('---notes sql---  SELECT * FROM Formula: ' + rs.rows.length);
      var rows = rs.rows;
      if (typeof callback === "function") {
        callback(0,rows)
      }
    }, function(error) {
      console.log('---notes sql---  queryAllFormulaDB ERROR: ' + error.message);
      if (typeof callback === "function") {
        callback(qf_all_code,[])
      }
    });
  }
  /**
  *查询某个配方
  **/
  queryOneFormulaDB(rowid,callback){
    var sql = 'SELECT * FROM '+FormulaTable + ' WHERE '+Id+' = '+rowid;
    console.log('---notes sql---  queryOneFormulaDB'+sql+'callback = '+typeof callback)
    var item ;
    console.log('SELECT * FROM '+FormulaTable + ' WHERE '+Id+' = ?',rowid)
    db.executeSql('SELECT * FROM '+FormulaTable + ' WHERE '+Id+' = ?', [rowid], function(rs) {
      console.log('SELECT * FROM Formula: ' + rs.rows.length);
      item = rs.rows.item(0);
      if (typeof callback === "function") {
        callback(0,item)
      }
    }, function(error) {
      console.log('---notes sql---  queryOneFormulaDB ERROR: ' + error.message);
      if (typeof callback === "function") {
        callback(qf_one_code,[])
      }
    });
  }
  // 删除配方
  deleteFormulaDB(rowid,callback){
    var DeleteFromula =  'DELETE FROM '+FormulaTable+' WHERE '+Id+' = ?';
    console.log(DeleteFromula,rowid);
    db.transaction(function(tx) {
      tx.executeSql(DeleteFromula,[rowid]);
    }, function(error) {
      console.log('---notes sql---  deleteFormulaDB Error: ' + error.message);
      if (typeof callback === "function") {
        callback(df_code,rowid)
      }
    }, function() {
      console.log('---notes sql---  deleteFormulaDB Success');
      if (typeof callback === "function") {
        callback(0,rowid)
      }
    });
  }
  //更新配方
  updateFormulaDB(id,fname,malts,hopss,yeasts,water,callback){
    db.transaction(function(tx) {
      var update = 'UPDATE '+FormulaTable+' set '+FName+' = ? , '+Malts+' = ? , '+Hopss+' = ? , '+Yeasts+' = ? , '+Water+' = ? WHERE ' +Id+' = ?'
      console.log(update,[fname,malts,hopss,yeasts,water,id])
      tx.executeSql(update, [fname,malts,hopss,yeasts,water,id], function(rs) {
        console.log('---notes sql---  updateFormulaDB Success')
        if (typeof callback === "function") {
          callback(0)
        }
      }, function(error) {
        console.log('---notes sql---  updateFormulaDB ERROR: ' + error.message);
        if (typeof callback === "function") {
          callback(up_code)
        }
      });
    }, function(error) {
      console.log('---notes sql---  updateFormulaDB Error: ' + error.message);
      if (typeof callback === "function") {
        callback(up_code,item)
      }
    }, function() {

    });
  }

  /**
  *插入笔记
  * fname 配方名称  malts 麦芽 hopss 酒花 yeasts 酵母 water 水
  *
  **/
  insertNotesDB(fid,nfid,callback){
    var id =uuid.v4();
    var CreateFromulaTable = 'CREATE TABLE IF NOT EXISTS '+NotesTable+' ('+Id+', '+Fid+', '+NFid+')';
    var InsertFromula =  'INSERT INTO '+NotesTable+'('+Id+', '+Fid+', '+NFid+') VALUES (?,?,?)'
    console.log('---notes sql---'+InsertFromula+ id+','+fid+','+nfid)
    db.transaction(function(tx) {
      tx.executeSql(CreateFromulaTable);
      tx.executeSql(InsertFromula, [id,fid,nfid],function(rs) {
        console.log('---notes sql---  insertNotesDB Success ');
        if (typeof callback === "function") {
          callback(0,id)
        }
      }, function(error) {
        console.log('---notes sql---  insertNotesDB ERROR: ' + error.message);
        if (typeof callback === "function") {
          callback(insert_notes_code,0)
        }
      });
    }, function(error) {
      console.log('---notes sql---  insertNotesDB Error: ' + error.message);
      if (typeof callback === "function") {
        callback(if_code)
      }
    }, function() {

    });
  }
  /**
  *查询笔记
  */
  queryAllNotesDB(callback){
    console.log(typeof callback)
    var rows = null;
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM '+NotesTable, [], function(rs) {
        console.log('SELECT * FROM Formula: ' + rs.rows.length);
        rows = rs.rows;
        if (typeof callback === "function") {
          callback(0,rows)
        }
      }, function(error) {
        console.log('---notes sql---  queryAllNotesDB ERROR: ' + error.message);
        if (typeof callback === "function") {
          callback(qn_all_code,rows)
        }
      });
    }, function(error) {
      console.log('---notes sql---  queryAllNotesDB Error: ' + error.message);
      if (typeof callback === "function") {
        callback(qn_all_code,rows)
      }
    }, function() {

    });
  }

}
