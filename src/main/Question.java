package main;

public class Question {
    private int id;
    private String question;
    private String gryffindorAnswer;
    private String ravenclawAnswer;
    private String slytherinAnswer;
    private String hufflepuffAnswer;

    public Question(){}

    public Question(int id, String question, String gryffindorAnswer, String ravenclawAnswer, String slytherinAnswer, String hufflepuffAnswer) {
        this.id = id;
        this.question = question;
        this.gryffindorAnswer = gryffindorAnswer;
        this.ravenclawAnswer = ravenclawAnswer;
        this.slytherinAnswer = slytherinAnswer;
        this.hufflepuffAnswer = hufflepuffAnswer;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getGryffindorAnswer() {
        return gryffindorAnswer;
    }

    public void setGryffindorAnswer(String gryffindorAnswer) {
        this.gryffindorAnswer = gryffindorAnswer;
    }

    public String getRavenclawAnswer() {
        return ravenclawAnswer;
    }

    public void setRavenclawAnswer(String ravenclawAnswer) {
        this.ravenclawAnswer = ravenclawAnswer;
    }

    public String getSlytherinAnswer() {
        return slytherinAnswer;
    }

    public void setSlytherinAnswer(String slytherinAnswer) {
        this.slytherinAnswer = slytherinAnswer;
    }

    public String getHufflepuffAnswer() {
        return hufflepuffAnswer;
    }

    public void setHufflepuffAnswer(String hufflepuffAnswer) {
        this.hufflepuffAnswer = hufflepuffAnswer;
    }
}
