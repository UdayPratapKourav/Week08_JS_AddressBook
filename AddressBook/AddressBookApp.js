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
// try {
//     let contact1 = new Contact("Uday", "Kourav", "123 Main St", "Bhopal", "MadhyaPradesh", "462001", "9876543210", "uday@example.com");
//     console.log(contact1.toString());
// } catch (error) {
//     console.error("Error:", error.message);
// }
class AddressBook {
    constructor() {
        this.contacts = []; // Array to store multiple contacts
    }

    // Add a new contact after validation
    addContact(contact) {
        if (this.contacts.some(c => c.firstName === contact.firstName && c.lastName === contact.lastName)) {
            throw new Error("Contact with this name already exists.");
        }
        this.contacts.push(contact);
    }
    // Find and edit an existing contact
    editContact(firstName, lastName, updatedDetails) {
        let contact = this.contacts.find(c => c.firstName === firstName && c.lastName === lastName);
        
        if (!contact) {
            throw new Error("Contact not found.");
        }

        // Update only the provided details
        Object.assign(contact, updatedDetails);
    }

     // Method to delete a contact by name
     deleteContact(firstName, lastName) {
        let index = this.contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
        
        if (index !== -1) {
            this.contacts.splice(index, 1); // Remove the contact from the array
            console.log(`Contact ${firstName} ${lastName} deleted successfully.`);
        } else {
            console.log(`Contact ${firstName} ${lastName} not found.`);
        }
    }

    // Display all contacts
    displayContacts() {
        return this.contacts.map(contact => contact.toString()).join("\n");
    }
}

// Example Usage
try {
    let addressBook = new AddressBook();

    let contact1 = new Contact("Uday", "Kourav", "123 Main St", "Bhopal", "MadhyaPradesh", "462001", "9876543210", "uday@example.com");
    let contact2 = new Contact("John", "Doe", "456 Park Ave", "Indore", "MadhyaPradesh", "452001", "9876543211", "john@example.com");

    addressBook.addContact(contact1);
    addressBook.addContact(contact2);
    addressBook.editContact("Uday", "Kourav", { phone: "9999999999", address: "456 New St" });
    addressBook.deleteContact("John", "Doe");

    console.log("Address Book:");
    console.log(addressBook.displayContacts());
} catch (error) {
    console.error("Error:", error.message);
}