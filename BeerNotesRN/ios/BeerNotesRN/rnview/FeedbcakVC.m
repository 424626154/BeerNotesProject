//
//  FeedbcakVC.m
//  BeerNotesRN
//
//  Created by bingbing on 2016/12/9.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "FeedbcakVC.h"
#import "TWMessageBarManager.h"
#import <YWFeedbackFMWK/YWFeedbackKit.h>
#import <YWFeedbackFMWK/YWFeedbackViewController.h>
#import "AppConfig.h"

@interface FeedbcakVC ()<UISplitViewControllerDelegate>
@property (nonatomic, strong) YWFeedbackKit *feedbackKit;
@end

@implementation FeedbcakVC


- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  [self openFeedbackViewController];
  NSString *alert = @"alert";
  [[NSNotificationCenter defaultCenter]  postNotificationName:@"Notification_SaveMessage" object:[NSDictionary dictionaryWithObjectsAndKeys:alert , @"alert",nil]];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
#pragma mark getter
- (YWFeedbackKit *)feedbackKit {
  if (!_feedbackKit) {
    _feedbackKit = [[YWFeedbackKit alloc] initWithAppKey:ALBC_FKEY];
  }
  return _feedbackKit;
}

#pragma mark - methods
/** 打开用户反馈页面 */
- (void)openFeedbackViewController {
  //  初始化方式,或者参考下方的`- (YWFeedbackKit *)feedbackKit`方法。
  //  self.feedbackKit = [[YWFeedbackKit alloc] initWithAppKey:kAppKey];
  
  /** 设置App自定义扩展反馈数据 */
  self.feedbackKit.extInfo = @{@"loginTime":[[NSDate date] description],
                               @"visitPath":@"登陆->关于->反馈",
                               @"userid":@"yourid",
                               @"应用自定义扩展信息":@"开发者可以根据需要设置不同的自定义信息，方便在反馈系统中查看"};
  
  __weak typeof(self) weakSelf = self;
  [self.feedbackKit makeFeedbackViewControllerWithCompletionBlock:^(YWFeedbackViewController *viewController, NSError *error) {
    if (viewController != nil) {
      UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:viewController];
      [weakSelf presentViewController:nav animated:YES completion:nil];
      
      [viewController setCloseBlock:^(UIViewController *aParentController){
        [aParentController dismissViewControllerAnimated:YES completion:nil];
        if (_feedbcak != nil) {
          [_feedbcak closeFeedback];
        }
      }];
    } else {
      /** 使用自定义的方式抛出error时，此部分可以注释掉 */
      NSString *title = [error.userInfo objectForKey:@"msg"]?:@"接口调用失败，请保持网络通畅！";
      [[TWMessageBarManager sharedInstance] showMessageWithTitle:title
                                                     description:nil
                                                            type:TWMessageBarMessageTypeError];
    }
  }];
  
  /** 使用自定义的方式抛出error */
  //    [self.feedbackKit setYWFeedbackViewControllerErrorBlock:^(YWFeedbackViewController *viewController, NSError *error) {
  //        NSString *title = [error.userInfo objectForKey:@"msg"]?:@"接口调用失败，请保持网络通畅！";
  //        [[TWMessageBarManager sharedInstance] showMessageWithTitle:title
  //                                                       description:[NSString stringWithFormat:@"%ld", error.code]
  //                                                              type:TWMessageBarMessageTypeError];
  //    }];
}
#pragma mark UISplitViewController delegate
- (BOOL)splitViewController:(UISplitViewController *)svc shouldHideViewController:(UIViewController *)vc inOrientation:(UIInterfaceOrientation)orientation  NS_DEPRECATED_IOS(5_0, 8_0, "Use preferredDisplayMode instead") {
  return NO;
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
