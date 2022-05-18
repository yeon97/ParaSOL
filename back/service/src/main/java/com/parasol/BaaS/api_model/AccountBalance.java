package com.parasol.BaaS.api_model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public class AccountBalance {
    private String bankName;
    private String bankAccountNumber;
    private Long bankAccountBalance;
}
