<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $firstName = $_POST['firstName'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $message = $_POST['message'] ?? '';
    
    // Get selected subjects
    $subjects = [];
    if (isset($_POST['subjects']) && is_array($_POST['subjects'])) {
        $subjects = $_POST['subjects'];
    }
    
    // Format subjects for email
    $subjectsText = '';
    if (!empty($subjects)) {
        $subjectsText = "Selected topics: " . implode(", ", $subjects) . "\n\n";
    }
    
    // Email recipient
    $to = "favoureffiong2008@gmail.com";
    
    // Email subject
    $subject = "New Contact Form Submission from $firstName $lastName";
    
    // Email content
    $emailContent = "You have received a new message from the contact form on your website.\n\n";
    $emailContent .= "Name: $firstName $lastName\n";
    $emailContent .= "Email: $email\n";
    $emailContent .= "Phone: $phone\n";
    $emailContent .= $subjectsText;
    $emailContent .= "Message:\n$message\n";
    
    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send email
    $mailSent = mail($to, $subject, $emailContent, $headers);
    
    // Return JSON response
    header('Content-Type: application/json');
    
    if ($mailSent) {
        echo json_encode(['success' => true, 'message' => 'Thank you for your message! We will get back to you soon.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Sorry, there was an error sending your message. Please try again later.']);
    }
    exit;
}

// If not a POST request, redirect to the contact page
header("Location: contact.html");
exit;