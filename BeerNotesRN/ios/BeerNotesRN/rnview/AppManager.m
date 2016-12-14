//
//  AppManager.m
//  BeerNotesRN
//
//  Created by bingbing on 2016/12/10.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "AppManager.h"

@implementation AppManager
RCT_EXPORT_MODULE();
RCT_REMAP_METHOD(getAppVersion, resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)reject){
  resolver(@[[self getIOSAppVersion]]);
}
-(NSString*)getIOSAppVersion
{
  return [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
}
@end
