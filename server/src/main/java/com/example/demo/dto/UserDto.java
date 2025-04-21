package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//muốn cái chuỗi json trả về thế nào thì add những field đấy vào (đã bỏ trường password đi)
//tại sao phải có cái này
//User là entity, nó k trả về response được
//Nên cái class này sẽ làm thay việc trả về repsonse
//
//Nó trả về json ns chung
//K chỉ có response
// cần post gì đó lên -> dùng Dto
public class UserDto {
    private Long userId;
    private String email;
    private String username;
    private String phoneNumber;
    private String firstName;
    private String lastName;
    private String role;
}
