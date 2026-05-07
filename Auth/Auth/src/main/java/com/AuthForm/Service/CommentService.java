package com.AuthForm.Service;

import com.AuthForm.Entites.Comment;
import com.AuthForm.Entites.User;
import com.AuthForm.Repo.CommentRepo;
import com.AuthForm.Repo.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    @Autowired
    private CommentRepo commentRepository;

    @Autowired
    private userRepo userRepository;

    public Comment createComment(int userId, String content) {
        // 1. Check if user already has a comment
        if (commentRepository.existsById(userId)) {
            throw new RuntimeException("You can only create one comment!");
        }

        // 2. Fetch the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3. Create and link comment
        Comment comment = new Comment();
        comment.setComment(content);
        comment.setUser(user);

        return commentRepository.save(comment);
    }
}
