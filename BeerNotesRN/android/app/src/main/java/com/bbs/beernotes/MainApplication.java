package com.bbs.beernotes;

import android.Manifest;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

//import com.alibaba.sdk.android.feedback.impl.FeedbackAPI;
import com.alibaba.sdk.android.feedback.impl.FeedbackAPI;
import com.bbs.beernotes.rnview.AppConfig;
import com.bbs.beernotes.rnview.AppReactPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.umeng.analytics.MobclickAgent;
import com.umeng.message.IUmengRegisterCallback;
import com.umeng.message.PushAgent;
import com.umeng.message.common.UmLog;


import org.pgsqlite.SQLitePluginPackage;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

//import com.idescout.sql.SqlScoutServer;

public class MainApplication extends Application implements ReactApplication {
  private static MainApplication instance;
  public static MainApplication getInstance() {
    return instance;
  }
    private static final String TAG = MainApplication.class.getName();
    @Override
  public void onCreate() {
    super.onCreate();
//    SqlScoutServer.create(this, getPackageName());
    instance = this;
    initFeedback();
    initPush();
      Log.i("deviceInfo",getDeviceInfo(this));
      MobclickAgent.onEvent(this,"Forward");
  }


  public void initFeedback(){
    FeedbackAPI.init(MainApplication.getInstance(), AppConfig.ALBC_FKEY);
  }
  public void initPush(){
    PushAgent mPushAgent = PushAgent.getInstance(this);
//      mPushAgent.setDebugMode(true);
    //注册推送服务 每次调用register都会回调该接口
    mPushAgent.register(new IUmengRegisterCallback() {
      @Override
      public void onSuccess(String deviceToken) {
        UmLog.i(TAG, "device token: " + deviceToken);
      }

      @Override
      public void onFailure(String s, String s1) {
        UmLog.i(TAG, "register failed: " + s + " " +s1);
      }
    });
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
              new AppReactPackage(),
              new SQLitePluginPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
  public static boolean checkPermission(Context context, String permission) {
    boolean result = false;
    if (Build.VERSION.SDK_INT >= 23) {
      try {
        Class<?> clazz = Class.forName("android.content.Context");
        Method method = clazz.getMethod("checkSelfPermission", String.class);
        int rest = (Integer) method.invoke(context, permission);
        if (rest == PackageManager.PERMISSION_GRANTED) {
          result = true;
        } else {
          result = false;
        }
      } catch (Exception e) {
        result = false;
      }
    } else {
      PackageManager pm = context.getPackageManager();
      if (pm.checkPermission(permission, context.getPackageName()) == PackageManager.PERMISSION_GRANTED) {
        result = true;
      }
    }
    return result;
  }
  public static String getDeviceInfo(Context context) {
    try {
      org.json.JSONObject json = new org.json.JSONObject();
      android.telephony.TelephonyManager tm = (android.telephony.TelephonyManager) context
              .getSystemService(Context.TELEPHONY_SERVICE);
      String device_id = null;
      if (checkPermission(context, Manifest.permission.READ_PHONE_STATE)) {
        device_id = tm.getDeviceId();
      }
      String mac = null;
      FileReader fstream = null;
      try {
        fstream = new FileReader("/sys/class/net/wlan0/address");
      } catch (FileNotFoundException e) {
        fstream = new FileReader("/sys/class/net/eth0/address");
      }
      BufferedReader in = null;
      if (fstream != null) {
        try {
          in = new BufferedReader(fstream, 1024);
          mac = in.readLine();
        } catch (IOException e) {
        } finally {
          if (fstream != null) {
            try {
              fstream.close();
            } catch (IOException e) {
              e.printStackTrace();
            }
          }
          if (in != null) {
            try {
              in.close();
            } catch (IOException e) {
              e.printStackTrace();
            }
          }
        }
      }
      json.put("mac", mac);
      if (TextUtils.isEmpty(device_id)) {
        device_id = mac;
      }
      if (TextUtils.isEmpty(device_id)) {
        device_id = android.provider.Settings.Secure.getString(context.getContentResolver(),
                android.provider.Settings.Secure.ANDROID_ID);
      }
      json.put("device_id", device_id);
      return json.toString();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }
}
