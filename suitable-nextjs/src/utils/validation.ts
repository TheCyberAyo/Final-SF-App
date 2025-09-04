// Common password blacklist - passwords that are too weak
const COMMON_PASSWORDS = [
  '123456', 'password', '123456789', '12345678', '12345', 'qwerty',
  'abc123', 'password123', '123123', 'admin', 'letmein', 'welcome',
  'monkey', 'dragon', 'master', 'football', 'baseball', 'sunshine',
  'princess', 'jordan', 'shadow', 'michael', 'jennifer', 'hunter',
  'joshua', 'maggie', 'mustang', '2000', 'amanda', 'summer',
  'hockey', 'tiger', 'soccer', 'chris', 'michelle', 'andrew',
  'love', 'angela', 'team', 'star', 'computer', 'jordan23'
];

/**
 * Validates email address according to specified rules:
 * - Cannot be empty
 * - Basic format - Must match username@domain.tld pattern
 * - No spaces allowed
 */
export const validateEmail = (email: string): string => {
  // Check if email is empty
  if (!email || email.trim() === '') {
    return 'Email cannot be empty';
  }

  // Check for spaces in email
  if (email.includes(' ')) {
    return 'Email cannot contain spaces';
  }

  // Basic email format validation - username@domain.tld pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address (username@domain.tld format)';
  }

  return ''; // No errors
};

/**
 * Validates password according to specified rules:
 * - Cannot be empty
 * - No spaces at start or end (trim whitespace)
 * - Minimum length of 8 characters
 * - No common passwords (check against blacklist)
 */
export const validatePassword = (password: string): string => {
  // Check if password is empty
  if (!password || password.trim() === '') {
    return 'Password cannot be empty';
  }

  // Check for leading/trailing spaces
  if (password !== password.trim()) {
    return 'Password cannot have spaces at the beginning or end';
  }

  // Enforce minimum length
  if (password.trim().length < 8) {
    return 'Password must be at least 8 characters long';
  }

  // Check against common password blacklist
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    return 'Password is too common. Please choose a more secure password';
  }

  return ''; // No errors
}; 