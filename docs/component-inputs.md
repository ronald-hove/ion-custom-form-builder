# Inputs

[<-- Home](https://github.com/ronald-hove/ion-custom-form-builder)

- Below is a list of the available component inputs 

<style hidden>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>

<table>
  <tr>
    <th>Input</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>formFields</td>
    <td>FormField</td>
    <td>An array of form field objects based on the FormField model
    </td>
  </tr>
  <tr>
    <td>showSubmitButton</td>
    <td>boolean</td>
    <td>
      A boolean value to indicate whether or not to show the component's default submit button
      <br><br>
      default - true
    </td>
  </tr>
  <tr>
    <td>submitButtonText</td>
    <td>string</td>
    <td>
      The default submit button text
      <br><br>
      default - 'Submit'
    </td>
  </tr>
  <tr>
    <td>showLabels</td>
    <td>boolean</td>
    <td>
      A boolean value to indicate whether or not to show form input labels
      <br><br>
      default - true
    </td>
  </tr>
  <tr>
    <td>showIcons</td>
    <td>boolean</td>
    <td>
      A boolean value to indicate whether or not to show icons next to form inputs
      <br><br>
      default - true
    </td>
  </tr>
  <tr>
    <td>iconColor</td>
    <td>string</td>
    <td>
      The color of the icons that appear next to the form inputs, these are the colors set in the app's ~theme/variables.scss file i.e primary. secondary etc
      <br><br>
      default - primary
    </td>
  </tr>
  <tr>
    <td>showCardIcons</td>
    <td>boolean</td>
    <td>
      A boolean value to indicate whether or not to show credit card icons next to the credit card form input
      <br><br>
      Only applicable if field with formFieldType of  credit-card is used
      <br><br>
      default - true
    </td>
  </tr>
  <tr>
    <td>returnCreditCardType (in-development)</td>
    <td>boolean</td>
    <td>
      A boolean value to indicate whether or not to return the credit-card type i.e mastercard, visa, amex, on formSubmission
      <br><br>
      Only applicable if field with formFieldType of  credit-card is used
      <br><br>
      default - true
    </td>
  </tr>
  <tr>
    <td>submitButtonColor</td>
    <td>string</td>
    <td>
      The color of the default submit button
      <br><br>
      default - primary    
      <br><br>
      Only applicable if showSubmitButton is set to true
    </td>
  </tr>
</table>
