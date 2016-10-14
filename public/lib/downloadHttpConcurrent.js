(function() {
  'use strict';
  /**
   * Latency testing based on httpRequests
   **/
  function downloadHttpConcurrent(url, type, concurrentRuns, timeout, testLength,callbackComplete, callbackProgress,callbackAbort,
  callbackTimeout,callbackError) {
    this.url = url;
    this.type = type;
    this.concurrentRuns = concurrentRuns;
    this.timeout = timeout;
    this.testLength = testLength;
    this._test = null;
    this._testIndex = 0;
    this._results = [];
    this._activeTests = [];
    this._resultsHolder = {};
    this.clientCallbackComplete = callbackComplete;
    this.clientCallbackProgress = callbackProgress;
    this.clientCallbackAbort = callbackAbort;
    this.clientCallbackTimeout = callbackTimeout;
    this.clientCallbackError = callbackError;
    this._beginTime = Date.now();
    this._running = true;
};

  /**
   * Monitor testSeries.. finish testSeries by testTime... increase size or check for timeouts
   */
  /*
  downloadHttpConcurrent.prototype._monitor = function () {
    //stop testSeries
  //  if (((Date.now() - this._beginTime)) > this.testLength) {

    if(this._testIndex > 20 && this.running){
      this.running = false;
      for(var i=0;this._activeTests.length-1;i++){
        this._activeTests[i].xhr.close();
      }
      clearInterval(this.interval);
      //this.cancel();
      //this.trigger('complete', this._results);
    }
  };
  */
    /**
    * onError method
    * @return abort object
    */
    downloadHttpConcurrent.prototype.onTestError = function(result){
      this.clientCallbackError(result);
    };
    /**
    * onAbort method
    * @return abort object
    */
    downloadHttpConcurrent.prototype.onTestAbort = function(result){
      this.clientCallbackAbort(result);
    };
    /**
    * onTimeout method
    * @return abort object
    */
    downloadHttpConcurrent.prototype.onTestTimeout = function(result){
      this.clientCallbackTimeout(result);
    };
    /**
    * onComplete method
    * @return array of latencies
    */
    downloadHttpConcurrent.prototype.onTestComplete = function(result){
      if(!this._running){
        return;
      }
     this._results.push(result);
     this['arrayResults'+reuslt.id] 
     this.clientCallbackProgress(result);
     this._activeTests.pop(result.id,1);
     //console.log('Time: ' + (Date.now() - this._beginTime) + '  ' + this.testLength);
     if((Date.now() - this._beginTime)< this.testLength){
     //if(this._testIndex <= 21){
       if(this._activeTests.length ===0 && this._running){
         this.start();
      }
     }
     else{
        this._running = false;
       this.clientCallbackComplete(this._results);
       for(var i=0;i>this._activeTests.length-1;i++){
         if (typeof(this._activeTests[i])!== 'undefined') {
         this._activeTests[i].xhr._request.abort();
        }
       }
     }
    };

    /**
    * onProgress method
    * @return single latency result
    */
    downloadHttpConcurrent.prototype.onTestProgress = function(result){
     this.clientCallbackProgress(result);
    };
    /**
    * Start the test
    */
      downloadHttpConcurrent.prototype.start = function() {
        if(!this._running){
          return;
        }
        if (this.type === 'GET') {
          for (var g = 1; g <= this.concurrentRuns; g++) {
            this._testIndex++;
            this['arrayResults'+this._testIndex] = [];
            var request = new window.xmlHttpRequest('GET',this.url,this.timeout, this.onTestComplete.bind(this), this.onTestProgress.bind(this),
            this.onTestAbort.bind(this),this.onTestTimeout.bind(this),this.onTestError.bind(this));
            this._activeTests.push({
              xhr: request,
              testRun: this._testIndex
            });
            request.start(0,this._testIndex);

          }
        }
        else {
          for (var p = 1; p <= this.concurrentRuns; p++) {
            this._testIndex++;
            this._activeTests.push(this._testIndex);
            this['testResults'+this._testIndex] = [];
            this.test.start(this.size, this._testIndex);
          }
        }
          /*
            var self = this;
            this.interval = setInterval(function () {
              self._monitor();
            }, 100);
            */
      }

  window.downloadHttpConcurrent = downloadHttpConcurrent;
  })();
