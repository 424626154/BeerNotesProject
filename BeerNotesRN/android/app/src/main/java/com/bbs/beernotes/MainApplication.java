package com.bbs.beernotes;

import android.Manifest;
import android.app.AlertDialog;
import android.app.Application;
import android.app.Dialog;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.alibaba.sdk.android.feedback.impl.FeedbackAPI;
import com.bbs.beernotes.rnview.AppConfig;
import com.bbs.beernotes.rnview.AppReactPackage;
import com.facebook.react.ReactApplication;

import cn.reactnative.modules.update.UpdateContext;
import cn.reactnative.modules.update.UpdatePackage;
import cz.msebera.android.httpclient.Header;
import io.realm.react.RealmReactPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;
import com.tencent.bugly.crashreport.CrashReport;
import com.umeng.analytics.MobclickAgent;
import com.umeng.message.IUmengRegisterCallback;
import com.umeng.message.PushAgent;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

import static com.bbs.beernotes.rnview.AppConfig.*;
import static com.bbs.beernotes.rnview.AppConfig.Umeng_appkey;
import static com.bbs.beernotes.rnview.AppConfig.Umeng_channelId;
import static com.bbs.beernotes.rnview.AppConfig.isCrashEnable;

public class MainApplication extends Application implements ReactApplication {
  private static final String TAG = MainApplication.class.getName();
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return UpdateContext.getBundleUrl(MainApplication.this);
    }

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new UpdatePackage(),
            new RealmReactPackage(),
              new AppReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }


  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initUmeng();
    initPush();
    initBugly();
    initFeedback();
  }

  public void initUmeng() {
    MobclickAgent.setDebugMode( true );
    Log.i(TAG,"device info: "+getDeviceInfo(this));
  }

  public void initFeedback(){
    FeedbackAPI.init(this, AppConfig.ALBC_FKEY);
  }
  public void initPush(){
    PushAgent mPushAgent = PushAgent.getInstance(this);
    mPushAgent.setPushIntentServiceClass(BNPushMessageService.class);
//      mPushAgent.setDebugMode(true);
    //注册推送服务 每次调用register都会回调该接口
    mPushAgent.register(new IUmengRegisterCallback() {
      @Override
      public void onSuccess(String deviceToken) {
        Log.i(TAG, "device token: " + deviceToken);
        uplodaToken(deviceToken);
      }

      @Override
      public void onFailure(String s, String s1) {
        Log.i(TAG, "register failed: " + s + " " +s1);
      }
    });
  }

  public void initBugly(){
    CrashReport.initCrashReport(getApplicationContext(), Bugly_KEY, false);
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

  public void uplodaToken(String token){
    Log.i("uplodaToken :",token);
    AsyncHttpClient client = new AsyncHttpClient(); // 创建异步请求的客户端对象
    client.addHeader("Accept","application/json");
    String url = "";
    if(ISDEBUG){
      url =  DEBUG_IP+":"+HOST+"/app/uploadtoken"; // 定义请求的地址
    }else{
      url = IP+":"+HOST+"/app/uploadtoken"; // 定义请求的地址
    }
    // 创建请求参数的封装的对象
    RequestParams params = new RequestParams();
    params.put("token", token); // 设置请求的参数名和参数值
    params.put("ostype", "android");// 设置请求的参数名和参数
    // 执行post方法
    client.post(url, params, new AsyncHttpResponseHandler() {
      /**
       * 成功处理的方法
       * statusCode:响应的状态码; headers:相应的头信息 比如 响应的时间，响应的服务器 ;
       * responseBody:响应内容的字节
       */
      @Override
      public void onSuccess(int statusCode, Header[] headers,
                            byte[] responseBody) {
        String res = new String(responseBody);
        Log.i("uplodaToken :",res);
        if (statusCode == 200) {
          try {
            JSONObject res_json = new JSONObject(res);
            int errcode = res_json.getInt("errcode");
            if(errcode == 0 ){
              String data = res_json.getString("data");
              Log.i(TAG,data);
            }else{
              String errmsg = res_json.getString("errmsg");
              Log.i(TAG,errmsg);
            }
          } catch (JSONException e) {
            e.printStackTrace();
          }
        }
      }

      /**
       * 失败处理的方法
       * error：响应失败的错误信息封装到这个异常对象中
       */
      @Override
      public void onFailure(int statusCode, Header[] headers,
                            byte[] responseBody, Throwable error) {
        error.printStackTrace();// 把错误信息打印出轨迹来
        Log.i("uplodaToken :",error.toString());
      }
    });
  }
}
