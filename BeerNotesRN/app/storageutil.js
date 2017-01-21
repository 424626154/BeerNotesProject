'use strict';
import React, {
  Component,
} from 'react';

import {
  AsyncStorage,
} from 'react-native';
const TOKEN = "Token";
const SECRET= "Secret";
const USERNAME = "Username";
const USER = "user"

class StorageUitl extends React.Component {
  static saveUser(user){
    var user_obj = JSON.parse(user)
    console.log("saveUser:",user_obj)
    AsyncStorage.setItem(
         USER,
         user,
         (error)=>{
             if (error){
                 alert('保存user失败:',error);
             }
         }
     );
  }
  static getUser(callback){
      AsyncStorage.getItem(
         USER,
         (error,result)=>{
             if (error){
                 alert('取值失败:'+error);
                 callback(null);
             }else{
                console.log("getUser :",result)
                if(result != null){
                  var user_obj = JSON.parse(result)
                  callback(user_obj);
                }else{
                  callback(null);
                }
             }
         }
     )
  }
  static removeUser(){
    AsyncStorage.removeItem(
        USER,
        (error)=>{
            if(error){
                alert('移除user失败');
            }
        }
      )
  }
}

module.exports = StorageUitl;
