<?php
require_once __DIR__ . '/../config.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized.']);
    exit;
}

// Handle enable/disable actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_POST['user_id'] ?? '';
    $action = $_POST['action'] ?? '';
    if (!$user_id || !in_array($action, ['enable', 'disable'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid input.']);
        exit;
    }
    $active = $action === 'enable' ? 1 : 0;
    $stmt = $pdo->prepare('UPDATE users SET active = ? WHERE id = ? AND role IN ("parent", "staff")');
    $stmt->execute([$active, $user_id]);
    echo json_encode(['success' => true, 'message' => 'User status updated.']);
    exit;
}

// List users
$stmt = $pdo->query('SELECT id, name, email, role, created_at, active FROM users ORDER BY created_at DESC');
$users = $stmt->fetchAll();
echo json_encode(['success' => true, 'users' => $users]); 