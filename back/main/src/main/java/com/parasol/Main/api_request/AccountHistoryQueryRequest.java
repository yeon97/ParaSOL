package com.parasol.Main.api_request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@ApiModel("AccountHistoryQueryRequest")
public class AccountHistoryQueryRequest{
    @ApiModelProperty(name = "account_no", example = "110-437-525252")
    @NotBlank
    private String accountNo;
}
