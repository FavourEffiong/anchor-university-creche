<?php
require_once __DIR__ . '/../config.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'parent') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized.']);
    exit;
}

$stmt = $pdo->prepare('SELECT payments.*, fees.amount AS fee_amount, fees.due_date FROM payments JOIN fees ON payments.fee_id = fees.id WHERE payments.parent_id = ? ORDER BY payment_date DESC');
$stmt->execute([$_SESSION['user_id']]);
$payments = $stmt->fetchAll();
echo json_encode(['success' => true, 'payments' => $payments]); 