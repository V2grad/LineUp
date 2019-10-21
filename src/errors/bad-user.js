import { MakeErrorClass } from 'fejl'

class BadUserError extends MakeErrorClass(
  // Default message
  'Credential not valid, please register again',
  // Default props
  {
    statusCode: 403,
    login_required: true // Make frontend's life easier
  }
) {}

export default BadUserError
