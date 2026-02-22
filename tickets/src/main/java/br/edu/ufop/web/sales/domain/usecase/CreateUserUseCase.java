package br.edu.ufop.web.sales.domain.usecase;

import br.edu.ufop.web.sales.domain.User;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
public class CreateUserUseCase {

    private User userDomain;

    public void validate() {
        validateName();

    }

    private void validateName() {
        if (this.userDomain.getName() == null) {
            throw new RuntimeException("Name is null");
        }
    }



}