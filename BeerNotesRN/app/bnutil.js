
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var halfamonth = day * 15;
var month = day * 30;
import BNConfig from './config';
export default class BNUtil{
  static cloneFormula(formla){
    var item =new Object();
    item.fid = formla.fid;
    item.fname = formla.fname;
    item.malts = formla.malts;
    item.hopss = formla.hopss;
    item.yeasts = formla.yeasts;
    item.water = formla.water;
    item.accessoriess = formla.accessoriess;
    return item;
  }
  static cloneCloudFormula(formla){
    var item =new Object();
    item.fid = formla.Fid;
    item.fname = formla.Fname;
    item.malts = formla.Malts;
    item.hopss = formla.Hopss;
    item.yeasts = formla.Yeasts;
    item.water = formla.Water;
    item.accessoriess = formla.Accessoriess;
    item.uid = formla.Uid;
    item.username = formla.Username;
    item.time = formla.Time;
    item.lovenum = formla.Lovenum;
    item.islove = formla.Islove;
    item.isdele = formla.Isdele;
    return item;
  }

  static cloneFormulaComment(formla){
    var item =new Object();
    item.id = formla.Id
    item.fid = formla.Fid;
    item.uid = formla.Username;
    item.username = formla.Username;
    item.comment = formla.Comment;
    item.fcid = formla.Fcid;
    item.fcuid = formla.Fcuid;
    item.fcusername = formla.Fcusername;
    item.time = formla.Time;
    item.lovenum = formla.Lovenum;
    item.islove = formla.Islove;
    item.isdele = formla.Isdele;
    return item;
  }
  static cloneFormulaLove(formla){
    var item =new Object();
    item.id = formla.Id
    item.fid = formla.Fid;
    item.uid = formla.Username;
    item.fcid = formla.Fcid;
    item.islove = formla.Islove;
    return item;
  }
  //JavaScript函数：
  static getDateDiff(dateTimeStamp){
      var now = new Date().getTime();
      // console.log(now)
      // console.log(dateTimeStamp)
      var diffValue = now - dateTimeStamp*1000;
      if(diffValue < 0){
       //若日期不符则弹出窗口告之
       //alert("结束日期不能小于开始日期！");
       }
      var monthC =diffValue/month;
      var weekC =diffValue/(7*day);
      var dayC =diffValue/day;
      var hourC =diffValue/hour;
      var minC =diffValue/minute;
      if(monthC>=1){
       result="发表于" + parseInt(monthC) + "个月前";
       }
       else if(weekC>=1){
       result="发表于" + parseInt(weekC) + "周前";
       }
       else if(dayC>=1){
       result="发表于"+ parseInt(dayC) +"天前";
       }
       else if(hourC>=1){
       result="发表于"+ parseInt(hourC) +"个小时前";
       }
       else if(minC>=1){
       result="发表于"+ parseInt(minC) +"分钟前";
       }else
       result="刚刚发表";
      return result;
  }
  static getImagePath(image){
    var path = "http://"+BNConfig.getIP()+":"+5000+"/imagehosting/"+image;
    return path;
  }
}
