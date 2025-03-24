package com.example.demo.service;

import com.example.demo.dto.ProvinceDto;

import java.util.List;

//Để định nghĩa các action ý
//Xong sẽ triển khai nó ở 1 file riêng
public interface ProvinceService {
    ProvinceDto getProvinceById(Long id);
    ProvinceDto createProvince(ProvinceDto provinceDto);
    ProvinceDto updateProvince(Long id, ProvinceDto provinceDto);
    void deleteProvince(Long id);
    List<ProvinceDto> getAllProvinces();
}
