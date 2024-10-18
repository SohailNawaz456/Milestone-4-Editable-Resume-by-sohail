// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement | null;

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const nameElement = document.getElementById('name') as HTMLInputElement | null;
            const emailElement = document.getElementById('email') as HTMLInputElement | null;
            const phoneElement = document.getElementById('phone') as HTMLInputElement | null;
            const educationElement = document.getElementById('education') as HTMLTextAreaElement | null;
            const experienceElement = document.getElementById('experience') as HTMLTextAreaElement | null;
            const skillElement = document.getElementById('skill') as HTMLTextAreaElement | null;

            if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillElement) {
                const name = nameElement.value.trim();
                const email = emailElement.value.trim();
                const phone = phoneElement.value.trim();
                const education = educationElement.value.trim();
                const experience = experienceElement.value.trim();
                const skill = skillElement.value.trim();

                // Create resume output with editable spans
                const resumeOutput = `
                <h2>Resume</h2>
                <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
                <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
                <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable">${phone}</span></p>

                <h3>Education</h3>
                <p id="edit-education" class="editable">${education}</p>
                <h3>Experience</h3>
                <p id="edit-experience" class="editable">${experience}</p>
                <h3>Skills</h3>
                <p id="edit-skill" class="editable">${skill}</p>
                `;

                const resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput;
                    makeEditable();
                } else {
                    console.error('The resume output element is missing');
                }
            } else {
                console.error('One or more input elements are missing');
            }
        });
    } else {
        console.error('Form with ID "resumeForm" not found');
    }

    // Function to make resume fields editable
    function makeEditable() {
        const editableElements = document.querySelectorAll('.editable');

        editableElements.forEach(element => {
            element.addEventListener('click', function() {
                const currentElement = element as HTMLElement;
                const currentValue = currentElement.textContent?.trim() || "";

                // Create an input element
                const input = document.createElement('input');
                input.type = "text";
                input.value = currentValue;
                input.className = "editing";

                // Replace the current element with the input
                currentElement.style.display = "none";
                currentElement.parentNode?.insertBefore(input, currentElement.nextSibling);

                input.focus();

                // Handle when the input loses focus
                input.addEventListener("blur", function() {
                    const newValue = input.value.trim();
                    currentElement.textContent = newValue;
                    currentElement.style.display = "inline";
                    input.remove();
                });

                // Optional: Handle Enter key to finish editing
                input.addEventListener("keydown", function(event) {
                    if (event.key === "Enter") {
                        input.blur();
                    }
                });
            });
        });
    }
});
