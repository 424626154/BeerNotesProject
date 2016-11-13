//
//  BNMapVC.m
//  BeerNotesRN
//
//  Created by bingbing on 2016/11/12.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "BNMapVC.h"
#import <MAMapKit/MAMapKit.h>

@interface BNMapVC ()

@end

@implementation BNMapVC

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  ///初始化地图
  MAMapView *_mapView = [[MAMapView alloc] initWithFrame:self.view.bounds];
  ///把地图添加至view
  [self.view addSubview:_mapView];
  NSLog(@"load map");
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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
