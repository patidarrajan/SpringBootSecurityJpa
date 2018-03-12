package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.ExamPaper;
import com.example.repo.ExamPapersRepository;

@Repository
@Transactional
public class ExamPapersService {

	@Autowired
	private ExamPapersRepository examPapersRepository;

	public List<ExamPaper> getAllPapers() {
		return examPapersRepository.findAll();
	}

	public ExamPaper getPaperById(Integer id) {
		return examPapersRepository.findById(id);
	}

	public ExamPaper addPaper(ExamPaper examPaper) {
		return examPapersRepository.save(examPaper);
	}

	public ExamPaper updatePaper(ExamPaper examPaper) {
		return examPapersRepository.save(examPaper);
	}

	public void deletePaper(Integer id) {
		examPapersRepository.deleteById(id);
	}
}