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


class AddressBook {
    constructor() {
        this.contacts = []; // Array to store multiple contacts
    }

    // Add a new contact after validation
    addContact(contact) {
        // Check if contact already exists
        let duplicate = this.contacts.filter(c => 
            c.firstName === contact.firstName && c.lastName === contact.lastName
        );

        if (duplicate.length > 0) {
            throw new Error("Contact with this name already exists.");
        }

        // If no duplicate, add contact
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

    getContactCount() {
        return this.contacts.reduce((count) => count + 1, 0);
    }

     //  Search contacts by city
     searchByCity(city) {
        return this.contacts.filter(contact => contact.city === city);
    }

    //  Search contacts by state
    searchByState(state) {
        return this.contacts.filter(contact => contact.state === state);
    }


     //  View persons by city
     viewByCity(city) {
        return this.contacts
            .filter(contact => contact.city === city)
            .map(contact => `${contact.firstName} ${contact.lastName}`);
    }

    //  View persons by state
    viewByState(state) {
        return this.contacts
            .filter(contact => contact.state === state)
            .map(contact => `${contact.firstName} ${contact.lastName}`);
    }


    getCountByCity(city) {
        return this.contacts
            .filter(contact => contact.city === city)  // Find contacts in the given city
            .reduce(count => count + 1, 0);  // Count them
    }
    
    getCountByState(state) {
        return this.contacts
            .filter(contact => contact.state === state) // Find contacts in the given state
            .reduce(count => count + 1, 0); // Count them
    }

    sortByName() {
        return this.contacts
            .slice() // Create a copy to avoid modifying the original array
            .sort((a, b) => a.firstName.localeCompare(b.firstName)); // Sort by first name
    }
    
    sortByCity() {
        return this.contacts.slice().sort((a, b) => a.city.localeCompare(b.city));
    }
    
    sortByState() {
        return this.contacts.slice().sort((a, b) => a.state.localeCompare(b.state));
    }
    
    sortByZip() {
        return this.contacts.slice().sort((a, b) => a.zip - b.zip);
    }



    // Display all contacts
    displayContacts() {
        return this.contacts.map(contact => contact.toString()).join("\n");
    }
}


try {
    console.log("========= ADDRESS BOOK APPLICATION =========");

    // Creating an AddressBook instance
    let addressBook = new AddressBook();

    // Adding contacts
    let contact1 = new Contact("Uday", "Kourav", "123 Main St", "Bhopal", "MadhyaPradesh", "462001", "9876543210", "uday@example.com");
    let contact2 = new Contact("John", "Kourav", "456 Park Ave", "Indore", "MadhyaPradesh", "452001", "9876543211", "john@example.com");
    let contact3 = new Contact("Ankit", "Kourav", "122 Main St", "Kareli", "MadhyaPradesh", "472001", "9876545210", "ankit@example.com");
    let contact4 = new Contact("Bhupendra", "Kourav", "451 Park Ave", "Imaliya", "MadhyaPradesh", "482001", "9879543211", "bhupendra@example.com");

    addressBook.addContact(contact1);
    addressBook.addContact(contact2);
    addressBook.addContact(contact3);
    addressBook.addContact(contact4);

    console.log("\n Contacts added successfully!\n");

    // Editing a contact
    addressBook.editContact("Uday", "Kourav", { phone: "9999999999", address: "456 New St" });
    console.log(" Contact updated: Uday Kourav's phone and address modified.\n");

    // Deleting a contact
    addressBook.deleteContact("John", "Kourav");
    console.log(" Contact deleted: John Kourav removed from the Address Book.\n");

    // Searching by city and state
    console.log(" Search Results:");
    console.log("- Search by City (Bhopal):", addressBook.searchByCity("Bhopal"));
    console.log("- Search by State (Madhya Pradesh):", addressBook.searchByState("MadhyaPradesh"), "\n");

    // Viewing persons by city and state
    console.log(" View Results:");
    console.log("- Persons in Bhopal:", addressBook.viewByCity("Bhopal"));
    console.log("- Persons in Madhya Pradesh:", addressBook.viewByState("MadhyaPradesh"), "\n");

    // Counting contacts by city and state
    console.log(" Count Results:");
    console.log("- Count in Bhopal:", addressBook.getCountByCity("Bhopal"));
    console.log("- Count in Madhya Pradesh:", addressBook.getCountByState("MadhyaPradesh"), "\n");

    // Sorting contacts in different ways
    console.log(" Sorting Address Book:");
    console.log("- Sorted by Name:", addressBook.sortByName());
    console.log("- Sorted by City:", addressBook.sortByCity());
    console.log("- Sorted by State:", addressBook.sortByState());
    console.log("- Sorted by Zip Code:", addressBook.sortByZip(), "\n");

    // Displaying final Address Book
    console.log(" FINAL ADDRESS BOOK:");
    console.log(addressBook.displayContacts());

    // Total number of contacts
    console.log("\n Total Contacts:", addressBook.getContactCount());

    console.log("\n========= END OF PROGRAM =========");

} catch (error) {
    console.error(" Error:", error.message);
}
