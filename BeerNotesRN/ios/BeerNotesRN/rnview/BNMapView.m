//
//  BNMapView.m
//  BeerNotesRN
//
//  Created by bingbing on 2016/11/13.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "BNMapView.h"
#import "BNMapVC.h"

@interface BNMapView()


@property (nonatomic, strong) BNMapVC *bNMapVC;
@property (nonatomic, strong) UIView *bNMapView;

@end

@implementation BNMapView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/


-(instancetype)initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  if (self) {
    [self addSubview:[self mapView]];
  }
  return self;
}

#pragma mark - 懒加载
-(UIView*)mapView
{
  if(!_bNMapView){
    self.bNMapVC = [[BNMapVC alloc]init];
    _bNMapView = self.bNMapVC.view;
  }
  return _bNMapView;
}

@end
