document.addEventListener('DOMContentLoaded', function() {
    // Emission factors for different activities
    const emissionFactors = {
        commute: {
            car: 4.6, // base metric tons CO2e per year
            public_transport: 0.5,
            bicycle: 0,
            walking: 0
        },
        meatConsumption: {
            daily: 2.5,
            few_times_week: 1.5,
            rarely: 0.5,
            never: 0
        }
    };

    // Current step
    let currentStep = 1;
    const totalSteps = 4;

    // Show the initial step
    showStep(currentStep);

    // Navigation event listeners
    document.getElementById('next-1').addEventListener('click', function() {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    });

    document.getElementById('next-2').addEventListener('click', function() {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    });

    document.getElementById('next-3').addEventListener('click', function() {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    });

    document.getElementById('back-2').addEventListener('click', function() {
        currentStep--;
        showStep(currentStep);
    });

    document.getElementById('back-3').addEventListener('click', function() {
        currentStep--;
        showStep(currentStep);
    });

    document.getElementById('back-4').addEventListener('click', function() {
        currentStep--;
        showStep(currentStep);
    });

    // Submit event listener
    document.getElementById('submit').addEventListener('click', function() {
        if (validateStep(currentStep)) {
            calculateEmissions();
        }
    });

    // Function to show the current step
    function showStep(step) {
        for (let i = 1; i <= totalSteps; i++) {
            document.getElementById(`step-${i}`).style.display = 'none';
        }
        document.getElementById(`step-${step}`).style.display = 'block';
    }

    // Function to validate inputs for the current step
    function validateStep(step) {
        let isValid = true;
        const stepDiv = document.getElementById(`step-${step}`);
        const requiredFields = stepDiv.querySelectorAll('select[required], input[required]');
        requiredFields.forEach(function(field) {
            if (!field.value) {
                alert('Please fill out all required fields.');
                isValid = false;
                return false;
            }
        });
        return isValid;
    }

    // Function to calculate emissions
    function calculateEmissions() {
        // Get user inputs
        const commute = document.getElementById('commute').value;
        const mileage = parseFloat(document.getElementById('mileage').value) || 0;
        const electricityBill = parseFloat(document.getElementById('electricity').value) || 0;
        const meatConsumption = document.getElementById('meat').value;

        // Calculate emissions
        let totalEmissions = 0;

        // Commute emissions
        if (commute in emissionFactors.commute) {
            totalEmissions += emissionFactors.commute[commute];
        }

        // Additional emissions based on mileage for car users
        if (commute === 'car' && mileage > 0) {
            const carEmissionPerKm = 0.192; // kg CO2e per km (approximate value)
            totalEmissions += (mileage * carEmissionPerKm * 52) / 1000; // Convert kg to metric tons per year
        }

        // Electricity emissions
        if (electricityBill > 0) {
            const avgEmissionPerNIS = 0.2; // Assumed kg CO2e per NIS
            totalEmissions += (electricityBill * avgEmissionPerNIS * 12) / 1000; // Convert kg to metric tons per year
        }

        // Meat consumption emissions
        if (meatConsumption in emissionFactors.meatConsumption) {
            totalEmissions += emissionFactors.meatConsumption[meatConsumption];
        }

        // Display result
        displayResult(totalEmissions);
    }

    // Function to display the result
    function displayResult(emissions) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
      <h2>Your estimated annual carbon footprint is ${emissions.toFixed(2)} metric tons CO<sub>2</sub>e.</h2>
      <button id="retakeButton">Retake Questionnaire</button>
      <div id="shareButtons">
        <!-- Social sharing buttons will go here -->
      </div>
    `;

        // Hide the form and show the result
        document.getElementById('carbonForm').style.display = 'none';
        resultDiv.style.display = 'block';

        // Add event listener to the retake button
        document.getElementById('retakeButton').addEventListener('click', retakeQuestionnaire);

        // Add social sharing buttons
        addSocialSharing(emissions);
    }

    // Function to retake the questionnaire
    function retakeQuestionnaire() {
        // Reset the form
        document.getElementById('carbonForm').reset();
        // Reset the current step
        currentStep = 1;
        showStep(currentStep);
        // Show the form and hide the result
        document.getElementById('carbonForm').style.display = 'block';
        document.getElementById('result').style.display = 'none';
    }

    // Function to add social sharing buttons
    function addSocialSharing(emissions) {
        const shareText = `I just calculated my carbon footprint and it's ${emissions.toFixed(2)} metric tons CO2e per year! Calculate yours at [Your App URL]`;

        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('[Your App URL]')}&quote=${encodeURIComponent(shareText)}`;
        const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('[Your App URL]')}&title=${encodeURIComponent('Carbon Footprint Estimator')}&summary=${encodeURIComponent(shareText)}&source=LinkedIn`;

        const shareButtonsDiv = document.getElementById('shareButtons');
        shareButtonsDiv.innerHTML = `
      <a href="${facebookUrl}" target="_blank" class="facebook">Share on Facebook</a>
      <a href="${twitterUrl}" target="_blank" class="twitter">Share on Twitter</a>
      <a href="${linkedinUrl}" target="_blank" class="linkedin">Share on LinkedIn</a>
    `;
    }

    // Functions to update slider values
    window.updateMileageValue = function(value) {
        document.getElementById('mileageValue').textContent = `${value} km`;
    }

    window.updateElectricityValue = function(value) {
        document.getElementById('electricityValue').textContent = `${value} NIS`;
    }
});
