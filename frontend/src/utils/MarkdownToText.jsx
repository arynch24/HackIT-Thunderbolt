import React from 'react';
import { marked } from 'marked';

const MarkdownToText = ({ markdown }) => {
  const convertMarkdownToText = (markdown) => {
    const html = marked.parse(markdown); // Convert Markdown to HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html; // Add HTML to a temporary element
    return tempDiv.textContent || tempDiv.innerText || ''; // Extract text content
  };

  return <p>{convertMarkdownToText(markdown)}</p>;
};

export default MarkdownToText;
