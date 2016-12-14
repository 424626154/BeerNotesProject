//
//  FeedbcakView.h
//  BeerNotesRN
//
//  Created by bingbing on 2016/12/9.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RCTComponent.h"
@interface FeedbcakView : UIView

@property (nonatomic, copy) RCTBubblingEventBlock onCloseFeedback;
-(void)closeFeedback;
@end
