package br.edu.ufop.web.sales.controller;

import br.edu.ufop.web.sales.dto.SaleDTO;
import br.edu.ufop.web.sales.domain.Sale;
import br.edu.ufop.web.sales.service.SaleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/sales")
@RequiredArgsConstructor
public class SaleController {

    private final SaleService saleService;

    @GetMapping("/status")
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.ok("Sales service is running.");
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Sale> createSale(@Valid @RequestBody SaleDTO saleDTO) {
        Sale createdSale = saleService.createSale(saleDTO);
        return new ResponseEntity<>(createdSale, HttpStatus.CREATED);
    }

    // READ (All)
    @GetMapping
    public ResponseEntity<List<Sale>> getAllSales() {
        List<Sale> sales = saleService.getAllSales();
        return ResponseEntity.ok(sales);
    }

    // READ (By Id)
    @GetMapping("/{id}")
    public ResponseEntity<Sale> getSaleById(@PathVariable UUID id) {
        Sale sale = saleService.getSaleById(id);
        return ResponseEntity.ok(sale);
    }
    
    // READ (By User Id)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Sale>> getSalesByUserId(@PathVariable UUID userId) {
        List<Sale> sales = saleService.getSalesByUserId(userId);
        return ResponseEntity.ok(sales);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Sale> updateSale(@PathVariable UUID id, @Valid @RequestBody SaleDTO saleDetails) {
        Sale updatedSale = saleService.updateSale(id, saleDetails);
        return ResponseEntity.ok(updatedSale);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable UUID id) {
        saleService.deleteSale(id);
        return ResponseEntity.noContent().build(); // Retorna 204 No Content
    }
}