import { MakeErrorClass } from 'fejl'

class BadUserError extends MakeErrorClass(
  // Default message
  'Credential not valid, please register',
  // Default props
  {
    statusCode: 4003 // Make frontend's life easier
  }
) {}

export default BadUserError
