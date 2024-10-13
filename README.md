Carbon Footprint Estimator

The Carbon Footprint Estimator is a simple web application that calculates an individual's annual carbon footprint based on their commuting habits, travel mileage, electricity usage, and meat consumption. The goal is to raise awareness about personal environmental impact and encourage more sustainable lifestyle choices.
Features

Interactive Questionnaire: Step-by-step form to input personal data.
Real-Time Calculations: Immediate estimation of carbon emissions.
Responsive Design: Optimized for desktop and mobile devices.
Nature-Inspired UI: Clean design with a modern, eco-friendly theme.
Usage

Start the Questionnaire: Open index.html in a web browser.
Provide Your Data: Answer the questions by selecting options and adjusting sliders.
View Results: After submission, your estimated annual carbon footprint is displayed.
Retake or Share: Option to retake the questionnaire or share results.
Time Complexity Analysis

The application's operations are straightforward and execute in constant time:
Emission Calculation: The calculateEmissions function performs a fixed number of arithmetic operations based on user inputs.
Time Complexity: O(1)
Form Validation: The validateStep function checks for required fields in the current step.
Time Complexity: O(1)
Event Handling: Navigation between steps and updating slider values involve direct DOM manipulations.
Time Complexity: O(1)
Overall, the application's functions execute in constant time relative to user inputs, ensuring quick and efficient performance.
Project Structure

index.html: Main HTML file containing the structure.
styles.css: CSS file for styling and layout.
script.js: JavaScript file for interactivity and logic.
Technologies Used

HTML
CSS
JavaScript
