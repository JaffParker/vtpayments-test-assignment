![VTPayments Logo](VTPaymentsLogo.png)

# VTPayments Test Assignment

Hello and congratulations on making it this far in the onboarding process! This assignment was designed to test your ability to follow standards and guidelines, work with existing code and deliver on business requirements, all the while being creative enough to accomplish the job (but not too much 😉).

In our codebase we make use of many modern tech and frameworks, such as Typescript, GraphQL, NestJS, React. If you haven't had experience with all of them, don't panic! As long as you can Google and read docs, you should be able to follow the spirit of the code already in place.

Before you start, we will walk you through deploying this project on your local machine and through the folder structure of the codebase.

## Installation

### Prerequisites

Before you get started, you need to make sure you have access to a MySQL/MariaDB server. One isn't packaged with this code. Also, you need to install the latest version of NodeJS to run both backend and frontend.

First step, evidently, is to clone this repo:

```
$ git clone git clone https://bitbucket.org/vtpay/test-assignment.git

# or with SSH
$ git clone git@bitbucket.org:vtpay/test-assignment.git
```

### API Installation

Setting up the API code can be done in 3 steps:

1. Install npm dependencies
2. Set up the database
3. Create database structure

First:

```
$ cd api

$ npm install
```

Once you've done that, copy the `.env.example` file and populate it with values relevant for you:

```
$ cp .env.example .env
```

Add your correct database credentials and make sure you have `DB_SYNCHRONIZE=true`. After this you can run the app once:

```
$ npm start
```

That will automatically create the database structure. However, due to a bug in TypeORM, you have to disable DB synchronization, so head back to your `.env` file and change `DB_SYNCHRONIZE` to `false`.

With this assignment we have attached a test user, but you need to apply the SQL file yourself (it's right next to this README). The password for the user is `123456`.

### Frontend Installation

Simply head to the `frontend` directory and install the npm dependencies:

```
$ cd ../frontend

$ npm install

$ npm start
```

It's a create-react-app project, so you can use all the commands described in their docs!

## Folder structure

As you might have already noticed, the project consists of 2 parts: the API and the frontend that connects to it. They are entirely decoupled, so think of them as 2 separate codebases!

The API is separated into clear modules. Every module should be responsible for one thing only (like `users` is a CRUD for users and `auth` deals with authentication).

Frontend is a bit more complex as it deals with data flow and data displaying. GraphQL mutations and queries are contained in the `graphql` directory. React hooks and contexts are in `hooks` and `components` respectively (who'd've thought eh?).

The fun begins in `components`. All the components are split into a few categories: Routes, Containers, Forms and Views.

Routes can only be responsible for a limited amount of things: passing route params to containers, setting document and page titles and sometimes managing layout.

Forms are self explanatory. They accept a submit function, render the fields and take care of validation.

Views are pure components, they only accept data and render elements (no side effects allowed).

Containers do everything else: fetch data, distribute it to other containers, make calls to the api, handle side effects. They can become large, so be careful and know when it's best to split a container into a few more specific ones.

## Things to consider

Remember earlier I mentioned that this assignment will test your ability to follow standards? Well, good for you, we have 2 tools that enforce the said standards: Prettier and ESLint. Prettier will forcefully format your code and ESLint will throw errors, if you violate good JS practices.

There are plugins for code editors that will run those 2 automatically, however, you might not have those. Whatever the case, the code submitted to git must be formatted by Prettier and must have no errors from ESLint.

Some code standards haven't made it to the ESLint config yet simply because we didn't encounter them. While we won't be especially strict with those, you should be careful and not use deprecated or generally advised against JS practices.

## Your assignment!

Imagine this scenario:

You franchise a business (let's call it FranCorp). Merchants who buy your franchise use your branding in return for a percentage of their income. For the purpose of this assignment, let's call you a RESELLER and merchants who buy your franchise MERCHANTS. You have to implement module(s) that will allow you to manage that.

In your module these features must be available:

* Creating a RESELLER
* Possibility for the RESELLER to create MERCHANTS that belong to him

Some structure has already been put in place to help you get started. You have to build on that to implement the listed features. Be creative. We will be evaluating your solution by a few parameters:

* The time it took you to complete (bonus: keep a log of how you got from the beginning to the final product)
* The amount of code you had to write to accomplish the job (enough to make it legible, but not 200-line long files)
* The legibility of the code you wrote (ideally we should be able to read it without your help)
* Your code style (functional and immutable styles are preferred)

Once you're done, simply create a pull request for us to review and we'll get back to you.

By the way, we already have this feature and simply would like to see how you would approach it. So don't worry about it and take your time!

If you have any questions about the requirements, feel free to contact us. For the frameworks and libraries we use, you have Google and official docs :) Good luck!
