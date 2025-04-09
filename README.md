# Round Robin Scheduling Visualizer & Calculator

## Description

This web application provides an educational tool for understanding and visualizing the Round Robin (RR) CPU scheduling algorithm. It offers both detailed explanations of the RR concept and an interactive calculator to see the algorithm in action. Users can input process details (arrival times, burst times) and a time quantum to generate a color-coded Gantt chart and calculate key performance metrics like Average Waiting Time, Average Turnaround Time, CPU Utilization, and Throughput.

This project aims to make the concepts of CPU scheduling accessible and understandable for students, developers, and anyone interested in operating systems. It combines theoretical information with practical, hands-on simulation.

## Key Features

* **Informative Content**: Comprehensive explanations covering the introduction, history, mechanics, advantages, and disadvantages of Round Robin scheduling.
* **Interactive Calculator**: Allows users to input custom arrival times, burst times, and a time quantum to simulate RR scheduling.
* **Color-Coded Gantt Chart**: Visually represents the scheduling of processes over time using distinct colors for clarity.
* **Performance Metrics**: Automatically calculates and displays Average Turnaround Time, Average Waiting Time, CPU Utilization, and Throughput for the given inputs.
* **Historical Context**: Includes a section detailing the history and development of the RR algorithm, with a link to a more detailed document.
* **Responsive Design**: Built with HTML, CSS, and JavaScript for accessibility across devices.

## How It Works

1.  **Home Page (`index.html`)**: Provides a comprehensive overview of the Round Robin scheduling algorithm, including its definition, history, mechanics, pros, and cons[cite: 26].
2.  **Calculator Page (`rrcalculator.html`)**:
    * Users enter space-separated arrival times and burst times for different processes.
    * Users specify the time quantum.
    * Clicking "Solve" triggers the JavaScript (`rr.js`) logic to perform the Round Robin simulation.
    * The results are displayed, including the Gantt chart, a table with completion, turnaround, waiting, and response times for each process, and the calculated average metrics.

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Firebase Hosting (for deployment)

## How to Use

The application is deployed and accessible online.

* **Live Demo**: [https://roundrobinscheduling.web.app/](https://roundrobinscheduling.web.app/)

To run locally:
1.  Clone the repository.
2.  Open the `index.html` or `rrcalculator.html` file in your web browser.

## Contributors

* Narahari Abhinav
* Harsh Bang  
* Khushal Baldava
* V Vaishnavi  
