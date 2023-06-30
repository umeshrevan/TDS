const messages = {
	registeredSuccess: { message: 'You are registered successfully' },
	userNamePattern: { message: 'The pattern for username should be like: U18' },
	passwordPattern: { message: 'The pattern for password be like: Umeshrathva@18' },
	alreadyRegisteredUsername: { message: 'Already registered username' },
	alreadyRegisteredEmail: { message: 'Already registered email' },
	alreadyRegisteredId: { message: 'Already registered Id' },
	userNotFound: { message: 'User not found' },
	invalidCredentials: { message: 'Invalid credentials' },
	unAuthorized: { message: 'You are unauthorized!' },
	forbidden: { message: 'Forbidden' },
	authorized: { message: 'Authorized' },
	loginSuccess: { message: 'You are logged in successfully' },
	brandAdd: { message: 'Brand added successfully' },
	dataNotFound: { message: 'Data not found' },
}

const status = { statusSuccess: 200, statusNotFound: 404, badRequest: 400, alreadyExist: 401 }

module.exports = { messages, status }