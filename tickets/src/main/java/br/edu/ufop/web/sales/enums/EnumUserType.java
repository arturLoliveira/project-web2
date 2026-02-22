package br.edu.ufop.web.sales.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum EnumUserType {
    CUSTOMER(1, "Customer"),
    ENTERPRISE(2, "Enterprise"),
    ADMIN(3, "Admin");
    private Integer id;
    private String description;
}
