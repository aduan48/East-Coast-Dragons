function doOptions(e) {
  // Return a clean text output for browser pre-flights without breaking the service
  return ContentService.createTextOutput("");
}

function doPost(e) {
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    console.log("Web App triggered via Netlify/POST request.");
    
    // 1. Parse the incoming form data
    console.log("Parsed data successfully received.");
    
    // 2. Open the sheet and get headers
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var targetSheet = ss.getSheetByName("Form Submissions");

    if (!targetSheet) {
      throw new Error("Could not find a sheet named 'Form Submissions'. Please check your sheet tab names.");
    }

    var headers = targetSheet.getRange(1, 1, 1, targetSheet.getLastColumn()).getValues()[0];
    
    // 3. Map the data to the correct columns
    var newRow = [];
    for (var i = 0; i < headers.length; i++) {
      var headerName = headers[i];
      newRow.push(data[headerName] !== undefined ? data[headerName] : "");
    }
    
    // 4. Append to the spreadsheet
    targetSheet.appendRow(newRow);
    console.log("Row successfully appended to the spreadsheet.");
    
    // 5. Extract specific details for the confirmation email
    var recipientEmail = data["playerEmail"] || data["parentEmail"] || "ajduan4829@gmail.com";
    var firstName = data["firstName"] || "Player";
    var selectedTournament = data["tournamentSelect"] || "Selected Tournament";
    
    // 6. Call the helper function and pass the details through
    sendConfirmationEmail(recipientEmail, firstName, selectedTournament);
    
    // 7. FIXED: Return success response cleanly without illegal .appendHeader functions
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    console.error("Execution failed inside doPost: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

// HELPER FUNCTION
function sendConfirmationEmail(email, name, tournament) {
  try {
    console.log("Helper function started. Attempting to send email to: " + email);
    
    var subject = "Registration Confirmed - East Coast Dragons";
    var body = "Hi " + name + ",\n\n" +
               "Thank you for your submission! We have successfully received your registration details.\n\n" +
               "You have successfully registered for the following tournament:\n" +
               "• " + tournament + "\n\n" +
               "You will receive more information regarding schedules, logistics, and next steps closer to the tournament.\n\n" +
               "Once a Dragon, Always a Dragon.\n\n" +
               "Best regards,\n" +
               "East Coast Dragons Hockey Management";
    
    GmailApp.sendEmail(email, subject, body);
    console.log("Confirmation email successfully sent to " + email);
    
  } catch (emailError) {
    console.error("Helper function failed to send email: " + emailError.toString());
  }
}