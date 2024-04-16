# Data-Visualization-Dashboard

### This is web application that fetches data from JSONPlaceholder and displays it in a user-friendly dashboard using only vanilla JavaScript.

---

### This project receives data using the JSONPlaceholder API, you can see the details of how it works here:

## https://jsonplaceholder.typicode.com/

---

### This project is hosted using the Vecel.com platform, you can see how it works here:

## https://data-visualization-dashboard-by-shist.vercel.app/

---

## Video demo:

https://github.com/Shist/Data-Visualization-Dashboard/assets/40572268/bb8c3d67-efd3-4909-ae6e-01ae10d238b4

---

## Instruction for launching this project

1. Go to the folder on your PC where you want to install the project:
   `cd "your-folder"`
1. Download and install files of this project:
   `git clone https://github.com/Shist/Data-Visualization-Dashboard`
1. Go to the app folder:
   `cd Data-Visualization-Dashboard`
1. Run the app with some server. You can use [VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or [MAMP](https://www.mamp.info/en/windows/).

---

## Description of folder structure

- The `assets` folder stores all fonts, pictures, scripts and icons
  - The `fonts` folder stores all local fonts
  - The `images` folder stores all static pictures
  - The `icons` folder stores all icons (including favicon)
- The `scripts` folder stores all the scripts
  - The `modules` folder contains all modules of the project: modules for charts (barChart.js, lineChart.js, pieChart.js) and additional modules (setListeners.js, setColorsGenerator.js, setDatesGenerator.js)
  - The `service` folder stores *.js files with code that handles data exchange between app and other services (e.g. JSONPlaceholder)
- The `styles` folder stores all the application styles
  - The `global` folder stores style variables, as well as templates and general styles
  - The `main` folder stores the styles of the main part of the page

---

## Technologies used in the project

- HTML
- CSS / SCSS
- Javascript
- HTML Canvas
- JSONPlaceholder API
- Fetch API
- Promise
- Async / Await
- HTTP-Requests
- Modules
- Imports / Exports
