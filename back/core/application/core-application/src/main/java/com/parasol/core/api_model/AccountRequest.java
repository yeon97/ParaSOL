package com.parasol.core.api_model;

import com.parasol.core.eenum.TransactionType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;

@Getter
@Setter
@ToString
@ApiModel("AccountRequest")
public class AccountRequest {
    @ApiModelProperty(name = "method", example = "0")
    @Nullable
    private TransactionType type;
    @ApiModelProperty(name = "amount", example = "4500000000")
    @PositiveOrZero
    private Long amount;
    @ApiModelProperty(name = "account_from", example = "")
    @Nullable
    private AccountInfo accountFrom;
    @ApiModelProperty(name = "account_to", example = "")
    @Nullable
    private AccountInfo accountTo;
    @ApiModelProperty(name = "name_opponent", example = "")
    @Nullable
    private String nameOpponent;
//    @ApiModelProperty(name = "name_to", example = "")
//    @NotBlank
//    private String nameTo;
//    @ApiModelProperty(name = "name_from", example = "")
//    @NotBlank
//    private String nameFrom;
}
