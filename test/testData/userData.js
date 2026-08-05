const { faker } = require('@faker-js/faker');

function createRandomUser() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        dateOfBirth: faker.date.birthdate().toISOString().split('T')[0],
        postalCode: faker.location.zipCode(),
        houseNumber: faker.location.buildingNumber(),
        phone: faker.phone.number({ style: 'mobile' }),
        password: 'Humpty_Dumpty78!',
    };
}

module.exports = { createRandomUser };
