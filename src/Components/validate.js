function validate(field, status, label) {
  // Check if any fields are blank
  if (!field) {
    status("Error: " + label + " is required.");
    setTimeout(() => status(""), 3000);
    return false;
  }

  return true;
}

export default validate;
