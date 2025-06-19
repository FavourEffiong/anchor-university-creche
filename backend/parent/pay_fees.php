<?php
require_once __DIR__ . '/../config.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'parent') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fee_id = $_POST['fee_id'] ?? '';
    $amount = $_POST['amount'] ?? '';
    $method = $_POST['method'] ?? 'online';

    if (!$fee_id || !$amount) {
        echo json_encode(['success' => false, 'message' => 'Invalid input.']);
        exit;
    }

    try {
        $pdo->beginTransaction();
        $stmt = $pdo->prepare('INSERT INTO payments (parent_id, fee_id, amount, method, status) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$_SESSION['user_id'], $fee_id, $amount, $method, 'completed']);
        $pdo->prepare('UPDATE fees SET status = ? WHERE id = ?')->execute(['paid', $fee_id]);
        $pdo->commit();
        echo json_encode(['success' => true, 'message' => 'Payment successful.']);
    } catch (PDOException $e) {
        $pdo->rollBack();
        echo json_encode(['success' => false, 'message' => 'Payment failed.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
} 