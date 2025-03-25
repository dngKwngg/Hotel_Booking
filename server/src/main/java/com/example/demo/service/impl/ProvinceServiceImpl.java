package com.example.demo.service.impl;

import com.example.demo.dto.ProvinceDto;
import com.example.demo.enitties.Province;
import com.example.demo.mapper.ProvinceMapper;
import com.example.demo.repository.ProvinceRepository;
import com.example.demo.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service // Đánh dấu đây là một Service
public class ProvinceServiceImpl implements ProvinceService {
    private final ProvinceRepository provinceRepository;

    @Autowired // Tiêm ProvinceRepository vào
    public ProvinceServiceImpl(ProvinceRepository provinceRepository) {
        this.provinceRepository = provinceRepository;
    }

    @Override
    public ProvinceDto getProvinceById(Long id) {
        Province province = provinceRepository.findById(id).orElseThrow(() -> new RuntimeException("Province not found"));
        return ProvinceMapper.mapToProvinceDto(province);

    }

    @Override
    public ProvinceDto createProvince(ProvinceDto provinceDto) {
        Province province = ProvinceMapper.mapTpProvince(provinceDto);
        Province savedProvince = provinceRepository.save(province);
        return ProvinceMapper.mapToProvinceDto(savedProvince);
    }

    @Override
    public ProvinceDto updateProvince(Long id, ProvinceDto provinceDto) {
        Province province = provinceRepository.findById(id).orElseThrow(() -> new RuntimeException("Province not found"));
        province.setName(provinceDto.getName());
        province.setDescription(provinceDto.getDescription());

        Province savedProvince = provinceRepository.save(province);
        return ProvinceMapper.mapToProvinceDto(province);
    }

    @Override
    public void deleteProvince(Long id) {
        Province province = provinceRepository.findById(id).orElseThrow(() -> new RuntimeException("Province not found"));
        provinceRepository.deleteById(id);
    }

    @Override
    public List<ProvinceDto> getAllProvinces() {
        List<Province> provinces = provinceRepository.findAll();
        // Dùng stream để convert từ List<Province> sang List<ProvinceDto>
        //collect(Collectors.toList()) -> chuyển stream về List
        return provinces.stream().map(province -> ProvinceMapper.mapToProvinceDto(province)).collect(Collectors.toList());
    }



}
