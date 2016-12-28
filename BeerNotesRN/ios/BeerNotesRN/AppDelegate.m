/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import "UMMobClick/MobClick.h"
#import "AppConfig.h"
#import <IQKeyboardManager.h>
#import <UserNotifications/UserNotifications.h>
#import "UMessage.h"
#import <Bugly/Bugly.h>
#import "RCTHotUpdate.h"

@interface AppDelegate()<UNUserNotificationCenterDelegate>
{
  
}

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
#if DEBUG
  // 原来的jsCodeLocation
  jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.100:8081/index.ios.bundle?platform=ios&dev=true"];
#else
  jsCodeLocation=[RCTHotUpdate bundleURL];
#endif
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"BeerNotesRN"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
   [IQKeyboardManager sharedManager].enable = YES;
  [self initUmeng];
  [self initUmengPush:launchOptions];
  [self initBugly];
  return YES;
}

/*!
 *  @author Yunis_song, 15-03-27 17:03:03
 *
 *  @brief  获取tonken
 *
 */
- (void)application:(UIApplication*)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken
{
  NSLog(@"My token is: %@",[self stringDevicetoken:deviceToken]);
}
/*!
 *  @author Yunis_song, 15-03-27 17:03:28
 *
 *  @brief  获取token失败
 *
 */
- (void)application:(UIApplication*)application didFailToRegisterForRemoteNotificationsWithError:(NSError*)error
{
  NSLog(@"Failed to get token, error: %@", error);
}
/*!
 *  @author Yunis_song, 15-03-27 17:03:45
 *
 *  @brief  推送的消息
 *
 */
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
  NSLog(@"userinfor is : %@", userInfo);
  //关闭友盟自带的弹出框
  [UMessage setAutoAlert:NO];
  [UMessage didReceiveRemoteNotification:userInfo];
}
//iOS10新增：处理前台收到通知的代理方法
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler{
  NSDictionary * userInfo = notification.request.content.userInfo;
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    //应用处于前台时的远程推送接受
    //必须加这句代码
    [UMessage didReceiveRemoteNotification:userInfo];
    
  }else{
    //应用处于前台时的本地推送接受
  }
  //当应用处于前台时提示设置，需要哪个可以设置哪一个
  completionHandler(UNNotificationPresentationOptionSound|UNNotificationPresentationOptionBadge|UNNotificationPresentationOptionAlert);
}

//iOS10新增：处理后台点击通知的代理方法
-(void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler{
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    //应用处于后台时的远程推送接受
    //必须加这句代码
    [UMessage didReceiveRemoteNotification:userInfo];
    
  }else{
    //应用处于后台时的本地推送接受
  }
  
}


-(void)initUmeng
{
  UMConfigInstance.appKey = UMENG_KEY;
  UMConfigInstance.ChannelId = @"App Store";

  [MobClick startWithConfigure:UMConfigInstance];//配置以上参数后调用此方法初始化SDK
}

-(void)initUmengPush:(NSDictionary *)launchOptions
{
  //初始化方法,也可以使用(void)startWithAppkey:(NSString *)appKey launchOptions:(NSDictionary * )launchOptions httpsenable:(BOOL)value;这个方法，方便设置https请求。
  [UMessage startWithAppkey:UMENG_KEY launchOptions:launchOptions httpsenable:YES];
  
  
  //注册通知，如果要使用category的自定义策略，可以参考demo中的代码。
  [UMessage registerForRemoteNotifications];
  
  //iOS10必须加下面这段代码。
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate=self;
  UNAuthorizationOptions types10=UNAuthorizationOptionBadge|  UNAuthorizationOptionAlert|UNAuthorizationOptionSound;
  [center requestAuthorizationWithOptions:types10     completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
      //点击允许
      //这里可以添加一些自己的逻辑
    } else {
      //点击不允许
      //这里可以添加一些自己的逻辑
    }
  }];
  
  //打开日志，方便调试
  [UMessage setLogEnabled:YES];
}

-(void)initBugly
{
  [Bugly startWithAppId:Bugly_KEY];
}

#pragma mark 以下的方法仅作调试使用
-(NSString *)stringDevicetoken:(NSData *)deviceToken
{
  NSString *token = [deviceToken description];
  NSString *pushToken = [[[token stringByReplacingOccurrencesOfString:@"<"withString:@""]                   stringByReplacingOccurrencesOfString:@">"withString:@""] stringByReplacingOccurrencesOfString:@" "withString:@""];
  return pushToken;
}

@end
