package com.parasol.core.api_model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@ApiModel("AccountInfo")
public class AccountInfo {
    @ApiModelProperty(name = "bank_name", example = "피피쿠스은행")
    private String bankName;
    @ApiModelProperty(name = "bank_account_number", example = "639")
    private String bankAccountNumber;
}