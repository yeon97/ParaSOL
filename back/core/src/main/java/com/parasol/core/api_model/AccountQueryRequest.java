package com.parasol.core.api_model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@ToString
@ApiModel("AccountQueryRequest")
public class AccountQueryRequest {
    @NotNull
    private String id;

    @ApiModelProperty(name="account_no", example = "110-437-525252")
    @NotBlank
    @Size(max = 14, min = 14)
    private String accountNo;
}
