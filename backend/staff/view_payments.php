<?php
require_once __DIR__ . '/../config.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'staff') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized.']);
    exit;
}

$stmt = $pdo->query('SELECT payments.*, users.name AS parent_name, fees.amount AS fee_amount, fees.due_date FROM payments JOIN users ON payments.parent_id = users.id JOIN fees ON payments.fee_id = fees.id ORDER BY payment_date DESC');
$payments = $stmt->fetchAll();
echo json_encode(['success' => true, 'payments' => $payments]); 