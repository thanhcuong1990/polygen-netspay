Polygen-netspay
==================

[![NPM version](https://badge.fury.io/js/web3.svg)](https://npmjs.org/package/web3)  

About this project
--------------------
We can now use cashless payment in hawker centers (food stall merchants) using QR solutions like Nets Pay, OCBC Pay Anyone, UOB mighty, DBS Paylah or Grab Pay. However, the adoption rate is not very high due to its User Experience. Polygen-Netspay aims to enhance the user experience of the payment journey in hawker center. This project is built on top of the NETS Pay application.

Web Configuration
----------------
NodeJS dependencies:
 - Node version: v8.9.4 [download](https://nodejs.org/en/download/)
 - Node package manager: 5.7.1 [download](https://www.npmjs.com/get-npm)

Installing dependencies
this command will install express, nodemailer, querystring and request package with the version indicated in the package.json
```bash
> npm install 
```
To run the web page on your localhost environment. You can run `npm start` on your bash terminal. `npm start` is automatically run if you publish it using the azure web service.  

Features and Explanation
----------------
1. Image Recognition
2. Transaction prediction
3. Keyboard hotkeys

In this prototype, we use Microsft Azure Custom Vision to simulate the image recognition. For real implementation, custom vision will not be a suitable API to use since it is Machine Learning based. Custom Vision is great for prediction but for this use case, pattern matching using SURF/BRIEF is more suitable since it is cheaper and the merchant stalls are not going to change much.  

Video on how the application look can be found on the following [directory](https://github.com/charlieangriawan/polygen-netspay/tree/master/video/demo.mp4)

helloworld