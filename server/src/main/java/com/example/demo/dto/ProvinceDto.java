package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // thay thế cho việc viết getter, setter, toString, hashCode
@AllArgsConstructor // tạo constructor với tất cả các biến
@NoArgsConstructor // tạo constructor không tham số
public class ProvinceDto {
    private Long provinceId;
    private String name;
    private String description;
}
