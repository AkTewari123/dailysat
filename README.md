<!-- markdownlint-disable first-line-h1 -->
<!-- markdownlint-disable html -->
<!-- markdownlint-disable no-duplicate-header -->

<div align="center">
  <img src="./public/images/logo/dailysat.png" width="30%" alt="DailySAT" />
</div>
<hr>
<div align="center" style="line-height: 1;">
  <a href="https://dailysat.org/"><img alt="Demo"
    src="https://img.shields.io/badge/🚀%20Live%20Demo-DailySAT-2F80ED?color=2F80ED&logoColor=white"/></a>
  <a href="https://twitter.com/dailysat"><img alt="Twitter"
    src="https://img.shields.io/badge/Twitter-@dailysat-1DA1F2?logo=x&logoColor=white"/></a>
  <br>
  <a href="LICENSE-CODE"><img alt="Code License"
    src="https://img.shields.io/badge/Code%20License-Apache%202.0-00BFFF?color=00BFFF"/></a>
  <br>
</div>

Welcome to the codebase of **DailySAT**! Here you will find a quickstart to our application and some information on it ✨

📚 To access the API documentation, navigate to: /api-docs

NOTE: You will to have an authorized email. If you do not, kindly email `dailysatorg@gmail.com` or `hemit@dailysat.org` (COO) and we can assist you from there! Afterwards, you will have 4 hour access to employee privledges


## 🧑‍🤝‍🧑 For open-source contributions:
Our mission is to build an app that is free and accessible! This means we love input from the DailySAT community :) If you have any suggestions or feedback on our webapp, you can issue a "ticket" for our team to review. Kindly create an Issue within the issues tabs provided by the Github web app.

- ##### What if I want to help through coding?
  We do allow for open-source coding contributions! Simply create a new branch from the main and then creating a PR with an issue,     
  linking the PR with it. Our team will swiftly review it and will keep you posted on the review progess through **comments** on the 
  issue that has been assigned

  You will given given **credit** for any work that we use from you. Do remember that all work done through open-source is purely volunteer and **NOT SUBJECT TO PAYMENT** You can add     
  your contributions as experience however.

##### 📛 When naming your ticket, please use the following prefixes...
- feat: (for a feature)
- fix: (for a fix in wrongful behaviour and bugs)
- chore: (for mudane tasks such as updating documentation + refactors of code)

## 👷 Developers:
- Hemit Patel (COO and Principal Maintainer of DailySAT)
- Laksyha Jain (Chief Technology Officer)
- Aarush Kute (Founder AND Chief Executive)

## 🔐 How our authentication works ##

Unlike the admin platform, the regular DailySAT platform's auth is handled by the AuthJS lib. It features simple Google SSO and its contents are saved onto a MongoDB collection called "users." This is then used to populate the dashboard with user information. We also employed a rate limiter to regulate the amount of DB calls. This way there is less burden on our MongoDB server. During the times when the API is restircted, we use a caching layer to populate the information

## 💻 Technology Stack:
- **NextJS** (frontend and backend, good for SEO)
- **TailwindCSS** (styling)
- **MongoDB** (db management solution)
- **Redis** (storage solution for sessions, rate limiting and caching layer)
- **Husky** (pre-commit solution to run commands prior to a commit)
- **ESLint** (used for linting enforcement)

## 📚 School B2B Model:

Schools can now partner with DailySAT. It is **free of charge**. Once partnered, their school will be added to the `school` collection in MongoDB. In /schools route, this collection will be shown and students can enroll into one school from that collection. They can then work on questions normally. Data from these interactions (correct answers/incorrect answers) will be stored within the `school` collection document and authorized teachers will be able to see each student and how they are doing. Teachers get authenticated through their emails, it is cross referenced with the `school` document and if their email is found they get access to /schools/dashboard?school=SCHOOL_NAME.
