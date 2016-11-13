//
//  BNMapManager.m
//  BeerNotesRN
//
//  Created by bingbing on 2016/11/12.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "BNMapVCManager.h"
#import "BNMapView.h"
#import "RCTBridge.h"           //进行通信的头文件
#import "RCTUIManager.h"
#import "RCTEventDispatcher.h"  //事件派发，不导入会引起Xcode警告

@implementation BNMapVCManager
//标记宏(必要)
RCT_EXPORT_MODULE()

-(UIView*)view
{
  BNMapView *mapView = [[BNMapView alloc]initWithFrame:[UIScreen mainScreen].bounds];
  return mapView;
}


@end
