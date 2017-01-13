'use strict';
import React, {
  Component,
} from 'react';

import {
  AsyncStorage,
} from 'react-native';
const TOKEN = "token";
const SECRET= "secret";
const USERNAME = "username";

class StorageUitl extends React.Component {
  static saveLogin(user){
    var user_obj = JSON.parse(user)
    console.log(user_obj)
    AsyncStorage.setItem(
         TOKEN,
         user_obj.Token,
         (error)=>{
             if (error){
                 alert('保存token失败:',error);
             }
         }
     );
     AsyncStorage.setItem(
          SECRET,
          user_obj.Secret,
          (error)=>{
              if (error){
                  alert('保存secret失败:',error);
              }
          }
      );
     AsyncStorage.setItem(
          USERNAME,
          user_obj.Username,
          (error)=>{
              if (error){
                  alert('保存username失败:',error);
              }
          }
      );
  }

  static saveRegister(user){
    var user_obj = JSON.parse(user)
    console.log(user_obj)
    AsyncStorage.setItem(
         TOKEN,
         user_obj.Token,
         (error)=>{
             if (error){
                 alert('保存token失败:',error);
             }
         }
     );
     AsyncStorage.setItem(
          SECRET,
          user_obj.Secret,
          (error)=>{
              if (error){
                  alert('保存secret失败:',error);
              }
          }
      );
     AsyncStorage.setItem(
          USERNAME,
          user_obj.Username,
          (error)=>{
              if (error){
                  alert('保存username失败:',error);
              }
          }
      );
  }

  static saveModify(user){
    var user_obj = JSON.parse(user)
    console.log(user_obj)
    AsyncStorage.setItem(
         TOKEN,
         user_obj.Token,
         (error)=>{
             if (error){
                 alert('保存token失败:',error);
             }
         }
     );
     AsyncStorage.setItem(
          SECRET,
          user_obj.Secret,
          (error)=>{
              if (error){
                  alert('保存secret失败:',error);
              }
          }
      );
     AsyncStorage.setItem(
          USERNAME,
          user_obj.Username,
          (error)=>{
              if (error){
                  alert('保存username失败:',error);
              }
          }
      );
  }

  static getUserName(callback){
    AsyncStorage.getItem(
       USERNAME,
       (error,result)=>{
           if (error){
               alert('取值失败:'+error);
               callback("");
           }else{
              console.log(USERNAME,result)
              if(result != null){
                callback(result);
              }else{
                callback("");
              }
           }
       }
   )
  }
}

module.exports = StorageUitl;
