![VTPayments Super Admin Dashboard Logo](docs/images/logo.png)

# VTPayments Reseller / Merchant Dashboard

This documentation is specific to the front-end repositories (code guidelines, structure) and the super admin dashboard in particular.

## Prerequisites

This documentation builds on top of [documentation for the API](https://bitbucket.org/vtpay/api/src/master/README.md) and expands it to include the front-end specific information. Such documents as [Git Workflow](https://bitbucket.org/vtpay/api/src/3192a3db088e18bdf14f5b5226ba15e6e149f7ca/docs/git.md) and partially [Code Guidelines](https://bitbucket.org/vtpay/api/src/3192a3db088e18bdf14f5b5226ba15e6e149f7ca/docs/code.md) also apply here. Thus it is required that you first go through the API documentation.

In addition, before you dive into this documentation, make sure you familiarize yourself with the following libraries that we use:

- [Apollo GraphQL Client](https://www.apollographql.com/docs/react/) - The client for GraphQL API's that works excellent with Apollo Server (that we also use).
- [Reactstrap](https://reactstrap.github.io/) - Bootstrap V4 wrapper for React
- [date-fns](https://date-fns.org/) - the only and only date manipulation library that we use.
- [lodash](https://lodash.com/) - a collection of useful functions so you don't have to reinvent the wheel.
- [Informed](https://github.com/joepuzzo/informed) - React form handling.
- [React](https://reactjs.org/) - if you're reading this documentation, you should not need to familiarize yourself with React... However, make sure to read about [hooks](https://reactjs.org/docs/hooks-intro.html)! Also we make use of [Create React App](https://facebook.github.io/create-react-app/) (and [here](docs/CRA.md)) in all our front-end projects, so check out their docs to see what's included.

## Links

[Installation](docs/installation.md)

[Code Guidelines](docs/code.md)

## Support

If you have questions as you go through this documentation, do not hesitate to contact Mohamed or Andrey (Jaff Parker) in Slack. We'll do our best to answer your questions and update the documentation to better explain things.
