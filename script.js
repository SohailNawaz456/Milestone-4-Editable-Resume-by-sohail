// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resumeForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var nameElement = document.getElementById('name');
            var emailElement = document.getElementById('email');
            var phoneElement = document.getElementById('phone');
            var educationElement = document.getElementById('education');
            var experienceElement = document.getElementById('experience');
            var skillElement = document.getElementById('skill');
            if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillElement) {
                var name_1 = nameElement.value.trim();
                var email = emailElement.value.trim();
                var phone = phoneElement.value.trim();
                var education = educationElement.value.trim();
                var experience = experienceElement.value.trim();
                var skill = skillElement.value.trim();
                // Create resume output with editable spans
                var resumeOutput = "\n                <h2>Resume</h2>\n                <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">".concat(name_1, "</span></p>\n                <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n                <p><strong>Phone Number:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n\n                <h3>Education</h3>\n                <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n                <h3>Experience</h3>\n                <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n                <h3>Skills</h3>\n                <p id=\"edit-skill\" class=\"editable\">").concat(skill, "</p>\n                ");
                var resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput;
                    makeEditable();
                }
                else {
                    console.error('The resume output element is missing');
                }
            }
            else {
                console.error('One or more input elements are missing');
            }
        });
    }
    else {
        console.error('Form with ID "resumeForm" not found');
    }
    // Function to make resume fields editable
    function makeEditable() {
        var editableElements = document.querySelectorAll('.editable');
        editableElements.forEach(function (element) {
            element.addEventListener('click', function () {
                var _a, _b;
                var currentElement = element;
                var currentValue = ((_a = currentElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
                // Create an input element
                var input = document.createElement('input');
                input.type = "text";
                input.value = currentValue;
                input.className = "editing";
                // Replace the current element with the input
                currentElement.style.display = "none";
                (_b = currentElement.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(input, currentElement.nextSibling);
                input.focus();
                // Handle when the input loses focus
                input.addEventListener("blur", function () {
                    var newValue = input.value.trim();
                    currentElement.textContent = newValue;
                    currentElement.style.display = "inline";
                    input.remove();
                });
                // Optional: Handle Enter key to finish editing
                input.addEventListener("keydown", function (event) {
                    if (event.key === "Enter") {
                        input.blur();
                    }
                });
            });
        });
    }
});
