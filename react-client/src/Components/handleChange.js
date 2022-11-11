function handleChange(input, setField, setDisable) {
  // Set field's value to user's input
  setField(input);

  // Disable button if all inputs are blank
  input ? setDisable(false) : setDisable(true);
}

export default handleChange;
