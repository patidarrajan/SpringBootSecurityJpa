package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.ExamPaper;
import com.example.service.ExamPapersService;

@RestController
public class ExamPapersController {
	@Autowired
	private ExamPapersService examPaperService;

	@GetMapping("/paper")
	public ResponseEntity<List<ExamPaper>> getAllPapers() {
		List<ExamPaper> examPapers = examPaperService.getAllPapers();
		if (examPapers == null || examPapers.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		examPapers.stream().forEach(paper -> paper.setFilepath(null));
		return new ResponseEntity<>(examPapers, HttpStatus.OK);
	}

	@PostMapping("/paper")
	public ExamPaper addPaper(@RequestBody ExamPaper examPaper) {
		return examPaperService.addPaper(examPaper);
	}

	@PutMapping("/paper/{id}")
	public ExamPaper updatePaper(@RequestBody ExamPaper examPaper, @PathVariable Integer id) {
		return examPaperService.updatePaper(examPaper);
	}

	@DeleteMapping("/paper/{id}")
	public void deletePaper(@PathVariable Integer id) {
		examPaperService.deletePaper(id);
	}

	@GetMapping("/paper/{id}")
	public ResponseEntity<ExamPaper> getPaperById(@PathVariable Integer id) {
		ExamPaper examPaper = examPaperService.getPaperById(id);
		if (examPaper == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(examPaper, HttpStatus.OK);
	}
}
