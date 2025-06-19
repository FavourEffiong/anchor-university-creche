<?php
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? 'parent';

    if (!$name || !$email || !$password || !in_array($role, ['admin', 'staff', 'parent'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid input.']);
        exit;
    }

    // Check registration settings
    $stmt = $pdo->prepare('SELECT value FROM settings WHERE `key` = ?');
    $key = $role . '_registration_enabled';
    $stmt->execute([$key]);
    $setting = $stmt->fetch();
    if (!$setting || $setting['value'] != '1') {
        echo json_encode(['success' => false, 'message' => ucfirst($role) . ' registration is currently disabled.']);
        exit;
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
        $stmt->execute([$name, $email, $hash, $role]);
        echo json_encode(['success' => true, 'message' => 'Registration successful.']);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            echo json_encode(['success' => false, 'message' => 'Email already exists.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Registration failed.']);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
} 