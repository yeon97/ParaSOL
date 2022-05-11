package com.parasol.BaaS.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.parasol.BaaS.api_model.AccountInfo;
import com.parasol.BaaS.api_request.*;
import com.parasol.BaaS.api_response.*;
import com.parasol.BaaS.db.entity.BankConnection;
import com.parasol.BaaS.db.entity.User;
import com.parasol.BaaS.db.repository.BankConnectionRepository;
import com.parasol.BaaS.enums.TransactionType;
import com.parasol.BaaS.modules.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class AccountService {

    @Autowired
    BankConnectionRepository bankConnectionRepository;

    @Autowired
    BankLoginRequestFactory bankLoginRequestFactory;

    @Autowired
    QueryAccountBalanceRequestFactory queryAccountBalanceRequestFactory;

    @Autowired
    QueryAccountListRequestFactory queryAccountListRequestFactory;

    @Autowired
    QueryAccountHistoryRequestFactory queryAccountHistoryRequestFactory;

    @Autowired
    DepositRequestFactory depositRequestFactory;

    @Autowired
    WithdrawRequestFactory withdrawRequestFactory;

    public AccountBalanceQueryResultResponse getBalance(QueryAccountBalanceRequest request) {
        String bankName = request.getBankName();
        String accountNo = request.getAccountNumber();

        try {
            if (!bankName.equals("SBJ")) throw new IllegalArgumentException("We can support SBJ Bank only.");

            AccountBalanceQueryResultResponse response = queryAccountBalanceRequestFactory.create(request);
            return response;
        } catch (JsonProcessingException e) {
            System.out.println(e.toString());
            return null;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    public Mono<AccountListQueryResultResponse> getAccountList(User user, String bankName) {
        BankConnection bankConnection = bankConnectionRepository
                .findByUser_UserSeqAndBankName(user.getUserSeq(), bankName)
                .orElseThrow(IllegalStateException::new);

        QueryAccountListRequest queryRequest = QueryAccountListRequest.builder()
                .bankName(bankName)
                .id(bankConnection.getBankId())
                .password(bankConnection.getBankPassword())
                .build();

        if (!bankName.equals("SBJ")) throw new IllegalArgumentException("We can support SBJ Bank only.");
        return queryAccountListRequestFactory.create(queryRequest)
                .filter(Objects::nonNull)
                .flatMap(rawBankAccounts -> {
                    List<AccountInfo> wrappedBankAccounts = rawBankAccounts
                            .stream()
                            .map(accountNumber -> AccountInfo.builder()
                                    .accountNumber(accountNumber)
                                    .build())
                            .collect(Collectors.toList());

                    return Mono.just(
                            AccountListQueryResultResponse.builder()
                                .bankName(bankName)
                                .bankAccounts(wrappedBankAccounts)
                                .build()
                    );
                });
    }

    public AccountHistoryQueryResultResponse getAccountHistory(QueryAccountHistoryRequest request) {
        String bankName = request.getBankName();
        String bankAccountNumber = request.getAccountNumber();

        try {
            if (!bankName.equals("SBJ")) throw new IllegalArgumentException("We can support SBJ Bank only.");

            AccountHistoryQueryResultResponse response = queryAccountHistoryRequestFactory.create(request);
            return response;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    public TransactionExecuteResultResponse deposit(DepositRequest request) {
        TransactionType method = request.getMethod();
        Long amount = request.getAmount();
        AccountInfo accountFrom = request.getAccountFrom();
        AccountInfo accountTo = request.getAccountTo();

        try {
            TransactionExecuteResultResponse response = depositRequestFactory.create(request);
            return response;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    public TransactionExecuteResultResponse withdraw(WithdrawRequest request) {
        TransactionType method = request.getMethod();
        Long amount = request.getAmount();
        AccountInfo accountFrom = request.getAccountFrom();
        AccountInfo accountTo = request.getAccountTo();

        try {
            TransactionExecuteResultResponse response = withdrawRequestFactory.create(request);
            return response;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

}
