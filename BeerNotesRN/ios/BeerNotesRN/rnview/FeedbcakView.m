//
//  FeedbcakView.m
//  BeerNotesRN
//
//  Created by bingbing on 2016/12/9.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "FeedbcakView.h"
#import "FeedbcakVC.h"
@interface FeedbcakView()

@property (nonatomic, strong) FeedbcakVC *feedbcakVC;
@property (nonatomic, strong) UIView *feedbcakView;

@end
@implementation FeedbcakView

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
    [self addSubview:[self buyView]];
  }
  return self;
}

#pragma mark - 懒加载
-(UIView*)buyView
{
  if(!_feedbcakView){
    self.feedbcakVC = [[FeedbcakVC alloc]init];
    _feedbcakView = self.feedbcakVC.view;
    self.feedbcakVC.feedbcak = self;
  }
  return _feedbcakView;
}
-(void)closeFeedback
{
  if (!self.onCloseFeedback) {
    return;
  }
  self.onCloseFeedback(@{@"target": self});
}
@end
