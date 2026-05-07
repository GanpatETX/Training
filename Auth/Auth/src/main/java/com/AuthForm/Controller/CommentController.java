package com.AuthForm.Controller;

import com.AuthForm.Entites.Comment;
import com.AuthForm.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<?> postComment(@RequestBody String content, @RequestParam int userId) {
        try {
            Comment savedComment = commentService.createComment(userId, content);
            return ResponseEntity.ok(savedComment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
