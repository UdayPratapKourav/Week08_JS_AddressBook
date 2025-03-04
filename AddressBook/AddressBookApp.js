class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

   
    toString() {
        return `Name: ${this.firstName} ${this.lastName}, Address: ${this.address}, City: ${this.city}, 
        State: ${this.state}, Zip: ${this.zip}, Phone: ${this.phone}, Email: ${this.email}`;
    }
}
