package main;

import com.owlike.genson.Context;
import com.owlike.genson.Converter;
import com.owlike.genson.stream.ObjectReader;
import com.owlike.genson.stream.ObjectWriter;

public class QuestionConverter implements Converter<Question> {

    public void serialize(Question question, ObjectWriter writer, Context ctx) {
        writer.beginObject();
        writer.writeNumber("id", question.getId())
                .writeString("question", question.getQuestion())
                .writeString("gryffindorAnswer", question.getGryffindorAnswer())
                .writeString("ravenclawAnswer", question.getRavenclawAnswer())
                .writeString("slytherinAnswer", question.getSlytherinAnswer())
                .writeString("hufflepuffAnswer", question.getHufflepuffAnswer());
        writer.endObject();
    }

    public Question deserialize(ObjectReader reader, Context ctx) {
        Question question = new Question();
        reader.beginObject();

        while (reader.hasNext()) {
            reader.next();
            if ("id".equals(reader.name())) question.setId(reader.valueAsInt());
            else if ("question".equals(reader.name())) question.setQuestion(reader.valueAsString());
            else if ("gryffindorAnswer".equals(reader.name())) question.setGryffindorAnswer(reader.valueAsString());
            else if ("ravenclawAnswer".equals(reader.name())) question.setRavenclawAnswer(reader.valueAsString());
            else if ("slytherinAnswer".equals(reader.name())) question.setSlytherinAnswer(reader.valueAsString());
            else if ("hufflepuffAnswer".equals(reader.name())) question.setHufflepuffAnswer(reader.valueAsString());
            else reader.skipValue();
        }

        reader.endObject();
        return question;
    }
}
