package com.parasol.Main.api_request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@ToString
@ApiModel("AccountBalanceQueryRequest")
public class AccountBalanceQueryRequest{
    @ApiModelProperty(name = "account_number", example = "110-437-525252")
    @NotBlank
    @Size(max = 14, min = 14)
    private String accountNumber;

    @ApiModelProperty(name="id", example = "nini6630")
    @NotBlank
    private String bankId;
    @NotBlank
    @ApiModelProperty(name="password", example = "1q2w3e4r")
    private String bankPassword;

//
//    @ApiModelProperty(name="account_password", example = "1234")
//    @NotBlank
//    @Size(max = 4, min = 4)
//    private String accountPassword;
}
