package com.bbs.beernotes.rnview;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

/**
 * Created by bingbing on 2016/11/13.
 */
public class BNMapVCManager extends SimpleViewManager<BNMapVC>{
    public static final String REACT_CLASS = "BNMapVC";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected BNMapVC createViewInstance(ThemedReactContext reactContext) {
        BNMapVC bnMapView = new BNMapVC(reactContext);
        bnMapView.onCreate(null);
        return bnMapView;
    }
}
