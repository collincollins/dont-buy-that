 # [Don't Buy That!](https://www.dontbuythat.org)

 **Don't Buy That!** is a nostalgic-themed webapp that helps you see what your money could potentially grow into if you skip a purchase and invest the money instead. Enter your current age, the age at which you plan to retire, and the amount you’re thinking of spending. The app calculates the future value of that amount at an 8% annual return and visualizes the growth via a chart.
 
 ## Table of Contents
 
 - [Features](#features)
 - [Installation](#installation)
 - [Usage](#usage)
 - [Project-Structure](#project-structure)
 - [Technologies Used](#technologies-used)
 - [How It Works](#how-it-works)
 - [Contributing](#contributing)

 --- 

 ## Features

 1. **Dynamic Future Value Calculation** 
    Uses a fixed 8% annual return to show how your spending might grow if invested instead. 

 2. **Chart Visualization**  
    Renders a line chart (via Chart.js) illustrating the value growth from your current age to retirement age.
    
 --- 

 ## Installation 

 1. **Clone the Repo** 
    ```bash
    git clone https://github.com/YourUsername/dontbuythat.git 
    cd dontbuythat 
    ``` 

 2. **Install Dependencies** 
    Using npm: 
    ```bash 
    npm install
    ``` 
    Or using Yarn:
    ```bash
    yarn install 
    ``` 

 3. **Start the Dev Server**  
    Using npm: 
    ```bash 
    npm start 
    ``` 
    Or Yarn: 
    ```bash 
    yarn start 
    ``` 
    This will open the app in your default browser at [http://localhost:3000](http://localhost:3000). 

 --- 

 ## Usage 

 1. **Enter Your Data**  
    - Current age  
    - Desired retirement age  
    - Proposed spending amount (in $)

 2. **Submit**  
    Click **Calculate** to see: 
    - The future value of the skipped spending at an 8% annual return  
    - A line chart plotting the value year by year 
 
 3. **Explore**  
    - Scroll down to see a detailed chart and breakdown of the parameters used. 
 
 --- 
 
 ## Project Structure 
 
 ``` 
 dontbuythat/ 
 ├─ src/ 
 │  ├─ components/ 
 │  │  ├─ Card.js            # card wrapper for layout 
 │  │  ├─ Dashboard.js       # container to handle input & results 
 │  │  ├─ InputForm.js       # form for user input
 │  │  ├─ Navbar.js          # top navigation / header 
 │  │  ├─ Results.js         # displays the future value and renders the chart 
 │  │  └─ img/               # images (for button)
 │  ├─ utils/ 
 │  │  └─ calculations.js    # contains function to calculate future value 
 │  ├─ App.js                # main app component 
 │  ├─ index.js              # entry point of the application 
 │  └─ index.css             # global CSS (Tailwind + custom styles) 
 ├─ tailwind.config.js       # tailwind config
 ├─ package.json 
 └─ README.md                # project documentation
 ``` 
 --- 
 
 ## How It Works 
 
 1. **User Inputs**  
    The user enters their current age, future retirement age, and the money they'd otherwise spend. 
 
 2. **Validation & Storage**  
    - `InputForm` ensures all fields have valid data. 
    - Valid data is passed up to `Dashboard` (or `App`) and stored in local state and in `localStorage`. 
 
 3. **Calculation**  
    - The function `calculateFutureValue` in `utils/calculations.js` applies the formula: 

      Future Value = P * (1 + r)^n 
     
      Where: 
      - P = Spending amount (principal)  
      - r = 8% annual rate of return (0.08)  
      - n = Years between current age and retirement  
 
 4. **Visualization**  
    - `Results.js` renders a line chart using `react-chartjs-2`, plotting each year’s projected value until retirement age.

 --- 
 
 ## Contributing
   - Contributions, issues, and feature requests are welcome.
 --- 
