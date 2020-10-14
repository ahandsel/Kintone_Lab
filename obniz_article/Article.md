# Title

Setup Obniz Board as a counter & store data in Kintone Web Database all in 10 minutes!

# Cover Photo / Video


### Introduction
---

#### What is [Obniz Board](https://Obniz.com/products/Obnizboard/)?

Obniz Board is an IoT Microprocessor that is easily programable with JavaScript!  
The code can be stored on the cloud & you have full device control with just one JavaScript library, making it an ideal IoT device for a hackathon.

2-min video on Obniz Board's functionality:  
* https://youtu.be/sFnDtFq3dJY

#### What is [Kintone](https://www.kintone.com/)?
Kintone is a cloud platform thatcreates Web Databases ridiculously quickly!
Databases are created with intuitive drag-and-drop GUI and since your data lives in the cloud, no need to worry about servers to maintain. Control everything on your browser or use REST API.

### Outline
---
* [Introduction](#introduction)
* [Get a Obniz Board](#get-a-obniz-board)
* [Connect Obniz Board to WiFi](#connect-obniz-board-to-wifi)
* [Configure the Script.js](#configure-the-scriptjs)
* [Get a FREE Kintone Developer License](#get-a-free-kintone-developer-license)
* [Create the Database](#create-the-database)
* [Conclusion](#conclusion)
  * [References for Obniz Board](#references-for-obniz-board)
  * [References for Kintone](#references-for-kintone)

### Get a Obniz Board
Obniz Board is on [Amazon](https://www.amazon.com/dp/B07DD6FK8G) for $49 (At the time of publishing).  
This tutorial assumes you are using the [original Obniz Board](https://www.amazon.com/dp/B07DD6FK8G), but you can use their [newer Obniz Board 1Y](https://www.amazon.com/dp/B082MDPRWZ) as well.

### Connect Obniz Board to WiFi

Now that you are a proud owner of Obniz Board, time to plug it in & connect it to WiFi.

Overview of the parts
![Image pointing to the 3 parts of Obniz Board. Micro USB: power can be turned on / off by connecting / disconnecting to the battery; Dial switch: cursor is moved when turn the dial witch. Click the dial switch to select it; 12x IOs with motor driver (up to 1A) & Analog Input](https://obniz.com/doc/reference/board-1y/quick-start/images/board_description.png?)

We will be using the **Dial Switch** as the input mechanism.

#### Step 1: Plug-in the Obniz Board to power via Micro USB cable
Turn on the Obniz Board by plugging in a Micro USB that is connected to a charger, battery, or PC.

#### Step 2: Connect to the Obniz Board's network from your PC
Obniz Board can act as a WiFi access point for configuring it from a browser.

The network name will be `obniz-XXXXXXXXXX`

#### Step 3: Open [http://192.168.0.1](http://192.168.0.1)

#### Step 4: Select the target WiFi network's SSID from the pull-down menu

#### Step 5: Enter the password in alphanumeric characters.

#### Step 6: Press "**Connect**" button to complete the process.

| Login Page | Success Page |
| ---------- | ------------ |
| ![](https://obniz.com/doc/reference/obnizos-for-esp32/settings/images/wifi_configure.png) | ![](https://obniz.com/doc/reference/obnizos-for-esp32/settings/images/wifi_configure_after.png) |

#### Success + obnizID
Once you have your Obniz Board successfully connected to the internet, a QR Code and the 8-digit **obnizID** will be displayed.

For details on the process, refer to [Obniz Document on Setting from Browser](https://obniz.com/doc/reference/obnizos-for-esp32/settings/setting-via-browser).

If an error is displayed or Obniz Board is not starting up, refer to [Obniz Troubleshooting Guide](https://obniz.com/quickstart/troubleshooting)


### Configure the Script.js

The code needed for this Obniz Board x Kintone integration is below.
Save the code as `Script.js` and replace the Xs in Line 5 with your obnizID.

``` javascript
(() => {
  'use strict';

  // Instantiate Obniz with Obniz ID & set callback function
  const obniz = new Obniz('XXXX-XXXX');
  kintone.events.on('app.record.index.show', event => {
    obniz.onconnect = async () => {
      let count = 0;

      // Gets the input from the built-in black switch
      // Switch's 4 states: "none", "push", "left", "right"
      obniz.switch.onchange = function (state) {
        obniz.display.clear();
        if (state === 'right') {
          count++;
        } else if (state === 'left') {
          count--;
        } else if (state === 'push') {
          // Kintone REST API Request
          // kintone.api(pathOrUrl, method, params, opt_callback, opt_errback)

          const pathOrUrl = kintone.api.url('/k/v1/record', true);

          const method = 'POST';

          const body = {
            'app': kintone.app.getId(),
            'record': {
              'Number': {
                'value': count
              }
            }
          };

          kintone.api(pathOrUrl, method, body,
            function (resp) {
              // Successful API Call
              console.log(resp);
            },
            function (error) {
              // Error
              console.log(error);
            });
        }

        // Display the current count on Obniz
        obniz.display.print(count);
      };
    };
  });
})();
```

**Credit**: The above code is in large part by written by [@RyBB](https://github.com/RyBB). Check out his Japanese articles at [Qitta @RyBB](https://qiita.com/RyBB).

### Get a FREE Kintone Developer License

##### ① Sign-Up for Developer Program Account (Website)
* [bit.ly/KDP_signup](https://bit.ly/KDP_signup)
* ⚠️ Do NOT use Safari
* ⚡ Accept Cookies First
* ✅ Use Chrome & Firefox

##### ② THEN Create a Kintone Subdomain (Database)
* [bit.ly/K_DevLic](https://bit.ly/K_DevLic)
* ⚠️ No Special Characters
* ⚡ Only use lowercase, numbers, & hyphens in the Subdomain

##### 📺️ Quick Video on the Sign-Up Process:  
* [youtu.be/Gzz8SbTuoFg](https://youtu.be/Gzz8SbTuoFg)

### Create the Database
Databases in Kintone are called "Apps".

1. Log in to your Kintone Subdomain
    * The URL to your Kintone is [`YOUR_SUBDOMAIN`.kintone.com]()
    * Ex/ `demo` subdomain is accessed at [demo.kintone.com](http://demo.kintone.com/)}
2. Find the "**Apps**" section on the left side of the Portal page
    * Click on the [ **+** ] button on the left side
    * ![](https://get.kintone.help/k/img-en/tutorial_img19.png)
3. Select the "**Create App from Scratch**" button from the Kintone Marketplace page
    * ![](https://get.kintone.help/k/img-en/tutorial_01.png)
4. Name the Database by clicking on & replacing `New App` with `Obniz Counter`
    * ![](https://get.kintone.help/k/img-en/tutorial_02.png)
5. Drag-&-Drop a **Number** field, click on the left gear ⚙️ icon & name it `Count`
6. Drag-&-Drop the **Created datetime** field
7. Click the green **Save Form** button
8. Click the **App Settings** tab, then click on the **JavaScript and CSS Customization** section
9.  Under the **Upload JavaScript for PC** section, click on the **Add Link** button & past-in `https://unpkg.com/obniz@2.0.3/obniz.js`
    * This is the CDN URL to the Obniz's JavaScript library
10. Still under the **Upload JavaScript for PC** section, click on the **Add File** and upload the `Script.js` file from the [Configure the Script.js](#configure-the-scriptjs) section
11. Click the blue **Save** button at the top
12. Finally, click on the blue **Activate App** button

Your Kintone Database is now already!  
You can access it from the **Portal** Page under the **Apps** section.

# Conclusion

This tutorial went through how you get started with Obniz Board and connect it to a Kintone Database!

If you have any questions or problems with **Kintone**, post a comment & I will help you out!

If you have any questions or problems with **Obniz Board**, tweet at them at [@obniz_io](https://twitter.com/obniz_io) or make a post in their [forum](https://forum.obniz.com/).

# References for Obniz Board
- [Obniz Board Specs](https://Obniz.com/products/Obnizboard/)
- [Interesting Projects Using Obniz](https://blog.Obniz.com/en/example/)
- [2-min Video on Obniz Board's Functionality](https://youtu.be/sFnDtFq3dJY)
- [Obniz Board Quick Start](https://obniz.com/doc/reference/board-1y/quick-start/)

# References for Kintone
- [Kintone Developer Docs & Tutorials](http://developer.kintone.io/)
- [Add Record POST REST API](https://developer.kintone.io/hc/en-us/articles/212494628)
- [Creating an Kintone App from Scratch](https://get.kintone.help/k/en/user/create_app/tutorial.html)