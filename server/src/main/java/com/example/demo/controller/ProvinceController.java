package com.example.demo.controller;

import com.example.demo.dto.ProvinceDto;
import com.example.demo.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // cho phép controller gọi đến api
@RequestMapping("${api.version}/provinces") // dẫn đến api localhost:8080/api/v1/provinces
public class ProvinceController {
    private ProvinceService provinceService;

    @Autowired // Tiêm ProvinceService vào dùng để gọi các hàm trong ProvinceService
    public ProvinceController(ProvinceService provinceService) {
        this.provinceService = provinceService;
    }

    @GetMapping //GET /api/v1/provinces
    public List<ProvinceDto> getAllProvinces() {
        return provinceService.getAllProvinces();
    }

    @GetMapping("/{id}") //GET /api/v1/provinces/{id}
    // PathVariable tự đọc đc {id}
    public ProvinceDto getProvinceById(Long id) {
        return provinceService.getProvinceById(id);
    }

    @PostMapping // POST /api/v1/provinces ( phải post cái gì đó lên)
    @ResponseStatus(HttpStatus.CREATED) // trả về status 201
    // @RequestBody -> đọc cái gì đó từ body của request
    public ProvinceDto createProvince(@RequestBody ProvinceDto provinceDto) {
        return provinceService.createProvince(provinceDto);
    }

    @PutMapping("/{id}") // PUT /api/v1/provinces/{id} sửa thông tin province có id = id
    // PathVariable tự đọc đc {id}
    // @RequestBody -> đọc cái gì đó từ body của request
    public ProvinceDto updateProvince(@PathVariable Long id, @RequestBody ProvinceDto provinceDto) {
        return provinceService.updateProvince(id, provinceDto);
    }

    @DeleteMapping("/{id}") // DELETE /api/v1/provinces/{id} xóa province có id = id
    // ResponseEntity<?> hỗ trợ trả về các kiểu có thể có của response
    public ResponseEntity<?> deleteProvince(@PathVariable Long id) {
        provinceService.deleteProvince(id);
        return ResponseEntity.ok("Province deleted");
    }
}
