---
title: Protocol Audit Report
author: Artem Chornyi
date: July 21, 2024
header-includes:
  - \usepackage{titling}
  - \usepackage{graphicx}
---

\begin{titlepage}
    \centering
    \begin{figure}[h]
        \centering
    \end{figure}
    \vspace*{2cm}
    {\Huge\bfseries Protocol Audit Report\par}
    \vspace{1cm}
    {\Large Version 1.0\par}
    \vspace{2cm}
    {\Large\itshape Chornyi.io\par}
    \vfill
    {\large \today\par}
\end{titlepage}

\maketitle

<!-- Your report starts here! -->

Prepared by: [Artem Chornyi](https://x.com/ChucklerTom)
Lead Auditors: 
- Artem Chornyi

# Table of Contents
- [Table of Contents](#table-of-contents)
- [Protocol Summary](#protocol-summary)
- [Disclaimer](#disclaimer)
- [Risk Classification](#risk-classification)
- [Audit Details](#audit-details)
  - [Scope](#scope)
  - [Roles](#roles)
- [Executive Summary](#executive-summary)
  - [Issues found](#issues-found)
- [Findings](#findings)
  - [High](#high)
    - [\[H-1\] Passwords Stored On-Chain are Visible to Everyone](#h-1-passwords-stored-on-chain-are-visible-to-everyone)
    - [\[H-2\] `PasswordStore::setPassword` is Callable by Anyone](#h-2-passwordstoresetpassword-is-callable-by-anyone)
  - [Medium](#medium)
  - [Low](#low)
    - [\[L-2\] Initialization Timeframe Vulnerability](#l-2-initialization-timeframe-vulnerability)
  - [Informational](#informational)
    - [\[I-1\] Incorrect Natspec for `PasswordStore::getPassword`](#i-1-incorrect-natspec-for-passwordstoregetpassword)
  - [Gas](#gas)

# Protocol Summary

PasswordStore is a protocol designed to store and recover user passwords. The protocol is intended for use by a single user and is not intended for use by multiple users. Only the owner should be able to set and access this password.

# Disclaimer

The Artem Chornyi team makes all effort to find as many vulnerabilities in the code in the given time period, but holds no responsibilities for the findings provided in this document. A security audit by the team is not an endorsement of the underlying business or product. The audit was time-boxed and the review of the code was solely on the security aspects of the Solidity implementation of the contracts.

# Risk Classification

|            |        | Impact |        |     |
| ---------- | ------ | ------ | ------ | --- |
|            |        | High   | Medium | Low |
|            | High   | H      | H/M    | M   |
| Likelihood | Medium | H/M    | M      | M/L |
|            | Low    | M      | M/L    | L   |

We use the [CodeHawks](https://docs.codehawks.com/hawks-auditors/how-to-evaluate-a-finding-severity) severity matrix to determine severity. See the documentation for more details.

# Audit Details 

**The findings described in  this document correspond the following commit hash:**
```
7d55682ddc4301a7b13ae9413095feffd9924566
```

## Scope

```
./src/
|-- PasswordStore.sol
```

## Roles

Owner: The user who can set the password and read the password.
Outsiders: No one else should be able to set or read the password.

# Executive Summary

The security audit for the PasswordStore smart contract was conducted to evaluate its security posture and identify potential vulnerabilities. This audit was performed by a dedicated team of one security researcher over the course of two day. The team conducted a thorough review, including manual code analysis and automated security testing tools, to ensure comprehensive coverage of potential security issues.

## Issues found

| Severtity | Number of issues dound |
| --------- | ---------------------- |
| High      | 2                      |
| Medium    | 0                      |
| Low       | 1                      |
| Info      | 1                      |
| Total     | 4                      |

# Findings
## High

### [H-1] Passwords Stored On-Chain are Visible to Everyone

**Description:** All data stored on the blockchain is publicly accessible and can be directly read by anyone. The `PasswordStore::s_password` variable is designed to be private and should only be accessed via the `PasswordStore::getPassword` function, which is intended for use only by the contract owner. However, this variable can be read directly through various off-chain methods.

**Impact:** The password is not private.

**Proof of Concept:** The following test case demonstrates how anyone can read the password directly from the blockchain. We use the [foundry's cast](https://github.com/foundry-rs/foundry) tool to read from the contract's storage without being the owner.

1. Create a locally running chain:
    ```bash
    make anvil
    ```

2. Deploy the contract to the chain:
    ```bash
    make deploy 
    ```

3. Run the storage tool:
    ```bash
    cast storage <ADDRESS_HERE> 1 --rpc-url http://127.0.0.1:8545
    ```

This command returns an output similar to:
    ```
    0x6d7950617373776f726400000000000000000000000000000000000000000014
    ```

You can convert this hex value to a string with:
    ```bash
    cast parse-bytes32-string 0x6d7950617373776f726400000000000000000000000000000000000000000014
    ```

Resulting in:
    ```
    myPassword
    ```

**Recommended Mitigation:** The contract's overall architecture should be revised. One approach is to encrypt the password off-chain and store only the encrypted version on-chain. This would require users to remember an off-chain password to decrypt the stored password. Additionally, removing the view function is advisable to prevent users from accidentally revealing the password in a transaction.

### [H-2] `PasswordStore::setPassword` is Callable by Anyone

**Description:** The `PasswordStore::setPassword` function is declared as `external`, but the function's documentation states that only the owner should be able to set a new password.

```javascript
    function setPassword(string memory newPassword) external {
        // @audit - There are no access controls here
        s_password = newPassword;
        emit SetNetPassword();
    }
```

**Impact:** Anyone can set or change the contract's password.

**Proof of Concept:** Add the following to the `PasswordStore.t.sol` test suite:

```javascript
function test_anyone_can_set_password(address randomAddress) public {
    vm.prank(randomAddress);
    string memory expectedPassword = "myNewPassword";
    passwordStore.setPassword(expectedPassword);
    vm.prank(owner);
    string memory actualPassword = passwordStore.getPassword();
    assertEq(actualPassword, expectedPassword);
}
```

**Recommended Mitigation:** Add an access control modifier to the `setPassword` function:

```javascript
if (msg.sender != s_owner) {
    revert PasswordStore__NotOwner();
}
```

## Medium
## Low 

### [L-2] Initialization Timeframe Vulnerability

**Description:** The PasswordStore contract has a vulnerability during the initialization timeframe. Between contract deployment and the explicit call to `setPassword`, the password remains in its default state. Even after fixing this issue, the public nature of blockchain data means the password's visibility cannot be completely hidden.

**Impact:** During the initialization timeframe, the contract's password is empty, potentially allowing unauthorized access or unintended behavior.

**Recommended Mitigation:** To address the initialization timeframe vulnerability, set an initial password value during the contract's deployment (in the constructor). This value can be passed as a parameter to the constructor.

## Informational

### [I-1] Incorrect Natspec for `PasswordStore::getPassword`

**Description:** The natspec comment for the `PasswordStore::getPassword` function incorrectly indicates a parameter that does not exist, causing the documentation to be misleading.

```javascript
    /*
     * @notice This allows only the owner to retrieve the password.
     * @param newPassword The new password to set.
     */
    function getPassword() external view returns (string memory) {
```

**Impact:** The natspec is incorrect.

**Recommended Mitigation:** Remove the incorrect natspec line:

```diff
-     * @param newPassword The new password to set.
```


## Gas 