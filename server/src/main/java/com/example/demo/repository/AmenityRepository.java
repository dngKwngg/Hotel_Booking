package com.example.demo.repository;

import com.example.demo.entities.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
// Amenity là tên entity trong project
// Long là kiểu dữ liệu của khóa chính trong entity Amenity
public interface AmenityRepository extends JpaRepository<Amenity, Long> {
}
