import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

import React, { useState, useEffect, useContext, useRef,  } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

function FeedbackForm({ handleAdd }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

  const textareaRef = useRef();
  const formRef = useRef();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  useEffect(() => {
    //Handle height of textarea depending on input
    textareaRef.current.style.height = "2.5rem";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
    // Handle button disable and warning that message needs to be at least 10 signs
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Text must be at least 10 characters");
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
  }, [ text]);

  const handleTextArea = (e) => {
    if(e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault()
      formRef.current.requestSubmit();
    }
  }

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };

      if(feedbackEdit.edit) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback);
      }
      setText("");
    }
  };

  return (
    <Card>
      <form ref={formRef} onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <textarea
            onKeyDown={handleTextArea}
            ref={textareaRef}
            onChange={handleTextChange}
            value={text}
            type="text"
            placeholder="Write your review"
          />
          <Button type="submit" version={"secondary"} isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
