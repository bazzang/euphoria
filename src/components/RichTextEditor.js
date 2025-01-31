import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // 기본 스타일

const RichTextEditor = () => {
  const [value, setValue] = useState("");

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    console.log("Content:", content); // 작성된 텍스트를 확인
  };

  return (
    <div>
      <h3>글귀</h3>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ 'font': [] }],
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        formats={[
          'font', 'header',
          'bold', 'italic', 'underline', 'strike',
          'color', 'background',
          'align',
          'blockquote', 'code-block',
          'list', 'bullet',
          'link', 'image',
        ]}
      />
      <div>
        <h4>미리보기:</h4>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    </div>
  );
};

export default RichTextEditor;
