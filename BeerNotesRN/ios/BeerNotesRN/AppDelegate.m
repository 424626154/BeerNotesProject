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
#import <AMapFoundationKit/AMapFoundationKit.h>
#import <IQKeyboardManager.h>
#import <UserNotifications/UserNotifications.h>
#import "UMMobClick/MobClick.h"
#import "UMessage.h"

#import <UserNotifications/UserNotifications.h>
@interface AppDelegate()<UNUserNotificationCenterDelegate>
{
  
}

@end
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

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
  //配置高德Key至AppDelegate.m文件
  [AMapServices sharedServices].apiKey = @"ff8219f0a59a5f912fa7003add4d93de";
  NSString *homeDir = NSHomeDirectory();
  NSLog(@"%@", homeDir);
  
  [IQKeyboardManager sharedManager].enable = YES;
  
//  IOS8 新系统需要使用新的代码咯
  if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0)
  {
    [[UIApplication sharedApplication] registerUserNotificationSettings:[UIUserNotificationSettings
                                                                         settingsForTypes:(UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge)
                                                                         categories:nil]];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
  }
  else
  {
    //这里还是原来的代码
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:
     (UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert)];
  }
  
  UMConfigInstance.appKey = @"5846ef9fa325116db20017b3";
  UMConfigInstance.ChannelId = @"h_home";
  UMConfigInstance.eSType = E_UM_GAME; //仅适用于游戏场景，应用统计不用设置

  [MobClick startWithConfigure:UMConfigInstance];//配置以上参数后调用此方法初始化SDK
  
  [self initUmengPush:launchOptions];
  
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

-(void)initUmengPush:(NSDictionary *)launchOptions
{
  //设置 AppKey 及 LaunchOptions
  [UMessage startWithAppkey:@"5846ef9fa325116db20017b3" launchOptions:launchOptions];
  //注册通知
  [UMessage registerForRemoteNotifications];
  //iOS10必须加下面这段代码。
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate=self;
  UNAuthorizationOptions types10=UNAuthorizationOptionBadge|UNAuthorizationOptionAlert|UNAuthorizationOptionSound;
  [center requestAuthorizationWithOptions:types10 completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
      //点击允许
      
    } else {
      //点击不允许
      
    }
  }];
  
  //如果你期望使用交互式(只有iOS 8.0及以上有)的通知，请参考下面注释部分的初始化代码
  UIMutableUserNotificationAction *action1 = [[UIMutableUserNotificationAction alloc] init];
  action1.identifier = @"action1_identifier";
  action1.title=@"打开应用";
  action1.activationMode = UIUserNotificationActivationModeForeground;//当点击的时候启动程序
  
  UIMutableUserNotificationAction *action2 = [[UIMutableUserNotificationAction alloc] init];  //第二按钮
  action2.identifier = @"action2_identifier";
  action2.title=@"忽略";
  action2.activationMode = UIUserNotificationActivationModeBackground;//当点击的时候不启动程序，在后台处理
  action2.authenticationRequired = YES;//需要解锁才能处理，如果action.activationMode = UIUserNotificationActivationModeForeground;则这个属性被忽略；
  action2.destructive = YES;
  UIMutableUserNotificationCategory *actionCategory1 = [[UIMutableUserNotificationCategory alloc] init];
  actionCategory1.identifier = @"category1";//这组动作的唯一标示
  [actionCategory1 setActions:@[action1,action2] forContext:(UIUserNotificationActionContextDefault)];
  NSSet *categories = [NSSet setWithObjects:actionCategory1, nil];
  
  //如果要在iOS10显示交互式的通知，必须注意实现以下代码
  if ([[[UIDevice currentDevice] systemVersion]intValue]>=10) {
    UNNotificationAction *action1_ios10 = [UNNotificationAction actionWithIdentifier:@"action1_ios10_identifier" title:@"打开应用" options:UNNotificationActionOptionForeground];
    UNNotificationAction *action2_ios10 = [UNNotificationAction actionWithIdentifier:@"action2_ios10_identifier" title:@"忽略" options:UNNotificationActionOptionForeground];
    
    //UNNotificationCategoryOptionNone
    //UNNotificationCategoryOptionCustomDismissAction  清除通知被触发会走通知的代理方法
    //UNNotificationCategoryOptionAllowInCarPlay       适用于行车模式
    UNNotificationCategory *category1_ios10 = [UNNotificationCategory categoryWithIdentifier:@"category101" actions:@[action1_ios10,action2_ios10]   intentIdentifiers:@[] options:UNNotificationCategoryOptionCustomDismissAction];
    NSSet *categories_ios10 = [NSSet setWithObjects:category1_ios10, nil];
    [center setNotificationCategories:categories_ios10];
  }else
  {
    [UMessage registerForRemoteNotifications:categories];
  }
  
  //如果对角标，文字和声音的取舍，请用下面的方法
  //UIRemoteNotificationType types7 = UIRemoteNotificationTypeBadge|UIRemoteNotificationTypeAlert|UIRemoteNotificationTypeSound;
  //UIUserNotificationType types8 = UIUserNotificationTypeAlert|UIUserNotificationTypeSound|UIUserNotificationTypeBadge;
  //[UMessage registerForRemoteNotifications:categories withTypesForIos7:types7 withTypesForIos8:types8];
  
  //for log
  [UMessage setLogEnabled:YES];
}
#pragma mark 以下的方法仅作调试使用
-(NSString *)stringDevicetoken:(NSData *)deviceToken
{
  NSString *token = [deviceToken description];
  NSString *pushToken = [[[token stringByReplacingOccurrencesOfString:@"<"withString:@""]                   stringByReplacingOccurrencesOfString:@">"withString:@""] stringByReplacingOccurrencesOfString:@" "withString:@""];
  return pushToken;
}


@end
