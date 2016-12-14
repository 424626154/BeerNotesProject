//
//  FeedbcakVCManager.m
//  BeerNotesRN
//
//  Created by bingbing on 2016/12/9.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "FeedbcakVCManager.h"
#import "FeedbcakView.h"
#import "RCTBridge.h"           //进行通信的头文件
#import "RCTUIManager.h"
#import "RCTEventDispatcher.h"  //事件派发，不导入会引起Xcode警告

@implementation FeedbcakVCManager
//标记宏(必要)
RCT_EXPORT_MODULE()

-(UIView*)view
{
  FeedbcakView *feedbcakView = [[FeedbcakView alloc]initWithFrame:[UIScreen mainScreen].bounds];
  return feedbcakView;
}

RCT_EXPORT_VIEW_PROPERTY(onCloseFeedback, RCTBubblingEventBlock)

@end
