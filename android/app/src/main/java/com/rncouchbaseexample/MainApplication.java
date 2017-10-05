package com.rncouchbaseexample;

import android.app.Application;
import android.util.Log;

import com.couchbase.lite.CouchbaseLiteException;
import com.couchbase.lite.Database;
import com.couchbase.lite.DatabaseOptions;
import com.couchbase.lite.Manager;
import com.couchbase.lite.android.AndroidContext;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import me.fraserxu.rncouchbaselite.ReactCBLiteManager;

public class MainApplication extends Application implements ReactApplication {

  private Boolean encryptionEnabled = true;

  private Database database;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ReactCBLiteManager()
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

    //enableLogging();
    //openDatabase("password123456");
    //openDatabase(null);
    //closeDatabase();
  }



  private void openDatabase(String key) {
    DatabaseOptions options = new DatabaseOptions();
    options.setCreate(true);

    if (encryptionEnabled) {
      options.setEncryptionKey(key);
    }

    Manager manager = null;
    try {
      manager = new Manager(new AndroidContext(getApplicationContext()), Manager.DEFAULT_OPTIONS);
    } catch (IOException e) {
      e.printStackTrace();
    }
    try {
      database = manager.openDatabase("smt", options);
      //manager.registerEncryptionKey(null, "smt");
      database.changeEncryptionKey(null);
      //database.close();

    } catch (CouchbaseLiteException e) {
      e.printStackTrace();
    }
  }



  private void enableLogging() {
    Manager.enableLogging("smt", Log.VERBOSE);
    Manager.enableLogging(com.couchbase.lite.util.Log.TAG, Log.VERBOSE);
    Manager.enableLogging(com.couchbase.lite.util.Log.TAG_SYNC_ASYNC_TASK, Log.VERBOSE);
    Manager.enableLogging(com.couchbase.lite.util.Log.TAG_SYNC, Log.VERBOSE);
    Manager.enableLogging(com.couchbase.lite.util.Log.TAG_QUERY, Log.VERBOSE);
    Manager.enableLogging(com.couchbase.lite.util.Log.TAG_VIEW, Log.VERBOSE);
    Manager.enableLogging(com.couchbase.lite.util.Log.TAG_DATABASE, Log.VERBOSE);
  }
}
