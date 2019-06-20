/* global cordova requestFileSystem LocalFileSystem window */

var cunovs = {
  cnVersion: '0.0.1',
  cnGlobalIndex: 0,
  cnhtmlSize: 0,
  cnhtmlHeight: document.documentElement.clientHeight,
  cnApiServiceUrl: 'http://192.168.0.202',
  cnMoodleServeUrl: 'http://192.168.0.122',
  cnSysUrl: 'http://192.168.0.203:8082',
  cnDownloadFileTag: 'tag_cunovs_download_files',
  cnMiniType: {
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.ogg': 'audio/ogg',
    '.pdf': 'application/pdf',
    '.pps': 'application/vnd.ms-powerpoint',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  },
  cnId: function () {
    return cnGlobalIndex++;
  },
  cnIsArray: function (o) {
    if (cnIsDefined(o)) {
      return cnIsDefined(Array.isArray) ? Array.isArray(o) : Object.prototype.toString.call(o) == '[object Array]';
    }
    return false;
  },
  cnIsDefined: function (o) {
    return (typeof (o) != 'undefined' && o != 'undefined' && o != null);
  },
  cnIsDevice: function () {
    return typeof (device) != 'undefined';
  },
  cnIsAndroid: function () {
    return cnIsDevice() && device.platform == 'Android';
  },
  cnIsiOS: function () {
    return cnIsDevice() && device.platform == 'iOS';
  },
  cnUpdate: function (url) {
    window.location.href = url;
  },
  cnDeviceType: function () {
    if (cnIsAndroid()) {
      return 'android';
    }
    return '';
  },
  cnSetStatusBarStyle: function (router) {
    if (typeof (StatusBar) != 'undefined') {
      if (cnIsAndroid()) {
        router = router || '/';
        switch (router) {
          case '/mine': {
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString('#22609c');
            break;
          }
          case '/closed': {
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString('#22609c');
            break;
          }
          default: {
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString('#22609c');
          }
        }
      } else {
        router = router || '/';
        switch (router) {
          case '/':
          case '/dashboard': {
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString('#22609c');
            break;
          }
          default: {
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString('#22609c');
          }
        }
      }
    }
  },
  cnPlayAudio: function (id, played) {
    var el;
    if (cnIsDefined(id) && (el = document.getElementById(id))) {
      played === true ? el.pause() : el.play();
    }
  },
  cnPrn: function (ars) {
    console.log(ars || arguments);
  },
  cnTakePhoto: function (cb, type) {
    var onSuccess = function (cb, dataurl) {
      cb(cnCreateBlob(dataurl), dataurl);
    };
    var onFail = function () {
    };
    navigator.camera.getPicture(onSuccess.bind(null, cb), onFail, {
      //allowEdit: true //运行编辑图片
      destinationType: Camera.DestinationType.DATA_URL,
      PictureSourceType: type,
    });
  },
  cnCreateBlob: function (data, name, type) {
    var arr = data.split(',')
      ,
      bstr = atob(arr.length > 1 ? arr[1] : data)
      ,
      n = bstr.length
      ,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    var blob = new Blob([u8arr], {
      type: type || 'image/jpeg',
    });
    blob.name = name || 'img_' + (cnGlobalIndex++) + '.jpg';
    return blob;
  },
  cnNeedPositions: function (key, url) {
    if (true) {
      return;
    }
    var cbError = function (err) {
        if (err.code == 3) {
          cbSuccess();
        } else {
          cnShowToast('无法定位您的位置，请开启定位权限并保持网络畅通。', 3000);
        }
      }
      ,
      cbSuccess = function () {
        cordova.BaiduLocation.startPositions(cnPrn, cbError, {
          submitUserToken: key,
          submitAddr: url,
        });
      };
    if (cnIsDevice()) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError, {
        timeout: 5000,
      });
    }
  },
  cnGetCurrentPosition: function (onSuccess, onError, timeout) {
    var cbSuccess = function () {
      onSuccess = onSuccess || cnPrn;
      cordova.BaiduLocation.getCurrentPosition(onSuccess, onError);
    };
    cbError = function (err) {
      //console.log(err)
      onError = onError || cnPrn;
      if (err.code == 3) {
        cbSuccess();
      } else {
        onError();
      }
    };
    timeout = timeout || 500;
    if (cnIsDevice()) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError, {
        timeout: timeout,
      });
    } else {
      onSuccess();
    }
  },
  cnReadFile: function (file, params, onSuccess, onError) {
    onSuccess = onSuccess || cnPrn;
    onError = onError || cnPrn;
    params = params || {};
    if (!file) {
      onError({
        message: '文件不存在。',
      });
    } else {
      var reader = new FileReader();
      reader.onload = function (e) {
        onSuccess(cnCreateBlob(e.target.result, params.name, params.type), params);
      };
      reader.onerror = onError;
      reader.readAsDataURL(file);
    }
  },
  cnWillCallBack: function (data) {
    var cnEvent = new Event('cnevent', { 'bubbles': true, 'cancelable': false });
    cnEvent.cneventParam = data;
    window.dispatchEvent(cnEvent);
  },
  cnStartRecord: function (id, onSuccess, onError) {
    var recordMedia = '';
    if (cnIsAndroid() && cnIsDefined(Media)) {
      id = id || 'Media';
      onSuccess = onSuccess || cnPrn;
      onError = onError || cnPrn;
      var mediaName = id + '_' + cnId() + '.mp3'
        ,
        mediaOnSuccess = function () {
          var media = {
            name: mediaName,
            timers: recordMedia.timers || 5,
          };
          resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dirEntry) {
            dirEntry.getFile(media.name, {}, function (file) {
              file.file(function (f) {
                cnReadFile(f, {
                  name: media.name,
                  timers: media.timers,
                  type: f.type,
                  nativeURL: file.nativeURL,
                }, onSuccess, onError);
                /*                media.file = f
        cnPrn(media)
        onSuccess(media)*/
              }, onError);

            });
          }, onError);
        }
        ,
        recordMedia = new Media(mediaName, mediaOnSuccess, onError);
      recordMedia.startRecord();
    }
    return recordMedia;
  },
  cnStopRecord: function (recordMedia) {
    if (cnIsDefined(recordMedia) && cnIsDefined(recordMedia.stopRecord)) {
      recordMedia.stopRecord();
    }
    return recordMedia;
  },
  cnDecode: function (json) {
    try {
      return eval('(' + json + ')');
    } catch (e) {
      try {
        return JSON.parse(json);
      } catch (e) {
        return json;
      }
    }
  },
  cnShowToast: function (d, time) {
    //退出提示
    var dialog = document.createElement('div');
    dialog.style.cssText = 'position:fixed;' + 'font-size:12px;' + 'left:50%;' + 'bottom:5%;' + 'background-color:rgba(0,0,0,0.5);' + 'z-index:9999;' + 'padding:5px 10px;' + 'color:#fff;' + 'border-radius:5px;' + 'transform:translate(-50%,-50%);' + '-webkit-transform:translate(-50%,-50%);' + '-moz-transform:translate(-50%,-50%);' + '-ms-transform:translate(-50%,-50%);' + '-o-transform:translate(-50%,-50%);';
    dialog.innerHTML = d;
    document.getElementsByTagName('body')[0].appendChild(dialog);
    setTimeout(function () {
      if (dialog) {
        document.getElementsByTagName('body')[0].removeChild(dialog);
      }
    }, time || 2000);
  },
  cnSetAlias: function (alias, accessToken) {
    if (cnIsiOS() && typeof (window.JPush) !== 'undefined') {
      window.JPush.setAlias({
        sequence: 1,
        alias: alias,
      }, function (result) {//console.log(" -JPush-setAlias-success: ", result);
      }, function (error) {//console.log(" -JPush-setAlias-error: ", error);
      });
    } else if (typeof (window.CunovsAliasPlugin) === 'object') {
      window.CunovsAliasPlugin.setAlias({
        accessToken: accessToken,
        alias: alias,
      });
    }
  },


  cnDeleteAlias: function (alias, accessToken) {
    if (cnIsiOS() && typeof (window.JPush) !== 'undefined') {
      window.JPush.deleteAlias({
        sequence: 3,
      }, function (result) {//console.log(" -JPush-deleteAlias-success: ", result);
      }, function (error) {//console.log(" -JPush-deleteAlias-error: ", error);
      });
    } else if (typeof (window.CunovsAliasPlugin) === 'object') {
      window.CunovsAliasPlugin.deleteAlias({
        accessToken: accessToken,
        alias: alias,
      });
    }
  },
  cnClearBadge: function () {
    if (!cnIsDevice() || typeof (cordova) == 'undefined') {
      return;
    }
    try {
      if (cnIsiOS()) {
        window.JPush.setApplicationIconBadgeNumber(0);
        window.JPush.setBadge(0);
      } else if (cordova.plugins.notification.badge) {
        cordova.plugins.notification.badge.clear();
      }
    } catch (exception) {
    }
  },
  cnScreenChange: function (isFull) {
    console.log(' ------------- isFull : ' + isFull);
    if (cnIsDevice()) {
      if (isFull === true) {
        screen.orientation.lock('landscape');
        StatusBar.hide();
      } else {
        screen.orientation.lock('portrait');
        StatusBar.show();
      }
    }
  },
  cnOpen: function (url, target, params, callback) {
    target = target || '_blank';
    window.open(url, target);
  },
  checkConnection: function () {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = '未知网络';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = '正在用WIFI观看';
    states[Connection.CELL_2G] = '正在用2G网络观看';
    states[Connection.CELL_3G] = '正在用3G网络观看';
    states[Connection.CELL_4G] = '正在用4G网络观看';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = '无网络连接';
    return (states[networkState]);
  },
  cnHasPlugin: function (key) {
    if (cnIsDevice() && cnIsDefined(cordova) && cordova.plugins) {
      return !cnIsDefined(key) || cordova.plugins[key];
    }
    return false;
  },
  cnPrints: function (obj) {
    console.log(obj);
  },
  cnGetFileMiniType: function (name) {
    var index = -1;
    if (name && (index = name.lastIndexOf('.')) != -1) {
      return cnMiniType[name.substring(index)] || '';
    }
    return '';
  },
  cnOpener2File: function (filePath, miniType, onSuccess, onError) {
    onError = onError || cnPrints;
    var tag = 'fileOpener2';
    if (cnHasPlugin(tag)) {
      var errorMessage = '';
      miniType = miniType || cnGetFileMiniType(filePath);
      if (!filePath || !miniType) {
        errorMessage = (!filePath ? '文件路径' : '文件类型') + '必须提供。';
      }
      if (errorMessage === '') {
        onSuccess = onSuccess || cnPrints;
        cordova.plugins.fileOpener2.showOpenWithDialog(
          filePath,
          miniType,
          onSuccess,
          onError
        );
      } else {
        onError({ 'message': errorMessage });
      }
    } else {
      onError({ 'message': '没有找到插件[' + tag + ']' });
    }
  },
  cnGetLocalFile: function (fileName, options, onSuccess, onError) {
    onError = onError || cnPrints;
    if (!!fileName && cnHasPlugin() && requestFileSystem) {
      options = options || {};
      onSuccess = onSuccess || cnPrints;
      var size = options.size || 0;
      window.requestFileSystem(LocalFileSystem.PERSISTENT, size, function (fs) {
        fs.root.getFile(decodeURI(fileName), {
          create: options.create === true,
          exclusive: options.exclusive === true
        }, onSuccess, onError);
      }, onError);
    } else {
      onError({ 'message': !fileName ? '需要获取的文件名必须提供。' : '无法使用文件读取插件。' });
    }
  },
  cnDownloadFile: function (fileUrl, fileName, options, onSuccess, onError, onProgress) {
    onError = onError || cnPrints;
    onProgress = onProgress || function (e) {
      if (e.lengthComputable) {
        var progress = e.loaded / e.total;
        // 显示下载进度
        console.log((progress * 100).toFixed(2));
      }
    };
    if (cnHasPlugin() && FileTransfer && requestFileSystem) {
      var errorMessage = '';
      if (!fileUrl || !fileName) {
        errorMessage = (!fileUrl ? '下载文件路径' : '文件名称') + '必须提供。';
      }
      if (errorMessage === '') {
        onSuccess = onSuccess || cnPrints;
        options = options || { create: true };//默认创建文件
        cnGetLocalFile(decodeURI(fileName), options, function (fileEntry) {
          var fileTransfer = new FileTransfer(),
            fileUri = options.needEncode === true ? encodeURI(fileUrl) : fileUrl;
          fileTransfer.onprogress = onProgress;
          fileTransfer.download(
            fileUri,         //uri网络下载路径
            fileEntry.nativeURL,      //url本地存储路径
            function (entry) {
              if (localStorage && JSON) {
                entry.file(function (file) {
                  var value = JSON.parse(localStorage.getItem(cnDownloadFileTag) || '[]');
                  value.push({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    localURL: file.localURL,
                    lastModified: file.lastModified
                  });
                  localStorage.setItem(cnDownloadFileTag, JSON.stringify(value));
                });
              }
              onSuccess(entry);
            },
            onError
          );
        }, onError);
      } else {
        onError({ 'message': errorMessage });
      }
    } else {
      onError({ 'message': '无法使用文件下载插件。' });
    }
  },
  cnGetOrDownAndOpenFile: function (file, onSuccess, onError, onProgress) {
    file = file || {};
    onError = onError || cnPrints;
    var fileName = file.fileName || '',
      fileUrl = file.fileUrl || '',
      mimeType = file.mimeType || '';
    if (!fileName) {
      onError({ 'message': '获取本地文件，文件名不能为空。' });
      return;
    }
    var fileExistAndOpen = function (entry) {
      cnOpener2File(entry.toInternalURL(), mimeType, onSuccess, onError);
    };
    cnGetLocalFile(fileName, {}, fileExistAndOpen, function (error) {
      if (!fileUrl) {
        onError({ 'message': '本地文件不存在，获取网络文件，网络地址不能为空。' });
        return;
      }
      if (!error || !error.code || error.code !== 1) {
        onError({ 'message': '获取本地文件时发生未知错误。' });
        return;
      }
      cnDownloadFile(fileUrl, fileName, null, fileExistAndOpen, onError, onProgress);
    });

  },
  cnDoScan: function (onSuccess, onError) {
    onError = onError || cnPrints;
    var tag = 'barcodeScanner';
    if (cnHasPlugin(tag)) {
      onSuccess = onSuccess || function (result) {
        if (!result.cancelled) {
          alert('扫码获得的内容\n' +
            '返回结果: ' + result.text + '\n' +
            '格式化标准: ' + result.format + '\n' +
            '是否取消: ' + result.cancelled);
        }
      };
      cordova.plugins.barcodeScanner.scan(
        onSuccess,
        onError,
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: false, // iOS and Android
          showTorchButton: false, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          prompt: '请将二维码至于取景框内扫描', // Android
          resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
          orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS
        }
      );
    } else {
      onError({ 'message': '没有找到插件[' + tag + ']' });
    }
  }
};

window.cnApply = cunovs.cnIsDefined(Object.assign) ? Object.assign : function (target, source) {
  if (target && source && typeof source == 'object') {
    for (var att in source) {
      target[att] = source[att];
    }
    return target;
  }
  return target || {};
};
cnApply(window, cunovs);

if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str) {
    return this.indexOf(str) === 0;
  };
}

if (typeof Array.prototype.remove != 'function') {
  // see below for better implementation!
  Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
}

(function () {
  var onDeviceReady = function () {
      try {
        if (cnIsDefined(StatusBar) != 'undefined') {
          StatusBar.overlaysWebView(false);
          cnSetStatusBarStyle();
        }
        cnClearBadge();
        navigator.splashscreen.hide();
        if (cordova.InAppBrowser) {
          cnOpen = function (url, target, params, callback) {
            target = target || '_self';
            params = params || 'location=yes,hideurlbar=yes,toolbarcolor=#22609c,navigationbuttoncolor=#ffffff,closebuttoncolor=#ffffff';
            callback = callback || new Function();
            var ref = cordova.InAppBrowser.open(url, target, params, callback),
              spinner = '<!DOCTYPE html><html><head><meta name=\'viewport\' content=\'width=device-width,height=device-height,initial-scale=1\'><style>.loader {position: absolute;    margin-left: -2em;    left: 50%;    top: 50%;    margin-top: -2em;    border: 5px solid #f3f3f3;    border-radius: 50%;    border-top: 5px solid #3498db;    width: 50px;    height: 50px;    -webkit-animation: spin 1.5s linear infinite;    animation: spin 1.5s linear infinite;}@-webkit-keyframes spin {  0% { -webkit-transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); }}@keyframes spin {  0% { transform: rotate(0deg); }  100% { transform:rotate(360deg); }}</style></head><body><div class=\'loader\'></div></body></html>';
            ref.executeScript({ code: '(function() {document.write("' + spinner + '");window.location.href=\'' + url + '\';})()' });

          };
        }
      } catch (exception) {
      }
    },
    onResume = function () {
      cnClearBadge();
    },
    cunovsWebSocket = '',
    cunovsWebSocketUrl = '',
    cunovsWebSocketUserId = '',
    cnnovsWebSocketStatus = '';

  window.cnGetWebSocket = function (url, id) {
    if (cnIsDefined(url) && url) {
      if (cnIsDefined(id) && id) {
        if (cunovsWebSocket && cnnovsWebSocketStatus == 'open' && cunovsWebSocketUrl == url && cunovsWebSocketUserId == id) {
          return cunovsWebSocket;
        } else {
          cunovsWebSocketUrl = url;
          cunovsWebSocketUserId = id;
          cunovsWebSocket = new WebSocket(url + id + '/androidhome');
          cunovsWebSocket.onmessage = function (event) {
            cnWillCallBack(cnDecode(event.data));
          };
          cunovsWebSocket.onerror = function (event) {
            cnnovsWebSocketStatus = 'error';
            cunovsWebSocket = '';
          };
          cunovsWebSocket.onopen = function () {
            cnnovsWebSocketStatus = 'open';

          };
          cunovsWebSocket.onclose = function () {
            cnnovsWebSocketStatus = 'close';
            cunovsWebSocket = '';
          };
        }
      } else {
        cunovsWebSocket = '',
          cunovsWebSocketUrl = '',
          cunovsWebSocketUserId = '',
          cnnovsWebSocketStatus = '';
      }
    }
    return '';
  };
  var exitApp = function () {
      navigator.app.exitApp();
    },
    onExitApp = function () {
      if (typeof (navigator) != 'undefined' && typeof (navigator.app) != 'undefined') {
        var curHref = window.location.href;
        if (curHref.indexOf('/login') != -1) {
          navigator.app.exitApp();
        } else if (curHref.indexOf('/?_k') != -1) {
          cnShowToast('再按一次离开APP');
          document.removeEventListener('backbutton', onExitApp, false);
          document.addEventListener('backbutton', exitApp, false);
          var intervalID = window.setTimeout(function () {
            window.clearTimeout(intervalID);
            document.removeEventListener('backbutton', exitApp, false);
            document.addEventListener('backbutton', onExitApp, false);
          }, 2000);
        } else {
          navigator.app.backHistory();
        }
      }
    },
    screenChangeEvents = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'MSFullscreenChange'];
  for (var i = 0; i < screenChangeEvents.length; i++) {
    document.addEventListener(screenChangeEvents[i], function (e) {
      if (e.target && e.target.tagName === 'VIDEO' && cnIsDefined(document.webkitIsFullScreen)) {
        cnScreenChange(document.webkitIsFullScreen);
      }
    });
  }
  window.cnPrintWebSocket = function () {
    console.log(cunovsWebSocket);
  };
  document.addEventListener('deviceready', onDeviceReady, false);
  document.addEventListener('resume', onResume, false);
  document.addEventListener('backbutton', onExitApp, false);

  function resizeBaseFontSize () {
    var rootHtml = document.documentElement
      ,
      deviceWidth = rootHtml.clientWidth;
    if (deviceWidth > 1024) {
      deviceWidth = 1024;
    }
    cnhtmlSize = deviceWidth / 7.5;
    rootHtml.style.fontSize = cnhtmlSize + 'px';
  }

  resizeBaseFontSize();
  window.addEventListener('resize', resizeBaseFontSize, false);
  window.addEventListener('orientationchange', resizeBaseFontSize, false);
  window.addEventListener('message', function (event) {
    cnWillCallBack(event.data);
  });
})();
