package com.example.demo.repository;

import com.example.demo.enitties.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // đánh dấu là 1 Repository
// giao tiếp với CSDL mà k cần viết câu lệnh SQL (có sẵn)
// dùng để thao tác với CSDL thông qua các method có sẵn
// (findAll, findById, save, delete, count, exists)
// JpaRepository<Province, Long> -> Province là Entity,
// Long là kiểu dữ liệu của trường ID trong Entity đó ( khóa chính)
public interface ProvinceRepository extends JpaRepository<Province, Long> {
}
