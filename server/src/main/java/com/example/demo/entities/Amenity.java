package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "amenities")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Amenity {
    @Id // @Id sẽ định nghĩa field nào là primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @GeneratedValue sẽ định nghĩa cách giá trị id được tạo, với strategy = như code thì hiểu đơn giản là thêm hàng mới thì id + 1
    @Column(name="id") // @Column sẽ định nghĩa tên của column trong CSDL
    private Long amenityId;
    private String name;
    private String description;
}
