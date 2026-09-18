<?php

    $metodo = $_SERVER['REQUEST_METHOD'];

    $rota = $_GET['rota'];

    if($metodo == 'POST' && $rota == '/cadastro')
        {
            require_once __DIR__. './../models/cadastro.php';
        }
    else
        {
            http_response_code(400);

            echo json_encode([
                'Status' => "false",
                'Mensagem' => 'ERRO!? não foi encontrado o caminho'
            ])
        }