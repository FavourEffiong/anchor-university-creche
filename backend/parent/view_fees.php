<?php
require_once __DIR__ . '/../config.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'parent') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized.']);
    exit;
}

$stmt = $pdo->prepare('SELECT fees.*, children.name AS child_name FROM fees JOIN children ON fees.child_id = children.id WHERE children.parent_id = ? ORDER BY due_date DESC');
$stmt->execute([$_SESSION['user_id']]);
$fees = $stmt->fetchAll();
echo json_encode(['success' => true, 'fees' => $fees]); 