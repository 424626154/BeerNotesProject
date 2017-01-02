package com.bbs.beernotes.rnview;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;


import com.alibaba.sdk.android.feedback.impl.FeedbackAPI;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by bingbing on 2016/12/11.
 */

public class AppManager extends ReactContextBaseJavaModule {

    private static ReactContext  reactContext;
    @Override
    public String getName() {
        return "AppManager";
    }
    public AppManager(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }
    @ReactMethod
    public void getAppVersion(Callback successCallback, Callback errorCallback){
        try {
            String version = getAndoridAppVersion();
            successCallback.invoke(version);
        } catch (Exception e) {
            e.printStackTrace();
            errorCallback.invoke(e.getMessage());
        }
    }

    public String getAndoridAppVersion(){
        Context context = getReactApplicationContext();
        String version = "0";
        PackageInfo pi = null;
        try {
            PackageManager pm = context.getPackageManager();
            pi = pm.getPackageInfo(context.getPackageName(),
                    PackageManager.GET_CONFIGURATIONS);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if(pi != null){
            version = pi.versionName;
        }
        return version;
    }
    @ReactMethod
    public void startFeedbackActivity(){
        FeedbackAPI.openFeedbackActivity();
    }

    public static ReactContext getgetReactContext(){
        return reactContext;
    }
}
