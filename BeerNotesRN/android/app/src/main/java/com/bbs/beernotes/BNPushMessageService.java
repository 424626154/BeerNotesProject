package com.bbs.beernotes;

import android.content.Context;
import android.content.Intent;

import com.bbs.beernotes.rnview.AppManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.umeng.message.UmengMessageService;
import com.umeng.message.common.UmLog;
import com.umeng.message.entity.UMessage;

import org.android.agoo.common.AgooConstants;
import org.json.JSONException;
import org.json.JSONObject;

import javax.annotation.Nullable;

/**
 * Created by bingbing on 2017/1/1.
 */

public class BNPushMessageService extends UmengMessageService {
    private static final String TAG = BNPushMessageService.class.getName();
    @Override
    public void onMessage(Context context, Intent intent) {
        String message = intent.getStringExtra(AgooConstants.MESSAGE_BODY);
        try {
            UMessage msg = new UMessage(new JSONObject(message));
            UmLog.d(TAG, "message=" + message);      //消息体
            WritableMap params = Arguments.createMap();
            JSONObject json = new JSONObject(message);
            String body = json.getString("body");
            JSONObject body_json = new JSONObject(body);
            String title = body_json.getString("title");
            String text = body_json.getString("text");
            params.putString("title",title);
            params.putString("text",text);
            sendEvent(AppManager.getgetReactContext(), "saveMessage", params);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
