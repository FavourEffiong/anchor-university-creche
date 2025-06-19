<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/email.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    if (!$email) {
        echo json_encode(['success' => false, 'message' => 'Email is required.']);
        exit;
    }

    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'No user found with that email.']);
        exit;
    }

    $token = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));
    $stmt = $pdo->prepare('INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)');
    $stmt->execute([$user['id'], $token, $expires]);

    $reset_link = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/reset_password.php?token=$token";
    $subject = 'Password Reset Request';
    $body = "<p>Click the link below to reset your password:</p><p><a href='$reset_link'>$reset_link</a></p>";
    send_email($email, $subject, $body);

    echo json_encode(['success' => true, 'message' => 'Password reset link sent.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
} 