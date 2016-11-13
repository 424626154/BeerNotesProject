package com.bbs.beernotes.rnview;

import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.widget.FrameLayout;

import com.amap.api.maps.AMap;
import com.amap.api.maps.MapView;
import com.bbs.beernotes.R;
import com.facebook.react.ReactActivity;

import javax.annotation.Nullable;

/**
 * Created by bingbing on 2016/11/13.
 */
public class BNMapVC extends MapView {


    public BNMapVC(Context context) {
        super(context);
    }
}
