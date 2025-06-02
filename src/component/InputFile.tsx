import React, { useState, useRef, } from 'react';

const InputFile = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const maxTags = 10;
  const inputRef = useRef<HTMLInputElement>(null);
  const separator = /[,;|\/]/;

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      let tag = inputValue.trim().replace(/\s+/g, ' ');

      if (tag.length > 0 && tags.length < maxTags) {
        const newTags = tag
          .split(separator)
          .map((t: string) => t.trim().toLowerCase())
          .filter((t: string) => t.length > 0 && !tags.includes(t));

        const availableSpace = maxTags - tags.length;
        const tagsToAdd = newTags.slice(0, availableSpace);

        if (tagsToAdd.length > 0) {
          setTags((prevTags) => [...prevTags, ...tagsToAdd]);
          setInputValue('');
        }
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const removeAllTags = () => {
    setTags([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const remainingTags = maxTags - tags.length;

  return (
    <div>
      <div className='CardInput'>
        <div className='Title'>
          <h2>Tag Input</h2>
        </div>

        <div className='content'>
          <p>Press enter or add tag</p>
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>
                {tag}
                <span
                  className='close-tag'
                  onClick={() => removeTag(tag)}
                  style={{ cursor: 'pointer', marginLeft: '5px' }}
                >
                  x
                </span>
              </li>
            ))}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={addTag}
              disabled={remainingTags <= 0}
              placeholder={remainingTags <= 0 ? "Maximum tags" : "Enter Tag"}
            />
          </ul>
        </div>

        <div className='detail'>
          <p>
            <span>{remainingTags}</span> tags are remaining
          </p>
          <button onClick={removeAllTags} disabled={tags.length === 0}>
            Remove All
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputFile