package com.AuthForm.Entites;

import jakarta.persistence.*;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String Comment;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    public Comment(int id, String comment, User user) {
        this.id = id;
        Comment = comment;
        this.user = user;
    }

    public Comment() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getComment() {
        return Comment;
    }

    public void setComment(String comment) {
        Comment = comment;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", Comment='" + Comment + '\'' +
                ", user=" + user +
                '}';
    }
}
