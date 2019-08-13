(function () {

    /**
     * window onload callback
     * 并可动态添加行为，且最后的异步接口也基于此
     */
    let visit_callback_called = false;
    let visit_callback = () => visit_callback_called = true;
    const append_visit_callback = fn => visit_callback = (old => () => {
        old();
        fn();
    })(visit_callback)

    // auto running
    // window.addEventListener("load", () => visit_callback())

    let window_onload = false;
    window.addEventListener("load", () => window_onload=true);

    // preformance object
    const performance = window.performance || window.mozPerformance || window.msPerformance || window
            .webkitPerformance;

    function getGPUinfo() {
        try {
            let canvas = document.createElement('canvas'),
                gl = canvas.getContext('experimental-webgl'),
                debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            return {
                renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
                vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                RENDERER: gl.getParameter(gl.RENDERER),
                VENDOR: gl.getParameter(gl.VENDOR),
            }
        } catch (error) {
            return
        }
    }

    const visitor = {
        javascriptStart: performance.now(),
        referrer: document.referrer,
        network: {
            type: (navigator && navigator.connection && navigator.connection.effectiveType),
            downlink: (navigator && navigator.connection && navigator.connection.downlink),
            rtt: (navigator && navigator.connection && navigator.connection.rtt),
            saveData: (navigator && navigator.connection && navigator.connection.saveData),
        },
        GPUinfo: getGPUinfo(),
        CPU: {
            cores: navigator.hardwareConcurrency,
        },
        battery: {}
    }

    append_visit_callback(() => navigator.getBattery && navigator.getBattery().then(b => {
        visitor.battery = {
            charging: b.charging,
            level: b.level,
            chargingTime: b.chargingTime,
            dischargingTime: b.dischargingTime
        }
    }));

    // function testCPU(){
    //     var _speedconstant = 8.9997e-9; //if speed=(c*a)/t, then constant=(s*t)/a and time=(a*c)/s
    //     var d = performance.now();
    //     var amount = 150000000;
    //     var estprocessor = 1.7; //average processor speed, in GHZ
    //     var temp = 0;
    //     for (var i = amount; i > 0; i--) {temp+=.1+temp}
    //     var newd = performance.now();
    //     var di = newd - d;
    //     var spd = ((_speedconstant * amount) / di);
    //     // console.log("Time: " + Math.round(di) / 1000 + "s, estimated speed: " + (spd * 1000).toFixed(2) + "GHZ");
    //     // console.log((spd * 1000).toFixed(2)/2)
    //     return (spd * 1000).toFixed(2)
    // }

    // append_visit_callback(() => visitor.CPU["freq"] = testCPU() + " GHZ");

    const ScreenInfo = {
        colorDepth: window.screen.colorDepth,
        deviceDPI: window.screen.deviceXDPI,
        width: window.screen.width,
        height: window.screen.height,
        nonclientWidth: window.screen.width - screen.availWidth,
        nonclientHeight: window.screen.height - screen.availHeight,
        isLandscape: window.matchMedia("(orientation: portrait)").matches,
    }

    /**
     * browser info object
     * 版本信息以及语言
     */
    const ua = navigator.userAgent;
    const ua_clip = ua.match(/(\w+)\/([\w.]+)|\((\w.+?)\)/gm);

    function getBrowserSupport() {
        let res = {}
        for (const item of ua_clip) {
            if (item[0] != "(") {
                let kv = item.split("/")
                if (kv.length == 2) {
                    res[kv[0]] = kv[1]
                }
            }
        }
        return res
    }
    const BrowserInfo = {
        // app: navigator.appVersion,
        cookieEnabled: navigator.cookieEnabled,
        platform: navigator.platform,
        system: ua_clip[1].slice(1, -1),
        engine: ua_clip[2],
        "Version support": getBrowserSupport(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),
        vendor: window.navigator.vendor,
        is: {
            engine: {
                // 内核

                // ie
                'Trident': ua.indexOf('Trident') > -1 || ua.indexOf('NET CLR') > -1,
                // opera
                'Presto': ua.indexOf('Presto') > -1,
                // chrome-like
                'WebKit': ua.indexOf('AppleWebKit') > -1,
                // firefox
                'Gecko': ua.indexOf('Gecko/') > -1,
            },
            browser: {
                // 浏览器
                'Safari': ua.indexOf('Safari') > -1,
                'Chrome': ua.indexOf('Chrome') > -1 || ua.indexOf('CriOS') > -1,
                'IE': ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1,
                'Edge': ua.indexOf('Edge') > -1,
                'Firefox': ua.indexOf('Firefox') > -1 || ua.indexOf('FxiOS') > -1,
                'Firefox Focus': ua.indexOf('Focus') > -1,
                'Chromium': ua.indexOf('Chromium') > -1,
                'Opera': ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1,
                'Vivaldi': ua.indexOf('Vivaldi') > -1,
                'Yandex': ua.indexOf('YaBrowser') > -1,
                'Arora': ua.indexOf('Arora') > -1,
                'Lunascape': ua.indexOf('Lunascape') > -1,
                'QupZilla': ua.indexOf('QupZilla') > -1,
                'Coc Coc': ua.indexOf('coc_coc_browser') > -1,
                'Kindle': ua.indexOf('Kindle') > -1 || ua.indexOf('Silk/') > -1,
                'Iceweasel': ua.indexOf('Iceweasel') > -1,
                'Konqueror': ua.indexOf('Konqueror') > -1,
                'Iceape': ua.indexOf('Iceape') > -1,
                'SeaMonkey': ua.indexOf('SeaMonkey') > -1,
                'Epiphany': ua.indexOf('Epiphany') > -1,
                '360': ua.indexOf('QihooBrowser') > -1 || ua.indexOf('QHBrowser') > -1,
                '360EE': ua.indexOf('360EE') > -1,
                '360SE': ua.indexOf('360SE') > -1,
                'UC': ua.indexOf('UC') > -1 || ua.indexOf(' UBrowser') > -1,
                'QQBrowser': ua.indexOf('QQBrowser') > -1,
                'QQ': ua.indexOf('QQ/') > -1,
                'Baidu': ua.indexOf('Baidu') > -1 || ua.indexOf('BIDUBrowser') > -1,
                'Maxthon': ua.indexOf('Maxthon') > -1,
                'Sogou': ua.indexOf('MetaSr') > -1 || ua.indexOf('Sogou') > -1,
                'LBBROWSER': ua.indexOf('LBBROWSER') > -1,
                '2345Explorer': ua.indexOf('2345Explorer') > -1,
                'TheWorld': ua.indexOf('TheWorld') > -1,
                'XiaoMi': ua.indexOf('MiuiBrowser') > -1,
                'Quark': ua.indexOf('Quark') > -1,
                'Qiyu': ua.indexOf('Qiyu') > -1,
                'Wechat': ua.indexOf('MicroMessenger') > -1,
                'Taobao': ua.indexOf('AliApp(TB') > -1,
                'Alipay': ua.indexOf('AliApp(AP') > -1,
                'Weibo': ua.indexOf('Weibo') > -1,
                'Douban': ua.indexOf('com.douban.frodo') > -1,
                'Suning': ua.indexOf('SNEBUY-APP') > -1,
                'iQiYi': ua.indexOf('IqiyiApp') > -1,
            },
            os: {
                // 系统或平台
                'Windows': ua.indexOf('Windows') > -1,
                'Linux': ua.indexOf('Linux') > -1 || ua.indexOf('X11') > -1,
                'Mac OS': ua.indexOf('Macintosh') > -1,
                'Android': ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1,
                'Ubuntu': ua.indexOf('Ubuntu') > -1,
                'FreeBSD': ua.indexOf('FreeBSD') > -1,
                'Debian': ua.indexOf('Debian') > -1,
                'Windows Phone': ua.indexOf('IEMobile') > -1 || ua.indexOf('Windows Phone') > -1,
                'BlackBerry': ua.indexOf('BlackBerry') > -1 || ua.indexOf('RIM') > -1,
                'MeeGo': ua.indexOf('MeeGo') > -1,
                'Symbian': ua.indexOf('Symbian') > -1,
                'iOS': ua.indexOf('like Mac OS X') > -1,
                'Chrome OS': ua.indexOf('CrOS') > -1,
                'WebOS': ua.indexOf('hpwOS') > -1,
                'SymbianOS': ua.indexOf('SymbianOS') > -1,
            },
            device: {
                // 设备
                'Mobile': ua.indexOf('Mobi') > -1 || ua.indexOf('iPh') > -1 || ua.indexOf('480') > -1,
                'Tablet': ua.indexOf('Tablet') > -1 || ua.indexOf('Nexus 7') > -1,
                'iPad': ua.indexOf('iPad') > -1,
                'iPod': ua.indexOf('iPod') > -1,
                'iPhone': ua.indexOf('iPhone') > -1,
            }
        },
    }

    /** 
     * AdBlock checker
     * test Injected Stylesheet
     */
    append_visit_callback(() => visitor.AdBlockEnabled = testInjectedStylesheet())

    function isVisible (ele) {
        var style = window.getComputedStyle(ele);
        return  style.width !== 0 &&
                style.height !== 0 &&
                style.opacity !== 0 &&
                style.display!=='none' &&
                style.visibility!== 'hidden';
    }

    function testInjectedStylesheet() {
        const $body = document.querySelector("body")
        let ad = document.createElement("div")
        ad.innerHTML = "*****"
        ad.id = "adbox"
        ad.classList.add("ad-root")
        ad.classList.add("google-ad")
        ad.style.height = "100px"
        ad.style.display = "100px"
        $body.appendChild(ad)
        let ret = !isVisible(document.querySelector("#adbox"))
        $body.removeChild(ad)
        delete ad
        return ret
    }

    /**
     * performance API
     * 访问延迟
     */
    let PerformanceTiming = {}

    append_visit_callback(() => setTimeout(() => PerformanceTiming = getPerformanceTiming(), 0))

    function getPerformanceTiming() {
        if (!performance) {
            // 当前浏览器不支持
            console.log('cont support performance API');
            return {};
        }
        let t = performance.timing;
        let times = {};

        // # 页面加载完成的时间
        //   >这几乎代表了用户等待页面可用的时间
        times.loadPage = t.loadEventEnd - t.navigationStart;

        // # 解析 DOM 树结构的时间
        //   >正相关于dom树的复杂度
        times.domParse = t.domComplete - t.responseEnd;

        // # DomReady 时间
        //   >也就是从加载开始到jq中domready开始的时间
        times.domReady = t.domComplete - t.responseEnd;

        // # 重定向的时间
        //   >减少非必须重定向。如，http://example.com/ >> http://example.com
        times.redirect = t.redirectEnd - t.redirectStart;

        // # DNS 查询时间
        //   >DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
        // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)           
        times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;

        // # 读取页面第一个字节的时间
        //   >这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
        // TTFB 即 Time To First Byte 的意思
        // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
        times.ttfb = t.responseStart - t.navigationStart;

        // # 内容加载完成的时间
        //   >页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
        times.request = t.responseEnd - t.requestStart;

        // # 执行 onload 回调函数的时间
        //   >是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
        times.loadEvent = t.loadEventEnd - t.loadEventStart;

        // DNS 缓存时间
        times.appCache = t.domainLookupStart - t.fetchStart;

        // 卸载页面的时间
        times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;

        // 白屏时间
        // 从获取网页到显示第一个元素的时间
        times.whiteScreen = t.domLoading - t.fetchStart;

        // TCP 建立连接完成握手的时间
        times.connect = t.connectEnd - t.connectStart;

        return times;
    }

    /**
     * performance.getEntries()
     * 发起的所有请求的记录数据
     */
    let PerformanceEntries = {}
    append_visit_callback(() => setTimeout(() => PerformanceEntries = Array.from(performance.getEntries()), 0))


    const rebuild = o => JSON.parse(JSON.stringify(o))

    function objNumFixed(obj) {
        for (const key in obj) {
            const item = obj[key];
            // if (!item && typeof(item)=="boolean"){
            //     delete obj[key]
            // }
            if (!item && typeof (item) == "undefined") {
                obj[key] = "unknow"
            }
            if (item && item.toFixed && typeof (item.toFixed) == "function") {
                if ((item + "").indexOf(".") == -1) continue
                let num = (item.toFixed(2) + "").split(".")
                let tail = num[1].replace(/0+$/, "")
                obj[key] = Number(num[0] + (tail.length != 0 ? "." + tail : ""))
            }
            if (typeof (item) == "object")
                obj[key] = objNumFixed(rebuild(item))
        }
        return obj
    }

    const now = Date.now()

    /**
     * social checker
     */
    const socials = [{
        url: "https://www.instagram.com/accounts/login/?next=%2Ffavicon.ico",
        name: "Instagram"
    }, {
        url: "https://twitter.com/login?redirect_after_login=%2Ffavicon.ico",
        name: "Twitter"
    }, {
        url: "https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Ffavicon.ico%3F_rdr%3Dp",
        name: "Facebook"
    }, {
        url: "https://accounts.google.com/ServiceLogin?passive=true&continue=https%3A%2F%2Fwww.google.com%2Ffavicon.ico&uilel=3&hl=de&service=youtube",
        name: "Google"
    }, {
        url: "https://login.skype.com/login?message=signin_continue&redirect_uri=https%3A%2F%2Fsecure.skype.com%2Ffavicon.ico",
        name: "Skype"
    }, {
        url: "https://www.flickr.com/signin/yahoo/?redir=https%3A%2F%2Fwww.flickr.com/favicon.ico",
        name: "Flickr"
    }, {
        url: "https://www.spotify.com/de/login/?forward_url=https%3A%2F%2Fwww.spotify.com%2Ffavicon.ico",
        name: "Spotify"
    }, {
        url: "https://www.reddit.com/login?dest=https%3A%2F%2Fwww.reddit.com%2Ffavicon.ico",
        name: "Reddit"
    }, {
        url: "https://www.tumblr.com/login?redirect_to=%2Ffavicon.ico",
        name: "Tumblr"
    }, {
        url: "https://www.pinterest.com/login/?next=https%3A%2F%2Fwww.pinterest.com%2Ffavicon.ico",
        name: "Pinterest"
    }, {
        url: "https://www.netflix.com/Login?nextpage=%2Ffavicon.ico",
        name: "Netflix"
    }, {
        url: "https://store.steampowered.com/login/?redir=favicon.ico",
        name: "Steam"
    }, {
        url: "https://stackoverflow.com/users/login?ssrc=head&returnurl=http%3a%2f%2fstackoverflow.com%2ffavicon.ico",
        name: "Stack Overflow"
    }, {
        // cant work
        url: "https://passport.bilibili.com/login?gourl=https%3a%2F%2Fpassport.bilibili.com%2Ffavicon.ico",
        name: "Bilibili"
    }];

    const social_state = {};
    let social_callback = () => {};
    const LEN = o => Object.keys(o).length
    const check_callback = () => LEN(social_state) == socials.length ? social_callback(social_state) : void(0);

    function social_test(){
        socials.forEach(social => {
            setTimeout(()=>{
                var img = document.createElement('img');
                img.src = social.url;
                img.onload = () => {
                    social_state[social.name] = true;
                    // console.log(social.name, 'logged in');
                    check_callback();
                }
                img.onerror = () => {
                    social_state[social.name] = false;
                    // console.log(social.name, 'not logged');
                    check_callback();
                }
            },1000)
        });
    }

    /**
     * util tool
     */
    function search(obj, name) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const item = obj[key];
                if (key.toLowerCase() == name.toLowerCase()) {
                    return item
                }
            }
        }
        return null
    }

    /**
     * callback interface
     */
    window.visitor = {
        then(fn) {
            append_visit_callback(() => setTimeout(() => fn && fn(objNumFixed({
                now,
                ...visitor,
                ScreenInfo,
                BrowserInfo,
                PerformanceTiming,
                // PerformanceEntries,
            })), 2))

            if(window_onload){
                visit_callback()
            }else{
                window.addEventListener("load", () => visit_callback());
            }
        },
        social(fn) {
            social_callback = fn;
            if(window_onload){
                social_test()
            }else{
                window.addEventListener("load", () => social_test());
            }
        },
        is(name) {
            if (!name) return
            if (!visit_callback_called) visit_callback();
            name = name.toLowerCase()

            const isMobile = () => BrowserInfo.is.device["Mobile"]
                                || BrowserInfo.is.device["iPad"]
                                || BrowserInfo.is.device["iPod"]
                                || BrowserInfo.is.device["Tablet"]
                                || BrowserInfo.is.device["iPhone"]
                                || BrowserInfo.is.os["Android"]
                                || BrowserInfo.is.os["Windows Phone"]
                                || BrowserInfo.is.os["iOS"]
                                || BrowserInfo.is.os["Symbian"]
                                || BrowserInfo.is.os["SymbianOS"]

            switch (name) {
                case "pc":
                    return !isMobile();
                case "mobile":
                    return isMobile();
                case "win":
                case "windows":
                    return BrowserInfo.is.os.Windows;
                default:
                    return search(BrowserInfo.is) || search(BrowserInfo.os) || search(BrowserInfo.device)
            }
        }
    }
})()