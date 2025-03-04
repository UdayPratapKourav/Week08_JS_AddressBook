class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        // Validate inputs
        this.firstName = this.validateName(firstName, "First Name");
        this.lastName = this.validateName(lastName, "Last Name");
        this.address = this.validateAddress(address);
        this.city = this.validateAddress(city, "City");
        this.state = this.validateAddress(state, "State");
        this.zip = this.validateZip(zip);
        this.phone = this.validatePhone(phone);
        this.email = this.validateEmail(email);
    }

    // Validation methods
    validateName(name, fieldName) {
        let namePattern = /^[A-Z][a-zA-Z]{2,}$/;
        if (!namePattern.test(name)) throw new Error(`${fieldName} must start with a capital letter and have at least 3 characters.`);
        return name;
    }

    validateAddress(value, fieldName = "Address") {
        if (value.length < 4) throw new Error(`${fieldName} must be at least 4 characters long.`);
        return value;
    }

    validateZip(zip) {
        let zipPattern = /^[0-9]{6}$/;
        if (!zipPattern.test(zip)) throw new Error("Zip code must be exactly 6 digits.");
        return zip;
    }

    validatePhone(phone) {
        let phonePattern = /^[6-9][0-9]{9}$/;
        if (!phonePattern.test(phone)) throw new Error("Phone number must be 10 digits and start with 6, 7, 8, or 9.");
        return phone;
    }

    validateEmail(email) {
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) throw new Error("Invalid email format.");
        return email;
    }

    // toString method for displaying contact details
    toString() {
        return `Name: ${this.firstName} ${this.lastName}, Address: ${this.address}, City: ${this.city}, 
        State: ${this.state}, Zip: ${this.zip}, Phone: ${this.phone}, Email: ${this.email}`;
    }
}

// Example Usage with Try-Catch for Error Handling
try {
    let contact1 = new Contact("Uday", "Kourav", "123 Main St", "Bhopal", "MadhyaPradesh", "462001", "9876543210", "uday@example.com");
    console.log(contact1.toString());
} catch (error) {
    console.error("Error:", error.message);
}
