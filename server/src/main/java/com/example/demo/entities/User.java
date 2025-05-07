package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity //định nghĩa cái class đấy là Entity
@Table(name = "users") //@Table (name = 'users') sẽ định nghĩa entity đấy thuộc table tên là gì trong CSDL
@Data // @Data sẽ thay cho @Getter, @Setter, @toString, @hashCode (k cần code Getter Setter nữa)
@AllArgsConstructor // @AllArgsConstructor là cho phép tạo constructor với tất cả các biến ở đây
//Thay cho việc gõ public User(Long id, String email, String username, String firstName, String lastName){...}
@NoArgsConstructor //@NoArgsConstructor thì cho phép tạo constructor k tham số public User(){}
public class User {
    @Id // @Id sẽ định nghĩa field nào là primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @GeneratedValue sẽ định nghĩa cách giá trị id được tạo, với strategy = như code thì hiểu đơn giản là thêm hàng mới thì id + 1
    @Column(name="id")
    private Long userId;

    @Column(unique = true, nullable = false)
    private String email;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    // nên đặt tên biến theo convention
    // tên biến trong class sẽ là firstName, nhưng trong CSDL sẽ là first_name
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    private String nationality;

    private String role;
}
