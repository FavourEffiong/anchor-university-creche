<?php
require_once __DIR__ . '/../config.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'parent') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized.']);
    exit;
}

$stmt = $pdo->prepare('SELECT * FROM children WHERE parent_id = ? ORDER BY created_at DESC');
$stmt->execute([$_SESSION['user_id']]);
$children = $stmt->fetchAll();
echo json_encode(['success' => true, 'children' => $children]); 