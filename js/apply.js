// Multi-step form functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    let currentStep = 1;
    const totalSteps = steps.length;

    // Initialize the form
    function initForm() {
        updateButtons();
        updateProgressBar();
    }

    // Update button visibility and text
    function updateButtons() {
        if (currentStep === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
        }

        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    // Update progress bar
    function updateProgressBar() {
        progressSteps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNumber < currentStep) {
                step.classList.add('completed');
            } else if (stepNumber === currentStep) {
                step.classList.add('active');
            }
        });
    }

    // Show current step
    function showStep(stepNumber) {
        steps.forEach((step, index) => {
            step.classList.remove('active');
            if (index + 1 === stepNumber) {
                step.classList.add('active');
            }
        });
    }

    // Validate current step
    function validateStep(stepNumber) {
        const currentStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#dc3545';
                field.style.backgroundColor = '#fff5f5';
            } else {
                field.style.borderColor = '#e1e5e9';
                field.style.backgroundColor = '#f8f9fa';
            }
        });

        // Additional validation for email fields
        const emailFields = currentStepElement.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !isValidEmail(field.value)) {
                isValid = false;
                field.style.borderColor = '#dc3545';
                field.style.backgroundColor = '#fff5f5';
            }
        });

        return isValid;
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Next button click handler
    nextBtn.addEventListener('click', function() {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
                updateButtons();
                updateProgressBar();
                
                // If moving to review step, populate review data
                if (currentStep === 4) {
                    populateReviewData();
                }
            }
        } else {
            showError('Please fill in all required fields correctly.');
        }
    });

    // Previous button click handler
    prevBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
            updateButtons();
            updateProgressBar();
        }
    });

    // Submit button click handler
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            // Submit the form
            form.submit();
        } else {
            showError('Please fill in all required fields correctly.');
        }
    });

    // Populate review data
    function populateReviewData() {
        // Child Information
        document.getElementById('reviewName').textContent = 
            `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`;
        document.getElementById('reviewGender').textContent = 
            document.getElementById('gender').value;
        document.getElementById('reviewDOB').textContent = 
            document.getElementById('dateOfBirth').value;
        document.getElementById('reviewAddress').textContent = 
            document.getElementById('homeAddress').value;
        document.getElementById('reviewState').textContent = 
            document.getElementById('stateOfOrigin').value;

        // Father's Information
        document.getElementById('reviewFatherName').textContent = 
            document.getElementById('fatherName').value;
        document.getElementById('reviewFatherPhones').textContent = 
            `${document.getElementById('fatherPhone1').value}${document.getElementById('fatherPhone2').value ? ', ' + document.getElementById('fatherPhone2').value : ''}`;
        document.getElementById('reviewFatherEmail').textContent = 
            document.getElementById('fatherEmail').value;
        document.getElementById('reviewFatherOccupation').textContent = 
            document.getElementById('fatherOccupation').value;
        document.getElementById('reviewFatherWork').textContent = 
            document.getElementById('fatherWorkAddress').value;

        // Mother's Information
        document.getElementById('reviewMotherName').textContent = 
            document.getElementById('motherName').value;
        document.getElementById('reviewMotherPhones').textContent = 
            `${document.getElementById('motherPhone1').value}${document.getElementById('motherPhone2').value ? ', ' + document.getElementById('motherPhone2').value : ''}`;
        document.getElementById('reviewMotherEmail').textContent = 
            document.getElementById('motherEmail').value;
        document.getElementById('reviewMotherOccupation').textContent = 
            document.getElementById('motherOccupation').value;
        document.getElementById('reviewMotherWork').textContent = 
            document.getElementById('motherWorkAddress').value;
    }

    // Show error message
    function showError(message) {
        // Remove existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        currentStepElement.insertBefore(errorDiv, currentStepElement.firstChild);
        
        // Auto-remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
                this.style.backgroundColor = '#fff5f5';
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#dc3545';
                this.style.backgroundColor = '#fff5f5';
            } else {
                this.style.borderColor = '#e1e5e9';
                this.style.backgroundColor = '#f8f9fa';
            }
        });

        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(220, 53, 69)') {
                this.style.borderColor = '#e1e5e9';
                this.style.backgroundColor = '#f8f9fa';
            }
        });
    });

    // Progress step click handler (for navigation)
    progressSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            const stepNumber = index + 1;
            if (stepNumber <= currentStep) {
                currentStep = stepNumber;
                showStep(currentStep);
                updateButtons();
                updateProgressBar();
                
                if (currentStep === 4) {
                    populateReviewData();
                }
            }
        });
    });

    // Initialize the form
    initForm();
}); 