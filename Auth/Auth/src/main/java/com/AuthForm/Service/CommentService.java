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

    public Comment saveComment(String email, String content) {

        com.AuthForm.Entites.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        if (commentRepository.existsById(user.getId())) {
            throw new RuntimeException("Error: You can only post one comment!");
        }


        Comment comment = new Comment();
        comment.setContent(content);
        comment.setUser(user);
        return commentRepository.save(comment);
    }

}
