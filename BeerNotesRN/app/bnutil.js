
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
}
