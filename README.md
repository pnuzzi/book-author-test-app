# Description and Goals

Build an application that satisfies the following user stories using the [API Documentation](https://fakerestapi.azurewebsites.net/index.html) in conjunction with [Axios](https://www.npmjs.com/package/axios)

1. As a user, I should be able to list all books viewing only 20 books at a time.
2. As a user, I should be able to view the title, description and the publish date in relative time (i.e. 1 month ago) of a book.
3. As a user, I should be able to add a new book by providing the title and description, so that it shows up in the book list.
4. As a user, I should be able to click on a book in the book list and view the title and description of the selected book in a separate book details page.
5. As a user, I should be able to update the title and/or the description of a book from the book details page.
6. As a user, I should be able to delete a book from its details page.
7. As a user, when I navigate to any other page, I should see a standard 404 error page.

The following guidelines should be considered when building the UI

- UI routes should be RESTful and map closely to the API
- Tests should be written against the user stories
- Use only the browser's default black and white
- All colors that are not black or white should come from this [palette](https://flatuicolors.com/palette/nl)
- Use the default font style (sizes and weights can be changed)

The rest is open for interpretation.

# Getting Started

## Prerequisites

- Use node version >= v16.14.2
- Use npm version >= 8.5.0

## Install

Checkout the project and run in your terminal:

```
npm install
```

## Run development mode

```
npm run dev
```

## Run test

```
npm run test
```

## Build for production

```
npm run build
```

The output will be under _/dist_

## Debug active unit test file

To debug the active unit test file, go to the debug section in VS Code and select the "Jest Test Current File" launch config.
Then open your unit test file, set breakpoints wherever you want and press "F5".

## How to use images

To use images, you can import them in your current file and webpack will give you the image as a base64 encoded string or as a path to the image.

```javascript
import * as image from './image.jpg';

const ImageComponent = () => <img src={image} />;
```
