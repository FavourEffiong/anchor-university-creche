<?php
require_once __DIR__ . '/../config.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $role = $_POST['role'] ?? '';
    $value = $_POST['value'] ?? '';
    if (!in_array($role, ['staff', 'parent']) || !in_array($value, ['0', '1', 0, 1])) {
        echo json_encode(['success' => false, 'message' => 'Invalid input.']);
        exit;
    }
    $key = $role . '_registration_enabled';
    $stmt = $pdo->prepare('UPDATE settings SET value = ? WHERE `key` = ?');
    $stmt->execute([$value, $key]);
    echo json_encode(['success' => true, 'message' => ucfirst($role) . ' registration ' . ($value ? 'enabled' : 'disabled') . '.']);
    exit;
}

// GET: return current settings
$stmt = $pdo->query('SELECT `key`, value FROM settings WHERE `key` IN ("staff_registration_enabled", "parent_registration_enabled")');
$settings = [
    'staff_registration_enabled' => '1',
    'parent_registration_enabled' => '1'
];
foreach ($stmt as $row) {
    $settings[$row['key']] = $row['value'];
}
echo json_encode(['success' => true] + $settings); 