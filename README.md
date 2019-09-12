# Angular Breadcrumb

A Generic Breadcrumb component that displays the site's hierarchy (Basically what a breadcrumb does).

## How does it work

 ### 1. Create the Breadcrumb Model

The Breadcrumb Model is a Javascript Object that contains the blueprint for the website.

In the example used in this branch the model looks like following:
```
breadcrumbData = {
    home: {},
    about: {
      profile: 'profile',
      journey: 'journey'
    },
    portfolio: {
      travelog: 'travelog',
      blog: 'blog',
      foodie: 'foodie'
    }
  };
```

As illustrated from the model above, home, about etc form the parent route while profile, travelog etc form the subsequent child routes.

### 2. Pass the breadcrum model as an Input for the breadcrumb component.

```
<app-breadcrumb [breadcrumbModel]="breadcrumbData"></app-breadcrumb>
```

The `breadcrumbData` defined above is passed as the input

### 3. Your breadcrumb has been created!

Enjoy!

P.S. - The Breadcrumb at the moment supports only single level of branching, that is `parent -> child`, I'll be implementing deeper nesting level in the future.
