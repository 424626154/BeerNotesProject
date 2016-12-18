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
var FName = 'fname';//配方名称
var Malts = 'malts'//麦芽
var Hopss = 'hopss';//啤酒花
var Yeasts = 'yeasts';//酵母
var Water = 'water';//水
var Accessoriess = 'accessoriess';//辅料



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
        console.log("---notes sql--- 初始化数据库成功");
        var create_formula_sql = 'CREATE TABLE IF NOT EXISTS '+FormulaTable+' ('
        +Id+' VARCHAR(256) PRIMARY KEY NOT NULL, '
        +FName+' VARCHAR(512) , '
        +Malts+' VARCHAR(1024) , '
        +Hopss+' VARCHAR(1024) , '
        +Yeasts+' VARCHAR(1024) , '
        +Water+' VARCHAR(1024) , '
        +Accessoriess+' VARCHAR(1024) '
        +' ) ';
        db.transaction(function(tx) {
          console.log('---notes sql---  创建配方sql:'+create_formula_sql);
           tx.executeSql(create_formula_sql);
         }, function(error) {
           console.log('---notes sql---  创建配方失败: ' + error.message);
         }, function() {
           console.log('---notes sql---  创建配方成功');
         });
  }
  errorCB(err) {
      console.log("---notes sql--- 初始化数据库成功: "+ (err.message || err));
      return false;
  }
  closeCB() {
      console.log("---notes sql--- 关闭数据库");
  }
  openDB(){
    db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB);
  }
  closeDB(){
    if (db) {
       console.log("---notes sql--- 数据库关闭中 ...");
       db.close(this.closeCB,this.errorCB);
   } else {
       console.log("---notes sql--- 数据库未打开");
   }
  }
  deleteCB() {
      console.log("---notes sql--- 删除数据库");
  }
  deleteDB(){
    SQLite.deleteDatabase(database_name, this.deleteCB, this.errorCB);
  }

  /**
  *插入配方
  * fname 配方名称  malt 麦芽 hops 酒花 yeast 酵母 water 水
  *
  **/
  insertFormulaDB(fname,malts,hopss,yeasts,water,accessoriess,callback){
    console.log('---notes sql---  插入配方sql:insert foemula fname = '+fname+' malts = '+malts
    +' hopss = '+hopss+' yeasts = '+yeasts+' water = '+water+'accessoriess = '+accessoriess);
    var id =uuid.v4();
    var sql =  'INSERT INTO '+FormulaTable+'('+Id+', '+FName+', '+Malts+', '+Hopss+', '+Yeasts+', '+Water+', '+Accessoriess+') VALUES (?,?,?,?,?,?,?)'
    db.transaction(function(tx) {
      tx.executeSql(sql, [id,fname,malts,hopss,yeasts,water,accessoriess]);
    }, function(error) {
      console.log('---notes sql---  插入配方失败: ' + error.message);
      if (typeof callback === "function") {
        callback(if_code,id)
      }
    }, function() {
      console.log('---notes sql---  插入配方成功 ID:',id);
      if (typeof callback === "function") {
        callback(0,id)
      }
    });
  }
  /**
  *查询全部配方
  **/
  queryAllFormulaDB(callback){
    var sql = 'SELECT * FROM '+FormulaTable;
    console.log('---notes sql---  查询全部配方sql:'+sql)
    // var rows = null;
    db.executeSql('SELECT * FROM '+FormulaTable, [], function(rs) {
      console.log('---notes sql---  查询全部配方条数: ' + rs.rows.length);
      var rows = rs.rows;
      if (typeof callback === "function") {
        callback(0,rows)
      }
    }, function(error) {
      console.log('---notes sql---  查询全部配方失败: ' + error.message);
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
    console.log('---notes sql---  查询单个配方sql:'+sql);
    var item ;
    console.log('SELECT * FROM '+FormulaTable + ' WHERE '+Id+' = ?',rowid)
    db.executeSql('SELECT * FROM '+FormulaTable + ' WHERE '+Id+' = ?', [rowid], function(rs) {
      console.log('SELECT * FROM Formula: ' + rs.rows.length);
      item = rs.rows.item(0);
      if (typeof callback === "function") {
        callback(0,item)
      }
    }, function(error) {
      console.log('---notes sql---  查询单个配方失败: ' + error.message);
      if (typeof callback === "function") {
        callback(qf_one_code,[])
      }
    });
  }
  // 删除配方
  deleteFormulaDB(rowid,callback){
    var sql =  'DELETE FROM '+FormulaTable+' WHERE '+Id+' = ?';
    console.log('---notes sql---  删除配方sql:',sql,'id=',rowid);
    db.transaction(function(tx) {
      tx.executeSql(DeleteFromula,[rowid]);
    }, function(error) {
      console.log('---notes sql---  删除配方失败: ' + error.message);
      if (typeof callback === "function") {
        callback(df_code,rowid)
      }
    }, function() {
      console.log('---notes sql---  删除配方成功');
      if (typeof callback === "function") {
        callback(0,rowid)
      }
    });
  }
  //更新配方
  updateFormulaDB(id,fname,malts,hopss,yeasts,water,accessoriess,callback){
    db.transaction(function(tx) {
      var sql = 'UPDATE '+FormulaTable+' set '+FName+' = ? , '+Malts+' = ? , '+Hopss+' = ? , '+Yeasts+' = ? , '+Water+' = ? '+Accessoriess+' = ? WHERE ' +Id+' = ?'
      console.log('---notes sql---  更新配方sql:',sql,[fname,malts,hopss,yeasts,water,id])
      tx.executeSql(sql, [fname,malts,hopss,yeasts,water,id], function(rs) {
        console.log('---notes sql---  更新配方成功')
        if (typeof callback === "function") {
          callback(0)
        }
      }, function(error) {
        console.log('---notes sql---  更新配方失败: ' + error.message);
        if (typeof callback === "function") {
          callback(up_code)
        }
      });
    }, function(error) {
      console.log('---notes sql---  更新配方失败: ' + error.message);
      if (typeof callback === "function") {
        callback(up_code,item)
      }
    }, function() {

    });
  }

}
