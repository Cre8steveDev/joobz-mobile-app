function hideEmail(email: string): string {
  // Check if the email is valid
  if (!email || !email.includes('@')) {
    return 'Invalid email';
  }

  // Split the email into local part and domain
  const [localPart, domain] = email.split('@');

  // Take the first three characters of the local part
  const visiblePart = localPart.slice(0, 3);

  // Create a string of 8 asterisks
  const hiddenPart = '*'.repeat(8);

  // Combine the parts
  return `${visiblePart}${hiddenPart}@${domain}`;
}

export default hideEmail;
