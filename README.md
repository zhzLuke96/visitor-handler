# visitor-handler
🔬browser know that.

# WHAT THAT

# Use

```js
visitor.then(handle => {
    console.log(handle)
    // what you want to do
});

visitor.social(social=>{
    console.log(social)
    // what you want to do
})
```

```js
// ==== 
// ==== visit object ====
// ==== 
{
    "now": 1565566649877,
    "javascriptStart": 450.16,
    "referrer": "",
    "network": {
        "type": "3g",
        "downlink": 0.95,
        "rtt": 600,
        "saveData": false
    },
    "GPUinfo": {
        "renderer": "ANGLE (NVIDIA GeForce GTX 980M Direct3D11 vs_5_0 ps_5_0)",
        "vendor": "Google Inc.",
        "RENDERER": "WebKit WebGL",
        "VENDOR": "WebKit"
    },
    "CPU": {
        "cores": 8
    },
    "battery": {
        "charging": true,
        "level": 1,
        "chargingTime": 0,
        "dischargingTime": 0
    },
    "AdBlockEnabled": true,
    "ScreenInfo": {
        "colorDepth": 24,
        "width": 1920,
        "height": 1080,
        "nonclientWidth": 0,
        "nonclientHeight": 40,
        "isLandscape": true
    },
    "BrowserInfo": {
        "cookieEnabled": true,
        "platform": "Win32",
        "system": "Windows NT 10.0; Win64; x64",
        "engine": "AppleWebKit/537.36",
        "Version support": {
            "Mozilla": "5.0",
            "AppleWebKit": "537.36",
            "Chrome": "75.0.3770.100",
            "Safari": "537.36"
        },
        "language": "zh-cn",
        "vendor": "Google Inc.",
        "is": {
            "engine": {
                "WebKit": true,
                // ...
            },
            "browser": {
                "Safari": true,
                "Chrome": true,
                // ...
            },
            "os": {
                "Windows": true,
                // ...
            },
            "device": {
                // ...
            }
        }
    },
    "PerformanceTiming": {
        "loadPage": 551,
        "domParse": 525,
        "domReady": 525,
        "redirect": 0,
        "lookupDomain": 0,
        "ttfb": 15,
        "request": 12,
        "loadEvent": 5,
        "appCache": 4,
        "unloadEvent": 0,
        "whiteScreen": 41,
        "connect": 1
    }
}
// ==== 
// ==== social object ====
// ==== 
{
    "Flickr": true,
    "Facebook": false,
    "Twitter": false,
    "Instagram": false,
    "Skype": false,
    "Spotify": false,
    "Google": true,
    "Tumblr": false,
    "Bilibili": false,
    "Stack Overflow": false,
    "Reddit": false,
    "Steam": false,
    "Pinterest": false,
    "Netflix": false
}
```

# Performance Timing
...
# Browser
...
# AdBlock
...
# Device (CPU / GPU)
...
# Environment (battery / network / screen)
...
# Social checker
...

# LICENSE
GPL-3.0