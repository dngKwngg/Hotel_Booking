package com.example.demo.repository;

import com.example.demo.enitties.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Đánh dấu đây là một Repository
//? đầu tiên là chính là Entity
//? thứ 2 là kiểu dữ liệu của trường ID trong Entity đấy
//UserRepository sẽ ứng với Entity User, và Id có kiểu Long
//Nó có 1 số method rất khôn
//       .findAll() -> tìm tất cả user
//      .findById(id) -> tìm user có id = id
//      .save(User nào đó) -> tạo 1 user mới
public interface UserRepository extends JpaRepository<User, Long> {
}
