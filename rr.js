document.getElementById('solveButton').addEventListener('click', function() {
    const arrivalTimes = document.getElementById('arrivalTimes').value.trim().split(' ').map(Number);
    const burstTimes = document.getElementById('burstTimes').value.trim().split(' ').map(Number);
    const timeQuantum = parseInt(document.getElementById('timeQuantum').value);

    if (validateInput(arrivalTimes, burstTimes, timeQuantum)) {
        const result = roundRobin(arrivalTimes, burstTimes, timeQuantum);
        displayResult(result, arrivalTimes.length);  // Pass the length of inputs
    }
});

function validateInput(arrivalTimes, burstTimes, timeQuantum) {
    if (arrivalTimes.length !== burstTimes.length) {
        alert("Arrival times and burst times must have the same number of values.");
        return false;
    }
    if (isNaN(timeQuantum) || timeQuantum <= 0) {
        alert("Please enter a valid positive number for the time quantum.");
        return false;
    }
    return true;
}

function roundRobin(arrivalTimes, burstTimes, timeQuantum) {
    let n = arrivalTimes.length;
    let remainingBurstTimes = [...burstTimes];
    let currentTime = 0;
    let queue = [];
    let gantt = [];
    let finishTimes = Array(n).fill(0);
    let turnaroundTimes = Array(n).fill(0);
    let waitingTimes = Array(n).fill(0);
    let responseTimes = Array(n).fill(-1);  // For calculating response times
    let complete = 0;
    let totalTurnaroundTime = 0;
    let totalWaitingTime = 0;
    let firstScheduledTime = Array(n).fill(-1);  // For response time calculation
    let totalCPUTime = 0;

    while (complete < n) {
        for (let i = 0; i < n; i++) {
            if (arrivalTimes[i] <= currentTime && remainingBurstTimes[i] > 0 && !queue.includes(i)) {
                queue.push(i);
            }
        }

        if (queue.length > 0) {
            let index = queue.shift();
            gantt.push(index);
            
            if (responseTimes[index] === -1) {
                responseTimes[index] = currentTime - arrivalTimes[index];
            }

            if (remainingBurstTimes[index] > timeQuantum) {
                currentTime += timeQuantum;
                remainingBurstTimes[index] -= timeQuantum;
            } else {
                currentTime += remainingBurstTimes[index];
                remainingBurstTimes[index] = 0;
                finishTimes[index] = currentTime;
                complete++;
            }

            for (let i = 0; i < n; i++) {
                if (i !== index && arrivalTimes[i] <= currentTime && remainingBurstTimes[i] > 0 && !queue.includes(i)) {
                    queue.push(i);
                }
            }
        } else {
            currentTime++;
        }
    }

    for (let i = 0; i < n; i++) {
        turnaroundTimes[i] = finishTimes[i] - arrivalTimes[i];
        waitingTimes[i] = turnaroundTimes[i] - burstTimes[i];
        totalTurnaroundTime += turnaroundTimes[i];
        totalWaitingTime += waitingTimes[i];
        totalCPUTime += burstTimes[i];
    }

    let avgTurnaroundTime = totalTurnaroundTime / n;
    let avgWaitingTime = totalWaitingTime / n;
    let cpuUtilization = (totalCPUTime / currentTime) * 100;  // CPU utilization percentage
    let throughput = n / currentTime;  // Throughput = processes completed per unit time
    
    return { 
        finishTimes, 
        turnaroundTimes, 
        waitingTimes, 
        responseTimes, 
        avgTurnaroundTime, 
        avgWaitingTime, 
        cpuUtilization, 
        throughput, 
        gantt 
    };
}

function displayResult({ finishTimes, turnaroundTimes, waitingTimes, responseTimes, avgTurnaroundTime, avgWaitingTime, cpuUtilization, throughput, gantt }, jobCount) {
    const jobs = generateJobNames(jobCount);  // Dynamically generate job names
    const arrivalTimes = document.getElementById('arrivalTimes').value.trim().split(' ').map(Number);
    const burstTimes = document.getElementById('burstTimes').value.trim().split(' ').map(Number);

    // Display Gantt Chart
    const ganttChart = document.getElementById('ganttChart');
    ganttChart.innerHTML = '';  // Clear previous chart
    gantt.forEach(index => {
        let div = document.createElement('div');
        div.style.backgroundColor = getColor(index);
        div.textContent = jobs[index];
        ganttChart.appendChild(div);
    });

    // Display Table Data
    const tableBody = document.getElementById('outputTable').querySelector('tbody');
    tableBody.innerHTML = '';  // Clear previous results

    for (let i = 0; i < jobCount; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${jobs[i]}</td>
            <td>${arrivalTimes[i]}</td>
            <td>${burstTimes[i]}</td>
            <td>${finishTimes[i]}</td>
            <td>${turnaroundTimes[i]}</td>
            <td>${waitingTimes[i]}</td>
            <td>${responseTimes[i]}</td>
        `;
        tableBody.appendChild(row);
    }

    // Display Averages and Metrics
    document.getElementById('avgTurnaroundTime').textContent = `Average Turnaround Time: ${avgTurnaroundTime.toFixed(2)}`;
    document.getElementById('avgWaitingTime').textContent = `Average Waiting Time: ${avgWaitingTime.toFixed(2)}`;
    document.getElementById('cpuUtilization').textContent = `CPU Utilization: ${cpuUtilization.toFixed(2)}%`;
    document.getElementById('throughput').textContent = `Throughput: ${throughput.toFixed(2)} processes/unit time`;
}

function generateJobNames(count) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let jobs = [];
    for (let i = 0; i < count; i++) {
        jobs.push(alphabet[i % alphabet.length]);  // Repeat alphabet if count > 26
    }
    return jobs;
}

function getColor(index) {
    const colors = ['#ff9999', '#99ccff', '#99ff99', '#ffcc99', '#cc99ff', '#ff9966'];
    return colors[index % colors.length];  // Cycle through colors if more jobs
}