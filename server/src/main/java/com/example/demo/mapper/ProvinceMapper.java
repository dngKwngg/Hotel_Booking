package com.example.demo.mapper;

import com.example.demo.dto.ProvinceDto;
import com.example.demo.entities.Province;

public class ProvinceMapper {
    public static ProvinceDto mapToProvinceDto(Province province) {
        return new ProvinceDto(
            province.getId(),
            province.getName(),
            province.getDescription()
        );
    }
    public static Province mapTpProvince(ProvinceDto provinceDto) {
        return new Province(
                provinceDto.getId(),
                provinceDto.getName(),
                provinceDto.getDescription()
        );
    }
}
