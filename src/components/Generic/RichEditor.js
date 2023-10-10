import React, { useEffect } from "react";
import { useState } from "react";
import RichTextEditor from "react-rte";
const RichEditor = ({ setEditorDesc, editorDesc, modalOpen, isReadOnly }) => {
  const [editorText, setEditorText] = useState(
    RichTextEditor.createValueFromString(editorDesc, "html")
  );

  const handleChange = (val) => {
    setEditorText(val);
    setEditorDesc(val);
  };
  useEffect(() => {
    if (editorDesc) {
      console.log("description change,", editorDesc);
      setEditorDesc(RichTextEditor.createValueFromString(editorDesc, "html"));
      setEditorText(RichTextEditor.createValueFromString(editorDesc, "html"));
    }
  }, [editorDesc]);
  return (
    <RichTextEditor
      readOnly={isReadOnly}
      className="default h-56 w-full py-2 rounded-full border border-gray-500 mb-4 overflow-y-scroll"
      value={editorText}
      onChange={(val) => handleChange(val)}
    />
  );
};

export default RichEditor;
