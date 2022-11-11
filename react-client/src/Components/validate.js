function validate(input, status, field) {
  // Check if any inputs are blank
  if (!input) {
    status("Error: " + field + " is required.");
    setTimeout(() => status(""), 3000);
    return false;
  }

  return true;
}

export default validate;
