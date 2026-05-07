package com.AuthForm.Controller;

import com.AuthForm.Entites.Comment;
import com.AuthForm.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
//@CrossOrigin(origins =  "http://127.0.0.1:3000")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody String content, Authentication auth) {
        try {
            // Get email from session automatically
            Comment saved = commentService.saveComment(auth.getName(), content);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            // Returns "You can only post one comment!" to frontend
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }





}
