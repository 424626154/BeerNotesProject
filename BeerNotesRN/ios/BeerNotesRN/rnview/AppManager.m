//
//  AppManager.m
//  BeerNotesRN
//
//  Created by bingbing on 2016/12/10.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "AppManager.h"
#import "RCTMapManager.h"

@implementation AppManager
- (instancetype)init
{
  self = [super init];
  if (self) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(saveMessage:) name:@"Notification_SaveMessage" object:nil];
  }
  return self;
}
@synthesize bridge = _bridge;
RCT_EXPORT_MODULE();
RCT_REMAP_METHOD(getAppVersion, resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)reject){
  resolver(@[[self getIOSAppVersion]]);
}

RCT_EXPORT_VIEW_PROPERTY(onUploadToken, RCTBubblingEventBlock);

-(NSString*)getIOSAppVersion
{
  return [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
}

-(void)saveMessage:(NSNotification *)notification
{
   NSDictionary * infoDic = [notification object];
  NSLog(@"saveMessage,%@",  [infoDic objectForKey:@"alert"]);
  [self saveMessageEventReminderReceived:notification];
}


- (void)saveMessageEventReminderReceived:(NSNotification *)notification
{
//  NSString *eventName = notification.userInfo[@"alert"];
  NSDictionary * infoDic = [notification object];
  NSString *eventName = [infoDic objectForKey:@"alert"];
  [self.bridge.eventDispatcher sendAppEventWithName:@"saveMessage"
                                               body:@{@"title": eventName,@"text":eventName}];
}

@end
