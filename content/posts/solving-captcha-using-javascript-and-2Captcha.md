---
title: Bypassing Captcha using 2Captcha and Javascript
description: How to bypass Captcha using 2Captcha services and Javascript.
date: 2021-10-25
hashtags: ["captcha", "2captcha", "javascript"]
categories: "captcha, 2captcha, javascript"
---

### What are Captchas?

Anyone who has used the internet must be aware of CAPTCHA.
It's an online service to know that a human is interacting
or browsing the internet,
and not a robot or automated software.

CAPTCHA stands for Completely Automated Public Turing test to
tell Computers and Humans Apart.

Without CAPTCHAs,
it would be difficult to determine the difference
between an automatic action performed by a bot,
and a manual action performed by a human.

One of the most popular CAPTCHAs we see requires
the user to enter the letters as shown below in the image.

![Container](./../captcha.png)

But,
in recent years CAPTCHAs have evolved in various ways
like identifying picture recognition,
mini-games,
checkbox selection, and many more.

With new ways, CAPTCHAs have become one of the most
frustrating and ineffective user interface features.
Let's explore 2Captcha that aims to solve this problem.

### What is 2Captcha?

[2Captcha](https://2captcha.com/)
is a human-powered image and CAPTCHA recognition service.
The service aims is to help users solve CAPTCHAs
quickly and accurately.

2Captcha also pays you to solve captcha problems.
The captchas usually contain distorted text within an image.
A user is expected to type the answer to gain access to
the website and get verified that they are not Robots.

2Captcha solves a variety of captchas.
For integrating 2Captcha into our system,
we can refer their API endpoints
[here](https://2captcha.com/2captcha-api).
Different types of captchas like hCaptcha, reCaptcha,
image captcha, normal captcha, text captcha can be resolved using
2Captcha services.
We can refer to the full list of supported captchas
[here](https://2captcha.com/2captcha-api#solving_captchas).

### Integrate 2Captcha

#### Account Setup

- If you are already registered on 2Captcha,
we can skip this step.
If not we need to first register on 2Captcha using this
[link](https://2captcha.com/auth/register).

- Once registered,
we will get our API key which will be used during the integration process.
To use the services of 2Captcha,
we need to pay a token amount for captcha requests and processing.

#### Resolve Captcha using 2Captcha and Javascript

We will set up a new project for this integration.
Open the IDE of your choice and create a new application
`solve-captcha`.

1. **On Mac, we can execute the below command in the terminal.**

```
mkdir solve-captcha

cd solve-captcha

npm init -y
```

In the last step, we have initialized the project using `npm`,
which adds `package.json` directly.

2. **Create index.js file**

We then add a new file, `index.js` to the root directory of the
project.
On the terminal, we can execute

```
touch index.js
```

3. **Install 2Captcha and Axios**

We can find the Javascript package for 2Captcha
[here](https://www.npmjs.com/package/2captcha).
[Axios](https://www.npmjs.com/package/axios)
is a Promise-based HTTP client for the browser and node.js.

We can execute the below command to add these two packages to our
application.

```
npm i 2captcha axios
```

4. **geeksforgeeks.org reCAPTCHA**

Few websites use captcha when new users sign-up on
their platform.
We will use
[geeksforgeeks](https://www.geeksforgeeks.org/)
in our integration example.

This is how the sign-up modal of geekforgeeks appears.

![Container](./../geeksforgeeks.png)

As seen above,
geeksforgeeks is using Google's reCAPTCHA for identifying genuine users.
Google reCAPTCHA integration is done using sitekey.
We can find geeksforgeeks sitekey as mentioned in
[2Captcha's API documentation](https://2captcha.com/2captcha-api#solving_recaptchav2_new).

In short, we search for **www.google.com/recaptcha/api2/anchor**
or find
**data-sitekey**
parameter.
We copy the value of the **k** parameter of the link or
copy the value of the **data-sitekey** parameter.
sitekey of geeksforgeeks is **6LexF0sUAAAAADiQjz9BMiSrqplrItl-tWYDSfWa**.

5. **Javascript and 2Captcha**

We start adding changes to the index.js file.

```javascript
const axios = require("axios");
const captcha = require("2captcha");
var FormData = require("form-data");
```

a. We first require the necessary packages for integration.

- axios is used for HTTP requests.
- 2captcha is used for solving captcha.
- FormData is used to submit the sign-up data.

b. Initialize 2Captcha solver using 2Captcha API KEY

```javascript
const solver = new captcha.Solver("<Our API key>");
```

c. Solve Google's reCAPTCHA using the 2Captcha solver method.

The 2captcha package exposes a method **recaptcha** to resolve
reCAPTCHA. It expects **sitekey** and **pageurl** as parameters.

```javascript
const { data } = await solver.recaptcha(
  "6LexF0sUAAAAADiQjz9BMiSrqplrItl-tWYDSfWa",
  "https://www.geeksforgeeks.org/"
);
```

d. Submit form data.

Once we get the **recaptcha** method response,
we create form data to pass the necessary data
to geeksforgeeks auth endpoint.

```javascript
var bodyFormData = new FormData();
bodyFormData.append("reqType", "Register");
bodyFormData.append("email", "12sam1234@sam.co");
bodyFormData.append("pass", "sam1234!@#$");
bodyFormData.append("institute", "big data");
bodyFormData.append("g-recaptcha-response", data);
bodyFormData.append("to", "https://auth.geeksforgeeks.org/?to=https://www.geeksforgeeks.org/");
```

We use Axios to submit the above-generated form data.

```javascript
axios({
  method: "post",
  url: "https://auth.geeksforgeeks.org/auth.php",
  data: bodyFormData,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json, text/javascript, */*; q=0.01"
  },
})
.then(function (response) {
  console.log("In success");
  console.log(response.data);
})
.catch(function (response) {
  console.log("In failure");
  console.log(response);
});
```

The whole index.js file will look as below:

```javascript
const axios = require("axios");
const captcha = require("2captcha");
var FormData = require('form-data');

const solver = new captcha.Solver("<My API key>");

const bypassWebsiteCaptcha = async () => {
  console.log("Initiate captcha process");

  try {
    const { data } = await solver.recaptcha(
      "6LexF0sUAAAAADiQjz9BMiSrqplrItl-tWYDSfWa",
      "https://www.geeksforgeeks.org/"
    );

    var bodyFormData = new FormData();
    bodyFormData.append("reqType", "Register");
    bodyFormData.append("email", "12sam1234@sam.co");
    bodyFormData.append("pass", "sam1234!@#$");
    bodyFormData.append("institute", "big data");
    bodyFormData.append("g-recaptcha-response", data);
    bodyFormData.append("to", "https://auth.geeksforgeeks.org/?to=https://www.geeksforgeeks.org/");

    axios({
      method: "post",
      url: "https://auth.geeksforgeeks.org/auth.php",
      data: bodyFormData,
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json, text/javascript, */*; q=0.01" },
    })
    .then(function (response) {
      console.log("In success");
      console.log(response.data);
    })
    .catch(function (response) {
      console.log("In failure");
      console.log(response);
    });
  } catch (err) {
    console.log("In catch");
    console.log(err);
  }
};

bypassWebsiteCaptcha();
```

**NOTE**

We have added step 5.c and 5.d inside a **try..catch** block.

e. **Execute index.js**

Run the below command and verify the response

```terminal
node index
```

Our response should look like below:

```terminal
Alkeshs-MacBook-Pro:solve-captcha alkeshghorpade$ node index
Initiate captcha process
In success
{"extra":"<div class=\"alert alert-info\">An email has been sent to your given address. Please click the link in the mail to continue.<\/div>","code":2000}
```

This means we have successfully bypassed the captcha.
We can refer to the full-code repository
[here](https://github.com/alkesh26/solve-captcha).

**NOTE**

Many websites like geekforgeeks are using captchas.
This blog is solely for educational purposes.
Please don't use the above steps for anything
malicious.
