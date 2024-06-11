# MyFlixClient --- Frontend Development with Angular

## Project description

Welcome to MyFlix! This project focuses on building the frontend interface for The Movie App using Angular. With a strong backend already in place, including a REST API and database, our goal is to create a seamless and engaging user experience.

**Key Features**

- **Welcome View:** The app displays a welcome view allowing users to log in or register an account.

- **Authentication:** Authenticated users can view all movies.

- **Synopsis Movie View:** Clicking on a movie displays additional details about the movie to view.

- **Director View:** Users can access details about the director of the selected movie by clicking a button.

- **Genre View:** Users can access details about the genre of the selected movie by clicking a button.

**Highlights**

- **One-Page Layout** - the application features a single-page layout, ensuring a smooth and intuitive user journey.

- **Angular Material** - for a visually appealing and responsive design.

## Used Technologies

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

- Angular: A powerful web application framework.
- Angular Material: A UI component library for Angular applications.
- RxJS: A library for reactive programming using Observables.

## Getting Started

- Clone this repository
- Install all the project dependencies:

       npm install

- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deployment

Deploy your application to GitHub Pages.

- Create a new repository on GitHub

- In your terminal, run this command (replace `username` and `repository-name` with your data):

       git remote add origin https://github.com/<GitHub-username>/<repository-name>.git

- Add angular-cli-ghpages by running

       ng add angular-cli-ghpages

- To build your application, run the command (replace <repository-name> with your own repository name)

       ng deploy --base-href=/<repository-name>/

- The URL of your application will be then `https://<GitHub-username>.github.io/<repository-name>/`

Whenever you make any changes to your application's code, all you need to do is run the command:

       ng deploy --base-href=/<repository-name>/


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
