package com.example.demo.enitties;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // định nghĩa class đâ là 1 entity
@Table(name = "provinces") // định nghĩa entity này thuộc table nào trong CSDL
@Data // thay thế cho việc viết getter, setter, toString, hashCode
@AllArgsConstructor // tạo constructor với tất cả các biến
@NoArgsConstructor // tạo constructor không tham số
public class Province {
    @Id // định nghĩa field nào là primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id sẽ tự tăng 1
    private Long id;

    private String name;

    private String description;
}
