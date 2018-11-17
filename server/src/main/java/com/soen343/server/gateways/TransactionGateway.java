package com.soen343.server.gateways;

import org.springframework.stereotype.Service;

@Service
public class TransactionGateway {

    private TransactionGateway transactionGateway = null;

    private TransactionGateway() {}

    public TransactionGateway getGateway() {
        if (transactionGateway == null) {
            transactionGateway = new TransactionGateway();
        }
        return transactionGateway;
    }
}
