package com.example.repo;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.ExamPaper;

@Repository
@Transactional
public interface ExamPapersRepository extends JpaRepository<ExamPaper, String> {

	@Override
	public List<ExamPaper> findAll();

	public ExamPaper findById(Integer id);

	@Override
	public ExamPaper save(ExamPaper userInfo);

	public void deleteById(Integer id);

}
