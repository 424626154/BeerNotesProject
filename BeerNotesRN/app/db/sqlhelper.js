'use strict';
import uuid from 'react-native-uuid';

const Realm = require('realm');

let realm ;
var db_verison = 4;

var FormulaTable = 'formula';
// var FName = 'fname';//配方名称
// var Malts = 'malts'//麦芽
// var Hopss = 'hopss';//啤酒花
// var Yeasts = 'yeasts';//酵母
// var Water = 'water';//水
// var Accessoriess = 'accessoriess';//辅料

var MessageTable = 'message';

var success_code = 0;//成功
var if_code = 1001;//插入配方失败
// var df_code = 1002;//删除配方失败
// var qf_all_code = 1003;//查询所有配方失败
// var qf_one_code = 1004;//查询单个配方失败
// var up_code = 1005;//更新配方
// var insert_notes_code = 1006;//插入笔记失败
// var qn_all_code = 10007;//查询笔记

const FormulaSchema = {
  name: FormulaTable,
  primaryKey: 'fid',
  properties: {
    fid:'string',//id
    fname:  'string',//配方名称
    malts:  'string',//麦芽
    hopss:  'string',//啤酒花
    yeasts: 'string',//酵母
    water:  'int',//水
    accessoriess:'string'//辅料
  }
};

const MessageSchema = {
  name: MessageTable,
  primaryKey: 'mid',
  properties: {
    mid:'string',//id
    title:  'string',
    content:  'string',
  }
}

export default class SqlHelper
{

    constructor(){
      this.initDB();
    }
    initDB(){
      if(!realm){
        realm = new Realm({
            path: 'beernotes.realm',
            schema: [FormulaSchema,MessageSchema],
            schemaVersion: db_verison,
            migration: function(oldRealm, newRealm) {
              console.log('oldRealm.schemaVersion:',oldRealm.schemaVersion,
                'newRealm.schemaVersion:',newRealm.schemaVersion)
            }
          });
          console.log("---brsql--- initDB:",realm,realm.path);
      }
    }

    /**
    *插入配方
    * fname 配方名称  malt 麦芽 hops 酒花 yeast 酵母 water 水
    *
    **/
    insertFormulaDB(fname,malts,hopss,yeasts,water,accessoriess,callback){
      var id = uuid.v4();
      console.log(id,fname,malts,hopss,yeasts,water,accessoriess)
      realm.write(() => {
        var formula = realm.create(FormulaTable, {
          fid:id,//id
          fname:  fname,//配方名称
          malts:malts,//麦芽
          hopss: hopss,//啤酒花
          yeasts: yeasts,//酵母
          water:water,//水
          accessoriess:accessoriess//辅料
        });
        if (typeof callback === "function") {
          console.log("---brsql--- 插入配方:",formula,formula.fid)
          callback(success_code,formula.fid)
        }
      });
    }

    /**
    *查询全部配方
    **/
    queryAllFormulaDB(callback){
      realm.write(() => {
        var formulas = realm.objects(FormulaTable)
        if (typeof callback === "function") {
          console.log('---brsql---  查询全部配方:',formulas,formulas.length)
          callback(success_code,formulas)
        }
      });
    }
    /**
    *查询某个配方
    **/
    queryOneFormulaDB(rowid,callback){
      realm.write(() => {
        var filtered = 'fid = "'+rowid+'"';
        // console.log('---brsql---  查询单个配方filtered:',filtered)
        var formulas = realm.objects(FormulaTable).filtered(filtered)
        console.log('---brsql---  查询单个配方:',formulas)
        if(formulas.length > 0 ){
            if (typeof callback === "function") {
              console.log('---brsql---  查询单个配方:',formulas[0])
              callback(success_code,formulas[0]);
            }
        }
      });
    }
    /**
    *删除配方
    **/
    deleteFormulaDB(rowid,callback){
      realm.write(() => {
        var filtered = 'fid = "'+rowid+'"';
        var formulas=realm.objects(FormulaTable);
        var formula=formulas.filtered(filtered);
        realm.delete(formula);
        if (typeof callback === "function") {
          console.log('---brsql---  删除单个配方:',rowid);
          callback(success_code,rowid);
        }
      });
    }
    /**
    *更新配方
    **/
    updateFormulaDB(id,fname,malts,hopss,yeasts,water,accessoriess,callback){
      console.log(id,fname,malts,hopss,yeasts,water,accessoriess)
      realm.write(() => {
        var formula = realm.create(FormulaTable, {
          fid:id,//id
          fname:  fname,//配方名称
          malts:malts,//麦芽
          hopss: hopss,//啤酒花
          yeasts: yeasts,//酵母
          water:water,//水
          accessoriess:accessoriess//辅料
        },
        true);
        if (typeof callback === "function") {
          console.log('---brsql---  更新配方:',formula);
          callback(success_code);
        }
      });
    }

    /**
    *插入消息
    **/
    insertMessageDB(title,text,callback){
      var id = uuid.v4();
      console.log(id,title,text)
      realm.write(() => {
        var message = realm.create(MessageTable, {
          mid:id,//id
          title:  title,
          content:text
        });
        if (typeof callback == "function") {
          console.log("---brsql--- 插入消息:",message,message.fid)
          callback(success_code,message.mid)
        }
      });
    }
    /**
    *查询全部消息
    **/
    queryAllMessageDB(callback){
      realm.write(() => {
        var messages = realm.objects(MessageTable)
        if (typeof callback === "function") {
          console.log('---brsql---  查询全部消息:',messages.length)
          callback(success_code,messages)
        }
      });
    }
    /**
    *删除消息
    **/
    deleteMessageDB(rowid,callback){
      realm.write(() => {
        var filtered = 'mind = "'+rowid+'"';
        var messages=realm.objects(MessageTable);
        var message=formulas.filtered(filtered);
        realm.delete(message);
        if (typeof callback === "function") {
          console.log('---brsql---  删除单个消息:',rowid);
          callback(success_code,rowid);
        }
      });
    }
    deleteAllMessageDB(callback){
      realm.write(() => {
        var messages=realm.objects(MessageTable);
        realm.delete(messages);
        if (typeof callback === "function") {
          console.log('---brsql---  删除所有消息:');
          callback(success_code,0);
        }
      });
    }
}
