package com.parasol.BaaS.api_param;

import com.parasol.BaaS.api_model.AccountInfo;
import com.parasol.BaaS.api_model.LoginInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@ToString(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class WithdrawParam extends LoginInfo {
    private String accountPassword;
    private Long amount;
    private AccountInfo accountFrom;
    private String nameTo;
}
