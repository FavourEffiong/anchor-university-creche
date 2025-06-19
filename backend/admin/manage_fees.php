<?php
require_once __DIR__ . '/../config.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized.']);
    exit;
}

$stmt = $pdo->query('SELECT fees.*, children.name AS child_name, users.name AS parent_name FROM fees JOIN children ON fees.child_id = children.id JOIN users ON children.parent_id = users.id ORDER BY due_date DESC');
$fees = $stmt->fetchAll();
echo json_encode(['success' => true, 'fees' => $fees]); 