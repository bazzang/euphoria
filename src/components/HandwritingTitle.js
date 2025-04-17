// components/HandwritingTitle.js
import React from 'react';
import '../styles/contents.css'; // 아래에 따로 만들거야!

const HandwritingTitle = () => {
  return (
    // <svg viewBox="0 0 500 100" className="handwriting">
    //   <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="handwriting-text">
    //     Euphoria
    //   </text>
    // </svg>
    <svg viewBox="0 0 500 100" className="handwriting">
      <text x="10%" y="50%" className="letter" style={{ animationDelay: '0s' }}>E</text>
      <text x="20%" y="50%" className="letter" style={{ animationDelay: '0.2s' }}>u</text>
      <text x="30%" y="50%" className="letter" style={{ animationDelay: '0.4s' }}>p</text>
      <text x="40%" y="50%" className="letter" style={{ animationDelay: '0.6s' }}>h</text>
      <text x="50%" y="50%" className="letter" style={{ animationDelay: '0.8s' }}>o</text>
      <text x="60%" y="50%" className="letter" style={{ animationDelay: '1.0s' }}>r</text>
      <text x="70%" y="50%" className="letter" style={{ animationDelay: '1.2s' }}>i</text>
      <text x="80%" y="50%" className="letter" style={{ animationDelay: '1.4s' }}>a</text>
      {/* <text x="40" y="65%" className="letter1">E</text> 
      <text x="85" y="60%" className="letter1">V</text>
      <text x="130" y="60%" className="letter1">G</text>
      <text x="190" y="60%" className="letter1">T</text>
      <text x="230" y="65%" className="letter1">E</text>
      <text x="275" y="70%" className="letter1">S</text>
      <text x="320" y="66%" className="letter">T</text> */}
    </svg>

  );
};

export default HandwritingTitle;