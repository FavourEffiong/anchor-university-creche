<?php
require_once __DIR__ . '/../config.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'staff') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized.']);
    exit;
}

$stmt = $pdo->query('SELECT children.*, users.name AS parent_name, users.email AS parent_email FROM children JOIN users ON children.parent_id = users.id ORDER BY children.created_at DESC');
$children = $stmt->fetchAll();
echo json_encode(['success' => true, 'children' => $children]); 