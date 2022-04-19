package com.parasol.core.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionSeq;

    private Long transactionDate;
    private String transactionType;
    private Long transactionAmount;
    private String transactionAccount;

    @ManyToOne
    @JoinColumn(name = "account_no")
    private Account account;
}
